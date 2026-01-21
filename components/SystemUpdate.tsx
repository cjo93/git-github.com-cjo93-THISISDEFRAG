
import React from 'react';

export const SystemUpdate: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-black border-y border-white/5">
      <div className="max-w-4xl mx-auto p-12 bg-zinc-950 border border-orange-600/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-orange-900 uppercase">INTERNAL_MEMO // 0xFD-1</div>
        <div className="space-y-10">
          <div className="space-y-2">
            <h3 className="text-orange-600 font-mono text-[10px] uppercase tracking-[0.4em] font-bold">TO: Beta Unit</h3>
            <h4 className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.4em]">STATUS: SYSTEM_UPGRADE_COMPLETE // v1.0 ONLINE</h4>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white">The Manual is ready. DEFRAG deals in hardware.</h2>
            <p className="text-zinc-400 font-mono text-xs uppercase leading-loose tracking-tighter">
              Standard relationship protocols are software patches for hardware problems. 
              We have successfully bridged the gap between Universal Source Code and mechanical application.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-orange-600 font-mono text-xs font-bold">01</span>
                <span className="text-white font-mono text-[10px] uppercase tracking-widest font-black">CORE ENGINE: SCRAPE</span>
              </div>
              <p className="text-[10px] text-zinc-600 font-mono uppercase leading-relaxed">
                We no longer guess. We scrape. Parsing the global ephemeris to identify Operating Systems: Kinetic Doers vs Static Guides.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-orange-600 font-mono text-xs font-bold">02</span>
                <span className="text-white font-mono text-[10px] uppercase tracking-widest font-black">NATAL ARCHIVE</span>
              </div>
              <p className="text-[10px] text-zinc-600 font-mono uppercase leading-relaxed">
                Data persistence enabled. Stop re-entering coordinates. Build your personal user database for bosses, partners, and parents.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5">
            <p className="text-[9px] font-mono text-zinc-700 uppercase tracking-widest italic">
              The guessing phase is over. Start operating the machine.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
