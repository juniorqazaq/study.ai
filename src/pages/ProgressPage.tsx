import { ReactNode, useEffect, useState } from 'react';
import { ArrowUpRight, Award, BookOpen, Clock, MoreHorizontal, TrendingUp } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { storageService } from '@/shared/services/storage.service';

const weeklyData = [
  { name: 'Mon', hours: 2.5 },
  { name: 'Tue', hours: 3.2 },
  { name: 'Wed', hours: 1.8 },
  { name: 'Thu', hours: 4.1 },
  { name: 'Fri', hours: 2.9 },
  { name: 'Sat', hours: 5.2 },
  { name: 'Sun', hours: 3.5 },
];

const skillData = [
  { subject: 'Math', score: 85 },
  { subject: 'Science', score: 92 },
  { subject: 'History', score: 78 },
  { subject: 'Literature', score: 88 },
  { subject: 'Languages', score: 75 },
];

const tooltipStyle = {
  backgroundColor: '#171717',
  border: '1px solid #2a2a2a',
  borderRadius: '16px',
  padding: '10px 12px',
};

export function ProgressPage() {
  const [booksCompleted, setBooksCompleted] = useState(0);
  const [totalStudyHours, setTotalStudyHours] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const stats = storageService.getStats();
    setBooksCompleted(stats.booksUploaded);
    setTotalStudyHours(stats.studyHours);
    setStreak(stats.streak);
  }, []);

  return (
    <div className="app-shell px-5 py-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="app-muted-label mb-3">Progress</p>
          <h1 className="text-4xl font-semibold tracking-tight text-white lg:text-5xl">Your Progress</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#8d8d8d] lg:text-base">
            Track your learning journey in a simpler, less distracting dashboard.
          </p>
        </div>

        <div className="mb-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <StatCard icon={<BookOpen className="h-5 w-5" />} label="Books Completed" value={`${booksCompleted}`} />
          <StatCard icon={<Award className="h-5 w-5" />} label="Average Score" value="95%" />
          <StatCard icon={<Clock className="h-5 w-5" />} label="Total Study Time" value={`${totalStudyHours}h`} />
          <StatCard icon={<TrendingUp className="h-5 w-5" />} label="Day Streak" value={`${streak}`} />
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="app-panel p-6 lg:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Weekly Activity</h2>
              <button className="rounded-full p-2 text-[#7c7c7c] transition-colors hover:bg-[#1d1d1d] hover:text-white">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#232323" vertical={false} />
                  <XAxis dataKey="name" stroke="#6b6b6b" axisLine={false} tickLine={false} dy={10} fontSize={12} />
                  <YAxis stroke="#6b6b6b" axisLine={false} tickLine={false} dx={-10} fontSize={12} />
                  <Tooltip cursor={{ fill: '#1d1d1d' }} contentStyle={tooltipStyle} />
                  <Bar dataKey="hours" fill="#0066FF" radius={[8, 8, 0, 0]} maxBarSize={36} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="app-panel p-6 lg:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Skills Overview</h2>
              <button className="rounded-full p-2 text-[#7c7c7c] transition-colors hover:bg-[#1d1d1d] hover:text-white">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                  <PolarGrid stroke="#2a2a2a" />
                  <PolarAngleAxis dataKey="subject" stroke="#7c7c7c" fontSize={12} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Score" dataKey="score" stroke="#b98d74" fill="#6b5245" fillOpacity={0.45} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="app-panel p-6">
      <div className="mb-6 flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-[16px] border border-[#2a2a2a] bg-[#1a1a1a] text-[#0066FF]">
          {icon}
        </div>
        <ArrowUpRight className="h-5 w-5 text-[#6b6b6b]" />
      </div>
      <div className="text-4xl font-semibold tracking-tight text-white">{value}</div>
      <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6b6b6b]">{label}</div>
    </div>
  );
}
