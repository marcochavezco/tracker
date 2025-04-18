import express from 'express';
import cors from 'cors';
import eventsRouter from './routes/events';

export const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.disable('x-powered-by');

app.use('/events', eventsRouter);

const PORT = process.env.PORT ?? 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
