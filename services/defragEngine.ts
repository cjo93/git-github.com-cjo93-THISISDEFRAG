
import { UnitData, FrictionAlert } from '../types';

/**
 * Deterministic hash for simulated "real-time" results
 */
const simpleHash = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

const ZODIAC = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const KINETIC_SIGNS = ['Aries', 'Leo', 'Sagittarius', 'Gemini', 'Libra', 'Aquarius'];

export const calculateMechanics = (unit: UnitData): UnitData => {
  const seed = simpleHash(`${unit.birthDate}-${unit.birthTime}-${unit.location}`);
  
  const marsSign = ZODIAC[seed % 12];
  const sunSign = ZODIAC[(seed + 7) % 12];
  
  const isKinetic = KINETIC_SIGNS.includes(marsSign);
  
  const profile = isKinetic ? {
    os_type: "THE DOER (Kinetic Generator)",
    fuel: "KINETIC MOTION",
    warning: "SYSTEM OVERHEATS WHEN IDLE.",
    script: "Give them a task. Do not ask them to sit still."
  } : {
    os_type: "THE GUIDE (Projector)",
    fuel: "QUIET OBSERVATION",
    warning: "SYSTEM SHUTS DOWN IN NOISE.",
    script: "Ask for their input. Do not force them to work."
  };

  return {
    ...unit,
    id: unit.id || Math.random().toString(36).substr(2, 9),
    model: profile.os_type,
    fuel: profile.fuel,
    warning: profile.warning,
    os_type: profile.os_type,
    script: profile.script,
    mars_sign: marsSign,
    sun_sign: sunSign,
    drive: profile.fuel,
  };
};

export const getFrictionForecast = (unit: UnitData | null): FrictionAlert[] => {
  if (!unit) return [{ level: "🟢 NOMINAL", alert: "SYSTEM CLEAR", desc: "No unit data detected." }];

  const now = new Date();
  const daySeed = now.getDate() + now.getMonth();
  const unitSeed = simpleHash(unit.name) + daySeed;

  const scenarios: FrictionAlert[] = [
    { 
      level: "🔴 CRITICAL", 
      alert: "KINETIC OVERLOAD", 
      desc: "Transit Mars is grinding against your Core Sun placement. Expect physical agitation and low patience." 
    },
    { 
      level: "🟠 SIGNAL LAG", 
      alert: "LOGIC ERROR", 
      desc: "Mercury Retrograde shadow active in your 3rd House of Comm. Communication ports are dropping packets." 
    },
    { 
      level: "🟡 LOW VOLTAGE", 
      alert: "SENSORY THROTTLE", 
      desc: "Moon Opposition Saturn. Emotional cooling required. High-intensity social engagement will cause lag." 
    },
    { 
      level: "🟢 NOMINAL", 
      alert: "SYSTEM CLEAR", 
      desc: "Planetary harmonics are in alignment with your natal hardware. Engagement protocols are safe." 
    }
  ];

  const alertIndex = unitSeed % scenarios.length;
  const secondaryAlertIndex = (unitSeed + 1) % scenarios.length;

  const alerts = [scenarios[alertIndex]];
  if (alertIndex < 2) {
    alerts.push(scenarios[secondaryAlertIndex]);
  }

  return alerts;
};
