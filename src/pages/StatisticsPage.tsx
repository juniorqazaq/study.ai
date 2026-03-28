import { ReactNode } from 'react';
import { Award, BarChart as BarChartIcon, Clock, TrendingUp } from 'lucide-react';

export function StatisticsPage() {
  return (
    <div className="app-shell px-5 py-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="app-muted-label mb-3">Statistics</p>
          <h1 className="text-4xl font-semibold tracking-tight text-white lg:text-5xl">Statistics</h1>
        </div>

        <div className="mb-8 grid gap-5 md:grid-cols-3">
          <StatCard icon={<Clock className="h-6 w-6" />} value="12h 45m" label="Total Study Time" />
          <StatCard icon={<Award className="h-6 w-6" />} value="85%" label="Average Score" />
          <StatCard icon={<TrendingUp className="h-6 w-6" />} value="15" label="Days Streak" />
        </div>

        <div className="app-panel p-12 text-center lg:p-16">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] border border-[#2a2a2a] bg-[#1a1a1a]">
            <BarChartIcon className="h-9 w-9 text-[#6b6b6b]" />
          </div>
          <h2 className="mt-6 text-2xl font-semibold text-white">Coming Soon</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#8d8d8d]">
            Detailed analytics and interactive charts are being prepared to help you visualize your learning growth.
          </p>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="app-panel p-6 lg:p-8">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[16px] border border-[#2a2a2a] bg-[#1a1a1a] text-[#0066FF]">
        {icon}
      </div>
      <div className="text-3xl font-semibold tracking-tight text-white">{value}</div>
      <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6b6b6b]">{label}</div>
    </div>
  );
}
