
import React, { useState, useEffect } from 'react';
import { getFrictionForecast } from '../services/defragEngine';
import { playProxyVoice } from '../services/geminiService';
import { FrictionAlert, UnitData, ManualPreview } from '../types';
import { Schematic } from './Schematic';

interface DashboardProps {
  unitA: UnitData | null;
  unitB: UnitData | null;
  manual: ManualPreview | null;
}

export const Dashboard: React.FC<DashboardProps> = ({ unitA, unitB, manual }) => {
  const [alerts, setAlerts] = useState<FrictionAlert[]>([]);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  useEffect(() => {
    setAlerts(getFrictionForecast(unitA));
    const interval = setInterval(() => setAlerts(getFrictionForecast(unitA)), 15000);
    return () => clearInterval(interval);
  }, [unitA]);

  const handleProxyCall = async (id: string, text: string) => {
    setIsPlaying(id);
    try {
      await playProxyVoice(text);
    } finally {
      setIsPlaying(null);
    }
  };

  if (!unitB) {
    return (
      <div className="py-48 px-6 flex flex-col items-center justify-center text-zinc-500 font-mono space-y-6">
        <div className="text-6xl text-zinc-900">∅</div>
        <div className="uppercase tracking-[0.5em] animate-pulse text-xs">Awaiting Subject Selection</div>
        <p className="text-[10px] text-zinc-800 uppercase max-w-xs text-center leading-loose">
          Select a subject from the archive or run a full diagnostic scan to initialize monitoring.
        </p>
      </div>
    );
  }

  return (
    <div className="py-32 px-6 max-w-6xl mx-auto space-y-24">
      {/* 1. Header & Live Read */}
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-10">
          <div className="space-y-4">
            <h2 className="text-5xl font-black uppercase tracking-tighter">ATMOSPHERIC DATA STREAM</h2>
            <div className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest flex flex-wrap gap-x-8 gap-y-2">
              <span>SCRAPING TARGET: <span className="text-white">{unitB.name}</span></span>
              <span>OS_CORE: <span className="text-orange-600">{unitB.model}</span></span>
              <span>SYNC: <span className="text-green-900">ACTIVE_SCRAPE</span></span>
            </div>
          </div>
          <div className="flex gap-4">
             <div className="px-4 py-2 bg-zinc-950 border border-white/5 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
               GPS_LOCK: {unitB.location}
             </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.4em] mb-4">Atmospheric Pressure (Live Scrape)</h3>
            <div className="space-y-4">
              {alerts.map((alert, idx) => (
                <div 
                  key={idx} 
                  className={`p-6 bg-black border transition-all duration-500 animate-in fade-in slide-in-from-left-4
                    ${alert.level.includes('🔴') ? 'border-red-900/50 shadow-[0_0_15px_rgba(239,68,68,0.05)]' : 
                      alert.level.includes('🟠') ? 'border-orange-900/50 shadow-[0_0_15px_rgba(234,88,12,0.05)]' : 
                      alert.level.includes('🟢') ? 'border-green-900/30' : 'border-zinc-800'}
                  `}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] font-black font-mono px-2 py-0.5 border ${
                      alert.level.includes('🔴') ? 'text-red-600 border-red-900/40 bg-red-950/20' : 
                      alert.level.includes('🟠') ? 'text-orange-600 border-orange-900/40 bg-orange-950/20' : 
                      alert.level.includes('🟢') ? 'text-green-600 border-green-900/40 bg-green-950/20' : 'text-zinc-400'
                    }`}>{alert.level}</span>
                    <span className="text-[8px] font-mono text-zinc-800 uppercase tracking-widest">TS: {new Date().toLocaleTimeString()}</span>
                  </div>
                  <h4 className="text-lg font-bold text-white uppercase tracking-tighter mb-2">>> {alert.alert}</h4>
                  <p className="text-[11px] text-zinc-500 font-mono uppercase leading-relaxed tracking-tighter">{alert.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.4em] mb-4 text-center">System Architecture (Logic Flow)</h3>
            <Schematic />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-16">
        {/* Proxy Voices */}
        <div className="lg:col-span-1 space-y-8">
          <div className="space-y-4 p-6 bg-orange-600/5 border border-orange-600/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-orange-600 rounded-full animate-pulse"></span>
              <h3 className="text-[10px] font-mono text-white uppercase tracking-[0.2em] font-black">EXPERIMENTAL: PROXY VOICE MODULE</h3>
            </div>
            <p className="text-[10px] text-zinc-500 font-mono uppercase leading-relaxed tracking-tighter">
              Don't fight the storm. Deploy the shield. Deploy synthetic boundaries via the emergency override to break emotional loops instantly.
            </p>
          </div>
          
          <div className="space-y-3">
            {[
              { id: 'yell', label: '🔊 THEY ARE YELLING', text: "System Alert. Kinetic Mismatch detected. The Operator is removing themselves from this environment to prevent system damage. Please standby while the Operator relocates." },
              { id: 'loop', label: '🔊 THEY ARE LOOPING', text: "Logic Failure. This sequence has been repeated multiple times without new data. I am pausing this interaction until further processing is available." },
              { id: 'interrupt', label: '🔊 THEY ARE INTERRUPTING', text: "Correction. Data transmission was incomplete. Please hold input until the current packet is fully received." }
            ].map((voice) => (
              <button
                key={voice.id}
                onClick={() => handleProxyCall(voice.id, voice.text)}
                disabled={!!isPlaying}
                className={`w-full py-5 px-6 border font-mono text-[11px] uppercase tracking-widest transition-all text-left flex justify-between items-center group
                  ${isPlaying === voice.id ? 'bg-orange-600 text-white border-orange-600' : 'bg-black text-zinc-400 border-white/5 hover:border-orange-600/50 hover:text-white'}
                `}
              >
                <span>{voice.label}</span>
                {isPlaying === voice.id ? <span className="animate-pulse">STREAMING</span> : <span className="text-[8px] text-zinc-800 group-hover:text-orange-500">OVERRIDE</span>}
              </button>
            ))}
          </div>
        </div>

        {/* The Manual */}
        <div className="lg:col-span-2 space-y-8">
          <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest border-l-2 border-orange-600 pl-4">Operating Manual (Scraped Source)</div>
          
          <div className="bg-[#030303] border border-white/5 p-10 font-mono space-y-12 relative overflow-hidden group min-h-[400px]">
            {manual ? (
              <div className="space-y-10 animate-in fade-in duration-700">
                <div className="flex justify-between items-center border-b border-white/5 pb-6">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black uppercase tracking-tighter">MANUAL_ID: {unitB.name.slice(0,6)}</h3>
                    <div className="text-[8px] text-zinc-600 uppercase tracking-widest">Source: Universal Backend // Epoch 2024</div>
                  </div>
                </div>
                
                <div className="space-y-10">
                  <div className="space-y-4 p-6 bg-zinc-950/50 border border-white/10 shadow-inner">
                    <h4 className="text-[10px] text-orange-600 font-bold uppercase tracking-widest mb-4">1.0 // THE ARCHITECTURE</h4>
                    <p className="text-xs text-zinc-300 leading-relaxed uppercase tracking-tighter">
                      Subject {unitB.name} is {unitB.model}. Hardware logic dictates {unitB.fuel}. This is not personal. It is a fundamental Hardware Incompatibility.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] text-orange-600 font-bold">01</span>
                      <h4 className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">MECHANICAL_SPECS</h4>
                      <div className="h-px flex-1 bg-zinc-900"></div>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed uppercase tracking-tighter indent-8">{manual.specifications}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] text-orange-600 font-bold">02</span>
                      <h4 className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">INTERACTION_PROTOCOLS</h4>
                      <div className="h-px flex-1 bg-zinc-900"></div>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed uppercase tracking-tighter indent-8">{manual.procedures}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] text-orange-600 font-bold">03</span>
                      <h4 className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">PATCH_SCRIPTS</h4>
                      <div className="h-px flex-1 bg-zinc-900"></div>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed uppercase tracking-tighter indent-8">{manual.troubleshooting}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-24 text-center space-y-6">
                <div className="text-zinc-900 text-6xl italic">∅</div>
                <div className="text-[10px] text-zinc-700 uppercase tracking-[0.5em]">Unresolved Conflict Detected</div>
                <p className="text-[8px] text-zinc-800 uppercase tracking-widest max-w-xs mx-auto">
                  You are currently operating a high-voltage unit without specifications. Download the manual to unlock protocols.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
