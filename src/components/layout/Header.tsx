import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { HeaderLogo } from './HeaderLogo';

const IcoHowItWorks = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
const IcoResources = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>;
const IcoPricing = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>;
const IcoSupport = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a8 8 0 0 1-8 8H7l-4 3v-7a8 8 0 1 1 18-4Z"/></svg>;
const IcoMenu = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
const IcoClose = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;

const navItems = [
    { name: 'Resources', href: '/resources', Icon: IcoResources },
    { name: 'Pricing', href: '/pricing', Icon: IcoPricing },
    { name: 'Support', href: '/support', Icon: IcoSupport },
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
                        ? "bg-[#07090f]/95 backdrop-blur-2xl shadow-2xl shadow-black/40 border-[#1e2235] py-2"
                        : "bg-[#07090f]/80 backdrop-blur-xl border-[#1e2235]/60 py-3"
                )}
            >
                <div className="px-6 grid grid-cols-[1fr_auto_1fr] items-center gap-6">
                    {/* Logo */}
                    <Link to="/" className="justify-self-start flex items-center gap-3 group relative" onClick={() => window.scrollTo(0,0)}>
                        <HeaderLogo />
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center justify-center">
                        <div className="flex items-center space-x-1 bg-white/5 p-1.5 rounded-full border border-[#1e2235] backdrop-blur-sm">
                            {navItems.map((item) => {
                                const isActive = location.pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        onClick={() => window.scrollTo(0,0)}
                                        className={cn(
                                            "relative w-[138px] px-4 py-2 text-center text-sm font-bold transition-all duration-300 rounded-full uppercase tracking-wider",
                                            isActive ? "text-[#e2e8f0]" : "text-[#e2e8f0]/50 hover:text-[#e2e8f0]"
                                        )}
                                    >
                                        {isActive && (
                                            <div className="absolute inset-0 bg-white/10 shadow-sm rounded-full" />
                                        )}
                                        <span className="relative z-10">{item.name}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    <div className="justify-self-end flex items-center">
                        {/* Desktop CTAs */}
                        <div className="hidden md:flex items-center space-x-2">
                            <Link
                                to="/login"
                                onClick={() => window.scrollTo(0,0)}
                                className="text-sm font-bold uppercase tracking-widest text-[#e2e8f0]/50 hover:text-[#e2e8f0] px-4 py-2 transition-colors"
                            >
                                Log in
                            </Link>
                            <Link
                                to="/register"
                                onClick={() => window.scrollTo(0,0)}
                                className="bg-[#0066FF] hover:bg-[#0052CC] px-6 py-2.5 rounded-full transition-all duration-200 active:scale-95 shadow-[0_0_16px_rgba(0,102,255,0.3)]"
                            >
                                <span className="text-white text-sm font-bold uppercase tracking-widest">Register</span>
                            </Link>
                        </div>

                        {/* Mobile Menu Btn */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 rounded-xl bg-white/5 text-[#e2e8f0]/60 hover:text-[#e2e8f0] transition-colors"
                            >
                                {isOpen ? <IcoClose /> : <IcoMenu />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="lg:hidden absolute top-24 left-4 right-4 bg-[#0d0f1a] rounded-3xl shadow-xl border border-[#1e2235] p-4 z-40"
                    >
                        <div className="flex flex-col space-y-2">
                            {[{ name: 'How It Works', href: '/', Icon: IcoHowItWorks }, ...navItems].map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className="flex items-center gap-4 px-4 py-4 rounded-2xl hover:bg-white/5 transition-colors group text-[#e2e8f0]/70 hover:text-[#e2e8f0]"
                                    onClick={() => { setIsOpen(false); window.scrollTo(0,0); }}
                                >
                                    <div className="w-10 h-10 rounded-xl bg-[#1a1d2e] flex items-center justify-center group-hover:bg-[#0066FF]/10 group-hover:text-[#0066FF] transition-colors">
                                        <item.Icon />
                                    </div>
                                    <span className="font-bold">{item.name}</span>
                                </Link>
                            ))}
                            <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-[#1e2235]">
                                <Link
                                    to="/login"
                                    className="flex items-center justify-center py-4 rounded-2xl font-bold text-[#e2e8f0]/50 hover:bg-white/5 transition-colors"
                                    onClick={() => { setIsOpen(false); window.scrollTo(0,0); }}
                                >
                                    Log in
                                </Link>
                                <Link
                                    to="/register"
                                    className="flex items-center justify-center py-4 rounded-2xl font-bold bg-[#0066FF] text-white shadow-lg active:scale-95 transition-all text-sm uppercase tracking-widest"
                                    onClick={() => { setIsOpen(false); window.scrollTo(0,0); }}
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
