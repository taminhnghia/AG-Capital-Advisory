/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PageId, Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { ShieldAlert, BookOpen, Clock, FileCheck, CheckCircle2, AlertOctagon } from 'lucide-react';

interface OurProcessPageProps {
  language: Language;
  setActivePage: (page: PageId) => void;
  onSubmitDealClick: () => void;
}

export default function OurProcessPage({ language, setActivePage, onSubmitDealClick }: OurProcessPageProps) {
  const t = (key: string) => TRANSLATIONS[language][key] || key;
  const isEn = language === 'EN';

  const stepsData = [
    {
      num: '01',
      title: isEn ? 'Initial Discussion & Deal Intake' : 'Thảo luận Sơ bộ & Tiếp nhận Thông tin',
      desc: isEn
        ? 'We understand your business model, core operational traction, capital requirements, and preliminary strategic objectives.'
        : 'Chúng tôi tìm hiểu sâu sắc mô hình kinh doanh, hiệu quả vận hành thực tế, nhu cầu dòng vốn và những mục tiêu chiến lược cốt lõi của doanh nghiệp.',
      input: isEn
        ? 'Company overview presentation, market stats, initial funding targets'
        : 'Bản giới thiệu chung (Pitch deck nếu có), thông số doanh số sơ bộ, lượng vốn dự kiến huy động',
      output: isEn ? 'Initial opportunity assessment record' : 'Bản đánh giá sơ bộ năng lực tiếp nhận dòng vốn',
    },
    {
      num: '02',
      title: isEn ? 'Fit & Readiness Screening' : 'Đánh giá Độ phù hợp & Tính sẵn sàng',
      desc: isEn
        ? 'We assess the business on parameters including team quality, sector boundaries, valuation logic, ownership cleanability, and deal feasibility.'
        : 'Chúng tôi rà soát cơ cấu tổ chức doanh nghiệp dựa trên năng lực của ban điều hành, đặc tính ngành hàng tiêu dùng, cấu trúc vốn sở hữu và tính khả thi của thương đề xuất.',
      input: isEn ? 'Internal metrics checklists' : 'Danh mục câu hỏi rà soát quản trị nội bộ',
      output: isEn ? 'Preliminary strategic fit decision' : 'Đánh giá mức độ phù hợp chiến lược ban đầu',
    },
    {
      num: '03',
      title: isEn ? 'Confidential Engagement' : 'Ký kết Thỏa thuận Hoạt động Bảo mật',
      desc: isEn
        ? 'For suitable engagements, we formally execute a bilateral Non-Disclosure Agreement (NDA) and finalize our commercial retainer and success fee.'
        : 'Đối với các hồ sơ đạt chuẩn, chúng tôi chính thức ký kết Thỏa thuận Bảo mật thông tin song phương (NDA) và hoàn tất hợp đồng dịch vụ tư vấn (phí cố định & phí thù lao thành công).',
      input: isEn ? 'Draft service covenants' : 'Bản dự thảo Thỏa thuận NDA và các điều khoản dịch vụ',
      output: isEn ? 'Executed NDA & signed engagement contract' : 'Hợp đồng dịch vụ tư vấn và Thỏa thuận NDA song phương đã ký kết',
    },
    {
      num: '04',
      title: isEn ? 'Investment Preparation' : 'Chuẩn hóa Hồ sơ Đầu tư',
      desc: isEn
        ? 'We build or refine your investment thesis, pitch presentation materials, valuation approach, financial predictions, and coordinate VDR parameters.'
        : 'Đội ngũ tư vấn thiết lập và hoàn thiện hồ sơ dự án theo tiêu chuẩn quốc tế: bản tóm tắt giấu tên (Teaser), bản thuyết trình gọi vốn chuyên nghiệp (Pitch Deck), mô hình tài chính động dự báo và cấu trúc phòng dữ liệu bảo mật (VDR).',
      input: isEn ? 'Raw accounting ledgers and reports' : 'Dữ liệu tài chính, sổ sách kế toán chưa kiểm toán và kế hoạch sử dụng vốn',
      output: isEn ? 'Complete institutional-grade pitch pack' : 'Bộ hồ sơ mời đầu tư chuẩn mực cấu trúc tài chính',
    },
    {
      num: '05',
      title: isEn ? 'Investor Access' : 'Tiếp cận Chọn lọc Hệ thống Nhà Đầu tư',
      desc: isEn
        ? 'We selectively coordinate introductions to target private equity partners whose mandate ticket size matches your consumer sector profile.'
        : 'Chúng tôi thực hiện kết nối có mục tiêu kết hợp bảo mật danh tính đến các đối tác đầu tư hoặc các quỹ tài chính có khẩu vị phù hợp dòng sản phẩm và quy mô của doanh nghiệp.',
      input: isEn ? 'Anonymized teaser submissions' : 'Bộ tài liệu sơ lược không tiết lộ danh tính doanh nghiệp (Teaser)',
      output: isEn ? 'Active managed investor meeting pipeline' : 'Lộ trình các buổi thảo luận và kết nối trực tiếp với nhà đầu tư phù hợp',
    },
    {
      num: '06',
      title: isEn ? 'Due Diligence & Negotiation' : 'Hỗ trợ Thẩm định Chi tiết (Due Diligence) & Đàm phán',
      desc: isEn
        ? 'We support your team in answering investor queries, managing data room audits, and evaluating commercial valuation protection clauses.'
        : 'Chúng tôi đồng hành điều phối quá trình giải đáp câu hỏi của đoàn thẩm định, vận hành phòng dữ liệu số và tối ưu hóa các điều khoản thương mại bảo vệ định giá trên bản giao kèo ghi nhớ thương vụ (Term Sheet).',
      input: isEn ? 'Auditors query checklists' : 'Yêu cầu rà soát chi tiết từ các đơn vị kiểm toán và tư vấn pháp lý của quỹ',
      output: isEn ? 'DD query closure validation' : 'Xác nhận hoàn thành giai đoạn thẩm định kỹ thuật',
    },
    {
      num: '07',
      title: isEn ? 'Closing & Handover' : 'Hoàn tất Thủ tục Giao dịch & Giải ngân',
      desc: isEn
        ? 'We coordinate final share pricing transfers, closing checklists confirmation, and support reconciliation of success billing.'
        : 'Chúng tôi hỗ trợ kỹ thuật và phối hợp các bên kiểm soát các điều khoản của Hợp đồng mua bán cổ phần (SPA) hay Hợp đồng cổ đông (SHA), đồng thời hoàn tất thủ tục nhận dòng vốn vào tài khoản doanh nghiệp.',
      input: isEn ? 'Signed share purchase agreement draft' : 'Hợp đồng chuyển nhượng cổ phần (SPA/SHA) đã ký kết',
      output: isEn ? 'Capital disbursement record & deal closure log' : 'Ghi chép dòng vốn giải ngân vào tài khoản và bàn giao chốt deal',
    },
    {
      num: '08',
      title: isEn ? 'Beyond the Round' : 'Đồng hành Quản trị Hậu Đầu tư',
      desc: isEn
        ? 'Our aligned support tracks use of funds, monthly board flash templates, and prepares the structure for the next stage expansion.'
        : 'Cùng xây dựng cơ chế giám sát thực thi dòng vốn hiệu quả, thiết kế khung báo cáo nhanh của HĐQT hàng tháng và lên kế hoạch dài hạn chuẩn bị cho vòng gọi vốn kế tiếp.',
      input: isEn ? 'Execution reporting guidelines' : 'Phương án phân bổ và định hướng giám sát kế hoạch giải ngân',
      output: isEn ? 'Post-deal governance monitoring framework' : 'Bản báo cáo quản trị hậu đầu tư và định hướng phát triển chu kỳ tiếp theo',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#02050A]" id="corporate-process-page">
      {/* Hero Header */}
      <section className="relative pt-36 pb-10 bg-gradient-to-b from-[#101F35]/30 to-transparent border-b border-slate-900" id="process-hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C9A227] block mb-3">
            {isEn ? 'THE PIPELINE' : 'LỘ TRÌNH ĐỒNG HÀNH'}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-medium tracking-tight text-white max-w-4xl leading-tight font-sans">
            {isEn ? 'A Disciplined Process From Opportunity to Outcome' : 'Quy trình Tư vấn Kỷ luật từ Cơ hội đến Kết quả'}
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-4 max-w-2xl leading-relaxed">
            {isEn
              ? 'Our process is designed to protect confidentiality, assess fit early, improve readiness and manage the capital journey with structured execution.'
              : 'Quy trình làm việc được thiết lập chặt chẽ nhằm bảo vệ sự bảo mật tối đa, nâng cao tính sẵn sàng của hồ sơ và thực thi lộ trình gọi vốn có cấu trúc chuyên nghiệp.'}
          </p>
        </div>
      </section>

      {/* 8 Step Process timeline layout */}
      <section className="py-10 bg-[#000]" id="process-timeline-detailed">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {stepsData.map((step) => (
            <div
              key={step.num}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start p-6 rounded bg-slate-950 border border-slate-900 shadow-lg hover:border-[#C9A227]/25 transition group"
              id={`process-step-row-${step.num}`}
            >
              {/* Stepper info */}
              <div className="lg:col-span-1 text-left">
                <span className="font-mono text-xl font-bold text-[#C9A227] tracking-wider block">
                  {step.num}
                </span>
                <span className="h-6 w-[1.5px] bg-gradient-to-b from-[#C9A227] to-transparent block mt-2 hidden lg:block" />
              </div>

              {/* Middle core decscription */}
              <div className="lg:col-span-5 text-left space-y-3">
                <h3 className="text-lg font-bold text-white group-hover:text-[#C9A227] transition">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Right panel: Inputs / Outputs */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-900 lg:border-t-0 lg:pt-0">
                <div className="p-4 rounded bg-black/60 border border-slate-900 text-left">
                  <span className="text-[9px] font-mono tracking-wider text-slate-500 uppercase block mb-1">
                    {isEn ? 'WHAT CLIENT PROVIDES' : 'DỮ LIỆU ĐẦU VÀO'}
                  </span>
                  <span className="text-xs text-slate-300 leading-relaxed block">{step.input}</span>
                </div>
                <div className="p-4 rounded bg-black/60 border border-slate-900 text-left">
                  <span className="text-[9px] font-mono tracking-wider text-[#C9A227] uppercase block mb-1">
                    {isEn ? 'STAGE FORMAL OUTPUT' : 'KẾT QUẢ ĐẦU RA'}
                  </span>
                  <span className="text-xs text-slate-300 leading-relaxed block">{step.output}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Selection Principle Section */}
      <section className="py-10 bg-[#02050A] border-t border-slate-900" id="selection-principle-section">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <AlertOctagon className="text-[#C9A227] mx-auto mb-2" size={32} />
          <h2 className="text-2xl sm:text-3xl font-sans font-medium text-white tracking-tight">
            {isEn ? 'We do not accept every engagement.' : 'Nguyên tắc Tuyển chọn Chất lượng'}
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed max-w-3xl mx-auto">
            {isEn
              ? 'AG Capital Advisory prioritises opportunities where its sector focus, professional capacity and strategic network can create meaningful value. Selection protects both client outcomes and the integrity of our advisory work.'
              : 'Với mô hình hoạt động nhỏ gọn và tập trung sâu (Boutique Advisory), AG Capital ưu tiên tập trung cho những doanh nghiệp nơi chuyên môn ngành hàng tiêu dùng và mạng lưới nhà đầu tư của chúng tôi có thể tạo ra những thặng dư thấu đáo và hữu dụng nhất.'}
          </p>
        </div>
      </section>

      {/* Compliance Note */}
      <section className="py-12 bg-slate-950/60 border-y border-slate-900" id="process-compliance-guarantee">
        <div className="max-w-4xl mx-auto px-4 flex gap-4 text-left">
          <ShieldAlert className="text-[#C9A227] shrink-0 mt-0.5" size={24} />
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#C9A227] block font-bold mb-1">
              {isEn ? 'Fundraising Outcomes Boundary' : 'Giới hạn Trách nhiệm về Kết quả Gọi vốn'}
            </span>
            <p className="text-[11px] leading-relaxed text-slate-500">
              {isEn
                ? 'Fundraising outcomes depend on multiple external market factors, macroeconomic variables, currency indices and strategic appetites. AG Capital Advisory provides professional advisory and document preparation support and does not guarantee capital raising success or deal closing timelines.'
                : 'Kết quả gọi vốn thực tế phụ thuộc lớn vào nhiều biến số vĩ mô, biến động tỷ giá và khẩu vị cụ thể từ phía các nhà đầu tư tổ chức. AG Capital Advisory cung cấp dịch vụ tư vấn cấu trúc, đồng hành và chuẩn hóa hồ sơ tài chính theo chuẩn mực chuyên nghiệp, hoàn toàn không đảm bảo kết quả gọi vốn thành công tuyệt đối hoặc xác lập cụ thể thời gian kết thúc thương vụ.'}
            </p>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-12 bg-[#000]" id="process-closing-cta">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {isEn ? 'Ready to assess your strategic position?' : 'Sẵn sàng đánh giá năng lực thu hút dòng vốn của bạn?'}
          </h2>
          <div className="pt-2">
            <button
              onClick={onSubmitDealClick}
              className="px-8 py-3.5 bg-[#C9A227] hover:bg-[#D4AF37] text-black font-semibold text-xs tracking-wider uppercase rounded"
            >
              {isEn ? 'Submit Your Deal' : 'Nộp Hồ Sơ Gọi Vốn'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
