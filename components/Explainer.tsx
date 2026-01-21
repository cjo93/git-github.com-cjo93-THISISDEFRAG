
import React from 'react';

export const Explainer: React.FC = () => {
  return (
    <section id="about" className="py-32 px-6 bg-[#030303] border-y border-white/5 relative overflow-hidden">
      {/* Decorative Blueprint Lines */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-white/5" />
      <div className="absolute top-1/2 left-0 w-full h-px bg-white/5" />

      <div className="max-w-5xl mx-auto space-y-24 relative z-10">
        <div className="space-y-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
            <div className="space-y-6">
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase">
                IT’S NOT <br/> THAT DEEP. <br/> <span className="text-orange-600 italic">(BUT IT IS.)</span>
              </h2>
              <div className="max-w-xl space-y-4">
                <p className="text-2xl text-zinc-300 font-light leading-snug">
                  It feels personal. It feels like they are attacking you on purpose. <span className="text-white font-bold">They aren’t.</span>
                </p>
                <p className="text-lg text-zinc-500 font-mono uppercase tracking-tighter leading-tight">
                  You aren't wrong for feeling hurt. But you aren't right about <span className="text-zinc-300 italic">why</span> they are doing it.
                </p>
              </div>
            </div>
            
            <div className="hidden lg:block w-64 p-6 border border-zinc-800 bg-black/50 backdrop-blur font-mono text-[9px] uppercase tracking-[0.2em] leading-relaxed text-zinc-400">
              <div className="text-orange-600 font-bold mb-2">DIAGNOSTIC_LOG:</div>
              User attempting to run <br/>
              [HIGH_LEVEL_SOCIAL_API.v4] <br/>
              on <br/>
              [LEGACY_BIOLOGY_CORE.v1]. <br/>
              Status: <span className="text-red-500">System Crash imminent.</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <div className="p-8 border-l-4 border-orange-600 bg-zinc-950/50">
              <p className="text-xl text-zinc-200 leading-relaxed font-light">
                You are trying to run high-level software on their old hardware. It crashes every time. <span className="text-orange-500 font-mono font-bold uppercase tracking-widest text-sm">DEFRAG</span> stops you from taking system errors personally.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="p-6 border border-white/5 bg-zinc-950/50 hover:border-orange-600/30 transition-colors group">
                  <div className="text-orange-600 font-mono text-xl mb-2 group-hover:scale-110 transition-transform origin-left">0%</div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Psychobabble</div>
               </div>
               <div className="p-6 border border-white/5 bg-zinc-950/50 hover:border-orange-600/30 transition-colors group">
                  <div className="text-orange-600 font-mono text-xl mb-2 group-hover:scale-110 transition-transform origin-left">100%</div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Actionable Logic</div>
               </div>
            </div>
          </div>
          
          <div className="space-y-4 font-mono">
            <div className="text-[10px] text-zinc-600 mb-4 uppercase tracking-[0.3em] flex items-center gap-4">
              <span className="h-px flex-1 bg-zinc-800"></span>
              The Operating Manual
              <span className="h-px flex-1 bg-zinc-800"></span>
            </div>
            {[
              { id: '01', title: 'Specifications', desc: 'Core temperament and hardware triggers.' },
              { id: '02', title: 'Procedures', desc: 'How to handle them in high-latency cycles.' },
              { id: '03', title: 'Troubleshooting', desc: 'Exact protocols for when they glitch.' },
              { id: '04', title: 'Safety Limits', desc: 'Warning signs for unavoidable kernel panic.' }
            ].map((item) => (
              <div key={item.id} className="group flex gap-6 p-6 border border-white/5 hover:bg-orange-600/5 transition-all cursor-default">
                <span className="text-orange-600 text-xs font-bold">{item.id}</span>
                <div className="space-y-1">
                  <div className="text-sm font-bold uppercase tracking-widest group-hover:text-orange-500 transition-colors">{item.title}</div>
                  <div className="text-[10px] text-zinc-500 lowercase opacity-80">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
