import React, { useState } from 'react';
import { ArrowRight, Sparkles, Zap, Play } from 'lucide-react';
import { generateFlashcard, FlashcardData } from '@/services/gemini';
import { Link } from 'react-router-dom';
import { LiquidBackground } from '../layout/LiquidBackground';

export function Hero() {
    const [demoTopic, setDemoTopic] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [flashcard, setFlashcard] = useState<FlashcardData | null>(null);
    const [isFlipped, setIsFlipped] = useState(false);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!demoTopic.trim()) return;

        setIsLoading(true);
        setFlashcard(null);
        setIsFlipped(false);

        try {
            const result = await generateFlashcard(demoTopic);
            setFlashcard(result);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <LiquidBackground className="pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#0A0F1E] text-white relative">
            
            {/* New Decorative Background Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
                {/* Math Formulas */}
                <div className="absolute top-[18%] left-[55%] text-slate-300 opacity-70 text-5xl font-serif italic -rotate-12 blur-[1.5px] whitespace-nowrap">E=mc²</div>
                <div className="absolute top-[48%] right-[2%] text-slate-300 opacity-60 text-4xl font-serif italic rotate-12 blur-[1px] whitespace-nowrap">a² + b² = c²</div>
                <div className="absolute bottom-[28%] left-[45%] text-slate-300 opacity-50 text-3xl font-serif italic -rotate-6 blur-[2px] whitespace-nowrap">∫ f(x)dx</div>
                
                {/* 3D Stylized Objects (using emojis with blur/opacity) */}
                <div className="absolute top-[20%] right-[42%] text-[80px] opacity-80 blur-[2.5px] -rotate-[30deg]" style={{ animationDelay: '0s' }}>🖊️</div>
                <div className="absolute bottom-[5%] right-[8%] text-[100px] opacity-70 blur-[3.5px] rotate-[40deg]">🖊️</div>
                <div className="absolute top-[15%] right-[2%] text-[140px] opacity-90 blur-[1.5px] rotate-[15deg]">📖</div>
                <div className="absolute bottom-[10%] left-[40%] text-[130px] opacity-80 blur-[3px] -rotate-[20deg]">📖</div>

                {/* Geometry Sketches (SVGs) */}
                <svg className="absolute top-[42%] right-[38%] w-[200px] h-[200px] text-slate-400 opacity-40 stroke-current blur-[1px]" viewBox="0 0 100 100" fill="none" strokeWidth="1">
                    <polygon points="10,90 90,90 50,10" />
                    <line x1="50" y1="10" x2="50" y2="90" strokeDasharray="4" />
                    <rect x="50" y="80" width="10" height="10" />
                </svg>
                <svg className="absolute bottom-[8%] right-[22%] w-[160px] h-[160px] text-slate-400 opacity-50 stroke-current -rotate-12 blur-[1.5px]" viewBox="0 0 100 100" fill="none" strokeWidth="1">
                    <ellipse cx="50" cy="80" rx="40" ry="15" />
                    <line x1="10" y1="80" x2="50" y2="10" />
                    <line x1="90" y1="80" x2="50" y2="10" />
                </svg>
            </div>

            {/* Background Brand Text */}
            <div className="absolute top-[10%] -right-[5%] pointer-events-none select-none z-0 text-white opacity-[0.02] hidden xl:block">
                <h1
                    className="text-[200px] xl:text-[300px] font-black leading-none tracking-tighter uppercase whitespace-nowrap"
                    style={{ WebkitTextStroke: '1px currentColor', color: 'transparent' }}
                >
                    Study.ai
                </h1>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">

                    {/* Text Content */}
                    <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0 relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 font-bold text-xs mb-8 border border-blue-500/20 shadow-sm uppercase tracking-widest">
                            <Sparkles className="w-4 h-4" />
                            <span>Alpha Testing: Q1 2026</span>
                        </div>

                        <h1 className="text-[3.5rem] sm:text-[4.5rem] lg:text-[5.5rem] xl:text-[6.5rem] font-bold text-white tracking-tight mb-8 leading-none font-sans text-balance">
                            The future of<br/>learning is <span className="font-serif italic font-normal text-white whitespace-nowrap">Liquid</span>
                        </h1>

                        <p className="text-[13px] sm:text-[14px] lg:text-[15px] text-slate-300 mb-10 leading-relaxed font-semibold uppercase tracking-[0.15em] max-w-[95%] mx-auto lg:mx-0">
                            WE ARE BUILDING AN AI THAT ADAPTS TO YOUR BRAIN'S UNIQUE RHYTHMS. NO MORE ROTE MEMORIZATION. JUST PURE, EFFORTLESS MASTERY.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                            <Link to="/register" className="btn-gradient text-white px-10 py-5 squircle-xl font-black text-sm transition-all flex items-center justify-center gap-2 uppercase tracking-widest active:scale-95">
                                Get Started Free
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <button className="btn-outline-dark px-8 py-5 squircle-xl font-black text-sm flex items-center justify-center gap-2 uppercase tracking-widest active:scale-95">
                                <Play className="w-5 h-5 fill-current" />
                                See demo
                            </button>
                        </div>
                    </div>

                    {/* Interactive Demo UI - Redesigned to match screenshot */}
                    <div className="relative w-full max-w-lg mx-auto lg:max-w-full">
                        <div className="relative bg-[#131B2F]/80 backdrop-blur-xl squircle-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 p-2 animate-float">
                            {/* Browser Header */}
                            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between mb-2">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#FF5F57] shadow-sm"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#FEBC2E] shadow-sm"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#28C840] shadow-sm"></div>
                                </div>
                                <div className="text-xs font-medium text-slate-400 select-none">Study.ai - Flashcard Generator</div>
                                <div className="w-10"></div> {/* Spacer for centering */}
                            </div>

                            {/* Card Body */}
                            <div className="p-4 sm:p-6 bg-[#0A0F1E]/80 rounded-2xl min-h-[400px] flex flex-col">
                                <div className="mb-6 space-y-3">
                                    <label className="block text-sm font-semibold text-slate-300 ml-1">
                                        Try it now: What do you want to study?
                                    </label>

                                    <form onSubmit={handleGenerate} className="flex gap-3">
                                        <input
                                            type="text"
                                            value={demoTopic}
                                            onChange={(e) => setDemoTopic(e.target.value)}
                                            placeholder="e.g., Mitosis, World War II, Calculus..."
                                            className="flex-1 px-5 py-4 squircle-xl bg-[#131B2F] border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-all font-bold shadow-sm"
                                        />
                                        <button
                                            type="submit"
                                            disabled={isLoading || !demoTopic}
                                            className="bg-white text-black hover:bg-blue-500 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed p-4 squircle-xl transition-all shadow-2xl aspect-square flex items-center justify-center group/btn"
                                        >
                                            {isLoading ? (
                                                <div className="w-6 h-6 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                                            ) : (
                                                <Zap className="w-6 h-6 fill-current group-hover/btn:drop-shadow-[0_20px_50px_rgba(255,255,255,0.8)]" />
                                            )}
                                        </button>
                                    </form>
                                </div>

                                {/* Result Area */}
                                <div className="flex-1 perspective-1000 relative group">
                                    {!flashcard && !isLoading && (
                                        <div className="h-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-white/10 rounded-3xl bg-white/5">
                                            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-4 text-blue-400 animate-pulse-slow">
                                                <Sparkles className="w-8 h-8" />
                                            </div>
                                            <p className="text-slate-400 font-medium max-w-[200px]">
                                                Enter a topic above to generate an instant flashcard with Gemini AI.
                                            </p>
                                        </div>
                                    )}

                                    {isLoading && (
                                        <div className="h-full flex flex-col items-center justify-center gap-4 bg-[#131B2F] rounded-3xl border border-white/10 shadow-xl">
                                            <div className="relative">
                                                <div className="w-16 h-16 border-4 border-blue-500/10 border-t-[#0066FF] rounded-full animate-spin"></div>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <Sparkles className="w-6 h-6 text-[#0066FF] animate-pulse" />
                                                </div>
                                            </div>
                                            <p className="text-slate-400 font-medium animate-pulse">Generating study materials...</p>
                                        </div>
                                    )}

                                    {flashcard && (
                                        <div
                                            className={`relative w-full h-full min-h-[260px] cursor-pointer transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
                                            onClick={() => setIsFlipped(!isFlipped)}
                                            style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                                        >
                                            {/* Front Card */}
                                            <div
                                                className="absolute inset-0 bg-[#131B2F] border border-white/10 squircle-xl shadow-xl p-8 flex flex-col items-center justify-center text-center backface-hidden hover:bg-[#1A233A] transition-all duration-500"
                                                style={{ backfaceVisibility: 'hidden' }}
                                            >
                                                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 border border-blue-500/20">
                                                    <span className="font-black text-blue-400 text-xl">Q</span>
                                                </div>
                                                <h3 className="text-xl md:text-3xl font-black text-white leading-tight tracking-tighter uppercase">{flashcard.question}</h3>
                                                <div className="absolute bottom-6 flex items-center gap-2 text-[10px] font-black text-slate-400 bg-white/5 border border-white/10 px-4 py-2 squircle-xl uppercase tracking-widest">
                                                    Click to flip <ArrowRight className="w-4 h-4" />
                                                </div>
                                            </div>

                                            {/* Back Card */}
                                            <div
                                                className="absolute inset-0 bg-blue-600 border border-white/20 squircle-xl shadow-2xl p-8 flex flex-col items-center justify-center text-center backface-hidden"
                                                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                                            >
                                                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4 border border-white/20">
                                                    <span className="font-bold text-white text-xl">A</span>
                                                </div>
                                                <h3 className="text-lg md:text-xl font-bold text-white leading-relaxed tracking-tight">{flashcard.answer}</h3>
                                                <div className="absolute bottom-6 flex items-center gap-2 text-[10px] font-black text-white/60 bg-white/10 px-4 py-2 squircle-xl uppercase tracking-widest">
                                                    Click to flip <ArrowRight className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* 3D Decorative Elements */}
                        <div className="absolute -right-12 bottom-12 w-32 h-32 bg-[#FFD700] rounded-[2rem] -rotate-12 opacity-20 -z-10 blur-xl animate-float" style={{ animationDelay: '1.5s' }}></div>
                        <div className="absolute -left-12 -top-12 w-40 h-40 bg-[#0066FF] rounded-full opacity-10 -z-10 blur-2xl animate-float" style={{ animationDelay: '0.8s' }}></div>
                    </div>

                </div>
            </div>
        </LiquidBackground>
    );
};
