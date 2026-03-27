const IcoCheckSquare = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>;
const IcoLayers = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
const IcoBrainCircuit = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>;
const IcoEdit = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const IcoHelpCircle = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
const IcoFileText = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
const IcoHome = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const IcoSparkles = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z"/></svg>;
const IcoChevronLeft = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>;
const IcoChevronRight = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>;
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { storageService } from '@/shared/services/storage.service';
import { useSidebar } from '@/context/SidebarContext';

export function StudySidebar() {
    const { isCollapsed, toggleSidebar } = useSidebar();
    const navigate = useNavigate();
    const { bookId } = useParams();
    const user = storageService.getUser();

    const getLinkClass = (isActive: boolean) =>
        `flex items-center ${isCollapsed ? 'justify-center w-12 h-12' : 'gap-3 px-6 py-4'} rounded-2xl transition-all duration-300 group relative overflow-hidden ${isActive
            ? 'text-[#0066FF] font-bold bg-[#0066FF]/10 shadow-lg shadow-blue-500/10'
            : 'text-[#e2e8f0]/40 hover:text-[#e2e8f0] hover:bg-white/5'
        }`;

    const menuItems = [
        { icon: <IcoFileText />, label: 'Notes', path: `/book/${bookId}/notes-mode` },
        { icon: <IcoCheckSquare />, label: 'Multiple Choice', path: `/book/${bookId}/quiz` },
        { icon: <IcoLayers />, label: 'Flashcards', path: `/book/${bookId}/flashcards` },
        { icon: <IcoBrainCircuit />, label: 'Mind Map', path: `/book/${bookId}/mindmap` },
        { icon: <IcoEdit />, label: 'Fill in the Blanks', path: `/book/${bookId}/fill-blanks` },
        { icon: <IcoHelpCircle />, label: 'Open Questions', path: `/book/${bookId}/open-questions` },
    ];

    return (
        <aside className={`fixed left-6 top-6 bottom-6 ${isCollapsed ? 'w-[72px]' : 'w-64'} transition-all duration-300 liquid-glass-dark squircle-xl flex flex-col z-40 overflow-hidden shadow-2xl hidden lg:flex`}>
            {/* Dynamic Toggle Button */}
            <button
                onClick={toggleSidebar}
                className="absolute -right-0 top-1/2 -translate-y-1/2 w-4 h-12 bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors rounded-l-md z-50 text-gray-500 hover:text-white"
            >
                {isCollapsed ? <IcoChevronRight /> : <IcoChevronLeft />}
            </button>

            {/* Header / Logo */}
            <div className={`flex items-center ${isCollapsed ? 'justify-center p-4' : 'gap-3 p-8'}`}>
                <div className="w-10 h-10 rounded-xl bg-[#0066FF] flex items-center justify-center shadow-[0_0_16px_rgba(0,102,255,0.4)] shrink-0">
                    <IcoSparkles />
                </div>
                {!isCollapsed && (
                    <span className="text-2xl font-black tracking-tighter italic"><span className="text-[#0066FF]">Study</span><span className="text-[#EAF4FF] lowercase">.ai</span></span>
                )}
            </div>

            <nav className={`flex-1 flex flex-col ${isCollapsed ? 'items-center px-0' : 'px-4'} space-y-2 overflow-y-auto pt-4`}>
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        title={item.label}
                        className={({ isActive }) => getLinkClass(isActive)}
                    >
                        <>{item.icon}</>
                        {!isCollapsed && <span>{item.label}</span>}
                    </NavLink>
                ))}

                <div className="my-4 border-t border-white/5 mx-2"></div>

                <button
                    onClick={() => navigate('/library')}
                    title="Home"
                    className={getLinkClass(false)}
                >
                    <IcoHome />
                    {!isCollapsed && <span>Home</span>}
                </button>
            </nav>

            {/* Bottom Profile */}
            <div className={`p-3 border-t border-white/5 mt-auto flex flex-col items-center`}>
                <div className={`p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center ${isCollapsed ? 'justify-center w-12 h-12' : 'gap-3 w-full'}`}>
                    <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 font-bold shrink-0 border border-blue-500/20 shadow-inner">
                        {user?.fullName?.[0] || 'T'}
                    </div>
                    {!isCollapsed && (
                        <div className="flex-1 min-w-0 text-left">
                            <p className="text-sm font-black text-white truncate">{user?.fullName || 'Test User'}</p>
                            <p className="text-[10px] text-gray-500 truncate font-bold uppercase tracking-widest">{user?.email || 'test@gmail.com'}</p>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}
