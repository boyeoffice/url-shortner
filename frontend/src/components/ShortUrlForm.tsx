import React, { useState } from 'react';
import axios from 'axios';
import './ShortUrlForm.css';

const ShortUrlForm: React.FC = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setShortUrl('');
    setLoading(true);

    try {
      const res = await axios.post('https://localhost:6000/api/encode', { url: longUrl });
      setShortUrl(res.data.shortUrl);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shortener-container">
      <h2>Shorten Your URL</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Enter a long URL (e.g. https://example.com)"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Shortening...' : 'Shorten URL'}
        </button>
      </form>

      {shortUrl && (
        <div className="result">
          Short URL:{' '}
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}

      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default ShortUrlForm;
