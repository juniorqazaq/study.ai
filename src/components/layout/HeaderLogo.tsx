import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function HeaderLogo() {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3"
        >
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Sparkles size={18} className="text-white" />
            </div>
            <span className="text-2xl font-black text-slate-900 tracking-tighter shrink-0">
                Study<span className="text-primary italic lowercase">.ai</span>
            </span>
        </motion.div>
    );
}
