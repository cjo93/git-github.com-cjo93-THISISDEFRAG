
import React from 'react';

export const Funnies: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black uppercase tracking-tighter">FIELD DOCUMENTATION</h2>
          <p className="text-zinc-600 font-mono text-[10px] uppercase tracking-[0.4em]">Fig. 1.2 - Mechanical Translation in Action</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 relative">
          {/* Panel 1: THE GLITCH */}
          <div className="bg-zinc-950 border border-white/5 p-10 flex flex-col items-center justify-center space-y-8 group transition-all hover:bg-black">
            <div className="w-full flex justify-between items-center mb-4">
               <span className="text-[8px] font-mono text-zinc-700 uppercase tracking-widest">Panel_01</span>
               <span className="text-[8px] font-mono text-red-600 uppercase font-bold px-2 py-1 bg-red-950/20 border border-red-900/40">The Glitch</span>
            </div>
            
            <div className="relative w-full aspect-square bg-[#050505] border border-zinc-900 flex items-center justify-center">
               <div className="absolute top-4 left-4 p-1 text-[8px] font-mono text-zinc-800 uppercase tracking-[0.2em]">INPUT: RAW_ENTROPY</div>
               
               {/* Red Warning Light */}
               <div className="absolute top-10 right-10 w-4 h-4 rounded-full bg-red-600 blur-[8px] animate-pulse"></div>
               
               <svg width="160" height="160" viewBox="0 0 100 100">
                 {/* Figure A: The Doer (Vibrating/Anxious) */}
                 <g className="animate-[jitter_0.3s_infinite]">
                   <circle cx="25" cy="45" r="8" fill="none" stroke="white" strokeWidth="2" />
                   <path d="M25 53 L25 75 L15 90 M25 75 L35 90" fill="none" stroke="white" strokeWidth="2" />
                   <path d="M25 60 L40 50 M25 60 L10 50" fill="none" stroke="white" strokeWidth="2" />
                   {/* "Anxious" Lines */}
                   <path d="M10 35 L5 40 M40 35 L45 40" stroke="#ef4444" strokeWidth="1" />
                   <text x="35" y="40" fill="#ef4444" fontSize="7" fontWeight="black" className="font-mono">DO SOMETHING!</text>
                 </g>
                 
                 {/* Figure B: The Guide (Sitting with laptop) */}
                 <g opacity="0.6">
                   <circle cx="70" cy="50" r="8" fill="none" stroke="zinc-500" strokeWidth="2" />
                   <path d="M70 58 L70 75 L60 75 L50 75" fill="none" stroke="zinc-500" strokeWidth="2" />
                   <rect x="55" y="65" width="15" height="10" stroke="zinc-500" fill="none" strokeWidth="1" />
                 </g>
               </svg>
            </div>
            
            <div className="text-center space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400">System Overheat</h4>
              <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-tighter">
                Condition: Kinetic Friction. <br/>
                Latency: <span className="text-red-500">Critical</span>
              </p>
            </div>
          </div>

          {/* Panel 2: THE PATCH */}
          <div className="bg-zinc-950 border border-orange-600/30 p-10 flex flex-col items-center justify-center space-y-8 group transition-all hover:bg-black">
            <div className="w-full flex justify-between items-center mb-4">
               <span className="text-[8px] font-mono text-zinc-700 uppercase tracking-widest">Panel_02</span>
               <span className="text-[8px] font-mono text-green-600 uppercase font-bold px-2 py-1 bg-green-950/20 border border-green-900/40">The Patch</span>
            </div>
            
            <div className="relative w-full aspect-square bg-[#050505] border border-orange-600/20 flex items-center justify-center">
               <div className="absolute top-4 left-4 p-1 text-[8px] font-mono text-orange-950 uppercase tracking-[0.2em]">PROTOCOL: APPLIED</div>
               
               {/* Green Light */}
               <div className="absolute top-10 right-10 w-4 h-4 rounded-full bg-green-600 blur-[8px] opacity-60"></div>
               
               <svg width="160" height="160" viewBox="0 0 100 100">
                 {/* Figure A: Satisfied */}
                 <g>
                   <circle cx="25" cy="45" r="8" fill="none" stroke="#ea580c" strokeWidth="2" />
                   <path d="M25 53 L25 75 L15 90 M25 75 L35 90" fill="none" stroke="#ea580c" strokeWidth="2" />
                   <path d="M25 60 L35 65" fill="none" stroke="#ea580c" strokeWidth="2" />
                   <text x="35" y="55" fill="#22c55e" fontSize="10" fontWeight="black">✓</text>
                 </g>
                 
                 {/* Figure B: Taking action with wrench */}
                 <g>
                   <circle cx="70" cy="50" r="8" fill="none" stroke="white" strokeWidth="2" />
                   <path d="M70 58 L70 90 L60 90 M70 90 L80 90" fill="none" stroke="white" strokeWidth="2" />
                   {/* Wrench */}
                   <path d="M55 55 L65 55 M55 52 L55 58" stroke="#ea580c" strokeWidth="2" />
                   <rect x="75" y="45" width="12" height="16" fill="#ea580c" />
                   <text x="77" y="55" fill="black" fontSize="4" fontWeight="black">DEFRAG</text>
                 </g>
               </svg>
            </div>
            
            <div className="text-center space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-orange-600">Active Mode Engaged</h4>
              <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-tighter">
                Condition: Kinetic Sync. <br/>
                Stability: <span className="text-green-500">98.4%</span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-zinc-950 p-12 border border-white/5 relative group transition-all hover:border-orange-600/20">
          <div className="absolute top-4 right-8 text-orange-900 text-6xl opacity-10 font-black">"</div>
          <div className="max-w-2xl space-y-6">
            <p className="text-zinc-300 text-xl leading-relaxed italic font-light">
              "Before Defrag, I thought my dad hated me. Now I know he just has a <span className="text-white font-bold not-italic font-mono uppercase text-sm">High-Sensitivity Motion Detector</span>. 
              When I sit still, his alarm goes off. I learned the 3 things to say to reset his sensor. It’s like magic."
            </p>
            <div className="flex items-center gap-4">
               <div className="h-px w-12 bg-zinc-800"></div>
               <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">— Chad O. (Field Test Participant)</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
