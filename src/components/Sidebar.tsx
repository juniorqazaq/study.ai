import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSidebar } from '@/context/SidebarContext';

// Inline SVG Icons — Azure Blue (#0066FF), 24x24, stroke 1.8
const IcoLibrary = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>;
const IcoUpload = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>;
const IcoChart = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
const IcoLayers = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
const IcoBrain = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>;
const IcoCards = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>;
const IcoMind = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><circle cx="4" cy="6" r="2"/><circle cx="20" cy="6" r="2"/><circle cx="4" cy="18" r="2"/><circle cx="20" cy="18" r="2"/><line x1="6" y1="6" x2="9" y2="11"/><line x1="18" y1="6" x2="15" y2="11"/><line x1="6" y1="18" x2="9" y2="13"/><line x1="18" y1="18" x2="15" y2="13"/></svg>;
const IcoNotes = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
const IcoSettings = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>;
const IcoLogOut = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
const IcoChevronLeft = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>;
const IcoChevronRight = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>;
const IcoSparkle = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z"/></svg>;

export function Sidebar() {
  const { isCollapsed, toggleSidebar } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();

  const getLinkClass = (isActive: boolean) =>
    `flex items-center ${isCollapsed ? 'justify-center w-12 h-12' : 'gap-3 px-4 py-3'} rounded-xl transition-all duration-200 group relative ${
      isActive
        ? 'text-[#0066FF] font-semibold bg-[#0066FF]/10 border border-[#0066FF]/20'
        : 'text-[#e2e8f0]/50 hover:text-[#e2e8f0] hover:bg-white/5'
    }`;

  const isStudyMode = location.pathname.includes('/book/') ||
    location.pathname.includes('/quiz') ||
    location.pathname.includes('/flashcards') ||
    location.pathname.includes('/mindmap') ||
    location.pathname.includes('/notes');

  return (
    <aside className={`fixed left-0 top-0 bottom-0 ${isCollapsed ? 'w-[72px]' : 'w-60'} transition-all duration-300 bg-[#0d0f1a] border-r border-[#1e2235] flex flex-col z-40 overflow-hidden shadow-2xl hidden lg:flex`}>
      {/* Dynamic Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-0 top-1/2 -translate-y-1/2 w-4 h-12 bg-[#1a1d2e] hover:bg-[#252840] flex items-center justify-center transition-colors rounded-l-md z-50 text-[#e2e8f0]/40 hover:text-[#e2e8f0]"
      >
        {isCollapsed ? <IcoChevronRight /> : <IcoChevronLeft />}
      </button>

      {/* Header / Logo */}
      <div className={`flex items-center ${isCollapsed ? 'justify-center p-4' : 'gap-3 px-5 py-6'} border-b border-[#1e2235]`}>
        <div className="w-9 h-9 rounded-lg bg-[#0066FF]/20 border border-[#0066FF]/30 flex items-center justify-center shadow-lg shrink-0">
          <IcoSparkle />
        </div>
        {!isCollapsed && (
          <span className="text-[17px] font-bold tracking-tight"><span className="text-[#0066FF]">Study</span><span className="text-[#EAF4FF]">.ai</span></span>
        )}
      </div>

      <nav className={`flex-1 flex flex-col ${isCollapsed ? 'items-center px-2' : 'px-3'} space-y-1 overflow-y-auto pt-5`}>
        {!isCollapsed && (
          <p className="px-2 text-[10px] font-semibold text-[#e2e8f0]/30 uppercase tracking-widest mb-3">Main</p>
        )}
        <NavLink to="/library" title="Library" className={({ isActive }) => getLinkClass(isActive)}>
          <IcoLibrary />
          {!isCollapsed && <span className="text-[14px]">Library</span>}
        </NavLink>
        <NavLink to="/upload" title="Upload" className={({ isActive }) => getLinkClass(isActive)}>
          <IcoUpload />
          {!isCollapsed && <span className="text-[14px]">Upload</span>}
        </NavLink>
        <NavLink to="/progress" title="Progress" className={({ isActive }) => getLinkClass(isActive)}>
          <IcoChart />
          {!isCollapsed && <span className="text-[14px]">Progress</span>}
        </NavLink>
        <NavLink to="/statistics" title="Statistics" className={({ isActive }) => getLinkClass(isActive)}>
          <IcoLayers />
          {!isCollapsed && <span className="text-[14px]">Statistics</span>}
        </NavLink>

        {isStudyMode && (
          <div className="mt-6 space-y-1 pt-5 border-t border-[#1e2235]">
            {!isCollapsed && (
              <p className="px-2 text-[10px] font-semibold text-[#e2e8f0]/30 uppercase tracking-widest mb-3">Study Mode</p>
            )}
            <NavLink to={location.pathname.replace(/\/(quiz|flashcards|mindmap|notes).*$/, '/quiz')} title="Quiz" className={({ isActive }) => getLinkClass(isActive || location.pathname.endsWith('/quiz'))}>
              <IcoBrain />
              {!isCollapsed && <span className="text-[14px]">Quiz</span>}
            </NavLink>
            <NavLink to={location.pathname.replace(/\/(quiz|flashcards|mindmap|notes).*$/, '/flashcards')} title="Flashcards" className={({ isActive }) => getLinkClass(isActive || location.pathname.endsWith('/flashcards'))}>
              <IcoCards />
              {!isCollapsed && <span className="text-[14px]">Flashcards</span>}
            </NavLink>
            <NavLink to={location.pathname.replace(/\/(quiz|flashcards|mindmap|notes).*$/, '/mindmap')} title="Mind Map" className={({ isActive }) => getLinkClass(isActive || location.pathname.endsWith('/mindmap'))}>
              <IcoMind />
              {!isCollapsed && <span className="text-[14px]">Mind Map</span>}
            </NavLink>
            <NavLink to={location.pathname.replace(/\/(quiz|flashcards|mindmap|notes).*$/, '/notes')} title="Notes" className={({ isActive }) => getLinkClass(isActive || location.pathname.endsWith('/notes'))}>
              <IcoNotes />
              {!isCollapsed && <span className="text-[14px]">Notes</span>}
            </NavLink>
          </div>
        )}
      </nav>

      {/* Bottom Profile */}
      <div className={`${isCollapsed ? 'p-2' : 'p-3'} border-t border-[#1e2235] space-y-1`}>
        <NavLink to="/profile" title="Settings" className={({ isActive }) => getLinkClass(isActive)}>
          <IcoSettings />
          {!isCollapsed && <span className="text-[14px]">Settings</span>}
        </NavLink>
        <button
          onClick={() => navigate('/')}
          title="Log Out"
          className={`w-full flex items-center ${isCollapsed ? 'justify-center w-12 h-12 mx-auto' : 'gap-3 px-4 py-3'} text-[#e2e8f0]/40 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all`}
        >
          <IcoLogOut />
          {!isCollapsed && <span className="text-[14px]">Log Out</span>}
        </button>
      </div>
    </aside>
  );
}
