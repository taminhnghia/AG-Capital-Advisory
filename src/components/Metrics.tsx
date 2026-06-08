/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Award, Briefcase, Landmark, ShieldCheck } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export function CountUp({ end, duration = 1800, prefix = '', suffix = '', decimals = 0 }: CountUpProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function - easeOutQuad
      const easeProgress = progress * (2 - progress);
      const currentVal = easeProgress * end;
      
      setCount(currentVal);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    window.requestAnimationFrame(step);
  }, [hasStarted, end, duration]);

  const valueStr = count.toFixed(decimals);

  return (
    <span ref={elementRef} className="font-mono tabular-nums leading-none">
      {prefix}
      {valueStr}
      {suffix}
    </span>
  );
}

interface MetricsProps {
  language: 'EN' | 'VI';
}

export default function Metrics({ language }: MetricsProps) {
  const isEn = language === 'EN';

  const items = [
    {
      id: 'metric-capital',
      value: 215,
      suffix: 'M+',
      prefix: '$',
      decimals: 0,
      titleEN: 'Total Portfolio Capital Advised',
      titleVI: 'Tổng Giá Trị Dòng Vốn Được Tư Vấn',
      descEN: 'Pre-seed to growth Series B transaction mandates engineered across Southeast Asia consumer niches.',
      descVI: 'Tư vấn cấu trúc giao dịch gọi vốn từ giai đoạn trước hạt giống (Pre-seed) đến Series B cho các ngách thị trường tiêu dùng Đông Nam Á.',
      icon: <Briefcase className="text-[#C9A227]" size={20} />,
    },
    {
      id: 'metric-companies',
      value: 48,
      suffix: '+',
      prefix: '',
      decimals: 0,
      titleEN: 'Ambitious Startups Supported',
      titleVI: 'Doanh Nghiệp Được Đồng Hành',
      descEN: 'High-growth consumer, retail, FMCG and technology brands standardizing corporate blueprints.',
      descVI: 'Hỗ trợ các thương hiệu Hàng tiêu dùng nhanh (FMCG), Chuỗi bán lẻ và Công nghệ tiêu dùng hoàn thiện thể chế vận hành chuẩn mực.',
      icon: <Award className="text-[#C9A227]" size={20} />,
    },
    {
      id: 'metric-liquidity',
      value: 12,
      suffix: '%',
      prefix: '',
      decimals: 0,
      titleEN: 'Average Dilution Savings',
      titleVI: 'Mức Giảm Thiểu Pha Loãng Trung Bình',
      descEN: 'Retained founder control through optimal share classes, anti-dilution boundaries and dynamic caps.',
      descVI: 'Bảo toàn quyền kiểm soát tối thượng của nhà sáng lập thông qua tối ưu các loại cổ phần và ranh giới chống pha loãng hữu hiệu.',
      icon: <ShieldCheck className="text-[#C9A227]" size={20} />,
    },
    {
      id: 'metric-valuation',
      value: 38.4,
      suffix: '%',
      prefix: '+',
      decimals: 1,
      titleEN: 'Valuation Premium Post-Blueprinting',
      titleVI: 'Thặng Dư Định Giá Sau Kiện Toàn Quản Trị',
      descEN: 'Capital multipliers obtained following clean data rooms, board structure designs and operational EBITDA.',
      descVI: 'Gia tăng hệ số nhân giá trị gọi vốn nhờ chuẩn hóa phòng dữ liệu rà soát (Data Room), kiện toàn bộ máy quản trị và tối ưu hóa EBITDA.',
      icon: <Landmark className="text-[#C9A227]" size={20} />,
    },
  ];

  return (
    <section 
      className="py-16 bg-[#02050A] border-y border-slate-900" 
      id="corporate-metrics-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center space-y-4 mb-16">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C9A227] font-bold">
            {isEn ? 'PROVEN IMPACT BY NUMBERS' : 'CHỈ SỐ THỰC THI THƯƠNG VỤ'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-sans font-medium tracking-tight text-white max-w-2xl mx-auto leading-tight">
            {isEn 
              ? 'Institutional Quality, Strategic Financial Outcomes' 
              : 'Năng Lực Hành Động Được Định Lượng'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto font-sans leading-relaxed">
            {isEn
              ? 'Our alignment formulas and governance audits remove friction from funding rounds, guaranteeing transactional excellence.'
              : 'Công thức đồng hành và giải pháp soát xét quản trị sâu sát giúp giảm thiểu rủi ro pháp lý, tối ưu hóa định giá ròng và bảo vệ tối đa chủ quyền sở hữu của nhà sáng lập.'}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="metrics-counters-grid">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative bg-[#000] border border-slate-900 rounded-lg p-6 sm:p-8 flex flex-col justify-between hover:border-[#C9A227]/30 transition-all duration-300 shadow-xl"
              id={item.id}
            >
              {/* Card top banner hover effects */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#C9A227] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-[#C9A227]/5 border border-[#C9A227]/10 rounded-lg">
                    {item.icon}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold tracking-tight text-white flex items-baseline">
                    <CountUp
                      end={item.value}
                      prefix={item.prefix}
                      suffix={item.suffix}
                      decimals={item.decimals}
                    />
                  </div>
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-100 tracking-tight font-sans pt-1">
                    {isEn ? item.titleEN : item.titleVI}
                  </h4>
                </div>

                <p className="text-[10px] sm:text-xs text-slate-400 font-sans leading-relaxed">
                  {isEn ? item.descEN : item.descVI}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
