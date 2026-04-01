import { GoogleGenAI, Type } from '@google/genai';
import { randomUUID } from 'node:crypto';
import { env } from '../config/env.js';

const MODEL = 'gemini-2.0-flash';

const lessonSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    subject: { type: Type.STRING },
    notes: {
      type: Type.STRING,
      description: 'HTML study notes: use h1, h2, h3, p, ul, li, strong. No scripts.',
    },
    flashcards: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          front: { type: Type.STRING },
          back: { type: Type.STRING },
        },
        required: ['front', 'back'],
      },
    },
    questions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          question: { type: Type.STRING },
          options: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                text: { type: Type.STRING },
              },
              required: ['text'],
            },
          },
          correctId: { type: Type.STRING },
        },
        required: ['question', 'options', 'correctId'],
      },
    },
    mindmap: {
      type: Type.OBJECT,
      properties: {
        root: { type: Type.STRING },
        branches: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              label: { type: Type.STRING },
              color: { type: Type.STRING },
              children: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ['label'],
          },
        },
      },
    },
  },
  required: ['title', 'subject', 'notes', 'flashcards', 'questions'],
} as const;

export type GeneratedLessonPayload = {
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
  mindmap: { root: string; branches: Array<{ label: string; color?: string; children?: string[] }> } | null;
};

function ensureIds(payload: GeneratedLessonPayload): GeneratedLessonPayload {
  const flashcards = payload.flashcards.map((c) => ({
    id: c.id?.trim() || randomUUID(),
    front: c.front,
    back: c.back,
  }));

  const questions = payload.questions.map((q) => {
    const opts = q.options.map((o, i) => ({
      id: o.id?.trim() || `opt-${i}-${randomUUID().slice(0, 8)}`,
      text: o.text,
    }));
    let correctId = q.correctId?.trim() || '';
    if (!opts.some((o) => o.id === correctId)) {
      correctId = opts[0]?.id || randomUUID();
    }
    return {
      id: q.id?.trim() || randomUUID(),
      question: q.question,
      options: opts,
      correctId,
    };
  });

  return {
    ...payload,
    flashcards,
    questions,
    mindmap: payload.mindmap ?? null,
  };
}

export async function generateLessonFromDocument(input: {
  bookTitle: string;
  sourceText: string;
}): Promise<Omit<GeneratedLessonPayload, 'mindmap'> & { mindmap: GeneratedLessonPayload['mindmap'] }> {
  const apiKey = env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set');
  }

  const ai = new GoogleGenAI({ apiKey });

  const userPrompt = `You are creating study materials from the following document.

Book / document title (hint): ${input.bookTitle}

Requirements:
- notes: rich HTML suitable for a notes viewer (semantic headings, lists, emphasis).
- flashcards: at least 8 cards testing key terms and concepts.
- questions: at least 5 multiple-choice questions with exactly 4 options each; correctId must match one option id.
- mindmap: optional but preferred — a central root concept and 4–8 main branches; each branch may list short child topic strings. Use distinct hex colors for branches when possible.

Document text:
---
${input.sourceText}
---`;

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: [
      {
        role: 'user',
        parts: [{ text: userPrompt }],
      },
    ],
    config: {
      systemInstruction:
        'You output only valid JSON matching the schema. Be accurate to the document. Do not invent citations or quotes not supported by the text.',
      responseMimeType: 'application/json',
      responseSchema: lessonSchema,
    },
  });

  const raw = response.text;
  if (!raw) {
    throw new Error('Empty response from model');
  }

  const parsed = JSON.parse(raw) as GeneratedLessonPayload;
  if (!parsed.title || !parsed.subject || !parsed.notes || !Array.isArray(parsed.flashcards) || !Array.isArray(parsed.questions)) {
    throw new Error('Invalid lesson structure from model');
  }

  return ensureIds(parsed);
}
