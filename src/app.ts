import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from '../src/routers/user.routes';
import articleRoutes from './routes/article.routes';

dotenv.config();

const app: Application = express();

app.use(cors());

app.use(express.json());

app.use(express.raw({ type: 'application/octet-stream' }));

app.get('/health', (_req, res) => res.status(200).json({ status: 'ok' }));

app.use('/api/users', userRoutes);
app.use('/api/articles', articleRoutes);

export default app;
