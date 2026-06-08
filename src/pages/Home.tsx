/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { PageId, Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { ARTICLES_DB } from '../data/articles';
import SkylineBg from '../components/SkylineBg';
import ScrollReveal from '../components/ScrollReveal';
import Testimonials from '../components/Testimonials';
import Metrics from '../components/Metrics';
import DownloadPortal from '../components/DownloadPortal';
import VietnameseClientMap from '../components/VietnameseClientMap';
import NewsletterSignup from '../components/NewsletterSignup';
import KeyAchievementsBanner from '../components/KeyAchievementsBanner';
import TrustMarquee from '../components/TrustMarquee';
import { motion, AnimatePresence } from 'motion/react';

interface HeroSlide {
  id: number;
  badgeEN: string;
  badgeVI: string;
  titleEN: string;
  titleVI: string;
  sloganEN: string;
  sloganVI: string;
  descEN: string;
  descVI: string;
  ctaPrimaryEN: string;
  ctaPrimaryVI: string;
  ctaSecondaryEN: string;
  ctaSecondaryVI: string;
  indicatorEN: string;
  indicatorVI: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 0,
    badgeEN: 'MANAGED BY AG INVEST',
    badgeVI: 'THUỘC HỆ SINH THÁI AG INVEST',
    titleEN: 'Capital & Governance Advisory for Ambitious Consumer Businesses',
    titleVI: 'Tư vấn Vốn & Chuẩn hóa Quản trị cho Doanh nghiệp Tiêu dùng tăng trưởng',
    sloganEN: 'Beyond the round.',
    sloganVI: 'Bền bỉ hành trình giá trị.',
    descEN: 'We help Vietnamese consumer businesses strengthen governance, prepare for investment, access strategic capital and create lasting value beyond the funding round.',
    descVI: 'Chúng tôi đồng hành cùng các doanh nghiệp tiêu dùng Việt Nam chuẩn hóa nền tảng quản trị, chuẩn bị gọi vốn, tiếp cận các nguồn vốn chiến lược và kiến tạo giá trị dài hạn sau thương vụ.',
    ctaPrimaryEN: 'Submit Your Deal',
    ctaPrimaryVI: 'Gửi Deal gọi vốn',
    ctaSecondaryEN: 'Explore Our Services',
    ctaSecondaryVI: 'Khám phá dịch vụ',
    indicatorEN: 'Capital & Governance Readiness',
    indicatorVI: 'Vốn & Chuẩn bị Quản trị'
  },
  {
    id: 1,
    badgeEN: 'OPERATIONAL OUTCOMES',
    badgeVI: 'VẬN HÀNH THỰC CHIẾN',
    titleEN: 'FMCG & Retail Performance Optimization Roadmap',
    titleVI: 'Nâng cấp Mô hình Vận hành & Lộ trình Nhân rộng Chuỗi',
    sloganEN: 'Refining Unit Economics.',
    sloganVI: 'Tối ưu chỉ số thực chiến.',
    descEN: 'Structured programs to perfect multi-channel distribution networks, franchise architectures, and EBITDA ratios. Maximize corporate valuation before welcoming institutional equity.',
    descVI: 'Hoàn thiện chuỗi phân phối đa kênh, chuẩn hoá nhượng quyền thương hiệu và tối ưu tỷ suất EBITDA. Đảm bảo thúc đẩy tối đa định giá doanh nghiệp trước khi tiếp cận nguồn vốn lớn.',
    ctaPrimaryEN: 'Request Advisory Call',
    ctaPrimaryVI: 'Đăng ký Tham vấn ngay',
    ctaSecondaryEN: 'Our Industry Focus',
    ctaSecondaryVI: 'Lĩnh vực Chuyên môn',
    indicatorEN: 'FMCG & Retail Scale',
    indicatorVI: 'Vận hành FMCG & Bán lẻ'
  },
  {
    id: 2,
    badgeEN: 'SECURED TRANSACTION TRUST',
    badgeVI: 'TAY CHÈO THƯƠNG VỤ CHIẾN LƯỢC',
    titleEN: 'Strategic M&A Advisory & Joint Venture Alliances',
    titleVI: 'Tư vấn M&A Đầu tư & Hợp tác Liên doanh Khối ngoại',
    sloganEN: 'Strict Confidentiality. Absolute Alignment.',
    sloganVI: 'Bảo mật tuyệt đối. Đồng điệu lợi ích.',
    descEN: 'We align our interests using unique Fee-into-Equity structures. Empowering founders with buy-side and sell-side mandates, private placements, and bulletproof shareholder agreements.',
    descVI: 'Đồng hành chặt chẽ với cơ chế chuyển đổi phí dịch vụ thành cổ phần. Sát cánh cùng sáng lập viên thiết kế liên doanh quốc tế, sáp nhập chiến lược và thoả ước cổ đông bền bỉ.',
    ctaPrimaryEN: 'Start Secure Assessment',
    ctaPrimaryVI: 'Thẩm định Gọi vốn Sơ bộ',
    ctaSecondaryEN: 'Learn Alignment Model',
    ctaSecondaryVI: 'Mô hình Đồng hành',
    indicatorEN: 'M&A & Deal Structuring',
    indicatorVI: 'M&A & Cấu trúc thương vụ'
  }
];

interface Advisor {
  id: string;
  nameEN: string;
  nameVI: string;
  roleEN: string;
  roleVI: string;
  avatarInitials: string;
  bioEN: string;
  bioVI: string;
  expertiseEN: string[];
  expertiseVI: string[];
  affiliationEN: string;
  affiliationVI: string;
}

const ADVISORS_DATA: Advisor[] = [
  {
    id: 'adv-1',
    nameEN: 'Alex Tran',
    nameVI: 'Trần Anh Quân',
    roleEN: 'Senior Retail & FMCG Operations Counsel',
    roleVI: 'Cố vấn Trưởng Vận hành Hàng tiêu dùng & Chuỗi Bán lẻ',
    avatarInitials: 'AT',
    bioEN: 'Over 20 years leading retail and FMCG expansion programs across Indochina. Expert in establishing sustainable distribution infrastructure, modern trade networks, and unit economics optimization development.',
    bioVI: 'Hơn 20 năm thực chiến điều hành mở rộng chuỗi và các nhãn hàng tiêu dùng nhanh (FMCG) tại Việt Nam & khu vực Đông Dương. Chuyên gia tối ưu hoá chỉ số tài chính, kênh phân phối MT và cấu trúc nhượng quyền thương hiệu.',
    expertiseEN: ['Omni-channel Distribution', 'EBITDA Improvement', 'Franchise Structuring', 'S&OP Alignment'],
    expertiseVI: ['Hệ thống phân phối đa kênh', 'Tối ưu hoá chỉ số EBITDA', 'Cấu trúc nhượng quyền', 'Đồng điệu cung học S&OP'],
    affiliationEN: 'Ex-Regional Director at Unilever SEA, Retail Board Advisor',
    affiliationVI: 'Cựu Giám đốc Vận hành Unilever khu vực, Ban cố vấn bán lẻ'
  },
  {
    id: 'adv-2',
    nameEN: 'Henry Dang',
    nameVI: 'Đặng Hoàng Nam',
    roleEN: 'Corporate Finance & Valuation Specialist',
    roleVI: 'Cố vấn Tài chính Doanh nghiệp & Kiến tạo Định giá',
    avatarInitials: 'HD',
    bioEN: 'Specializes in advising growth-stage companies on balance sheet restructuring, private debt placements, and financial readiness for institutional equity. Proven record preparing complex cap tables for international audits.',
    bioVI: 'Chuyên gia hoạch định cấu trúc vốn, thu xếp công cụ nợ và nâng cấp hệ số tin cậy tài chính trước thẩm định. Dày dạn kinh nghiệm tối ưu hóa định giá và chuẩn bị các hệ chỉ số áp lực cao cho doanh nghiệp tăng trưởng.',
    expertiseEN: ['Capital Restructuring', 'Valuation Modeling', 'Treasury & Liquidity', 'Debt Advisory'],
    expertiseVI: ['Cấu trúc ngân sách vốn', 'Mô hình định giá nâng cao', 'Điều phối dòng tiền thanh khoản', 'Thu xếp công cụ nợ'],
    affiliationEN: 'Registered Deal Maker, Ex-Corporate Finance Partner at Big 4',
    affiliationVI: 'Đại diện Đàm phán, Cựu Giám đốc Tư vấn Tài chính Big 4'
  },
  {
    id: 'adv-3',
    nameEN: 'Theresa Le',
    nameVI: 'Lê Minh Thảo',
    roleEN: 'Legal Architecture & Institutional Governance Counselor',
    roleVI: 'Chuyên gia Pháp lý Cấu trúc & Thu xép Quản trị Cổ đông',
    avatarInitials: 'TL',
    bioEN: 'Focuses on building robust shareholder agreements, dispute prevention frameworks, and decision-rights matrices. She ensures ambitious scale-ups are fully aligned and risk-insulated prior to strategic investment periods.',
    bioVI: 'Chuyên sâu xây dựng thỏa ước cổ đông đắt giá, dọn dẹp cấu trúc sở hữu phức tạp, thiết lập ma trận quyền quyết định tối ưu. Đảm bảo cấu trúc điều hành an toàn pháp lý tuyệt đối trước khi đón thặng dư pha loãng.',
    expertiseEN: ['SHA & Term Sheet Architecture', 'Governance Auditing', 'Cap Table Harmonization', 'Strategic IP Protection'],
    expertiseVI: ['Thoả ước cổ đông SHA & Term sheet', 'Kiểm soát tuân thủ quản trị', 'Dọn dẹp làm sạch Cap table', 'Bảo hộ sở hữu trí tuệ thương hiệu'],
    affiliationEN: 'Arbitrator Counselor, Elite Corporate Governance Architect',
    affiliationVI: 'Luật sư Trọng tài thương mạị, Kiến trúc sư Quản trị Thể chế'
  },
  {
    id: 'adv-4',
    nameEN: 'Michael Nguyen',
    nameVI: 'Nguyễn Minh Trí',
    roleEN: 'M&A Advisory & Strategic Alliances Director',
    roleVI: 'Cố vấn Cấp cao M&A & Liên minh Chiến lược Khối ngoại',
    avatarInitials: 'MN',
    bioEN: 'Facilitated more than $150M in consumer sector acquisitions and strategic alliances across Southeast Asia. Renowned for unlocking premium buyers and structuring win-win cross-border joint ventures.',
    bioVI: 'Điều phối và xúc tiến thành công hơn 150 triệu USD các thương vụ mua bán sáp nhập (M&A) hàng tiêu dùng nội địa và quốc tế. Thế mạnh về kích hoạt mạng lưới thâu tóm chiến lược và thiết kế liên doanh khối ngoại.',
    expertiseEN: ['Sell-Side Advisory', 'Strategic Buyer Scouting', 'JV Joint Ventures', 'Transaction Integration'],
    expertiseVI: ['Tư vấn bên bán thương vụ', 'Tìm kiếm tổ chức mua chiến lược', 'Liên doanh cổ phần quốc tế', 'Tích hợp vận hành hậu M&A'],
    affiliationEN: 'Former Regional Investment Banking Director',
    affiliationVI: 'Nguyên Giám đốc Ngân hàng Đầu tư Quốc tế'
  }
];
import {
  TrendingUp,
  ShieldAlert,
  FileSpreadsheet,
  Globe,
  DollarSign,
  PieChart,
  ArrowRight,
  Target,
  FileCheck,
  Scale,
  Users,
  Compass,
  CheckCircle2,
  HelpCircle,
  Clock,
  Briefcase,
  Layers,
  ChevronRight,
  BookOpen,
  Check
} from 'lucide-react';

interface HomeProps {
  language: Language;
  setActivePage: (page: PageId) => void;
  setSelectedArticleId: (id: string | null) => void;
  onSubmitDealClick: () => void;
  onBookDiscussionClick: () => void;
}

export default function Home({
  language,
  setActivePage,
  setSelectedArticleId,
  onSubmitDealClick,
  onBookDiscussionClick,
}: HomeProps) {
  const t = (key: string) => TRANSLATIONS[language][key] || key;
  const isEn = language === 'EN';

  // State for Interactive Advisors/Counsel and Checklist
  const [selectedAdvisorId, setSelectedAdvisorId] = useState<string>('adv-1');
  const [checklistAnswers, setChecklistAnswers] = useState<Record<number, boolean>>({});

  // Hero Carousel State and Progress Indicators
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const autoplayTimerRef = useRef<any>(null);
  const progressIntervalRef = useRef<any>(null);
  const slideDuration = 6000; // 6 seconds per slide

  useEffect(() => {
    // Setup precise interval progression counters
    if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

    setProgress(0);

    const stepTime = 50; 
    const totalSteps = slideDuration / stepTime;
    let currentStep = 0;

    progressIntervalRef.current = setInterval(() => {
      currentStep++;
      const percent = Math.min((currentStep / totalSteps) * 100, 100);
      setProgress(percent);
    }, stepTime);

    autoplayTimerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, slideDuration);

    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [currentSlide]);

  const handleSelectSlide = (idx: number) => {
    setCurrentSlide(idx);
    setProgress(0);
  };

  const toggleChecklistItem = (index: number) => {
    setChecklistAnswers((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const checklistQuestions = [
    t('FIT_Q1'),
    t('FIT_Q2'),
    t('FIT_Q3'),
    t('FIT_Q4'),
    t('FIT_Q5'),
    t('FIT_Q6'),
  ];

  const checkedCount = Object.values(checklistAnswers).filter(Boolean).length;

  const navigateToArticleInsideHome = (artId: string) => {
    setSelectedArticleId(artId);
    setActivePage('insights');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#02050A]" id="corporate-home-page">
      {/* 1. CINEMATIC HERO SECTION */}
      <section
        id="hero-banner-viewport"
        className="relative min-h-screen sm:h-screen flex items-center justify-start overflow-hidden pt-24 pb-16 sm:py-0"
      >
        {/* Base layer: Saigon River vector backdrop with golden lights */}
        <SkylineBg />

        {/* Dynamic decorative backdrop layers based on active slide */}
        <AnimatePresence mode="wait">
          {currentSlide === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 pointer-events-none z-0"
              id="slide-overlay-fmcg"
            >
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: 'radial-gradient(circle at 70% 40%, rgba(201,162,39,0.1) 0%, transparent 60%), linear-gradient(180deg, transparent, rgba(16,31,53,0.3))',
                }}
              />
              {/* Soft floating particles / nodes representing consumer network endpoints */}
              <div className="absolute top-1/4 right-[25%] w-3 h-3 rounded-full bg-[#C9A227] animate-pulse" style={{ animationDuration: '3s' }} />
              <div className="absolute top-1/2 right-[15%] w-2 h-2 rounded-full bg-slate-400 animate-ping" style={{ animationDuration: '5s' }} />
              <div className="absolute bottom-1/3 right-[35%] w-1.5 h-1.5 rounded-full bg-[#C9A227] opacity-60" />
            </motion.div>
          )}

          {currentSlide === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.18 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 pointer-events-none z-0"
              id="slide-overlay-mna"
            >
              {/* Dynamic modern vector constellation lines representing strategic transaction alliances */}
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="mnaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#C9A227" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#101F35" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <circle cx="75%" cy="30%" r="5" fill="#C9A227" />
                <circle cx="85%" cy="50%" r="4" fill="#C9A227" />
                <circle cx="65%" cy="65%" r="6" fill="#C9A227" className="animate-pulse" style={{ animationDuration: '4s' }} />
                <circle cx="80%" cy="75%" r="5" fill="#C9A227" />
                
                <line x1="75%" y1="30%" x2="85%" y2="50%" stroke="url(#mnaGrad)" strokeWidth="1" />
                <line x1="75%" y1="30%" x2="65%" y2="65%" stroke="url(#mnaGrad)" strokeWidth="1" />
                <line x1="85%" y1="50%" x2="80%" y2="75%" stroke="url(#mnaGrad)" strokeWidth="1" />
                <line x1="65%" y1="65%" x2="80%" y2="75%" stroke="url(#mnaGrad)" strokeWidth="1" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ambient Dark Overlays */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#02050A] to-transparent z-10" />
        <div className="absolute inset-y-0 left-0 w-full lg:w-1/2 bg-gradient-to-r from-black/60 to-transparent pointer-none z-10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20 text-left w-full">
          
          {/* Main Slide Panel with slide crossfade */}
          <div className="min-h-[380px] flex flex-col justify-center max-w-3xl">
            <AnimatePresence mode="wait">
              {(() => {
                const activeSlide = HERO_SLIDES[currentSlide];
                return (
                  <motion.div
                    key={activeSlide.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                    className="space-y-6"
                    id={`hero-slide-pane-${activeSlide.id}`}
                  >
                    {/* Active slide badge */}
                    <div id="hero-badge-container" className="inline-flex items-center gap-2 px-3 py-1 rounded bg-gradient-to-r from-[#C9A227]/20 via-[#C9A227]/10 to-transparent border border-[#C9A227]/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227] animate-pulse" />
                      <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#FFF] inline-block font-medium">
                        {isEn ? activeSlide.badgeEN : activeSlide.badgeVI}
                      </span>
                    </div>

                    {/* Active slide title & slogan */}
                    <div className="space-y-4">
                      <h1 id="hero-primary-headline" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-medium tracking-tight text-white leading-tight">
                        {isEn ? activeSlide.titleEN : activeSlide.titleVI}
                      </h1>
                      <div className="flex items-center gap-3">
                        <span className="h-[1px] w-12 bg-[#C9A227]/70" />
                        <span className="font-mono text-base md:text-lg tracking-widest text-[#C9A227] font-semibold">
                          {isEn ? activeSlide.sloganEN : activeSlide.sloganVI}
                        </span>
                      </div>
                    </div>

                    {/* Description Paragraph */}
                    <p id="hero-description-text" className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl">
                      {isEn ? activeSlide.descEN : activeSlide.descVI}
                    </p>

                    {/* Dynamic Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-4" id="hero-button-actions">
                      <button
                        id="hero-btn-submit"
                        onClick={() => {
                          if (activeSlide.id === 0) {
                            onSubmitDealClick();
                          } else {
                            onBookDiscussionClick();
                          }
                        }}
                        className="w-full sm:w-auto px-8 py-4 bg-[#C9A227] text-black font-semibold text-xs tracking-wider uppercase rounded hover:bg-[#D4AF37] hover:shadow-[0_0_25px_rgba(201,162,39,0.35)] transition-all duration-300 cursor-pointer text-center"
                      >
                        {isEn ? activeSlide.ctaPrimaryEN : activeSlide.ctaPrimaryVI}
                      </button>
                      <button
                        id="hero-btn-services"
                        onClick={() => {
                          if (activeSlide.id === 0) {
                            setActivePage('services');
                          } else if (activeSlide.id === 1) {
                            setActivePage('industries');
                          } else {
                            setActivePage('alignment');
                          }
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="w-full sm:w-auto px-8 py-4 bg-transparent border border-[#C9A227]/40 text-[#C9A227] hover:text-white hover:border-white font-semibold text-xs tracking-wider uppercase rounded hover:bg-[#C9A227]/15 transition-all duration-300 cursor-pointer text-center"
                      >
                        {isEn ? activeSlide.ctaSecondaryEN : activeSlide.ctaSecondaryVI}
                      </button>
                    </div>

                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </div>

          {/* Premium Bottom Micro-Navigation / Selectors with Countdown Progress Bar */}
          <div className="mt-12 sm:mt-16 pt-5 border-t border-slate-900/40 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6" id="hero-carousel-tabs">
            {HERO_SLIDES.map((slide, sIdx) => {
              const isSelected = sIdx === currentSlide;
              return (
                <button
                  key={slide.id}
                  onClick={() => handleSelectSlide(sIdx)}
                  className="group flex flex-col text-left transition duration-300 cursor-pointer pointer-events-auto relative pb-2 sm:pb-3 focus:outline-none"
                  id={`hero-tab-button-${slide.id}`}
                >
                  {/* Progress track */}
                  <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-slate-900 overflow-hidden rounded">
                    {isSelected && (
                      <div 
                        className="h-full bg-gradient-to-r from-[#C9A227] to-[#D4AF37] transition-all duration-75"
                        style={{ width: `${progress}%` }}
                      />
                    )}
                  </div>

                  <span className={`font-mono text-[10px] tracking-widest ${isSelected ? 'text-[#C9A227]' : 'text-slate-600 group-hover:text-slate-400'} transition-colors duration-300`}>
                    0{sIdx + 1} / {isEn ? 'PILLAR FOCUS' : 'CHUYÊN ĐỀ PHÂN BỔ'}
                  </span>
                  
                  <span className={`text-[11px] sm:text-xs font-sans font-medium mt-1 uppercase ${isSelected ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'} transition-colors duration-300`}>
                    {isEn ? slide.indicatorEN : slide.indicatorVI}
                  </span>
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* 1.8 CORE INDUSTRY TRUST MARQUEE */}
      <TrustMarquee language={language} />

      {/* 2. BRAND TRUST STATEMENT */}
      <section id="trust-statement-section" className="relative py-12 bg-[#02050A] border-y border-[#C9A227]/10">
        <motion.div 
          className="max-w-5xl mx-auto px-4 text-center space-y-6"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#C9A227] to-transparent mx-auto" />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-medium tracking-tight text-white max-w-3xl mx-auto leading-snug">
            {t('TRUST_TITLE')}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-4xl mx-auto leading-relaxed">
            {t('TRUST_DESC')}
          </p>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#C9A227] to-transparent mx-auto pt-2" />
        </motion.div>
      </section>

      {/* 2.5 KEY IMPACT METRICS */}
      <KeyAchievementsBanner language={language} />

      {/* 3. SIX CORE SERVICES ARCHITECTURE */}
      <section id="services-architecture-section" className="py-12 bg-[#000] relative">
        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-16">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C9A227]">
              {isEn ? 'Our Capabilities' : 'Năng lực tư vấn'}
            </span>
            <h3 className="text-3xl font-sans font-medium text-white tracking-tight">
              {t('SERV_TITLE')}
            </h3>
            <p className="text-sm text-slate-400 max-w-2xl mx-auto">
              {t('SERV_SUBTITLE')}
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="service-cards-grid">
            {/* Card 1 */}
            <div className="group bg-slate-950/80 p-6 rounded border border-slate-900 hover:border-[#C9A227]/50 hover:bg-[#101F35]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[240px]">
              <div>
                <TrendingUp size={24} className="text-[#C9A227] mb-4 group-hover:scale-110 transition" />
                <h4 className="text-sm font-semibold text-white mb-2">{t('SERV_1_TITLE')}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{t('SERV_1_DESC')}</p>
              </div>
              <button
                onClick={() => {
                  setActivePage('services');
                  setTimeout(() => {
                    const el = document.getElementById('service-stream-1');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="inline-flex items-center gap-1.5 text-xs text-[#C9A227] hover:text-white transition group-hover:translate-x-1 duration-300 mt-6 text-left"
              >
                <span>{t('SERV_LEARN_MORE')}</span>
                <ChevronRight size={12} />
              </button>
            </div>

            {/* Card 2 */}
            <div className="group bg-slate-950/80 p-6 rounded border border-slate-900 hover:border-[#C9A227]/50 hover:bg-[#101F35]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[240px]">
              <div>
                <DollarSign size={24} className="text-[#C9A227] mb-4 group-hover:scale-110 transition" />
                <h4 className="text-sm font-semibold text-white mb-2">{t('SERV_2_TITLE')}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{t('SERV_2_DESC')}</p>
              </div>
              <button
                onClick={() => {
                  setActivePage('services');
                  setTimeout(() => {
                    const el = document.getElementById('service-stream-2');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="inline-flex items-center gap-1.5 text-xs text-[#C9A227] hover:text-white transition group-hover:translate-x-1 duration-300 mt-6 text-left"
              >
                <span>{t('SERV_LEARN_MORE')}</span>
                <ChevronRight size={12} />
              </button>
            </div>

            {/* Card 3 */}
            <div className="group bg-slate-950/80 p-6 rounded border border-slate-900 hover:border-[#C9A227]/50 hover:bg-[#101F35]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[240px]">
              <div>
                <Briefcase size={24} className="text-[#C9A227] mb-4 group-hover:scale-110 transition" />
                <h4 className="text-sm font-semibold text-white mb-2">{t('SERV_3_TITLE')}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{t('SERV_3_DESC')}</p>
              </div>
              <button
                onClick={() => {
                  setActivePage('services');
                  setTimeout(() => {
                    const el = document.getElementById('service-stream-3');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="inline-flex items-center gap-1.5 text-xs text-[#C9A227] hover:text-white transition group-hover:translate-x-1 duration-300 mt-6 text-left"
              >
                <span>{t('SERV_LEARN_MORE')}</span>
                <ChevronRight size={12} />
              </button>
            </div>

            {/* Card 4 */}
            <div className="group bg-slate-950/80 p-6 rounded border border-slate-900 hover:border-[#C9A227]/50 hover:bg-[#101F35]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[240px]">
              <div>
                <Scale size={24} className="text-[#C9A227] mb-4 group-hover:scale-110 transition" />
                <h4 className="text-sm font-semibold text-white mb-2">{t('SERV_4_TITLE')}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{t('SERV_4_DESC')}</p>
              </div>
              <button
                onClick={() => {
                  setActivePage('governance');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 text-xs text-[#C9A227] hover:text-white transition group-hover:translate-x-1 duration-300 mt-6 text-left"
              >
                <span>{t('SERV_LEARN_MORE')}</span>
                <ChevronRight size={12} />
              </button>
            </div>

            {/* Card 5 */}
            <div className="group bg-slate-950/80 p-6 rounded border border-slate-900 hover:border-[#C9A227]/50 hover:bg-[#101F35]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[240px]">
              <div>
                <FileSpreadsheet size={24} className="text-[#C9A227] mb-4 group-hover:scale-110 transition" />
                <h4 className="text-sm font-semibold text-white mb-2">{t('SERV_5_TITLE')}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{t('SERV_5_DESC')}</p>
              </div>
              <button
                onClick={() => {
                  setActivePage('services');
                  setTimeout(() => {
                    const el = document.getElementById('service-stream-5');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="inline-flex items-center gap-1.5 text-xs text-[#C9A227] hover:text-white transition group-hover:translate-x-1 duration-300 mt-6 text-left"
              >
                <span>{t('SERV_LEARN_MORE')}</span>
                <ChevronRight size={12} />
              </button>
            </div>

            {/* Card 6 */}
            <div className="group bg-slate-950/80 p-6 rounded border border-slate-900 hover:border-[#C9A227]/50 hover:bg-[#101F35]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[240px]">
              <div>
                <Compass size={24} className="text-[#C9A227] mb-4 group-hover:scale-110 transition" />
                <h4 className="text-sm font-semibold text-white mb-2">{t('SERV_6_TITLE')}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{t('SERV_6_DESC')}</p>
              </div>
              <button
                onClick={() => {
                  setActivePage('services');
                  setTimeout(() => {
                    const el = document.getElementById('service-stream-6');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="inline-flex items-center gap-1.5 text-xs text-[#C9A227] hover:text-white transition group-hover:translate-x-1 duration-300 mt-6 text-left"
              >
                <span>{t('SERV_LEARN_MORE')}</span>
                <ChevronRight size={12} />
              </button>
            </div>

            {/* Card 7 */}
            <div className="group bg-slate-950/80 p-6 rounded border border-slate-900 hover:border-[#C9A227]/50 hover:bg-[#101F35]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[240px]">
              <div>
                <FileCheck size={24} className="text-[#C9A227] mb-4 group-hover:scale-110 transition" />
                <h4 className="text-sm font-semibold text-white mb-2">{t('SERV_7_TITLE')}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{t('SERV_7_DESC')}</p>
              </div>
              <button
                onClick={() => {
                  setActivePage('services');
                  setTimeout(() => {
                    const el = document.getElementById('service-stream-7');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="inline-flex items-center gap-1.5 text-xs text-[#C9A227] hover:text-white transition group-hover:translate-x-1 duration-300 mt-6 text-left"
              >
                <span>{t('SERV_LEARN_MORE')}</span>
                <ChevronRight size={12} />
              </button>
            </div>

            {/* Card 8 */}
            <div className="group bg-slate-950/80 p-6 rounded border border-slate-900 hover:border-[#C9A227]/50 hover:bg-[#101F35]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[240px]">
              <div>
                <Layers size={24} className="text-[#C9A227] mb-4 group-hover:scale-110 transition" />
                <h4 className="text-sm font-semibold text-white mb-2">{t('SERV_8_TITLE')}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{t('SERV_8_DESC')}</p>
              </div>
              <button
                onClick={() => {
                  setActivePage('services');
                  setTimeout(() => {
                    const el = document.getElementById('service-stream-8');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="inline-flex items-center gap-1.5 text-xs text-[#C9A227] hover:text-white transition group-hover:translate-x-1 duration-300 mt-6 text-left"
              >
                <span>{t('SERV_LEARN_MORE')}</span>
                <ChevronRight size={12} />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 4. INDUSTRY FOCUS AREA */}
      <section id="industry-focus-section" className="py-12 bg-[#02050A] border-t border-slate-950">
        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center lg:text-left lg:flex lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C9A227]">
                {isEn ? 'Vietnam Ecosystem' : 'Hệ sinh thái tiêu dùng Việt Nam'}
              </span>
              <h3 className="text-3xl font-sans font-medium text-white tracking-tight">
                {t('IND_TITLE')}
              </h3>
              <p className="text-sm text-slate-400">
                {t('IND_DESC')}
              </p>
            </div>
            <button
              id="industries-action-btn"
              onClick={() => {
                setActivePage('industries');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="mt-6 lg:mt-0 inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#C9A227] hover:text-white transition"
            >
              <span>{isEn ? "VIEW SECTOR DETAILS" : "XEM CHI TIẾT LĨNH VỰC"}</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Industry Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4" id="industry-cards-grid">
            {[
              { id: 1, title: t('IND_1_TITLE'), desc: t('IND_1_SUB') },
              { id: 2, title: t('IND_2_TITLE'), desc: t('IND_2_SUB') },
              { id: 3, title: t('IND_3_TITLE'), desc: t('IND_3_SUB') },
              { id: 4, title: t('IND_4_TITLE'), desc: t('IND_4_SUB') },
              { id: 5, title: t('IND_5_TITLE'), desc: t('IND_5_SUB') },
            ].map((idx) => (
              <div
                key={idx.id}
                className="bg-slate-950/60 p-6 rounded border border-slate-900 group hover:border-[#C9A227]/40 hover:bg-[#101F35]/20' transition duration-300"
              >
                <div className="font-mono text-xs text-[#C9A227] font-semibold mb-4 leading-none select-none">
                  0{idx.id}
                </div>
                <h4 className="text-md font-semibold text-white mb-2 group-hover:text-[#C9A227] transition">
                  {idx.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">{idx.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* 4.5 GEOGRAPHIC COVERAGE & REGIONAL REACH MODEL */}
      <VietnameseClientMap language={language} />

      {/* 5. WHY AG CAPITAL */}
      <section id="why-ag-capital-section" className="py-12 bg-[#000]">
        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C9A227]">
              {isEn ? 'Corporate Philosophy' : 'Triết lý doanh nghiệp'}
            </span>
            <h3 className="text-3xl font-sans font-medium text-white tracking-tight">
              {t('WHY_TITLE')}
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual quotes / highlights on left */}
            <div className="lg:col-span-4 bg-[#101F35]/25 border border-[#C9A227]/20 p-8 rounded relative text-center">
              <span className="text-6xl text-[#C9A227]/25 font-serif absolute top-4 left-4 select-none">“</span>
              <p className="text-md sm:text-lg font-sans font-medium italic text-slate-100 leading-relaxed relative z-10 my-6">
                {t('WHY_QUOTE')}
              </p>
              <div className="text-xs font-mono tracking-widest text-[#C9A227] uppercase">
                AG Capital Slogan lockup
              </div>
            </div>

            {/* Blocks on right */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8 text-left" id="differentiators-grid">
              <div className="space-y-2">
                <div className="font-mono text-[10px] font-bold text-[#C9A227] tracking-widest">01</div>
                <h4 className="text-base font-semibold text-white">{t('WHY_1_TITLE')}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{t('WHY_1_DESC')}</p>
              </div>
              <div className="space-y-2">
                <div className="font-mono text-[10px] font-bold text-[#C9A227] tracking-widest">02</div>
                <h4 className="text-base font-semibold text-white">{t('WHY_2_TITLE')}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{t('WHY_2_DESC')}</p>
              </div>
              <div className="space-y-2">
                <div className="font-mono text-[10px] font-bold text-[#C9A227] tracking-widest">03</div>
                <h4 className="text-base font-semibold text-white">{t('WHY_3_TITLE')}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{t('WHY_3_DESC')}</p>
              </div>
              <div className="space-y-2">
                <div className="font-mono text-[10px] font-bold text-[#C9A227] tracking-widest">04</div>
                <h4 className="text-base font-semibold text-white">{t('WHY_4_TITLE')}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{t('WHY_4_DESC')}</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 5.5 STRATEGIC ADVISORY COUNSEL SECTION */}
      <section id="strategic-advisory-counsel-section" className="py-12 bg-[#02050A] border-t border-b border-[#C9A227]/10 relative overflow-hidden">
        {/* Subtle decorative gold warm blur glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C9A227]/5 rounded-full filter blur-[120px] pointer-events-none" />
        
        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C9A227] block">
              {isEn ? 'THE SENIOR FOUNDER COUNSEL' : 'HỘI ĐỒNG CỐ VẤN CHIẾN LƯỢC TỐI CAO'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-sans font-medium text-white tracking-tight">
              {isEn ? 'Elite Domain Advisory Board' : 'Hội đồng Cố vấn Ban cố vấn Tối cao'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
              {isEn 
                ? 'We connect ambitious founders directly to proven FMCG operations, cross-border M&A, capital structuring, and pre-IPO regulatory governance strategists.' 
                : 'Chúng tôi liên kết các sáng lập gia tiếp cận trực tiếp mạng lưới tư duy thực chiến về FMCG, cấu trúc dòng vốn, luật hóa vận hành và đàm phán thương vụ.'}
            </p>
          </div>

          {/* Interactive Bento Board Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left selector col: List of Advisors with elegant animations */}
            <div className="lg:col-span-5 space-y-3 flex flex-col" id="counsel-selectors">
              {ADVISORS_DATA.map((adv) => {
                const isSelected = selectedAdvisorId === adv.id;
                return (
                  <motion.div
                    key={adv.id}
                    onClick={() => setSelectedAdvisorId(adv.id)}
                    className={`p-4 rounded border text-left transition-all duration-300 cursor-pointer flex items-center gap-4 relative overflow-hidden ${
                      isSelected 
                        ? 'bg-[#101F35]/40 border-[#C9A227]/60 shadow-[0_4px_24px_rgba(201,162,39,0.06)]' 
                        : 'bg-slate-950/40 border-slate-900 hover:border-[#C9A227]/30 hover:bg-slate-900/20'
                    }`}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    id={`counselor-tab-${adv.id}`}
                  >
                    {/* Active golden border clip bar */}
                    {isSelected && (
                      <motion.div 
                        className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#C9A227] to-[#8A5A00]"
                        layoutId="activeCmsSelector"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}

                    {/* Monogram golden circular badge */}
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center font-serif text-xs font-semibold border shrink-0 transition-all ${
                      isSelected 
                        ? 'bg-gradient-to-br from-[#FFF2AF] via-[#D4AF37] to-[#8A5A00] text-black border-[#C9A227]' 
                        : 'bg-slate-900 text-[#C9A227] border-[#C9A227]/20'
                    }`}>
                      {adv.avatarInitials}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className={`text-sm sm:text-md font-sans font-medium transition-colors ${isSelected ? 'text-[#C9A227]' : 'text-slate-100'}`}>
                        {isEn ? adv.nameEN : adv.nameVI}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-mono tracking-wide mt-0.5 truncate uppercase">
                        {isEn ? adv.roleEN : adv.roleVI}
                      </p>
                      <p className="text-[9px] text-[#C9A227]/70 mt-1 uppercase tracking-wider font-semibold truncate">
                        {isEn ? adv.affiliationEN : adv.affiliationVI}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Right details col: Deep-dive window */}
            <div className="lg:col-span-7 bg-slate-950/70 rounded border border-slate-900 p-6 sm:p-8 text-left min-h-[380px] flex flex-col justify-between relative overflow-hidden shadow-2xl" id="counsel-deepdive-panel">
              {/* Corner branding watermark representation */}
              <div className="absolute right-4 bottom-4 font-serif text-8xl text-slate-900/10 select-none font-bold pointer-events-none">
                AG
              </div>

              {/* AnimatePresence for smooth profile swapping */}
              <AnimatePresence mode="wait">
                {(() => {
                  const activeAdv = ADVISORS_DATA.find(a => a.id === selectedAdvisorId) || ADVISORS_DATA[0];
                  return (
                    <motion.div
                      key={activeAdv.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="space-y-6 flex-1 flex flex-col justify-between"
                      id={`counselor-details-${activeAdv.id}`}
                    >
                      <div className="space-y-4">
                        {/* Domain target badge */}
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#C9A227]/10 border border-[#C9A227]/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227] animate-pulse" />
                          <span className="font-mono text-[9px] text-[#C9A227] tracking-widest uppercase font-semibold">
                            {isEn ? 'CORE ADVISORY POSITION' : 'NỘI DUNG PHỐI HỢP CHIẾN LƯỢC'}
                          </span>
                        </div>

                        {/* Advisor Header details */}
                        <div>
                          <h4 className="text-xl font-sans font-medium text-white tracking-tight">
                            {isEn ? activeAdv.nameEN : activeAdv.nameVI}
                          </h4>
                          <p className="text-xs sm:text-sm text-[#C9A227] font-sans font-medium mt-1 uppercase tracking-wider">
                            {isEn ? activeAdv.roleEN : activeAdv.roleVI}
                          </p>
                        </div>

                        <div className="h-[1px] bg-slate-900 w-full" />

                        {/* Bio paragraph description */}
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                          {isEn ? activeAdv.bioEN : activeAdv.bioVI}
                        </p>

                        <div className="h-[1px] bg-slate-900 w-full" />

                        {/* Action parameters / pillars list */}
                        <div className="space-y-2.5">
                          <span className="block font-mono text-[10px] text-slate-400 uppercase tracking-wider select-none">
                            {isEn ? 'Proven Execution Focus Areas' : 'Chuyên đề Tầm soát Thực chiến'}
                          </span>
                          <div className="flex flex-wrap gap-2 pt-1" id="counselor-skills-cloud">
                            {(isEn ? activeAdv.expertiseEN : activeAdv.expertiseVI).map((exp, idx) => (
                              <span 
                                key={idx} 
                                className="px-2.5 py-1 text-[11px] font-sans rounded bg-[#101F35]/25 border border-slate-900 text-slate-200 hover:border-[#C9A227]/30 transition duration-200"
                              >
                                {exp}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Secured communication indicator row */}
                      <div className="mt-8 pt-4 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-[pulse_2s_infinite]" />
                          <span className="text-[10px] font-mono text-slate-400 tracking-wider">
                            {isEn ? '100% PRIVATE NDA SECURED MANDATES' : 'THÔNG TINĐƯỢC BẢO MẬT TUYỆT ĐỐI THEO NDA'}
                          </span>
                        </div>
                        <button
                          onClick={onBookDiscussionClick}
                          className="px-4 py-2 bg-gradient-to-r from-[#C9A227] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#FFF2AF] text-black font-semibold text-xs tracking-wider uppercase rounded transition-all duration-300 shadow-md cursor-pointer hover:shadow-lg active:scale-95"
                          id="counsel-discuss-button"
                        >
                          {isEn ? 'Request Strategic Advisory Access' : 'Đăng ký Tham vấn Lộ trình'}
                        </button>
                      </div>
                    </motion.div>
                  );
                })()}
              </AnimatePresence>

            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 6. ADVISORY TIMELINE PROCESS */}
      <section id="process-timeline-section" className="py-12 bg-[#02050A] border-y border-[#C9A227]/10">
        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-2 mb-12">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C9A227]">
              {isEn ? 'Execution Framework' : 'Bộ Khung quy trình'}
            </span>
            <h3 className="text-3xl font-sans font-medium text-white tracking-tight">
              {t('PROC_TITLE')}
            </h3>
            <p className="text-sm text-slate-400 max-w-2xl mx-auto">
              {t('PROC_SUBTITLE')}
            </p>
          </div>

          {/* Desktop timeline mapping (Horizontal navigation block inside) */}
          <div className="hidden lg:grid grid-cols-4 xl:grid-cols-8 gap-4 text-left" id="desktop-timeline-block">
            {[
              { step: '01', title: isEn ? 'Deal Intake' : 'Khảo sát Nhu cầu', desc: isEn ? 'Understand capital need & context.' : 'Thấu hiểu nhu cầu và bối cảnh doanh nghiệp.' },
              { step: '02', title: isEn ? 'Screening' : 'Sàng lọc Hồ sơ', desc: isEn ? 'Assess fit and closing feasibility.' : 'Đánh giá sơ bộ sự đồng điệu chiến lược.' },
              { step: '03', title: isEn ? 'Engagement' : 'Xác lập Hợp tác', desc: isEn ? 'Execute NDA and fee scope.' : 'Ký thỏa thuận NDA và thống nhất phạm vi thù lao.' },
              { step: '04', title: isEn ? 'Preparation' : 'Đóng gói Hồ sơ', desc: isEn ? 'Build investor-ready materials.' : 'Xây dựng bộ tài liệu gọi vốn quy chuẩn.' },
              { step: '05', title: isEn ? 'Investor Access' : 'Tiếp cận Nhà đầu tư', desc: isEn ? 'Selective investor mapping.' : 'Kết nối danh sách các quỹ phù hợp.' },
              { step: '06', title: isEn ? 'Due Diligence' : 'Hỗ trợ Rà soát', desc: isEn ? 'Support DD audit reviews.' : 'Hỗ trợ điều phối quá trình thẩm định (DD).' },
              { step: '07', title: isEn ? 'Closing' : 'Đóng Thương vụ', desc: isEn ? 'Coordinate milestone closing.' : 'Hoàn tất các điều khoản và giải ngân vốn.' },
              { step: '08', title: isEn ? 'Beyond Round' : 'Đồng hành sau Gọi vốn', desc: isEn ? 'Long-term value governance.' : 'Nâng tầm quản trị và bồi đắp giá trị dài hạn.' },
            ].map((st, sidx) => (
              <div key={st.step} className="bg-slate-950 p-5 rounded border border-slate-900 flex flex-col justify-between min-h-[170px]" id={`timeline-card-st-${st.step}`}>
                <div>
                  <div className="font-mono text-xs font-bold text-[#C9A227] leading-none mb-3">
                    {st.step}
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-2 leading-tight">
                    {st.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-normal">{st.desc}</p>
                </div>
                {sidx < 7 && (
                  <div className="w-full h-[1px] bg-[#C9A227]/20 mt-4 relative">
                    <span className="absolute -top-[1.5px] right-0 w-1 h-1 rounded-full bg-[#C9A227]" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Stacking Version of process timeline */}
          <div className="lg:hidden flex flex-col gap-3 text-left max-w-sm mx-auto" id="mobile-timeline-block">
            {[
              { step: '01', title: isEn ? 'Deal Intake' : 'Khảo sát Nhu cầu', desc: isEn ? 'Understand the business, capital need & context.' : 'Tìm hiểu bối cảnh doanh nghiệp và nhu cầu nguồn vốn.' },
              { step: '02', title: isEn ? 'Screening' : 'Sàng lọc Hồ sơ', desc: isEn ? 'Assess fit and closing feasibility.' : 'Đánh giá tính khả thi và mức độ sẵn sàng.' },
              { step: '03', title: isEn ? 'Engagement' : 'Xác lập Hợp tác', desc: isEn ? 'Execute bilateral NDA and agree scope.' : 'Ký kết NDA song phương và thống nhất phạm vi dịch vụ.' },
              { step: '04', title: isEn ? 'Preparation' : 'Đóng gói Hồ sơ', desc: isEn ? 'Build investor-ready materials.' : 'Biên soạn Mô hình Tài chính và Bản Thuyết trình gọi vốn.' },
              { step: '05', title: isEn ? 'Investor Access' : 'Tiếp cận Nhà đầu tư', desc: isEn ? 'Selectively approach target funds.' : 'Điều phối tiếp cận danh sách các quỹ đầu tư phù hợp.' },
              { step: '06', title: isEn ? 'Due Diligence' : 'Hỗ trợ Rà soát', desc: isEn ? 'Support DD metrics negotiating.' : 'Đồng hành trong giai đoạn thẩm định pháp lý và tài chính.' },
              { step: '07', title: isEn ? 'Closing' : 'Đóng Thương vụ', desc: isEn ? 'Complete funds disbursement.' : 'Thúc đẩy giải ngân và hoàn tất thương vụ mua bán.' },
              { step: '08', title: isEn ? 'Beyond the Round' : 'Đồng hành sau Gọi vốn', desc: isEn ? 'Post-investment governance.' : 'Thiết lập chuẩn chuẩn mực quản trị hậu đầu tư.' },
            ].map((st) => (
              <div key={st.step} className="p-4 bg-slate-950 border border-slate-900 rounded flex items-start gap-3">
                <span className="font-mono text-sm font-bold text-[#C9A227] leading-none shrink-0 pt-0.5">
                  {st.step}
                </span>
                <div>
                  <h4 className="text-xs font-semibold text-white">{st.title}</h4>
                  <p className="text-[10px] text-slate-400 mt-1">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-xs text-slate-500 italic">
            * {t('PROC_DISCLAIMER_NOTE')}
          </div>
        </ScrollReveal>
      </section>

      {/* 7. ALIGNMENT MODEL */}
      <section id="alignment-model-section" className="py-12 bg-[#000]">
        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-2 mb-16">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C9A227]">
              {isEn ? 'Commitment Alignment' : 'Mô hình liên kết'}
            </span>
            <h3 className="text-3xl font-sans font-medium text-white tracking-tight">
              {t('ALIGN_TITLE')}
            </h3>
            <p className="text-sm text-slate-400 max-w-2xl mx-auto">
              {t('ALIGN_SUBTITLE')}
            </p>
          </div>

          {/* Three Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left" id="alignment-columns-grid">
            {/* Box 1: Retainer */}
            <div className="bg-slate-950 p-8 rounded border border-slate-900 flex flex-col justify-between" id="align-box-retainer">
              <div className="space-y-4">
                <div className="inline-block px-2.5 py-1 rounded bg-[#C9A227]/10 text-xs text-[#C9A227] font-mono tracking-widest uppercase">
                  {t('ALIGN_1_SUB')}
                </div>
                <h4 className="text-lg font-bold text-white tracking-tight leading-none mt-2">
                  {t('ALIGN_1_TITLE')}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed pt-2">
                  {t('ALIGN_1_DESC')}
                </p>
              </div>
            </div>

            {/* Box 2: Success Fee */}
            <div className="bg-slate-950 p-8 rounded border border-slate-900 flex flex-col justify-between" id="align-box-success">
              <div className="space-y-4">
                <div className="inline-block px-2.5 py-1 rounded bg-blue-500/10 text-xs text-blue-400 font-mono tracking-widest uppercase">
                  {t('ALIGN_2_SUB')}
                </div>
                <h4 className="text-lg font-bold text-white tracking-tight leading-none mt-2">
                  {t('ALIGN_2_TITLE')}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed pt-2">
                  {t('ALIGN_2_DESC')}
                </p>
              </div>
            </div>

            {/* Box 3: Fee-into-Equity */}
            <div className="bg-slate-950 p-8 rounded border border-[#C9A227]/20 flex flex-col justify-between relative shadow-[0_5px_25px_rgba(201,162,39,0.02)]" id="align-box-equity">
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#C9A227]" />
              <div className="space-y-4">
                <div className="inline-block px-2.5 py-1 rounded bg-[#C9A227]/20 text-xs text-[#C9A227] font-mono tracking-widest uppercase">
                  {t('ALIGN_3_SUB')}
                </div>
                <h4 className="text-lg font-bold text-white tracking-tight leading-none mt-2">
                  {t('ALIGN_3_TITLE')}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed pt-2">
                  {t('ALIGN_3_DESC')}
                </p>
              </div>
            </div>
          </div>

          <p className="mt-12 text-xs text-slate-500 max-w-3xl mx-auto leading-relaxed border-t border-slate-950 pt-8" id="alignment-footnote-p">
            {t('ALIGN_FOOTNOTE')}
          </p>
        </ScrollReveal>
      </section>

      {/* 8. INTERACTIVE FOUNDER FIT CHECK LIST */}
      <section id="founder-fit-checklist-section" className="py-12 bg-[#02050A] border-y border-slate-950">
        <ScrollReveal className="max-w-4xl mx-auto px-4 " id="interactive-checklist">
          <div className="text-center space-y-2 mb-12">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C9A227]">
              {isEn ? 'Self-Assessment Evaluation' : 'Tự thẩm định Năng lực'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-sans font-medium text-white tracking-tight">
              {t('FIT_TITLE')}
            </h3>
            <p className="text-xs text-slate-400 mt-2">
              {isEn
                ? 'Check the boxes below to evaluate if your transaction profile matches our selective mandate parameters.'
                : 'Đánh chọn các hộp khảo sát bên dưới để khám phá xem hồ sơ hiện tại có khớp hệ sinh thái chuẩn hóa.'}
            </p>
          </div>

          <div className="space-y-3 max-w-2xl mx-auto bg-slate-950 p-6 md:p-8 rounded border border-slate-900 shadow-xl" id="checklist-interactive">
            {checklistQuestions.map((question, qIdx) => {
              const isChecked = !!checklistAnswers[qIdx];
              return (
                <div
                  key={qIdx}
                  onClick={() => toggleChecklistItem(qIdx)}
                  className={`flex items-start gap-4 p-4 rounded border cursor-pointer select-none transition-all duration-300 ${
                    isChecked
                      ? 'border-[#C9A227]/40 bg-[#C9A227]/5'
                      : 'border-slate-900 bg-[#000]/30 hover:border-slate-800'
                  }`}
                  id={`checklist-row-${qIdx}`}
                >
                  <div
                    className={`h-5 w-5 rounded border mt-0.5 shrink-0 flex items-center justify-center transition-all ${
                      isChecked ? 'border-[#C9A227] bg-[#C9A227] text-black' : 'border-slate-700'
                    }`}
                  >
                    {isChecked && <Check size={12} strokeWidth={3} />}
                  </div>
                  <span className={`text-xs sm:text-sm ${isChecked ? 'text-white font-medium' : 'text-slate-400'}`}>
                    {question}
                  </span>
                </div>
              );
            })}

            {/* Diagnostic results tracking block */}
            <div className="pt-6 border-t border-slate-900 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-mono text-[#C9A227]">
                {isEn ? 'Evaluation Parameter Score:' : 'Mức độ tương thích:'} <span className="font-bold text-sm bg-[#C9A227]/10 px-2 py-1 rounded inline-block ml-1">{checkedCount} / 6</span>
              </span>

              <div className="flex gap-3">
                <button
                  onClick={onSubmitDealClick}
                  className="px-4 py-2 bg-[#C9A227] hover:bg-[#D4AF37] text-black font-semibold text-xs rounded transition duration-200"
                >
                  {t('FIT_CTA')}
                </button>
                <button
                  onClick={() => {
                    setActivePage('founders');
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs rounded transition duration-200"
                >
                  {isEn ? 'View Resources' : 'Xem tài nguyên'}
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Testimonials Marquee Component */}
      <Testimonials language={language} />

      {/* 9. ARTICLES PREVIEW SECTION */}
      <section id="insights-preview-homepage" className="py-12 bg-[#000]">
        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-16">
            <div className="space-y-2 text-left">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C9A227]">
                {isEn ? 'Advisory Intelligence' : 'Góc phân tích chuyên môn'}
              </span>
              <h3 className="text-3xl font-sans font-medium text-white tracking-tight">
                {t('INSIGHTS_TITLE')}
              </h3>
            </div>
            <button
              id="view-all-insights-btn"
              onClick={() => {
                setActivePage('insights');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1 text-xs font-mono tracking-widest text-[#C9A227] hover:text-white transition"
            >
              <span>{t('INSIGHTS_CTA')}</span>
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Grids containing top 3 featured articles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="insights-preview-grid">
            {ARTICLES_DB.slice(0, 3).map((article) => (
              <div
                key={article.id}
                id={`article-card-${article.slug}`}
                onClick={() => navigateToArticleInsideHome(article.id)}
                className="group bg-slate-950 border border-slate-900 rounded p-6 cursor-pointer flex flex-col justify-between hover:border-[#C9A227]/40 transition duration-300"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4 text-[10px] font-mono font-medium tracking-wider text-[#C9A227] uppercase">
                    <span>{isEn ? article.categoryEN : article.categoryVI}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-800" />
                    <span className="flex items-center gap-1">
                      <Clock size={10} />
                      {article.readingTime} {t('EST_READING_TIME')}
                    </span>
                  </div>
                  <h4 className="text-md font-semibold text-white group-hover:text-[#C9A227] transition line-clamp-2 leading-snug">
                    {isEn ? article.titleEN : article.titleVI}
                  </h4>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {isEn ? article.excerptEN : article.excerptVI}
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs text-[#C9A227] mt-5 font-semibold group-hover:underline text-left">
                  <span>{t('READ_ARTICLE')}</span>
                  <ChevronRight size={12} className="group-hover:translate-x-0.5 transition" />
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* 9.5 STRATEGIC DOCUMENT DOWNLOAD PORTAL */}
      <DownloadPortal language={language} />

      {/* 9.9 NEWSLETTER SUBSCRIBE COMPONENT */}
      <NewsletterSignup language={language} />

      {/* 10. FINAL HOME CALL TO ACTION */}
      <section id="final-cta-section-banner" className="relative py-14 bg-[#02050A] border-t border-[#C9A227]/10 overflow-hidden">
        {/* Subtle decorative gold light line trail animation element */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C9A227] to-transparent opacity-60" />

        <ScrollReveal className="relative max-w-5xl mx-auto px-4 text-center z-10 space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-medium tracking-tight text-white max-w-3xl mx-auto leading-tight">
            {t('FINAL_CTA_TITLE')}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t('FINAL_CTA_DESC')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4" id="final-cta-buttons">
            <button
              id="final-cta-btn-submit"
              onClick={onSubmitDealClick}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#C9A227] hover:bg-[#D4AF37] text-black font-semibold text-xs tracking-wider uppercase rounded shadow-lg transition duration-200"
            >
              {t('BTN_SUBMIT_DEAL')}
            </button>
            <button
              id="final-cta-btn-book"
              onClick={onBookDiscussionClick}
              className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-white text-white hover:bg-white/5 font-semibold text-xs tracking-wider uppercase rounded transition duration-200"
            >
              {t('BTN_BOOK_DISCUSSION')}
            </button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
