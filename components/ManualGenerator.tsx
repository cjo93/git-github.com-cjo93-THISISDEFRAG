
import React, { useState } from 'react';
import { generateManualPreview } from '../services/geminiService';
import { ManualPreview } from '../types';

export const ManualGenerator: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ManualPreview | null>(null);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError('');
    try {
      const data = await generateManualPreview(input);
      setResult(data);
    } catch (err) {
      setError('System Error: Unable to defrag current input. Verify connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="generate" className="py-32 px-6 bg-zinc-950 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center md:text-left">
          <div className="inline-block px-3 py-1 mb-6 border border-orange-600/30 font-mono text-[10px] text-orange-600 uppercase tracking-widest">
            Uplink Available
          </div>
          <h2 className="text-5xl font-black mb-4 tracking-tighter uppercase">DEFRAG YOUR SOURCE DATA.</h2>
          <p className="text-zinc-500 font-mono uppercase text-sm tracking-widest">Input the behaviors. Get the protocols.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="relative group">
              <div className="absolute -top-3 left-6 px-2 bg-zinc-950 font-mono text-[8px] text-zinc-700 group-focus-within:text-orange-600 transition-colors uppercase z-10">
                Behavioral_Input_Stream
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe their 'glitches'. E.g., 'My partner shuts down when I ask about dinner plans, then complains I don't help...'"
                className="w-full h-48 bg-black border border-white/10 p-8 text-zinc-300 font-mono focus:border-orange-600 outline-none transition-all resize-none shadow-2xl"
              />
              <div className="absolute bottom-4 right-4 text-[8px] text-zinc-800 font-mono flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-800 animate-pulse"></span>
                ENCRYPTED INPUT CHANNEL
              </div>
            </div>
            
            <button
              onClick={handleGenerate}
              disabled={loading || !input.trim()}
              className="w-full py-5 bg-orange-600 text-white font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black disabled:bg-zinc-800 disabled:text-zinc-600 transition-all flex flex-col items-center justify-center gap-1 shadow-[0_0_30px_rgba(234,88,12,0.1)] group"
            >
              {loading ? (
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span className="text-xs">UPLINKING...</span>
                </div>
              ) : (
                <>
                  <span className="text-sm">GENERATE MY USER MANUAL - $29</span>
                </>
              )}
            </button>
            
            <div className="flex justify-between items-center px-2">
              <p className="text-[9px] text-zinc-600 font-mono tracking-widest uppercase">
                Secure Checkout. PDF Delivered Instantly.
              </p>
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-zinc-800"></div>
                <div className="w-1 h-1 bg-zinc-800"></div>
                <div className="w-1 h-1 bg-zinc-800"></div>
              </div>
            </div>
          </div>

          <div className="min-h-[450px] border border-white/5 bg-[#030303] relative overflow-hidden shadow-2xl">
            {result ? (
              <div className="p-10 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] text-orange-600 uppercase font-bold tracking-widest">Signal_Valid</span>
                    <span className="font-mono text-[7px] text-zinc-600">CRC_CHECK: PASS</span>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-600 bg-zinc-900 px-2 py-1">ID_{Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
                </div>
                
                <div className="space-y-8 overflow-y-auto max-h-[300px] pr-4 custom-scrollbar">
                  <Section title="Specifications" content={result.specifications} />
                  <Section title="Operating Procedures" content={result.procedures} />
                  <Section title="Troubleshooting" content={result.troubleshooting} />
                </div>
                
                <div className="pt-6 text-center border-t border-white/5">
                  <button className="text-[10px] font-mono text-orange-600 hover:text-white transition-colors uppercase tracking-[0.2em] font-bold">
                    [ UNLOCK COMPREHENSIVE 5-PAGE ENCRYPTED PDF ]
                  </button>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-800 p-12 text-center bg-[radial-gradient(circle_at_center,rgba(234,88,12,0.02)_0%,transparent_70%)]">
                <div className="text-8xl mb-6 font-black opacity-10">?</div>
                <p className="font-mono text-[9px] uppercase tracking-[0.5em] text-zinc-700 animate-pulse">Awaiting Source Uplink</p>
                <div className="mt-12 grid grid-cols-6 gap-3 w-full max-w-[200px]">
                  {Array.from({length: 12}).map((_, i) => (
                    <div key={i} className="h-0.5 bg-zinc-900"></div>
                  ))}
                </div>
              </div>
            )}
            
            {loading && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
                <div className="text-center space-y-6">
                  <div className="text-orange-600 font-mono text-[9px] uppercase tracking-[0.4em] animate-pulse">Filtering Psychological Shards...</div>
                  <div className="w-64 h-px bg-zinc-800 mx-auto relative overflow-hidden">
                    <div className="absolute h-full bg-orange-600 animate-[loading_2s_infinite]"></div>
                  </div>
                  <div className="flex justify-center gap-2">
                    {Array.from({length: 3}).map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5 bg-zinc-900 animate-bounce" style={{animationDelay: `${i*0.2}s`}}></div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-red-950/40 backdrop-blur p-12 text-center z-50">
                <p className="text-red-500 font-mono text-[10px] uppercase tracking-widest border border-red-500/50 p-4">{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes loading {
          0% { width: 0%; transform: translateX(-100%); }
          50% { width: 100%; transform: translateX(0%); }
          100% { width: 0%; transform: translateX(100%); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
        }
      `}</style>
    </section>
  );
};

const Section: React.FC<{ title: string; content: string }> = ({ title, content }) => (
  <div className="space-y-3 group">
    <div className="flex items-center gap-3">
      <div className="h-px w-4 bg-orange-950 group-hover:w-8 transition-all"></div>
      <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-600 group-hover:text-zinc-400 transition-colors">{title}</h4>
    </div>
    <p className="text-sm text-zinc-400 leading-relaxed font-light pl-7 border-l border-zinc-900/50">{content}</p>
  </div>
);
