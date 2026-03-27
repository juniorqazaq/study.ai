import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, Trophy, FileText, Shield, Github } from 'lucide-react';
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
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 font-sans bg-white">
            {/* Left Side - Register Form */}
            <div className="flex flex-col justify-center items-center p-6 sm:p-12 lg:p-16 relative bg-white">
                <div className="absolute top-8 left-8 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#0066FF] flex items-center justify-center font-bold text-white shadow-md">
                        S
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-900">Study.ai</span>
                </div>

                <div className="w-full max-w-[420px] space-y-8 mt-12">
                    {/* Header */}
                    <div className="space-y-3 text-center lg:text-center px-4">
                        <h1 className="text-4xl font-bold tracking-tight text-slate-900">Create Account</h1>
                        <p className="text-slate-500 text-[15px]">Start your learning journey today.</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-4">
                            <Input
                                id="fullname"
                                type="text"
                                placeholder="Full Name"
                                className="h-12 border-slate-200 focus:border-[#0066FF] focus:ring-[#0066FF]/20 text-slate-900 transition-all font-medium rounded-xl px-4 bg-slate-50/50"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                                required
                            />

                            <Input
                                id="email"
                                type="email"
                                placeholder="Email Address"
                                className="h-12 border-slate-200 focus:border-[#0066FF] focus:ring-[#0066FF]/20 text-slate-900 transition-all font-medium rounded-xl px-4 bg-slate-50/50"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <Input
                                id="password"
                                type="password"
                                placeholder="Password"
                                className="h-12 border-slate-200 focus:border-[#0066FF] focus:ring-[#0066FF]/20 text-slate-900 transition-all font-medium rounded-xl px-4 bg-slate-50/50"
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
                                className="mt-1 border-slate-300 rounded-[4px]"
                            />
                            <label
                                htmlFor="terms"
                                className="text-[13px] font-medium leading-[1.4] text-slate-800"
                            >
                                I agree to the <span className="font-semibold text-slate-900 cursor-pointer">Terms of Service</span> and <span className="font-semibold text-slate-900 cursor-pointer">Privacy Policy</span>
                            </label>
                        </div>

                        <Button className="w-full h-12 text-[15px] font-medium rounded-xl bg-[#0066FF] hover:bg-blue-700 text-white transition-colors" type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <span className="animate-pulse">Creating...</span>
                            ) : (
                                <span className="flex items-center">
                                    Create Account <span className="ml-2 font-light">&rarr;</span>
                                </span>
                            )}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-slate-200" />
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="bg-white px-4 text-slate-400 font-medium">or</span>
                        </div>
                    </div>

                    {/* Social Login */}
                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="h-12 rounded-xl text-slate-700 font-semibold border-slate-200 hover:bg-slate-50 transition-colors" onClick={() => handleGoogleLogin()}>
                            <svg className="mr-2 h-5 w-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                <path fill="#4285F4" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                            </svg>
                            Google
                        </Button>
                        <Button variant="outline" className="h-12 rounded-xl text-slate-700 font-semibold border-slate-200 hover:bg-slate-50 transition-colors" onClick={handleGithubLogin}>
                            <Github className="mr-2 h-5 w-5" />
                            GitHub
                        </Button>
                    </div>

                    <div className="text-center text-[15px] pt-4 text-slate-600">
                        Already have an account?{" "}
                        <Link to="/login" className="font-semibold text-[#0066FF] hover:underline transition-colors">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>

            {/* Right Side - Visual Dashboard Mockup */}
            <div className="hidden lg:flex flex-col relative overflow-hidden items-center justify-center p-8">
                {/* Background Gradients */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1055EE] to-[#041a4a]" />

                {/* Content Container */}
                <div className="relative z-10 w-full flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-white mb-10 text-center"
                    >
                        <h2 className="text-[36px] font-bold mb-3 tracking-tight text-white/95">Start Your<br/>Learning Journey</h2>
                        <p className="text-white/80 text-[17px] mt-4 font-normal tracking-wide">Visualize your progress with advanced analytics.</p>
                    </motion.div>

                    {/* Stacked Glass Panels */}
                    <div className="relative w-full max-w-[440px] mt-4">
                        {/* Background glowing/glass panes (pure aesthetics matching image) */}
                        <div className="absolute top-[10px] left-[-3%] right-[-3%] h-[150px] bg-white/5 backdrop-blur-md rounded-2xl -z-10 shadow-lg" />
                        <div className="absolute top-[30px] left-[-5%] right-[-5%] h-[100px] bg-white/5 backdrop-blur-sm rounded-2xl -z-20 border border-white/5" />
                        
                        {/* Main Chart Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
                            className="bg-white/[0.07] backdrop-blur-xl rounded-[24px] border border-white/20 shadow-2xl p-6 relative pb-28 min-h-[290px]"
                        >
                            <h3 className="text-[14px] font-bold text-white tracking-wide mb-8">Weekly Activity</h3>
                            
                            <div className="absolute left-[-5%] right-0 h-[170px] bottom-24 opacity-80">
                                <ResponsiveContainer width="105%" height="100%">
                                    <AreaChart data={MOCK_CHART_DATA}>
                                        <defs>
                                            <linearGradient id="colorHoursReg" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.6} />
                                                <stop offset="95%" stopColor="#60A5FA" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        {/* A nice small arrow graphic can be mimicked by active dot or just area */}
                                        <Area type="monotone" dataKey="hours" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorHoursReg)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                            
                            {/* Badges Panel overlapping bottom */}
                            <div className="absolute bottom-6 left-6 right-6 bg-white/20 backdrop-blur-2xl rounded-2xl p-4 flex justify-between items-center z-20 border border-white/20 shadow-xl overflow-hidden">
                                <div className="absolute inset-0 bg-white opacity-5"></div>
                                
                                {/* 1. 100 Hours */}
                                <div className="flex flex-col items-center justify-center p-1 w-1/4">
                                    <div className="w-10 h-10 rounded-full bg-blue-500 shadow-md flex items-center justify-center mb-2 inset-0 ring-4 ring-blue-500/20">
                                        <Clock className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-800">100 Hours</span>
                                </div>

                                {/* 2. Top Learner */}
                                <div className="flex flex-col items-center justify-center p-1 w-1/4">
                                    <div className="w-10 h-10 rounded-full bg-amber-400 shadow-md flex items-center justify-center mb-2 inset-0 ring-4 ring-amber-400/20">
                                        <Trophy className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-800">Top Learner</span>
                                </div>

                                {/* 3. Quiz Master */}
                                <div className="flex flex-col items-center justify-center p-1 w-1/4">
                                    <div className="w-10 h-10 rounded-full bg-emerald-400 shadow-md flex items-center justify-center mb-2 inset-0 ring-4 ring-emerald-400/20">
                                        <FileText className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-800">Quiz Master</span>
                                </div>

                                {/* 4. Quiz Master */}
                                <div className="flex flex-col items-center justify-center p-1 w-1/4">
                                    <div className="w-10 h-10 rounded-full bg-red-400 shadow-md flex items-center justify-center mb-2 inset-0 ring-4 ring-red-400/20">
                                        <Shield className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-800">Quiz Master</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
