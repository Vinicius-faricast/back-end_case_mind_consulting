import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Importa controllers/rotas
import userRoutes from '../src/routers/user.routes';
import articleRoutes from '../src/routers/article.routes';
import commentRoutes from '../src/routers/comment.routes';

// Carrega envs
dotenv.config();

// Cria app Express
const app: Application = express();


app.use(cors());

app.use(express.json());

app.use(express.raw({ type: 'application/octet-stream' }));

app.get('/health', (_req, res) => res.status(200).json({ status: 'ok' }));

app.use('/api/users', userRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/comments', commentRoutes);

if (process.env.NODE_ENV !== 'production') {
  app.use((err: any, _req: any, res: any, _next: any) => {
    console.error(err);
    return res.status(err.status || 500).json({ message: err.message, stack: err.stack });
  });
}

export default app;
