import express, { Request, Response } from 'express';
import urlRoutes from './routes';

const app = express();
const PORT = 6000;

app.use(express.json());

// API routes
app.use('/api', urlRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
