/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Language } from '../types';
import { Quote, MessageSquare, ChevronRight, Award } from 'lucide-react';
import { motion } from 'motion/react';
import SuccessStoriesPDF from './SuccessStoriesPDF';

interface Testimonial {
  quoteEN: string;
  quoteVI: string;
  author: string;
  roleEN: string;
  roleVI: string;
  company: string;
  avatarInitials: string;
  metric?: string;
  metricLabelEN?: string;
  metricLabelVI?: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quoteEN: "AG Capital Advisory was key to structuring our Series A and reorganizing our corporate governance. Beyond the capital, we gained real operational clarity.",
    quoteVI: "AG Capital Advisory là chìa khóa giúp chúng tôi tái cấu trúc dòng vốn Series A và chuẩn hóa Quản trị doanh nghiệp. Không chỉ dừng lại ở bài toán vốn, chúng tôi gặt hái được sự tường tỏ trong bài toán vận hành.",
    author: "Pham Tien Thanh",
    roleEN: "Co-Founder & CEO",
    roleVI: "Đồng sáng lập & CEO",
    company: "GreenLogistics Indochina",
    avatarInitials: "PT",
    metric: "+35% EBITDA",
    metricLabelEN: "Internal Efficiency",
    metricLabelVI: "Hiệu năng vận hành"
  },
  {
    quoteEN: "Their unique fee-into-equity structure meant they had their skin in the game. AG worked like an internal partner, transforming our retail unit economics.",
    quoteVI: "Cơ chế phí đổi cổ phần độc bản của họ chứng minh sự cam kết sâu sắc cùng lợi ích nhà sáng lập. AG đồng hành như cộng sự nội bộ, chuyển đổi triệt để hiệu suất tài chính chuỗi bán lẻ.",
    author: "Linh Dan",
    roleEN: "CEO & Founder",
    roleVI: "CEO & Sáng lập viên",
    company: "Hera Beauty & Retail",
    avatarInitials: "LD",
    metric: "12.5M USD",
    metricLabelEN: "JV Value Locked",
    metricLabelVI: "Bảo chứng liên doanh"
  },
  {
    quoteEN: "When we were negotiating our strategic joint venture with our foreign partner, AG set up a bullet-proof shareholder framework. Highly recommended.",
    quoteVI: "Khi chúng tôi đàm phán liên doanh chiến lược với đối tác ngoại, AG đã thiết lập một thỏa ước cổ đông chặt chẽ vượt ngoài mong đợi. Đơn vị cố vấn cực kỳ đáng tin cậy.",
    author: "Quoc Anh",
    roleEN: "Founder & Chairman",
    roleVI: "Sáng lập & Chủ tịch",
    company: "Highlands Green Coffee",
    avatarInitials: "QA",
    metric: "Zero Risk",
    metricLabelEN: "Dilution Protection",
    metricLabelVI: "Bảo hộ chống pha loãng"
  },
  {
    quoteEN: "A breath of fresh air in investment banking. Real FMCG and retail operators who understand balance sheet cleanups and audit preparation.",
    quoteVI: "Lời giải thực sự đột phá thay thế ngân hàng đầu tư truyền thống. Đội ngũ vừa am tường tài chính vừa thông thạo vận hành chuỗi và hàng tiêu dùng.",
    author: "Tran Quoc Dung",
    roleEN: "Deputy General Director",
    roleVI: "Phó Tổng Giám đốc",
    company: "An Nam Consumer Group",
    avatarInitials: "QD",
    metric: "Series A",
    metricLabelEN: "Funding Cleared",
    metricLabelVI: "Gọi vốn thành công"
  },
  {
    quoteEN: "AG's guidance on franchise legal architecture and SHA terms saved us from high-risk dilution during expansion phases.",
    quoteVI: "Sự hỗ trợ kỹ lưỡng của AG về pháp lý nhượng quyền và SHA đã giữ chúng tôi an toàn trước nguy cơ pha loãng tài sản trí tuệ trong giai đoạn mở rộng thần tốc.",
    author: "Nguyen Huong Ly",
    roleEN: "Director of Expansion",
    roleVI: "Giám đốc Phát triển",
    company: "The Coffee Box",
    avatarInitials: "HL",
    metric: "40+ Outlets",
    metricLabelEN: "Optimized Chain",
    metricLabelVI: "Chuỗi cửa hàng tối ưu"
  }
];

const LOGOS = [
  { name: "VIETORGANIC FMCG", sub: "Consumer Food" },
  { name: "HERA BEAUTY", sub: "Retail & Spa" },
  { name: "THE COFFEE BOX", sub: "Beverage Chain" },
  { name: "RED PAN F&B", sub: "Restaurant Group" },
  { name: "GREENLOGISTICS", sub: "Ecological Supply Chain" },
  { name: "AN NAM CONSUMER", sub: "Manufacture & Trade" },
  { name: "VNDISTRI NETWORK", sub: "Distribution" },
  { name: "SAIGON GOURMET", sub: "Premium Imports" }
];

interface TestimonialsProps {
  language: Language;
}

export default function Testimonials({ language }: TestimonialsProps) {
  const isEn = language === 'EN';

  // Duplicate the arrays to ensure a seamless infinite scrolling marquee
  const doubleTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];
  const doubleLogos = [...LOGOS, ...LOGOS];

  return (
    <section 
      id="brand-testimonials-section" 
      className="py-16 bg-[#02050A] border-y border-[#C9A227]/10 relative overflow-hidden"
    >
      {/* Background ambient gold aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-r from-[#C9A227]/5 to-transparent blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#101F35]/40 border border-[#C9A227]/15 rounded-full">
            <Award size={12} className="text-[#C9A227]" />
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#FFF]">
              {isEn ? "Proven Performance" : "Kết Quả Minh Chứng"}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-sans font-medium text-white tracking-tight">
            {isEn ? "Trust from Growth-Stage Consumer Leading Brands" : "Sự Tin Cậy Từ Các Doanh Nghiệp Tiêu Dùng Dẫn Đầu"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
            {isEn 
              ? "We align with founders of high-volume retail chains, FMCG brands, and indochina services to secure transactional outcome, equity upside, and strict governance governance structures."
              : "Chúng tôi cùng sát cánh bên nhà sáng lập của các chuỗi bán sỉ bán lẻ, thương hiệu tiêu dùng và chuỗi nhượng quyền để hoàn thiện cơ cấu, tăng trưởng giá trị bền vững."}
          </p>
          <div className="pt-4 flex justify-center">
            <SuccessStoriesPDF language={language} />
          </div>
        </div>

        {/* 1. INFINITE CLIENT QUOTES MARQUEE ROW (Left to Right) */}
        <div className="relative w-full overflow-hidden py-4 mask-gradient">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#02050A] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#02050A] to-transparent z-10 pointer-events-none" />
          
          <div className="animate-marquee gap-6 flex">
            {doubleTestimonials.map((item, idx) => (
              <div 
                key={`quote-${idx}`}
                className="w-[380px] sm:w-[450px] shrink-0 bg-[#0B0F19]/90 rounded border border-slate-900/60 p-6 flex flex-col justify-between hover:border-[#C9A227]/40 hover:bg-[#101F35]/30 transition-all duration-300 relative group"
              >
                {/* Visual decoration line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C9A227]/40 to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Quote size={24} className="text-[#C9A227]/20" />
                    {item.metric && (
                      <div className="text-right">
                        <span className="font-mono text-xs font-semibold text-[#C9A227] block">
                          {item.metric}
                        </span>
                        <span className="text-[9px] font-mono tracking-wider text-slate-500 uppercase block">
                          {isEn ? item.metricLabelEN : item.metricLabelVI}
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed italic">
                    "{isEn ? item.quoteEN : item.quoteVI}"
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-900/50">
                  <div className="w-10 h-10 rounded bg-[#101F35] border border-[#C9A227]/20 flex items-center justify-center font-mono text-xs font-semibold text-[#C9A227]">
                    {item.avatarInitials}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">
                      {item.author}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-mono">
                      {isEn ? item.roleEN : item.roleVI} &bull; <span className="text-[#C9A227]/80">{item.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. INFINITE CLIENT LOGO MARQUEE ROW (Right to Left) */}
        <div className="relative w-full overflow-hidden mt-10 py-6">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#02050A] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#02050A] to-transparent z-10 pointer-events-none" />
          
          <div className="animate-marquee-reverse gap-6 flex items-center">
            {doubleLogos.map((logo, index) => (
              <div 
                key={`logo-${index}`}
                className="w-56 shrink-0 bg-[#060A12]/80 border border-slate-900 px-6 py-4 rounded hover:border-[#C9A227]/30 hover:bg-[#0E1524]/60 transition-all duration-350 cursor-default group text-center"
              >
                {/* Logo text modeled elegantly to look high-end Corporate */}
                <h4 className="font-mono text-xs font-semibold tracking-[0.16em] text-slate-200 group-hover:text-[#C9A227] transition-colors duration-300">
                  {logo.name}
                </h4>
                <span className="text-[8px] font-mono tracking-widest text-slate-600 uppercase block mt-1 group-hover:text-slate-400 transition-colors duration-300">
                  {logo.sub}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
