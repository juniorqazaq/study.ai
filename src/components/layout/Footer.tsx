import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Globe, Sparkles, Twitter, Github, Linkedin, Instagram, MessageSquare } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-white pt-32 pb-12 border-t border-slate-100 font-sans relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-1 space-y-8">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-blue-500/30">
                                <Sparkles size={18} className="text-white" />
                            </div>
                            <span className="text-2xl font-black text-slate-900 tracking-tighter">
                                Study<span className="text-primary italic lowercase">.ai</span>
                            </span>
                        </Link>
                        <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xs italic">
                            Synthesizing the future of cognitive enhancement through advanced neural pedagogies.
                        </p>
                        <div className="flex items-center gap-4">
                            {[
                                { icon: Twitter, href: "#" },
                                { icon: Github, href: "#" },
                                { icon: Linkedin, href: "#" },
                                { icon: Instagram, href: "#" },
                                { icon: MessageSquare, href: "#" }
                            ].map((social, idx) => (
                                <motion.a
                                    key={idx}
                                    href={social.href}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/30 transition-all shadow-sm"
                                >
                                    <social.icon size={18} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Product Column */}
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900">Protocol</h4>
                        <div className="flex flex-col space-y-4">
                            {[
                                { name: "How It Works", href: "/how-it-works" },
                                { name: "Features", href: "/features" },
                                { name: "Resources", href: "/resources" },
                                { name: "Pricing", href: "/pricing" }
                            ].map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className="text-slate-400 hover:text-primary text-sm font-bold transition-colors w-fit"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Social/Community Column */}
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900">Network</h4>
                        <div className="flex flex-col space-y-4">
                            {["Twitter", "Discord", "Ecosystem", "Research"].map((item) => (
                                <Link
                                    key={item}
                                    to="#"
                                    className="text-slate-400 hover:text-slate-900 text-sm font-bold transition-colors w-fit"
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Legal Column */}
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900">Governance</h4>
                        <div className="flex flex-col space-y-4">
                            {["Privacy Policy", "Terms of Service", "Cookie Policy", "Compliance"].map((item) => (
                                <Link
                                    key={item}
                                    to="#"
                                    className="text-slate-400 hover:text-slate-900 text-sm font-bold transition-colors w-fit"
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-2 text-slate-300 text-[10px] font-black uppercase tracking-widest">
                        <span>&copy; 2026 Study.ai // Neural Retention Protocol</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest cursor-pointer hover:text-primary transition-colors bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                        <Globe size={12} />
                        <span>Core Interface: English</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
