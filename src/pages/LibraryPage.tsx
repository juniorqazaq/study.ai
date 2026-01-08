import { useState, useEffect } from 'react';
import { Search, Grid, List, Clock, FileText, Download, Filter, ArrowUpDown } from 'lucide-react';
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
  thumbnail: string;
}

export function LibraryPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const files = storageService.getFiles();
    const booksFromStorage: Book[] = files.map((file, index) => ({
      id: file.id,
      title: file.name.replace(/\.[^/.]+$/, ''),
      author: 'Unknown',
      type: file.type,
      size: file.size,
      uploadedAt: file.uploadedAt,
      progress: 0,
      thumbnail: ['blue', 'purple', 'green', 'orange', 'cyan', 'pink'][index % 6] as any
    }));
    setBooks(booksFromStorage);
  }, []);

  const colorClasses = {
    blue: 'from-blue-500/30 to-blue-600/5',
    purple: 'from-purple-500/30 to-purple-600/5',
    green: 'from-green-500/30 to-green-600/5',
    orange: 'from-orange-500/30 to-orange-600/5',
    cyan: 'from-cyan-500/30 to-cyan-600/5',
    pink: 'from-pink-500/30 to-pink-600/5',
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || book.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-black text-white p-8 relative overflow-hidden">
      {/* Liquid Background Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="liquid-blob liquid-blob-1" style={{ opacity: 0.1 }} />
        <div className="liquid-blob liquid-blob-3" style={{ opacity: 0.1 }} />
      </div>

      <div className="max-w-7xl mx-auto pt-4 relative z-10">
        {/* Header */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h1 className="text-5xl font-black mb-3 tracking-tighter bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
              My Library
            </h1>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">
              Personal Knowledge Archive
            </p>
          </div>
          <div className="pb-2">
            <div className="h-1 w-24 bg-blue-600 squircle-full shadow-[0_0_15px_rgba(37,99,235,0.5)]" />
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-12 liquid-glass squircle-xl p-4 shadow-xl border-white/5">
          {/* Search */}
          <div className="flex-1 relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
            <input
              type="text"
              placeholder="Search your stash..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/5 rounded-2xl pl-14 pr-6 py-4 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all text-white placeholder-gray-600 font-bold"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            {/* Filter */}
            <div className="relative group min-w-[160px]">
              <Filter className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full bg-white/5 border border-white/5 rounded-2xl pl-12 pr-10 py-4 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all appearance-none text-white cursor-pointer font-bold text-sm uppercase tracking-widest"
              >
                <option value="all" className="bg-[#111]">All Media</option>
                <option value="pdf" className="bg-[#111]">PDF Documents</option>
                <option value="epub" className="bg-[#111]">eBooks</option>
                <option value="docx" className="bg-[#111]">MS Word</option>
                <option value="pptx" className="bg-[#111]">Slides</option>
                <option value="url" className="bg-[#111]">Web Links</option>
                <option value="github" className="bg-[#111]">Repositories</option>
              </select>
            </div>

            {/* Sort */}
            <div className="relative group min-w-[160px]">
              <ArrowUpDown className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-white/5 border border-white/5 rounded-2xl pl-12 pr-10 py-4 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all appearance-none text-white cursor-pointer font-bold text-sm uppercase tracking-widest"
              >
                <option value="date" className="bg-[#111]">Recent First</option>
                <option value="name" className="bg-[#111]">Alphabetical</option>
                <option value="progress" className="bg-[#111]">Most Read</option>
              </select>
            </div>

            {/* View Mode */}
            <div className="flex gap-2 bg-white/5 border border-white/5 rounded-2xl p-2 shadow-inner">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'text-gray-500 hover:text-white'
                  }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-xl transition-all ${viewMode === 'list' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'text-gray-500 hover:text-white'
                  }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Books Grid */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBooks.map((book) => (
              <Link
                key={book.id}
                to={`/book/${book.id}`}
                className="liquid-glass border-white/10 rounded-[2.5rem] overflow-hidden hover:bg-white/5 hover:border-blue-500/30 transition-all group relative shadow-2xl hover:scale-[1.02] duration-500"
              >
                {/* Thumbnail */}
                <div className={`h-64 bg-gradient-to-br ${colorClasses[book.thumbnail as keyof typeof colorClasses]} flex items-center justify-center relative border-b border-white/5 overflow-hidden`}>
                  <FileText className="w-24 h-24 text-white/10 group-hover:text-white/40 group-hover:scale-110 transition-all duration-700" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />

                  {book.progress === 100 && (
                    <div className="absolute top-6 left-6 px-4 py-1.5 bg-green-500/20 text-green-400 border border-green-500/30 squircle-lg text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
                      Archive Mastered
                    </div>
                  )}
                  <div className="absolute top-6 right-6 px-4 py-1.5 liquid-glass squircle-lg text-[10px] font-black uppercase tracking-widest border-white/10 text-gray-300 shadow-xl backdrop-blur-xl">
                    {book.type}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-black mb-1 truncate text-white group-hover:text-blue-400 transition-colors tracking-tight">{book.title}</h3>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Source: {book.author}</p>

                  {/* Progress */}
                  <div className="mb-6 py-4 px-6 bg-white/5 rounded-[1.5rem] border border-white/5 group-hover:border-blue-500/10 transition-all duration-500 shadow-inner">
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] mb-3">
                      <span className="text-gray-500">Mastery Level</span>
                      <span className="text-blue-400">{book.progress}%</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden shadow-inner">
                      <div
                        className="bg-blue-600 h-full transition-all duration-1000 cubic-bezier(0.34, 1.56, 0.64, 1)"
                        style={{ width: `${book.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">
                    <span className="flex items-center gap-2">
                      <div className="p-1.5 bg-white/5 rounded-lg group-hover:text-blue-400"><Download className="w-3.5 h-3.5" /></div>
                      {book.size}
                    </span>
                    <span className="flex items-center gap-2">
                      <div className="p-1.5 bg-white/5 rounded-lg group-hover:text-purple-400"><Clock className="w-3.5 h-3.5 text-purple-600" /></div>
                      {book.uploadedAt}
                    </span>
                  </div>
                </div>

                {/* Hover Glow */}
                <div className="absolute -inset-1 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </Link>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-6">
            {filteredBooks.map((book) => (
              <Link
                key={book.id}
                to={`/book/${book.id}`}
                className="liquid-glass border-white/10 rounded-3xl p-6 hover:bg-white/5 hover:border-blue-500/30 transition-all flex items-center gap-8 group shadow-xl hover:scale-[1.01] duration-500"
              >
                {/* Thumbnail */}
                <div className={`w-20 h-28 rounded-2xl bg-gradient-to-br ${colorClasses[book.thumbnail as keyof typeof colorClasses]} flex items-center justify-center flex-shrink-0 relative overflow-hidden ring-1 ring-white/10`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <FileText className="w-10 h-10 text-white/40 relative z-10" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors truncate tracking-tight">{book.title}</h3>
                    <span className="px-3 py-1 liquid-glass border-white/10 squircle-lg text-[10px] font-black uppercase tracking-widest text-blue-400 backdrop-blur-md">
                      {book.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-gray-500">
                    <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500/30" />{book.author}</span>
                    <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500/30" />{book.size}</span>
                    <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-500/30" />{book.uploadedAt}</span>
                  </div>
                </div>

                {/* Progress */}
                <div className="w-64 flex-shrink-0 flex flex-col items-end gap-3 px-8 border-l border-white/5">
                  <span className="text-blue-400 text-sm font-black tabular-nums tracking-widest">{book.progress}% MASTERED</span>
                  <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden shadow-inner ring-1 ring-white/5">
                    <div
                      className="bg-blue-600 h-full transition-all duration-1000 cubic-bezier(0.34, 1.56, 0.64, 1)"
                      style={{ width: `${book.progress}%` }}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-32 liquid-glass border-white/5 rounded-[3rem] mt-12 relative overflow-hidden group">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-blue-500/5 to-transparent" />
            <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10 group-hover:scale-110 transition-transform duration-700">
              <FileText className="w-16 h-16 text-gray-600 group-hover:text-blue-500 transition-colors duration-700" />
            </div>
            <h3 className="text-3xl font-black mb-3 text-white tracking-tight">No Archive Found</h3>
            <p className="text-gray-500 mb-12 max-w-sm mx-auto font-bold text-sm uppercase tracking-widest leading-relaxed opacity-60">
              {searchQuery ? 'Your search query yielded no results. Try adjusting the scope of your inquiry.' : 'Your neural archives are currently empty. Initiate your learning journey today.'}
            </p>
            <Link
              to="/upload"
              className="inline-block px-12 py-4 bg-white text-black hover:bg-blue-500 hover:text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-2xl active:scale-95 duration-500"
            >
              Initiate Upload
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
