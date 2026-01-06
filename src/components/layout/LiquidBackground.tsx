import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LiquidBackgroundProps {
    className?: string;
    children?: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'mixed';
}

export function LiquidBackground({ className, children }: LiquidBackgroundProps) {
    return (
        <div className={cn("relative overflow-hidden", className)}>
            {/* Background Mesh */}
            <div className="absolute inset-0 z-0 bg-white" />
            <div className="absolute inset-0 z-0 animate-mesh liquid-mesh-primary opacity-60" />

            {/* Animated Blobs */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-blue-400/10 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        x: [0, -80, 0],
                        y: [0, 100, 0],
                        scale: [1.2, 1, 1.2],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{
                        x: [0, 50, 0],
                        y: [0, -100, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute -bottom-[10%] left-[20%] w-[45%] h-[45%] bg-indigo-400/10 rounded-full blur-[110px]"
                />
            </div>

            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
