import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, Github, BarChart3, Clock, CheckCircle2, TrendingUp } from 'lucide-react';
import { googleLogin, githubLogin } from "@/shared/api/endpoints/auth.api.ts";
import { setAuthToken } from "@/shared/api/axiosInstance.ts";
import Cookies from "js-cookie";
import { useGoogleLogin } from '@react-oauth/google';
import { storageService } from '@/shared/services/storage.service';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";

const MOCK_CHART_DATA = [
    { name: 'Mon', hours: 2.5 },
    { name: 'Tue', hours: 4.2 },
    { name: 'Wed', hours: 3.8 },
    { name: 'Thu', hours: 5.5 },
    { name: 'Fri', hours: 4.0 },
    { name: 'Sat', hours: 6.2 },
    { name: 'Sun', hours: 5.1 },
];

export function LoginPage() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate network delay for smooth UX
        setTimeout(() => {
            const mockToken = 'mock_token_' + Date.now();
            setAuthToken(mockToken);
            Cookies.set('token', mockToken);
            storageService.saveUser({ id: '1', email, fullName: email.split('@')[0] });
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

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            githubLogin(code).then(response => {
                if (response) {
                    const { accessToken } = response;
                    setAuthToken(accessToken);
                    Cookies.set('token', accessToken);
                    navigate('/dashboard');
                }
            }).catch(error => {
                console.error('GitHub login failed:', error);
            });
        }
    }, [navigate]);

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 font-sans bg-white">
            {/* Left Side - Login Form */}
            <div className="flex flex-col justify-center items-center p-6 sm:p-12 lg:p-16 relative bg-white">
                <div className="absolute top-8 left-8 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#0066FF] flex items-center justify-center font-bold text-white shadow-md">
                        S
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-900">Study.ai</span>
                </div>

                <div className="w-full max-w-md space-y-8 mt-12">
                    {/* Header */}
                    <div className="space-y-3 text-center lg:text-left">
                        <h1 className="text-[2.5rem] leading-tight font-bold tracking-tight text-slate-900">Welcome Back</h1>
                        <p className="text-muted-foreground text-[15px]">Log in to access your Premium Study Dashboard.</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-4">
                            <div className="space-y-2 text-left">
                                <Label htmlFor="email" className="font-semibold text-slate-800">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    className="h-12 border-slate-200 focus:border-[#0066FF] focus:ring-[#0066FF]/20 text-slate-900 transition-all font-medium rounded-xl px-4"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2 text-left">
                                <Label htmlFor="password" className="font-semibold text-slate-800">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="h-12 border-slate-200 focus:border-[#0066FF] focus:ring-[#0066FF]/20 text-slate-900 transition-all font-medium rounded-xl pr-10 px-4 tracking-widest placeholder:tracking-normal"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="remember" className="border-slate-300 rounded-[4px]" />
                                <label
                                    htmlFor="remember"
                                    className="text-[14px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-600 cursor-pointer"
                                >
                                    Remember me
                                </label>
                            </div>
                            <Link
                                to="/forgot-password"
                                className="text-[14px] font-medium text-[#0066FF] hover:underline"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        <Button className="w-full h-12 text-[15px] font-semibold rounded-xl bg-[#0066FF] hover:bg-blue-700 text-white transition-colors" type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <span className="animate-pulse">Logging in...</span>
                            ) : (
                                "Log In"
                            )}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-slate-200" />
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="bg-white px-4 text-slate-400 font-medium uppercase tracking-wider">Or continue with</span>
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
                        Don't have an account?{" "}
                        <Link to="/register" className="font-semibold text-[#0066FF] hover:underline transition-colors">
                            Register now.
                        </Link>
                    </div>
                </div>

                <div className="absolute bottom-6 left-0 w-full text-center text-[13px] text-slate-400">
                    Copyright &copy; 2022 Study.ai. All rights reserved
                </div>
            </div>

            {/* Right Side - Visual Dashboard Mockup */}
            <div className="hidden lg:flex flex-col relative overflow-hidden items-center justify-center p-8">
                {/* Background Gradients */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1A5EFF] to-[#0A2666]" />

                {/* Content Container */}
                <div className="relative z-10 w-full max-w-[480px]">
                    {/* Dashboard Mockup - Glassmorphism */}
                    <div className="bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl p-7 text-white">
                        
                        <h2 className="text-xl font-semibold mb-6 text-white/95">Track Your Progress</h2>
                        
                        {/* Top Stats Row */}
                        <div className="grid grid-cols-2 gap-5 mb-6">
                            <div className="bg-white/10 rounded-2xl p-5 border border-white/10 shadow-lg">
                                <div className="text-[13px] font-medium text-white/70 mb-1">Hours Studied</div>
                                <div className="text-4xl font-semibold mb-2 tracking-tight text-white/95">24.5h</div>
                                <div className="text-[11px] text-emerald-300 flex items-center tracking-wide font-medium">
                                    <TrendingUp className="w-3 h-3 mr-1" /> &uarr; +12% from last week
                                </div>
                            </div>
                            <div className="bg-white/10 rounded-2xl p-5 border border-white/10 shadow-lg flex flex-col justify-center">
                                <div className="text-[13px] font-medium text-white/70 mb-1">Tasks Done</div>
                                <div className="text-4xl font-semibold mb-2 tracking-tight text-white/95">18<span className="text-2xl text-white/50">/24</span></div>
                                <div className="text-[11px] text-white/50 font-medium">(Keep up the good work!)</div>
                            </div>
                        </div>

                        {/* Chart Area */}
                        <div className="relative rounded-2xl p-5 bg-gradient-to-b from-white/5 to-transparent border border-white/10 overflow-hidden shadow-inner">
                            <div className="flex items-center justify-between mb-8 relative z-10">
                                <h3 className="text-[15px] font-medium text-white">
                                    Weekly Activity
                                </h3>
                                <div className="bg-white/10 backdrop-blur-sm text-[12px] px-3 py-1.5 rounded-lg text-white/80 border border-white/10 hover:bg-white/20 flex items-center cursor-pointer transition-colors">
                                    Last 7 Days 
                                    <svg className="w-3 h-3 ml-2 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                            
                            <div className="h-[140px] w-[110%] -ml-[5%] relative z-0 mt-8">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={MOCK_CHART_DATA} margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                                                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <Area type="monotone" dataKey="hours" stroke="#60a5fa" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
