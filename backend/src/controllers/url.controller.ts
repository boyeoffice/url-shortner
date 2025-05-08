import { Request, Response } from 'express';

export const encodeURL = (req: Request, res: Response) => {
  const { url } = req.body;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ message: 'Invalid URL' });
  }

  return res.status(201).send({});
};
