import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login, googleLogin, githubLogin } from "@/shared/api/endpoints/auth.api";
import { useGoogleLogin } from '@react-oauth/google';
import {
  saveAuthTokens,
  parseAccessTokenUser,
  getApiErrorMessage,
} from '@/shared/util/authHelpers';
import type { TokenResponse } from '@/shared/types/auth';
import { motion } from "framer-motion";

type OAuthAuthResult = TokenResponse & {
    user?: { id: string; email: string; fullName: string };
};

const IconGoogle = () => (
    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
    </svg>
);

const IconGithub = () => (
    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
    </svg>
);

const IconEye = () => (
    <svg className="w-5 h-5 text-[#888888]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
        <circle cx="12" cy="12" r="3"/>
    </svg>
);

const IconEyeOff = () => (
    <svg className="w-5 h-5 text-[#888888]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.88 9.88a3 0 1 0 4.24 4.24"/>
        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
        <line x1="2" y1="2" x2="22" y2="22"/>
    </svg>
);

export function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            const { accessToken, refreshToken } = await login({ email, password });
            const user = parseAccessTokenUser(accessToken);
            if (!user) {
                throw new Error('Invalid token response');
            }
            saveAuthTokens(accessToken, refreshToken, user);
            window.scrollTo(0, 0);
            navigate('/library');
        } catch (err) {
            setError(getApiErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setError(null);
            setIsLoading(true);
            try {
                const response = (await googleLogin(tokenResponse.access_token)) as OAuthAuthResult;
                const { accessToken, refreshToken, user } = response;
                const u = user ?? parseAccessTokenUser(accessToken);
                if (!u) {
                    throw new Error('Invalid token response');
                }
                saveAuthTokens(accessToken, refreshToken, u);
                window.scrollTo(0, 0);
                navigate('/library');
            } catch (err) {
                setError(getApiErrorMessage(err));
            } finally {
                setIsLoading(false);
            }
        },
        onError: () => {
            setError('Google sign-in was cancelled or failed.');
        }
    });

    const handleGithubLogin = () => {
        const clientId = "Ov23lieKTVcp8Gu4LbHy";
        const redirectUri = `${window.location.origin}/login`;
        const githubUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=user:email`;
        window.location.href = githubUrl;
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (!code) return;

        const sessionKey = `github_oauth_${code}`;
        if (typeof sessionStorage !== 'undefined') {
            if (sessionStorage.getItem(sessionKey)) {
                window.history.replaceState({}, '', window.location.pathname);
                return;
            }
            sessionStorage.setItem(sessionKey, '1');
        }

        let cancelled = false;
        (async () => {
            setError(null);
            setIsLoading(true);
            try {
                const response = (await githubLogin(code)) as OAuthAuthResult;
                const { accessToken, refreshToken, user } = response;
                const u = user ?? parseAccessTokenUser(accessToken);
                if (!u) {
                    throw new Error('Invalid token response');
                }
                saveAuthTokens(accessToken, refreshToken, u);
                window.history.replaceState({}, '', window.location.pathname);
                window.scrollTo(0, 0);
                if (!cancelled) navigate('/library');
            } catch (err) {
                if (!cancelled) setError(getApiErrorMessage(err));
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [navigate]);

    return (
        <div className="min-h-screen w-full bg-[#000000] text-[#F5F5F5] font-sans flex flex-col justify-center items-center p-4 relative overflow-hidden selection:bg-[#0066FF]/20 selection:text-[#0066FF]">
            {/* Background Glow removed for pure solid black background */}

            {/* Back Button */}
            <Link to="/" className="absolute top-6 left-6 text-sm font-medium text-[#888888] hover:text-[#F5F5F5] transition-colors flex items-center gap-1.5 z-10">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back to home
            </Link>

            {/* Centered Login Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-[440px] bg-[#141414] border border-white/[0.08] rounded-[2rem] p-8 md:p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)] relative z-10 backdrop-blur-xl"
            >
                {/* Logo / Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-[#0066FF] flex items-center justify-center font-bold text-white text-base">
                            S
                        </div>
                        <span className="text-xl font-bold tracking-tight">
                            <span className="text-[#0066FF]">Study</span>
                            <span className="text-white">.ai</span>
                        </span>
                    </div>
                    <h1 className="text-[2.25rem] font-bold leading-tight tracking-tight text-white mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-[1rem] font-normal text-[#888888] leading-relaxed">
                        Log in to resume your study sessions.
                    </p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-normal text-center"
                    >
                        {error}
                    </motion.div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-[#888888]">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="name@university.edu"
                            required
                            disabled={isLoading}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-12 px-4 bg-white/[0.03] border border-white/[0.08] focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] outline-none rounded-2xl text-[#F5F5F5] placeholder:text-[#888888]/40 transition-all font-normal text-[0.9375rem]"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label htmlFor="password" className="text-sm font-medium text-[#888888]">
                                Password
                            </label>
                            <Link to="/support" className="text-sm font-medium text-[#0066FF] hover:opacity-80 transition-opacity">
                                Forgot?
                            </Link>
                        </div>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                required
                                disabled={isLoading}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full h-12 pl-4 pr-12 bg-white/[0.03] border border-white/[0.08] focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] outline-none rounded-2xl text-[#F5F5F5] placeholder:text-[#888888]/40 transition-all font-normal text-[0.9375rem]"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-80 transition-opacity"
                            >
                                {showPassword ? <IconEyeOff /> : <IconEye />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-12 mt-2 rounded-full bg-gradient-to-r from-[#0066FF] to-[#3B82F6] hover:opacity-90 active:scale-[0.98] transition-all duration-200 text-white font-medium text-[0.9375rem] flex items-center justify-center disabled:opacity-50 disabled:pointer-events-none"
                    >
                        {isLoading ? (
                            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        ) : (
                            "Log in"
                        )}
                    </button>
                </form>

                {/* Divider */}
                <div className="relative my-6 text-center">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/[0.06]" />
                    </div>
                    <span className="relative px-3 bg-[#141414] text-[0.75rem] font-semibold text-[#888888]/60 uppercase tracking-widest">
                        Or continue with
                    </span>
                </div>

                {/* Social Logins */}
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => handleGoogleLogin()}
                        disabled={isLoading}
                        className="h-12 bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] active:scale-[0.98] rounded-2xl text-sm font-medium text-white transition-all flex items-center justify-center"
                    >
                        <IconGoogle />
                        Google
                    </button>
                    <button
                        onClick={handleGithubLogin}
                        disabled={isLoading}
                        className="h-12 bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] active:scale-[0.98] rounded-2xl text-sm font-medium text-white transition-all flex items-center justify-center"
                    >
                        <IconGithub />
                        GitHub
                    </button>
                </div>

                {/* Footer link */}
                <div className="mt-8 text-center text-sm font-normal text-[#888888]">
                    Don't have an account?{" "}
                    <Link to="/register" className="font-medium text-[#0066FF] hover:opacity-80 transition-opacity">
                        Register
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
