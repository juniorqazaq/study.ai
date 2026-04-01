import { GoogleGenAI } from '@google/genai';
import { env } from '../config/env.js';

const MODEL = 'gemini-2.0-flash';

export type ChatTurn = { role: string; text: string };

function mapRole(role: string): 'user' | 'model' {
  if (role === 'user') return 'user';
  return 'model';
}

export async function bookChatReply(input: {
  bookTitle: string;
  subject: string;
  notesExcerpt: string;
  message: string;
  history: ChatTurn[];
}): Promise<string> {
  const apiKey = env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set');
  }

  const ai = new GoogleGenAI({ apiKey });

  const system = `You are a helpful tutor. The student is studying from notes generated from their book.
Book title: ${input.bookTitle}
Subject: ${input.subject}

Use the following notes (excerpt) as the primary source of truth. If something is not covered, say so briefly.

--- NOTES EXCERPT ---
${input.notesExcerpt}
--- END ---`;

  const prior = input.history.slice(-20).map((h) => ({
    role: mapRole(h.role),
    parts: [{ text: h.text }],
  }));

  const contents = [...prior, { role: 'user' as const, parts: [{ text: input.message }] }];

  const response = await ai.models.generateContent({
    model: MODEL,
    contents,
    config: {
      systemInstruction: system,
    },
  });

  const text = response.text?.trim();
  if (!text) {
    throw new Error('Empty chat reply from model');
  }
  return text;
}
