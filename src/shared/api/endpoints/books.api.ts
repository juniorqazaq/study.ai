import axiosInstance from '../axiosInstance';

export interface BookResponse {
  id: string;
  title: string;
  author: string | null;
  type: string;
  progress: number;
  coverColor: string | null;
  createdAt: string;
  files: FileAssetResponse[];
}

export interface FileAssetResponse {
  id: string;
  name: string;
  mimeType: string | null;
  sizeBytes: string | null;
  status: string;
}

export const getBooks = () => axiosInstance.get<BookResponse[]>('/books').then((r) => r.data);

export const getBook = (id: string) =>
  axiosInstance.get<BookResponse>(`/books/${id}`).then((r) => r.data);

export const createBook = (data: {
  title: string;
  author?: string;
  type: string;
  coverColor?: string;
}) => axiosInstance.post<BookResponse>('/books', data).then((r) => r.data);

export const updateBook = (
  id: string,
  data: {
    title?: string;
    author?: string;
    progress?: number;
    coverColor?: string;
  },
) => axiosInstance.patch<BookResponse>(`/books/${id}`, data).then((r) => r.data);

export const deleteBook = (id: string) => axiosInstance.delete(`/books/${id}`);

export const uploadBookFile = (bookId: string, file: File, onProgress?: (pct: number) => void) => {
  const formData = new FormData();
  formData.append('file', file);
  return axiosInstance
    .post<BookResponse>(`/books/${bookId}/upload`, formData, {
      onUploadProgress: (ev) => {
        if (ev.total != null && ev.total > 0 && onProgress) {
          onProgress(Math.round((ev.loaded / ev.total) * 100));
        }
      },
    })
    .then((r) => r.data);
};
