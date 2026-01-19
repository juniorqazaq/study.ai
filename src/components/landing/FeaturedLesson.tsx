import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Star, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FeaturedLesson: React.FC = () => {
    return (
        <section className="py-24 relative overflow-hidden bg-white">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Left: Visual Preview */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-1/2"
                    >
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[3rem] opacity-10 blur-2xl group-hover:opacity-20 transition duration-1000"></div>
                            <div className="relative bg-slate-50 rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-2xl">
                                <div className="aspect-video bg-white p-8 flex flex-col justify-center">
                                    {/* Abstract Math Visual */}
                                    <div className="relative h-full w-full flex items-center justify-center opacity-40">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-64 h-64 border-2 border-slate-200 rounded-full animate-pulse"></div>
                                            <div className="absolute w-48 h-48 border-2 border-slate-300 rounded-full animate-ping"></div>
                                        </div>
                                        <div className="text-8xl font-black text-slate-100 select-none">∫ f(x) dx</div>
                                    </div>

                                    {/* Floating UI Elements */}
                                    <div className="absolute top-10 right-10 flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                                    </div>

                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-white/50 shadow-xl max-w-sm text-center">
                                            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg shadow-blue-500/20">
                                                <BookOpen className="text-white" size={32} />
                                            </div>
                                            <h4 className="text-xl font-black text-slate-900 mb-2">Calculus I</h4>
                                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Mastery Protocol 01</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate-900 p-6 flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                                            <Zap size={18} className="text-blue-400" />
                                        </div>
                                        <div>
                                            <div className="text-xs font-black text-white uppercase tracking-tighter">Live Session</div>
                                            <div className="text-[10px] font-bold text-slate-400">Active Nodes: 1,240</div>
                                        </div>
                                    </div>
                                    <div className="flex -space-x-3">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 overflow-hidden">
                                                <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Copy & CTA */}
                    <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-black uppercase tracking-widest shadow-sm"
                        >
                            <Star size={14} fill="currentColor" /> Mastery Bundle Available
                        </motion.div>

                        <div className="space-y-6">
                            <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[0.95] tracking-tight uppercase">
                                Calculus <span className="text-blue-600">Revisited.</span><br />
                                <span className="text-slate-400 italic">Synthesized.</span>
                            </h2>
                            <p className="text-xl text-slate-500 font-bold uppercase tracking-wide leading-relaxed max-w-xl mx-auto lg:mx-0">
                                Experience our most popular mastery lesson. From Foundations to Limits, mastered through high-fidelity visualization.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6 pt-4">
                            <div className="space-y-1">
                                <div className="text-3xl font-black text-slate-900 italic">98%</div>
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Mastery Rate</div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-3xl font-black text-slate-900 italic">~45m</div>
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Avg Completion</div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-8 justify-center lg:justify-start">
                            <Link to="/resources/calculus">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-10 py-5 bg-slate-900 text-white rounded-3xl font-black flex items-center gap-3 shadow-2xl hover:bg-blue-600 transition-all uppercase tracking-widest group border border-slate-100"
                                >
                                    Start Lesson <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </Link>
                            <Link to="/pricing">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-10 py-5 bg-white text-slate-900 rounded-3xl font-black border-2 border-slate-100 hover:border-slate-200 transition-all uppercase tracking-widest shadow-lg"
                                >
                                    View Bundles
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
