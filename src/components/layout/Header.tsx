import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, Zap, HelpCircle, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const navItems = [
    { name: 'How It Works', href: '/how-it-works', icon: HelpCircle },
    { name: 'Features', href: '/features', icon: Zap },
    { name: 'Resources', href: '/resources', icon: BookOpen },
    { name: 'Pricing', href: '/pricing', icon: CreditCard },
];

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300 px-4 pt-4 md:px-8",
                scrolled ? "pt-2" : "pt-4"
            )}
        >
            <div
                className={cn(
                    "max-w-7xl mx-auto rounded-2xl transition-all duration-300 border",
                    "max-w-7xl mx-auto rounded-2xl transition-all duration-300 border",
                    scrolled
                        ? "bg-white/90 backdrop-blur-2xl shadow-xl border-slate-200/50 py-2 ring-1 ring-black/5"
                        : "bg-transparent border-transparent py-4"
                )}
            >
                <div className="px-6 flex justify-between items-center">
                    {/* Logo Section */}
                    <Link to="/" className="flex items-center gap-2 group relative">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center"
                        >
                            <span className="text-2xl font-black text-slate-900 tracking-tighter uppercase shrink-0">
                                STUDY<span className="text-primary italic"> AI</span>
                            </span>
                        </motion.div>
                        <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                    </Link>

                    {/* Desktop Navigation - Centered */}
                    {navItems.length > 0 && (
                        <div className="hidden lg:flex items-center justify-center flex-1">
                            <div className="flex items-center space-x-1 bg-slate-100/50 p-1.5 rounded-full border border-slate-200/20 backdrop-blur-sm">
                                {navItems.map((item) => {
                                    const isActive = location.pathname === item.href;
                                    return (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            className={cn(
                                                "relative px-4 py-2 text-sm font-bold transition-all duration-300 rounded-full uppercase tracking-wider",
                                                isActive
                                                    ? "text-primary"
                                                    : "text-slate-500 hover:text-slate-900"
                                            )}
                                        >
                                            {isActive && (
                                                <motion.div
                                                    layoutId="navbar-active"
                                                    className="absolute inset-0 bg-white shadow-sm rounded-full"
                                                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                                                />
                                            )}
                                            <span className="relative z-10">{item.name}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                    {navItems.length === 0 && <div className="flex-1" />}

                    {/* Desktop CTA Section */}
                    <div className="hidden md:flex items-center space-x-2">
                        <Link
                            to="/login"
                            className="text-sm font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 px-4 py-2 transition-colors"
                        >
                            Log in
                        </Link>
                        <Link
                            to="/register"
                            className="relative group bg-slate-900 px-6 py-2.5 rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] active:scale-95"
                        >
                            <span className="relative z-10 text-white text-sm font-bold uppercase tracking-widest">Register</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Link>
                    </div>

                    {/* Mobile Menu Trigger */}
                    <div className="lg:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="lg:hidden absolute top-24 left-4 right-4 bg-white rounded-3xl shadow-2xl border border-slate-100 p-4 z-40 overflow-hidden"
                    >
                        <div className="flex flex-col space-y-2">
                            {navItems.length > 0 && navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className="flex items-center gap-4 px-4 py-4 rounded-2xl hover:bg-slate-50 transition-colors group"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-slate-900">{item.name}</span>
                                </Link>
                            ))}
                            <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-100">
                                <Link
                                    to="/login"
                                    className="flex items-center justify-center py-4 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Log in
                                </Link>
                                <Link
                                    to="/register"
                                    className="flex items-center justify-center py-4 rounded-2xl font-bold bg-primary text-white shadow-lg shadow-blue-500/20 active:scale-95 transition-all text-sm uppercase tracking-widest"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Register
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

