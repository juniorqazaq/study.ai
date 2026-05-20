import fs from 'fs';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { env } from './config/env.js';
import authRoutes from './routes/auth.routes.js';
import booksRouter from './routes/books.routes.js';
import filesRouter from './routes/files.routes.js';
import { errorMiddleware } from './middleware/error.middleware.js';

const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const app = express();

const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];
if (env.FRONTEND_ORIGIN && !allowedOrigins.includes(env.FRONTEND_ORIGIN)) {
  allowedOrigins.push(env.FRONTEND_ORIGIN);
}

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.use(helmet());

function shouldSkipJsonBodyParser(req: express.Request): boolean {
  const ct = String(req.headers['content-type'] ?? '');
  if (ct.includes('multipart/form-data')) {
    return true;
  }
  const url = typeof req.originalUrl === 'string' ? req.originalUrl : '';
  if (url.includes('/upload')) {
    return true;
  }
  if (req.path.includes('/upload')) {
    return true;
  }
  return false;
}

const jsonMiddleware = express.json();
app.use((req, res, next) => {
  if (shouldSkipJsonBodyParser(req)) {
    next();
    return;
  }
  jsonMiddleware(req, res, next);
});

app.use(cookieParser());

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/auth', authLimiter, authRoutes);

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use('/books', filesRouter);
app.use('/books', booksRouter);

app.get('/', (_req, res) => {
  res.status(200).send('Study.ai Backend API is running');
});

app.get('/health', (_req, res) => {
  res.status(200).json({ ok: true });
});

app.use(errorMiddleware);

export { app };
