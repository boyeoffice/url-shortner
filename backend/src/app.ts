import express, { Request, Response } from 'express';

const app = express();
const PORT = 6000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
