/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';

// Reusable Shimmer Effect Item
export function SkeletonPulse({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-slate-900/60 border border-slate-800/40 rounded-lg relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent ${className}`}
    />
  );
}

// 1. Splash Screen Initial Loader with Glowing Gold Emblem
export function InitialAppLoader({ language }: { language: 'EN' | 'VI' }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Quadratic/exponential speed slowdown towards the end for realism
        const increment = prev < 40 ? 8 : prev < 75 ? 4 : prev < 90 ? 2 : 1;
        return Math.min(prev + increment, 100);
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#02050A] text-slate-100"
      id="initial-app-loader-viewport"
    >
      {/* Background radial gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#C9A227]/3 rounded-full blur-[100px] pointer-events-none" />

      {/* Decorative clean corporate grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c1322_1px,transparent_1px),linear-gradient(to_bottom,#0c1322_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35" />

      <div className="flex flex-col items-center max-w-xs w-full px-6 text-center select-none z-10" id="splash-emblem-cluster">
        {/* Shimmering Golden Coin/Emblem */}
        <div className="relative mb-6 animate-bounce" style={{ animationDuration: '3s' }} id="shimmering-gold-splash-coin">
          {/* External golden rotating glow ring */}
          <div className="absolute -inset-2 rounded-full border border-[#C9A227]/20 border-t-[#C9A227]/80 animate-spin" style={{ animationDuration: '4s' }} />
          
          {/* Minimalist polished gold blank double-ring structure matching high-end premium aesthetics */}
          <div className="h-20 w-20 md:h-24 md:w-24 rounded-full border border-[#C9A227] flex items-center justify-center bg-[#02050A] shadow-[0_0_25px_rgba(201,162,39,0.25)]">
            <div className="h-14 w-14 rounded-full border border-[#C9A227]/30 border-dashed animate-pulse" />
          </div>
        </div>

        {/* Text and Taglines */}
        <h2 className="text-sm font-sans font-bold tracking-[0.2em] uppercase text-white mb-1 whitespace-nowrap">
          AG CAPITAL ADVISORY
        </h2>
        <p className="text-[9px] font-mono tracking-[0.3em] text-[#C9A227] uppercase mb-8">
          — BEYOND THE ROUND —
        </p>

        {/* Interactive Loader Progress Bar layer */}
        <div className="w-full bg-slate-950 border border-slate-900 rounded-full h-[6px] overflow-hidden mb-3">
          <div
            className="h-full bg-gradient-to-r from-[#AA7503] via-[#C9A227] to-[#FFF2AF] transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Dynamic loading metrics */}
        <div className="flex items-center justify-between w-full text-[10px] font-mono text-slate-500 uppercase tracking-widest px-1">
          <span>{language === 'EN' ? 'SECURED CONNECTING...' : 'ĐANG KẾT NỐI...'}</span>
          <span className="text-[#C9A227] font-semibold">{progress}%</span>
        </div>
      </div>
    </div>
  );
}

// 2. High-fidelity Golden Top Load Progress Bar for Page Transitions
export function TopProgressBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-slate-950 overflow-hidden pointer-events-none" id="top-loading-indicator-wire">
      <div 
        className="h-full bg-gradient-to-r from-[#AA7503] via-[#C9A227] to-[#FFF2AF] "
        style={{
          animation: 'progress-loading 0.8s ease-in-out infinite',
          boxShadow: '0 0 8px rgba(201,162,39,0.6)'
        }}
      />
    </div>
  );
}

// 3. Hero Slide Placeholder Skeleton Screen Layout
export function HeroSkeleton() {
  return (
    <div className="relative min-h-[75vh] flex items-center justify-center bg-[#02050A] pt-28 pb-16 px-4" id="transition-skeleton-hero">
      <div className="max-w-5xl w-full mx-auto flex flex-col items-center text-center space-y-6">
        <div className="w-48 h-4 rounded bg-slate-900 animate-pulse mb-2" />
        <div className="w-full max-w-3xl h-12 rounded bg-slate-950 border border-slate-900 animate-pulse shadow-sm" />
        <div className="w-5/6 max-w-xl h-8 rounded bg-slate-950 border border-slate-900 animate-pulse" />
        <div className="w-3/4 max-w-lg h-16 rounded bg-slate-950 border border-slate-900 animate-pulse mt-4" />
        <div className="flex items-center gap-4 mt-8">
          <div className="w-36 h-10 rounded bg-[#C9A227]/10 border border-[#C9A227]/30 animate-pulse" />
          <div className="w-36 h-10 rounded bg-slate-900 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

// 4. Grid Rows Shimmering Skeleton Screen Layout (used for Services, Team, Case Studies)
export function GridSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-6" id="transition-skeleton-grid">
      {[1, 2, 3].map((idx) => (
        <div key={idx} className="bg-slate-950 border border-slate-900 rounded p-6 space-y-4">
          {/* Header icon block skeleton */}
          <div className="w-12 h-12 rounded bg-[#C9A227]/5 border border-[#C9A227]/10 animate-pulse" />
          
          {/* Titles and Subtitle skeleton */}
          <div className="space-y-2">
            <div className="w-2/3 h-5 rounded bg-slate-900 animate-pulse" />
            <div className="w-1/2 h-4 rounded bg-slate-900/60 animate-pulse" />
          </div>

          <hr className="border-slate-900" />

          {/* Description lines */}
          <div className="space-y-1.5">
            <div className="w-full h-3 rounded bg-slate-900 animate-pulse" />
            <div className="w-11/12 h-3 rounded bg-slate-900 animate-pulse" />
            <div className="w-5/6 h-3 rounded bg-slate-900 animate-pulse" />
          </div>

          {/* Action trigger skeleton */}
          <div className="pt-4">
            <div className="w-28 h-8 rounded bg-[#C9A227]/10 border border-[#C9A227]/20 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

// 5. Full Width Long Article / Text Skeleton Screen (used for Gov, Confidentiality, Disclaimers, Contact)
export function LongTextSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-10" id="transition-skeleton-longtext">
      {/* Title block */}
      <div className="space-y-3">
        <div className="w-32 h-4 rounded bg-[#C9A227]/10 animate-pulse" />
        <div className="w-3/4 h-10 rounded bg-slate-950 border border-slate-900 animate-pulse" />
      </div>

      <hr className="border-slate-900" />

      {/* Repeating text block with visual spacing */}
      {[1, 2, 3].map((idx) => (
        <div key={idx} className="space-y-4">
          <div className="w-48 h-5 rounded bg-slate-900 animate-pulse" />
          <div className="space-y-2">
            <div className="w-full h-3 rounded bg-gradient-to-r from-slate-900 to-transparent animate-pulse" />
            <div className="w-11/12 h-3 rounded bg-slate-900/60 animate-pulse" />
            <div className="w-5/6 h-3 rounded bg-slate-900/60 animate-pulse" />
            <div className="w-full h-3 rounded bg-slate-900/65 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

// 6. Root Skeleton Wrapper deciding which skeleton sub-frame to mount dynamically
interface SkeletonWrapperProps {
  pageId: string;
}

export function PageSkeleton({ pageId }: SkeletonWrapperProps) {
  if (pageId === 'home') {
    return (
      <div className="space-y-10">
        <HeroSkeleton />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="w-48 h-6 rounded bg-[#C9A227]/10 animate-pulse mb-6" />
          <GridSkeleton />
        </div>
      </div>
    );
  }

  if (pageId === 'about' || pageId === 'services' || pageId === 'industries' || pageId === 'process' || pageId === 'insights') {
    return (
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 py-4 mb-2">
          <div className="w-32 h-4 rounded bg-[#C9A227]/15 animate-pulse mb-3" />
          <div className="w-96 h-12 rounded bg-slate-950 border border-slate-900 animate-pulse" />
        </div>
        <GridSkeleton />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <LongTextSkeleton />
        </div>
      </div>
    );
  }

  // Fallback / text-heavy pages: governance, contact, terms, privacy, disclaimers
  return (
    <div className="pt-28 pb-12">
      <LongTextSkeleton />
    </div>
  );
}
