import fs from 'fs';
import path from 'path';
import type { RequestHandler } from 'express';
import { prisma } from '../db/prisma.js';
import { AppError } from '../utils/app-error.js';
import { serializeBook } from '../utils/book-serializer.js';
import { paramString } from '../utils/route-params.js';

export const uploadFile: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const bookId = paramString(req.params.bookId, 'bookId');
    const file = req.file;

    if (!file) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }

    const book = await prisma.book.findFirst({
      where: { id: bookId, userId },
      include: { fileAssets: true },
    });
    if (!book) {
      fs.unlink(file.path, () => undefined);
      throw new AppError(404, 'Book not found');
    }

    const safeName = path.basename(file.originalname);
    const storageKey = path.join('uploads', userId, bookId, safeName).replace(/\\/g, '/');

    await prisma.fileAsset.create({
      data: {
        bookId,
        name: safeName,
        mimeType: file.mimetype || null,
        sizeBytes: BigInt(file.size),
        storageKey,
        status: 'success',
      },
    });

    const updated = await prisma.book.findUniqueOrThrow({
      where: { id: bookId },
      include: { fileAssets: true },
    });

    res.status(201).json(serializeBook(updated));
  } catch (e) {
    next(e);
  }
};
