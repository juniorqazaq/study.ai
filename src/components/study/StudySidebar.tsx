import { NavLink, useNavigate, useParams } from 'react-router-dom';

import { storageService } from '@/shared/services/storage.service';
import { useSidebar } from '@/context/SidebarContext';

const IcoCheckSquare = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>;
const IcoLayers = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>;
const IcoMindMap = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="2.2" /><circle cx="18" cy="6" r="2.2" /><circle cx="12" cy="12" r="2.2" /><circle cx="6" cy="18" r="2.2" /><circle cx="18" cy="18" r="2.2" /><path d="M8 7.4 10.4 10" /><path d="M16 7.4 13.6 10" /><path d="M8 16.6 10.4 14" /><path d="M16 16.6 13.6 14" /></svg>;
const IcoEdit = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>;
const IcoHelpCircle = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>;
const IcoFileText = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>;
const IcoHome = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>;
const IcoChevronLeft = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>;
const IcoChevronRight = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>;

export function StudySidebar() {
  const { isCollapsed, toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const { bookId } = useParams();
  const user = storageService.getUser();

  const getLinkClass = (isActive: boolean) =>
    `flex items-center ${isCollapsed ? 'justify-center h-10 w-10 mx-auto' : 'gap-3 px-4 py-2.5'} rounded-[12px] transition-colors ${isActive
      ? 'bg-[#1c1c1c] text-white'
      : 'text-[#8d8d8d] hover:bg-[#161616] hover:text-[#f4f4f5]'
    }`;

  const menuItems = [
    { icon: <IcoFileText />, label: 'Notes', path: `/book/${bookId}/notes-mode` },
    { icon: <IcoCheckSquare />, label: 'Multiple Choice', path: `/book/${bookId}/quiz` },
    { icon: <IcoLayers />, label: 'Flashcards', path: `/book/${bookId}/flashcards` },
    { icon: <IcoMindMap />, label: 'Mind Map', path: `/book/${bookId}/mindmap` },
    { icon: <IcoEdit />, label: 'Fill in the Blanks', path: `/book/${bookId}/fill-blanks` },
    { icon: <IcoHelpCircle />, label: 'Written Test', path: `/book/${bookId}/open-questions` },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 bottom-0 z-40 hidden ${isCollapsed ? 'w-[72px]' : 'w-64'} flex-col border-r border-[#262626] bg-[#0c0c0c] lg:flex`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-1/2 z-50 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-[#262626] bg-[#171717] text-[#7c7c7c] transition-colors hover:bg-[#1c1c1c] hover:text-white"
      >
        {isCollapsed ? <IcoChevronRight /> : <IcoChevronLeft />}
      </button>

      <div className={`${isCollapsed ? 'p-4' : 'px-6 py-6'}`}>
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
          {!isCollapsed && (
            <div className="flex items-center text-[20px] font-bold tracking-tight">
              <span className="text-[#0066FF]">Study</span><span className="text-white">.ai</span>
            </div>
          )}
          {isCollapsed && <span className="text-xl font-bold text-[#0066FF]">S</span>}
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-1.5">
          {menuItems.map((item) => (
            <NavLink key={item.path} to={item.path} title={item.label} className={({ isActive }) => getLinkClass(isActive)}>
              {item.icon}
              {!isCollapsed && <span className="text-[14px]">{item.label}</span>}
            </NavLink>
          ))}
        </div>

        <div className="my-4 border-t border-[#232323]" />

        <button onClick={() => navigate('/library')} title="Home" className={getLinkClass(false)}>
          <IcoHome />
          {!isCollapsed && <span className="text-[14px]">Back to library</span>}
        </button>
      </nav>

      <div className="p-4">
        <div className={`flex items-center rounded-[12px] ${isCollapsed ? 'justify-center h-11 w-11 mx-auto' : 'gap-3 px-3 py-2'} transition-colors hover:bg-[#161616]`}>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1c1c1c] text-sm font-medium text-white">
            {user?.fullName?.[0] || 'S'}
          </div>
          {!isCollapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-[#d4d4d8]">{user?.fullName || 'Study User'}</p>
              <p className="truncate text-xs text-[#7c7c7c]">{user?.email || 'study@example.com'}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
