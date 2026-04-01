import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BookOpen, ChevronLeft, FileText, Layers, Loader2, Map, RefreshCw, Sparkles } from 'lucide-react';

import PageTransition from '../components/PageTransition';
import { getBook } from '@/shared/api/endpoints/books.api';
import type { BookResponse } from '@/shared/api/endpoints/books.api';
import { generateLesson, getLesson, type LessonContent } from '@/shared/api/endpoints/lessons.api';

export function BookPage() {
  const { bookId = '' } = useParams<{ bookId: string }>();
  const [book, setBook] = useState<BookResponse | null>(null);
  const [lesson, setLesson] = useState<LessonContent | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!bookId) return;
    setLoadError(null);
    setLoading(true);
    try {
      const [b, l] = await Promise.all([getBook(bookId), getLesson(bookId)]);
      setBook(b);
      setLesson(l);
    } catch {
      setLoadError('Could not load this book.');
      setBook(null);
      setLesson(null);
    } finally {
      setLoading(false);
    }
  }, [bookId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const handleGenerate = async () => {
    if (!bookId) return;
    setGenError(null);
    setGenerating(true);
    try {
      const next = await generateLesson(bookId);
      setLesson(next);
    } catch (e) {
      console.error(e);
      setGenError('Generation failed. Check that a document is uploaded and GEMINI_API_KEY is set on the server.');
    } finally {
      setGenerating(false);
    }
  };

  const base = `/book/${bookId}`;

  const cards = [
    {
      to: `${base}/notes-mode`,
      label: 'Notes',
      description: 'Read and review generated notes',
      icon: FileText,
    },
    {
      to: `${base}/flashcards`,
      label: 'Flashcards',
      description: 'Flip through key terms',
      icon: Layers,
    },
    {
      to: `${base}/quiz`,
      label: 'Quiz',
      description: 'Multiple-choice practice',
      icon: BookOpen,
    },
    {
      to: `${base}/mindmap`,
      label: 'Mind Map',
      description: 'Visual overview of topics',
      icon: Map,
    },
  ];

  return (
    <PageTransition className="min-h-screen bg-[#0c0c0c] text-white">
      <div className="mx-auto max-w-3xl px-5 py-10 lg:px-8">
        <div className="mb-8 flex items-start gap-3">
          <Link
            to="/library"
            className="mt-1 rounded-full p-2 text-[#8d8d8d] transition-colors hover:bg-[#1d1d1d] hover:text-white"
            aria-label="Back to library"
          >
            <ChevronLeft size={20} />
          </Link>
          <div className="min-w-0 flex-1">
            {loading ? (
              <div className="h-9 w-64 animate-pulse rounded-lg bg-[#1a1a1a]" />
            ) : (
              <h1 className="text-2xl font-semibold tracking-tight text-white">{book?.title || 'Book'}</h1>
            )}
            {book?.author ? (
              <p className="mt-1 text-sm text-[#8d8d8d]">{book.author}</p>
            ) : null}
          </div>
        </div>

        {loadError ? (
          <p className="rounded-xl border border-[#3b1717] bg-[#1a1010] px-4 py-3 text-sm text-[#fca5a5]">{loadError}</p>
        ) : null}

        {generating ? (
          <div className="mb-10 flex flex-col items-center justify-center rounded-2xl border border-[#262626] bg-[#141414] px-6 py-16 text-center">
            <Loader2 className="mb-4 h-10 w-10 animate-spin text-[#0066FF]" aria-hidden />
            <p className="text-lg font-medium text-white">Analyzing your document with AI...</p>
            <p className="mt-2 max-w-md text-sm text-[#a1a1aa]">
              This can take a minute. We are extracting text, building notes, flashcards, and quiz questions.
            </p>
          </div>
        ) : null}

        {!generating && !lesson ? (
          <div className="mb-10 rounded-2xl border border-[#262626] bg-[#141414] p-8">
            <div className="flex items-center gap-3 text-[#0066FF]">
              <Sparkles size={22} />
              <h2 className="text-lg font-semibold text-white">Study materials</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#a1a1aa]">
              Generate notes, flashcards, a quiz, and a mind map from your uploaded document. Make sure you have finished
              uploading at least one file for this book.
            </p>
            <button
              type="button"
              onClick={() => void handleGenerate()}
              disabled={loading || !bookId}
              className="app-primary-button mt-6 inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium disabled:opacity-50"
            >
              <Sparkles size={16} />
              Generate Study Materials
            </button>
            {genError ? <p className="mt-4 text-sm text-[#fca5a5]">{genError}</p> : null}
          </div>
        ) : null}

        {!generating && lesson ? (
          <div className="mb-10">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-white">Your study modes</h2>
                <p className="mt-1 text-sm text-[#8d8d8d]">{lesson.subject}</p>
              </div>
              <button
                type="button"
                onClick={() => void handleGenerate()}
                disabled={loading || !bookId}
                className="app-secondary-button inline-flex items-center gap-2 px-4 py-2 text-xs font-medium disabled:opacity-50"
              >
                <RefreshCw size={14} />
                Regenerate
              </button>
            </div>
            {genError ? <p className="mb-4 text-sm text-[#fca5a5]">{genError}</p> : null}

            <div className="grid gap-4 sm:grid-cols-2">
              {cards.map(({ to, label, description, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className="group rounded-2xl border border-[#262626] bg-[#141414] p-5 transition-colors hover:border-[#3f3f46] hover:bg-[#181818]"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1c1c1c] text-[#0066FF] ring-1 ring-[#262626]">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-[#e4e4e7]">{label}</h3>
                      <p className="mt-1 text-sm text-[#8d8d8d]">{description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </PageTransition>
  );
}
