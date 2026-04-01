import fs from 'fs/promises';
import path from 'path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse') as (buffer: Buffer) => Promise<{ text: string }>;

const MAX_LEN = 120_000;

export async function extractTextForBook(storageKeys: string[], cwd = process.cwd()): Promise<string> {
  const parts: string[] = [];

  for (const key of storageKeys) {
    const abs = path.isAbsolute(key) ? key : path.join(cwd, key);
    const ext = path.extname(abs).toLowerCase();
    let text = '';

    try {
      if (ext === '.pdf') {
        const buf = await fs.readFile(abs);
        const data = await pdfParse(buf);
        text = data.text || '';
      } else if (ext === '.txt') {
        text = await fs.readFile(abs, 'utf8');
      } else if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
        text = `[Image: ${path.basename(abs)} — no text extracted]`;
      } else {
        text = `[File type ${ext || 'unknown'} — extract plain text from uploads where possible; this file was not parsed.]`;
      }
    } catch {
      text = `[Could not read: ${path.basename(abs)}]`;
    }

    const t = text.trim();
    if (t) parts.push(t);
  }

  const combined = parts.join('\n\n---\n\n');
  if (combined.length <= MAX_LEN) return combined;
  return `${combined.slice(0, MAX_LEN)}\n\n[...truncated for model context...]`;
}
