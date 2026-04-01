import type { RequestHandler } from 'express';
import { Prisma } from '@prisma/client';
import { prisma } from '../db/prisma.js';
import { AppError } from '../utils/app-error.js';
import { paramString } from '../utils/route-params.js';
import { serializeLesson } from '../utils/lesson-serializer.js';
import { extractTextForBook } from '../services/book-text.service.js';
import { generateLessonFromDocument } from '../services/gemini-lesson.service.js';
import { bookChatReply } from '../services/gemini-chat.service.js';
import { env } from '../config/env.js';

const NOTES_EXCERPT_MAX = 48_000;

async function getOwnedBook(bookId: string, userId: string) {
  const book = await prisma.book.findFirst({
    where: { id: bookId, userId },
    include: { fileAssets: true },
  });
  if (!book) {
    throw new AppError(404, 'Book not found');
  }
  return book;
}

export const generateLesson: RequestHandler = async (req, res, next) => {
  try {
    if (!env.GEMINI_API_KEY) {
      throw new AppError(503, 'AI generation is not configured (missing GEMINI_API_KEY)');
    }
    const bookId = paramString(req.params.id, 'id');
    const book = await getOwnedBook(bookId, req.user!.id);
    const keys = book.fileAssets.map((f) => f.storageKey);
    if (keys.length === 0) {
      throw new AppError(400, 'Upload a document before generating study materials');
    }

    const sourceText = await extractTextForBook(keys);
    if (!sourceText.trim()) {
      throw new AppError(400, 'No extractable text found in uploaded files');
    }

    const generated = await generateLessonFromDocument({
      bookTitle: book.title,
      sourceText,
    });

    const mindmapJson: Prisma.InputJsonValue | typeof Prisma.JsonNull =
      generated.mindmap === null ? Prisma.JsonNull : (generated.mindmap as Prisma.InputJsonValue);

    await prisma.lesson.upsert({
      where: { bookId },
      create: {
        bookId,
        title: generated.title,
        subject: generated.subject,
        notes: generated.notes,
        flashcards: generated.flashcards,
        questions: generated.questions,
        mindmap: mindmapJson,
      },
      update: {
        title: generated.title,
        subject: generated.subject,
        notes: generated.notes,
        flashcards: generated.flashcards,
        questions: generated.questions,
        mindmap: mindmapJson,
      },
    });

    const lesson = await prisma.lesson.findUniqueOrThrow({ where: { bookId } });
    res.json(serializeLesson(lesson, bookId));
  } catch (e) {
    next(e);
  }
};

export const getLesson: RequestHandler = async (req, res, next) => {
  try {
    const bookId = paramString(req.params.id, 'id');
    await getOwnedBook(bookId, req.user!.id);
    const lesson = await prisma.lesson.findUnique({ where: { bookId } });
    if (!lesson) {
      throw new AppError(404, 'Lesson not found');
    }
    res.json(serializeLesson(lesson, bookId));
  } catch (e) {
    next(e);
  }
};

function parseChatBody(body: unknown): { message: string; history: Array<{ role: string; text: string }> } {
  if (!body || typeof body !== 'object') {
    throw new AppError(400, 'Invalid JSON body');
  }
  const b = body as Record<string, unknown>;
  const message = typeof b.message === 'string' ? b.message.trim() : '';
  if (!message || message.length > 8_000) {
    throw new AppError(400, 'message is required (max 8000 characters)');
  }
  const historyRaw = b.history;
  if (!Array.isArray(historyRaw)) {
    throw new AppError(400, 'history must be an array');
  }
  const history = historyRaw.slice(-50).map((item) => {
    if (!item || typeof item !== 'object') {
      throw new AppError(400, 'Invalid history entry');
    }
    const h = item as Record<string, unknown>;
    const role = typeof h.role === 'string' ? h.role : '';
    const text = typeof h.text === 'string' ? h.text : '';
    if (!role || !text) {
      throw new AppError(400, 'Each history item needs role and text');
    }
    return { role, text: text.slice(0, 12_000) };
  });
  return { message, history };
}

export const chatWithBook: RequestHandler = async (req, res, next) => {
  try {
    if (!env.GEMINI_API_KEY) {
      throw new AppError(503, 'AI chat is not configured (missing GEMINI_API_KEY)');
    }
    const bookId = paramString(req.params.id, 'id');
    const book = await getOwnedBook(bookId, req.user!.id);
    const lesson = await prisma.lesson.findUnique({ where: { bookId } });
    if (!lesson) {
      throw new AppError(400, 'Generate study materials before using chat');
    }

    const { message, history } = parseChatBody(req.body);
    const excerpt =
      lesson.notes.length > NOTES_EXCERPT_MAX
        ? `${lesson.notes.slice(0, NOTES_EXCERPT_MAX)}\n\n[...notes truncated...]`
        : lesson.notes;

    const reply = await bookChatReply({
      bookTitle: book.title,
      subject: lesson.subject,
      notesExcerpt: excerpt,
      message,
      history,
    });

    res.json({ reply });
  } catch (e) {
    next(e);
  }
};
