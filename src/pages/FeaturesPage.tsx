import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Sparkles, Send } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function FeaturesPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-950 overflow-hidden selection:bg-blue-500/20 relative">
            {/* Liquid Background Blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div className="liquid-blob liquid-blob-1" style={{ opacity: 0.05, left: '-10%', top: '-10%' }} />
                <div className="liquid-blob liquid-blob-2" style={{ opacity: 0.05, right: '-10%', bottom: '-10%' }} />
            </div>

            <Header />

            <main className="relative min-h-screen flex items-center pt-20 relative z-10">
                {/* Background Outlined Text */}
                <div className="absolute bottom-10 left-10 md:left-20 pointer-events-none select-none z-0">
                    <h1
                        className="text-[120px] md:text-[200px] lg:text-[280px] font-black leading-none tracking-tighter opacity-[0.05]"
                        style={{ WebkitTextStroke: '2px #cbd5e1', color: 'transparent' }}
                    >
                        Study.ai
                    </h1>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="space-y-12"
                        >
                            <div className="space-y-8">
                                <h1 className="text-6xl md:text-8xl font-black leading-[0.95] tracking-tighter bg-gradient-to-r from-slate-900 to-slate-500 bg-clip-text text-transparent">
                                    <span className="text-blue-500 font-normal mr-4 select-none opacity-50 tracking-widest">//</span>
                                    Ascend<br />
                                    <span className="text-blue-600">your</span><br />
                                    Cognition.
                                </h1>
                                <div className="space-y-6 max-w-md">
                                    <p className="text-xl text-gray-500 font-bold leading-relaxed italic opacity-70">
                                        Ready to synchronize? Reach out to integrate your neural network with our advanced pedagogical protocols.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-10">
                                <div className="space-y-3">
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 block">Direct Interface</span>
                                    <div className="text-4xl md:text-5xl font-black text-slate-950 tracking-tighter hover:text-blue-600 transition-colors cursor-pointer duration-500">1-800-CORE-SYNC</div>
                                    <p className="text-slate-400 font-black uppercase tracking-widest text-xs hover:text-slate-900 transition-all cursor-pointer opacity-60">nexus@studyai.edu</p>
                                </div>


                            </div>
                        </motion.div>

                        {/* Right Content - Form Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className="relative"
                        >
                            <div className="liquid-glass-light border-slate-200/60 rounded-[3rem] p-12 md:p-16 shadow-[0_40px_100px_rgba(148,163,184,0.08)] relative overflow-hidden group bg-gradient-to-br from-white to-slate-50/50">
                                {/* Form Inner Sparkle */}
                                <div className="absolute top-10 right-10 opacity-[0.1] pointer-events-none group-hover:rotate-180 transition-transform duration-1000">
                                    <Sparkles className="w-32 h-32 text-slate-300" />
                                </div>

                                <form className="space-y-12 relative z-10">
                                    <div className="space-y-10">
                                        <div className="space-y-4">
                                            <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-1">Identity Label</Label>
                                            <Input
                                                placeholder="Codename / Name"
                                                className="h-16 bg-transparent border-0 border-b-2 border-slate-100 px-0 text-2xl font-black focus-visible:ring-0 focus-visible:border-blue-500 transition-all placeholder:text-slate-200 text-slate-950"
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-1">Neural Access Point</Label>
                                            <Input
                                                type="email"
                                                placeholder="email@nexus.com"
                                                className="h-16 bg-transparent border-0 border-b-2 border-slate-100 px-0 text-2xl font-black focus-visible:ring-0 focus-visible:border-blue-500 transition-all placeholder:text-slate-200 text-slate-950"
                                            />
                                        </div>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full h-20 bg-slate-900 text-white hover:bg-blue-600 rounded-[2rem] flex items-center justify-center gap-4 font-black text-xl uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-all duration-700 group/btn"
                                    >
                                        Execute Outreach
                                        <Send size={24} className="group-hover/btn:translate-x-2 group-hover/btn:-translate-y-2 transition-transform duration-500" />
                                    </motion.button>
                                </form>
                            </div>

                            {/* Decorative element behind card */}
                            <div className="absolute -z-10 -bottom-10 -right-10 w-full h-full bg-blue-600/5 rounded-[40px] blur-3xl opacity-50" />
                        </motion.div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
