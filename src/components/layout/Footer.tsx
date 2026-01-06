import { Link } from "react-router-dom";
import { Globe } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-white pt-24 pb-12 border-t border-slate-100 font-sans">
            <div className="container mx-auto px-6">

                <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                        <span>&copy; 2026 STUDY AI. All rights reserved.</span>
                    </div>

                    <div className="flex items-center gap-8">
                        {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                            <Link
                                key={item}
                                to="#"
                                className="text-xs text-slate-400 font-medium hover:text-slate-900 transition-colors"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 text-slate-400 text-xs font-medium cursor-pointer hover:text-primary transition-colors">
                        <Globe size={14} />
                        <span>English (US)</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
