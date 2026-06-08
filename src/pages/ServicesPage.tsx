/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PageId, Language } from '../types';
import { TRANSLATIONS } from '../translations';
import {
  TrendingUp,
  Scale,
  FileSpreadsheet,
  Compass,
  FileCheck,
  Layers,
  HelpCircle,
  Award,
  ChevronRight,
  ShieldCheck,
  Briefcase,
  DollarSign,
  Plus,
  Minus
} from 'lucide-react';

interface ServicesPageProps {
  language: Language;
  setActivePage: (page: PageId) => void;
  onSubmitDealClick: () => void;
  onBookDiscussionClick: () => void;
}

interface FAQItem {
  qEN: string;
  qVI: string;
  aEN: string;
  aVI: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    qEN: "What development stages does AG Capital's fundraising advisory support?",
    qVI: "AG Capital hỗ trợ doanh nghiệp gọi vốn ở những giai đoạn nào?",
    aEN: "We support high-growth consumer and retail businesses from Seed to Series B stages. We prepare early-stage companies to become building blocks for institutional quality, and help growth-stage companies navigate structured preferential rounds or strategic buy-side and sell-side M&A.",
    aVI: "Chúng tôi đồng hành chuyên sâu cùng doanh nghiệp tiêu dùng và bán lẻ từ vòng Hạt giống (Seed) đến Series A & Series B. Ngoài ra, AG Capital cũng tham gia tư vấn trực tiếp cho các thương vụ M&A chiến lược ở cả hai chiều mua và bán (Buy-side & Sell-side M&A)."
  },
  {
    qEN: "Why is Corporate Governance advisory crucial prior to fundraising?",
    qVI: "Tại sao việc cố vấn Quản trị Doanh nghiệp là cốt lõi trước khi gọi vốn?",
    aEN: "Institutional investors look beyond revenue multipliers. They require clean capitalization tables, clear decision-making boundaries (such as RACI matrices), structured board compositions, and standard compliance frameworks. Resolving governance gaps early prevents transaction sours during due diligence and significantly strengthens valuation premiums.",
    aVI: "Các nhà đầu tư định chế lớn không chỉ nhìn vào doanh số. Họ yêu cầu một bảng phân bổ sở hữu cổ phần sạch (Cap Table), ma trận phân quyền quyết định minh bạch, cấu trúc HĐQT chuẩn và tính tuân thủ thông tin tài chính nghiêm túc. Việc vá các lỗ hổng quản trị từ sớm giúp tránh việc sụp đổ thương vụ ở khâu thẩm định (Due Diligence) và nâng cao biên định giá."
  },
  {
    qEN: "How does the 'Alignment Model' (Fee-to-Equity Conversion) work?",
    qVI: "Mô hình 'Đồng hành' chuyển phí dịch vụ thành cổ phần hoạt động ra sao?",
    aEN: "To align our commitment with founders for the long haul, we offer a unique option to convert a portion of our transactional success advisory fees directly into equity of the partner company. This mechanism guarantees that our interests are completely synced with your company's exponential growth and corporate health.",
    aVI: "Để cam kết gắn bó với các nhà sáng lập lâu dài, AG Capital hỗ trợ một cơ chế đặc biệt cho phép chuyển một phần phí cố vấn thành cổ phần trực tiếp của chính doanh nghiệp. Cơ chế này đảm bảo mọi nỗ lực và quyền lợi của chúng tôi hoàn toàn đồng hành cùng sự tăng trưởng đột phá và sức khỏe bền bỉ của doanh nghiệp."
  },
  {
    qEN: "How do you guarantee and manage transaction confidentiality?",
    qVI: "Quy trình bảo mật thông tin thương vụ được thực hiện như thế nào?",
    aEN: "Confidentiality is our primary operational foundation. Under our Confidentiality Charter, we never mass-distribute materials. We identify and screen high-appetite private equity funds and corporate partners, executing binding NDAs first. Detailed transaction data rooms (VDRs) are presented selectively only to pre-cleared, genuine prospective buyers.",
    aVI: "Bảo mật là nguyên tắc sống còn của AG Capital. Theo Hiến chương Bảo mật, chúng tôi không bao giờ gửi hồ sơ ồ ạt. Chúng tôi sàng lọc, thảo luận gián tiếp trước khi ký kết các điều khoản bảo mật liên can (NDA). Mọi dữ liệu về tình hình tài chính của doanh nghiệp chỉ được mở từng phần chọn lọc trong phòng dữ liệu số bảo mật (VDR) cho các đối tác đã xác thực."
  },
  {
    qEN: "Do you supply formal legal opinions or structural tax reviews?",
    qVI: "AG Capital có cung cấp sản phẩm tư vấn pháp lý dịch vụ hoặc tư vấn thuế chính thức không?",
    aEN: "No. AG Capital acts strictly as a financial and strategic transaction advisor. While we excel in structuring commercial term boundaries and term sheets to protect founder control, all definitive, binding transaction documents (such as SPAs and SHAs) must be reviewed and countersigned by licensed, qualified legal and tax attorneys.",
    aVI: "Không. AG Capital đóng vai trò là bên cố vấn chiến lược thương vụ và cấu trúc tài chính độc lập. Mặc dù chúng tôi thiết kế tối ưu các điều khoản thương mại (Term Sheet) để bảo vệ quyền kiểm soát của nhà sáng lập, mọi văn bản pháp lý ràng buộc (như SPA, SHA) đều phải được kiểm tra chéo và bảo mật bởi các văn phòng luật sư chuyên trách."
  }
];

export default function ServicesPage({
  language,
  setActivePage,
  onSubmitDealClick,
  onBookDiscussionClick,
}: ServicesPageProps) {
  const t = (key: string) => TRANSLATIONS[language][key] || key;
  const isEn = language === 'EN';
  const [activeFaq, setActiveFaq] = React.useState<number | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-[#02050A]" id="corporate-services-page">
      {/* Hero Header */}
      <section className="relative pt-36 pb-10 bg-gradient-to-b from-[#101F35]/30 to-transparent border-b border-slate-900" id="services-hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C9A227] block mb-3">
            {isEn ? 'THE SUITE' : 'MẢNG DỊCH VỤ CHUYÊN BIỆT'}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-medium tracking-tight text-white max-w-4xl leading-tight">
            {isEn
              ? 'Advisory Built Around the Full Capital Journey'
              : 'Bộ Giải pháp Tư vấn Xuyên suốt Hành trình Gọi vốn'}
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-4 max-w-2xl leading-relaxed">
            {isEn
              ? 'Every capital raise begins with preparation and continues well beyond closing. Our services help consumer businesses approach capital with greater clarity, structure and confidence.'
              : 'Mọi tiến trình gọi vốn đều khởi sinh từ khâu chuẩn bị vững chắc và bền bỉ kéo dài sau khi rót vốn. Giải pháp từ AG Capital hỗ trợ doanh nghiệp tiếp cận nguồn vốn với định chế minh bạch nhất.'}
          </p>
        </div>
      </section>

      {/* DETAILED STREAM 1 - Fundraising Strategy */}
      <section className="py-10 bg-[#000] border-b border-slate-900 text-left" id="service-stream-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="text-[#C9A227]" size={24} />
              <span className="font-mono text-xs font-bold text-[#C9A227] tracking-widest uppercase">Stream 01</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">{t('SERV_1_TITLE')}</h2>
            <p className="text-sm text-[#C9A227] font-medium italic">{isEn ? 'Define the Right Capital Path' : 'Xác định Lộ trình Vốn Phù hợp'}</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isEn
                ? 'We evaluate your company readiness, structure potential valuation boundaries, and help model dilution impacts before approaching external fund markets.'
                : 'Chúng tôi rà soát độ khớp chỉ số, ước định khoảng biên định giá tương đồng và phác thảo sơ bộ rủi ro pha loãng trước khi tiếp xúc thị trường kêu gọi vốn.'}
            </p>

            {/* Pain points / challenges side card */}
            <div className="p-5 rounded bg-slate-950 border border-slate-900 mt-6" id="srv-1-challenges">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-3">
                {isEn ? 'CLIENT CHALLENGES WE ADDRESS' : 'CÂU HỎI THƯỜNG GẶP CỦA SÁNG LẬP'}
              </span>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-[#C9A227] font-bold">•</span>
                  <span>{isEn ? 'How much capital should we raise?' : 'Quy mô gọi vốn thế nào là tối ưu hóa?'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C9A227] font-bold">•</span>
                  <span>{isEn ? 'What valuation can we support?' : 'Chỉ số nào chứng thực định giá của chúng tôi?'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C9A227] font-bold">•</span>
                  <span>{isEn ? 'How should dilution be considered?' : 'Tránh mất quyền kiểm soát doanh nghiệp ra sao?'}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 bg-slate-950/40 p-6 md:p-8 rounded border border-slate-900">
            <div>
              <h4 className="text-xs font-mono font-bold tracking-widest text-[#C9A227] uppercase mb-4">
                {isEn ? 'Capabilities' : 'Năng lực Điều hành'}
              </h4>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{isEn ? 'Investment readiness assessment' : 'Đánh giá độ sẵn sàng gọi vốn'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{isEn ? 'Capital needs analysis' : 'Phân tích nhu cầu tài chính'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{isEn ? 'Funding roadmap creation' : 'Xây dựng bản đồ lộ trình vốn'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{isEn ? 'Dilution & Cap Table modeling' : 'Mô phỏng cơ cấu pha loãng biểu quyết'}</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono font-bold tracking-widest text-[#C9A227] uppercase mb-4">
                {isEn ? 'Deliverables' : 'Tài liệu Chuyển giao'}
              </h4>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{isEn ? 'Strategic capital path report' : 'Báo cáo cấu trúc bản đồ vốn'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{isEn ? 'Cap table simulation models' : 'Mẫu Excel Cap Table động'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{isEn ? 'Valuation analysis deck' : 'Báo cáo chỉ số so sánh định giá'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED STREAM 2 - Growth Equity Advisory */}
      <section className="py-10 bg-[#02050A] border-b border-slate-900 text-left" id="service-stream-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <DollarSign className="text-[#C9A227]" size={24} />
              <span className="font-mono text-xs font-bold text-[#C9A227] tracking-widest uppercase">Stream 02</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">{t('SERV_2_TITLE')}</h2>
            <p className="text-sm text-[#C9A227] font-medium italic">{isEn ? 'Optimise Deal Structure for Scale' : 'Tối ưu hóa cấu trúc vòng gọi vốn lớn'}</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isEn
                ? 'We navigate issues specific to growth equity: preferred shares, liquidation preferences, exit models, and secondary sales for founders.'
                : 'Chúng tôi hỗ trợ chuyên sâu các vấn đề đặc thù của vòng gọi vốn lớn (Series B-C-D): tối ưu hóa preferred shares, liquidation preference đa tầng, quyền phủ quyết và secondary sale.'}
            </p>

            <div className="p-5 rounded bg-slate-950 border border-slate-900 mt-6" id="srv-2-challenges">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-3">
                {isEn ? 'CLIENT CHALLENGES' : 'GÓC KHÓ KHĂN DOANH NGHIỆP'}
              </span>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-[#C9A227] font-bold">•</span>
                  <span>{isEn ? 'Negotiating multi-tier liquidation preferences' : 'Đàm phán liquidation preference đa tầng phức tạp'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C9A227] font-bold">•</span>
                  <span>{isEn ? 'Founder path to liquidity via secondary sales' : 'Sáng lập muốn rút một phần vốn (secondary sale)'}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 bg-slate-950/40 p-6 md:p-8 rounded border border-slate-900">
            <div>
              <h4 className="text-xs font-mono font-bold tracking-widest text-[#C9A227] uppercase mb-4">
                {isEn ? 'Capabilities' : 'Năng lực Điều phối'}
              </h4>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{isEn ? 'Preferred shares & liquidation parameters' : 'Thiết kế cấu trúc preferred shares'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{isEn ? 'Secondary sale alignment & locking' : 'Điều hòa tỷ lệ secondary sale và lock-up'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{isEn ? 'Board composition & voting structures' : 'Cơ chế ban điều hành, ghế HĐQT và quyền phủ quyết'}</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono font-bold tracking-widest text-[#C9A227] uppercase mb-4">
                {isEn ? 'Deliverables' : 'Sản phẩm Bàn giao'}
              </h4>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{isEn ? 'Growth term checklist' : 'Bản danh mục điều khoản vốn lớn'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{isEn ? 'Liquidation priority models' : 'Mô hình phân bổ thứ tự ưu tiên thanh toán'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED STREAM 3 - M&A Advisory */}
      <section className="py-10 bg-[#000] border-b border-slate-900 text-left" id="service-stream-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <Briefcase className="text-[#C9A227]" size={24} />
              <span className="font-mono text-xs font-bold text-[#C9A227] tracking-widest uppercase">Stream 03</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">{t('SERV_3_TITLE')}</h2>
            <p className="text-sm text-[#C9A227] font-medium italic">{isEn ? 'Strategic Expansion and Exit Alignment' : 'Tập trung tư vấn giao dịch chiến lược sáp nhập và thoái vốn'}</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isEn
                ? 'We provide end-to-end buy-side and sell-side representation: target matching, independent valuation, structured SPA parameter support, and post-merger integration planning.'
                : 'Chúng tôi hỗ trợ toàn diện cả hai đầu mua/bán (buy-side & sell-side): rà soát đối tượng sáp nhập, định giá độc lập, đàm phán hợp đồng SPA, kiểm soát tập trung kinh tế và thiết lập lộ trình hậu sáp nhập.'}
            </p>

            <div className="p-5 rounded bg-slate-950 border border-slate-900 mt-6" id="srv-3-challenges">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C9A227] block mb-3">
                {isEn ? 'SPECIAL LEGAL NOTE' : 'LƯU Ý PHÁP LÝ ĐẶC BIỆT'}
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {isEn
                  ? 'M&A in Vietnam involves complex Competition Law regulations regarding concentration limits, FDI parameters, capital gains tax, and minority shareholder veto protection.'
                  : 'M&A tại Việt Nam liên quan mật thiết đến các quy định nộp hồ sơ tập trung kinh tế (Luật Cạnh tranh), điều kiện tỷ lệ FDI, và nghĩa vụ thuế chuyển nhượng vốn.'}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 bg-slate-950/40 p-6 md:p-8 rounded border border-slate-900">
            <div>
              <h4 className="text-xs font-mono font-bold tracking-widest text-[#C9A227] uppercase mb-4">
                {isEn ? 'Capabilities' : 'Năng lực Điều phối'}
              </h4>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{isEn ? 'Buy-side target matching' : 'Thẩm định tìm kiếm tệp mua thâu tóm mục tiêu'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{isEn ? 'Sell-side exit preparation' : 'Định vị phục vụ thoái vốn bên bán'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{isEn ? 'Post-merger integration (PMI)' : 'Kế hoạch tích hợp hậu M&A (PMI)'}</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono font-bold tracking-widest text-[#C9A227] uppercase mb-4">
                {isEn ? 'Deliverables' : 'Sản phẩm Bàn giao'}
              </h4>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{isEn ? 'Information Memorandum (IM/CIM)' : 'Bản giới thiệu thông tin dự án (CIM)'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{isEn ? 'M&A valuation report template' : 'Báo cáo định giá M&A độc lập'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{isEn ? 'Regulatory & clearances check list' : 'Bản rà soát điều kiện FDI và Luật Cạnh tranh'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED STREAM 4 - Corporate Governance Advisory */}
      <section className="py-10 bg-[#02050A] border-b border-slate-900 text-left" id="service-stream-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <Scale className="text-[#C9A227]" size={24} />
              <span className="font-mono text-xs font-bold text-[#C9A227] tracking-widest uppercase">Stream 04</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">{t('SERV_4_TITLE')}</h2>
            <p className="text-sm text-[#C9A227] font-medium italic">{isEn ? 'Build the Structure Capital Requires' : 'Thiết lập định chế để đón dòng vốn ngoại'}</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isEn
                ? 'Investor trust hinges on organizational accountability. We restructure ownership policies and install institutional-grade board structures.'
                : 'Niềm tin dài hạn của quỹ đầu tư bắt đầu từ sự nghiêm túc quản lý. Chúng tôi tối ưu hóa quyền phán quyết của BOD và thiết kế cơ chế biểu quyết.'}
            </p>

            <div className="p-5 rounded bg-slate-950 border border-slate-900 mt-6" id="srv-4-challenges">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-3">
                {isEn ? 'CLIENT CHALLENGES' : 'GÓC KHÓ KHĂN DOANH NGHIỆP'}
              </span>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-[#C9A227] font-bold">•</span>
                  <span>{isEn ? 'Founder-led decisions without clear delegation' : 'Nhà sáng lập ôm trọn mọi phê duyệt, thiếu ủy quyền'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C9A227] font-bold">•</span>
                  <span>{isEn ? 'Messy proxy tables or silent partners' : 'Đứng tên hộ, cam kết cổ phần thưởng miệng lộn xộn'}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 bg-slate-950/40 p-6 md:p-8 rounded border border-slate-900">
            <div>
              <h4 className="text-xs font-mono font-bold tracking-widest text-[#C9A227] uppercase mb-4">
                {isEn ? 'Capabilities' : 'Năng lực Định dạng'}
              </h4>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{isEn ? 'Governance readiness diagnostic' : 'Chẩn đoán khoảng trống kiểm soát nội bộ'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{isEn ? 'Decision rights matrix design' : 'Thiết kế ma trận quyền quyết định RACI'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{isEn ? 'Reporting control blueprints' : 'Chuẩn hóa báo cáo tài chính nội bộ'}</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono font-bold tracking-widest text-[#C9A227] uppercase mb-4">
                {isEn ? 'Deliverables' : 'Sản phẩm Bàn giao'}
              </h4>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{isEn ? 'Governance improvement matrix' : 'Hệ thống định chế quyền biểu quyết HĐQT'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{isEn ? 'Custom Board Pack template' : 'Khung mẫu Báo cáo HĐQT mẫu chuẩn quỹ'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{isEn ? 'Diagnostic validation roadmap' : 'Khung lộ trình khắc phục rủi ro vận hành'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED STREAM 5 - Investor-Ready Materials */}
      <section className="py-10 bg-[#000] border-b border-slate-900 text-left" id="service-stream-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <FileSpreadsheet className="text-[#C9A227]" size={24} />
              <span className="font-mono text-xs font-bold text-[#C9A227] tracking-widest uppercase">Stream 05</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">{t('SERV_5_TITLE')}</h2>
            <p className="text-sm text-[#C9A227] font-medium italic">{isEn ? 'Present the Opportunity With Clarity' : 'Trình diễn cơ hội kinh doanh tinh xảo'}</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isEn
                ? 'We build institutional-grade investment documentation including models, teasers, and Information Memorandums.'
                : 'Chúng tôi biên soạn trọn bộ tài liệu gọi vốn chính xác, chuyên nghiệp và có tính thuyết phục cao gửi quỹ đầu tư.'}
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 bg-slate-950/40 p-6 md:p-8 rounded border border-slate-900">
            <div>
              <h4 className="text-xs font-mono font-bold tracking-widest text-[#C9A227] uppercase mb-4">
                {isEn ? 'Capabilities' : 'Hạng mục Triển khai'}
              </h4>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{isEn ? 'Strategic Premium Pitch Deck design' : 'Thiết kế Pitch Deck mỹ thuật cao'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{isEn ? 'Interactive Financial Model blueprinting' : 'Xây dựng mô hình tài chính động'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{isEn ? 'Information Memorandum (IM)' : 'Xây dựng Bản giới thiệu tóm tắt IM'}</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono font-bold tracking-widest text-[#C9A227] uppercase mb-4">
                {isEn ? 'Deliverables' : 'Bàn giao'}
              </h4>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{isEn ? 'Full investor deck & teaser PDFs' : 'Hồ sơ thuyết trình gọi vốn chuẩn chỉnh'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{isEn ? 'Interactive Excel dynamic models' : 'Mô hình tài chính dự báo Excel 5 năm'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{isEn ? 'Data Room index checklist' : 'Bộ Khung danh mục phòng dữ liệu'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED STREAM 6 - Investor Access */}
      <section className="py-10 bg-[#02050A] border-b border-slate-900 text-left" id="service-stream-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <Compass className="text-[#C9A227]" size={24} />
              <span className="font-mono text-xs font-bold text-[#C9A227] tracking-widest uppercase">Stream 06</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">{t('SERV_6_TITLE')}</h2>
            <p className="text-sm text-[#C9A227] font-medium italic">{isEn ? 'Reach Relevant Capital, Selectively' : 'Tiếp cận nguốn vốn chọn lọc'}</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isEn
                ? 'We target and connect your deal to selected private equity funds, corporate strategic investors, and family offices whose investment mandates match your stage and sector.'
                : 'Chúng tôi thiết lập lộ trình gõ cửa lọc chọn đúng quỹ cá nhân, tập đoàn đa quốc gia và văn phòng gia đình đầu tư chiến lược có đúng khẩu vị ngành hàng tiêu dùng.'}
            </p>

            <div className="p-4 rounded bg-slate-950 border border-[#C9A227]/10 text-xs text-slate-400 flex gap-2.5" id="selective-statment-box">
              <ShieldCheck className="text-[#C9A227] shrink-0 mt-0.5" size={16} />
              <p className="leading-relaxed">
                <span className="text-white font-semibold">Selective Access Commitment:</span>{' '}
                {isEn
                  ? 'We prioritize relevance and fit over mass distribution of business information.'
                  : 'Chúng tôi đặt tính chọn lọc, nhất quán và độ bảo mật thông tin tối thượng lên trên việc gửi tài liệu ồ ạt.'}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 bg-slate-950/40 p-6 md:p-8 rounded border border-slate-900">
            <div>
              <h4 className="text-xs font-mono font-bold tracking-widest text-[#C9A227] uppercase mb-4">
                {isEn ? 'Capabilities' : 'Năng lực Vận hành'}
              </h4>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{isEn ? 'Target fund stage matching' : 'Sàng lọc khẩu vị quy mô vốn'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{isEn ? 'Selected pipeline management' : 'Quản lý phễu đối tác liên thông'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{isEn ? 'Confidential target outreach' : 'Tiếp cận gián tiếp bảo đảm bí mật'}</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono font-bold tracking-widest text-[#C9A227] uppercase mb-4">
                {isEn ? 'Deliverables' : 'Bàn giao'}
              </h4>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{isEn ? 'Target investor list / pipeline' : 'Bản danh sách Quỹ đầu tư tiềm năng'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{isEn ? 'Structured feedback logbook' : 'Bản ghi nhận ý kiến phản hồi'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED STREAM 7 - Due Diligence & Transaction Support */}
      <section className="py-10 bg-[#000] border-b border-slate-900 text-left" id="service-stream-7">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <FileCheck className="text-[#C9A227]" size={24} />
              <span className="font-mono text-xs font-bold text-[#C9A227] tracking-widest uppercase">Stream 07</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">{t('SERV_7_TITLE')}</h2>
            <p className="text-sm text-[#C9A227] font-medium italic">{isEn ? 'Navigate the Critical Stage With Structure' : 'Dẫn dắt kỷ luật thương thảo'}</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isEn
                ? 'We organize virtual data rooms and support negotiations regarding commercial term sheet clauses.'
                : 'Chúng tôi thiết lập phòng thông tin bảo mật và hỗ trợ phân tích các điều khoản Term Sheet.'}
            </p>

            <div className="p-4 rounded bg-red-500/5 border border-red-900/40 text-xs text-slate-500" id="dd-disclaimer-box">
              <p className="leading-relaxed">
                <span className="text-slate-300 font-semibold">{isEn ? 'Legal & Tax Disclaimer Notice:' : 'Tuyên bố giới hạn pháp lý:'}</span>{' '}
                {isEn
                  ? 'Legal, tax, equity issuance and binding transaction documents must be reviewed by appropriately qualified advisers before implementation.'
                  : 'Mọi cấu trúc hợp đồng cổ đông, điều lệ, chuyển giao chứng chỉ, SAFE bắt buộc phải được thẩm định lại bởi văn phòng luật và tư vấn thuế có cấp phép.'}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 bg-slate-950/40 p-6 md:p-8 rounded border border-slate-900">
            <div>
              <h4 className="text-xs font-mono font-bold tracking-widest text-[#C9A227] uppercase mb-4">
                {isEn ? 'Capabilities' : 'Năng lực Điều phối'}
              </h4>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{isEn ? 'Virtual Data Room (VDR) supervision' : 'Vận hành phòng dữ liệu số VDR'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{isEn ? 'Term sheet commercial review' : 'Phân tích bất cân xứng Term Sheet'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{isEn ? 'DD query tracking framework' : 'Quản lý bảng phản hồi thông tin rà soát'}</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono font-bold tracking-widest text-[#C9A227] uppercase mb-4">
                {isEn ? 'Key outcomes' : 'Điểm cốt lõi'}
              </h4>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{isEn ? 'Clean transactional data room' : 'Phòng tài liệu tối ưu hóa cấu trúc'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{isEn ? 'Structured term boundaries agreement' : 'Xác định rõ giới hạn nhượng bộ điều khoản'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED STREAM 08 - Beyond-the-Round Value Creation */}
      <section className="py-10 bg-[#02050A] border-b border-slate-900 text-left" id="service-stream-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <Layers className="text-[#C9A227]" size={24} />
              <span className="font-mono text-xs font-bold text-[#C9A227] tracking-widest uppercase">Stream 08</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">{t('SERV_8_TITLE')}</h2>
            <p className="text-sm text-[#C9A227] font-medium italic">{isEn ? 'Closing Is a Milestone, Not the Finish Line' : 'Giải ngân vốn chỉ mới ở vạch xuất phát'}</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isEn
                ? 'We support ongoing investor relations, monthly flash report structures, and monitoring run-rates to secure long-term alignment.'
                : 'Chúng tôi đồng hành cùng sáng lập thiết lập kỷ luật thông tin báo cáo cho cổ đông mới hậu thương vụ.'}
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 bg-slate-950/40 p-6 md:p-8 rounded border border-slate-900">
            <div>
              <h4 className="text-xs font-mono font-bold tracking-widest text-[#C9A227] uppercase mb-4">
                {isEn ? 'Capabilities' : 'Năng lực Đồng hành'}
              </h4>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{isEn ? 'Continuous investor reporting loops' : 'Thiết lập khung báo cáo cổ đông định kỳ'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{isEn ? 'Use of funds efficiency tracking' : 'Giám sát tính kỷ luật giải ngân ví vốn'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{isEn ? 'Preparation for subsequent rounds' : 'Lên kế hoạch chuẩn hóa cho vòng gọi tiếp theo'}</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono font-bold tracking-widest text-[#C9A227] uppercase mb-4">
                {isEn ? 'Deliverables' : 'Sản phẩm Bàn giao'}
              </h4>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{isEn ? 'Annual governance review logs' : 'Bảng rà soát hệ thống quản lý niên độ'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{isEn ? 'Investor communications template deck' : 'Bộ mẫu tin tức thông cáo nội bộ'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS SECTION */}
      <section className="py-16 bg-[#000] border-b border-slate-900" id="advisory-faq-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Editorial Title Intro */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2 text-[#C9A227]">
              <HelpCircle size={18} />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] font-bold">
                {isEn ? 'KNOWLEDGE REPOSITORY' : 'HỎI ĐÁP CHUYÊN LỆ'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-sans font-medium tracking-tight text-white">
              {isEn ? 'Capital & Governance Demystified' : 'Giải đáp Nghiệp vụ Vốn & Thể chế'}
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-sm">
              {isEn
                ? 'Navigating private market rules can be complex. Review our responses to primary commercial, structural and governance concerns.'
                : 'Tiếp cận thị trường vốn định chế đòi hỏi sự hiểu biết tường tận về luật chơi. Đọc các diễn giải nhanh về cấu trúc, quyền kiểm soát và bảo mật.'}
            </p>
          </div>

          {/* Right Accordion List */}
          <div className="lg:col-span-8 space-y-3.5" id="faq-accordion-list">
            {FAQ_DATA.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              const question = isEn ? faq.qEN : faq.qVI;
              const answer = isEn ? faq.aEN : faq.aVI;

              return (
                <div
                  key={idx}
                  className={`rounded border transition-all duration-300 ${
                    isOpen
                      ? 'bg-slate-950/90 border-[#C9A227]/40 shadow-[0_4px_25px_rgba(201,162,39,0.05)]'
                      : 'bg-slate-950/20 border-slate-900 hover:border-slate-800'
                  }`}
                  id={`faq-item-container-${idx}`}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                    id={`faq-trigger-btn-${idx}`}
                  >
                    <span
                      className={`text-xs sm:text-sm font-semibold tracking-tight font-sans transition-colors duration-200 ${
                        isOpen ? 'text-[#C9A227]' : 'text-slate-100 hover:text-white'
                      }`}
                    >
                      {question}
                    </span>
                    <span className="shrink-0 p-1.5 rounded-full bg-slate-900 border border-slate-800 text-[#C9A227] flex items-center justify-center transition-transform duration-300">
                      {isOpen ? <Minus size={11} className="stroke-[2.5px]" /> : <Plus size={11} className="stroke-[2.5px]" />}
                    </span>
                  </button>

                  {/* Accordion Panels Expand */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-[500px] border-t border-slate-900/60' : 'max-h-0'
                    }`}
                    id={`faq-panel-${idx}`}
                  >
                    <p className="p-4 sm:p-5 text-xs text-slate-400 leading-relaxed font-sans bg-[#02050A]/30">
                      {answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-12 bg-gradient-to-br from-[#101F35]/20 to-[#02050A] text-center border-t border-[#C9A227]/15" id="services-closing-cta">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-sans font-medium text-white tracking-tight">
            {isEn
              ? 'Your next funding round should begin with a stronger foundation.'
              : 'Để vòng gọi vốn tiếp theo bắt đầu bằng một bệ phóng kỷ luật hơn.'}
          </h2>
          <div className="flex justify-center gap-4 pt-2">
            <button
              onClick={onSubmitDealClick}
              className="px-6 py-3.5 bg-[#C9A227] hover:bg-[#D4AF37] text-black font-semibold text-xs tracking-wider uppercase rounded"
            >
              {t('BTN_SUBMIT_DEAL')}
            </button>
            <button
              onClick={onBookDiscussionClick}
              className="px-6 py-3.5 bg-transparent border border-white text-white hover:bg-white/5 font-semibold text-xs tracking-wider uppercase rounded"
            >
              {t('BTN_BOOK_DISCUSSION')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
