import axiosInstance from '../axiosInstance';

export const api = axiosInstance;

export interface LessonContent {
  bookId: string;
  title: string;
  subject: string;
  notes: string;
  flashcards: Array<{ id: string; front: string; back: string }>;
  questions: Array<{
    id: string;
    question: string;
    options: Array<{ id: string; text: string }>;
    correctId: string;
  }>;
  mindmap?: unknown;
  updatedAt?: string;
}

export const generateLesson = (bookId: string) =>
  axiosInstance
    .post<LessonContent>(`/books/${bookId}/generate`, {}, { timeout: 180_000 })
    .then((r) => r.data);

export const getLesson = async (bookId: string): Promise<LessonContent | null> => {
  const r = await axiosInstance.get<LessonContent>(`/books/${bookId}/lesson`, {
    validateStatus: (s) => (s >= 200 && s < 300) || s === 404,
  });
  if (r.status === 404) return null;
  return r.data;
};

export const chatWithBook = (
  bookId: string,
  message: string,
  history: Array<{ role: string; text: string }>,
) =>
  axiosInstance
    .post<{ reply: string }>(`/books/${bookId}/chat`, { message, history })
    .then((r) => r.data);
