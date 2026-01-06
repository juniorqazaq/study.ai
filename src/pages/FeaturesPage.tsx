import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Twitter, Instagram, Linkedin, Github, Sparkles, Send } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function FeaturesPage() {
    return (
        <div className="min-h-screen bg-white font-sans text-slate-950 overflow-hidden selection:bg-primary/10">
            <Header />

            <main className="relative min-h-screen flex items-center pt-20">
                {/* Background Outlined Text */}
                <div className="absolute bottom-10 left-10 md:left-20 pointer-events-none select-none z-0">
                    <h1
                        className="text-[120px] md:text-[200px] lg:text-[280px] font-black leading-none tracking-tighter opacity-[0.03]"
                        style={{ WebkitTextStroke: '2px #000', color: 'transparent' }}
                    >
                        STUDY AI
                    </h1>
                </div>

                {/* Decorative Sparkles */}
                <div className="absolute top-[20%] right-[10%] opacity-10 pointer-events-none">
                    <Sparkles className="w-24 h-24 text-slate-400 rotate-12" />
                </div>
                <div className="absolute bottom-[20%] right-[40%] opacity-[0.05] pointer-events-none">
                    <Sparkles className="w-16 h-16 text-slate-400 -rotate-12" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="space-y-12"
                        >
                            <div className="space-y-6">
                                <h2 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tight text-slate-900">
                                    <span className="text-primary opacity-50 font-normal mr-2 italic">//</span>
                                    Начни Кодить<br />
                                    <span className="text-[#94a3b8]">и Построй</span><br />
                                    Свое Будущее.
                                </h2>
                                <div className="space-y-4 max-w-md">
                                    <p className="text-lg text-slate-500 font-medium">
                                        Готовы начать свой путь? Свяжитесь с нами для получения индивидуального плана обучения.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">КОНТАКТЫ</span>
                                    <div className="text-3xl md:text-4xl font-black text-slate-900">1-800-888-4939</div>
                                    <p className="text-slate-400 font-medium hover:text-primary transition-colors cursor-pointer">hello@studyai.edu</p>
                                </div>

                                <div className="flex items-center gap-4">
                                    {[Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
                                        <motion.a
                                            key={i}
                                            href="#"
                                            whileHover={{ scale: 1.1, y: -2 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-white hover:shadow-lg transition-all border border-slate-100"
                                        >
                                            <Icon size={18} />
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Content - Form Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="bg-slate-50/50 backdrop-blur-2xl border border-white/80 rounded-[40px] p-8 md:p-12 shadow-2xl shadow-slate-200/50 relative overflow-hidden group">
                                {/* Form Inner Sparkle */}
                                <div className="absolute top-8 right-8 opacity-[0.08] pointer-events-none group-hover:rotate-45 transition-transform duration-700">
                                    <Sparkles className="w-20 h-20 text-slate-900" />
                                </div>

                                <form className="space-y-10 relative z-10">
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-800">ВАШЕ ИМЯ</Label>
                                            <Input
                                                placeholder="Иван Иванов"
                                                className="h-14 bg-transparent border-0 border-b border-slate-200 rounded-none px-0 text-xl font-medium focus-visible:ring-0 focus-visible:border-primary transition-all placeholder:text-slate-300"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-800">ВАШ EMAIL</Label>
                                            <Input
                                                type="email"
                                                placeholder="ivan@example.com"
                                                className="h-14 bg-transparent border-0 border-b border-slate-200 rounded-none px-0 text-xl font-medium focus-visible:ring-0 focus-visible:border-primary transition-all placeholder:text-slate-300"
                                            />
                                        </div>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02, backgroundColor: '#0f172a' }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center gap-3 font-bold text-lg shadow-xl shadow-slate-900/20 group/btn transition-colors"
                                    >
                                        Отправить сообщение
                                        <Send size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                    </motion.button>
                                </form>
                            </div>

                            {/* Decorative element behind card */}
                            <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full bg-primary/5 rounded-[40px] blur-2xl" />
                        </motion.div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
