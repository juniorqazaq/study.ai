import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Globe, Sparkles, Twitter, Github, Linkedin, Instagram, MessageSquare } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-[#080C14] pt-24 pb-12 border-t border-white/5 font-sans relative overflow-hidden">
            {/* Subtle gradient glow at top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
            <div className="absolute top-0 left-1/4 w-96 h-64 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-64 bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-1 space-y-8">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                <Sparkles size={18} className="text-white" />
                            </div>
                            <span className="text-2xl font-black text-white tracking-tighter">
                                Study<span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent italic lowercase">.ai</span>
                            </span>
                        </Link>
                        <p className="text-zinc-500 text-sm font-medium leading-relaxed max-w-xs">
                            Synthesizing the future of cognitive enhancement through advanced neural pedagogies.
                        </p>
                        <div className="flex items-center gap-3">
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
                                    className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white hover:border-indigo-500/40 hover:bg-indigo-500/10 transition-all duration-200"
                                >
                                    <social.icon size={16} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Protocol Column */}
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Protocol</h4>
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
                                    className="text-zinc-400 hover:text-white text-sm font-medium transition-colors duration-200 w-fit"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Network Column */}
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Network</h4>
                        <div className="flex flex-col space-y-4">
                            {["Twitter", "Discord", "Ecosystem", "Research"].map((item) => (
                                <Link
                                    key={item}
                                    to="#"
                                    className="text-zinc-400 hover:text-white text-sm font-medium transition-colors duration-200 w-fit"
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Governance Column */}
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Governance</h4>
                        <div className="flex flex-col space-y-4">
                            {["Privacy Policy", "Terms of Service", "Cookie Policy", "Compliance"].map((item) => (
                                <Link
                                    key={item}
                                    to="#"
                                    className="text-zinc-400 hover:text-white text-sm font-medium transition-colors duration-200 w-fit"
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-zinc-600 text-[11px] font-bold uppercase tracking-widest">
                        © 2026 Study.ai — Neural Retention Protocol
                    </div>
                    <div className="flex items-center gap-2 text-zinc-500 text-[11px] font-bold uppercase tracking-widest cursor-pointer hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/5 hover:border-white/15">
                        <Globe size={12} />
                        <span>Core Interface: English</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
