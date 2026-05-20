import { cn } from '@/lib/utils';

interface LiquidBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

export function LiquidBackground({ className, children }: LiquidBackgroundProps) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div className="absolute inset-0 z-0 bg-[#0B0F1A]" />
      <div className="absolute inset-0 z-0 animate-mesh liquid-mesh-primary opacity-40" />

      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-blue-600/8 rounded-full blur-[140px]" />
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-indigo-600/8 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] left-[20%] w-[45%] h-[45%] bg-blue-500/6 rounded-full blur-[130px]" />
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
