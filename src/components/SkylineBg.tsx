/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export default function SkylineBg() {
  return (
    <div
      id="cinematic-vietnam-skyline"
      className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden bg-[#02050A]"
    >
      {/* Deep atmospheric gradients representing Saigon River twilight */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#02050A] via-[#101F35]/70 to-transparent" />
      
      {/* Decorative vertical gold grid line accents representing structure */}
      <div className="absolute inset-0 opacity-10 flex justify-between px-12 md:px-24">
        <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-[#C9A227] to-transparent" />
        <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-[#C9A227] to-transparent hidden sm:block" />
        <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-[#C9A227] to-transparent hidden md:block" />
        <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-[#C9A227] to-transparent" />
      </div>

      {/* High-end vector blueprint of modern Vietnam architectural towers */}
      <svg
        className="absolute bottom-0 right-0 w-full md:w-3/4 lg:w-2/3 xl:w-1/2 h-[75%] opacity-35 hover:opacity-55 transition-opacity duration-1000"
        viewBox="0 0 1000 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        id="skyline-vector-svg"
      >
        <defs>
          {/* Metallic gold gradient for city wireframe */}
          <linearGradient id="skylineGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#AA7C11" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#AA7C11" stopOpacity="0.1" />
          </linearGradient>

          {/* Deep Navy/Black fade gradient */}
          <linearGradient id="fadeMask" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#02050A" />
            <stop offset="30%" stopColor="#02050A" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#02050A" stopOpacity="0" />
          </linearGradient>
          
          <linearGradient id="glowLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C9A227" stopOpacity="0" />
            <stop offset="50%" stopColor="#FFF2D1" stopOpacity="1" />
            <stop offset="100%" stopColor="#C9A227" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Dynamic golden rising curve / pathway */}
        <path
          d="M 50,550 Q 300,450 480,280 T 950,50"
          stroke="url(#skylineGold)"
          strokeWidth="1.5"
          strokeDasharray="5 3"
          fill="none"
        />

        {/* Glow point indicating a transaction milestone along the curve */}
        <circle cx="480" cy="280" r="4" fill="#C9A227" />
        <circle cx="480" cy="280" r="12" stroke="#FFF2D1" strokeWidth="0.5" strokeOpacity="0.5" className="animate-ping" style={{ animationDuration: '4s' }} />

        {/* Bitexco Tower silhouette outline */}
        {/* Slanted helix shape with observation deck */}
        <path
          d="M 280,600 L 295,300 Q 300,240 325,180 L 328,180 Q 345,240 348,300 L 360,600"
          stroke="url(#skylineGold)"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Helicopter Deck protrusion */}
        <path
          d="M 324,250 L 354,258 L 352,264 L 325,260"
          stroke="url(#skylineGold)"
          strokeWidth="1"
          fill="#1F3A5F"
          fillOpacity="0.3"
        />
        {/* Floor panel lines */}
        <line x1="290" y1="450" x2="350" y2="450" stroke="url(#skylineGold)" strokeWidth="0.5" />
        <line x1="292" y1="380" x2="348" y2="380" stroke="url(#skylineGold)" strokeWidth="0.5" />
        <line x1="302" y1="320" x2="342" y2="320" stroke="url(#skylineGold)" strokeWidth="0.5" />

        {/* Landmark 81 Silhouette outline on the right */}
        {/* Tiered structural columns tapering to a spire */}
        <g transform="translate(150, 0)">
          {/* Spire */}
          <line x1="550" y1="50" x2="550" y2="120" stroke="url(#skylineGold)" strokeWidth="2" />
          <polygon points="548,50 550,45 552,50 550,52" fill="#FFEAA5" className="animate-pulse" style={{ animationDuration: '2s' }} />

          {/* Tier 1 - Peak */}
          <rect x="546" y="120" width="8" height="80" stroke="url(#skylineGold)" strokeWidth="1" fill="#02050A" />
          {/* Tier 2 */}
          <rect x="540" y="200" width="20" height="150" stroke="url(#skylineGold)" strokeWidth="1.2" fill="#02050A" />
          {/* Tier 3 */}
          <rect x="532" y="310" width="36" height="290" stroke="url(#skylineGold)" strokeWidth="1.5" fill="#02050A" />
          {/* Side columns */}
          <rect x="514" y="380" width="18" height="220" stroke="url(#skylineGold)" strokeWidth="1.2" fill="#02050A" />
          <rect x="568" y="380" width="18" height="220" stroke="url(#skylineGold)" strokeWidth="1.2" fill="#02050A" />
          
          <rect x="495" y="440" width="19" height="160" stroke="url(#skylineGold)" strokeWidth="1" fill="#02050A" />
          <rect x="586" y="440" width="19" height="160" stroke="url(#skylineGold)" strokeWidth="1" fill="#02050A" />
        </g>

        {/* Bridge (Saigon Bridge / Thu Thiem bridge) layout on the left */}
        <path
          d="M 50,580 L 180,550 Q 220,535 240,550 L 260,580"
          stroke="url(#skylineGold)"
          strokeWidth="1.2"
          fill="none"
        />
        <line x1="180" y1="550" x2="180" y2="590" stroke="url(#skylineGold)" strokeWidth="1.5" />
        <line x1="240" y1="550" x2="240" y2="592" stroke="url(#skylineGold)" strokeWidth="1.5" />
        {/* Cabling */}
        <line x1="180" y1="550" x2="130" y2="580" stroke="url(#skylineGold)" strokeWidth="0.5" />
        <line x1="180" y1="550" x2="150" y2="580" stroke="url(#skylineGold)" strokeWidth="0.5" />
        <line x1="180" y1="550" x2="210" y2="580" stroke="url(#skylineGold)" strokeWidth="0.5" />
        <line x1="240" y1="550" x2="210" y2="580" stroke="url(#skylineGold)" strokeWidth="0.5" />
        <line x1="240" y1="550" x2="270" y2="580" stroke="url(#skylineGold)" strokeWidth="0.5" />

        {/* Ambient block towers/structures in deep background */}
        <rect x="50" y="420" width="45" height="180" stroke="url(#skylineGold)" strokeWidth="0.5" strokeOpacity="0.4" fill="#02050A" fillOpacity="0.5" />
        <rect x="110" y="380" width="60" height="220" stroke="url(#skylineGold)" strokeWidth="0.5" strokeOpacity="0.4" fill="#02050A" fillOpacity="0.5" />
        <rect x="420" y="460" width="55" height="140" stroke="url(#skylineGold)" strokeWidth="0.5" strokeOpacity="0.4" fill="#02050A" fillOpacity="0.5" />
        <rect x="490" y="400" width="75" height="200" stroke="url(#skylineGold)" strokeWidth="0.5" strokeOpacity="0.4" fill="#02050A" fillOpacity="0.5" />

        {/* Bottom solid cover gradient so lines integrate smoothly with homepage */}
        <rect x="0" y="550" width="1000" height="50" fill="url(#fadeMask)" />
      </svg>

      {/* Floating stars or warm glowing lights representing Saigon twilight */}
      <div className="absolute bottom-16 left-1/4 w-1.5 h-1.5 rounded-full bg-[#FFF2D1] opacity-70 animate-ping" style={{ animationDuration: '6s' }} />
      <div className="absolute bottom-48 left-1/3 w-1 h-1 rounded-full bg-[#FFF2D1] opacity-30" />
      <div className="absolute bottom-60 right-1/4 w-1.5 h-1.5 rounded-full bg-[#C9A227] opacity-40 animate-pulse" style={{ animationDuration: '5s' }} />
      <div className="absolute bottom-24 right-1/3 w-1 h-1 rounded-full bg-[#FFF2D1] opacity-50" />
    </div>
  );
}
