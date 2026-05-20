import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const IcoArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const IcoPlay = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="6 4 19 12 6 20 6 4" />
  </svg>
);

const IcoSparkles = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z" />
  </svg>
);

export function Hero() {
  const { scrollY } = useScroll();

  const yHeroParallax = useTransform(scrollY, [0, 500], [0, -200]);
  const opacityScroll = useTransform(scrollY, [0, 400], [1, 0]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseTargetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      mouseTargetRef.current = {
        x: mouseX - rect.width / 2,
        y: mouseY - rect.height / 2
      };
    };

    const handleMouseLeave = () => {
      mouseTargetRef.current = { x: 0, y: 0 };
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = canvas.clientWidth || window.innerWidth;
    let height = canvas.height = canvas.clientHeight || window.innerHeight;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.clientWidth || window.innerWidth;
      height = canvas.height = canvas.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = Math.floor(80 + Math.random() * 41);
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      baseOpacity: number;
      drift: number;
      parallaxFactor: number;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const baseOpacity = 0.2 + Math.random() * 0.5;
      const size = 2 + Math.random() * 2;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: size,
        speedY: -(0.08 + Math.random() * 0.22),
        speedX: (Math.random() - 0.5) * 0.12,
        opacity: baseOpacity,
        baseOpacity: baseOpacity,
        drift: Math.random() * 100,
        parallaxFactor: size * 0.06
      });
    }

    const lerpedOffset = { x: 0, y: 0 };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const target = mouseTargetRef.current;
      lerpedOffset.x += (target.x - lerpedOffset.x) * 0.06;
      lerpedOffset.y += (target.y - lerpedOffset.y) * 0.06;

      particles.forEach(p => {
        p.drift += 0.01;
        const dx = Math.sin(p.drift) * 0.04 + p.speedX;
        const dy = p.speedY;

        p.x += dx;
        p.y += dy;

        if (p.y < -p.size) {
          p.y = height + p.size;
          p.x = Math.random() * width;
        }
        if (p.x < -p.size) {
          p.x = width + p.size;
        } else if (p.x > width + p.size) {
          p.x = -p.size;
        }

        const drawX = p.x + lerpedOffset.x * p.parallaxFactor;
        const drawY = p.y + lerpedOffset.y * p.parallaxFactor;

        ctx.beginPath();
        ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 102, 255, ${p.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-transparent px-4 pb-28 pt-36 text-white sm:px-6 lg:px-8 lg:pb-36 lg:pt-48 flex items-center justify-center min-h-[90vh]">
      <motion.div style={{ opacity: opacityScroll }} className="absolute inset-0 pointer-events-none z-0">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block bg-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(0,102,255,0.08)_0%,transparent_70%)]" />
      </motion.div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none z-0" />

      <motion.div
        style={{ y: yHeroParallax }}
        className="relative z-20 mx-auto max-w-4xl text-center flex flex-col items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/5 px-4 py-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-purple-400"
        >
          <IcoSparkles />
          <span>Adaptive study engine</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-balance text-[3rem] sm:text-[4rem] font-bold leading-[1.12] tracking-[-0.03em] text-white max-w-3xl"
        >
          Your AI study partner,{' '}
          <span className="bg-gradient-to-r from-[#0066FF] to-[#3B82F6] bg-clip-text text-transparent">
            always ready
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-7 max-w-2xl text-[1rem] sm:text-[1.0625rem] font-normal leading-[1.65] text-[#888888]"
        >
          Study.ai transforms lecture notes, textbook PDFs, and syllabi into active learning setups—instantly building flashcards, interactive quizzes, visual mind maps, and spaced-repetition memory loops unique to your style.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-11 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto animate-delay-200"
        >
          <Link
            to="/register"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#0066FF] to-[#3B82F6] px-8 py-4 text-[0.9375rem] font-medium text-white transition-all hover:opacity-90 active:scale-95 shadow-[0_4px_24px_rgba(0,102,255,0.15)]"
          >
            <span>Start for free</span>
            <IcoArrowRight />
          </Link>

          <button className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-8 py-4 text-[0.9375rem] font-medium text-slate-100 transition-all hover:border-white/20 hover:bg-white/[0.05] active:scale-95">
            <IcoPlay />
            <span>See how it works</span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
