import { Library, UploadCloud, BarChart2, Layers, BrainCircuit, FileText, Settings, LogOut, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSidebar } from '@/context/SidebarContext';

export function Sidebar() {
  const { isCollapsed, toggleSidebar } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();

  // Helper to determine active state styling
  const getLinkClass = (isActive: boolean) =>
    `flex items-center ${isCollapsed ? 'justify-center w-12 h-12' : 'gap-3 px-6 py-4'} rounded-2xl transition-all duration-300 group relative overflow-hidden ${isActive
      ? 'text-white font-bold bg-blue-600/20 shadow-lg shadow-blue-500/10'
      : 'text-gray-500 hover:text-white hover:bg-white/5'
    }`;

  const isStudyMode = location.pathname.includes('/book/') ||
    location.pathname.includes('/quiz') ||
    location.pathname.includes('/flashcards') ||
    location.pathname.includes('/mindmap') ||
    location.pathname.includes('/notes');

  return (
    <aside className={`fixed left-6 top-6 bottom-6 ${isCollapsed ? 'w-[72px]' : 'w-64'} transition-all duration-300 liquid-glass-dark squircle-xl flex flex-col z-40 overflow-hidden shadow-2xl hidden lg:flex`}>
      {/* Dynamic Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-0 top-1/2 -translate-y-1/2 w-4 h-12 bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors rounded-l-md z-50 text-gray-500 hover:text-white"
      >
        {isCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      {/* Header / Logo */}
      <div className={`flex items-center ${isCollapsed ? 'justify-center p-4' : 'gap-3 p-8'}`}>
        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
          <Sparkles size={20} className="text-white" />
        </div>
        {!isCollapsed && (
          <span className="text-2xl font-black text-white tracking-tighter uppercase italic">Study<span className="text-blue-500">.ai</span></span>
        )}
      </div>

      <nav className={`flex-1 flex flex-col ${isCollapsed ? 'items-center px-0' : 'px-4'} space-y-3 overflow-y-auto pt-4`}>
        {!isCollapsed && (
          <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 self-start">Main</p>
        )}
        <NavLink to="/library" title="Library" className={({ isActive }) => getLinkClass(isActive)}>
          <Library size={20} />
          {!isCollapsed && <span>Library</span>}
        </NavLink>
        <NavLink to="/upload" title="Upload" className={({ isActive }) => getLinkClass(isActive)}>
          <UploadCloud size={20} />
          {!isCollapsed && <span>Upload</span>}
        </NavLink>
        <NavLink to="/progress" title="Progress" className={({ isActive }) => getLinkClass(isActive)}>
          <BarChart2 size={20} />
          {!isCollapsed && <span>Progress</span>}
        </NavLink>
        <NavLink to="/statistics" title="Statistics" className={({ isActive }) => getLinkClass(isActive)}>
          <Layers size={20} />
          {!isCollapsed && <span>Statistics</span>}
        </NavLink>

        {isStudyMode && (
          <div className="mt-8 space-y-3 pt-4 border-t border-white/5">
            {!isCollapsed && (
              <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Study Mode</p>
            )}
            <NavLink to={location.pathname.replace(/\/(quiz|flashcards|mindmap|notes).*$/, '/quiz')} title="Quiz" className={({ isActive }) => getLinkClass(isActive || location.pathname.endsWith('/quiz'))}>
              <BrainCircuit size={20} />
              {!isCollapsed && <span>Quiz</span>}
            </NavLink>
            <NavLink to={location.pathname.replace(/\/(quiz|flashcards|mindmap|notes).*$/, '/flashcards')} title="Flashcards" className={({ isActive }) => getLinkClass(isActive || location.pathname.endsWith('/flashcards'))}>
              <Layers size={20} />
              {!isCollapsed && <span>Flashcards</span>}
            </NavLink>
            <NavLink to={location.pathname.replace(/\/(quiz|flashcards|mindmap|notes).*$/, '/mindmap')} title="Mind Map" className={({ isActive }) => getLinkClass(isActive || location.pathname.endsWith('/mindmap'))}>
              <BrainCircuit size={20} />
              {!isCollapsed && <span>Mind Map</span>}
            </NavLink>
            <NavLink to={location.pathname.replace(/\/(quiz|flashcards|mindmap|notes).*$/, '/notes')} title="Notes" className={({ isActive }) => getLinkClass(isActive || location.pathname.endsWith('/notes'))}>
              <FileText size={20} />
              {!isCollapsed && <span>Notes</span>}
            </NavLink>
          </div>
        )}
      </nav>

      {/* Bottom Profile */}
      <div className={`${isCollapsed ? 'p-2' : 'p-6'} border-t border-white/5 mt-auto space-y-2`}>
        <NavLink to="/profile" title="Settings" className={({ isActive }) => getLinkClass(isActive)}>
          <Settings size={20} className="relative z-10" />
          {!isCollapsed && <span className="relative z-10">Settings</span>}
        </NavLink>
        <button
          onClick={() => navigate('/')}
          title="Log Out"
          className={`w-full flex items-center ${isCollapsed ? 'justify-center w-12 h-12 mx-auto' : 'gap-3 px-6 py-4'} text-gray-500 hover:text-red-400 hover:bg-red-400/5 rounded-2xl transition-all font-bold`}
        >
          <LogOut size={20} />
          {!isCollapsed && <span>Log Out</span>}
        </button>
      </div>
    </aside>
  );
}
