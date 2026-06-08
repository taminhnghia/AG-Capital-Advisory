/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Download, FileText, CheckCircle, Loader2 } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface ResourceItem {
  id: string;
  filename: string;
  titleEN: string;
  titleVI: string;
  type: 'PDF' | 'TXT' | 'DOC';
  size: string;
  descEN: string;
  descVI: string;
  content: string;
}

const RESOURCES: ResourceItem[] = [
  {
    id: 'res-credentials',
    filename: 'AG_Capital_Partner_Credentials.txt',
    type: 'PDF',
    size: '1.2 MB',
    titleEN: 'AG Capital Advisory — Corporate Credentials & Services Brochure',
    titleVI: 'Hồ Sơ Năng Lực & Bản Giới Thiệu Dịch Vụ Cố Vấn — AG Capital',
    descEN: 'An in-depth framework outlining our private investment strategies, joint ventures, and capital growth pathways.',
    descVI: 'Bản giới thiệu chi tiết bộ giải pháp cố vấn vốn, hoạch định cơ cấu tài chính và định hướng phát triển tối ưu giá trị.',
    content: `========================================================================
                     AG CAPITAL ADVISORY CO., LTD
           Corporate Advisory Credentials & Services Brochure
               "Beyond the Round, Refining Value Since 2026"
========================================================================

Managed under the trusted AG Invest Ecosystem, AG Capital is Southeast Asia's
pioneering boutique advisory provider specializing strictly in High-Growth
Consumer, Retail, FMCG, and Technology Enterprises.

We prepare founders with structural discipline, ensuring institutional quality
well before the round opens.

------------------------------------------------------------------------
1. CORE MANDATE ADVISORY SERVICES:
------------------------------------------------------------------------
- Fundraising Strategy (Seed to Series B dilution minimization schemes)
- Growth Equity Advisory (Series C preferred terms and liquidation tiers)
- Strategic M&A Advisory (Buy-side mandates and sell-side exits)
- Corporate Governance Optimization (Cap table cleanups and board RACI metrics)
- Investor-Ready Intelligence (Financial models, Teasers, and secure Data Rooms)

------------------------------------------------------------------------
2. THE ALIGNMENT FORMULA (Fee-to-Equity conversion):
------------------------------------------------------------------------
Unlike traditional brokers, AG Capital offers founders a dual success model:
We convert up to 50% of the milestone performance fees into Equity of your
enterprise. This commits us as active, physical long-term guardians of
your scaling stability and corporate expansion.

------------------------------------------------------------------------
CONTACT & CLIENT INTAKE REGISTRATION:
To initiate a secure, strictly confidential discussion, visit our Deal
Submission Room at: https://ai.studio/build
Or email: private-deals@agcapital.advisory
========================================================================`
  },
  {
    id: 'res-governance',
    filename: 'AG_Capital_Governance_Readiness_Checklist.txt',
    type: 'DOC',
    size: '840 KB',
    titleEN: 'Institutional Audit — Pre-Fundraising Governance Checklist',
    titleVI: 'Khung Kiểm Soát Thể Chế — Bộ Tiêu Chí Đánh Giá Quản Trị Trước Gọi Vốn',
    descEN: '6 essential operational parameters consumer startups must standardize to pass institutional due diligence.',
    descVI: '6 chỉ tiêu cốt lõi doanh nghiệp cần chuẩn hóa để thuận lợi vượt qua khâu thẩm định chi tiết (Due Diligence) của các định chế ngoại.',
    content: `========================================================================
                     AG CAPITAL ADVISORY CO., LTD
        Pre-Fundraising Strategic Institutional Governance Checklist
========================================================================

This advisory resource details the strict checklist points that institutional
investment committees analyze during strict Technical & Regulatory Due Diligence.

Standardize these 6 dimensions to avoid deal cancellation and ensure valuation premiums:

[ ] 1. LIQUIDITY & CAP TABLE SANITIZATION
    - Guarantee there are no informal "handshake" equity promises.
    - All option agreements (ESOPs) are documented officially with a solid pool limit.
    - Limit the number of retail minority angel investors to prevent signing bottlenecks.

[ ] 2. CORPORATE TAX & FINANCIAL TRANSPARENCY
    - Transition all corporate financial books to national/international audit standards (VAS/IFRS).
    - Clear division between personal finances/assets of the founders and corporate entities.
    - Resolve outstanding tax declarations and customs duties early.

[ ] 3. CLEAR DEPUTIZATION & RACI MATRIX
    - Establish a formal executive committee.
    - Formalize operational decision levels: "Who proposes, who consents, who has veto".
    - Avoid founder-centric micro-approvals for day-to-day transactional accounting.

[ ] 4. INTELLECTUAL PROPERTY & TRADEMARK RECOVERY
    - Ensure all proprietary brand logos, domain names, formulas, and patents are
      explicitly registered under the name of the recipient corporate entity.
    - Execute formal IP assignments for all developers and creators.

[ ] 5. UNIT ECONOMICS AND EBITDA ACCURACY
    - Map down precise multi-channel distribution costs, logistics percentages, and discounts.
    - Segregate operational marketing costs from baseline administrative overhead.

[ ] 6. SHAREHOLDER REGULATIVE CONVENTIONS (SHA)
    - Draft clean draft clauses governing future board composition, voting thresholds,
      and Tag-Along / Drag-Along protective covenants.

Need an active board assessment audit? Connect with us via the secure portal.
========================================================================`
  },
  {
    id: 'res-alignment',
    filename: 'AG_Capital_Alignment_Model_Framework.txt',
    type: 'TXT',
    size: '410 KB',
    titleEN: 'Partnership Alignment Framework & Term Sheet Guardrails',
    titleVI: 'Mô Hình Đồng Hành Gắn Kết & Cơ Chế Chuyển Phí Dịch Vụ Thành Cổ Phần',
    descEN: 'Technical parameters explaining our dynamic success fee conversion into target company shares.',
    descVI: 'Chi tiết thông số kỹ thuật và điều khoản hợp tác chuyển đổi phí tư vấn giao dịch thành cổ phần đồng hành (Fee-into-Equity).',
    content: `========================================================================
                     AG CAPITAL ADVISORY CO., LTD
         The Fee-Into-Equity Partnership Alignment Model Guide
========================================================================

Traditional advisors seek fast, fee-driven transactional liquidity, generating
misaligned incentive directions during negotiations.

AG Capital aligns our partners directly with founders using standard modern convertible mechanisms:

1. THE SEED-TO-SERIES-B ACCENTUATION:
   - Success-based transaction fees represent between 2% - 4% of total equity closed.
   - At the founder's discretion, up to 50% of this cash fee is converted into common 
     equity shares at a 15% discount relative to the institutional round pricing.

2. FOUNDER CONTROL DEFENSE GUARANTEES:
   - All converted shares held by AG Capital explicitly grant permanent proxy 
     voting authority back to the lead founders.
   - We enter pre-emptive lock-up covenants (matching or exceeding institutional 
     investors) ensuring we share long-term equity growth together.

3. THE INTELLECTUAL COUNSEL COVENANT:
   - By converting fees into equity, AG Capital maintains a physical, long-term
     Board Observer seat.
   - We provide permanent quarterly cap table reviews, helping prevent downstream
     dilution traps in Series C or regional joint-ventures.

Review this framework with your co-founders. Contact us to design a custom schedule.
========================================================================`
  }
];

export default function DownloadPortal({ language }: { language: 'EN' | 'VI' }) {
  const isEn = language === 'EN';
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [completedId, setCompletedId] = useState<string | null>(null);

  const triggerDownload = (resource: ResourceItem) => {
    setDownloadingId(resource.id);
    
    // Simulate professional server compilation / verification delay
    setTimeout(() => {
      try {
        const blob = new Blob([resource.content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = resource.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        setCompletedId(resource.id);
        setTimeout(() => setCompletedId(null), 3000); // Clear completed indicator after 3s
      } catch (err) {
        console.error('Blob generation failed:', err);
      } finally {
        setDownloadingId(null);
      }
    }, 1200);
  };

  return (
    <section 
      className="py-16 bg-[#000] border-t border-slate-900" 
      id="resource-downloads-portal"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center space-y-4 mb-16">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C9A227] font-bold">
            {isEn ? 'KNOWLEDGE COMPILATION & RESOURCES' : 'HỆ THỐNG TÀI LIỆU CHUYÊN SÂU'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-sans font-medium tracking-tight text-white max-w-2xl mx-auto leading-tight">
            {isEn 
              ? 'Download Strategic Capital Resources' 
              : 'Tải Xuống Bộ Tài Liệu Định Chế Doanh Nghiệp'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto font-sans leading-relaxed">
            {isEn
              ? 'Access real transactional checklists, operational governance rules, and company credentials curated by our advisory partners.'
              : 'Trực tiếp tải về bộ cẩm nang kiểm soát, tài liệu chuẩn bị gọi vốn chuẩn định chế được đúc kết từ thực chiến.'}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="downloads-portal-resources-grid">
          {RESOURCES.map((res) => {
            const isDownloading = downloadingId === res.id;
            const isCompleted = completedId === res.id;

            return (
              <div
                key={res.id}
                className="group relative bg-[#02050A] border border-slate-900 rounded-lg p-6 sm:p-8 flex flex-col justify-between hover:border-[#C9A227]/30 transition-all duration-300 shadow-lg"
                id={res.id}
              >
                {/* Visual file tag on the upper corner */}
                <span className="absolute top-4 right-4 font-mono text-[9px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[#C9A227] font-bold">
                  {res.type} / {res.size}
                </span>

                <div className="space-y-4">
                  <div className="p-3 bg-[#C9A227]/5 border border-[#C9A227]/10 rounded-full inline-block">
                    <FileText className="text-[#C9A227]" size={22} />
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm sm:text-base font-semibold text-white tracking-tight leading-snug font-sans group-hover:text-[#C9A227] transition-colors">
                      {isEn ? res.titleEN : res.titleVI}
                    </h4>
                    <p className="text-xs text-slate-400 font-sans leading-relaxed">
                      {isEn ? res.descEN : res.descVI}
                    </p>
                  </div>
                </div>

                {/* Inline Action Button for downloading */}
                <div className="pt-6 mt-6 border-t border-slate-900/60">
                  <button
                    onClick={() => triggerDownload(res)}
                    disabled={isDownloading}
                    className={`w-full py-2.5 px-4 rounded text-xs font-semibold font-mono tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      isCompleted
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : isDownloading
                        ? 'bg-[#C9A227]/10 text-slate-400 border border-[#C9A227]/20'
                        : 'bg-slate-950 text-[#C9A227] border border-[#C9A227]/25 hover:bg-[#C9A227] hover:text-black hover:border-[#C9A227]'
                    }`}
                    id={`download-btn-${res.id}`}
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle size={14} className="stroke-[2.5px]" />
                        <span>{isEn ? 'COMPLETED' : 'ĐÃ TẢI XUỐNG'}</span>
                      </>
                    ) : isDownloading ? (
                      <>
                        <Loader2 size={14} className="animate-spin text-[#C9A227]" />
                        <span>{isEn ? 'COMPILING RESOURCE...' : 'ĐANG KHỞI TẠO TÊN FILE...'}</span>
                      </>
                    ) : (
                      <>
                        <Download size={14} />
                        <span>{isEn ? 'DOWNLOAD DOCUMENT' : 'TẢI TÀI LIỆU RÒNG'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
