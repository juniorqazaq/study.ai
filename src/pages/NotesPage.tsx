import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Bold, Italic, Underline, List, Send, Sparkles, X, ChevronLeft, Layout, Quote, Code, MessageSquare, Maximize2, Minimize2 } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { chatWithAI } from '../services/geminiService';
import { useNavigate, useParams } from 'react-router-dom';
import { useSidebar } from '../context/SidebarContext';
import { lessonsData } from '../shared/data/lessonData';

const NotesPage: React.FC = () => {
    const navigate = useNavigate();
    const { bookId } = useParams();
    const { setIsSidebarHidden } = useSidebar();
    const lesson = bookId ? lessonsData[bookId] : null;

    const [isChatOpen, setIsChatOpen] = useState(true);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(350);
    const [isResizing, setIsResizing] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
        { role: 'ai', text: "I'm here to help you formatting your notes or explaining concepts from the text!" }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const startResizing = useCallback((_mouseDownEvent: React.MouseEvent) => {
        setIsResizing(true);
    }, []);

    const stopResizing = useCallback(() => {
        setIsResizing(false);
    }, []);

    const resize = useCallback(
        (mouseMoveEvent: MouseEvent) => {
            if (isResizing) {
                const newWidth = window.innerWidth - mouseMoveEvent.clientX;
                if (newWidth > 250 && newWidth < 800) {
                    setSidebarWidth(newWidth);
                }
            }
        },
        [isResizing]
    );

    useEffect(() => {
        window.addEventListener("mousemove", resize);
        window.addEventListener("mouseup", stopResizing);
        return () => {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stopResizing);
        };
    }, [resize, stopResizing]);

    const toggleFullScreen = () => {
        const nextState = !isFullScreen;
        setIsFullScreen(nextState);
        setIsSidebarHidden(nextState);
        if (nextState) {
            setIsChatOpen(false);
        } else {
            setIsChatOpen(true);
        }
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => setIsSidebarHidden(false);
    }, [setIsSidebarHidden]);

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;
        const userMsg = inputValue;
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInputValue('');
        setIsLoading(true);

        const aiResponse = await chatWithAI(userMsg, "The user is studying Psychology notes about Tabula Rasa and Unlearned Behaviors.");
        setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
        setIsLoading(false);
    };

    return (
        <PageTransition className="flex flex-col h-screen overflow-hidden bg-black relative">
            {/* Liquid Background Blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div className="liquid-blob liquid-blob-1" style={{ opacity: 0.1 }} />
                <div className="liquid-blob liquid-blob-2" style={{ opacity: 0.1 }} />
            </div>

            {/* Top Header */}
            {!isFullScreen && (
                <div className="h-20 liquid-glass border-b border-white/10 flex items-center justify-between px-8 shrink-0 relative z-10 shadow-lg animate-in fade-in slide-in-from-top duration-300">
                    <div className="flex items-center gap-6">
                        <button onClick={() => navigate(-1)} className="p-3 bg-white/5 hover:bg-white/10 squircle-lg transition-all text-gray-400 hover:text-white border border-white/5">
                            <ChevronLeft size={24} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                {lesson?.title || "Psychology of Learning"}
                            </h1>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-widest">{lesson ? "Curated Mastery Lesson" : "Last updated 4 days ago"}</p>
                        </div>
                    </div>
                    <button className="p-3 bg-white/5 hover:bg-red-500/20 squircle-lg transition-all text-gray-400 hover:text-red-400 border border-white/5">
                        <X size={20} />
                    </button>
                </div>
            )}

            <div className="flex-1 flex overflow-hidden relative z-10">
                {/* Main Content Area */}
                <div className="flex-1 flex flex-col min-w-0 bg-transparent">
                    {/* Toolbar */}
                    {!lesson && (
                        <div className="h-16 border-b border-white/10 bg-black/40 backdrop-blur-md flex items-center px-6 gap-2 overflow-x-auto no-scrollbar shrink-0">
                            <button className="flex items-center gap-2 text-sm font-bold text-gray-300 px-4 py-2 hover:bg-white/10 rounded-xl transition-all">
                                Sans Serif <span className="text-[10px] opacity-50">▼</span>
                            </button>
                            <div className="w-px h-5 bg-white/10 mx-2"></div>

                            <div className="flex items-center gap-1">
                                <button className="p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"><Bold size={18} /></button>
                                <button className="p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"><Italic size={18} /></button>
                                <button className="p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"><Underline size={18} /></button>
                            </div>

                            <div className="w-px h-5 bg-white/10 mx-2"></div>

                            <button className="flex items-center gap-2 text-sm font-bold text-gray-300 px-4 py-2 hover:bg-white/10 rounded-xl transition-all">
                                H1 <span className="text-[10px] opacity-50">▼</span>
                            </button>

                            <div className="w-px h-5 bg-white/10 mx-2"></div>

                            <div className="flex items-center gap-1">
                                <button className="p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"><List size={18} /></button>
                                <button className="p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"><Layout size={18} /></button>
                                <button className="p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"><Quote size={18} /></button>
                                <button className="p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"><Code size={18} /></button>
                            </div>

                            <div className="ml-auto flex items-center gap-4">
                                <button
                                    onClick={toggleFullScreen}
                                    className="flex items-center gap-3 px-5 py-2 liquid-glass text-gray-400 hover:text-white hover:bg-white/10 squircle-lg text-sm font-bold transition-all duration-300"
                                    title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
                                >
                                    {isFullScreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                                    <span className="hidden sm:inline">{isFullScreen ? "Exit Full" : "Full Screen"}</span>
                                </button>

                                {!isFullScreen && (
                                    <button
                                        onClick={() => setIsChatOpen(!isChatOpen)}
                                        className={`flex items-center gap-3 px-5 py-2 squircle-lg text-sm font-bold transition-all duration-500 ${isChatOpen ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]' : 'liquid-glass text-gray-400 hover:text-white hover:bg-white/10'}`}
                                    >
                                        {isChatOpen ? (
                                            <>Hide Chat <MessageSquare size={16} /></>
                                        ) : (
                                            <>AI Copilot <Sparkles size={16} /></>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {lesson && (
                        <div className="h-16 border-b border-white/10 bg-black/40 backdrop-blur-md flex items-center px-6 shrink-0 relative">
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">Document Protocol 01</span>
                                <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                            </div>
                            <div className="ml-auto flex items-center gap-4">
                                <button
                                    onClick={toggleFullScreen}
                                    className="flex items-center gap-3 px-5 py-2 liquid-glass text-gray-400 hover:text-white hover:bg-white/10 squircle-lg text-sm font-bold transition-all duration-300"
                                >
                                    {isFullScreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                                    <span className="hidden sm:inline">{isFullScreen ? "Exit Full" : "Full Screen"}</span>
                                </button>
                                {!isFullScreen && (
                                    <button
                                        onClick={() => setIsChatOpen(!isChatOpen)}
                                        className={`flex items-center gap-3 px-5 py-2 squircle-lg text-sm font-bold transition-all duration-500 ${isChatOpen ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]' : 'liquid-glass text-gray-400 hover:text-white hover:bg-white/10'}`}
                                    >
                                        {isChatOpen ? <MessageSquare size={16} /> : <Sparkles size={16} />}
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Text Editor Content */}
                    <div
                        className={`flex-1 p-12 lg:px-24 overflow-y-auto outline-none text-gray-300 font-sans selection:bg-blue-500/30 ${!lesson ? '' : 'no-scrollbar'}`}
                        contentEditable={!lesson}
                    >
                        <div className="max-w-4xl mx-auto">
                            {lesson ? (
                                <>
                                    <h1 className="text-5xl font-extrabold text-white mb-10 tracking-tighter leading-tight uppercase italic text-stroke">
                                        {lesson.title}
                                    </h1>
                                    <div dangerouslySetInnerHTML={{ __html: lesson.notes }} />
                                </>
                            ) : (
                                <>
                                    <h1 className="text-5xl font-extrabold text-white mb-10 tracking-tight leading-tight">
                                        The Psychology of <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Learning</span>
                                    </h1>

                                    <div className="p-8 liquid-glass squircle-lg border-blue-500/20 mb-12 shadow-[0_0_50px_rgba(59,130,246,0.05)]">
                                        <p className="text-xl leading-relaxed text-gray-200 indent-8 italic">
                                            "This series explores the foundational concepts of unlearned behaviors and the principles of classical conditioning. All organisms are born with innate reflexes, and learning represents a permanent change in behavior resulting from experience."
                                        </p>
                                    </div>

                                    <h2 className="text-3xl font-black text-[#e6d5b0] mt-16 mb-8 flex items-center gap-4 tracking-tight">
                                        <span className="p-3 bg-[#e6d5b0]/10 squircle-lg shadow-[0_0_20px_rgba(230,213,176,0.2)]">📜</span>
                                        Tabula Rasa Theory
                                    </h2>
                                    <p className="text-xl leading-loose mb-10 text-gray-300">
                                        The term <span className="text-white font-bold underline decoration-[#e6d5b0]/50 decoration-2 underline-offset-4">"Tabula Rasa"</span> means "blank slate." According to this theory, the mind is entirely blank at birth, and external factors like education, environment, and experiences shape a child's learning and development. This perspective suggests that anyone can become anything through their surroundings.
                                    </p>

                                    <h2 className="text-3xl font-black text-[#b0c4e6] mt-16 mb-8 flex items-center gap-4 tracking-tight">
                                        <span className="p-3 bg-[#b0c4e6]/10 squircle-lg shadow-[0_0_20px_rgba(176,196,230,0.2)]">🧬</span>
                                        Unlearned Behaviors
                                    </h2>
                                    <p className="text-xl leading-loose mb-10 text-gray-300">
                                        Despite the Tabula Rasa theory, humans are born with unlearned behaviors known as <span className="text-white font-bold">reflexes and instincts</span>. These are innate, genetically hardwired behaviors passed down through evolution to aid an organism's adaptation to its environment.
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Resize Handle */}
                {isChatOpen && (
                    <div
                        onMouseDown={startResizing}
                        className="w-1 h-full cursor-col-resize hover:bg-blue-500 active:bg-blue-600 transition-all z-20 shrink-0 relative"
                    >
                        <div className="absolute inset-y-0 -left-1 -right-1 group-hover:bg-blue-500/10" />
                    </div>
                )}

                {/* AI Companion Sidebar */}
                {isChatOpen && (
                    <div
                        ref={sidebarRef}
                        style={{ width: `${sidebarWidth}px` }}
                        className="liquid-glass border-l border-white/10 flex flex-col shrink-0 animate-in slide-in-from-right duration-500 shadow-2xl"
                    >
                        <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-black/40 backdrop-blur-md">
                            <div className="flex items-center gap-3 text-blue-400 font-black text-sm uppercase tracking-widest">
                                <div className="p-2 bg-blue-400/10 rounded-lg animate-pulse">
                                    <Sparkles size={18} />
                                </div>
                                AI Companion
                            </div>
                            <button onClick={() => setIsChatOpen(false)} className="p-2 hover:bg-white/10 rounded-lg text-gray-500 hover:text-white transition-all">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex-1 p-6 space-y-6 overflow-y-auto no-scrollbar">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom duration-500`}>
                                    <div className={`group relative max-w-[85%] flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                        <div className={`flex items-center gap-2 mb-1.5 px-1 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                            <div className={`p-1 rounded-md ${msg.role === 'user' ? 'bg-blue-600/20 text-blue-400' : 'bg-purple-600/20 text-purple-400'}`}>
                                                {msg.role === 'user' ? <MessageSquare size={10} /> : <Sparkles size={10} />}
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                                                {msg.role === 'user' ? 'You' : 'AI Assistant'}
                                            </span>
                                        </div>
                                        <div className={`squircle-lg px-5 py-3.5 text-sm leading-relaxed transition-all duration-300 ${msg.role === 'user'
                                            ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-[0_10px_20px_rgba(37,99,235,0.2)] border border-white/10'
                                            : 'liquid-glass-dark text-gray-300 border-white/5 hover:border-purple-500/30 shadow-xl'
                                            }`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="liquid-glass-dark squircle-lg px-6 py-4 flex gap-2 border-white/5">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="p-6 border-t border-white/10 bg-black/60 backdrop-blur-2xl">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-[24px] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Ask about your notes..."
                                    className="relative w-full bg-white/5 border border-white/10 squircle-xl pl-6 pr-14 py-4 text-sm text-gray-200 placeholder-gray-600 focus:border-blue-500/50 focus:bg-white/10 outline-none transition-all shadow-2xl"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    disabled={isLoading || !inputValue.trim()}
                                    className="absolute right-3 top-2.5 p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-all shadow-lg active:scale-90 disabled:opacity-30 disabled:grayscale"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                            <p className="mt-3 text-[10px] text-center text-gray-600 font-bold uppercase tracking-widest">
                                Powered by Study.ai Intelligence
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </PageTransition>
    );
};


export default NotesPage;
