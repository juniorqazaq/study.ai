import type { Book, FileAsset } from '@prisma/client';

export type SerializedFile = {
  id: string;
  name: string;
  mimeType: string | null;
  sizeBytes: string | null;
  status: string;
};

export type SerializedBook = {
  id: string;
  title: string;
  author: string | null;
  type: string;
  progress: number;
  coverColor: string | null;
  createdAt: string;
  files: SerializedFile[];
};

export function serializeFile(f: FileAsset): SerializedFile {
  return {
    id: f.id,
    name: f.name,
    mimeType: f.mimeType,
    sizeBytes: f.sizeBytes !== null && f.sizeBytes !== undefined ? String(f.sizeBytes) : null,
    status: f.status,
  };
}

export function serializeBook(book: Book & { fileAssets?: FileAsset[] }): SerializedBook {
  const fileAssets = book.fileAssets ?? [];
  return {
    id: book.id,
    title: book.title,
    author: book.author,
    type: book.type,
    progress: book.progress,
    coverColor: book.coverColor,
    createdAt: book.createdAt.toISOString(),
    files: fileAssets.map(serializeFile),
  };
}
