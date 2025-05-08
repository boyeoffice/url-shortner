import { Request, Response } from 'express';
import { createShortUrl, getOriginalUrl, getAllUrls, getUrlStats } from '../services/url.service';

export const encodeURL = (req: Request, res: Response) => {
  const { url } = req.body;

  if (!url || typeof url !== 'string') {
    res.status(400).json({ message: 'Invalid URL' });
    return;
  }

  const shortUrl = createShortUrl(url);

  res.status(201).json({ shortUrl });
  return;
};

export const decodeUrl = (req: Request, res: Response) => {
  const { shortUrl } = req.body;

  if (!shortUrl || typeof shortUrl !== 'string') {
    res.status(400).json({ message: 'Invalid short URL' });
    return;
  }

  const path = shortUrl.split('/').pop();
  if (!path) {
    res.status(400).json({ message: 'Malformed short URL' });
    return;
  }

  const originalUrl = getOriginalUrl(path);

  if (!originalUrl) {
    res.status(404).json({ message: 'URL not found' });
    return;
  }

  res.json({ originalUrl });
  return;
};

export const getUrlStatistic = (req: Request, res: Response) => {
  const { url_path } = req.params;

  const stats = getUrlStats(url_path);
  if (!stats) {
    res.status(404).json({ message: 'Stats not found for URL path' });
    return;
  }

  res.json(stats);
  return;
};

export const listUrls = (_req: Request, res: Response) => {
  const urls = getAllUrls();
  res.json(urls);
  return;
};
