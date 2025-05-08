import express, { Request, Response } from 'express';
import urlRoutes from './routes';
import { getOriginalUrl, incrementVisitCount } from './services/url.service';

const app = express();
const PORT = 6000;

app.use(express.json());

// API routes
app.use('/api', urlRoutes);

// Redirect logic
app.get('/:url_path', (req: Request, res: Response) => {
  const { url_path } = req.params;
  const originalUrl = getOriginalUrl(url_path);

  if (originalUrl) {
    incrementVisitCount(url_path);
    return res.redirect(originalUrl);
  }

  res.status(404).json({ message: 'Short URL not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
