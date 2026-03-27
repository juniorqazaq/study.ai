import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { LiquidBackground } from '../layout/LiquidBackground';

type FormValues = {
  email: string;
};

export function NewsletterSignup() {
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Waitlist registered:", data.email);
  };

  return (
    <div className="w-full relative overflow-hidden font-sans border-t border-white/10">
      <LiquidBackground className="py-28 relative bg-[#0A0F1E]">
        <div className="absolute inset-0 bg-[#0A0F1E]/84 backdrop-blur-[2px] z-0" />
        <div className="absolute left-1/2 top-10 h-40 w-40 -translate-x-1/2 rounded-full bg-[#0066FF]/10 blur-[100px]" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            className="rounded-[2.25rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-6 py-8 md:px-10 md:py-10 text-center shadow-[0_24px_80px_rgba(0,0,0,0.18)]"
          >
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300 leading-8">
              Get early access updates, new features, and study tips directly to your inbox.
            </p>

            <div className="mt-8 mx-auto max-w-2xl">
              {isSubmitSuccessful ? (
                <div className="rounded-[1.5rem] border border-green-500/20 bg-green-500/10 px-8 py-5 text-center text-green-400 font-medium animate-fade-in-up">
                  You're on the waitlist! Keep an eye on your inbox.
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="flex flex-col gap-3 rounded-[1.75rem] border border-white/10 bg-[#11182a]/85 p-3 sm:flex-row sm:items-center">
                    <input
                      type="text"
                      placeholder="name@email.com"
                      className="h-14 flex-1 rounded-[1.2rem] border border-white/10 bg-[#0C1220] px-5 outline-none text-white placeholder:text-gray-500 font-medium focus:border-[#0066FF]"
                      {...register('email', {
                        required: "Email is required.",
                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email format." }
                      })}
                    />

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-14 rounded-[1.2rem] bg-[#0066FF] hover:bg-[#0052CC] text-white px-8 font-bold transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:active:scale-100 whitespace-nowrap"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
                      ) : "Join Waitlist"}
                    </button>
                  </div>

                  {errors.email && (
                    <div className="px-2 text-red-400 text-sm font-medium text-left">
                      {errors.email.message}
                    </div>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </LiquidBackground>
    </div>
  );
}
