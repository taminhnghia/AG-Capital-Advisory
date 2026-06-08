/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Landmark, Award, Users, Scale, Shield, TrendingUp } from 'lucide-react';
import { Language } from '../types';

interface KeyAchievementsBannerProps {
  language: Language;
}

interface AchievementMetric {
  id: string;
  endValue: number;
  prefix: string;
  suffix: string;
  decimals: number;
  duration: number;
  icon: React.ReactNode;
  titleEn: string;
  titleVi: string;
  descEn: string;
  descVi: string;
  subValueEn: string;
  subValueVi: string;
}

// Highly performant, self-contained animated counter component
interface CounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  shouldStart: boolean;
  onComplete?: () => void;
}

export function AnimatedCounter({
  end,
  duration = 1800,
  prefix = '',
  suffix = '',
  decimals = 0,
  shouldStart,
  onComplete
}: CounterProps) {
  const [currentVal, setCurrentVal] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setCurrentVal(end);
      if (onComplete) onComplete();
      return;
    }

    if (!shouldStart) return;

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function - easeOutQuart (smooth finish)
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      const computedValue = easeProgress * end;
      
      setCurrentVal(computedValue);

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setCurrentVal(end);
        if (onComplete) onComplete();
      }
    };

    animationFrameId = window.requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [shouldStart, end, duration, prefersReducedMotion, onComplete]);

  const valueStr = currentVal.toFixed(decimals);

  return (
    <span className="font-mono tabular-nums leading-none font-bold text-white tracking-tight">
      {prefix}
      {valueStr}
      {suffix}
    </span>
  );
}

export default function KeyAchievementsBanner({ language }: KeyAchievementsBannerProps) {
  const isEn = language === 'EN';
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [animProgresses, setAnimProgresses] = useState<Record<string, number>>({});

  // Intersection observer to trigger counters only when element is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasTriggered(true);
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const achievements: AchievementMetric[] = [
    {
      id: 'achieve-cap',
      endValue: 215,
      prefix: '$',
      suffix: 'M+',
      decimals: 0,
      duration: 1600,
      icon: <Landmark className="text-[#C9A227]" size={22} />,
      titleEn: 'Total Capital Advised',
      titleVi: 'Tổng Giá Trị Vốn Tư Vấn',
      descEn: 'Strategic funding mandates, syndication rounds, and debt restructurings engineered safely.',
      descVi: 'Các thương vụ thu xếp vốn, hợp vốn cổ phần và tái cấu trúc dòng nợ doanh nghiệp trung hạn.',
      subValueEn: 'Pre-Seed to Series B',
      subValueVi: 'Từ Pre-Seed đến Series B'
    },
    {
      id: 'achieve-gov',
      endValue: 64,
      prefix: '',
      suffix: '+',
      decimals: 0,
      duration: 1800,
      icon: <Award className="text-[#C9A227]" size={22} />,
      titleEn: 'Governance Audits Completed',
      titleVi: 'Kiện Toàn Thể Chế Thành Công',
      descEn: 'Blueprinting boardroom rules, formalizing anti-dilution layers, and vetting institutional data rooms.',
      descVi: 'Kiện toàn quy chế hội đồng thành viên, bảo vệ tỷ lệ pha loãng và rà soát phòng dữ liệu pháp lý.',
      subValueEn: '100% Audit Compliance',
      subValueVi: '100% Chuẩn Hóa Pháp Lý'
    },
    {
      id: 'achieve-partners',
      endValue: 28,
      prefix: '',
      suffix: '+',
      decimals: 0,
      duration: 2000,
      icon: <Users className="text-[#C9A227]" size={22} />,
      titleEn: 'Institutional Conglomerates',
      titleVi: 'Quỹ Đầu Tư & Đối Tác Chiến Lược',
      descEn: 'Active co-investment network of regional venture capitalists, private equities, and retail titans.',
      descVi: 'Hệ thống quỹ đầu tư mạo hiểm, quỹ PE và các tập đoàn bán lẻ liên kết đồng hành.',
      subValueEn: 'Direct Tier-1 Syndicate',
      subValueVi: 'Liên minh Quỹ cấp 1 trực tiếp'
    },
    {
      id: 'achieve-equity',
      endValue: 94.2,
      prefix: '',
      suffix: '%',
      decimals: 1,
      duration: 2200,
      icon: <Scale className="text-[#C9A227]" size={22} />,
      titleEn: 'Founder Control Retained',
      titleVi: 'Quyền Kiểm Soát Sáng Lập',
      descEn: 'Average equity control preserved throughout expansion steps following strategic restructurings.',
      descVi: 'Tỷ lệ quyền biểu quyết trung bình được bảo toàn sau khi tối ưu hóa cấu trúc các loại cổ phần.',
      subValueEn: 'Industry Leading Safeguard',
      subValueVi: 'Giải pháp Bảo vệ Hàng đầu'
    }
  ];

  // Animate indicator progress bar on completion of each count-up
  const handleMetricComplete = (id: string, targetValue: number) => {
    setAnimProgresses(prev => ({
      ...prev,
      [id]: targetValue
    }));
  };

  return (
    <section 
      ref={containerRef}
      id="firm-key-achievements-banner" 
      className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 border-t border-b border-slate-900 select-none overflow-hidden"
    >
      {/* Background radial soft light to support corporate high-contrast design */}
      <div className="absolute top-0 right-10 w-[400px] h-[300px] bg-[#C9A227]/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-20 w-[400px] h-[300px] bg-[#C9A227]/3 rounded-full filter blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Authoritative Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end border-b border-slate-900 pb-10">
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#C9A227]/10 border border-[#C9A227]/20">
              <Shield size={12} className="text-[#C9A227] animate-pulse" />
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white font-bold">
                {isEn ? 'FIRM PERFORMANCE DEMONSTRATED' : 'CHỈ SỐ THỰC THI & NĂNG LỰC'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3.5xl font-sans font-medium tracking-tight text-white leading-tight">
              {isEn 
                ? 'Securing High-Growth Outcomes with Institutional Discipline' 
                : 'Chuẩn Hóa Thể Chế Để Đột Phá Định Giá Thặng Dư'}
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
              {isEn
                ? 'We translate governance restructuring and financial blueprinting into premium valuation advantages. These audited metrics represent real capital safeguarded.'
                : 'Chúng tôi kiện toàn hệ thống pháp lý doanh nghiệp song hành với cấu trúc dòng tài chính thông thái, tạo bước chạy cho các vòng thâu tóm gọi vốn ở mức định giá tối đa.'}
            </p>
          </div>
        </div>

        {/* Dynamic Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="achievements-interactive-cards">
          {achievements.map((item, idx) => {
            const isCompleted = animProgresses[item.id] !== undefined;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-[#060a12] border border-slate-900 hover:border-[#C9A227]/35 rounded-lg p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.6)] hover:shadow-[0_12px_32px_rgba(201,162,39,0.05)] text-left"
                id={item.id}
              >
                {/* Horizontal progress indicators */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-slate-900 rounded-t-lg overflow-hidden">
                  <motion.div 
                    initial={{ width: '0%' }}
                    animate={{ width: hasTriggered ? '100%' : '0%' }}
                    transition={{ duration: item.duration / 1000, ease: 'easeInOut' }}
                    className="h-full bg-gradient-to-r from-transparent via-[#C9A227]/70 to-[#C9A227]"
                  />
                </div>

                <div className="space-y-6">
                  {/* Decorative Icon Row & Label */}
                  <div className="flex justify-between items-center">
                    <div className="p-3 bg-[#C9A227]/5 border border-[#C9A227]/15 rounded-md flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <TrendingUp size={12} className="text-slate-600 group-hover:text-[#C9A227] transition-colors" />
                      <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">
                        {isEn ? item.subValueEn : item.subValueVi}
                      </span>
                    </div>
                  </div>

                  {/* Large Counter Panel */}
                  <div className="space-y-1">
                    <div className="text-4xl sm:text-5xl font-sans font-bold flex items-baseline">
                      <AnimatedCounter
                        end={item.endValue}
                        prefix={item.prefix}
                        suffix={item.suffix}
                        decimals={item.decimals}
                        shouldStart={hasTriggered}
                        onComplete={() => handleMetricComplete(item.id, item.endValue)}
                      />
                    </div>
                    
                    <h3 className="text-xs sm:text-sm font-semibold text-slate-100 tracking-tight font-sans pt-1">
                      {isEn ? item.titleEn : item.titleVi}
                    </h3>
                  </div>

                  {/* Body Copy */}
                  <p className="text-[11px] sm:text-xs text-slate-400 font-sans leading-relaxed border-t border-slate-900/60 pt-4 group-hover:text-slate-300 transition-colors">
                    {isEn ? item.descEn : item.descVi}
                  </p>
                </div>

                {/* Micro gold dot interactive indicator in footer */}
                <div className="mt-5 pt-3 border-t border-slate-900/40 flex justify-between items-center text-[10px] font-mono text-slate-500">
                  <span>{isEn ? `VERIFIED DATA` : `ĐÃ XÁC THỰC`}</span>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${isCompleted ? 'bg-[#C9A227] animate-pulse' : 'bg-slate-700'}`} />
                    <span className="text-[9px] font-bold text-slate-400">AG</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
