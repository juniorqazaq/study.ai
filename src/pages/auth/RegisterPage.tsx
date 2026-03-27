import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { googleLogin } from "@/shared/api/endpoints/auth.api.ts";
import { setAuthToken } from "@/shared/api/axiosInstance.ts";
import Cookies from "js-cookie";
import { useGoogleLogin } from '@react-oauth/google';
import { storageService } from '@/shared/services/storage.service';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

const MOCK_CHART_DATA = [
    { name: 'Mon', hours: 2.5 },
    { name: 'Tue', hours: 4.2 },
    { name: 'Wed', hours: 3.8 },
    { name: 'Thu', hours: 5.5 },
    { name: 'Fri', hours: 4.0 },
    { name: 'Sat', hours: 6.2 },
    { name: 'Sun', hours: 5.1 },
];

const IconClock = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const IconTrophy = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>;
const IconFileText = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>;
const IconFlame = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>;
const IconGithub = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e2e8f0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>;

export function RegisterPage() {
    const navigate = useNavigate();
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!agreed) {
            alert('Please agree to the Terms of Service and Privacy Policy');
            return;
        }
        setIsLoading(true);
        setTimeout(() => {
            const mockToken = 'mock_token_' + Date.now();
            setAuthToken(mockToken);
            Cookies.set('token', mockToken);
            storageService.saveUser({ id: '1', email, fullName: fullname });
            setIsLoading(false);
            window.scrollTo(0, 0);
            navigate('/dashboard');
        }, 800);
    };

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const response = await googleLogin(tokenResponse.access_token);
                if (response) {
                    const { accessToken } = response;
                    setAuthToken(accessToken);
                    Cookies.set('token', accessToken);
                    window.scrollTo(0, 0);
                    navigate('/dashboard');
                }
            } catch (error) {
                console.error('Google login failed:', error);
            }
        },
        onError: () => {
            console.error('Google login failed');
        }
    });

    const handleGithubLogin = () => {
        const clientId = "Ov23lieKTVcp8Gu4LbHy";
        const redirectUri = "http://localhost:5173/login";
        const githubUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`;
        window.location.href = githubUrl;
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 font-sans bg-[#0A0F1E]">
            <div className="relative flex flex-col justify-center items-center overflow-hidden p-6 sm:p-12 lg:p-16 bg-[#0A0F1E]">
                <div className="absolute right-10 top-12 h-40 w-40 rounded-full bg-[#0066FF]/10 blur-[90px] pointer-events-none" />
                <div className="absolute left-10 bottom-20 h-28 w-28 rounded-full bg-[#10b981]/10 blur-[80px] pointer-events-none" />

                <div className="absolute top-8 left-8 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#0066FF]/20 border border-[#0066FF]/20 flex items-center justify-center font-bold text-[#0066FF]">
                        S
                    </div>
                    <span className="text-xl font-bold tracking-tight"><span className="text-[#0066FF]">Study</span><span className="text-[#EAF4FF]">.ai</span></span>
                </div>

                <div className="relative z-10 w-full max-w-[470px] rounded-[2rem] border border-white/8 bg-[#111827]/88 p-8 shadow-[0_32px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl">
                    <div className="mb-8 flex items-center gap-3">
                        <div className="rounded-full border border-[#10b981]/20 bg-[#10b981]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#34d399]">
                            Fast setup
                        </div>
                        <div className="rounded-full border border-[#f59e0b]/20 bg-[#f59e0b]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#fbbf24]">
                            New account
                        </div>
                    </div>

                    <div className="space-y-3 text-left">
                        <h1 className="text-4xl font-black tracking-tight text-[#e2e8f0]">Create Account</h1>
                        <p className="text-[#e2e8f0]/58 text-[15px] leading-7">Create your workspace, upload material, and turn it into flashcards, quizzes, notes, and maps.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                        <div className="space-y-4">
                            <Input
                                id="fullname"
                                type="text"
                                placeholder="Full Name"
                                className="h-13 bg-[#171d2b] border-[#2a3349] text-[#e2e8f0] placeholder:text-[#e2e8f0]/35 focus:border-[#0066FF] focus:ring-[#0066FF]/20 transition-all font-medium rounded-xl px-4"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                                required
                            />

                            <Input
                                id="email"
                                type="email"
                                placeholder="Email Address"
                                className="h-13 bg-[#171d2b] border-[#2a3349] text-[#e2e8f0] placeholder:text-[#e2e8f0]/35 focus:border-[#0066FF] focus:ring-[#0066FF]/20 transition-all font-medium rounded-xl px-4"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <Input
                                id="password"
                                type="password"
                                placeholder="Password"
                                className="h-13 bg-[#171d2b] border-[#2a3349] text-[#e2e8f0] placeholder:text-[#e2e8f0]/35 focus:border-[#0066FF] focus:ring-[#0066FF]/20 transition-all font-medium rounded-xl px-4"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex items-start space-x-3 pt-2 pb-2">
                            <Checkbox
                                id="terms"
                                checked={agreed}
                                onCheckedChange={(checked) => setAgreed(checked as boolean)}
                                className="mt-1 border-[#252840] data-[state=checked]:bg-[#0066FF] data-[state=checked]:border-[#0066FF] rounded-[4px]"
                            />
                            <label
                                htmlFor="terms"
                                className="text-[13px] font-medium leading-[1.4] text-[#e2e8f0]/80"
                            >
                                I agree to the <span className="font-semibold text-[#e2e8f0] hover:text-[#0066FF] transition-colors cursor-pointer">Terms of Service</span> and <span className="font-semibold text-[#e2e8f0] hover:text-[#0066FF] transition-colors cursor-pointer">Privacy Policy</span>
                            </label>
                        </div>

                        <Button className="w-full h-12 text-[15px] font-medium rounded-xl bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:opacity-90 text-white transition-all shadow-[0_0_20px_rgba(79,110,247,0.28)] border-none" type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <span className="animate-pulse">Creating...</span>
                            ) : (
                                <span className="flex items-center">
                                    Create Account <span className="ml-2 font-light">&rarr;</span>
                                </span>
                            )}
                        </Button>
                    </form>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-[#252840]" />
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="bg-[#07090f] px-4 text-[#e2e8f0]/50 font-medium tracking-wider uppercase">or</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="h-12 rounded-xl text-[#e2e8f0] font-medium bg-[#171d2b] border-[#2a3349] hover:bg-[#20283b] transition-colors" onClick={() => handleGoogleLogin()}>
                            <svg className="mr-2 h-5 w-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                <path fill="#4285F4" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                            </svg>
                            Google
                        </Button>
                        <Button variant="outline" className="h-12 rounded-xl text-[#e2e8f0] font-medium bg-[#171d2b] border-[#2a3349] hover:bg-[#20283b] transition-colors" onClick={handleGithubLogin}>
                            <IconGithub />
                            <span className="ml-2">GitHub</span>
                        </Button>
                    </div>

                    <div className="text-center text-[15px] pt-4 text-[#e2e8f0]/60">
                        Already have an account?{" "}
                        <Link to="/login" className="font-semibold text-[#0066FF] hover:opacity-80 transition-colors" onClick={() => window.scrollTo(0,0)}>
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>

            <div className="hidden lg:flex flex-col relative overflow-hidden items-center justify-center p-10 border-l border-[#252840] bg-[#0E1424]">
                <div className="absolute top-[24%] left-[18%] h-[280px] w-[280px] rounded-full bg-[#0066FF]/10 blur-[110px] pointer-events-none" />
                <div className="absolute bottom-[14%] right-[18%] h-[240px] w-[240px] rounded-full bg-[#10b981]/8 blur-[110px] pointer-events-none" />
                <div className="absolute top-[18%] right-[16%] h-[180px] w-[180px] rounded-full bg-[#f59e0b]/8 blur-[90px] pointer-events-none" />

                <div className="relative z-10 w-full flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-10 text-center"
                    >
                        <h2 className="text-[36px] font-black mb-3 tracking-tight text-[#e2e8f0]">Start Your
                            <br />Learning Journey</h2>
                        <p className="text-[#e2e8f0]/64 text-[17px] mt-4 font-normal tracking-wide">A cleaner workspace for focused study, less friction, and more consistent revision.</p>
                    </motion.div>

                    {/* Dashboard Card */}
                    <div className="relative w-full max-w-[440px] mt-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
                            className="bg-[#141B2B] rounded-[24px] border border-[#28324a] shadow-2xl p-6 relative pb-28 min-h-[290px]"
                        >
                            <h3 className="text-[14px] font-bold text-[#e2e8f0] tracking-wide mb-8">Weekly Activity</h3>
                            
                            <div className="absolute left-[-5%] right-0 h-[170px] bottom-24 opacity-80">
                                <ResponsiveContainer width="105%" height="100%">
                                    <AreaChart data={MOCK_CHART_DATA}>
                                        <defs>
                                            <linearGradient id="colorHoursReg" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#0066FF" stopOpacity={0.6} />
                                                <stop offset="95%" stopColor="#0066FF" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <Area type="monotone" dataKey="hours" stroke="#0066FF" strokeWidth={3} fillOpacity={1} fill="url(#colorHoursReg)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                            
                            {/* Badges Panel overlapping bottom */}
                            <div className="absolute bottom-6 left-6 right-6 bg-[#1a1d2e] rounded-[16px] p-4 flex justify-between items-center z-20 border border-[#252840] shadow-xl overflow-hidden">
                                
                                {/* 1. 100 Hours */}
                                <div className="flex flex-col items-center justify-center p-1 w-1/4 group cursor-pointer">
                                    <div className="w-10 h-10 rounded-full bg-[#141728] border border-[#2a3349] shadow-md flex items-center justify-center mb-2 group-hover:border-[#0066FF] transition-colors">
                                        <IconClock />
                                    </div>
                                    <span className="text-[10px] font-semibold text-[#e2e8f0]/80">100 Hours</span>
                                </div>

                                {/* 2. Top Learner */}
                                <div className="flex flex-col items-center justify-center p-1 w-1/4 group cursor-pointer">
                                    <div className="w-10 h-10 rounded-full bg-[#141728] border border-[#2a3349] shadow-md flex items-center justify-center mb-2 group-hover:border-[#f59e0b] transition-colors">
                                        <IconTrophy />
                                    </div>
                                    <span className="text-[10px] font-semibold text-[#e2e8f0]/80">Top Learner</span>
                                </div>

                                {/* 3. Quiz Master */}
                                <div className="flex flex-col items-center justify-center p-1 w-1/4 group cursor-pointer">
                                    <div className="w-10 h-10 rounded-full bg-[#141728] border border-[#2a3349] shadow-md flex items-center justify-center mb-2 group-hover:border-[#10b981] transition-colors">
                                        <IconFileText />
                                    </div>
                                    <span className="text-[10px] font-semibold text-[#e2e8f0]/80">Quiz Master</span>
                                </div>

                                {/* 4. Streak 30 */}
                                <div className="flex flex-col items-center justify-center p-1 w-1/4 group cursor-pointer">
                                    <div className="w-10 h-10 rounded-full bg-[#141728] border border-[#2a3349] shadow-md flex items-center justify-center mb-2 group-hover:border-[#fb7185] transition-colors">
                                        <IconFlame />
                                    </div>
                                    <span className="text-[10px] font-semibold text-[#e2e8f0]/80">Streak 30</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
