import request from 'supertest';
import app from '../app';

describe('URL Shortener API', () => {
  let shortUrl: string;

  it('should encode a URL', async () => {
    const response = await request(app).post('/api/encode').send({ url: 'https://indicina.co' });

    expect(response.statusCode).toBe(201);
    expect(response.body.shortUrl).toMatch(/^http:\/\/short\.est\/[a-zA-Z0-9]{6}$/);
    shortUrl = response.body.shortUrl;
  });

  it('should existing code if URL is already shortened', async () => {
    await request(app).post('/api/encode').send({ url: 'https://indicina.co' });
    const response = await request(app).post('/api/encode').send({ url: 'https://indicina.co' });
    expect(response.statusCode).toBe(201);
  });

  it('should decode a short URL', async () => {
    shortUrl.split('/').pop();
    const response = await request(app).post('/api/decode').send({ shortUrl });

    expect(response.statusCode).toBe(200);
    expect(response.body.originalUrl).toBe('https://indicina.co');
  });

  it('should list all URLs', async () => {
    const response = await request(app).get('/api/list');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty('originalUrl');
    expect(response.body[0]).toHaveProperty('shortUrl');
  });

  it('should return statistics for a URL', async () => {
    const path = shortUrl.split('/').pop();
    const response = await request(app).get(`/api/statistic/${path}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('originalUrl');
    expect(response.body).toHaveProperty('visits');
  });

  it('should redirect to original URL', async () => {
    const path = shortUrl.split('/').pop();
    const response = await request(app).get(`/${path}`);

    expect(response.statusCode).toBe(302);
    expect(response.header.location).toBe('https://indicina.co');
  });
});

describe('Edge cases and validation', () => {
  it('should reject encoding if URL is missing', async () => {
    const response = await request(app).post('/api/encode').send({});
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Invalid URL');
  });

  it('should reject encoding if URL is not a string', async () => {
    const response = await request(app).post('/api/encode').send({ url: 12345 });
    expect(response.statusCode).toBe(400);
  });

  it('should reject decoding if shortUrl is missing', async () => {
    const response = await request(app).post('/api/decode').send({});
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Invalid short URL');
  });

  it('should reject decoding if shortUrl contains deceptive characters', async () => {
    const response = await request(app).post('/api/decode').send({ shortUrl: 'short.est/' });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Malformed short URL');
  });

  it('should return 404 for unknown short URL on decode', async () => {
    const response = await request(app)
      .post('/api/decode')
      .send({ shortUrl: 'http://short.est/invalidcode' });

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('URL not found');
  });

  it('should return 404 for unknown short path on stat', async () => {
    const response = await request(app).get('/api/statistic/unknown123');
    expect(response.statusCode).toBe(404);
  });

  it('should return 404 for unknown short path on redirect', async () => {
    const response = await request(app).get('/unknown123');
    expect(response.statusCode).toBe(404);
  });

  it('should return 404 for unknown route', async () => {
    const response = await request(app).get('/api/not-found');
    expect(response.statusCode).toBe(404);
  });
});
