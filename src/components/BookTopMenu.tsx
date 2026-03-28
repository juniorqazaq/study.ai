const IcoClipboard = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>;
const IcoMindMap = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="2.2" /><circle cx="18" cy="6" r="2.2" /><circle cx="12" cy="12" r="2.2" /><circle cx="6" cy="18" r="2.2" /><circle cx="18" cy="18" r="2.2" /><path d="M8 7.4 10.4 10" /><path d="M16 7.4 13.6 10" /><path d="M8 16.6 10.4 14" /><path d="M16 16.6 13.6 14" /></svg>;
import { Link, useLocation } from 'react-router-dom';

interface BookTopMenuProps {
  bookId: string;
}

export function BookTopMenu({ bookId }: BookTopMenuProps) {
  const location = useLocation();

    const menuItems = [
    { icon: <IcoClipboard />, label: 'Quiz', path: `/book/${bookId}/quiz` },
    { icon: <IcoMindMap />, label: 'Mind Map', path: `/book/${bookId}/mindmap` },
  ];

  return (
    <div className="sticky top-0 z-10 ml-64 border-b border-white/[0.07] bg-[#111520]">
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
