
import React from 'react';
import { DoerIcon, GuideIcon } from './Icons';

export const Funnies: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black uppercase tracking-tighter">FIELD DOCUMENTATION</h2>
          <p className="text-zinc-600 font-mono text-[10px] uppercase tracking-[0.4em]">Sub-Log 0xFD // Mechanical Alignment Proof</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 relative">
          {/* Panel 1: THE GLITCH */}
          <div className="bg-zinc-950 border border-white/5 p-10 flex flex-col items-center justify-center space-y-8 group transition-all hover:bg-black">
            <div className="w-full flex justify-between items-center mb-4">
               <span className="text-[8px] font-mono text-zinc-700 uppercase tracking-widest">Fig. A</span>
               <span className="text-[8px] font-mono text-red-600 uppercase font-bold px-2 py-1 bg-red-950/20 border border-red-900/40">ANALOG FRICTION</span>
            </div>
            
            <div className="relative w-full aspect-square bg-[#050505] border border-zinc-900 flex items-center justify-center p-8">
               <div className="absolute top-4 left-4 p-1 text-[8px] font-mono text-zinc-800 uppercase tracking-[0.2em]">INPUT: UNMANAGED_DOER</div>
               
               <div className="w-48 h-48 opacity-40 grayscale contrast-125">
                 <DoerIcon />
               </div>
               
               {/* Red Warning Light */}
               <div className="absolute top-10 right-10 w-4 h-4 rounded-full bg-red-600 blur-[8px] animate-pulse"></div>
               <div className="absolute bottom-10 left-10 text-[7px] font-mono text-red-500 uppercase font-black">VOLTAGE_SPIKE: YELLING</div>
            </div>
            
            <div className="text-center space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400">Condition: Logic Loop</h4>
              <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-tighter">
                Outcome: Structural Debate. <br/>
                Efficiency: <span className="text-red-500 font-bold">LOW</span>
              </p>
            </div>
          </div>

          {/* Panel 2: THE PATCH */}
          <div className="bg-zinc-950 border border-orange-600/30 p-10 flex flex-col items-center justify-center space-y-8 group transition-all hover:bg-black">
            <div className="w-full flex justify-between items-center mb-4">
               <span className="text-[8px] font-mono text-zinc-700 uppercase tracking-widest">Fig. B</span>
               <span className="text-[8px] font-mono text-green-600 uppercase font-bold px-2 py-1 bg-green-950/20 border border-green-900/40">DIGITAL ALIGNMENT</span>
            </div>
            
            <div className="relative w-full aspect-square bg-[#050505] border border-orange-600/20 flex items-center justify-center p-8">
               <div className="absolute top-4 left-4 p-1 text-[8px] font-mono text-orange-950 uppercase tracking-[0.2em]">INPUT: MANAGED_GUIDE</div>
               
               <div className="w-48 h-48">
                 <GuideIcon />
               </div>
               
               {/* Green Light */}
               <div className="absolute top-10 right-10 w-4 h-4 rounded-full bg-green-600 blur-[8px] opacity-60"></div>
               <div className="absolute bottom-10 right-10 text-[7px] font-mono text-green-500 uppercase font-black">PROXY_DEPLOYED</div>
            </div>
            
            <div className="text-center space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-orange-600">Condition: Boundary Sync</h4>
              <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-tighter">
                Outcome: Physical Reset. <br/>
                Efficiency: <span className="text-green-500 font-bold">OPTIMAL</span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-zinc-950 p-12 border border-white/5 relative group transition-all hover:border-orange-600/20">
          <div className="absolute top-4 right-8 text-orange-900 text-6xl opacity-10 font-black">"</div>
          <div className="max-w-2xl space-y-6">
            <p className="text-zinc-300 text-xl leading-relaxed italic font-light">
              "Before Defrag, I thought my partner was ignoring me. Now I know their hardware just has a <span className="text-white font-bold not-italic font-mono uppercase text-sm">Signal Processing Delay</span>. 
              The friction isn't personal. It's just unmanaged hardware."
            </p>
            <div className="flex items-center gap-4">
               <div className="h-px w-12 bg-zinc-800"></div>
               <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">— FIELD TEST PARTICIPANT #04</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
