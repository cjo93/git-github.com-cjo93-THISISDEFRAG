
import React, { useState, useEffect, useRef, useMemo } from 'react';

// Shared Audio Context for synthesized sound effects
let audioCtx: null | AudioContext = null;

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
  const [isHovered, setIsHovered] = useState(false);
  const wasDefragged = useRef(false);
  const cleanText = text.replace("_REF", "");
  
  const chaosState = useMemo(() => {
    const x = 7 + Math.random() * 86;
    const y = 7 + Math.random() * 86;
    const distFromSignalGateway = Math.sqrt(Math.pow(x - 100, 2) + Math.pow(y - 50, 2));
    const maxDist = 110;
    const normalizedDist = Math.min(distFromSignalGateway / maxDist, 1);
    const depthFactor = Math.pow(normalizedDist, 2.2);

    return {
      x, y,
      rot: (Math.random() * 30 - 15) * (0.4 + depthFactor * 0.6), 
      scale: 0.5 + (Math.random() * 0.2) + (depthFactor * 1.3), 
      opacity: Math.max(0.1, (0.45 - (depthFactor * 0.1))),
      blur: (Math.random() * 3) * depthFactor,
      parallaxFactor: (Math.random() - 0.5) * 4.5 * depthFactor,
      stableRot: (Math.random() * 3 - 1.5)
    };
  }, []);

  useEffect(() => {
    if (!elementRef.current || !containerRef.current) return;
    const rect = elementRef.current.getBoundingClientRect();
    const tagCenterX = rect.left + rect.width / 2;
    const tagCenterY = rect.top + rect.height / 2;
    const dist = Math.sqrt(Math.pow(mousePos.x - tagCenterX, 2) + Math.pow(mousePos.y - tagCenterY, 2));
    const active = dist < (115 + chaosState.scale * 20);
    setIsDefragged(active);
    if (active && !wasDefragged.current) playDefragBlip();
    wasDefragged.current = active;
  }, [mousePos, chaosState.scale]);

  const parallaxY = isDefragged ? 0 : scrollOffset * chaosState.parallaxFactor;

  return (
    <div 
      ref={elementRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`absolute font-mono transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer select-none whitespace-nowrap
        ${isDefragged ? 'text-white z-50 defrag-glow' : 'text-zinc-700 z-10'}
      `}
      style={{
        left: `${chaosState.x}%`,
        top: `calc(${chaosState.y}% + ${parallaxY}px)`,
        fontSize: isDefragged ? '1.05rem' : `${0.6 * chaosState.scale}rem`,
        fontWeight: isDefragged ? 800 : 400,
        opacity: isDefragged ? 1 : (isHovered ? Math.min(0.9, chaosState.opacity + 0.6) : chaosState.opacity),
        filter: (isDefragged || isHovered) ? 'none' : `blur(${chaosState.blur}px)`,
        transform: isDefragged 
          ? `rotate(${chaosState.stableRot}deg) scale(1.1)` 
          : `rotate(${chaosState.rot}deg) scale(${isHovered ? 1.15 : 1})`,
      }}
    >
      <div 
        className={`relative px-2 py-0.5 transition-all duration-500 border
          ${isDefragged 
            ? 'bg-orange-600/20 border-orange-600/80 animate-[borderPulse_1.5s_infinite]' 
            : isHovered
              ? 'bg-orange-600/5 border-orange-600/60 animate-[subtlePulse_1s_infinite]'
              : 'bg-transparent border-transparent'}`}
      >
        <span className={isDefragged || isHovered ? 'text-orange-500' : ''}>#</span>{cleanText}
        {isDefragged && (
          <>
            <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-orange-600"></div>
            <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-orange-600"></div>
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
    const handleScroll = () => setScrollOffset(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={containerRef}
      onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
      className="min-h-screen flex flex-col md:flex-row relative bg-[#050505] overflow-hidden"
    >
      <style>{`
        @keyframes borderPulse {
          0%, 100% { border-color: rgba(234, 88, 12, 0.3); box-shadow: 0 0 5px rgba(234, 88, 12, 0.1); }
          50% { border-color: rgba(234, 88, 12, 1); box-shadow: 0 0 20px rgba(234, 88, 12, 0.4); }
        }
        @keyframes subtlePulse {
          0%, 100% { border-color: rgba(234, 88, 12, 0.2); }
          50% { border-color: rgba(234, 88, 12, 0.7); }
        }
        @keyframes signalPulse {
          0%, 100% { opacity: 0.03; transform: scale(1); }
          50% { opacity: 0.08; transform: scale(1.05); }
        }
      `}</style>

      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
        style={{ backgroundImage: `linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)`, backgroundSize: '100px 100px' }} 
      />

      <div className="w-full md:w-3/5 p-8 flex items-center justify-center relative overflow-visible h-screen">
        <div className="relative w-full h-[85vh] z-10">
          {TAGS.map((tag, idx) => (
            <InteractiveTag key={`${tag}-${idx}`} text={tag} mousePos={mousePos} containerRef={containerRef} scrollOffset={scrollOffset} />
          ))}
        </div>
      </div>

      <div className="w-full md:w-2/5 bg-zinc-950/95 backdrop-blur-2xl flex flex-col items-center justify-center p-12 border-t md:border-t-0 md:border-l border-white/5 z-40 relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
          <span className="text-[10vw] font-black text-white tracking-tighter uppercase font-mono italic animate-[signalPulse_6s_infinite]">#DEFRAG</span>
        </div>

        <div className="text-center space-y-14 relative z-10">
          <div className="space-y-4">
            <h2 className="text-orange-600 font-mono tracking-[0.6em] text-[10px] uppercase font-bold">DEFRAG_INIT // v1.0 ONLINE</h2>
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
            <p className="text-sm font-mono text-zinc-500 uppercase tracking-widest font-light">
              Scraping the source code of human behavior.
            </p>
          </div>

          <div className="max-w-xs mx-auto space-y-10">
            <p className="text-zinc-400 font-mono text-[11px] leading-relaxed uppercase tracking-tighter text-justify">
              Human behavior isn't random. It is scripted by coordinates. We scrape the universal backend to translate ancient physics into mechanical instructions.
            </p>
            <button className="w-full py-5 bg-white text-black hover:bg-orange-600 hover:text-white transition-all font-mono text-[11px] tracking-[0.4em] uppercase font-black">
              Initialize OS
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
