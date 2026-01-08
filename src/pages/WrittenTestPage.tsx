import { useState } from 'react';
import { StudyHeader } from '@/components/study/StudyHeader';
import { ActivityCard } from '@/components/ui/ActivityCard';
import { ChevronRight, ChevronLeft, Eye, CheckCircle } from 'lucide-react';

interface OpenQuestion {
    id: number;
    question: string;
    modelAnswer: string;
}

export function WrittenTestPage() {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [showModel, setShowModel] = useState(false);

    const questions: OpenQuestion[] = [
        {
            id: 1,
            question: "Explain the difference between Classical and Operant Conditioning.",
            modelAnswer: "Classical conditioning involves associating an involuntary response and a stimulus (e.g., Pavlov's dogs). Operant conditioning is about associating a voluntary behavior and a consequence (reward or punishment)."
        },
        {
            id: 2,
            question: "Describe the 'Nature vs. Nurture' debate in psychology.",
            modelAnswer: "The nature vs. nurture debate concerns the relative importance of an individual's innate qualities ('nature', i.e., genetics) versus personal experiences ('nurture', i.e., environment) in determining or causing individual differences in physical and behavioral traits."
        },
        {
            id: 3,
            question: "What is cognitive dissonance?",
            modelAnswer: "Cognitive dissonance is the mental discomfort (psychological stress) experienced by a person who holds two or more contradictory beliefs, ideas, or values. This discomfort is triggered by a situation in which a person's belief clashes with new evidence perceived by the person."
        }
    ];

    const currentQ = questions[currentIdx];

    const handleNext = () => {
        if (currentIdx < questions.length - 1) {
            setCurrentIdx(prev => prev + 1);
            setShowModel(false);
        }
    };

    const handlePrev = () => {
        if (currentIdx > 0) {
            setCurrentIdx(prev => prev - 1);
            setShowModel(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Liquid Background Blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div className="liquid-blob liquid-blob-3" style={{ opacity: 0.1 }} />
                <div className="liquid-blob liquid-blob-2" style={{ opacity: 0.1 }} />
            </div>

            <StudyHeader
                title="Deep Inquiry"
                progress={`Segment ${currentIdx + 1} of ${questions.length}`}
                onBack={() => window.history.back()}
            />

            <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
                <div className="mb-12 flex items-center justify-between liquid-glass border-white/5 squircle-xl p-4 shadow-xl">
                    <button
                        onClick={handlePrev}
                        disabled={currentIdx === 0}
                        className="p-4 squircle-lg bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-all active:scale-95 group"
                    >
                        <ChevronLeft className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                    </button>
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 mb-1">Index</span>
                        <span className="text-xl font-black text-white tabular-nums">
                            {currentIdx + 1} <span className="text-gray-800 mx-1">/</span> {questions.length}
                        </span>
                    </div>
                    <button
                        onClick={handleNext}
                        disabled={currentIdx === questions.length - 1}
                        className="p-4 squircle-lg bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-all active:scale-95 group"
                    >
                        <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                    </button>
                </div>

                <div className="space-y-10">
                    {/* Question Card */}
                    <ActivityCard className="liquid-glass border-white/10 squircle-2xl p-10 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <div className="text-9xl font-black italic tracking-tighter select-none">Q</div>
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-1.5 h-10 bg-blue-600 squircle-full shadow-[0_0_15px_rgba(37,99,235,0.5)]" />
                                <span className="text-xs font-black uppercase tracking-[0.3em] text-blue-400">Inquiry Node</span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-black text-white mb-10 leading-tight tracking-tight">
                                {currentQ.question}
                            </h2>

                            <div className="bg-black/40 rounded-3xl p-8 border border-white/5 shadow-inner group-focus-within:border-blue-500/30 transition-all duration-700">
                                <textarea
                                    value={answers[currentQ.id] || ''}
                                    onChange={(e) => setAnswers(prev => ({ ...prev, [currentQ.id]: e.target.value }))}
                                    className="w-full bg-transparent border-none focus:ring-0 text-white text-xl leading-relaxed placeholder-gray-800 resize-none h-64 font-bold"
                                    placeholder="Synthesize your response here..."
                                />
                                <div className="flex justify-end mt-4">
                                    <div className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Aesthetic Input Buffer</div>
                                </div>
                            </div>
                        </div>
                    </ActivityCard>

                    {/* Controls & Feedback */}
                    <div className="flex flex-col gap-6">
                        {!showModel ? (
                            <button
                                onClick={() => setShowModel(true)}
                                className="w-full py-6 bg-white text-black hover:bg-white/90 border-white/10 squircle-xl transition-all font-black text-lg uppercase tracking-[0.2em] flex items-center justify-center gap-4 shadow-2xl active:scale-95 duration-500"
                            >
                                <Eye className="w-6 h-6" /> Reveal Model Topology
                            </button>
                        ) : (
                            <ActivityCard className="liquid-glass border-green-500/30 bg-green-500/5 squircle-2xl p-10 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <div className="flex items-start gap-8">
                                    <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                                        <CheckCircle className="w-8 h-8 text-green-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-green-400 font-black uppercase tracking-[0.2em] text-xs mb-4">Golden Path Response</h3>
                                        <p className="text-gray-300 text-lg leading-relaxed font-bold">
                                            {currentQ.modelAnswer}
                                        </p>
                                    </div>
                                </div>
                            </ActivityCard>
                        )}

                        {showModel && currentIdx < questions.length - 1 && (
                            <button
                                onClick={handleNext}
                                className="w-full py-6 bg-blue-600 hover:bg-blue-500 text-white squircle-xl transition-all font-black text-lg uppercase tracking-[0.2em] shadow-2xl shadow-blue-900/40 active:scale-95 duration-500 flex items-center justify-center gap-4"
                            >
                                Advance to Next Node <ChevronRight className="w-6 h-6" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
