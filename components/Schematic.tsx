
import React from 'react';

export const Schematic: React.FC = () => {
  return (
    <div className="w-full border border-white/5 bg-black p-8 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-600/40 to-transparent"></div>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
        {/* Node 1 */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border border-zinc-700 flex items-center justify-center font-mono text-[10px] text-zinc-500 group-hover:border-orange-600 transition-colors">
            INPUT
          </div>
          <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest text-center">
            Planetary<br/>Geometry
          </div>
        </div>

        <div className="hidden md:block h-px flex-1 bg-zinc-800 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-zinc-700"></div>
        </div>

        {/* Node 2 */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 border-2 border-orange-600/20 rotate-45 flex items-center justify-center font-mono text-[10px] text-orange-600 group-hover:bg-orange-600/5 transition-all">
            <div className="-rotate-45">COMPILER</div>
          </div>
          <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest text-center mt-4">
            Defrag<br/>Engine
          </div>
        </div>

        <div className="hidden md:block h-px flex-1 bg-zinc-800 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-zinc-700"></div>
        </div>

        {/* Node 3 */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border border-zinc-700 flex items-center justify-center font-mono text-[10px] text-zinc-500 group-hover:border-white transition-colors">
            OUTPUT
          </div>
          <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest text-center">
            Operating<br/>Manual
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <div className="inline-block px-4 py-1 border border-zinc-800 font-mono text-[9px] text-zinc-700 uppercase tracking-[0.4em]">
          SYSTEM_ARCHITECTURE_v3.0 // STABLE
        </div>
      </div>

      {/* Background Decorative Lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </div>
  );
};
