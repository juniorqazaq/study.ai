import { QuizQuestion } from "../../types";

export interface Flashcard {
    id: number;
    front: string;
    back: string;
}

export interface LessonContent {
    bookId: string;
    title: string;
    subject: string;
    notes: string; // HTML or Markdown formatted string
    questions: QuizQuestion[];
    flashcards: Flashcard[];
}

export const lessonsData: Record<string, LessonContent> = {
};
