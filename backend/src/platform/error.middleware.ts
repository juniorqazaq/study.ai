import type { ErrorRequestHandler } from 'express';
import { Prisma } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { MulterError } from 'multer';
import { ZodError } from 'zod';
import { env } from '../config/env.js';
import { AppError } from '../core/app-error.js';

export const errorMiddleware: ErrorRequestHandler = (err, _req, res, next) => {
  if (res.headersSent) {
    next(err);
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      message: err.message,
      ...(err.details !== undefined ? { details: err.details } : {}),
    });
    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      message: 'Validation failed',
      errors: err.flatten(),
    });
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
    res.status(409).json({ message: 'Email already exists' });
    return;
  }

  if (err instanceof jwt.JsonWebTokenError) {
    res.status(401).json({ message: 'Invalid or expired token' });
    return;
  }

  if (err instanceof jwt.TokenExpiredError) {
    res.status(401).json({ message: 'Token expired' });
    return;
  }

  if (err instanceof MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      res.status(400).json({ message: 'File too large (max 50MB)' });
      return;
    }
    res.status(400).json({ message: err.message });
    return;
  }

  if (err instanceof Error && err.message.includes('Invalid file type')) {
    res.status(400).json({ message: err.message });
    return;
  }

  console.error(err);
  const body: { message: string; stack?: string } = {
    message: 'Internal server error',
  };
  if (env.NODE_ENV === 'development' && err instanceof Error) {
    body.stack = err.stack;
  }
  res.status(500).json(body);
};
