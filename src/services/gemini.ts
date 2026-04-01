/**
 * Client-side Gemini was removed; generation runs on the server with GEMINI_API_KEY.
 * Kept for optional demo-style helpers if you add UI that does not call the backend.
 */
export interface FlashcardData {
  question: string;
  answer: string;
  topic?: string;
}

export const generateFlashcard = async (topic: string): Promise<FlashcardData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        question: `What is the core concept of ${topic}?`,
        answer: `Review your book materials or use Generate Study Materials on the book page for AI-built flashcards.`,
        topic,
      });
    }, 400);
  });
};
