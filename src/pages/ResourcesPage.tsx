import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BookOpen, FileText, GraduationCap, Video, Search, Filter, Download, ExternalLink, PlayCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function ResourcesPage() {
    const [activeCategory, setActiveCategory] = useState("All");

    const categories = ["All", "Guides", "Practice", "Videos", "Templates"];

    const resources = [
        {
            icon: BookOpen,
            category: "Guides",
            title: "Comprehensive Study Library",
            desc: "Access a wide range of study materials across subjects including Math, Science, and History.",
            color: "text-blue-500",
            glow: "shadow-blue-500/20",
            tags: ["PDF", "eBook"]
        },
        {
            icon: FileText,
            category: "Guides",
            title: "Effective Note-Taking",
            desc: "Master the Cornell method and other strategies to take better notes during lectures.",
            color: "text-purple-500",
            glow: "shadow-purple-500/20",
            tags: ["Article", "5 min read"]
        },
        {
            icon: GraduationCap,
            category: "Practice",
            title: "Mock Exam Simulator",
            desc: "Simulate real exam conditions with timed tests to boost your confidence.",
            color: "text-green-500",
            glow: "shadow-green-500/20",
            tags: ["Interactive", "Hard"]
        },
        {
            icon: Video,
            category: "Videos",
            title: "Calculus Fundamentals",
            desc: "Visual step-by-step explanations of limits, derivatives, and integrals.",
            color: "text-red-500",
            glow: "shadow-red-500/20",
            tags: ["Video", "15 mins"]
        },
        {
            icon: Download,
            category: "Templates",
            title: "Notion Study Planner",
            desc: "A ready-to-use Notion template to organize your semester and assignments.",
            color: "text-amber-500",
            glow: "shadow-amber-500/20",
            tags: ["Template", "Free"]
        },
        {
            icon: FileText,
            category: "Guides",
            title: "Active Recall Guide",
            desc: "Learn why simply re-reading is inefficient and how to test yourself properly.",
            color: "text-teal-500",
            glow: "shadow-teal-500/20",
            tags: ["Guide", "Essential"]
        }
    ];

    const filteredResources = activeCategory === "All"
        ? resources
        : resources.filter(r => r.category === activeCategory);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-950 relative overflow-hidden font-body">
            {/* Liquid Background Blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div className="liquid-blob liquid-blob-1" style={{ opacity: 0.05 }} />
                <div className="liquid-blob liquid-blob-3" style={{ opacity: 0.08 }} />
            </div>

            <Header />

            <main className="pt-40 pb-32 px-4 md:px-6 container mx-auto relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter bg-gradient-to-b from-slate-900 to-slate-500 bg-clip-text text-transparent">
                            Knowledge <span className="text-blue-600 drop-shadow-[0_0_20px_rgba(37,99,235,0.4)]">Hub</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-16 font-bold uppercase tracking-tight opacity-70">
                            Curated tools & directives for cognitive enhancement.
                        </p>
                    </motion.div>

                    {/* Search & Filter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="max-w-3xl mx-auto"
                    >
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />
                            <div className="relative liquid-glass-light border-slate-200 rounded-full flex items-center p-3 shadow-2xl">
                                <Search className="ml-6 text-gray-500" size={24} />
                                <input
                                    type="text"
                                    placeholder="Execute search protocol..."
                                    className="flex-1 bg-transparent border-none text-slate-950 px-6 py-4 focus:outline-none placeholder:text-slate-200 font-black text-lg tracking-tight"
                                />
                                <button className="p-4 bg-slate-50 hover:bg-slate-100 squircle-full text-slate-400 transition-all active:scale-90 mx-1">
                                    <Filter size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Categories */}
                        <div className="flex flex-wrap justify-center gap-4 mt-12">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 ${activeCategory === cat
                                        ? "bg-slate-900 text-white shadow-[0_10px_30px_rgba(15,23,42,0.2)] scale-105"
                                        : "bg-white border border-slate-100 text-slate-400 hover:bg-slate-50 hover:text-slate-900 shadow-sm"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Mastery Bundles Section */}
                <div className="mb-32 relative">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-px flex-1 bg-slate-200" />
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Featured Mastery Bundles</h2>
                        <div className="h-px flex-1 bg-slate-200" />
                    </div>

                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="group relative rounded-[4rem] overflow-hidden liquid-glass-light border-slate-200/60 p-12 md:p-20 shadow-[0_50px_100px_rgba(148,163,184,0.15)] bg-gradient-to-br from-white to-slate-50/50"
                        >
                            {/* Decorative Blobs */}
                            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-blue-600/10 transition-all duration-1000" />
                            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-purple-600/10 transition-all duration-1000" />

                            <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
                                <div>
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-[10px] font-black uppercase tracking-widest text-blue-600 mb-8 shadow-sm">
                                        <Sparkles size={12} />
                                        Complete Curriculum
                                    </div>
                                    <h3 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter leading-[0.9] text-slate-950">
                                        Calculus I:<br />
                                        <span className="text-blue-600">Functions & Limits</span>
                                    </h3>
                                    <p className="text-lg text-slate-500 font-bold mb-10 italic leading-relaxed opacity-80">
                                        A comprehensive mastery bundle featuring ready-made lectures, interactive mind maps, and practice protocols adapted from James Stewart's Calculus.
                                    </p>
                                    <div className="flex flex-wrap gap-4 mb-12">
                                        {["Lecture Notes", "Mind Map", "Open Questions", "Practice Test"].map(t => (
                                            <span key={t} className="px-4 py-2 rounded-full bg-white border border-slate-100 text-[10px] uppercase tracking-widest text-slate-400 font-black shadow-sm">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                    <Link
                                        to="/resources/calculus"
                                        className="inline-flex items-center gap-4 px-10 py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-sm hover:bg-blue-600 transition-all shadow-2xl active:scale-95 group/btn"
                                    >
                                        Initialize Lesson
                                        <PlayCircle size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                                <div className="relative">
                                    <div className="aspect-square rounded-[3rem] bg-slate-50 border border-slate-100 shadow-inner flex items-center justify-center p-8 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-blue-600/5 backdrop-blur-3xl animate-pulse" />
                                        <BookOpen size={180} className="text-slate-200 relative z-10" />
                                        {/* Abstract UI elements */}
                                        <div className="absolute top-10 right-10 w-20 h-2 bg-slate-200 rounded-full" />
                                        <div className="absolute top-16 right-10 w-12 h-2 bg-slate-200 rounded-full opacity-50" />
                                    </div>
                                    {/* Stats badge */}
                                    <div className="absolute -bottom-6 -right-6 liquid-glass-light border-slate-200 p-6 rounded-[2rem] shadow-2xl animate-bounce-slow">
                                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Students Syncing</div>
                                        <div className="text-2xl font-black text-blue-600 tracking-tighter">1.2k+ Active</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {filteredResources.map((r, idx) => (
                        <motion.div
                            key={`${r.title}-${idx}`}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.8 }}
                            className="group flex flex-col p-10 rounded-[3rem] liquid-glass-light border-slate-200/60 hover:border-blue-500/30 transition-all duration-700 hover:shadow-[0_20px_80px_rgba(148,163,184,0.12)] relative overflow-hidden bg-gradient-to-br from-white to-slate-50/50"
                        >
                            {/* Hover Glow */}
                            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-blue-600/20 transition-all duration-700" />

                            <div className="flex items-start justify-between mb-10 relative z-10">
                                <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center bg-slate-50 border border-slate-100 ${r.color} shadow-lg ${r.glow} group-hover:scale-110 transition-transform duration-700`}>
                                    <r.icon size={32} />
                                </div>
                                <div className="flex gap-2">
                                    {r.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 rounded-full bg-white border border-slate-100 text-[10px] uppercase tracking-widest text-slate-400 font-black">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <h3 className="text-2xl font-black mb-4 text-slate-950 group-hover:text-blue-600 transition-colors duration-500 tracking-tight leading-none">{r.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-10 flex-1 font-bold italic opacity-70">
                                {r.desc}
                            </p>

                            <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 group-hover:text-white transition-all duration-500 bg-slate-50 group-hover:bg-blue-600 px-6 py-4 rounded-[1.5rem] border border-slate-100 w-fit">
                                {r.category === 'Videos' ? <PlayCircle size={16} /> : <ExternalLink size={16} />}
                                Access Node
                            </button>
                        </motion.div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}
