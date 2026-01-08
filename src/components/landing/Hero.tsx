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
        <LiquidBackground className="pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white text-slate-900">
            {/* Background Brand Text */}
            <div className="absolute top-[10%] -right-[5%] pointer-events-none select-none z-0 text-slate-900 opacity-[0.03] hidden xl:block">
                <h1
                    className="text-[200px] xl:text-[300px] font-black leading-none tracking-tighter uppercase whitespace-nowrap"
                    style={{ WebkitTextStroke: '1px currentColor', color: 'transparent' }}
                >
                    STUDY AI
                </h1>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">

                    {/* Text Content */}
                    <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-bold text-xs mb-8 border border-blue-100 shadow-sm uppercase tracking-widest">
                            <Sparkles className="w-4 h-4" />
                            <span>Alpha Testing: Q1 2026</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-black text-slate-900 tracking-tighter mb-8 leading-[0.9] uppercase text-balance">
                            The future of learning is <span className="text-blue-600 italic">liquid.</span>
                        </h1>

                        <p className="text-xl text-slate-500 mb-10 leading-relaxed font-bold uppercase tracking-wide">
                            We are building an AI that adapts to your brain's unique rhythms. No more rote memorization. Just pure, effortless mastery.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                            <Link to="/register" className="bg-slate-900 text-white hover:bg-blue-600 px-10 py-5 squircle-xl font-black text-lg transition-all shadow-2xl flex items-center justify-center gap-2 uppercase tracking-widest active:scale-95 duration-500">
                                Get Started Free
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <button className="bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-900 px-8 py-5 squircle-xl font-black text-lg transition-all flex items-center justify-center gap-2 shadow-sm uppercase tracking-widest active:scale-95 duration-500">
                                <Play className="w-5 h-5 fill-current" />
                                See demo
                            </button>
                        </div>
                    </div>

                    {/* Interactive Demo UI - Redesigned to match screenshot */}
                    <div className="relative w-full max-w-lg mx-auto lg:max-w-full">
                        <div className="relative bg-white/80 backdrop-blur-xl squircle-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 p-2 animate-float">
                            {/* Browser Header */}
                            <div className="px-6 py-4 border-b border-slate-100/50 flex items-center justify-between mb-2">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#FF5F57] shadow-sm"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#FEBC2E] shadow-sm"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#28C840] shadow-sm"></div>
                                </div>
                                <div className="text-xs font-medium text-slate-400 select-none">STUDY AI - Flashcard Generator</div>
                                <div className="w-10"></div> {/* Spacer for centering */}
                            </div>

                            {/* Card Body */}
                            <div className="p-4 sm:p-6 bg-slate-50/80 rounded-2xl min-h-[400px] flex flex-col">
                                <div className="mb-6 space-y-3">
                                    <label className="block text-sm font-semibold text-slate-700 ml-1">
                                        Try it now: What do you want to study?
                                    </label>

                                    <form onSubmit={handleGenerate} className="flex gap-3">
                                        <input
                                            type="text"
                                            value={demoTopic}
                                            onChange={(e) => setDemoTopic(e.target.value)}
                                            placeholder="e.g., Mitosis, World War II, Calculus..."
                                            className="flex-1 px-5 py-4 squircle-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-all font-bold shadow-sm"
                                        />
                                        <button
                                            type="submit"
                                            disabled={isLoading || !demoTopic}
                                            className="bg-white text-black hover:bg-blue-600 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed p-4 squircle-xl transition-all shadow-2xl aspect-square flex items-center justify-center group/btn"
                                        >
                                            {isLoading ? (
                                                <div className="w-6 h-6 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                                            ) : (
                                                <Zap className="w-6 h-6 fill-current group-hover/btn:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                                            )}
                                        </button>
                                    </form>
                                </div>

                                {/* Result Area */}
                                <div className="flex-1 perspective-1000 relative group">
                                    {!flashcard && !isLoading && (
                                        <div className="h-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-slate-200/80 rounded-3xl bg-white/50">
                                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 text-[#0066FF] animate-pulse-slow">
                                                <Sparkles className="w-8 h-8" />
                                            </div>
                                            <p className="text-slate-500 font-medium max-w-[200px]">
                                                Enter a topic above to generate an instant flashcard with Gemini AI.
                                            </p>
                                        </div>
                                    )}

                                    {isLoading && (
                                        <div className="h-full flex flex-col items-center justify-center gap-4 bg-white rounded-3xl border border-slate-100 shadow-sm">
                                            <div className="relative">
                                                <div className="w-16 h-16 border-4 border-blue-50 border-t-[#0066FF] rounded-full animate-spin"></div>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <Sparkles className="w-6 h-6 text-[#0066FF] animate-pulse" />
                                                </div>
                                            </div>
                                            <p className="text-slate-500 font-medium animate-pulse">Generating study materials...</p>
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
                                                className="absolute inset-0 bg-white border border-slate-100 squircle-xl shadow-xl p-8 flex flex-col items-center justify-center text-center backface-hidden hover:bg-slate-50 transition-all duration-500"
                                                style={{ backfaceVisibility: 'hidden' }}
                                            >
                                                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4 border border-blue-100">
                                                    <span className="font-black text-blue-600 text-xl">Q</span>
                                                </div>
                                                <h3 className="text-xl md:text-3xl font-black text-slate-900 leading-tight tracking-tighter uppercase">{flashcard.question}</h3>
                                                <div className="absolute bottom-6 flex items-center gap-2 text-[10px] font-black text-slate-400 bg-slate-50 border border-slate-100 px-4 py-2 squircle-xl uppercase tracking-widest">
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
