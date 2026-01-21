
import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { Explainer } from './components/Explainer';
import { Funnies } from './components/Funnies';
import { ManualGenerator } from './components/ManualGenerator';
import { Footer } from './components/Footer';

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen selection:bg-orange-500 selection:text-white relative">
      <SystemMonitor />
      
      {/* Sticky Header Nav */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-black tracking-tighter flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 bg-orange-600 rounded-sm flex items-center justify-center text-black font-mono group-hover:bg-white transition-colors">D</div>
            <span className="font-mono text-lg tracking-[0.2em] group-hover:text-orange-500 transition-colors">DEFRAG</span>
          </div>
          <div className="flex items-center gap-8">
            <div className="hidden md:flex gap-6 font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
              <a href="#manuals" className="hover:text-white transition-colors">Manuals</a>
              <a href="#about" className="hover:text-white transition-colors">Topology</a>
              <a href="#support" className="hover:text-white transition-colors">Terminal</a>
            </div>
            <a 
              href="#generate"
              className="px-6 py-2 border border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white transition-all font-mono text-xs tracking-widest uppercase"
            >
              Initialize Manual
            </a>
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        <Explainer />
        <ManualGenerator />
        <Funnies />
      </main>

      <Footer />
    </div>
  );
};

export default App;
