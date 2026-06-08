/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, Layers, Award } from 'lucide-react';
import { Language } from '../types';

interface TrustMarqueeProps {
  language: Language;
}

interface PartnerLogo {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ReactNode;
}

export default function TrustMarquee({ language }: TrustMarqueeProps) {
  const isEn = language === 'EN';

  const partners: PartnerLogo[] = [
    {
      id: 'partner-1',
      name: 'K-RETAIL CONGLOMERATE',
      subtitle: 'RETAIL LOGISTICS',
      icon: (
        <svg className="w-5 h-5 text-[#C9A227]/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      id: 'partner-2',
      name: 'APEX CONSUMER BRANDS',
      subtitle: 'FMCG DISTRIBUTION',
      icon: (
        <svg className="w-5 h-5 text-[#C9A227]/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    {
      id: 'partner-3',
      name: 'HIGHLANDS SYNDICATE',
      subtitle: 'VENTURE CAPITAL',
      icon: (
        <svg className="w-5 h-5 text-[#C9A227]/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      id: 'partner-4',
      name: 'VINAMART CO.',
      subtitle: 'CONSUMER TECH',
      icon: (
        <svg className="w-5 h-5 text-[#C9A227]/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    },
    {
      id: 'partner-5',
      name: 'GOLDEN HARVEST AGRI',
      subtitle: 'COLD-CHAIN DEV',
      icon: (
        <svg className="w-5 h-5 text-[#C9A227]/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'partner-6',
      name: 'EAST ASIA HOLDINGS',
      subtitle: 'STRATEGIC PE',
      icon: (
        <svg className="w-5 h-5 text-[#C9A227]/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      id: 'partner-7',
      name: 'METROLOGY LOGISTICS',
      subtitle: 'RETAIL INFRASTRUCTURE',
      icon: (
        <svg className="w-5 h-5 text-[#C9A227]/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    }
  ];

  // We duplicate the partner array to create a seamless infinite wrapping effect
  const doublePartners = [...partners, ...partners, ...partners];

  return (
    <section 
      id="corporate-trust-marquee" 
      className="relative w-full py-10 bg-[#02050A] border-b border-slate-900 overflow-hidden select-none"
    >
      {/* Absolute gradient overlay cards to mask left and right corners subtly */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#02050A] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#02050A] to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <ShieldCheck size={14} className="text-[#C9A227]" />
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400 font-bold">
            {isEn ? 'VETTED INDUSTRY VERTICALS' : 'MẠNG LƯỚI TÁC DANH PHÂN KHÚC'}
          </span>
        </div>
        <p className="text-[10px] text-slate-500 font-sans max-w-sm text-center sm:text-right">
          {isEn 
            ? 'Advising executive chairpersons across Vietnam’s core commercial sectors.' 
            : 'Đồng hành cùng ban lãnh đạo tối cao của các tập đoàn tiêu dùng huyết mạch.'}
        </p>
      </div>

      {/* Infinite Scrolling Marquee Wrapper */}
      <div className="relative w-full overflow-hidden py-3 bg-slate-950/40 border-t border-b border-slate-900/50">
        <div className="flex w-max animate-marquee">
          {doublePartners.map((partner, index) => (
            <div 
              key={`marquee-item-${partner.id}-${index}`} 
              className="flex items-center gap-3.5 mx-12 shrink-0 group hover:opacity-100 opacity-65 transition-all duration-300"
            >
              {partner.icon}
              <div className="flex flex-col text-left">
                <span className="font-mono text-[10px] font-bold text-white tracking-widest leading-none group-hover:text-[#C9A227] transition-colors">
                  {partner.name}
                </span>
                <span className="font-mono text-[8px] text-slate-500 uppercase tracking-wider mt-1">
                  {partner.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Marquee CSS animation dynamically to guarantee working scroll without tampering global css unnecessarily */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.33333%);
          }
        }
        .animate-marquee {
          animation: marquee 34s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
