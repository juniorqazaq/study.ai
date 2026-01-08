import { useState } from 'react';
import { StudyHeader } from '@/components/study/StudyHeader';
import { ActivityCard } from '@/components/ui/ActivityCard';
import { CheckCircle, XCircle, RefreshCw, Trophy } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

interface BlankQuestion {
    id: number;
    textBefore: string;
    blank: string;
    textAfter: string;
}

export function FillBlanksPage() {
    const { bookId } = useParams();
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);

    const questions: BlankQuestion[] = [
        { id: 1, textBefore: "Psychology is the scientific study of", blank: "behavior", textAfter: "and mental processes." },
        { id: 2, textBefore: "The", blank: "biological", textAfter: "perspective focuses on the role of the brain and nervous system." },
        { id: 3, textBefore: "Ivan Pavlov is famous for his work on", blank: "classical", textAfter: "conditioning." },
        { id: 4, textBefore: "The variable that is manipulated in an experiment is called the", blank: "independent", textAfter: "variable." },
        { id: 5, textBefore: "Freud founded the", blank: "psychodynamic", textAfter: "approach to psychology." },
    ];

    const handleSubmit = () => {
        let newScore = 0;
        questions.forEach(q => {
            const userAnswer = answers[q.id]?.trim().toLowerCase();
            if (userAnswer === q.blank.toLowerCase()) {
                newScore++;
            }
        });
        setScore(newScore);
        setShowResults(true);
    };

    const handleRetry = () => {
        setAnswers({});
        setShowResults(false);
        setScore(0);
    };

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Liquid Background Blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div className="liquid-blob liquid-blob-1" style={{ opacity: 0.1 }} />
                <div className="liquid-blob liquid-blob-2" style={{ opacity: 0.1 }} />
            </div>

            <StudyHeader
                title="Fill in the Blanks"
                progress={showResults ? "Module Decrypted" : `${Object.keys(answers).length}/${questions.length} Encrypted`}
                onBack={() => window.history.back()}
            />

            <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
                {!showResults ? (
                    <div className="space-y-8">
                        {questions.map((q, index) => (
                            <ActivityCard key={q.id} className="liquid-glass border-white/5 squircle-xl p-8 hover:bg-white/10 transition-all duration-500 shadow-2xl group">
                                <div className="flex items-baseline gap-4 text-xl md:text-2xl leading-relaxed flex-wrap font-bold tracking-tight">
                                    <span className="text-gray-700 font-black tabular-nums">{String(index + 1).padStart(2, '0')}.</span>
                                    <span className="text-white/90">{q.textBefore}</span>
                                    <div className="relative group/input">
                                        <input
                                            type="text"
                                            value={answers[q.id] || ''}
                                            onChange={(e) => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                                            className="bg-white/5 border-b-2 border-white/10 px-4 py-1 text-center min-w-[160px] focus:outline-none focus:border-blue-500 text-blue-400 font-black placeholder-gray-800 transition-all duration-500"
                                            placeholder="..."
                                        />
                                        <div className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-blue-500 group-focus-within/input:w-full transition-all duration-700 shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
                                    </div>
                                    <span className="text-white/90">{q.textAfter}</span>
                                </div>

                                {/* Decorator */}
                                <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-white/5 group-hover:bg-blue-500/50 transition-colors" />
                            </ActivityCard>
                        ))}

                        <div className="pt-12">
                            <button
                                onClick={handleSubmit}
                                disabled={Object.keys(answers).length === 0}
                                className="w-full py-6 bg-white text-black hover:bg-blue-600 hover:text-white squircle-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all font-black text-xl uppercase tracking-[0.2em] shadow-2xl active:scale-95 duration-500 border border-white/10"
                            >
                                Validate Neural Inputs
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {/* Results Card */}
                        <div className="liquid-glass border-white/10 squircle-2xl p-16 text-center relative overflow-hidden shadow-2xl">
                            <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />

                            <div className="relative z-10">
                                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10 shadow-inner">
                                    <Trophy className="w-12 h-12 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
                                </div>
                                <h2 className="text-5xl font-black text-white mb-2 tracking-tighter bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">Decryption Results</h2>
                                <div className="text-gray-500 font-black uppercase tracking-widest text-xs mb-10">Neural Compatibility Score</div>

                                <div className="relative inline-block mb-12">
                                    <div className="text-8xl font-black text-blue-500 tabular-nums tracking-tighter drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]">{Math.round((score / questions.length) * 100)}<span className="text-3xl text-blue-900/50 ml-1">%</span></div>
                                    <div className="absolute -inset-8 bg-blue-500/5 blur-3xl -z-10 rounded-full" />
                                </div>

                                <div className="flex gap-6 justify-center">
                                    <Link to={`/book/${bookId}`} className="px-10 py-4 liquid-glass border-white/10 squircle-xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all active:scale-95 duration-500">
                                        Back to Node
                                    </Link>
                                    <button
                                        onClick={handleRetry}
                                        className="px-10 py-4 bg-white text-black hover:bg-blue-600 hover:text-white squircle-xl font-black uppercase tracking-widest text-xs transition-all flex items-center gap-3 active:scale-95 duration-500 shadow-xl"
                                    >
                                        <RefreshCw className="w-4 h-4" /> Reset Module
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Answers Review */}
                        <div className="space-y-6">
                            <h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em] px-4 flex items-center gap-4">
                                <div className="w-8 h-0.5 bg-white/10 rounded-full" />
                                Cryptographic Review
                            </h3>
                            {questions.map((q) => {
                                const userAnswer = answers[q.id]?.trim().toLowerCase();
                                const isCorrect = userAnswer === q.blank.toLowerCase();

                                return (
                                    <ActivityCard key={q.id} className={`liquid-glass border-white/10 squircle-xl p-8 shadow-xl ${isCorrect ? "bg-green-500/5 border-green-500/20" : "bg-red-500/5 border-red-500/20"}`}>
                                        <div className="flex items-start gap-6">
                                            <div className="mt-1">
                                                {isCorrect ? (
                                                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                                                        <CheckCircle className="w-5 h-5 text-green-400" />
                                                    </div>
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30">
                                                        <XCircle className="w-5 h-5 text-red-400" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-baseline gap-3 text-xl font-bold tracking-tight flex-wrap mb-4">
                                                    <span className="text-white/60">{q.textBefore}</span>
                                                    <span className={`font-black border-b-2 px-2 pb-1 ${isCorrect ? "text-green-400 border-green-500/50" : "text-red-400 border-red-500/50"}`}>
                                                        {answers[q.id] || 'NULL'}
                                                    </span>
                                                    <span className="text-white/60">{q.textAfter}</span>
                                                </div>
                                                {!isCorrect && (
                                                    <div className="flex items-center gap-3">
                                                        <div className="text-[10px] font-black uppercase tracking-widest text-green-400 bg-green-400/10 px-3 py-1 squircle-lg border border-green-400/20">
                                                            Solution: {q.blank}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </ActivityCard>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
