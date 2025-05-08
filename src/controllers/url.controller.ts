import { Request, Response } from 'express';

export const encodeURL = (req: Request, res: Response) => {
  const { url } = req.body;

  return res.status(201).send({});
};
