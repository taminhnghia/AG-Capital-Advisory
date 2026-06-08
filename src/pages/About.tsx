/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PageId, Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { ShieldCheck, Compass, Target, Scale, Award, ArrowRight } from 'lucide-react';

interface AboutProps {
  language: Language;
  setActivePage: (page: PageId) => void;
  onBookDiscussionClick: () => void;
}

export default function About({ language, setActivePage, onBookDiscussionClick }: AboutProps) {
  const t = (key: string) => TRANSLATIONS[language][key] || key;
  const isEn = language === 'EN';

  return (
    <div className="flex flex-col min-h-screen bg-[#02050A]" id="corporate-about-page">
      {/* Hero Header */}
      <section className="relative pt-36 pb-10 bg-gradient-to-b from-[#101F35]/30 to-transparent border-b border-slate-900" id="about-hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C9A227] block mb-3">
            {isEn ? 'THE ADVISORY' : 'GIỚI THIỆU'}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-medium tracking-tight text-white max-w-4xl leading-tight">
            {isEn
              ? 'Built for Meaningful Capital. Designed for Lasting Value.'
              : 'Cấu Trúc Dòng Vốn Tối Ưu. Kiến Tạo Giá Trị Bền Vững.'}
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-4 max-w-2xl leading-relaxed">
            {isEn
              ? 'AG Capital Advisory is a boutique advisory firm under AG Invest, created to support Vietnamese consumer businesses through investment readiness, disciplined capital access and long-term value creation.'
              : 'AG Capital Advisory là đơn vị tư vấn tài chính chuyên biệt hoạt động thuộc hệ sinh thái AG Invest, chuyên đồng hành cùng các doanh nghiệp tiêu dùng Việt Nam chuẩn hóa quản trị, hoàn thiện hồ sơ đầu tư và nâng cao năng lực tiếp nhận các dòng vốn chất lượng cao.'}
          </p>
        </div>
      </section>

      {/* 7.1 & 7.2 Overview & Relationship to Parent Brand */}
      <section className="py-10 bg-[#000]" id="about-overview-relationship">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-4 text-left">
              <span className="font-mono text-[10px] tracking-widest text-[#C9A227] uppercase">
                {isEn ? 'CORE FOCUS' : 'ĐỊNH HƯỚNG TRỌNG TÂM'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-sans font-medium text-white tracking-tight leading-snug">
                {isEn ? 'A Boutique Advisory Firm Focused on Consumer Growth' : 'Văn phòng Tư vấn Chuyên biệt đồng hành cùng sự bứt phá của Ngành hàng Tiêu dùng'}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed pt-2">
                {isEn
                  ? 'AG Capital Advisory works with promising businesses across Vietnam’s consumer economy. We combine sector understanding, investor-ready preparation, selective capital access and structured post-investment support.'
                  : 'Thị trường Tiêu dùng Việt Nam mang những nét đặc thù rất lớn. Chúng tôi đồng hành cùng các nhà sáng lập có tư duy đổi mới để mở khóa tiềm năng bứt phá của doanh nghiệp thông qua sự thấu hiểu sâu sắc bản địa, hồ sơ tài liệu chuẩn mực quốc tế và cơ chế quản trị minh bạch.'}
              </p>
            </div>

            {/* Parent Brand Connection card */}
            <div className="bg-[#101F35]/20 border border-[#C9A227]/25 p-8 rounded relative text-left">
              <span className="font-mono text-[9px] tracking-wider text-slate-400 uppercase">
                {isEn ? 'MANAGED BY' : 'HỆ SINH THÁI CO-SPONSOR'}
              </span>
              <h3 className="text-xl font-bold font-sans text-white mt-1 mb-3">AG Invest</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                {isEn
                  ? 'AG Invest provides the strategic brand foundation behind AG Capital Advisory, grounded in forward thinking, disciplined selection and long-term value creation. Our entire governance philosophy is centered around institutional credibility.'
                  : 'AG Invest là định chế bảo trợ thương hiệu chiến lược đứng sau AG Capital Advisory, lấy triết lý dẫn dắt tương lai, kỷ luật sàng lọc khắt khe và tư duy đồng hành dài hạn làm kim chỉ nam cho tất cả các hoạt động.'}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-900">
                <span className="text-[10px] font-mono tracking-widest text-[#C9A227] uppercase">
                  PARENT BRAND Slogan
                </span>
                <span className="text-xs text-white font-semibold font-sans tracking-widest">
                  {t('THINK_FORWARD')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-10 bg-[#02050A] border-y border-slate-900" id="about-vision-mission">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {/* Vision card */}
            <div className="p-8 rounded bg-slate-950 border border-slate-900 flex gap-4">
              <Target className="text-[#C9A227] shrink-0 mt-1" size={24} />
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {isEn ? 'Our Vision' : 'Tầm nhìn'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {isEn
                    ? 'To become a trusted boutique capital and governance advisory firm for growth-driven consumer businesses in Vietnam.'
                    : 'Trở thành văn phòng tư vấn tài chính chuyên biệt đáng tin cậy về cấu trúc dòng vốn và chuẩn hóa năng lực quản trị doanh nghiệp tiêu dùng tiêu biểu tại Việt Nam.'}
                </p>
              </div>
            </div>

            {/* Mission card */}
            <div className="p-8 rounded bg-slate-950 border border-slate-900 flex gap-4">
              <Compass className="text-[#C9A227] shrink-0 mt-1" size={24} />
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {isEn ? 'Our Mission' : 'Sứ mệnh'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {isEn
                    ? 'To help consumer businesses strengthen their foundations, become investment-ready, access suitable strategic capital and build value beyond the funding round.'
                    : 'Hỗ trợ các doanh nghiệp tiêu dùng củng cố vị thế cốt lõi, chuẩn hóa năng lực thu hút vốn đầu tư, thiết lập mối liên kết tối ưu với nhà đầu tư phù hợp và xây dựng các giá trị thặng dư bền vững sau kỳ gọi vốn.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="py-10 bg-[#000]" id="about-brand-values">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C9A227]">
            {isEn ? 'THE BEACONS' : 'GIÁ TRỊ CỐT LÕI'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-sans font-medium text-white tracking-tight mt-2 mb-12">
            {isEn ? 'Our Brand Values' : 'Nền tảng Giá trị cốt lõi'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-left" id="brand-values-grid">
            {[
              {
                title: isEn ? 'Forward Thinking' : 'Định hướng Tương lai',
                desc: isEn
                  ? 'Seeing beyond immediate transactions to long-term business value.'
                  : 'Vượt lên trên các mục tiêu giao dịch ngắn hạn để hướng tới sự phát triển bền vững và lâu dài của doanh nghiệp.',
                icon: ShieldCheck,
              },
              {
                title: isEn ? 'Disciplined Selection' : 'Tuyển chọn Kỷ luật',
                desc: isEn
                  ? 'Choosing opportunities carefully and working only where meaningful value can be created.'
                  : 'Kỷ luật tuyển chọn dự án chuẩn mực, chỉ đồng hành khi chúng tôi thực sự mang lại sự chuyển đổi về chất cho doanh nghiệp.',
                icon: Target,
              },
              {
                title: isEn ? 'Meaningful Partnership' : 'Đồng hành Thực chất',
                desc: isEn
                  ? 'Supporting founders with structure, clarity and genuine involvement.'
                  : 'Hỗ trợ nhà sáng lập bằng tổ chức cấu trúc vững vàng, tư duy trung thực và sự dấn thân đồng hành sâu sát.',
                icon: Scale,
              },
              {
                title: isEn ? 'Transparent Responsibility' : 'Trách nhiệm Minh bạch',
                desc: isEn
                  ? 'Being clear about fees, limitations, conflicts of interest and expectations.'
                  : 'Rõ ràng tối đa về quy chế thương mại, phạm vi tư vấn, kiểm soát xung đột lợi ích và thiết lập kỳ vọng thực tế.',
                icon: Award,
              },
              {
                title: isEn ? 'Lasting Value Creation' : 'Kiến tạo Di sản',
                desc: isEn
                  ? 'Remaining focused on what the business becomes after capital is raised.'
                  : 'Mọi nỗ lực đều hướng đến tầm vóc và giá trị nội tại doanh nghiệp kiến tạo được sau khi đón nhận dòng vốn mới.',
                icon: Compass,
              },
            ].map((val, vidx) => (
              <div
                key={vidx}
                className="bg-slate-950 p-6 rounded border border-slate-900 flex flex-col justify-between"
                id={`value-card-${vidx}`}
              >
                <div>
                  <val.icon className="text-[#C9A227] mb-4" size={20} />
                  <h4 className="text-sm font-semibold text-white mb-2">{val.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Structural Business DNA Connection Diagram */}
      <section className="py-10 bg-[#02050A] border-t border-slate-900" id="about-dna-diagram-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto text-center space-y-2 mb-12">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C9A227]">
              {isEn ? 'ADVISORY PATHWAY ENGINE' : 'CƠ CHẾ ĐỒNG HÀNH TOÀN DIỆN'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-sans font-medium text-white tracking-tight">
              {isEn ? 'Business DNA Diagram' : 'Chuỗi gen đồng hành Sáng lập'}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {isEn
                ? 'Our capabilities connect seamlessly to align your operation from preliminary diagnosis to sustainable scale.'
                : 'Các cấu phần bổ trợ chặt chẽ, tạo nền móng kiên cố giúp kết nối từ lúc sàng lọc đến điểm đến bùng nổ.'}
            </p>
          </div>

          {/* Connected SVG lines layout diagram */}
          <div className="bg-slate-950/60 p-6 md:p-10 rounded border border-slate-900 max-w-4xl mx-auto" id="dna-vector-diagram-container">
            <div className="grid grid-cols-1 md:grid-cols-7 gap-3 relative z-10" id="dna-node-grid">
              {[
                { step: '01', title: isEn ? 'Consumer Focus' : 'Chuyên biệt Tiêu dùng', desc: isEn ? 'Strict focus — not multi-industry.' : 'Tập trung tuyệt đối vào mảng tiêu dùng, không dàn trải.' },
                { step: '02', title: isEn ? 'Governance First' : 'Quản trị Đi trước', desc: isEn ? 'Solid structures before capital.' : 'Kiện toàn bộ máy quản lý trước khi thấu nhận nguồn vốn.' },
                { step: '03', title: isEn ? 'Selective Boutique' : 'Quy mô Chọn lọc (Boutique)', desc: isEn ? 'Quality over deal volume.' : 'Coi trọng chất lượng thay vì số lượng thương vụ.' },
                { step: '04', title: isEn ? 'Full-Cycle Capital' : 'Toàn vòng đời Vốn', desc: isEn ? 'Pre-Seed to Series D & M&A.' : 'Từ giai đoạn Sơ khởi (Pre-Seed) đến Series D & M&A.' },
                { step: '05', title: isEn ? 'M&A Capability' : 'Năng lực M&A', desc: isEn ? 'Buy-side & sell-side transaction.' : 'Đại diện chuyên nghiệp cho cả hai bên Mua và Bán.' },
                { step: '06', title: isEn ? 'Aligned Interest' : 'Gắn kết Lợi ích', desc: isEn ? 'Fee-into-Equity conversion options.' : 'Linh hoạt hoán đổi phí tư vấn thành cổ phần đồng hành.' },
                { step: '07', title: isEn ? 'Beyond-the-Round' : 'Thặng dư Hậu Thương vụ', desc: isEn ? 'Post-investment board frameworks.' : 'Cấu trúc hóa ban quản trị và tối ưu hóa hệ giá trị sau deal.' },
              ].map((node) => (
                <div
                  key={node.step}
                  className="p-4 bg-slate-950 rounded border border-slate-900 flex flex-col justify-between text-left relative group hover:border-[#C9A227]/40 transition group-hover:scale-105"
                  id={`dna-node-card-step-${node.step}`}
                >
                  <div>
                    <span className="font-mono text-[10px] font-bold text-[#C9A227] block mb-2">
                      {node.step}
                    </span>
                    <h4 className="text-xs font-bold text-white group-hover:text-[#C9A227] md:line-clamp-2 transition leading-tight mb-1">
                      {node.title}
                    </h4>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-normal mt-2">
                    {node.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Subtle flow connector note */}
            <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase mt-6 text-center">
              ▲ Integrated Corporate Governance Engine ▲
            </p>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-12 bg-[#000]" id="about-closing-ctr-box">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-sans font-medium text-white tracking-tight">
            {isEn
              ? 'A disciplined partner for an important business decision.'
              : 'Người đồng hành kỷ luật cùng những quyết định mang tính chiến lược của doanh nghiệp.'}
          </h2>
          <div className="flex justify-center gap-4 pt-2">
            <button
              onClick={() => {
                setActivePage('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 bg-[#C9A227] hover:bg-[#D4AF37] text-black font-semibold text-xs tracking-wider uppercase rounded"
            >
              {isEn ? 'Explore Services' : 'Tìm hiểu Giải pháp'}
            </button>
            <button
              onClick={onBookDiscussionClick}
              className="px-6 py-3 bg-transparent border border-white text-white hover:bg-white/5 font-semibold text-xs tracking-wider uppercase rounded"
            >
              {isEn ? 'Start a Conversation' : 'Yêu cầu Tham vấn'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
