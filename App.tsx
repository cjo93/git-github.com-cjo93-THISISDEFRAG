
import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { Explainer } from './components/Explainer';
import { Funnies } from './components/Funnies';
import { ManualGenerator } from './components/ManualGenerator';
import { Footer } from './components/Footer';
import { Dashboard } from './components/Dashboard';
import { LoginGate } from './components/LoginGate';
import { AppView, UnitData, ManualPreview } from './types';

const SystemMonitor: React.FC = () => {
  const [stats, setStats] = useState({ x: 0, y: 0, load: 45 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => setStats(prev => ({ ...prev, x: e.clientX, y: e.clientY }));
    const interval = setInterval(() => setStats(prev => ({ ...prev, load: 40 + Math.random() * 15 })), 3000);
    window.addEventListener('mousemove', handleMove);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-[100] font-mono text-[8px] text-zinc-500 uppercase flex gap-8 pointer-events-none opacity-50 hidden lg:flex">
      <div>CUR: {stats.x}, {stats.y}</div>
      <div>CORE_TEMP: 38.2°C</div>
      <div>CPU_LOAD: {stats.load.toFixed(1)}%</div>
      <div className="text-orange-800">ENCRYPTION: AES-256-GCM</div>
    </div>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [view, setView] = useState<AppView>(AppView.LOGIN);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  
  const [profiles, setProfiles] = useState<UnitData[]>([]);
  const [activeUnitA, setActiveUnitA] = useState<UnitData | null>(null);
  const [activeUnitB, setActiveUnitB] = useState<UnitData | null>(null);
  const [activeManual, setActiveManual] = useState<ManualPreview | null>(null);

  useEffect(() => {
    const savedProfiles = localStorage.getItem('defrag_profiles');
    if (savedProfiles) setProfiles(JSON.parse(savedProfiles));

    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = (name: string) => {
    setUsername(name);
    setIsLoggedIn(true);
    setView(AppView.HOME);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setView(AppView.LOGIN);
  };

  const handleManualGenerated = (a: UnitData, b: UnitData, m: ManualPreview) => {
    const updatedProfiles = [...profiles];
    if (!profiles.find(p => p.id === a.id)) updatedProfiles.push(a);
    if (!profiles.find(p => p.id === b.id)) updatedProfiles.push(b);
    
    setProfiles(updatedProfiles);
    localStorage.setItem('defrag_profiles', JSON.stringify(updatedProfiles));

    setActiveUnitA(a);
    setActiveUnitB(b);
    setActiveManual(m);
    setView(AppView.DASHBOARD);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isLoggedIn) {
    return <LoginGate onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen selection:bg-orange-500 selection:text-white relative bg-[#050505] flex flex-col">
      <SystemMonitor />
      
      {/* Sticky Header Nav */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled || view !== AppView.HOME ? 'bg-black/95 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div 
            onClick={() => setView(AppView.HOME)}
            className="text-2xl font-black tracking-tighter flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-8 h-8 bg-orange-600 rounded-sm flex items-center justify-center text-black font-mono group-hover:bg-white transition-colors">D</div>
            <span className="font-mono text-lg tracking-[0.2em] group-hover:text-orange-500 transition-colors uppercase">Defrag</span>
          </div>
          <div className="flex items-center gap-8">
            <div className="hidden md:flex gap-6 font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
              <button onClick={() => setView(AppView.HOME)} className={`hover:text-white transition-colors ${view === AppView.HOME ? 'text-white' : ''}`}>Topology</button>
              <button onClick={() => setView(AppView.GENERATOR)} className={`hover:text-white transition-colors ${view === AppView.GENERATOR ? 'text-white' : ''}`}>Scanner</button>
              <button onClick={() => setView(AppView.DASHBOARD)} className={`hover:text-white transition-colors ${view === AppView.DASHBOARD ? 'text-white' : ''}`}>Monitor</button>
            </div>
            <div className="flex items-center gap-4 border-l border-white/10 pl-8">
              <div className="flex flex-col items-end">
                <div className="text-[9px] font-mono text-zinc-600 uppercase">Unit: {username}</div>
                <button onClick={handleLogout} className="text-[8px] font-mono text-orange-600 uppercase hover:text-white">Logout</button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-1">
        {/* Sidebar: Natal Collection */}
        <aside className="hidden lg:flex flex-col w-64 border-r border-white/5 pt-32 px-6 bg-black/40 h-screen sticky top-0 overflow-y-auto">
          <div className="space-y-8">
            <div className="space-y-2">
              <h3 className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Natal Collection</h3>
              <div className="h-px w-full bg-zinc-900"></div>
            </div>
            
            <div className="space-y-2">
              {profiles.length > 0 ? (
                profiles.map(p => (
                  <button 
                    key={p.id}
                    onClick={() => { setActiveUnitB(p); setView(AppView.DASHBOARD); }}
                    className="w-full text-left p-3 border border-white/5 hover:border-orange-600/50 hover:bg-zinc-950 transition-all group"
                  >
                    <div className="text-[10px] font-mono text-zinc-400 group-hover:text-white uppercase">{p.name}</div>
                    <div className="text-[8px] font-mono text-zinc-700 uppercase mt-1 truncate">{p.model}</div>
                  </button>
                ))
              ) : (
                <div className="text-[9px] font-mono text-zinc-800 uppercase italic">No subjects archived.</div>
              )}
            </div>

            <button 
              onClick={() => setView(AppView.GENERATOR)}
              className="w-full py-4 border border-zinc-800 hover:border-white text-[10px] font-mono uppercase text-zinc-500 hover:text-white transition-all"
            >
              + Add New Subject
            </button>
          </div>
        </aside>

        <main className="flex-1">
          {view === AppView.HOME && (
            <>
              <Hero />
              <Explainer />
              <Funnies />
            </>
          )}
          
          {view === AppView.GENERATOR && (
            <ManualGenerator onUnlock={handleManualGenerated} />
          )}

          {view === AppView.DASHBOARD && (
            <Dashboard unitA={activeUnitA} unitB={activeUnitB} manual={activeManual} />
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default App;
