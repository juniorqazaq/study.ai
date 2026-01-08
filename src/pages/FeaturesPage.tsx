import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Twitter, Instagram, Linkedin, Github, Sparkles, Send } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function FeaturesPage() {
    return (
        <div className="min-h-screen bg-black font-sans text-white overflow-hidden selection:bg-blue-500/20 relative">
            {/* Liquid Background Blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div className="liquid-blob liquid-blob-1" style={{ opacity: 0.1, left: '-10%', top: '-10%' }} />
                <div className="liquid-blob liquid-blob-2" style={{ opacity: 0.1, right: '-10%', bottom: '-10%' }} />
            </div>

            <Header />

            <main className="relative min-h-screen flex items-center pt-20 relative z-10">
                {/* Background Outlined Text */}
                <div className="absolute bottom-10 left-10 md:left-20 pointer-events-none select-none z-0">
                    <h1
                        className="text-[120px] md:text-[200px] lg:text-[280px] font-black leading-none tracking-tighter opacity-[0.05]"
                        style={{ WebkitTextStroke: '2px #fff', color: 'transparent' }}
                    >
                        STUDY AI
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
                                <h1 className="text-6xl md:text-8xl font-black leading-[0.95] tracking-tighter bg-gradient-to-r from-white to-gray-600 bg-clip-text text-transparent">
                                    <span className="text-blue-500 font-normal mr-4 select-none opacity-50 tracking-widest">//</span>
                                    Ascend<br />
                                    <span className="text-gray-800">your</span><br />
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
                                    <div className="text-4xl md:text-5xl font-black text-white tracking-tighter hover:text-blue-400 transition-colors cursor-pointer duration-500">1-800-CORE-SYNC</div>
                                    <p className="text-gray-500 font-black uppercase tracking-widest text-xs hover:text-white transition-all cursor-pointer opacity-60">nexus@studyai.edu</p>
                                </div>

                                <div className="flex items-center gap-6">
                                    {[Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
                                        <motion.a
                                            key={i}
                                            href="#"
                                            whileHover={{ scale: 1.2, rotate: 12 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="w-14 h-14 squircle-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-600 hover:text-white hover:bg-white/10 hover:border-blue-500/50 transition-all duration-500 shadow-xl"
                                        >
                                            <Icon size={20} />
                                        </motion.a>
                                    ))}
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
                            <div className="liquid-glass border-white/10 squircle-2xl p-12 md:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.6)] relative overflow-hidden group">
                                {/* Form Inner Sparkle */}
                                <div className="absolute top-10 right-10 opacity-[0.05] pointer-events-none group-hover:rotate-180 transition-transform duration-1000">
                                    <Sparkles className="w-32 h-32 text-white" />
                                </div>

                                <form className="space-y-12 relative z-10">
                                    <div className="space-y-10">
                                        <div className="space-y-4">
                                            <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-1">Identity Label</Label>
                                            <Input
                                                placeholder="Codename / Name"
                                                className="h-16 bg-transparent border-0 border-b-2 border-white/5 rounded-none px-0 text-2xl font-black focus-visible:ring-0 focus-visible:border-blue-500 transition-all placeholder:text-gray-800 text-white"
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-1">Neural Access Point</Label>
                                            <Input
                                                type="email"
                                                placeholder="email@nexus.com"
                                                className="h-16 bg-transparent border-0 border-b-2 border-white/5 rounded-none px-0 text-2xl font-black focus-visible:ring-0 focus-visible:border-blue-500 transition-all placeholder:text-gray-800 text-white"
                                            />
                                        </div>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full h-20 bg-white text-black hover:bg-blue-600 hover:text-white squircle-xl flex items-center justify-center gap-4 font-black text-xl uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-all duration-700 group/btn"
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
