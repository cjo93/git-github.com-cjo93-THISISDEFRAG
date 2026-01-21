
import React, { useState, useEffect, useRef, useMemo } from 'react';

// Shared Audio Context for synthesized sound effects
let audioCtx: AudioContext | null = null;

const playDefragBlip = () => {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1400, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  } catch (e) {
    // Fail silently
  }
};

const BASE_TAGS = [
  "ASTROLOGY", "HUMAN_DESIGN", "ATTACHMENT_THEORY", "GENE_KEYS", "CONFLICT", 
  "TRAUMA_RESPONSE", "PSYCHOLOGY", "FAMILY_SYSTEMS", "SHADOW_WORK", 
  "ENNEAGRAM", "COMMUNICATION_BREAKDOWN", "ANXIETY_LOOPS", 
  "PROJECTION", "NARCISSISM", "EMPATH", "BOUNDARIES", "TRIGGER_WARNING", 
  "INNER_CHILD", "HEALING_JOURNEY", "COMPATIBILITY", "RED_FLAGS", "GASLIGHTING", 
  "STONEWALLING", "REJECTION_SENSITIVITY", "TRAUMA_BOND", "FLYING_MONKEYS",
  "GREY_ROCK", "HOOVERING", "NARC_COLLAPSE", "SPLITTING", "IDEALIZATION",
  "DEVALUATION", "CO_DEPENDENCY", "TRIANGULATION", "LOVE_BOMBING",
  "KERNEL_PANIC", "BUFFER_OVERFLOW", "THERMAL_THROTTLE", "I_O_ERROR",
  "DATA_CORRUPTION", "MEMORY_LEAK", "PARITY_CHECK", "HARD_RESET", "CPU_SPIKE",
  "SYSTEM_FAILURE", "OVERCLOCKING", "COLD_BOOT", "LATENCY_SPIKE", "PACKET_LOSS",
  "GHOSTING", "BREADCRUMBING", "TRAUMA_DUMPING", "REACTIVE_ABUSE", "ENMESHMENT"
];

const TAGS = [...BASE_TAGS, ...BASE_TAGS.map(t => t + "_REF")];

interface TagProps {
  text: string;
  mousePos: { x: number; y: number };
  containerRef: React.RefObject<HTMLDivElement | null>;
  scrollOffset: number;
}

const InteractiveTag: React.FC<TagProps> = ({ text, mousePos, containerRef, scrollOffset }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isDefragged, setIsDefragged] = useState(false);
  const wasDefragged = useRef(false);
  const cleanText = text.replace("_REF", "");
  
  const chaosState = useMemo(() => {
    // Random position within the noise panel
    const x = 5 + Math.random() * 90;
    const y = 5 + Math.random() * 90;
    
    /**
     * TOPOLOGY LOGIC: Noise -> Signal
     * The "Signal" is on the right side of the screen.
     * We calculate distance from the right boundary of the noise panel (x=100, y=50).
     * Tags closer to this point are "stable", tags further away (left side, corners) are "noisy".
     */
    const distFromSignal = Math.sqrt(Math.pow(x - 100, 2) + Math.pow(y - 50, 2));
    const normalizedDist = distFromSignal / 110; // 110 is approx max diagonal
    
    // Exponential noise factor (0 at the signal gateway, 1 at the far edges)
    const noiseIntensity = Math.pow(normalizedDist, 1.5);

    return {
      x,
      y,
      rot: (Math.random() * 80 - 40) * noiseIntensity, 
      scale: 0.4 + (Math.random() * 0.9), // Significant size variation
      opacity: (0.1 + Math.random() * 0.2) + (1 - noiseIntensity) * 0.3, // Brighter near signal
      blur: (Math.random() * 4) * noiseIntensity,
      // Dramatic parallax shift at the edges, near zero in the center/signal area
      parallaxFactor: (Math.random() - 0.5) * 1.5 * noiseIntensity,
      stableRot: (Math.random() * 6 - 3)
    };
  }, []);

  useEffect(() => {
    if (!elementRef.current || !containerRef.current) return;
    
    const rect = elementRef.current.getBoundingClientRect();
    const tagCenterX = rect.left + rect.width / 2;
    const tagCenterY = rect.top + rect.height / 2;
    
    const dist = Math.sqrt(
      Math.pow(mousePos.x - tagCenterX, 2) + 
      Math.pow(mousePos.y - tagCenterY, 2)
    );

    const active = dist < 140;
    setIsDefragged(active);

    if (active && !wasDefragged.current) {
      playDefragBlip();
    }
    wasDefragged.current = active;
  }, [mousePos]);

  const parallaxY = isDefragged ? 0 : scrollOffset * chaosState.parallaxFactor;

  return (
    <div 
      ref={elementRef}
      className={`absolute font-mono transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] cursor-default select-none whitespace-nowrap
        ${isDefragged 
          ? 'text-white z-50 defrag-glow opacity-100 scale-[1.15]' 
          : 'text-zinc-700 z-10'}
      `}
      style={{
        left: `${chaosState.x}%`,
        top: `calc(${chaosState.y}% + ${parallaxY}px)`,
        fontSize: isDefragged ? '1.1rem' : `${0.6 * chaosState.scale}rem`,
        fontWeight: isDefragged ? 800 : 400,
        opacity: isDefragged ? 1 : chaosState.opacity,
        filter: isDefragged ? 'none' : `blur(${chaosState.blur}px)`,
        transform: isDefragged 
          ? `rotate(${chaosState.stableRot}deg)` 
          : `rotate(${chaosState.rot}deg)`,
      }}
    >
      <div 
        className={`relative px-2 py-1 transition-all duration-500 border
          ${isDefragged 
            ? 'bg-orange-600/20 border-orange-600/80 animate-[borderPulse_1.5s_infinite]' 
            : 'bg-transparent border-transparent'}`}
      >
        <span className={isDefragged ? 'text-orange-500' : ''}>#</span>{cleanText}
        
        {isDefragged && (
          <>
            <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-orange-600"></div>
            <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-orange-600"></div>
            <div className="absolute -top-5 left-0 text-[6px] text-orange-400 font-bold tracking-[0.3em] uppercase opacity-90">
              SIGNAL_STABLE
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollOffset(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen flex flex-col md:flex-row relative bg-[#050505] overflow-hidden"
    >
      <style>{`
        @keyframes borderPulse {
          0% { border-color: rgba(234, 88, 12, 0.4); box-shadow: 0 0 5px rgba(234, 88, 12, 0.2); }
          50% { border-color: rgba(234, 88, 12, 1); box-shadow: 0 0 15px rgba(234, 88, 12, 0.4); }
          100% { border-color: rgba(234, 88, 12, 0.4); box-shadow: 0 0 5px rgba(234, 88, 12, 0.2); }
        }
      `}</style>

      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
        style={{ 
          backgroundImage: `
            linear-gradient(to right, #333 1px, transparent 1px),
            linear-gradient(to bottom, #333 1px, transparent 1px)
          `, 
          backgroundSize: '100px 100px' 
        }} 
      />

      <div 
        className="absolute pointer-events-none w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700"
        style={{ left: mousePos.x, top: mousePos.y, opacity: mousePos.x > 0 ? 1 : 0 }}
      />

      {/* Left: Dense Chaotic Noise */}
      <div className="w-full md:w-3/5 p-8 flex items-center justify-center relative overflow-visible h-screen">
        <div className="relative w-full h-[85vh] z-10">
          {TAGS.map((tag, idx) => (
            <InteractiveTag key={`${tag}-${idx}`} text={tag} mousePos={mousePos} containerRef={containerRef} scrollOffset={scrollOffset} />
          ))}
        </div>
        
        <div className="absolute top-12 left-12 font-mono text-[9px] text-zinc-800 tracking-[0.4em] uppercase pointer-events-none border-l border-zinc-900 pl-4 py-2">
          OVERWHELMING_NOISE: DETECTED<br/>
          DEPTH_FIELD: ACTIVE
        </div>
      </div>

      {/* Right: The Signal */}
      <div className="w-full md:w-2/5 bg-zinc-950/95 backdrop-blur-2xl flex flex-col items-center justify-center p-12 border-t md:border-t-0 md:border-l border-white/5 z-40 relative overflow-hidden">
        {/* Parallax Background Anchor Point: #DEFRAG */}
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
          style={{ transform: `translateY(${scrollOffset * 0.15}px)` }}
        >
          <span className="text-[18vw] md:text-[10vw] font-black text-white/[0.03] tracking-tighter uppercase font-mono italic">
            #DEFRAG
          </span>
        </div>

        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-orange-600/40 to-transparent"></div>
        
        <div className="text-center space-y-14 relative z-10">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-4">
               <div className="h-px w-12 bg-orange-600/50"></div>
               <h2 className="text-orange-600 font-mono tracking-[0.6em] text-[10px] uppercase font-bold">DEFRAG_INIT</h2>
               <div className="h-px w-12 bg-orange-600/50"></div>
            </div>
            <div className="font-mono text-[8px] text-zinc-600 uppercase tracking-widest flex items-center justify-center gap-6 opacity-60">
              <span>NOISE</span>
              <span className="text-orange-900">→</span>
              <span className="text-zinc-400">SIGNAL</span>
              <span className="text-orange-900">→</span>
              <span>ACTION</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] uppercase">
              The User Manual <br/> For <span className="text-orange-600">Your People.</span>
            </h1>
            <p className="text-xl font-mono text-zinc-500 uppercase tracking-widest font-light">
              Stop guessing. Start operating.
            </p>
          </div>

          <div className="max-w-xs mx-auto space-y-10">
            <p className="text-zinc-400 font-mono text-[11px] leading-relaxed uppercase tracking-tighter text-justify">
              You are drowning in data. Too many theories, not enough instructions. 
              DEFRAG translates the psychological shards into a single, mechanical interface.
            </p>
            
            <div className="space-y-4">
              <button className="group relative w-full py-5 bg-white text-black hover:bg-orange-600 hover:text-white transition-all duration-500 font-mono text-[11px] tracking-[0.4em] uppercase font-black overflow-hidden">
                <span className="relative z-10 group-hover:tracking-[0.6em] transition-all duration-500">
                  Initialize Defrag
                </span>
                <div className="absolute inset-0 bg-black/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              </button>
              
              <div className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.2em] italic">
                Simple instructions for difficult people.
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-12 border-t border-white/5 bg-black/95 backdrop-blur-md z-50 px-10 flex items-center justify-between pointer-events-none">
        <div className="font-mono text-[8px] text-zinc-700 uppercase tracking-[0.4em] flex gap-10">
          <span>OS_V: DEFRAG_4.2.0</span>
          <span className="hidden lg:inline text-orange-900/40">TRACE: 0xFD29A</span>
          <span>DEV_MODE: ACTIVE</span>
        </div>
        <div className="font-mono text-[8px] text-orange-700 uppercase tracking-[0.3em] animate-pulse">
          AWAITING_INPUT_STREAM...
        </div>
      </div>
    </section>
  );
};
