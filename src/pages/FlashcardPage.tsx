import { useState } from 'react';
import { ChevronLeft, ChevronRight, Edit2, Filter, Layout, MessageSquare, Trash2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSidebar } from '../context/SidebarContext';
import { lessonsData } from '../shared/data/lessonData';

const mockFlashcards = [
    { id: 1, front: "What is the primary focus of psychology as a scientific discipline?", back: "The scientific study of behavior and mental processes." },
    { id: 2, front: "Define 'Neuroplasticity'", back: "The brain's ability to reorganize itself by forming new neural connections throughout life." },
    { id: 3, front: "What is the 'Amygdala' responsible for?", back: "Processing emotions, particularly fear and aggression." },
    { id: 4, front: "What is Operant Conditioning?", back: "A method of learning that employs rewards and punishments for behavior." },
    { id: 5, front: "Who founded the first psychology laboratory?", back: "Wilhelm Wundt in 1879." }
];

export default function FlashcardPage() {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const { isSidebarHidden, setIsSidebarHidden } = useSidebar();
    
    const lesson = bookId ? lessonsData[bookId] : null;
    const flashcards = lesson ? lesson.flashcards : mockFlashcards;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const handleNext = () => {
        setIsFlipped(false);
        setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    };

    const handlePrev = () => {
        setIsFlipped(false);
        setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    };

    return (
        <div className="flex h-screen w-full overflow-hidden bg-[#0c0c0c]">
            <div className="flex flex-1 flex-col border-r border-[#262626]">
                {/* Header */}
                <header className="flex h-14 items-center justify-between border-b border-[#262626] bg-[#0c0c0c] px-4">
                    <div className="flex items-center gap-3">
                        <button onClick={() => navigate(-1)} className="text-[#a1a1aa] hover:text-white transition-colors">
                            <ChevronLeft size={20} />
                        </button>
                        <h1 className="text-[15px] font-semibold tracking-tight text-white">
                            {lesson?.title || "Psychology of Learning"}
                        </h1>
                    </div>
                    <div className="flex items-center gap-5 text-[13px] font-medium text-[#a1a1aa]">
                        <button className="flex items-center gap-2 hover:text-white transition-colors">
                            <Filter size={14} /> Filter by Topic
                        </button>
                        <button className="flex items-center gap-2 hover:text-white transition-colors">
                            <Edit2 size={14} /> Edit Cards
                        </button>
                        <button 
                            onClick={() => setIsSidebarHidden(!isSidebarHidden)} 
                            className="flex items-center gap-1 hover:text-white transition-colors"
                        >
                            {isSidebarHidden ? "Show sidebar" : "Hide sidebar"}
                            {!isSidebarHidden && <ChevronRight size={14} className="ml-1" />}
                        </button>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex flex-1 flex-col items-center justify-center p-6 bg-[#111111]">
                    {/* Tags */}
                    <div className="mb-8 flex flex-wrap gap-3">
                        <div className="flex items-center gap-2 rounded-full border border-[#3b1717] bg-[#2a1111] px-3 py-1 font-medium text-[#ff6b6b] text-xs">
                            <div className="h-1.5 w-1.5 rounded-full bg-[#ff6b6b]" /> 53 Unfamiliar
                        </div>
                        <div className="flex items-center gap-2 rounded-full border border-[#3b2a17] bg-[#2a1d11] px-3 py-1 font-medium text-[#ffd166] text-xs">
                            <div className="h-1.5 w-1.5 rounded-full bg-[#ffd166]" /> 1 Learning
                        </div>
                        <div className="flex items-center gap-2 rounded-full border border-[#0066FF] bg-[#0066FF]/10 px-3 py-1 font-medium text-[#0066FF] text-xs">
                            <div className="h-1.5 w-1.5 rounded-full bg-[#0066FF]" /> 0 Familiar
                        </div>
                        <div className="flex items-center gap-2 rounded-full border border-[#173b22] bg-[#112a17] px-3 py-1 font-medium text-[#06d6a0] text-xs">
                            <div className="h-1.5 w-1.5 rounded-full bg-[#06d6a0]" /> 0 Mastered
                        </div>
                    </div>

                    {/* Card */}
                    <div 
                        className="relative flex w-full max-w-[800px] h-[500px] cursor-pointer flex-col items-center justify-center rounded-[24px] border border-[#262626] bg-[#1a1a1a] p-8 text-center transition-colors hover:bg-[#1f1f1f]"
                        onClick={() => setIsFlipped(!isFlipped)}
                    >
                        <div className="absolute left-6 top-6 text-[#52525B]">
                            <Layout size={18} />
                        </div>
                        <div className="absolute left-6 bottom-6 text-[#52525B] hover:text-white transition-colors">
                            <Trash2 size={18} />
                        </div>

                        <p className="text-[22px] font-normal leading-relaxed text-white max-w-[600px] px-4">
                            {isFlipped ? flashcards[currentIndex].back : flashcards[currentIndex].front}
                        </p>

                        <div className="absolute bottom-8 flex flex-col items-center gap-2">
                            <span className="text-[13px] text-[#71717A]">Click to flip</span>
                            <div className="rounded-md bg-[#27272A] px-2 py-0.5 text-[11px] font-medium text-[#A1A1AA]">
                                space
                            </div>
                        </div>
                    </div>

                    {/* Pagination Controls */}
                    <div className="mt-8 flex w-full max-w-[800px] items-center justify-between">
                        <button 
                            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#27272A] text-[#A1A1AA] transition-colors hover:bg-[#3F3F46] hover:text-white"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        
                        <div className="text-[14px] font-medium text-[#A1A1AA]">
                            {currentIndex + 1}/{flashcards.length}
                        </div>

                        <button 
                            onClick={(e) => { e.stopPropagation(); handleNext(); }}
                            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#27272A] text-[#A1A1AA] transition-colors hover:bg-[#3F3F46] hover:text-white"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </main>
            </div>

            {/* Right Sidebar */}
            {!isSidebarHidden && (
                <div className="flex w-[350px] shrink-0 flex-col bg-[#0c0c0c] border-l border-[#262626]">
                    <div className="flex h-14 items-center px-4 border-b border-[#262626]">
                        <div className="flex w-full gap-1 p-1 bg-[#1a1a1a] rounded-xl text-[13px] font-medium">
                            <button className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-[#2a2a2a] py-1.5 text-white">
                                <MessageSquare size={14} /> Chat
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 rounded-lg py-1.5 text-[#7c7c7c] hover:text-white transition-colors">
                                <Layout size={14} /> Content
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 rounded-lg py-1.5 text-[#7c7c7c] hover:text-white transition-colors">
                                <Edit2 size={14} /> Notes
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 flex items-center justify-center text-center px-6">
                        <div className="flex flex-col items-center opacity-60">
                            <div className="h-12 w-12 rounded-xl bg-[#1f1f1f] flex items-center justify-center mb-4 border border-[#2a2a2a]">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
                            </div>
                            <p className="text-[14px] text-[#a1a1aa]">Here to help you learn</p>
                        </div>
                    </div>
                    <div className="p-4 border-t border-[#262626]">
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Ask me anything about the material..." 
                                className="w-full rounded-2xl border border-[#262626] bg-[#141414] py-3 pl-4 pr-12 text-sm text-white placeholder:text-[#52525b] outline-none hover:border-[#3f3f46] focus:border-[#0066FF] transition-colors"
                            />
                            <div className="absolute left-4 bottom-[-24px] flex items-center gap-1.5 text-[11px] text-[#52525b]">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M16 21v-5h5" /></svg> 
                                Reset chat
                            </div>
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-xl bg-[#2a2a2a] text-[#a1a1aa] hover:bg-[#3f3f46] hover:text-white transition-colors">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m5 12 7-7 7 7" /><path d="M12 19V5" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
