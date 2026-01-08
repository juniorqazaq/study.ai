import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const mockFlashcards = [
    { id: 1, front: "What is the primary focus of psychology as a scientific discipline?", back: "The scientific study of behavior and mental processes." },
    { id: 2, front: "Define 'Neuroplasticity'", back: "The brain's ability to reorganize itself by forming new neural connections throughout life." },
    { id: 3, front: "What is the 'Amygdala' responsible for?", back: "Processing emotions, particularly fear and aggression." },
    { id: 4, front: "What is Operant Conditioning?", back: "A method of learning that employs rewards and punishments for behavior." },
    { id: 5, front: "Who founded the first psychology laboratory?", back: "Wilhelm Wundt in 1879." }
];

const FlashcardPage: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const handleNext = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % mockFlashcards.length);
        }, 150);
    };

    const handlePrev = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev - 1 + mockFlashcards.length) % mockFlashcards.length);
        }, 150);
    };

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col items-center justify-center p-8">
            {/* Liquid Background Blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div className="liquid-blob liquid-blob-1" style={{ opacity: 0.1 }} />
                <div className="liquid-blob liquid-blob-2" style={{ opacity: 0.1 }} />
            </div>

            <PageTransition className="w-full max-w-4xl relative z-10 flex flex-col items-center">
                <div className="w-full flex items-end justify-between mb-12">
                    <div>
                        <h2 className="text-4xl font-black tracking-tight bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent mb-2">
                            Flashcards
                        </h2>
                        <div className="text-gray-500 font-bold uppercase tracking-widest text-xs">
                            Introduction to Psychology
                        </div>
                    </div>
                    <div className="text-right">
                        <button className="p-3 bg-white/5 hover:bg-red-500/20 squircle-lg transition-all text-gray-500 hover:text-red-400 border border-white/5 group">
                            <X size={20} className="group-hover:rotate-90 transition-transform duration-500" />
                        </button>
                    </div>
                </div>

                {/* Card Container */}
                <div className="relative w-full max-w-3xl aspect-[16/10] perspective-2000 cursor-pointer group" onClick={() => setIsFlipped(!isFlipped)}>
                    <div className={`w-full h-full relative preserve-3d transition-all duration-[800ms] cubic-bezier(0.34, 1.56, 0.64, 1) shadow-[0_0_80px_rgba(0,0,0,0.6)] ${isFlipped ? 'rotate-y-180' : ''}`}>
                        {/* Front */}
                        <div className="absolute inset-0 backface-hidden liquid-glass border border-white/10 squircle-xl p-16 flex flex-col items-center justify-center text-center group-hover:shadow-[0_0_50px_rgba(59,130,246,0.15)] transition-shadow duration-700">
                            <div className="absolute top-8 left-8 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                <span className="text-xs font-black text-gray-500 uppercase tracking-[0.2em]">Question</span>
                            </div>

                            <h3 className="text-4xl md:text-5xl font-black leading-tight tracking-tight text-white group-hover:scale-[1.02] transition-transform duration-700">
                                {mockFlashcards[currentIndex].front}
                            </h3>

                            <div className="mt-12 flex items-center gap-3 px-6 py-2 liquid-glass border-white/5 squircle-lg opacity-40 group-hover:opacity-100 transition-all duration-700">
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Tap to Reveal Answer</span>
                            </div>
                        </div>

                        {/* Back */}
                        <div className="absolute inset-0 backface-hidden rotate-y-180 liquid-glass border border-blue-500/30 squircle-xl p-16 flex flex-col items-center justify-center text-center shadow-[inset_0_0_50px_rgba(59,130,246,0.05)]">
                            <div className="absolute top-8 left-8 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                <span className="text-xs font-black text-blue-400 uppercase tracking-[0.2em]">Answer</span>
                            </div>

                            <h3 className="text-3xl md:text-4xl font-bold leading-relaxed tracking-tight text-blue-50 group-hover:scale-[1.01] transition-transform duration-700">
                                {mockFlashcards[currentIndex].back}
                            </h3>

                            <div className="mt-12 flex items-center gap-3 px-6 py-2 bg-blue-500/10 border border-blue-500/20 squircle-lg">
                                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Tap to Flip Back</span>
                            </div>
                        </div>
                    </div>

                    {/* Shadow Decoration */}
                    <div className="absolute -inset-4 bg-blue-500/5 blur-3xl rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                </div>

                {/* Controls */}
                <div className="mt-16 flex items-center gap-12 relative">
                    <button
                        onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                        className="p-6 bg-white/5 hover:bg-white/10 border border-white/10 squircle-lg transition-all hover:scale-110 active:scale-90 group/btn"
                    >
                        <ChevronLeft size={32} className="text-gray-400 group-hover/btn:text-white transition-colors" />
                    </button>

                    <div className="flex flex-col items-center gap-2">
                        <div className="text-3xl font-black tracking-tighter text-white tabular-nums">
                            {currentIndex + 1} <span className="text-gray-700 mx-1">/</span> {mockFlashcards.length}
                        </div>
                        <div className="h-1 w-24 bg-white/5 squircle-full overflow-hidden">
                            <div
                                className="h-full bg-blue-600 transition-all duration-500"
                                style={{ width: `${((currentIndex + 1) / mockFlashcards.length) * 100}%` }}
                            />
                        </div>
                    </div>

                    <button
                        onClick={(e) => { e.stopPropagation(); handleNext(); }}
                        className="p-6 bg-white/5 hover:bg-white/10 border border-white/10 squircle-lg transition-all hover:scale-110 active:scale-90 group/btn"
                    >
                        <ChevronRight size={32} className="text-gray-400 group-hover/btn:text-white transition-colors" />
                    </button>
                </div>
            </PageTransition>
        </div>
    );
};

export default FlashcardPage;
