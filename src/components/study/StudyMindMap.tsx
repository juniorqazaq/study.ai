import { motion } from "framer-motion";
import { Sparkles, GitBranch } from "lucide-react";

interface MindMapNode {
    id: string;
    label: string;
    children?: MindMapNode[];
    type?: 'root' | 'category' | 'concept';
}

const calculusData: MindMapNode = {
    id: 'root',
    label: 'Calculus I',
    type: 'root',
    children: [
        {
            id: 'sets',
            label: 'Sets & Logic',
            type: 'category',
            children: [
                { id: 'num-sets', label: 'Number Sets (N, Z, Q, R)', type: 'concept' },
                { id: 'intervals', label: 'Interval Notation', type: 'concept' },
                { id: 'subsets', label: 'Subset Properties', type: 'concept' }
            ]
        },
        {
            id: 'inequalities',
            label: 'Inequalities',
            type: 'category',
            children: [
                { id: 'solving', label: 'Solving Protocols', type: 'concept' },
                { id: 'abs-val', label: 'Absolute Values', type: 'concept' },
                { id: 'tri-ineq', label: 'Triangle Inequality', type: 'concept' }
            ]
        },
        {
            id: 'functions',
            label: 'Functions',
            type: 'category',
            children: [
                { id: 'rep', label: 'Representations', type: 'concept' },
                { id: 'dom-range', label: 'Domain & Range', type: 'concept' },
                { id: 'classes', label: 'Special Classes', type: 'concept' }
            ]
        }
    ]
};

export function StudyMindMap() {
    return (
        <div className="relative w-full min-h-[600px] flex items-center justify-center p-8 overflow-hidden">
            {/* Central Node */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="z-20 relative px-12 py-6 rounded-[2rem] bg-slate-900 border border-slate-800 shadow-2xl text-white font-black uppercase tracking-[0.3em] flex items-center gap-4"
            >
                <Sparkles size={24} className="text-blue-400" />
                {calculusData.label}
                <div className="absolute inset-0 bg-blue-600/20 blur-2xl -z-10 rounded-full animate-pulse" />
            </motion.div>

            {/* Connection Lines & Children */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {calculusData.children?.map((cat, i) => {
                    const angle = (i * 120) * (Math.PI / 180);
                    const radius = 240;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;

                    return (
                        <div key={cat.id} className="absolute" style={{ transform: `translate(${x}px, ${y}px)` }}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 + i * 0.1 }}
                                className="pointer-events-auto px-8 py-4 rounded-3xl liquid-glass-light border-slate-200 shadow-xl text-slate-950 font-black text-xs uppercase tracking-widest flex items-center gap-3 whitespace-nowrap"
                            >
                                <GitBranch size={16} className="text-blue-500" />
                                {cat.label}
                            </motion.div>

                            {/* Concepts (Sub-children) */}
                            <div className="absolute inset-0 pointer-events-none">
                                {cat.children?.map((concept, j) => {
                                    const subAngle = angle + (j - 1) * 0.4;
                                    const subRadius = 140;
                                    const sx = Math.cos(subAngle) * subRadius;
                                    const sy = Math.sin(subAngle) * subRadius;

                                    return (
                                        <motion.div
                                            key={concept.id}
                                            initial={{ opacity: 0, x: 0, y: 0 }}
                                            whileInView={{ opacity: 1, x: sx, y: sy }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.5 + i * 0.1 + j * 0.1 }}
                                            className="absolute pointer-events-auto px-5 py-2 rounded-full bg-white border border-slate-100 shadow-md text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap flex items-center gap-2"
                                        >
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                            {concept.label}
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* SVG Background Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                {/* Placeholder for real dynamic SVG pathing if needed, but the current layout works for demo */}
            </svg>
        </div>
    );
}
