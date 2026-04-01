import type { Lesson } from '@prisma/client';

export function serializeLesson(lesson: Lesson, bookId: string) {
  return {
    bookId,
    title: lesson.title,
    subject: lesson.subject,
    notes: lesson.notes,
    flashcards: lesson.flashcards as Array<{ id: string; front: string; back: string }>,
    questions: lesson.questions as Array<{
      id: string;
      question: string;
      options: Array<{ id: string; text: string }>;
      correctId: string;
    }>,
    mindmap: lesson.mindmap ?? undefined,
    updatedAt: lesson.updatedAt.toISOString(),
  };
}
