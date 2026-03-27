import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, HelpCircle, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { HeaderLogo } from './HeaderLogo';

const navItems = [
    { name: 'How It Works', href: '/how-it-works', icon: HelpCircle },
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
        <nav className="fixed top-0 w-full z-50 transition-all duration-300 px-4 pt-4 md:px-8">
            <div
                className={cn(
                    "max-w-7xl mx-auto rounded-2xl transition-all duration-300 border",
                    scrolled
                        ? "bg-[#0A0F1E]/95 backdrop-blur-2xl shadow-2xl shadow-black/40 border-white/10 py-2"
                        : "bg-[#0A0F1E]/80 backdrop-blur-xl border-white/8 py-3"
                )}
            >
                <div className="px-6 flex justify-between items-center">
                    {/* Logo Section */}
                    <Link to="/" className="flex items-center gap-3 group relative">
                        <HeaderLogo />
                    </Link>

                    {/* Desktop Navigation - Centered */}
                    {navItems.length > 0 && (
                        <div className="hidden lg:flex items-center justify-center flex-1">
                            <div className="flex items-center space-x-1 bg-white/5 p-1.5 rounded-full border border-white/10 backdrop-blur-sm">
                                {navItems.map((item) => {
                                    const isActive = location.pathname === item.href;
                                    return (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            className={cn(
                                                "relative px-4 py-2 text-sm font-bold transition-all duration-300 rounded-full uppercase tracking-wider",
                                                isActive
                                                    ? "text-white"
                                                    : "text-slate-400 hover:text-white"
                                            )}
                                        >
                                            {isActive && (
                                                <motion.div
                                                    layoutId="navbar-active"
                                                    className="absolute inset-0 bg-white/10 shadow-sm rounded-full"
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
                            className="text-sm font-black uppercase tracking-widest text-slate-400 hover:text-white px-4 py-2 transition-colors"
                        >
                            Log in
                        </Link>
                        <Link
                            to="/register"
                            className="relative group bg-white px-6 py-2.5 rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95"
                        >
                            <span className="relative z-10 text-black text-sm font-bold uppercase tracking-widest">Register</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Link>
                    </div>

                    {/* Mobile Menu Trigger */}
                    <div className="lg:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white transition-colors"
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
                        className="lg:hidden absolute top-24 left-4 right-4 bg-[#131B2F] rounded-3xl shadow-x border border-white/10 p-4 z-40 overflow-hidden"
                    >
                        <div className="flex flex-col space-y-2">
                            {navItems.length > 0 && navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className="flex items-center gap-4 px-4 py-4 rounded-2xl hover:bg-white/5 transition-colors group"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-white">{item.name}</span>
                                </Link>
                            ))}
                            <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/10">
                                <Link
                                    to="/login"
                                    className="flex items-center justify-center py-4 rounded-2xl font-bold text-slate-400 hover:bg-white/5 transition-colors"
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

