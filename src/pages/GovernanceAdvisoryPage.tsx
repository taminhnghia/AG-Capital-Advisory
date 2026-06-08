/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PageId, Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { GovernanceScorecard } from '../components/LeadForms';
import { ShieldCheck, Server, Key, AlertTriangle, FileText, CheckSquare, HelpCircle } from 'lucide-react';

interface GovernanceAdvisoryPageProps {
  language: Language;
  setActivePage: (page: PageId) => void;
  onBookDiscussionClick: () => void;
}

export default function GovernanceAdvisoryPage({
  language,
  setActivePage,
  onBookDiscussionClick,
}: GovernanceAdvisoryPageProps) {
  const t = (key: string) => TRANSLATIONS[language][key] || key;
  const isEn = language === 'EN';

  return (
    <div className="flex flex-col min-h-screen bg-[#02050A]" id="corporate-governance-page">
      {/* Hero Header */}
      <section className="relative pt-36 pb-10 bg-gradient-to-b from-[#101F35]/30 to-transparent border-b border-slate-900" id="governance-hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C9A227] block mb-3">
            {isEn ? 'GOVERNANCE FIRST' : 'QUẢN TRỊ TRỌNG TÂM'}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-medium tracking-tight text-white max-w-4xl leading-tight font-sans">
            {isEn ? 'Good Capital Begins With Good Governance' : 'Nguồn vốn Tốt bắt đầu từ Nền Quản trị tốt'}
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-4 max-w-2xl leading-relaxed">
            {isEn
              ? 'We help growth-stage consumer businesses establish the governance foundations required to receive capital, work with investors and scale with greater discipline.'
              : 'Chúng tôi hỗ trợ các doanh nghiệp tiêu dùng trong giai đoạn tăng trưởng xây dựng nền tảng quản trị vững chắc, tạo lập hành lang an toàn khi đón nhận dòng vốn và tối ưu hóa lợi ích giữa các bên.'}
          </p>
        </div>
      </section>

      {/* 9.1 Why Governance Matters Before Capital */}
      <section className="py-10 bg-[#000]" id="governance-explanation">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-2xl font-bold font-sans text-white tracking-tight">
            {isEn ? 'Establishing Structure Before Dilution' : 'Xây dựng Thể chế Quản trị trước khi Pha loãng'}
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            {isEn
              ? 'Capital alone does not sustain scale. Large funding rounds poured into unstructured organizations often accelerate operational inefficiencies. Investors look for clarity, accountability, and reporting discipline during active due diligence. Setting these frameworks early secures transactional traction and defends your valuation.'
              : 'Chỉ riêng nguồn vốn không thể tạo nên sự phát triển bền vững. Dòng vốn đầu tư lớn khi đổ vào một hệ thống vận hành thiếu cấu trúc thường làm gia tăng sự lãng phí và kém hiệu quả. Trong quá trình thẩm định (due diligence) của các quỹ lớn, sự rõ ràng trong cơ chế vận hành, năng lực báo cáo tài chính và cấu trúc quyền sở hữu mới là những thước đo cốt lõi bảo vệ định giá doanh nghiệp.'}
          </p>
        </div>
      </section>

      {/* 9.2 Common Challenges (5 cards) */}
      <section className="py-10 bg-[#02050A] border-y border-slate-900 shadow-inner" id="governance-challenges">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C9A227]">
              {isEn ? 'Pain points' : 'Những mắt xích yếu'}
            </span>
            <h3 className="text-2xl font-sans text-white tracking-tight mt-2">
              {isEn ? 'Common Governance Bottlenecks' : 'Rào cản Quản trị Thường thấy'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-left" id="common-challenges-grid">
            {[
              {
                title: isEn ? 'Founder dependency' : 'Vận hành tập quyền CEO',
                desc: isEn
                  ? 'Decisions made at the speed of instinct without formal governance procedures.'
                  : 'Quyết định dựa trên cảm tính cá nhân, thiếu quy trình phê chuẩn và phân tầng thẩm quyền rõ ràng.',
              },
              {
                title: isEn ? 'Unclear ownership' : 'Sở hữu không rõ ràng',
                desc: isEn
                  ? 'Verbal commitments, unformalized proxy desks, and silent holdings.'
                  : 'Cam kết bằng lời nói, các thỏa thuận ủy quyền chưa được pháp lý hóa hoặc cơ cấu cổ đông ẩn.',
              },
              {
                title: isEn ? 'Inconsistent reporting' : 'Báo cáo trễ nải',
                desc: isEn
                  ? 'Accounting structures that fail to deliver reliable, fast management packs.'
                  : 'Hệ thống kế toán chưa hoàn thiện, không cung cấp kịp thời các báo cáo quản trị định kỳ đáng tin cậy.',
              },
              {
                title: isEn ? 'Limited readiness' : 'Thiếu chuẩn bị DD',
                desc: isEn
                  ? 'Documentation that cannot survive rigor legal and tax due diligence review.'
                  : 'Thiếu sự chuẩn bị và tổ chức hồ sơ tài liệu để sẵn sàng vượt qua các cuộc rà soát pháp lý và thuế nghiêm ngặt.',
              },
              {
                title: isEn ? 'No post-deal alignment' : 'Không định chế hậu vòng',
                desc: isEn
                  ? 'Absence of quarterly Board pack cadences and use-of-funds verification.'
                  : 'Xung đột phát sinh sau đầu tư do thiếu cơ chế báo cáo định kỳ và giám sát hiệu quả sử dụng vốn.',
              },
            ].map((chall, cidx) => (
              <div
                key={cidx}
                className="bg-slate-950 p-6 rounded border border-slate-900 flex flex-col justify-between"
                id={`challenge-card-${cidx}`}
              >
                <div>
                  <AlertTriangle className="text-[#C9A227]/70 mb-3" size={18} />
                  <h4 className="text-xs font-bold text-white mb-1.5">{chall.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-normal">{chall.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9.3 Governance Advisory Framework (3 Pillars) */}
      <section className="py-10 bg-[#000]" id="governance-framework">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-16 text-center space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C9A227]">
              {isEn ? 'Methodology' : 'PHƯƠNG PHÁP TIẾP CẬN'}
            </span>
            <h2 className="text-3xl font-sans font-medium text-white tracking-tight">
              {isEn ? 'Our Governance Advisory Framework' : 'Khung Giải pháp Tư vấn Quản trị'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left" id="three-pillars-grid">
            {/* Pillar 1 */}
            <div className="bg-slate-950 p-8 rounded border border-slate-900 space-y-4" id="grp-pillar-1">
              <span className="font-mono text-xs font-bold text-[#C9A227]">PILLAR 01</span>
              <h4 className="text-lg font-bold text-white tracking-tight">
                {isEn ? 'Governance Readiness Assessment' : 'Đánh giá Thực trạng Quản trị'}
              </h4>
              <ul className="space-y-3 text-xs text-slate-400 pt-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#C9A227] mt-0.5">•</span>
                  <span>{isEn ? 'Comprehensive diagnostic check of corporate holdings registries.' : 'Đánh giá toàn diện thực trạng pháp lý doanh nghiệp và cơ cấu sở hữu hiện tại.'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C9A227] mt-0.5">•</span>
                  <span>{isEn ? 'Identification of compliance gaps that trigger valuation discounts.' : 'Nhận diện các rủi ro tuân thủ có thể ảnh hưởng tiêu cực đến định giá doanh nghiệp.'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C9A227] mt-0.5">•</span>
                  <span>{isEn ? 'Structure prioritization roadmap for initial cleanup.' : 'Thiết lập lộ trình xử lý các vấn đề tồn đọng theo thứ tự ưu tiên chiến lược.'}</span>
                </li>
              </ul>
            </div>

            {/* Pillar 2 */}
            <div className="bg-slate-950 p-8 rounded border border-slate-900 space-y-4" id="grp-pillar-2">
              <span className="font-mono text-xs font-bold text-[#C9A227]">PILLAR 02</span>
              <h4 className="text-lg font-bold text-white tracking-tight">
                {isEn ? 'Governance Structure Design' : 'Thiết kế Cấu trúc Quản lý'}
              </h4>
              <ul className="space-y-3 text-xs text-slate-400 pt-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#C9A227] mt-0.5">•</span>
                  <span>{isEn ? 'Formulating custom Decision Rights Matrices (RACI checks).' : 'Xây dựng Ma trận phân tách quyền hạn và trách nhiệm ra quyết định (RACI).'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C9A227] mt-0.5">•</span>
                  <span>{isEn ? 'Setting clear board approval voting limits.' : 'Thiết lập rõ ràng các giới hạn phê duyệt và biểu quyết của Hội đồng Quản trị.'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C9A227] mt-0.5">•</span>
                  <span>{isEn ? 'Drafting solid Management Reporting structures.' : 'Thiết lập quy trình báo cáo quản trị và kiểm soát ngân sách hiệu quả.'}</span>
                </li>
              </ul>
            </div>

            {/* Pillar 3 */}
            <div className="bg-slate-950 p-8 rounded border border-[#C9A227]/25 space-y-4 shadow-[0_4px_20px_rgba(201,162,39,0.01)]" id="grp-pillar-3">
              <span className="font-mono text-xs font-bold text-[#C9A227]">PILLAR 03</span>
              <h4 className="text-lg font-bold text-white tracking-tight">
                {isEn ? 'Post-Investment Governance' : 'Vận hành Hậu Giao dịch'}
              </h4>
              <ul className="space-y-3 text-xs text-slate-400 pt-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#C9A227] mt-0.5">•</span>
                  <span>{isEn ? 'Designing clean monthly Flash report cadences.' : 'Thiết lập quy trình công bố thông tin và báo cáo kết quả hoạt động định kỳ.'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C9A227] mt-0.5">•</span>
                  <span>{isEn ? 'Setting tracking formats for use-of-funds.' : 'Áp dụng các biểu mẫu theo dõi chặt chẽ kế hoạch sử dụng nguồn vốn.'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C9A227] mt-0.5">•</span>
                  <span>{isEn ? 'Preparing administrative standards for follow-on Series B rounds.' : 'Chuẩn bị nền tảng và lộ trình quản trị để sẵn sàng cho các vòng gọi vốn tiếp theo.'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 9.4 Governance Readiness Scorecard (INTERACTIVE COMPONENT) */}
      <section className="py-12 bg-[#02050A] border-y border-slate-900" id="interactive-scorecard-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center lg:text-left mb-12">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C9A227]">
              {isEn ? 'PRE-TRANSACTION EVALUATION' : 'TỰ CHẨN ĐOÁN THỰC TRẠNG'}
            </span>
            <h2 className="text-3xl font-sans font-medium text-white tracking-tight">
              {isEn ? 'The Governance Readiness Scorecard' : 'Cơ chế Tự thẩm định Sức khỏe Quản lý'}
            </h2>
          </div>

          <GovernanceScorecard language={language} />
        </div>
      </section>

      {/* 9.5 Deliverables document cards */}
      <section className="py-10 bg-[#000]" id="governance-deliverables">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C9A227]">
            {isEn ? 'OFFICIAL DOCUMENT EMBLEMS' : 'CÁC VĂN BẢN KIÊN QUYẾT BÀN GIAO'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-sans text-white tracking-tight mt-2 mb-12">
            {isEn ? 'Key Governance Deliverables' : 'Tài liệu Chuyển giao Đạt chuẩn'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-left" id="document-deliverables-grid">
            {[
              { title: isEn ? 'Governance Diagnostic Report' : 'Báo cáo Chẩn đoán Thực trạng', fileIndex: 'G-01' },
              { title: isEn ? 'Cap Table Review Ledger' : 'Bảng chuẩn hóa Cơ cấu Sở hữu (Cap Table)', fileIndex: 'G-02' },
              { title: isEn ? 'RACI Decision Rights Matrix' : 'Ma trận Phân quyền và Trách nhiệm RACI', fileIndex: 'G-03' },
              { title: isEn ? 'Management Reporting Framework' : 'Khung Báo cáo Quản trị Doanh nghiệp', fileIndex: 'G-04' },
              { title: isEn ? 'Post-Deal Board Pack Template' : 'Mẫu Tài liệu Họp Hội đồng Quản trị hậu Đầu tư', fileIndex: 'G-05' },
              { title: isEn ? 'Use-of-Funds Tracker Ledger' : 'Mẫu Giám sát Tiến độ giải ngân và Sử dụng vốn', fileIndex: 'G-06' },
              { title: isEn ? 'Governance Improvement Roadmap' : 'Lộ trình Khắc phục và Hoàn thiện Quản trị', fileIndex: 'G-07' },
              { title: isEn ? 'Investor Communication Guidelines' : 'Quy chuẩn Truyền thông và Công bố thông tin', fileIndex: 'G-08' },
            ].map((doc, docIdx) => (
              <div
                key={docIdx}
                className="p-5 rounded bg-slate-950 border border-slate-900 group hover:border-[#C9A227]/40 transition"
                id={`doc-card-${docIdx}`}
              >
                <div className="flex items-center justify-between">
                  <FileText className="text-slate-500 group-hover:text-[#C9A227] transition" size={18} />
                  <span className="text-[9px] font-mono text-slate-600 font-bold">{doc.fileIndex}</span>
                </div>
                <h4 className="text-xs font-semibold text-white mt-4 tracking-tight leading-snug group-hover:text-[#C9A227] transition">
                  {doc.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9.6 Professional Boundary Notice */}
      <section className="py-12 bg-slate-950/40 border-y border-slate-900" id="governance-compliance-boundary">
        <div className="max-w-4xl mx-auto px-4 flex gap-4 text-left">
          <ShieldCheck className="text-[#C9A227] shrink-0 mt-0.5" size={24} />
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#C9A227] block font-bold mb-1">
              {isEn ? 'Compliance Boundary Notice' : 'Thông báo Tuân thủ Pháp lý'}
            </span>
            <p className="text-[11px] leading-relaxed text-slate-400">
              {isEn
                ? 'AG Capital Advisory supports governance readiness, structure analysis, and investor relations. We do not replace corporate legal, corporate charters drafting, direct tax returns submissions, or other licensed professional securities/auditing desk tasks. Appropriately licensed legal or CPA specialists should review any corporate actions before actual binding registration.'
                : 'AG Capital Advisory hỗ trợ chuẩn hóa cấu trúc nội bộ, xây dựng mô hình vận hành và hoàn thiện quy trình quản trị báo cáo. Chúng tôi không cung cấp dịch vụ thay thế cho đại diện pháp lý, soạn thảo điều lệ pháp định chi tiết của doanh nghiệp, thực hiện nghĩa vụ khai thuế trực tiếp hay các hoạt động đòi hỏi giấy phép hành nghề chứng khoán và kiểm toán chuyên biệt. Mọi văn bản cấu trúc mang tính chất ràng buộc pháp lý cần được xem xét bởi đơn vị tư vấn luật pháp hoặc kế toán công chứng (CPA) có thẩm quyền trước khi chính thức đăng ký.'}
            </p>
          </div>
        </div>
      </section>

      {/* 9.7 Closing CTA */}
      <section className="py-12 bg-[#000]" id="governance-closing-box">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-sans font-medium text-white tracking-tight">
            {isEn
              ? 'Build the governance foundation your next stage of growth requires.'
              : 'Xây dựng nền tảng quản trị vững vàng cho chu kỳ tăng trưởng đột phá tiếp theo.'}
          </h2>
          <div className="flex justify-center gap-4 pt-2">
            <button
              onClick={() => {
                const scorecardElem = document.getElementById('governance-readiness-calculator');
                if (scorecardElem) {
                  scorecardElem.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-6 py-3.5 bg-[#C9A227] hover:bg-[#D4AF37] text-black font-semibold text-xs tracking-wider uppercase rounded"
            >
              {isEn ? 'Start Assessment' : 'Bắt đầu tự đánh giá'}
            </button>
            <button
              onClick={onBookDiscussionClick}
              className="px-6 py-3.5 bg-transparent border border-white text-white hover:bg-white/5 font-semibold text-xs tracking-wider uppercase rounded"
            >
              {isEn ? 'Contact AG Capital Advisory' : 'Trao đổi cùng chuyên gia'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
