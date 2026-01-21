
import React from 'react';

export const DoerIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-white fill-none" strokeWidth="1.5">
    {/* Head */}
    <circle cx="50" cy="20" r="8" />
    {/* Body */}
    <path d="M50 28 L50 60 L30 85 M50 60 L70 85" />
    {/* Arms holding wrench */}
    <path d="M50 40 L25 50 M50 40 L75 50" />
    {/* Wrench */}
    <path d="M72 45 L78 55 M70 48 L80 52 M73 45 L73 40 M77 45 L77 40" stroke="#ea580c" strokeWidth="2" />
    {/* Motion lines */}
    <path d="M10 30 L25 30 M12 50 L22 50 M10 70 L25 70" stroke="#ea580c" strokeWidth="1" opacity="0.6" />
    <path d="M80 20 L90 20 M85 40 L95 40" stroke="#ea580c" strokeWidth="1" opacity="0.6" />
  </svg>
);

export const GuideIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-zinc-500 fill-none" strokeWidth="1.5">
    {/* Chair */}
    <path d="M30 85 L70 85 M40 85 L40 65 L60 65 L60 85" strokeWidth="1" />
    {/* Head */}
    <circle cx="50" cy="35" r="8" />
    {/* Body (sitting) */}
    <path d="M50 43 L50 65 L35 75 M50 65 L65 75" />
    {/* Arms holding blueprint */}
    <path d="M50 50 L35 55 M50 50 L65 55" />
    {/* Blueprint */}
    <rect x="30" y="55" width="40" height="15" stroke="#ea580c" />
    <path d="M35 60 L65 60 M35 65 L65 65" stroke="#ea580c" strokeWidth="0.5" />
  </svg>
);
