const IcoBrain = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>;
const IcoCheckCircle = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
const IcoCircle = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4b5563" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/></svg>;
const IcoChevronLeft = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>;
import { Link } from 'react-router-dom';

interface Chapter {
  id: number;
  title: string;
  pages: string;
  completed: boolean;
}

interface BookSidebarProps {
  bookId: string;
  chapters: Chapter[];
}

export function BookSidebar({ bookId, chapters }: BookSidebarProps) {
  // const location = useLocation();

  return (
    <aside className="sidebar-grid-bg fixed left-0 top-0 h-screen w-64 overflow-y-auto border-r border-white/[0.07]">
      {/* Header */}
      <Link to="/dashboard" className="mb-2 flex items-center gap-2 border-b border-white/[0.07] p-6">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-500">
          <IcoBrain />
        </div>
        <span className="text-lg">AI StudyBook</span>
      </Link>

      {/* Back to Library */}
      <div className="border-b border-white/[0.07] px-6 py-4">
        <Link
          to="/library"
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <IcoChevronLeft />
          Back to Library
        </Link>
      </div>

      {/* Book Title */}
      <div className="border-b border-white/[0.07] px-6 py-4">
        <h2 className="mb-1 truncate">Introduction to Psychology</h2>
        <p className="text-sm text-gray-400">by John Doe</p>
      </div>

      {/* Chapters */}
      <div className="p-3">
        <div className="text-xs text-gray-400 px-3 mb-2">CHAPTERS</div>
        <nav className="space-y-1">
          {chapters.map((chapter) => (
            <Link
              key={chapter.id}
              to={`/book/${bookId}/reader?chapter=${chapter.id}`}
              className="group flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-[#111520]"
            >
              {chapter.completed ? (
                <IcoCheckCircle />
              ) : (
                <IcoCircle />
              )}
              <div className="flex-1 min-w-0">
                <div className="text-sm truncate group-hover:text-white transition-colors">
                  {chapter.id}. {chapter.title}
                </div>
                <div className="text-xs text-gray-500">Pages {chapter.pages}</div>
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
