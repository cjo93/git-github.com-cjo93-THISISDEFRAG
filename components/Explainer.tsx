
import React from 'react';
import { SystemUpdate } from './SystemUpdate';

export const Explainer: React.FC = () => {
  return (
    <div className="bg-[#030303]">
      <section id="about" className="py-32 px-6 border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-px h-full bg-white/5" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-white/5" />

        <div className="max-w-5xl mx-auto space-y-32 relative z-10">
          <div className="space-y-8 text-center md:text-left">
            <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
              <div className="space-y-6">
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase">
                  WE SCRAPE THE <br/> CODE OF THE <br/> <span className="text-orange-600 italic">UNIVERSE.</span>
                </h2>
                <div className="max-w-xl space-y-6">
                  <p className="text-2xl text-zinc-300 font-light leading-snug">
                    Most relationship advice is guesswork. It relies on feelings and "trying harder." <span className="text-white font-bold">That is analog thinking.</span>
                  </p>
                  <p className="text-lg text-zinc-500 font-mono uppercase tracking-tighter leading-tight">
                    We treat human nature as a dataset. We scrape the universal backend (Time, Date, Location) to extract the logic and delete the belief.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* The Topology Section */}
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-6 p-8 border border-white/5 bg-black">
              <div className="text-zinc-800 text-6xl font-black">01</div>
              <h4 className="text-orange-600 font-mono text-sm uppercase tracking-widest font-bold">THE SOURCE (RAW)</h4>
              <p className="text-[11px] text-zinc-500 uppercase leading-relaxed font-mono">
                We access the universal coordinate system. Raw data from planetary geometry and hexagram physics.
              </p>
            </div>
            <div className="space-y-6 p-8 border border-orange-600/30 bg-zinc-950">
              <div className="text-orange-950 text-6xl font-black">02</div>
              <h4 className="text-white font-mono text-sm uppercase tracking-widest font-bold">THE COMPILER</h4>
              <p className="text-[11px] text-zinc-300 uppercase leading-relaxed font-mono">
                The DEFRAG Engine translates ancient physics into mechanical specs. We strip away the "magic" to reveal the machine.
              </p>
            </div>
            <div className="space-y-6 p-8 border border-white/5 bg-black">
              <div className="text-zinc-800 text-6xl font-black">03</div>
              <h4 className="text-orange-600 font-mono text-sm uppercase tracking-widest font-bold">THE OUTPUT</h4>
              <p className="text-[11px] text-zinc-500 uppercase leading-relaxed font-mono">
                A clean, actionable Operating Manual. Pure instructions for difficult hardware.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <SystemUpdate />
    </div>
  );
};
