import {
    CheckSquare,
    Layers,
    BrainCircuit,
    Edit3,
    HelpCircle,
    FileText,
    Home,
    Sparkles,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
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
            ? 'text-white font-bold bg-blue-600/20 shadow-lg shadow-blue-500/10'
            : 'text-gray-500 hover:text-white hover:bg-white/5'
        }`;

    const menuItems = [
        { icon: FileText, label: 'Notes', path: `/book/${bookId}/notes-mode` },
        { icon: CheckSquare, label: 'Multiple Choice', path: `/book/${bookId}/quiz` },
        { icon: Layers, label: 'Flashcards', path: `/book/${bookId}/flashcards` },
        { icon: BrainCircuit, label: 'Mind Map', path: `/book/${bookId}/mindmap` },
        { icon: Edit3, label: 'Fill in the Blanks', path: `/book/${bookId}/fill-blanks` },
        { icon: HelpCircle, label: 'Open Questions', path: `/book/${bookId}/open-questions` },
    ];

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

            <nav className={`flex-1 flex flex-col ${isCollapsed ? 'items-center px-0' : 'px-4'} space-y-2 overflow-y-auto pt-4`}>
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        title={item.label}
                        className={({ isActive }) => getLinkClass(isActive)}
                    >
                        <item.icon size={20} />
                        {!isCollapsed && <span>{item.label}</span>}
                    </NavLink>
                ))}

                <div className="my-4 border-t border-white/5 mx-2"></div>

                <button
                    onClick={() => navigate('/library')}
                    title="Home"
                    className={getLinkClass(false)}
                >
                    <Home size={20} />
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
