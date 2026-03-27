import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { LiquidBackground } from '../layout/LiquidBackground';

type FormValues = {
  email: string;
};

export function NewsletterSignup() {
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    // Simulated API call wait
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Waitlist registered:", data.email);
  };

  return (
    <div className="w-full relative overflow-hidden font-sans border-t border-white/10">
      
      {/* Reusing LiquidBackground but enforcing dark styling via its children props/styles or overlay */}
      <LiquidBackground className="py-32 relative bg-[#0A0F1E]">
        {/* We place a dark overlay so LiquidBackground's colors blend nicely in dark mode */}
        <div className="absolute inset-0 bg-[#0A0F1E]/80 backdrop-blur-[2px] z-0" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
            >
                <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                    Stay Ahead of the <br className="hidden md:block"/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 italic pr-2">Curve.</span>
                </h2>
                
                <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                    Get early access updates, new features, and study tips directly to your inbox.
                </p>

                {isSubmitSuccessful ? (
                    <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-8 py-4 rounded-full font-medium inline-block animate-fade-in-up">
                        You're on the waitlist! Keep an eye on your inbox.
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg mx-auto relative group">
                        <div className="relative flex items-center w-full p-2 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl transition-all duration-300 focus-within:border-blue-500/50 focus-within:bg-white/10">
                            
                            <input 
                                type="text"
                                placeholder="name@email.com"
                                className="w-full bg-transparent px-6 py-4 outline-none text-white placeholder:text-gray-500 font-medium"
                                {...register('email', { 
                                    required: "Email is required.",
                                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email format." }
                                })}
                            />
                            
                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-2 rounded-full font-bold transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center whitespace-nowrap"
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : "Join Waitlist"}
                            </button>
                        </div>
                        
                        {errors.email && (
                            <div className="absolute -bottom-8 left-0 w-full text-red-400 text-sm font-medium">
                                {errors.email.message}
                            </div>
                        )}
                    </form>
                )}
            </motion.div>
        </div>
      </LiquidBackground>

    </div>
  );
}
