
import React, { useState } from 'react';

interface LoginGateProps {
  onLogin: (username: string) => void;
}

export const LoginGate: React.FC<LoginGateProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [tab, setTab] = useState<'login' | 'pro'>('login');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username) onLogin(username);
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 pt-32">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h1 className="text-6xl font-black tracking-tighter uppercase leading-none">
            WE SCRAPE THE <br/> <span className="text-orange-600 italic">CODE</span> OF THE <br/> UNIVERSE.
          </h1>
          <div className="space-y-4 max-w-sm">
            <p className="text-zinc-400 font-mono text-xs uppercase leading-relaxed tracking-tighter">
              The operating manual for your people. 
              Human behavior is not random. It is scripted by coordinates.
            </p>
            <div className="flex items-center gap-4 text-green-900 font-mono text-[10px] uppercase tracking-[0.4em] animate-pulse">
              <span className="w-2 h-2 bg-green-900 rounded-full"></span> SYSTEM_ONLINE
            </div>
          </div>
        </div>

        <div className="bg-zinc-950 border border-white/5 p-8 md:p-12 space-y-10 relative">
          <div className="flex border-b border-white/5 mb-8">
            <button 
              onClick={() => setTab('login')}
              className={`pb-4 px-6 font-mono text-[10px] uppercase tracking-widest transition-colors ${tab === 'login' ? 'text-white border-b-2 border-orange-600' : 'text-zinc-600'}`}
            >
              Access Terminal
            </button>
            <button 
              onClick={() => setTab('pro')}
              className={`pb-4 px-6 font-mono text-[10px] uppercase tracking-widest transition-colors ${tab === 'pro' ? 'text-white border-b-2 border-orange-600' : 'text-zinc-600'}`}
            >
              Initiate Pro Tier
            </button>
          </div>

          {tab === 'login' ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Unit Designation (Username)</label>
                <input 
                  type="text"
                  required
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full bg-black border border-white/10 p-4 font-mono text-sm focus:border-orange-600 outline-none transition-colors"
                  placeholder="CHAD_0x"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Access Code (Password)</label>
                <input 
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-black border border-white/10 p-4 font-mono text-sm focus:border-orange-600 outline-none transition-colors"
                  placeholder="••••••••"
                />
              </div>
              <button className="w-full py-4 bg-white text-black font-black uppercase tracking-[0.4em] hover:bg-orange-600 hover:text-white transition-all text-xs">
                Enter System
              </button>
            </form>
          ) : (
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-xl font-black uppercase tracking-tighter">Defrag OS // Pro Tier</h3>
                <ul className="space-y-3 font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                  <li className="flex items-center gap-3"><span className="text-orange-600">+</span> Unlimited Natal Storage</li>
                  <li className="flex items-center gap-3"><span className="text-orange-600">+</span> Real-Time Atmospheric Scrape</li>
                  <li className="flex items-center gap-3"><span className="text-orange-600">+</span> Emergency Proxy Deployment</li>
                  <li className="flex items-center gap-3"><span className="text-orange-600">+</span> AES-256 Deep Encryption</li>
                </ul>
              </div>
              <button className="w-full py-4 border border-orange-600 text-orange-600 font-black uppercase tracking-[0.4em] hover:bg-orange-600 hover:text-white transition-all text-xs">
                Subscribe ($9/MO)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
