import express from 'express';
import cors from 'cors';

export const app = express();
app.use(cors());
app.disable('x-powered-by');

app.get('/', (req, res) => {
  res.send('Hello World');
});

const PORT = process.env.PORT ?? 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
