import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BookOpen, FileText, GraduationCap, Video, Search, Filter, Download, ExternalLink, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";

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
        <div className="min-h-screen bg-black text-white relative overflow-hidden font-body">
            {/* Liquid Background Blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div className="liquid-blob liquid-blob-1" style={{ opacity: 0.1 }} />
                <div className="liquid-blob liquid-blob-3" style={{ opacity: 0.15 }} />
            </div>

            <Header />

            <main className="pt-40 pb-32 px-4 md:px-6 container mx-auto relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
                            Knowledge <span className="text-blue-600 drop-shadow-[0_0_20px_rgba(37,99,235,0.4)]">Hub</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto mb-16 font-bold uppercase tracking-tight opacity-70">
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
                            <div className="relative liquid-glass border-white/10 rounded-full flex items-center p-3 shadow-2xl">
                                <Search className="ml-6 text-gray-500" size={24} />
                                <input
                                    type="text"
                                    placeholder="Execute search protocol..."
                                    className="flex-1 bg-transparent border-none text-white px-6 py-4 focus:outline-none placeholder:text-gray-800 font-black text-lg tracking-tight"
                                />
                                <button className="p-4 bg-white/5 hover:bg-white/10 squircle-full text-gray-400 transition-all active:scale-90 mx-1">
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
                                    className={`px-8 py-3 squircle-xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 ${activeCategory === cat
                                        ? "bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.2)] scale-105"
                                        : "bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white border border-white/5"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {filteredResources.map((r, idx) => (
                        <motion.div
                            key={`${r.title}-${idx}`}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.8 }}
                            className="group flex flex-col p-10 squircle-2xl liquid-glass border-white/5 hover:border-blue-500/30 transition-all duration-700 hover:shadow-[0_20px_80px_rgba(0,0,0,0.5)] relative overflow-hidden"
                        >
                            {/* Hover Glow */}
                            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-blue-600/20 transition-all duration-700" />

                            <div className="flex items-start justify-between mb-10 relative z-10">
                                <div className={`w-16 h-16 squircle-xl flex items-center justify-center bg-white/5 border border-white/10 ${r.color} shadow-lg ${r.glow} group-hover:scale-110 transition-transform duration-700`}>
                                    <r.icon size={32} />
                                </div>
                                <div className="flex gap-2">
                                    {r.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 squircle-lg bg-white/5 border border-white/5 text-[10px] uppercase tracking-widest text-gray-500 font-black">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <h3 className="text-2xl font-black mb-4 text-white group-hover:text-blue-400 transition-colors duration-500 tracking-tight leading-none">{r.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-10 flex-1 font-bold italic opacity-70">
                                {r.desc}
                            </p>

                            <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 group-hover:text-white transition-all duration-500 bg-white/5 group-hover:bg-blue-600 px-6 py-4 squircle-xl border border-white/5 w-fit">
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
