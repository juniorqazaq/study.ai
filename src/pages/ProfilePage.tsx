import { User, Save, Camera, Target, Settings, Mail, MapPin, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { storageService } from '@/shared/services/storage.service';

export function ProfilePage() {
  const [user, setUser] = useState({ id: '1', email: 'student@email.com', fullName: 'Student' });

  useEffect(() => {
    const userData = storageService.getUser();
    if (userData) setUser(userData);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8 relative overflow-hidden">
      {/* Liquid Background Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="liquid-blob liquid-blob-2" style={{ opacity: 0.1, width: '1000px', height: '1000px', left: '-20%', top: '-20%' }} />
        <div className="liquid-blob liquid-blob-1" style={{ opacity: 0.1, width: '800px', height: '800px', right: '-10%', bottom: '-10%' }} />
      </div>

      <div className="max-w-4xl mx-auto pt-4 relative z-10">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-black mb-3 tracking-tighter bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
            Profile Settings
          </h1>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Aesthetic Identity Management</p>
        </div>

        {/* Profile Card */}
        <div className="liquid-glass border-white/10 squircle-xl p-10 mb-10 relative overflow-hidden shadow-2xl group">
          {/* Decorative Gradient Glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center md:items-start gap-12 relative z-10">
            {/* Avatar */}
            <div className="relative group/avatar">
              <div className="w-40 h-40 squircle-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden group-hover/avatar:border-blue-500/50 transition-all duration-700 shadow-2xl">
                <span className="text-6xl font-black text-white/20 group-hover/avatar:text-blue-400 Transition-colors duration-700">{user.fullName[0]}</span>
              </div>
              <button className="absolute -bottom-4 -right-4 w-14 h-14 bg-white text-black hover:bg-blue-600 hover:text-white squircle-lg flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all active:scale-90 duration-500 group-hover/avatar:rotate-12">
                <Camera className="w-6 h-6" />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left pt-2">
              <h2 className="text-4xl font-black mb-2 tracking-tight text-white group-hover:text-blue-400 transition-colors duration-700">{user.fullName}</h2>
              <p className="text-gray-500 font-bold text-lg mb-6 lowercase tracking-tight opacity-60 italic">{user.email}</p>
              <div className="flex justify-center md:justify-start gap-4">
                <span className="px-5 py-2 squircle-lg bg-blue-500/10 text-blue-400 text-xs font-black uppercase tracking-[0.2em] border border-blue-500/20 shadow-lg shadow-blue-500/5">Pro Explorer</span>
                <span className="px-5 py-2 squircle-lg bg-green-500/10 text-green-400 text-xs font-black uppercase tracking-[0.2em] border border-green-500/20 shadow-lg shadow-green-500/5">Verified Node</span>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Grid */}
        <div className="space-y-8 pb-20">
          {/* Personal Information */}
          <div className="liquid-glass border-white/5 squircle-xl p-10 shadow-2xl">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-10 flex items-center gap-4 opacity-70">
              <div className="w-10 h-1 bg-white/10 squircle-full" />
              <User className="w-4 h-4" />
              Registry Credentials
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Identity Label</label>
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="text"
                    defaultValue={user.fullName}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl pl-14 pr-6 py-4 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all text-white font-bold"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Neural Address</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="email"
                    defaultValue={user.email}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl pl-14 pr-6 py-4 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all text-white font-bold"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Geospatial Origin</label>
                <div className="relative group">
                  <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="Earth / Milky Way"
                    className="w-full bg-white/5 border border-white/5 rounded-2xl pl-14 pr-6 py-4 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all text-white font-bold"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Biological Epoch</label>
                <div className="relative group">
                  <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="date"
                    className="w-full bg-white/5 border border-white/5 rounded-2xl pl-14 pr-6 py-4 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all text-white font-bold color-scheme-dark"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Study Preferences */}
          <div className="liquid-glass border-white/5 squircle-xl p-10 shadow-2xl">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-10 flex items-center gap-4 opacity-70">
              <div className="w-10 h-1 bg-white/10 squircle-full" />
              <Target className="w-4 h-4" />
              Cognitive Directives
            </h2>
            <div className="space-y-8 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Daily Synthesis Goal (min)</label>
                  <input
                    type="number"
                    defaultValue="60"
                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all text-white font-black"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Neural Friction Level</label>
                  <div className="relative group">
                    <select className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all text-white font-black cursor-pointer appearance-none uppercase tracking-widest text-sm">
                      <option value="easy" className="bg-[#111]">Soft Launch</option>
                      <option value="medium" className="bg-[#111]" selected>Standard Array</option>
                      <option value="hard" className="bg-[#111]">Hard Reset</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                      <div className="w-2 h-2 border-b-2 border-r-2 border-white rotate-45" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6 pt-4 border-t border-white/5">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Neural Link Sync</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: 'Study Pulses', id: 'reminders', color: 'blue' },
                    { label: 'Win States', id: 'alerts', color: 'green' },
                    { label: 'Network Reports', id: 'reports', color: 'purple' }
                  ].map((toggle) => (
                    <label key={toggle.id} className="group relative flex items-center justify-between p-5 bg-white/5 border border-white/5 rounded-2xl cursor-pointer hover:bg-white/10 transition-all duration-300">
                      <span className="text-xs font-black uppercase tracking-widest text-gray-300 group-hover:text-white transition-colors ml-2">{toggle.label}</span>
                      <div className="relative">
                        <input type="checkbox" defaultChecked={toggle.id !== 'reports'} className="peer sr-only" />
                        <div className="w-12 h-7 bg-white/5 border border-white/10 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-[19px] after:w-[19px] after:transition-all after:duration-500 after:shadow-lg peer-checked:after:rotate-180 transition-all duration-500" />
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Aesthetic Interface */}
          <div className="liquid-glass border-white/5 squircle-xl p-10 shadow-2xl">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-10 flex items-center gap-4 opacity-70">
              <div className="w-10 h-1 bg-white/10 squircle-full" />
              <Settings className="w-4 h-4" />
              Interface Calibration
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Visual Protocol</label>
                <div className="relative group">
                  <select className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all text-white font-black cursor-pointer appearance-none uppercase tracking-widest text-sm">
                    <option value="dark" className="bg-[#111]" selected>Void Mode</option>
                    <option value="light" className="bg-[#111]">Spectrum</option>
                    <option value="auto" className="bg-[#111]">Dynamic Sync</option>
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                    <div className="w-2 h-2 border-b-2 border-r-2 border-white rotate-45" />
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Neural Language</label>
                <div className="relative group">
                  <select className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all text-white font-black cursor-pointer appearance-none uppercase tracking-widest text-sm">
                    <option value="en" className="bg-[#111]" selected>Universal (EN)</option>
                    <option value="kz" className="bg-[#111]">Nomadic (KZ)</option>
                    <option value="ru" className="bg-[#111]">Core (RU)</option>
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                    <div className="w-2 h-2 border-b-2 border-r-2 border-white rotate-45" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-4">
            <button className="px-12 py-5 bg-white text-black hover:bg-blue-600 hover:text-white squircle-xl font-black uppercase tracking-widest transition-all flex items-center gap-4 shadow-[0_20px_60px_rgba(0,0,0,0.5)] active:scale-95 group duration-500">
              <Save className="w-6 h-6 group-hover:scale-125 transition-transform" />
              Commit Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
