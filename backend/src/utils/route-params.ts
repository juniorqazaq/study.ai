import { AppError } from './app-error.js';

export function paramString(value: string | string[] | undefined, label: string): string {
  const v = Array.isArray(value) ? value[0] : value;
  if (!v || typeof v !== 'string') {
    throw new AppError(400, `Invalid ${label}`);
  }
  return v;
}
