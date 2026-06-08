/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { Language } from '../types';
import { FileDown, CheckCircle, Award, Landmark, Building, Star, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface SuccessStoriesPDFProps {
  language: Language;
}

export default function SuccessStoriesPDF({ language }: SuccessStoriesPDFProps) {
  const isEn = language === 'EN';
  const [isGenerating, setIsGenerating] = useState(false);
  const [showDocPreview, setShowDocPreview] = useState(false);

  const page1Ref = useRef<HTMLDivElement>(null);
  const page2Ref = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    // Explicitly show preview momentarily or let it stay hidden so it compiles/renders
    setShowDocPreview(true);

    try {
      // Small timeout to allow React to mount the divs and render the contents fully
      await new Promise((resolve) => setTimeout(resolve, 500));

      const page1 = page1Ref.current;
      const page2 = page2Ref.current;

      if (!page1 || !page2) {
        throw new Error("PDF page references are missing.");
      }

      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      // Render Page 1 to Canvas
      const canvas1 = await html2canvas(page1, {
        scale: 2, // Higher scale for ultra-crisp texts and graphics
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#FFFFFF',
      });
      const imgData1 = canvas1.toDataURL('image/jpeg', 0.95);
      doc.addImage(imgData1, 'JPEG', 0, 0, 210, 297);

      // Render Page 2 to Canvas
      doc.addPage();
      const canvas2 = await html2canvas(page2, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#FFFFFF',
      });
      const imgData2 = canvas2.toDataURL('image/jpeg', 0.95);
      doc.addImage(imgData2, 'JPEG', 0, 0, 210, 297);

      // Save file dynamically
      const filename = isEn 
        ? "AG_Capital_Advisory_Success_Stories.pdf" 
        : "AG_Capital_Advisory_Ho_So_Thanh_Cong.pdf";
      doc.save(filename);

    } catch (error) {
      console.error("Failed to generate PDF:", error);
    } finally {
      setIsGenerating(false);
      setShowDocPreview(false);
    }
  };

  // Testimonials matching Testimonials.tsx list
  const testimonials = [
    {
      company: "GreenLogistics Indochina",
      author: "Pham Tien Thanh",
      role: isEn ? "Co-Founder & CEO" : "Đồng sáng lập & CEO",
      quote: isEn 
        ? "AG Capital Advisory was key to structuring our Series A and reorganizing our corporate governance. Beyond the capital, we gained real operational clarity."
        : "AG Capital Advisory là chìa khóa giúp chúng tôi tái cấu trúc dòng vốn Series A và chuẩn hóa Quản trị doanh nghiệp. Không chỉ dừng lại ở bài toán vốn, chúng tôi gặt hái được sự tường tỏ trong bài toán vận hành.",
      metric: "+35% EBITDA",
      metricLabel: isEn ? "Internal Efficiency" : "Hiệu năng vận hành"
    },
    {
      company: "Hera Beauty & Retail",
      author: "Linh Dan",
      role: isEn ? "CEO & Founder" : "CEO & Sáng lập viên",
      quote: isEn 
        ? "Their unique fee-into-equity structure meant they had their skin in the game. AG worked like an internal partner, transforming our retail unit economics."
        : "Cơ chế phí đổi cổ phần độc bản của họ chứng minh sự cam kết sâu sắc cùng lợi ích nhà sáng lập. AG đồng hành như cộng sự nội bộ, chuyển đổi triệt để hiệu suất tài chính chuỗi bán lẻ.",
      metric: "12.5M USD",
      metricLabel: isEn ? "JV Value Locked" : "Bảo chứng liên doanh"
    },
    {
      company: "Highlands Green Coffee",
      author: "Quoc Anh",
      role: isEn ? "Founder & Chairman" : "Sáng lập & Chủ tịch",
      quote: isEn 
        ? "When we were negotiating our strategic joint venture with our foreign partner, AG set up a bullet-proof shareholder framework. Highly recommended."
        : "Khi chúng tôi đàm phán liên doanh chiến lược với đối tác ngoại, AG đã thiết lập một thỏa ước cổ đông chặt chẽ vượt ngoài mong đợi. Đơn vị cố vấn cực kỳ đáng tin cậy.",
      metric: "Zero Risk",
      metricLabel: isEn ? "Dilution Protection" : "Bảo hộ chống pha loãng"
    },
    {
      company: "An Nam Consumer Group",
      author: "Tran Quoc Dung",
      role: isEn ? "Deputy General Director" : "Phó Tổng Giám đốc",
      quote: isEn 
        ? "A breath of fresh air in investment banking. Real FMCG and retail operators who understand balance sheet cleanups and audit preparation."
        : "Lời giải thực sự đột phá thay thế ngân hàng đầu tư truyền thống. Đội ngũ vừa am tường tài chính vừa thông thạo vận hành chuỗi và hàng tiêu dùng.",
      metric: "Series A",
      metricLabel: isEn ? "Funding Cleared" : "Gọi vốn thành công"
    },
    {
      company: "The Coffee Box",
      author: "Nguyen Huong Ly",
      role: isEn ? "Director of Expansion" : "Giám đốc Phát triển",
      quote: isEn 
        ? "AG's guidance on franchise legal architecture and SHA terms saved us from high-risk dilution during expansion phases."
        : "Sự hỗ trợ kỹ lưỡng của AG về pháp lý nhượng quyền và SHA đã giữ chúng tôi an toàn trước nguy cơ pha loãng tài sản trí tuệ trong giai đoạn mở rộng thần tốc.",
      metric: "40+ Outlets",
      metricLabel: isEn ? "Optimized Chain" : "Chuỗi cửa hàng tối ưu"
    }
  ];

  const logos = [
    { name: "VIETORGANIC FMCG", sub: "Consumer Food" },
    { name: "HERA BEAUTY", sub: "Retail & Spa" },
    { name: "THE COFFEE BOX", sub: "Beverage Chain" },
    { name: "RED PAN F&B", sub: "Restaurant Group" },
    { name: "GREENLOGISTICS", sub: "Ecological Supply Chain" },
    { name: "AN NAM CONSUMER", sub: "Manufacture & Trade" },
    { name: "VNDISTRI NETWORK", sub: "Distribution" },
    { name: "SAIGON GOURMET", sub: "Premium Imports" }
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Trigger Button with stunning high-end design */}
      <motion.button
        id="btn-download-pdf-success"
        onClick={generatePDF}
        disabled={isGenerating}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative group inline-flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-[#C9A227] to-[#B08D20] text-slate-950 font-bold text-xs uppercase tracking-wider rounded transition-all duration-300 shadow-[0_4px_25px_rgba(201,162,39,0.2)] hover:shadow-[0_4px_30px_rgba(201,162,39,0.35)] cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed"
      >
        {isGenerating ? (
          <>
            <Loader2 size={16} className="animate-spin text-slate-950" />
            <span>
              {isEn ? "Compiling Executive PDF..." : "Đang chuẩn bị hồ sơ PDF..."}
            </span>
          </>
        ) : (
          <>
            <FileDown size={16} className="text-slate-950 transition-transform duration-300 group-hover:translate-y-0.5" />
            <span>
              {isEn ? "Download Success Stories PDF" : "Tải Báo Cáo Thành Công (PDF)"}
            </span>
          </>
        )}
      </motion.button>
      
      <p className="text-[10px] text-slate-500 mt-2.5 font-mono italic">
        {isEn 
          ? "*Generates an official 2-page localized executive summary document." 
          : "*Tạo tự động văn bản tóm tắt hồ sơ năng lực 2 trang song ngữ chuẩn định chế."}
      </p>

      {/* RENDER CONTAINER FOR CANVAS PRE-FLIGHT (Only rendered on DOM off-screen or conditionally managed) */}
      <div 
        id="pdf-pages-pre-render-container"
        className="absolute left-[-9999px] top-[-9999px]"
        style={{ pointerEvents: 'none' }}
      >
        {/* PAGE 1 TEMPLATE */}
        <div 
          ref={page1Ref}
          className="w-[794px] h-[1123px] bg-white p-[45px] flex flex-col justify-between font-sans text-slate-900 border-[1.5px] border-amber-950/20 relative"
          style={{ boxSizing: 'border-box' }}
        >
          {/* Subtle design header rules */}
          <div className="absolute top-0 left-0 right-0 h-[4px] bg-[#C9A227]" />
          
          <div className="space-y-6">
            {/* Header section (Letterhead) */}
            <div className="flex justify-between items-start border-b-[1.5px] border-slate-200 pb-5">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#C9A227] font-semibold block mb-1">
                  OFFICIAL ADVISORY DOSSIER
                </span>
                <span className="text-lg font-serif font-bold tracking-wider text-slate-950 block">
                  AG CAPITAL ADVISORY
                </span>
                <span className="text-[10px] text-slate-500 block font-mono">
                  Structured Capital &bull; Governance Excellence
                </span>
              </div>
              <div className="text-right border-l border-slate-200 pl-4 font-mono text-[9px] text-slate-500 space-y-1">
                <div>DOC REF: <strong className="text-slate-900">AG-REF-2026-SS</strong></div>
                <div>CLASSIFICATION: <strong className="text-red-700">CONFIDENTIAL</strong></div>
                <div>DATE: <strong className="text-slate-900">JUNE 2026</strong></div>
              </div>
            </div>

            {/* Document Title Section */}
            <div className="text-center pt-4 pb-2 space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-950/5 border border-amber-800/10 rounded-full text-[9px] font-mono uppercase tracking-wider text-[#B08D20] font-semibold">
                <Award size={10} />
                {isEn ? "PORTFOLIO HIGHLIGHTS" : "DANH MỤC KHÁCH HÀNG NỔI BẬT"}
              </span>
              <h1 className="text-[22px] font-serif font-bold text-slate-950 uppercase tracking-tight leading-snug">
                {isEn 
                  ? "Executive Summary: Success Stories & Strategic Outcomes" 
                  : "Hồ Sơ Năng Lực Sơ Bộ: Tóm Tắt Minh Chứng Thành Công Được Bảo Chứng"}
              </h1>
              <p className="text-xs text-slate-500 max-w-xl mx-auto leading-relaxed">
                {isEn 
                  ? "A rigorous overview of strategic transactions, capital restructurings, and institutional-grade corporate governance frameworks deployed with Vietnam's growth-stage leaders."
                  : "Văn bản thống kê sơ bộ các thương vụ tư vấn, tái định vị dòng vốn và hoàn thiện các chỉ số quản trị doanh nghiệp cho các thương hiệu hàng tiêu dùng, dịch vụ và bán lẻ tiêu biểu tại Việt Nam."}
              </p>
            </div>

            {/* Decorative dual line divider */}
            <div className="flex items-center justify-center gap-1">
              <div className="h-[1px] bg-slate-300 flex-grow" />
              <div className="h-[4px] w-[4px] bg-[#C9A227] rounded-full" />
              <div className="h-[1px] bg-slate-300 flex-grow" />
            </div>

            {/* Stories List (Page 1 gets the first 3 Case Studies) */}
            <div className="space-y-6 pt-2">
              {testimonials.slice(0, 3).map((item, index) => (
                <div 
                  key={`pdf-s1-${index}`}
                  className="bg-slate-50 border border-slate-100 rounded-lg p-5 flex gap-4 relative overflow-hidden"
                >
                  {/* Performance highlight bar */}
                  <div className="absolute top-0 bottom-0 left-0 w-[4px] bg-[#C9A227]" />
                  
                  {/* Left stats panel */}
                  <div className="w-[155px] shrink-0 border-r border-slate-200/80 pr-4 flex flex-col justify-between">
                    <div>
                      <span className="text-[8px] font-mono tracking-widest text-[#B08D20] font-bold block uppercase mb-1">
                        KEY DELIVERED METRIC
                      </span>
                      <span className="text-[20px] font-mono font-bold text-[#C9A227] tracking-tight block">
                        {item.metric}
                      </span>
                      <span className="text-[9px] font-mono text-slate-500 block leading-tight uppercase font-medium">
                        {item.metricLabel}
                      </span>
                    </div>

                    <div className="pt-4">
                      <span className="text-[8px] font-mono text-slate-400 block uppercase font-medium">
                        CASE STUDY {index + 1}
                      </span>
                      <span className="text-xs font-bold text-slate-900 block truncate mt-0.5" style={{ maxWidth: '140px' }}>
                        {item.company}
                      </span>
                    </div>
                  </div>

                  {/* Quote & Author panel */}
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <p className="text-[11px] leading-relaxed text-slate-700 italic pr-2 font-serif">
                        "{item.quote}"
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pt-3 mt-3 border-t border-slate-200/50">
                      <span className="text-[9px] font-mono bg-indigo-950/5 text-indigo-950 px-1.5 py-0.5 rounded font-bold">
                        {isEn ? "VERIFIED FOUNDER" : "XÁC THỰC SÁNG LẬP"}
                      </span>
                      <div className="text-[9.5px]">
                        <strong className="text-slate-950">{item.author}</strong>
                        <span className="text-slate-400 font-mono"> &bull; </span>
                        <span className="text-slate-500 font-mono">{item.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Section */}
          <div className="border-t border-slate-200 pt-3.5 flex justify-between items-center text-[9px] text-slate-400 font-mono">
            <div>
              <span>AG CAPITAL ADVISORY &bull; CONFIDENTIAL DOSSIER</span>
            </div>
            <div className="flex gap-4">
              <span>{isEn ? "PAGE 1 OF 2" : "TRANG 1 TRÊN 2"}</span>
              <span>www.agcapital.vn</span>
            </div>
          </div>
        </div>

        {/* PAGE 2 TEMPLATE */}
        <div 
          ref={page2Ref}
          className="w-[794px] h-[1123px] bg-white p-[45px] flex flex-col justify-between font-sans text-slate-900 border-[1.5px] border-amber-950/20 relative"
          style={{ boxSizing: 'border-box' }}
        >
          {/* Subtle design header rules */}
          <div className="absolute top-0 left-0 right-0 h-[4px] bg-slate-900" />

          <div className="space-y-6">
            {/* Header section */}
            <div className="flex justify-between items-start border-b-[1.5px] border-slate-200 pb-5">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#C9A227] font-semibold block mb-1">
                  OFFICIAL ADVISORY DOSSIER
                </span>
                <span className="text-lg font-serif font-bold tracking-wider text-slate-950 block">
                  AG CAPITAL ADVISORY
                </span>
                <span className="text-[10px] text-slate-500 block font-mono">
                  Structured Capital &bull; Governance Excellence
                </span>
              </div>
              <div className="text-right border-l border-slate-200 pl-4 font-mono text-[9px] text-slate-500 space-y-1">
                <div>DOC REF: <strong className="text-slate-900">AG-REF-2026-SS</strong></div>
                <div>CLASSIFICATION: <strong className="text-red-700">CONFIDENTIAL</strong></div>
                <div>DATE: <strong className="text-slate-900">JUNE 2026</strong></div>
              </div>
            </div>

            {/* Continuing Stories List (Remaining 2 Case Studies) */}
            <div className="space-y-6 pt-2">
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500 font-bold mb-3 flex items-center gap-2">
                <Building size={12} className="text-[#C9A227]" />
                {isEn ? "Continuing Active Case Insights" : "Các Chỉ Số Thực Nghiệm Tiếp Theo"}
              </h3>
              
              {testimonials.slice(3).map((item, index) => (
                <div 
                  key={`pdf-s2-${index}`}
                  className="bg-slate-50 border border-slate-100 rounded-lg p-5 flex gap-4 relative overflow-hidden"
                >
                  {/* Performance highlight bar */}
                  <div className="absolute top-0 bottom-0 left-0 w-[4px] bg-[#C9A227]" />
                  
                  {/* Left stats panel */}
                  <div className="w-[155px] shrink-0 border-r border-slate-200/80 pr-4 flex flex-col justify-between">
                    <div>
                      <span className="text-[8px] font-mono tracking-widest text-[#B08D20] font-bold block uppercase mb-1">
                        KEY DELIVERED METRIC
                      </span>
                      <span className="text-[20px] font-mono font-bold text-[#C9A227] tracking-tight block">
                        {item.metric}
                      </span>
                      <span className="text-[9px] font-mono text-slate-500 block leading-tight uppercase font-medium">
                        {item.metricLabel}
                      </span>
                    </div>

                    <div className="pt-4">
                      <span className="text-[8px] font-mono text-slate-400 block uppercase font-medium">
                        CASE STUDY {index + 4}
                      </span>
                      <span className="text-xs font-bold text-slate-900 block truncate mt-0.5" style={{ maxWidth: '140px' }}>
                        {item.company}
                      </span>
                    </div>
                  </div>

                  {/* Quote & Author panel */}
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <p className="text-[11px] leading-relaxed text-slate-700 italic pr-2 font-serif">
                        "{item.quote}"
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pt-3 mt-3 border-t border-slate-200/50">
                      <span className="text-[9px] font-mono bg-indigo-950/5 text-indigo-950 px-1.5 py-0.5 rounded font-bold">
                        {isEn ? "VERIFIED FOUNDER" : "XÁC THỰC SÁNG LẬP"}
                      </span>
                      <div className="text-[9.5px]">
                        <strong className="text-slate-950">{item.author}</strong>
                        <span className="text-slate-400 font-mono"> &bull; </span>
                        <span className="text-slate-500 font-mono">{item.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Structured Partner Ecosystem / Client Verticals */}
            <div className="bg-slate-50/50 border border-slate-100 rounded-lg p-5 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500 font-bold flex items-center gap-1.5 border-b border-slate-200/80 pb-2">
                <Landmark size={12} className="text-[#C9A227]" />
                {isEn ? "Growth Ecosystem Representation" : "Hệ Sinh Thái Đối Tác Tăng Trưởng"}
              </h3>
              
              <div className="grid grid-cols-4 gap-3">
                {logos.map((logo, idx) => (
                  <div 
                    key={`pdf-logo-${idx}`}
                    className="p-2 border border-slate-150 rounded bg-white text-center flex flex-col justify-center min-h-[50px]"
                  >
                    <span className="font-mono text-[8.5px] font-bold text-slate-950 tracking-wider block truncate">
                      {logo.name}
                    </span>
                    <span className="text-[7px] text-slate-500 font-mono block uppercase mt-0.5 truncate">
                      {logo.sub}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Closing / Executive Note */}
            <div className="border border-slate-150 rounded-lg p-5 bg-stone-50 space-y-3">
              <h4 className="text-[11px] font-mono uppercase tracking-widest text-slate-800 font-bold flex items-center gap-1">
                <span className="h-1.5 w-1.5 bg-[#C9A227] rounded-full" />
                {isEn ? "Advisory Philosophy: Aligning Skin-in-the-Game" : "Bản Thuyết Nhật: Cơ Chế Sát Cánh Song Phương"}
              </h4>
              <p className="text-[10px] leading-relaxed text-slate-600">
                {isEn 
                  ? "At AG Capital Advisory, we do not believe in superficial reports or brokerage fees. By integrating a dynamic 'fee-into-equity' alignment choice for up to 50% of the advisory mandate, we solidify our partnership as a true internal ally. We protect Viet founders from predatory terms, restructure unit economics to support bulletproof scalable models, and implement strict governance standards required for clean capital clearance and sustainable valuation multi-baggers."
                  : "Tại AG Capital Advisory, chúng tôi không hỗ trợ các báo cáo hời hợt hoặc phí môi giới ngắn hạn thuần túy. Bằng việc áp dụng cơ chế hoán đổi và tích hợp thù lao thành vốn (fee-into-equity) lên tới 50% tổng thù lao tư vấn, chúng tôi tự biến mình thành đối tác chiến lược thực chất của nhà sáng lập. AG hỗ trợ thiết lập hệ thống phòng vệ, làm rõ cấu trúc tài chính, tái cấu trúc kinh tế đơn vị và tinh gọn các chỉ số quản trị cốt lõi, bảo chứng khả năng gọi vốn và bảo lưu quyền lực kiểm soát."}
              </p>
            </div>

            {/* Official Seal Mock Representation */}
            <div className="flex justify-between items-center pt-2 font-mono text-[8px] text-slate-400">
              <p className="max-w-md italic leading-normal">
                {isEn 
                  ? "*Dossier content is compiled from verified advisory performance. Shared strictly with mutual confidentiality standards." 
                  : "*Hồ sơ năng lực thực nghiệm được biên soạn từ kết quả kiểm chứng hoạt động. Các dữ liệu được bảo lưu theo điều khoản bảo mật song phương (NDA)."}
              </p>
              
              <div className="border border-slate-300 px-3 py-1 bg-white text-[#C9A227] font-bold uppercase rounded tracking-wider flex items-center gap-1 text-[7px]">
                <CheckCircle size={8} />
                <span>OFFICIAL DOSSIER RELEASE</span>
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="border-t border-slate-200 pt-3.5 flex justify-between items-center text-[9px] text-slate-400 font-mono">
            <div>
              <span>AG CAPITAL ADVISORY &bull; CONFIDENTIAL DOSSIER</span>
            </div>
            <div className="flex gap-4">
              <span>{isEn ? "PAGE 2 OF 2" : "TRANG 2 TRÊN 2"}</span>
              <span>www.agcapital.vn</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
