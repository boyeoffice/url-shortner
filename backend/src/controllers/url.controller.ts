import { Request, Response } from 'express';
import { createShortUrl } from '../services/url.service';

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
