import type { RequestHandler } from 'express';
import { prisma } from '../db/prisma.js';
import { AppError } from '../utils/app-error.js';
import { serializeBook } from '../utils/book-serializer.js';
import { paramString } from '../utils/route-params.js';
import fs from 'fs';
import path from 'path';

export const getBooks: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const books = await prisma.book.findMany({
      where: { userId },
      include: { fileAssets: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(books.map(serializeBook));
  } catch (e) {
    next(e);
  }
};

export const getBook: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const id = paramString(req.params.id, 'id');
    const book = await prisma.book.findFirst({
      where: { id, userId },
      include: { fileAssets: true },
    });
    if (!book) {
      throw new AppError(404, 'Book not found');
    }
    res.json(serializeBook(book));
  } catch (e) {
    next(e);
  }
};

const createBookBody = (body: unknown): { title: string; author?: string; type: string; coverColor?: string } => {
  if (!body || typeof body !== 'object') {
    throw new AppError(400, 'Invalid JSON body');
  }
  const b = body as Record<string, unknown>;
  const title = typeof b.title === 'string' ? b.title.trim() : '';
  const type = typeof b.type === 'string' ? b.type.trim() : '';
  if (!title || !type) {
    throw new AppError(400, 'title and type are required');
  }
  return {
    title,
    type,
    author: typeof b.author === 'string' ? b.author.trim() || undefined : undefined,
    coverColor: typeof b.coverColor === 'string' ? b.coverColor.trim() || undefined : undefined,
  };
};

export const createBook: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const data = createBookBody(req.body);
    const book = await prisma.book.create({
      data: {
        userId,
        title: data.title,
        author: data.author ?? null,
        type: data.type,
        coverColor: data.coverColor ?? null,
      },
      include: { fileAssets: true },
    });
    res.status(201).json(serializeBook(book));
  } catch (e) {
    next(e);
  }
};

export const updateBook: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const id = paramString(req.params.id, 'id');
    const existing = await prisma.book.findFirst({ where: { id, userId } });
    if (!existing) {
      throw new AppError(404, 'Book not found');
    }
    const body = req.body as Record<string, unknown>;
    const patch: {
      title?: string;
      author?: string | null;
      progress?: number;
      coverColor?: string | null;
    } = {};
    if (typeof body.title === 'string') patch.title = body.title.trim();
    if (body.author !== undefined) {
      patch.author = typeof body.author === 'string' ? body.author.trim() || null : null;
    }
    if (typeof body.progress === 'number' && Number.isFinite(body.progress)) {
      patch.progress = Math.max(0, Math.min(100, Math.round(body.progress)));
    }
    if (body.coverColor !== undefined) {
      patch.coverColor = typeof body.coverColor === 'string' ? body.coverColor.trim() || null : null;
    }
    const book = await prisma.book.update({
      where: { id },
      data: patch,
      include: { fileAssets: true },
    });
    res.json(serializeBook(book));
  } catch (e) {
    next(e);
  }
};

function removeFileFromDisk(storageKey: string) {
  const abs = path.isAbsolute(storageKey) ? storageKey : path.join(process.cwd(), storageKey);
  fs.unlink(abs, () => undefined);
}

export const deleteBook: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const id = paramString(req.params.id, 'id');
    const book = await prisma.book.findFirst({
      where: { id, userId },
      include: { fileAssets: true },
    });
    if (!book) {
      throw new AppError(404, 'Book not found');
    }
    for (const f of book.fileAssets) {
      removeFileFromDisk(f.storageKey);
    }
    await prisma.book.delete({ where: { id } });
    res.status(204).send();
  } catch (e) {
    next(e);
  }
};
