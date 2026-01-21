
import React, { useState, useEffect, useRef } from 'react';
import { generateManualPreview } from '../services/geminiService';
import { calculateMechanics } from '../services/defragEngine';
import { ManualPreview, UnitData } from '../types';

interface GeneratorProps {
  onUnlock: (unitA: UnitData, unitB: UnitData, manual: ManualPreview) => void;
}

const Terminal: React.FC<{ unitA: UnitData; unitB: UnitData }> = ({ unitA, unitB }) => {
  const [lines, setLines] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const terminalLogs = [
    ">> INITIALIZING DEFRAG COMPILER v2.0...",
    ">> CONNECTING TO UNIVERSAL BACKEND... [CONNECTED]",
    `>> SCRAPING PLANETARY GEOMETRY (EPOCH ${new Date().getFullYear()}) ...`,
    `>> TRIANGULATING COORDINATES: ${unitA.location} ...`,
    ">> PARSING HEXAGRAM BINARY CODE...",
    ">> DECODING GENETIC DRIVERS...",
    `>> TARGET: "${unitB.name}"`,
    "   [+] SOURCE CODE: FOUND.",
    "   [+] DRIVE TYPE: KINETIC ENGINE DETECTED.",
    "   [+] OPERATING FREQUENCY: HIGH VOLTAGE.",
    ">> COMPARING OPERATING SYSTEMS...",
    "[!] CRITICAL ERROR: HARDWARE INCOMPATIBILITY DETECTED.",
    ">> GENERATING PATCH SCRIPTS...",
    ">> COMPILING USER MANUAL...",
    ">> DONE."
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < terminalLogs.length) {
        setLines(prev => [...prev, terminalLogs[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 120);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div ref={scrollRef} className="w-full h-48 bg-black border border-orange-600/30 p-4 font-mono text-[10px] overflow-y-auto space-y-1">
      {lines.map((line, idx) => (
        <div key={idx} className={line.startsWith('[!]') ? 'text-red-600' : line.startsWith('>>') ? 'text-orange-600' : 'text-zinc-400'}>
          {line}
        </div>
      ))}
      <div className="w-2 h-3 bg-orange-600 animate-pulse inline-block ml-1"></div>
    </div>
  );
};

export const ManualGenerator: React.FC<GeneratorProps> = ({ onUnlock }) => {
  // Fix: Add missing 'id' property to comply with UnitData type definition
  const [unitA, setUnitA] = useState<UnitData>({ id: 'initial-operator', name: 'CHAD', birthDate: '', birthTime: '12:00', location: '' });
  const [unitB, setUnitB] = useState<UnitData>({ id: 'initial-subject', name: 'FRED', birthDate: '', birthTime: '12:00', location: '' });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [stage, setStage] = useState<'input' | 'scanning' | 'upsell'>('input');
  const [preview, setPreview] = useState<{ mismatch: string } | null>(null);

  const handleScan = async () => {
    if (!unitA.name || !unitA.birthDate || !unitA.location || !unitB.name || !unitB.birthDate || !unitB.location) {
      setError('ALL COORDINATE FIELDS REQUIRED FOR SOURCE SCRAPE.');
      return;
    }

    setLoading(true);
    setError('');
    setStage('scanning');

    await new Promise(r => setTimeout(r, 3000));

    const finalA = calculateMechanics(unitA);
    const finalB = calculateMechanics(unitB);
    setUnitA(finalA);
    setUnitB(finalB);
    
    const mismatch = finalA.fuel !== finalB.fuel 
      ? `CRITICAL MISMATCH: ${finalA.fuel} vs ${finalB.fuel}. Hardware friction exceeds safety limits.`
      : `NOMINAL SYNC: Dual ${finalA.fuel} drives. High risk of mirroring and kernel panic.`;

    setPreview({ mismatch });
    setLoading(false);
    setStage('upsell');
  };

  const handleUnlock = async () => {
    setLoading(true);
    try {
      const manual = await generateManualPreview(unitA, unitB);
      onUnlock(unitA, unitB, manual);
    } catch (err) {
      setError('UPLINK_FAILURE: TRY AGAIN.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="generate" className="py-32 px-6 bg-zinc-950 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16 text-center">
          <div className="inline-block px-3 py-1 mb-6 border border-orange-600/30 font-mono text-[10px] text-orange-600 uppercase tracking-widest">
            Module: Compiler_v2.0 // SCRAPE_INIT
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter uppercase leading-none">Scrape Source <br/> Code</h2>
          <p className="text-zinc-500 font-mono uppercase text-sm tracking-widest max-w-2xl mx-auto">Input coordinates to map the underlying physics of this connection.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Unit A Input */}
          <div className="p-8 border border-white/5 bg-black space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-zinc-400 font-mono text-[10px] uppercase tracking-widest flex items-center gap-4">
                <span className="w-2 h-2 bg-orange-600"></span> Unit A (Operator)
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1 col-span-2">
                  <label className="text-[9px] text-zinc-600 font-mono uppercase">Designation (Name)</label>
                  <input
                    value={unitA.name}
                    onChange={e => setUnitA({ ...unitA, name: e.target.value.toUpperCase() })}
                    className="w-full bg-zinc-900/50 border border-white/10 p-3 font-mono text-sm text-white focus:border-orange-600 outline-none"
                    placeholder="CHAD"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] text-zinc-600 font-mono uppercase">Date of Manufacture</label>
                  <input
                    type="date"
                    value={unitA.birthDate}
                    onChange={e => setUnitA({ ...unitA, birthDate: e.target.value })}
                    className="w-full bg-zinc-900/50 border border-white/10 p-3 font-mono text-sm text-white focus:border-orange-600 outline-none color-scheme-dark"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] text-zinc-600 font-mono uppercase">Time (UTC-Sim)</label>
                  <input
                    type="time"
                    value={unitA.birthTime}
                    onChange={e => setUnitA({ ...unitA, birthTime: e.target.value })}
                    className="w-full bg-zinc-900/50 border border-white/10 p-3 font-mono text-sm text-white focus:border-orange-600 outline-none color-scheme-dark"
                  />
                </div>
                <div className="space-y-1 col-span-2">
                  <label className="text-[9px] text-zinc-600 font-mono uppercase">Origin (City)</label>
                  <input
                    value={unitA.location}
                    onChange={e => setUnitA({ ...unitA, location: e.target.value.toUpperCase() })}
                    className="w-full bg-zinc-900/50 border border-white/10 p-3 font-mono text-sm text-white focus:border-orange-600 outline-none"
                    placeholder="CITY, COUNTRY"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Unit B Input */}
          <div className="p-8 border border-white/5 bg-black space-y-8 flex flex-col justify-between">
             <div className="space-y-6">
              <h3 className="text-zinc-400 font-mono text-[10px] uppercase tracking-widest flex items-center gap-4">
                <span className="w-2 h-2 bg-zinc-700"></span> Unit B (Subject)
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1 col-span-2">
                  <label className="text-[9px] text-zinc-600 font-mono uppercase">Designation (Name)</label>
                  <input
                    value={unitB.name}
                    onChange={e => setUnitB({ ...unitB, name: e.target.value.toUpperCase() })}
                    className="w-full bg-zinc-900/50 border border-white/10 p-3 font-mono text-sm text-white focus:border-orange-600 outline-none"
                    placeholder="FRED"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] text-zinc-600 font-mono uppercase">Date of Manufacture</label>
                  <input
                    type="date"
                    value={unitB.birthDate}
                    onChange={e => setUnitB({ ...unitB, birthDate: e.target.value })}
                    className="w-full bg-zinc-900/50 border border-white/10 p-3 font-mono text-sm text-white focus:border-orange-600 outline-none color-scheme-dark"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] text-zinc-600 font-mono uppercase">Time (UTC-Sim)</label>
                  <input
                    type="time"
                    value={unitB.birthTime}
                    onChange={e => setUnitB({ ...unitB, birthTime: e.target.value })}
                    className="w-full bg-zinc-900/50 border border-white/10 p-3 font-mono text-sm text-white focus:border-orange-600 outline-none color-scheme-dark"
                  />
                </div>
                <div className="space-y-1 col-span-2">
                  <label className="text-[9px] text-zinc-600 font-mono uppercase">Origin (City)</label>
                  <input
                    value={unitB.location}
                    onChange={e => setUnitB({ ...unitB, location: e.target.value.toUpperCase() })}
                    className="w-full bg-zinc-900/50 border border-white/10 p-3 font-mono text-sm text-white focus:border-orange-600 outline-none"
                    placeholder="CITY, COUNTRY"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          {stage === 'input' && (
            <button
              onClick={handleScan}
              className="w-full py-6 bg-white text-black font-black uppercase tracking-[0.4em] hover:bg-orange-600 hover:text-white transition-all text-sm"
            >
              Initialize Diagnostic Scrape
            </button>
          )}

          {stage === 'scanning' && (
            <div className="w-full py-16 bg-zinc-900/50 border border-white/10 flex flex-col items-center justify-center space-y-6">
              <div className="space-y-2 text-center w-full max-w-lg">
                <div className="text-orange-600 font-mono text-[10px] uppercase tracking-[0.5em] animate-pulse mb-4">Accessing Universal Backend...</div>
                <Terminal unitA={unitA} unitB={unitB} />
              </div>
            </div>
          )}

          {stage === 'upsell' && preview && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
              <div className="p-8 bg-black border border-orange-600/20 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-600 to-transparent"></div>
                <h4 className="text-orange-600 font-black uppercase text-xl mb-3 tracking-tighter">Code Scrape Successful</h4>
                <p className="font-mono text-[12px] text-zinc-300 uppercase tracking-tighter leading-relaxed">
                  {preview.mismatch}
                </p>
              </div>

              <div className="bg-[#030303] p-12 border border-white/5 space-y-8 text-center relative">
                <div className="space-y-4">
                  <h3 className="text-3xl font-black uppercase tracking-tighter text-white">Unlock Full Operating Manual</h3>
                  <p className="text-zinc-500 font-mono text-xs uppercase max-w-xl mx-auto leading-relaxed">
                    Access the complete 0xFD archive. Exact interaction scripts, safety thresholds, and real-time friction mitigation protocols.
                  </p>
                </div>
                
                <div className="flex flex-col items-center gap-4">
                  <button
                    onClick={handleUnlock}
                    disabled={loading}
                    className="px-16 py-6 bg-white text-black font-black uppercase tracking-[0.4em] hover:bg-orange-600 hover:text-white transition-all text-sm"
                  >
                    {loading ? 'Compiling Instructions...' : 'Download Manual ($29)'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
