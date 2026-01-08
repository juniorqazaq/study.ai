import { BarChart as BarChartIcon, Clock, Award, TrendingUp } from 'lucide-react';

export function StatisticsPage() {
    return (
        <div className="min-h-screen bg-black p-8 text-white relative overflow-hidden">
            {/* Liquid Background Blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="liquid-blob liquid-blob-2" style={{ opacity: 0.1 }} />
                <div className="liquid-blob liquid-blob-3" style={{ opacity: 0.1, right: '10%', top: '20%' }} />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="mb-12">
                    <h1 className="text-4xl font-extrabold mb-3 flex items-center gap-4 tracking-tight bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                        <div className="p-3 liquid-glass squircle-lg shadow-[0_0_20px_rgba(37,99,235,0.2)]">
                            <BarChartIcon className="w-8 h-8 text-blue-500" />
                        </div>
                        Statistics
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="liquid-glass liquid-glow squircle-lg p-8 group transition-all duration-500 hover:scale-[1.02]">
                        <div className="flex items-center gap-6 mb-4">
                            <div className="w-14 h-14 squircle-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                                <Clock className="w-7 h-7 text-blue-400" />
                            </div>
                            <div>
                                <div className="text-3xl font-bold tabular-nums">12h 45m</div>
                                <div className="text-sm font-medium text-gray-400 uppercase tracking-widest">Total Study Time</div>
                            </div>
                        </div>
                    </div>

                    <div className="liquid-glass liquid-glow squircle-lg p-8 group transition-all duration-500 hover:scale-[1.02]">
                        <div className="flex items-center gap-6 mb-4">
                            <div className="w-14 h-14 squircle-lg bg-green-500/10 flex items-center justify-center border border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.15)]">
                                <Award className="w-7 h-7 text-green-400" />
                            </div>
                            <div>
                                <div className="text-3xl font-bold tabular-nums">85%</div>
                                <div className="text-sm font-medium text-gray-400 uppercase tracking-widest">Average Score</div>
                            </div>
                        </div>
                    </div>

                    <div className="liquid-glass liquid-glow squircle-lg p-8 group transition-all duration-500 hover:scale-[1.02]">
                        <div className="flex items-center gap-6 mb-4">
                            <div className="w-14 h-14 squircle-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
                                <TrendingUp className="w-7 h-7 text-purple-400" />
                            </div>
                            <div>
                                <div className="text-3xl font-bold tabular-nums">15</div>
                                <div className="text-sm font-medium text-gray-400 uppercase tracking-widest">Days Streak</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="liquid-glass squircle-lg p-16 text-center group hover:bg-white/[0.03] transition-all duration-700">
                    <div className="max-w-md mx-auto">
                        <div className="w-20 h-20 bg-white/5 squircle-lg flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                            <BarChartIcon className="w-10 h-10 text-gray-500" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
                        <p className="text-gray-400 leading-relaxed">
                            Detailed analytics and interactive charts are being prepared to help you visualize your learning growth.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

