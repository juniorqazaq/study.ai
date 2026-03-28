import { useEffect, useMemo, useState } from 'react';
import { ArrowUpDown, Clock, Download, FileText, Filter, Grid, List, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

import { storageService } from '@/shared/services/storage.service';

interface Book {
  id: string;
  title: string;
  author: string;
  type: 'pdf' | 'epub' | 'txt' | 'docx' | 'pptx' | 'url' | 'github' | 'image';
  size: string;
  uploadedAt: string;
  progress: number;
  tone: 'slate' | 'plum' | 'olive' | 'warm' | 'graphite';
}

const toneClasses = {
  slate: 'from-[#1b2029] to-[#151515]',
  plum: 'from-[#201a24] to-[#151515]',
  olive: 'from-[#1b211c] to-[#151515]',
  warm: 'from-[#231c17] to-[#151515]',
  graphite: 'from-[#1c1c1c] to-[#151515]',
};

export function LibraryPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'progress'>('date');
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const files = storageService.getFiles();

    const tones: Book['tone'][] = ['slate', 'plum', 'olive', 'warm', 'graphite'];

    setBooks(
      files.map((file, index) => ({
        id: file.id,
        title: file.name.replace(/\.[^/.]+$/, ''),
        author: 'Source: unknown',
        type: file.type,
        size: file.size,
        uploadedAt: file.uploadedAt,
        progress: file.status === 'success' ? 24 + (index % 5) * 14 : 0,
        tone: tones[index % tones.length],
      })),
    );
  }, []);

  const filteredBooks = useMemo(() => {
    const next = books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterType === 'all' || book.type === filterType;

      return matchesSearch && matchesFilter;
    });

    if (sortBy === 'name') {
      next.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'progress') {
      next.sort((a, b) => b.progress - a.progress);
    }

    return next;
  }, [books, filterType, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-black px-5 py-6 text-[#f4f4f5] lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="app-muted-label mb-3">Library</p>
          <h1 className="text-4xl font-semibold tracking-tight text-white lg:text-5xl">My Library</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#8d8d8d] lg:text-base">
            Personal knowledge archive with a calmer, darker reading surface and simpler navigation.
          </p>
        </div>

        <div className="app-panel mb-8 p-3">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b6b6b]" />
              <input
                type="text"
                placeholder="Search your library..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="app-input w-full pl-11"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Filter className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b6b6b]" />
                <select
                  value={filterType}
                  onChange={(event) => setFilterType(event.target.value)}
                  className="app-input min-w-[170px] appearance-none pl-11"
                >
                  <option value="all">All media</option>
                  <option value="pdf">PDF</option>
                  <option value="epub">EPUB</option>
                  <option value="docx">DOCX</option>
                  <option value="pptx">PPTX</option>
                  <option value="url">URL</option>
                  <option value="github">GitHub</option>
                  <option value="image">Image</option>
                </select>
              </div>

              <div className="relative">
                <ArrowUpDown className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b6b6b]" />
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value as 'date' | 'name' | 'progress')}
                  className="app-input min-w-[170px] appearance-none pl-11"
                >
                  <option value="date">Recent first</option>
                  <option value="name">Alphabetical</option>
                  <option value="progress">Most read</option>
                </select>
              </div>

              <div className="flex rounded-[18px] border border-[#2a2a2a] bg-[#1a1a1a] p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex h-11 w-11 items-center justify-center rounded-[14px] transition-colors ${viewMode === 'grid' ? 'bg-[#232323] text-white' : 'text-[#7c7c7c] hover:text-white'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex h-11 w-11 items-center justify-center rounded-[14px] transition-colors ${viewMode === 'list' ? 'bg-[#232323] text-white' : 'text-[#7c7c7c] hover:text-white'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {filteredBooks.length === 0 ? (
          <div className="app-panel p-16 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] border border-[#2a2a2a] bg-[#1a1a1a]">
              <FileText className="h-8 w-8 text-[#6b6b6b]" />
            </div>
            <h2 className="mt-6 text-2xl font-semibold text-white">No files found</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#8d8d8d]">
              {searchQuery
                ? `Nothing matched "${searchQuery}". Try another search term or change the filter.`
                : 'Upload a few resources and they will appear here in a quieter, more readable layout.'}
            </p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredBooks.map((book) => (
              <Link key={book.id} to={`/book/${book.id}`} className="group">
                <div className="app-panel overflow-hidden transition-colors hover:bg-[#1a1a1a]">
                  <div className={`flex h-52 items-center justify-center border-b border-[#262626] bg-gradient-to-br ${toneClasses[book.tone]}`}>
                    <FileText className="h-16 w-16 text-white/20" />
                  </div>

                  <div className="p-6">
                    <div className="mb-5 flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate text-2xl font-semibold tracking-tight text-white">{book.title}</h3>
                        <p className="mt-2 text-xs uppercase tracking-[0.22em] text-[#6b6b6b]">{book.author}</p>
                      </div>
                      <span className="rounded-full border border-[#2a2a2a] bg-[#1b1b1b] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#b3b3b3]">
                        {book.type}
                      </span>
                    </div>

                    <div className="mb-5 rounded-[18px] border border-[#262626] bg-[#141414] px-4 py-4">
                      <div className="mb-3 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-[#6b6b6b]">
                        <span>Mastery level</span>
                        <span className="text-[#d7d7d7]">{book.progress}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-[#212121]">
                        <div className="h-full rounded-full bg-[#0066FF]" style={{ width: `${book.progress}%` }} />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-[#8d8d8d]">
                      <span className="flex items-center gap-2">
                        <Download className="h-3.5 w-3.5" />
                        {book.size}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5" />
                        {book.uploadedAt}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBooks.map((book) => (
              <Link key={book.id} to={`/book/${book.id}`} className="group block">
                <div className="app-panel p-5 transition-colors hover:bg-[#1a1a1a]">
                  <div className="flex flex-col gap-5 xl:flex-row xl:items-center">
                    <div className={`flex h-20 w-16 items-center justify-center rounded-[18px] bg-gradient-to-br ${toneClasses[book.tone]}`}>
                      <FileText className="h-8 w-8 text-white/20" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="truncate text-2xl font-semibold tracking-tight text-white">{book.title}</h3>
                        <span className="rounded-full border border-[#2a2a2a] bg-[#1b1b1b] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#b3b3b3]">
                          {book.type}
                        </span>
                      </div>
                      <p className="mt-2 text-xs uppercase tracking-[0.22em] text-[#6b6b6b]">{book.author}</p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3 xl:w-[330px]">
                      <MetaCell label="Mastery" value={`${book.progress}%`} />
                      <MetaCell label="Size" value={book.size} />
                      <MetaCell label="Added" value={book.uploadedAt} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[16px] border border-[#262626] bg-[#141414] px-4 py-3">
      <div className="text-[10px] uppercase tracking-[0.22em] text-[#6b6b6b]">{label}</div>
      <div className="mt-2 text-sm font-medium text-white">{value}</div>
    </div>
  );
}
