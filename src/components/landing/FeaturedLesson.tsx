import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Inline SVGs — Azure Blue
const IcoBookOpen = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
const IcoZap = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const IcoStar = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="#0066FF" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const IcoArrowRight = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;

export const FeaturedLesson: React.FC = () => {
    return (
        <section className="py-24 relative overflow-hidden bg-[#07090f]">
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
                            <div className="absolute -inset-4 bg-gradient-to-r from-[#0066FF] to-[#0052CC] rounded-[3rem] opacity-10 blur-2xl group-hover:opacity-20 transition duration-1000"></div>
                            <div className="relative bg-[#0d0f1a] rounded-[2.5rem] border border-[#1e2235] overflow-hidden shadow-2xl">
                                <div className="aspect-video bg-[#07090f] p-8 flex flex-col justify-center">
                                    <div className="relative h-full w-full flex items-center justify-center opacity-20">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-64 h-64 border-2 border-[#0066FF]/30 rounded-full animate-pulse"></div>
                                            <div className="absolute w-48 h-48 border-2 border-[#0066FF]/20 rounded-full animate-ping"></div>
                                        </div>
                                        <div className="text-8xl font-black text-[#e2e8f0]/10 select-none">∫ f(x) dx</div>
                                    </div>

                                    <div className="absolute top-10 right-10 flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                                    </div>

                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="bg-[#0d0f1a]/90 backdrop-blur-md p-8 rounded-3xl border border-[#1e2235] shadow-xl max-w-sm text-center">
                                            <div className="w-16 h-16 bg-[#0066FF] rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-[0_0_20px_rgba(0,102,255,0.4)]">
                                                <IcoBookOpen />
                                            </div>
                                            <h4 className="text-xl font-black text-[#e2e8f0] mb-2">Calculus I</h4>
                                            <p className="text-sm font-bold text-[#e2e8f0]/40 uppercase tracking-widest">Mastery Protocol 01</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#0d0f1a] border-t border-[#1e2235] p-6 flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-[#0066FF]/10 flex items-center justify-center border border-[#0066FF]/30">
                                            <IcoZap />
                                        </div>
                                        <div>
                                            <div className="text-xs font-black text-[#e2e8f0] uppercase tracking-tighter">Live Session</div>
                                            <div className="text-[10px] font-bold text-[#e2e8f0]/40">Active Nodes: 1,240</div>
                                        </div>
                                    </div>
                                    <div className="flex -space-x-3">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className="w-8 h-8 rounded-full border-2 border-[#07090f] bg-[#1a1d2e] overflow-hidden">
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
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/20 text-[#0066FF] text-xs font-black uppercase tracking-widest"
                        >
                            <IcoStar /> Mastery Bundle Available
                        </motion.div>

                        <div className="space-y-6">
                            <h2 className="text-5xl md:text-7xl font-black text-[#e2e8f0] leading-[0.95] tracking-tight uppercase">
                                Calculus <span className="text-[#0066FF]">Revisited.</span><br />
                                <span className="text-[#e2e8f0]/30 italic">Synthesized.</span>
                            </h2>
                            <p className="text-xl text-[#e2e8f0]/50 font-bold uppercase tracking-wide leading-relaxed max-w-xl mx-auto lg:mx-0">
                                Experience our most popular mastery lesson. From Foundations to Limits, mastered through high-fidelity visualization.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6 pt-4">
                            <div className="space-y-1">
                                <div className="text-3xl font-black text-[#e2e8f0] italic">98%</div>
                                <div className="text-[10px] font-black text-[#e2e8f0]/40 uppercase tracking-[0.2em]">Mastery Rate</div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-3xl font-black text-[#e2e8f0] italic">~45m</div>
                                <div className="text-[10px] font-black text-[#e2e8f0]/40 uppercase tracking-[0.2em]">Avg Completion</div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-8 justify-center lg:justify-start">
                            <Link to="/resources">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-10 py-5 btn-gradient text-white rounded-3xl font-black flex items-center gap-3 shadow-2xl uppercase tracking-widest group"
                                >
                                    Start Lesson <IcoArrowRight />
                                </motion.button>
                            </Link>
                            <Link to="/pricing">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-10 py-5 bg-[#1a1d2e] text-[#e2e8f0] rounded-3xl font-black border border-[#1e2235] hover:border-[#0066FF]/30 transition-all uppercase tracking-widest"
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
