import fs from 'fs';
import path from 'path';
import multer from 'multer';
import type { RequestHandler } from 'express';

const ALLOWED_EXT = /\.(pdf|epub|txt|docx|pptx|png|jpg|jpeg)$/i;

const storage = multer.diskStorage({
  destination: (req, _file, cb) => {
    const userId = req.user!.id;
    const bookId = req.params.bookId as string;
    const dir = path.join(process.cwd(), 'uploads', userId, bookId);
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    cb(null, path.basename(file.originalname));
  },
});

export const uploadSingle: RequestHandler = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const name = file.originalname || '';
    if (!ALLOWED_EXT.test(name)) {
      cb(new Error('Invalid file type. Allowed: pdf, epub, txt, docx, pptx, png, jpg, jpeg'));
      return;
    }
    cb(null, true);
  },
}).single('file');
