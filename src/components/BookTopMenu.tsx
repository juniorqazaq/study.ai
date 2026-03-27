const IcoClipboard = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>;
const IcoNetwork = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><circle cx="4" cy="6" r="2"/><circle cx="20" cy="6" r="2"/><circle cx="4" cy="18" r="2"/><circle cx="20" cy="18" r="2"/><line x1="6" y1="6" x2="9" y2="11"/><line x1="18" y1="6" x2="15" y2="11"/><line x1="6" y1="18" x2="9" y2="13"/><line x1="18" y1="18" x2="15" y2="13"/></svg>;
import { Link, useLocation } from 'react-router-dom';

interface BookTopMenuProps {
  bookId: string;
}

export function BookTopMenu({ bookId }: BookTopMenuProps) {
  const location = useLocation();

    const menuItems = [
    { icon: <IcoClipboard />, label: 'Quiz', path: `/book/${bookId}/quiz` },
    { icon: <IcoNetwork />, label: 'Mind Map', path: `/book/${bookId}/mindmap` },
  ];

  return (
    <div className="ml-64 border-b border-white/10 bg-white/5 backdrop-blur-sm sticky top-0 z-10">
      <nav className="flex items-center gap-1 px-6 overflow-x-auto">
        {menuItems.map((item) => {
        const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-all whitespace-nowrap ${isActive
                ? 'border-blue-500 text-white'
                : 'border-transparent text-gray-400 hover:text-white hover:border-white/20'
                }`}
            >
              <>{item.icon}</>
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}