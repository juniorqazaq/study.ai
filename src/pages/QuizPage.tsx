import React, { useState } from 'react';
import { ChevronRight, CheckCircle, XCircle } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { QuizQuestion } from '../types';
import { useParams } from 'react-router-dom';
import { lessonsData } from '../shared/data/lessonData';

const mockQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: "What is the primary focus of psychology as a scientific discipline?",
    options: [
      { id: 'A', text: "The study of supernatural phenomena" },
      { id: 'B', text: "The scientific study of behavior and mental processes" },
      { id: 'C', text: "The analysis of economic systems" },
      { id: 'D', text: "The exploration of physical matter" }
    ],
    correctId: 'B'
  }
];

const QuizPage: React.FC = () => {
  const { bookId } = useParams();
  const lesson = bookId ? lessonsData[bookId] : null;
  const questions = lesson ? lesson.questions : mockQuestions;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const question = questions[currentQuestionIndex];

  const handleOptionSelect = (id: string) => {
    if (isSubmitted) return;
    setSelectedOption(id);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    setIsSubmitted(true);
    if (selectedOption === question.correctId) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    }
  };


  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center p-8">
      {/* Liquid Background Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="liquid-blob liquid-blob-1" style={{ opacity: 0.1 }} />
        <div className="liquid-blob liquid-blob-3" style={{ opacity: 0.1 }} />
      </div>

      <PageTransition className="max-w-4xl w-full relative z-10">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-4xl font-black tracking-tight bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent mb-2">
              {lesson?.title || "Psychology Quiz"}
            </h2>
            <div className="text-gray-500 font-bold uppercase tracking-widest text-xs">
              {lesson?.subject || "Introduction to Psychology"}
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black tabular-nums text-blue-400">
              {score}/{currentQuestionIndex + (isSubmitted ? 1 : 0)}
            </div>
            <div className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">
              Current Score
            </div>
          </div>
        </div>

        <div className="liquid-glass squircle-xl p-8 md:p-16 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
          {/* Progress Bar Top */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5">
            <div
              className="h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-700 ease-out"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          <div className="mb-12 relative">
            <div className="flex items-center gap-4 mb-6">
              <span className="px-4 py-1.5 liquid-glass squircle-lg text-blue-400 text-xs font-black uppercase tracking-widest border-blue-500/20">
                Question {currentQuestionIndex + 1}
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-blue-500/20 to-transparent" />
            </div>
            <h3 className="text-3xl md:text-4xl font-black leading-tight tracking-tight text-white group-hover:scale-[1.01] transition-transform duration-700">
              {question.question}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {question.options.map(opt => {
              const isCorrect = isSubmitted && opt.id === question.correctId;
              const isWrong = isSubmitted && opt.id === selectedOption && opt.id !== question.correctId;
              const isSelected = opt.id === selectedOption;

              return (
                <button
                  key={opt.id}
                  onClick={() => handleOptionSelect(opt.id)}
                  disabled={isSubmitted}
                  className={`p-8 squircle-lg border-2 text-left transition-all duration-500 flex items-center gap-6 relative group/opt overflow-hidden ${!isSubmitted
                    ? isSelected
                      ? 'bg-blue-600 border-blue-400 shadow-[0_0_30px_rgba(37,99,235,0.3)] scale-[1.02] text-white'
                      : 'liquid-glass border-white/5 hover:border-blue-500/30 hover:bg-white/5 text-gray-400'
                    : isCorrect
                      ? 'bg-green-600/20 border-green-500/50 text-green-400 scale-[1.02] shadow-[0_0_30px_rgba(34,197,94,0.2)]'
                      : isWrong
                        ? 'bg-red-600/20 border-red-500/50 text-red-400 opacity-80'
                        : 'liquid-glass border-white/5 opacity-40 grayscale'
                    }`}
                >
                  <div className={`w-12 h-12 squircle-lg flex items-center justify-center border-2 font-black shrink-0 transition-all duration-500 ${isSelected || isCorrect || isWrong
                    ? 'bg-white text-black border-white'
                    : 'border-white/20 text-gray-400 group-hover/opt:border-white/40'
                    }`}>
                    {opt.id}
                  </div>
                  <span className="font-bold text-xl tracking-tight">{opt.text}</span>

                  {isCorrect && (
                    <div className="ml-auto p-2 bg-green-500/20 rounded-full animate-in zoom-in duration-500">
                      <CheckCircle className="text-green-500 w-6 h-6" />
                    </div>
                  )}
                  {isWrong && (
                    <div className="ml-auto p-2 bg-red-500/20 rounded-full animate-in zoom-in duration-500">
                      <XCircle className="text-red-500 w-6 h-6" />
                    </div>
                  )}

                  {!isSubmitted && isSelected && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-12 flex justify-end items-center gap-8">
            {isSubmitted && (
              <div className="text-gray-500 font-bold uppercase tracking-widest text-xs animate-in fade-in slide-in-from-left duration-700">
                {selectedOption === question.correctId ? 'Correct! Excellent work.' : 'Keep learning, you got this!'}
              </div>
            )}

            {!isSubmitted ? (
              <button
                onClick={handleSubmit}
                disabled={!selectedOption}
                className="px-12 py-5 bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:grayscale text-white font-black squircle-lg transition-all shadow-xl shadow-blue-900/40 hover:scale-105 active:scale-95 border border-white/10"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-12 py-5 liquid-glass hover:bg-white/10 text-white font-black squircle-lg transition-all flex items-center gap-4 hover:scale-105 active:scale-95 border-white/20"
              >
                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                <ChevronRight size={24} className="text-blue-500" />
              </button>
            )}
          </div>
        </div>
      </PageTransition>
    </div>
  );
};

export default QuizPage;
