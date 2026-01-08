import { TrendingUp, Award, Clock, BookOpen, MoreHorizontal, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { storageService } from '@/shared/services/storage.service';
import { useState, useEffect } from 'react';



export function ProgressPage() {
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
    <div className="min-h-screen bg-black text-white p-8 relative overflow-hidden">
      {/* Liquid Background Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="liquid-blob liquid-blob-1" />
        <div className="liquid-blob liquid-blob-2" />
        <div className="liquid-blob liquid-blob-3" />
      </div>

      <div className="max-w-7xl mx-auto pt-4 relative z-10">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-extrabold mb-3 tracking-tight bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
            Your Progress
          </h1>
          <p className="text-gray-400 text-lg">Track your learning journey and achievements</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Books Completed */}
          <div className="liquid-glass liquid-glow squircle-lg p-8 group transition-all duration-500 hover:scale-[1.02]">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 squircle-lg bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                <BookOpen size={24} />
              </div>
              <ArrowUpRight className="text-blue-500 w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-4xl font-bold mb-2 tabular-nums">{booksCompleted}</div>
            <div className="text-sm font-medium text-gray-400 uppercase tracking-wider">Books Completed</div>
          </div>

          {/* Average Score */}
          <div className="liquid-glass liquid-glow squircle-lg p-8 group transition-all duration-500 hover:scale-[1.02]">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 squircle-lg bg-purple-500/10 flex items-center justify-center text-purple-500 border border-purple-500/20 shadow-[0_0_20px_rgba(139,92,246,0.15)]">
                <Award size={24} />
              </div>
              <ArrowUpRight className="text-purple-500 w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-4xl font-bold mb-2 tabular-nums">95%</div>
            <div className="text-sm font-medium text-gray-400 uppercase tracking-wider">Average Score</div>
          </div>

          {/* Total Study Time */}
          <div className="liquid-glass liquid-glow squircle-lg p-8 group transition-all duration-500 hover:scale-[1.02]">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 squircle-lg bg-green-500/10 flex items-center justify-center text-green-500 border border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.15)]">
                <Clock size={24} />
              </div>
              <ArrowUpRight className="text-green-500 w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-4xl font-bold mb-2 tabular-nums">{totalStudyHours}h</div>
            <div className="text-sm font-medium text-gray-400 uppercase tracking-wider">Total Study Time</div>
          </div>

          {/* Day Streak */}
          <div className="liquid-glass liquid-glow squircle-lg p-8 group transition-all duration-500 hover:scale-[1.02]">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 squircle-lg bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20 shadow-[0_0_20px_rgba(249,115,22,0.15)]">
                <TrendingUp size={24} />
              </div>
              <ArrowUpRight className="text-orange-500 w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-4xl font-bold mb-2 tabular-nums">{streak}</div>
            <div className="text-sm font-medium text-gray-400 uppercase tracking-wider">Day Streak</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
          {/* Weekly Activity */}
          <div className="liquid-glass squircle-lg p-8 hover:bg-white/[0.07] transition-all duration-500">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                </div>
                Weekly Activity
              </h2>
              <button className="text-gray-500 hover:text-white transition-colors">
                <MoreHorizontal size={24} />
              </button>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis
                    dataKey="name"
                    stroke="#ffffff40"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis
                    stroke="#ffffff40"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    dx={-10}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{
                      backgroundColor: 'rgba(20, 20, 20, 0.8)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      padding: '12px'
                    }}
                  />
                  <Bar
                    dataKey="hours"
                    fill="url(#barGradient)"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Skills Overview */}
          <div className="liquid-glass squircle-lg p-8 hover:bg-white/[0.07] transition-all duration-500">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Award className="w-5 h-5 text-purple-500" />
                </div>
                Skills Overview
              </h2>
              <button className="text-gray-500 hover:text-white transition-colors">
                <MoreHorizontal size={24} />
              </button>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                  <PolarGrid stroke="#ffffff10" />
                  <PolarAngleAxis dataKey="subject" stroke="#ffffff60" fontSize={12} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="#a855f7"
                    fill="#a855f7"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

