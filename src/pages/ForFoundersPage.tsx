/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageId, Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { DealSubmissionForm } from '../components/LeadForms';
import { Check, HelpCircle, ChevronDown, ShieldCheck, FileText, Landmark, DollarSign, Calculator, Calendar, Clock, ArrowRight, TrendingUp, Sparkles, AlertCircle } from 'lucide-react';

interface ForFoundersPageProps {
  language: Language;
  setActivePage: (page: PageId) => void;
}

export default function ForFoundersPage({ language, setActivePage }: ForFoundersPageProps) {
  const t = (key: string) => TRANSLATIONS[language][key] || key;
  const isEn = language === 'EN';

  // State for FAQ Accordion
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Quote Estimator States
  const [fundingTarget, setFundingTarget] = useState<number>(1); // default: 15 - 50 Tỷ / $600K - $2M
  const [readinessLevel, setReadinessLevel] = useState<number>(1); // default: Medium
  const [scopeOfService, setScopeOfService] = useState<number>(0); // default: Full Package
  const [currency, setCurrency] = useState<'VND' | 'USD'>('VND');

  const scrollToForm = () => {
    const el = document.getElementById('founders-deal-submit-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const targetOptions = [
    { labelVi: '< 15 Tỷ VNĐ', labelEn: '< $600K USD', minVnd: '5 Tỷ', maxVnd: '15 Tỷ', minUsd: '200K', maxUsd: '600K', baseRetainerVnd: 50, baseRetainerUsd: 2000, successMin: 3.0, successMax: 4.5, timeBase: 3.5 },
    { labelVi: '15 - 50 Tỷ VNĐ', labelEn: '$600K - $2M USD', minVnd: '15 Tỷ', maxVnd: '50 Tỷ', minUsd: '600K', maxUsd: '2M', baseRetainerVnd: 80, baseRetainerUsd: 3200, successMin: 2.5, successMax: 3.8, timeBase: 4.5 },
    { labelVi: '50 - 120 Tỷ VNĐ', labelEn: '$2M - $5M USD', minVnd: '50 Tỷ', maxVnd: '120 Tỷ', minUsd: '2M', maxUsd: '5M', baseRetainerVnd: 120, baseRetainerUsd: 4800, successMin: 2.0, successMax: 3.2, timeBase: 5.5 },
    { labelVi: '> 120 Tỷ VNĐ', labelEn: '> $5M USD', minVnd: '120 Tỷ', maxVnd: '250 Tỷ+', minUsd: '5M', maxUsd: '10M+', baseRetainerVnd: 150, baseRetainerUsd: 6000, successMin: 1.5, successMax: 2.8, timeBase: 7.0 },
  ];

  const readinessOptions = [
    { 
      titleVi: 'Sơ khởi (Chưa sẵn sàng)', 
      titleEn: 'Early (Not Ready)', 
      descVi: 'Chưa đóng gói tài liệu, số liệu tài chính thô sơ, chưa dọn dẹp danh sách cổ đông.', 
      descEn: 'No financial model or pitch deck, unorganized books & Cap table.', 
      timeMod: 1.0, 
      retainerMod: 1.25 
    },
    { 
      titleVi: 'Sẵn sàng một phần', 
      titleEn: 'Medium (Draft Prepared)', 
      descVi: 'Sổ kế toán ổn định, có Pitch Deck tự soạn nhưng cần thiết kế & chuẩn hóa lại.', 
      descEn: 'Clean internal books, has a basic draft deck, needs institutional rebuild.', 
      timeMod: 0.0, 
      retainerMod: 1.0 
    },
    { 
      titleVi: 'Kiểm toán sạch sẽ', 
      titleEn: 'Advanced (Audit-Ready)', 
      descVi: 'Báo cáo kiểm toán minh bạch, tài liệu chỉn chu, cần đại diện đàm phán Term Sheet.', 
      descEn: 'Audited financials, ready marketing teaser, needs outreach representation and terms protection.', 
      timeMod: -1.0, 
      retainerMod: 0.75 
    },
  ];

  const scopeOptions = [
    { 
      titleVi: 'Đồng hành Toàn diện (Mặc định)', 
      titleEn: 'Full Package Engagement', 
      descVi: 'Dựng tài liệu định giá, thiết lập phòng dữ liệu ảo + Kết nối quỹ đầu tư ngoại + Chốt Term Sheet.', 
      descEn: 'Full financial packaging, direct fund introductions, term sheet advisory & deal close.',
      feeTextVi: 'Phí cố định + Phí thành công tỷ lệ',
      feeTextEn: 'Retainer + Success fee percentage',
      successMultiplier: 1.0,
      retainerMultiplier: 1.0,
      timeScale: 1.0
    },
    { 
      titleVi: 'Chỉ Đóng gói Hồ sơ Thuyết trình', 
      titleEn: 'Pitch Collateral & Valuation Only', 
      descVi: 'Xây dựng mô hình tài chính 3 báo cáo, thiết kế Pitch Deck cao cấp, đóng gói 1-pager Teaser.', 
      descEn: 'Exclusive preparation of financial valuation models, investor teaser, and executive pitch deck.',
      feeTextVi: 'Phí cố định trọn gói (Không thu phí thành công)',
      feeTextEn: 'Flat retainer only (0% success fee)',
      successMultiplier: 0,
      retainerMultiplier: 0.85,
      timeScale: 0.5
    },
    { 
      titleVi: 'Tiếp cận Quỹ & Đại diện Đàm phán', 
      titleEn: 'Outreach & Due Diligence Representation', 
      descVi: 'Dành cho DN đã tự có hồ sơ chuẩn chỉ, chỉ cần cấu trúc Data Room & đàm phán bảo vệ Sáng lập.', 
      descEn: 'For ready issuers looking for target introductions, due diligence management and legal closing protection.',
      feeTextVi: 'Phí cố định cấu trúc + Phí thành công',
      feeTextEn: 'Reduced retainer + Full success fee',
      successMultiplier: 1.0,
      retainerMultiplier: 0.75,
      timeScale: 0.9
    },
  ];

  const selectedTarget = targetOptions[fundingTarget];
  const selectedReadiness = readinessOptions[readinessLevel];
  const selectedScope = scopeOptions[scopeOfService];

  // Logic calculation for estimations
  const estimatedRetainer = currency === 'VND'
    ? Math.round(selectedTarget.baseRetainerVnd * selectedReadiness.retainerMod * selectedScope.retainerMultiplier)
    : Math.round(selectedTarget.baseRetainerUsd * selectedReadiness.retainerMod * selectedScope.retainerMultiplier);

  const estimatedSuccessMin = (selectedTarget.successMin * selectedScope.successMultiplier).toFixed(1);
  const estimatedSuccessMax = (selectedTarget.successMax * selectedScope.successMultiplier).toFixed(1);

  const estimatedTimelineMonths = Math.max(2, Math.round((selectedTarget.timeBase + selectedReadiness.timeMod) * selectedScope.timeScale));
  const estimatedTimelineWeeks = Math.round(estimatedTimelineMonths * 4.3);

  const roadmapPhases = [
    {
      num: '01',
      titleVi: 'Rà Soát Thể Chế & Chuẩn Bị Lộ Trình',
      titleEn: 'Diagnostic & Capital Structuring',
      durationVi: 'Tuần 1 - 3',
      durationEn: 'Weeks 1 - 3',
      detailsVi: [
        'Nhận định ban sơ về sức mạnh tài chính, rà soát sổ cái liên quan.',
        'Nhận định rủi ro phân quyền HĐQT và cấu trúc bảng cổ đông (Cap Table).',
        'Hoàn thiện Bản sơ đồ Lộ trình tăng trưởng Vốn tối ưu chi phí.'
      ],
      detailsEn: [
        'Initial evaluation of unit economics and audit gaps detection.',
        'Board governance and Cap table risk diagnostic scanning.',
        'Custom capital pathway modeling to avoid premature dilution.'
      ]
    },
    {
      num: '02',
      titleVi: 'Đóng Gói Hồ Sơ & Mô Hình Tài Chính',
      titleEn: 'Collateral Packaging & Modeling',
      durationVi: 'Tuần 4 - 6',
      durationEn: 'Weeks 4 - 6',
      detailsVi: [
        'Xây dựng Mô hình Dự phóng Tài chính 3 báo cáo (MFA) đa kịch bản.',
        'Sáng tạo Teaser (1-Pager) tóm lược cơ hội kinh doanh tinh xảo.',
        'Thiết kế và biên tập Pitch Deck chuẩn định chế quốc tế bằng tiếng Anh.'
      ],
      detailsEn: [
        'Multi-scenario 3-statement financial projected model (MFA).',
        'High-converting investment teaser design (Executive summary).',
        'Bespoke, institutional-grade PowerPoint deck structure.'
      ]
    },
    {
      num: '03',
      titleVi: 'Tiếp Cận Quỹ & Trình Diễn Cơ Hội',
      titleEn: 'Targeted Outreach & Roadshow',
      durationVi: 'Tuần 7 - 12',
      durationEn: 'Weeks 7 - 12',
      detailsVi: [
        'Khởi động gửi hồ sơ bảo mật đến tệp Quỹ đầu tư nước ngoài tương thích.',
        'Thiết lập phòng dữ liệu ảo (Virtual Data Room - VDR) bảo mật đa tầng.',
        'Huấn luyện Sáng lập viên đối đáp & vượt qua các vòng rào cản sơ bộ.'
      ],
      detailsEn: [
        'Targeted dispatch to high-affinity international venture/private funds.',
        'Secure multi-tier cloud Virtual Data Room (VDR) deployment.',
        'Executive founder pitch rehearsals & Q&A counter-strategy coaching.'
      ]
    },
    {
      num: '04',
      titleVi: 'Thẩm Định Chi Tiết & Đàm Phán Term Sheet',
      titleEn: 'Due Diligence & Terms Negotiation',
      durationVi: 'Tuần 13 - 18',
      durationEn: 'Weeks 13 - 18',
      detailsVi: [
        'Đồng hành giải trình số liệu tài chính & pháp lý trong kỳ kiểm tra DD.',
        'Biên chế phân tích và thương thảo Bản điều khoản đầu tư (Term Sheet).',
        'Bảo vệ quyền biểu quyết, tỷ lệ phủ quyết và vị thế sòng phẳng của sáng lập.'
      ],
      detailsEn: [
        'Coordination support for legal, financial, and tax due diligence.',
        'Strategic drafting and defensive negotiation of Key Term Sheets.',
        'Guarding pioneer founder veto rights and structural voting controls.'
      ]
    },
    {
      num: '05',
      titleVi: 'Giải Ngân Quốc Tế & Đồng Hành Hậu Đầu Tư',
      titleEn: 'Closing, Funds Inflow & Post-Raise',
      durationVi: 'Tuần 19+',
      durationEn: 'Week 19+',
      detailsVi: [
        'Định chế văn kiện Hợp đồng Cổ đông (SHA) & Mua bán Cổ phần (SSA).',
        'Thủ tục tiếp khoản giải ngân quốc tế qua ngân hàng sòng phẳng.',
        'Khung tư vấn quản lý hội đồng cổ đông sau đầu tư bền bỉ.'
      ],
      detailsEn: [
        'Shareholders Agreement (SHA) & Share Subscription Agreement (SSA) alignment.',
        'International remittance clearance, cross-border banking assistance.',
        'Post-raise Board representation & corporate transition framework.'
      ]
    }
  ];

  const faqData = [
    {
      qEn: 'What stage of business does AG Capital Advisory work with?',
      qVi: 'AG Capital Advisory làm việc với doanh nghiệp ở giai đoạn nào?',
      aEn: 'We work with consumer businesses across their entire capital journey, from early Pre-Seed validation to Series B-C-D growth equity stages, and strategic M&A execution.',
      aVi: 'Chúng tôi đồng hành cùng doanh nghiệp tiêu dùng xuyên suốt hành trình gọi vốn toàn vòng đời, từ những bước kiểm nghiệm Pre-Seed/Pre-Series A sơ khởi cho tới các vòng gọi vốn tăng trưởng lớn Series B-C-D và các giao dịch mua bán sáp nhập M&A chiến lược.',
    },
    {
      qEn: 'Which sectors are within your focus?',
      qVi: 'Những lĩnh vực kinh doanh nào thuộc phạm vi tư vấn của các chuyên gia?',
      aEn: 'We focus exclusively on consumer-centric industries in Vietnam, including FMCG, retail chains, food & beverage (F&B), ecommerce brands, and consumer technology platforms.',
      aVi: 'Chúng tôi tập trung chuyên biệt vào kinh tế tiêu dùng Việt Nam, bao gồm Hàng tiêu dùng nhanh (FMCG), chuỗi bán lẻ, Chuỗi ẩm thực (F&B), Thương mại điện tử D2C và Nền tảng công nghệ phục vụ tiêu dùng.',
    },
    {
      qEn: 'Does submitting information guarantee that my deal will be accepted?',
      qVi: 'Gửi hồ sơ trực tuyến có bảo đảm thương vụ được chấp nhận tư vấn không?',
      aEn: 'No. Submitting information is purely evaluated for potential advisory alignment. Due to our selective, senior-led boutique model, we accept only a limited number of engagements.',
      aVi: 'Không. Các thông số được gửi sẽ đi qua bộ phận rà soát sàng lọc khẩu vị, tính phù hợp và mức độ khả thi chốt deal. Chúng tôi điều hành theo dạng Boutique chất lượng cao nên chỉ có thể chấp nhận số lượng dự án có hạn hàng năm.',
    },
    {
      qEn: 'Do you guarantee successful fundraising?',
      qVi: 'AG Capital Advisory có cam đoan việc gọi vốn thành công tuyệt đối không?',
      aEn: 'No advisory can guarantee fundraising outcomes, which depend heavily on external investor sentiments, macro variables, and deal negotiations. We guarantee institutional-grade preparation to bulletproof your profile.',
      aVi: 'Tuyệt đối không một đơn vị uy tín nào được phép cam đoan kết hôn gọi vốn thành công 100% ngoài thực tế vì quyết phán ròng nằm ở hội đồng quỹ đầu tư. Chúng tôi cam đoan chuẩn bị tài liệu, phòng dữ liệu DD hoàn mỹ nhất để triệt tiêu mọi lỗi hớ làm mất định giá.',
    },
    {
      qEn: 'How is confidentiality handled?',
      qVi: 'Tính Bảo mật thông tin của doanh nghiệp tôi gửi được bảo lưu thế nào?',
      aEn: 'All submissions are processed with strict confidentiality. Deeper documents and financial ledgers are only analyzed after formally executing a mutual, bilateral Non-Disclosure Agreement (NDA).',
      aVi: 'Dữ liệu sơ khởi gửi đi được xử lý nội bộ tuyệt mật. Các tệp tóm tắt chi tiết, báo cáo thuế hay hợp đồng của doanh nghiệp chỉ được chuyển giao sau khi hai bên tiến hành kí biên bản Thỏa thuận Bảo mật song phương (NDA) có dấu mộc.',
    },
    {
      qEn: 'What is Fee-into-Equity?',
      qVi: 'Phí hoán đổi Cổ phần (Fee-into-Equity) hoạt động thế nào?',
      aEn: 'For select engagements, we allow a pre-agreed portion of our success-linked advisory fee to be converted into equity, warrant options, or SAFE instruments in the client entity, directly aligning our interests.',
      aVi: 'Tại một số thương vụ chọn lọc sâu, một tỷ lệ nhất định thuộc khoản phí thành công gọi vốn thay vì nhận bằng tiền mặt sẽ được hoán đổi thành cổ phần doanh nghiệp tương đương, sòng phẳng san sẻ chặng đường tăng trưởng sau gọi vốn.',
    },
    {
      qEn: 'Does AG Capital Advisory invest cash into client companies?',
      qVi: 'AG Capital Advisory có trực tiếp rót vốn mặt đầu tư cùng khách hàng không?',
      aEn: 'During its first operating year, AG Capital Advisory does not provide direct cash co-investment into client companies. Alignment is achieved purely through agreed Fee-into-Equity models.',
      aVi: 'Trong năm vận hành đầu tiên, AG Capital Advisory không trực tiếp thực hiện rót ngân quỹ tiền mặt đầu tư đồng sở hữu. Cơ chế đồng hành tài chính duy nhất chỉ được xem xét qua mô hình Fee-into-Equity.',
    },
    {
      qEn: 'Can you support governance before fundraising?',
      qVi: 'Doanh nghiệp có thể yêu cầu kiện toàn Quản trị trước khi gọi vốn không?',
      aEn: 'Absolutely. We highly recommend and provide extensive Governance Advisory services prior to investor access to ensure there are no red flags on your cap table or board controls.',
      aVi: 'Hoàn toàn được. Chúng tôi cực kỳ khuyến khích và cung ứng mảng Tư vấn Quản trị chuyên sâu độc lập trước chặng tiến hành đi gặp quỹ để kịp dọn dẹp Cap table hay phân quyền HĐQT sòng phẳng trước ngày kiểm tra.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#02050A]" id="corporate-founders-page">
      {/* Hero Header */}
      <section className="relative pt-36 pb-10 bg-gradient-to-b from-[#101F35]/30 to-transparent border-b border-slate-900" id="founders-hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C9A227] block mb-3">
            {isEn ? 'FOR FOUNDERS' : 'DÀNH CHO SÁNG LẬP'}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-medium tracking-tight text-white max-w-4xl leading-tight font-sans">
            {isEn ? 'Preparing to Raise Capital? Begin With Readiness.' : 'Chuẩn bị Gọi vốn? Hãy bắt đầu từ Năng lực Sẵn sàng.'}
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-4 max-w-2xl leading-relaxed">
            {isEn
              ? 'Whether you are considering your first external funding round or preparing for institutional investors, clarity and preparation matter before outreach begins.'
              : 'Dù bạn đang cân nhắc vòng gọi vốn đầu tiên hay chuẩn bị làm việc cùng các định chế đầu tư quốc tế, tính minh bạch và sự chuẩn bị kỹ lưỡng về mặt số liệu tài chính quyết định phần lớn sự thành bại.'}
          </p>
        </div>
      </section>

      {/* 12.1 Who We Work With & 12.2 What Investors Expect */}
      <section className="py-10 bg-[#000]" id="founders-expectations">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-left">
            {/* Ideal Profile */}
            <div className="space-y-6">
              <span className="font-mono text-[9px] tracking-widest text-[#C9A227] uppercase block font-bold">
                {isEn ? 'THE IDEAL PROFILE' : 'HÌNH MẪU SÁNG LẬP PHÙ HỢP'}
              </span>
              <h3 className="text-xl font-bold font-sans text-white tracking-tight">
                {isEn ? 'Who We Partner With' : 'Chân dung Nhà sáng lập Đồng hành'}
              </h3>
              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-400">
                {[
                  isEn ? 'Vietnamese consumer-focused companies with validated retail/FMCG traction.' : 'Các doanh nghiệp thuộc ngành hàng tiêu dùng và dịch vụ bán lẻ tại Việt Nam có hiệu quả vận hành thực tế.',
                  isEn ? 'Founder teams committed to transparent data sharing and governance standards.' : 'Đội ngũ sáng lập cam kết tính minh bạch đối với số liệu tài chính và tiêu chuẩn quản trị.',
                  isEn ? 'Funding objectives tethered directly to logical city-expansion pathways.' : 'Phương án sử dụng nguồn vốn rõ ràng, hướng đến mục tiêu tăng trưởng thị phần và tối ưu hóa vận hành.',
                  isEn ? 'Companies seeking strategic partnerships rather than transactional broker introduction.' : 'Nhà sáng lập tìm kiếm đối tác đồng hành chiến lược lâu dài thay vì đơn vị môi giới trung gian thương mại thuần túy.',
                ].map((prof, pidx) => (
                  <li key={pidx} className="flex items-start gap-2.5">
                    <Check className="text-[#C9A227] shrink-0 mt-0.5" size={16} />
                    <span>{prof}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What investors expect */}
            <div className="space-y-6 bg-slate-950 p-6 md:p-8 rounded border border-slate-900">
              <span className="font-mono text-[9px] tracking-widest text-slate-500 uppercase block">
                {isEn ? 'INVESTOR EXPECTATIONS' : 'BỘ TIÊU CHÍ KHẢO SÁT CỦA QUỸ ĐẦU TƯ'}
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight">
                {isEn ? 'What Investors Scrutinize' : 'Những mắt điểm rà soát kỹ'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {[
                  { title: isEn ? 'Clear Revenue model' : 'Mô hình Doanh thu Thực tế', desc: isEn ? 'Durable unit economics.' : 'Kinh tế đơn vị bền vững (Unit Economics).' },
                  { title: isEn ? 'Audit-ready finances' : 'Báo cáo Tài chính Minh bạch', desc: isEn ? 'No related-party leaks.' : 'Xử lý triệt để tranh chấp bên liên quan.' },
                  { title: isEn ? 'Governance readiness' : 'Hệ thống Quản trị Doanh nghiệp', desc: isEn ? 'Clear board decision rights.' : 'Quy trình ra quyết định rõ ràng.' },
                  { title: isEn ? 'Traction metrics' : 'Chỉ số Vận hành Cốt lõi', desc: isEn ? 'Consistent customer LTV curves.' : 'Tỷ lệ duy trì khách hàng ổn định.' },
                  { title: isEn ? 'Cap Table clarity' : 'Cơ cấu Cổ đông Rõ ràng', desc: isEn ? 'Resolved silent holdings.' : 'Xử lý triệt để các rủi ro sở hữu.' },
                  { title: isEn ? 'Realistic Use-of-Funds' : 'Kế hoạch Sử dụng Vốn Khả thi', desc: isEn ? 'Clear growth milestones.' : 'Đặt mục tiêu tăng trưởng cụ thể.' },
                ].map((exp, eidx) => (
                  <div key={eidx} className="p-3 rounded bg-black border border-slate-900 text-left">
                    <span className="text-[#C9A227] font-semibold block mb-1">{exp.title}</span>
                    <span className="text-[10px] text-slate-500 block leading-tight">{exp.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12.3 What to Prepare Checklist */}
      <section className="py-10 bg-[#02050A] border-t border-slate-900" id="founders-preparations bg">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C9A227]">
            {isEn ? 'DO-IT-YOURSELF AUDIT' : 'CÁC TÀI LIỆU CẦN THIẾT & SẴN SÀNG'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-sans text-white tracking-tight mt-2 mb-12">
            {isEn ? 'What to Prepare Before Contacting Us' : 'Tài liệu Sáng lập Cần Chuẩn bị trước'}
          </h2>

          <div className="bg-slate-950 p-6 md:p-8 rounded border border-slate-900 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left" id="prepare-checklist-grid">
            {[
              { title: isEn ? 'Company introduction profile' : 'Hồ sơ giới thiệu Doanh nghiệp (Company Profile/Teaser)', desc: isEn ? 'Clear brand product/service story.' : 'Mô tả ngắn gọn về giải pháp, sản phẩm và câu chuyện thương hiệu.' },
              { title: isEn ? 'Historical Revenue summary' : 'Báo cáo Kết quả Kinh doanh Lũy kế', desc: isEn ? 'Monthly operational traction records.' : 'Thống kê doanh số lịch sử theo từng kênh và dòng sản phẩm.' },
              { title: isEn ? 'Funding requirement quantum' : 'Đề xuất Số vốn cần huy động', desc: isEn ? 'Mathematically modeled intended milestone targets.' : 'Khoản tiền đúc kết từ dự toán chi phí đầu tư và kế hoạch sử dụng vốn.' },
              { title: isEn ? 'Historical draft cap table' : 'Cấu trúc Danh sách Cổ đông hiện tại (Cap Table)', desc: isEn ? 'Lists of active shareholders and proxy holdings.' : 'Xác định rõ ràng tỷ lệ sở hữu của các cổ đông sáng lập và nhà đầu tư hiện hữu.' },
              { title: isEn ? 'Pitch deck PowerPoint draft' : 'Bản nháp Thuyết trình Gọi vốn (Pitch Deck Draft)', desc: isEn ? 'Slight structure showing high-level concepts.' : 'Tài liệu phác thảo ý tưởng kinh doanh và bản đồ tăng trưởng.' },
              { title: isEn ? 'Outstanding governance issues' : 'Các vấn đề tồn đọng trong Quản trị', desc: isEn ? 'Conflicts, silent partners, or pending proxy registries.' : 'Bao gồm rủi ro về mặt cơ cấu sở hữu, mập mờ biểu quyết hoặc các nghĩa vụ của bên liên quan.' },
            ].map((items, iidx) => (
              <div key={iidx} className="flex gap-3 items-start p-4 rounded bg-[#000]/60 border border-slate-900">
                <Check className="text-[#C9A227] shrink-0 mt-0.5" size={16} />
                <div>
                  <h4 className="text-xs font-semibold text-white">{items.title}</h4>
                  <p className="text-[10px] text-slate-500 leading-normal mt-0.5">{items.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12.4 Confidentiality Section */}
      <section className="py-8 bg-[#000]" id="founders-confidentiality-notice">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-br from-[#101F35]/20 to-[#02050A] p-8 rounded border border-[#C9A227]/20 flex flex-col md:flex-row items-center gap-6 text-left">
            <ShieldCheck className="text-[#C9A227] shrink-0" size={44} />
            <div className="space-y-2">
              <h4 className="text-lg font-bold font-sans text-white tracking-tight">
                {isEn ? 'Your Information Deserves Care' : 'Thông tin của bạn được cam kết Bảo vệ Tuyệt đối'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {isEn
                  ? 'Initial submissions are reviewed with strict internal confidentiality. Sensitive operational structures, cost margins, or product intellectual rights are shared in depth only after formally executing custom mutual Non-Disclosure Agreements (NDAs).'
                  : 'Mọi thông tin gửi trực tuyến đều được cam kết bảo lưu và xử lý bảo mật tuyệt đối. Những số liệu tài chính chi tiết, biên lợi nhuận ròng hoặc bí mật quy trình công nghệ cốt lõi chỉ được thảo luận sâu sau khi hai bên ký kết Thỏa thuận Bảo mật thông tin song phương (NDA) chính thức.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ROADMAP & TIMELINE SECTION */}
      <section className="py-14 bg-[#02050A] border-t border-slate-900 animate-fadeIn" id="founders-roadmap-timeline">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C9A227] block">
              {isEn ? 'TRANSACTION LIFECYCLE' : 'TIẾN TRÌNH THƯƠNG VỤ'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-sans font-medium text-white tracking-tight">
              {isEn ? 'The 5-Phase Fundraising Roadmap' : 'Lộ Trình Cốt Lõi 5 Giai Đoạn Gọi Vốn'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {isEn 
                ? 'From early operational diagnostics to international money inflow clearing. Structured for absolute capital safety and premium valuation protection.' 
                : 'Hành trình từ khâu đánh giá năng lực sẵn sàng sơ bộ đến khi dòng vốn đầu tư được giải ngân vào tài khoản ngân hàng một cách an toàn. Đảm bảo tối đa hóa lợi ích và quyền quản trị của đội ngũ sáng lập.'}
            </p>
          </div>

          {/* Stepped Timeline visual design */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 relative" id="phases-roadmap-steps-grid">
            {roadmapPhases.map((phase, pidx) => (
              <div 
                key={pidx} 
                className="relative bg-slate-950 p-6 rounded border border-slate-900 hover:border-[#C9A227]/40 transition-all duration-300 group flex flex-col justify-between"
                id={`roadmap-phase-card-${pidx}`}
              >
                {/* Step Connector Line on Big Screen */}
                {pidx < 4 && (
                  <div className="hidden lg:block absolute top-9 left-[95%] w-[18%] h-[0.5px] bg-gradient-to-r from-[#C9A227]/30 to-transparent z-10 animate-pulse" />
                )}

                <div className="space-y-4">
                  {/* Phase number and duration tag */}
                  <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                    <span className="font-mono text-xl font-bold text-slate-700 group-hover:text-[#C9A227] transition-colors">
                      {phase.num}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-wider bg-[#C9A227]/10 text-[#C9A227] px-2.5 py-0.5 rounded-full font-semibold">
                      {isEn ? phase.durationEn : phase.durationVi}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight min-h-[36px] flex items-center">
                      {isEn ? phase.titleEn : phase.titleVi}
                    </h4>
                    <ul className="space-y-2 bg-black/40 p-2.5 rounded text-[10.5px] text-slate-400 leading-normal">
                      {(isEn ? phase.detailsEn : phase.detailsVi).map((detail, didx) => (
                        <li key={didx} className="flex items-start gap-1.5">
                          <span className="text-[#C9A227] select-none mt-0.5">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-900/60 flex items-center gap-1.5 text-[10px] text-slate-500 italic">
                  <Clock size={10} className="text-[#C9A227]/60" />
                  <span>
                    {isEn ? 'Institutional standard' : 'Tiêu chuẩn định chế'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DYNAMIC PRICE QUOTE & CAPITAL ESTIMATOR */}
      <section className="py-14 bg-black border-t border-slate-900" id="founders-quote-estimator">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C9A227] flex items-center justify-center gap-1.5">
              <Sparkles size={11} />
              {isEn ? 'SECURED FEE CALCULATOR' : 'PHÒNG DỰ TOÁN PHÍ DỊCH VỤ & TIẾN ĐỘ'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-sans font-medium text-white tracking-tight">
              {isEn ? 'Interactive Advisory Fee & Timeline Estimator' : 'Ước Tính Báo Giá & Tiến Độ Gọi Vốn'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {isEn 
                ? 'Select raising target and preparation levels to evaluate cost structures and timeline horizons dynamically.' 
                : 'Hệ thống tự động tính toán mức phí cố định hàng tháng ước tính, tỷ lệ thù lao thành công và tổng thời gian gõ cửa quỹ đầu tư ngoại.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Controls Container - Left Column (7/12 width) */}
            <div className="lg:col-span-7 bg-slate-950 p-6 md:p-8 rounded border border-slate-900 space-y-6" id="calculator-input-board">
              
              {/* Currency Selector Toggle & Section Header */}
              <div className="flex items-center justify-between border-b border-slate-900 pb-4">
                <h3 className="text-xs sm:text-sm font-bold text-white tracking-wider uppercase font-sans flex items-center gap-2">
                  <Calculator size={14} className="text-[#C9A227]" />
                  {isEn ? '1. CUSTOMIZE TRANSACTION PARAMETERS' : '1. CẤU HÌNH THÔNG SỐ THƯƠNG VỤ'}
                </h3>
                
                {/* Custom Currency Toggle */}
                <div className="flex items-center bg-black border border-slate-800 rounded p-0.5">
                  <button
                    onClick={() => setCurrency('VND')}
                    className={`px-3 py-1 text-[10px] font-bold rounded transition-all duration-200 cursor-pointer ${
                      currency === 'VND' 
                        ? 'bg-[#C9A227] text-slate-950' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    VNĐ (đ)
                  </button>
                  <button
                    onClick={() => setCurrency('USD')}
                    className={`px-3 py-1 text-[10px] font-bold rounded transition-all duration-200 cursor-pointer ${
                      currency === 'USD' 
                        ? 'bg-[#C9A227] text-slate-950' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    USD ($)
                  </button>
                </div>
              </div>

              {/* INPUT 1: Target Capital Sliders (Quy mô vốn cần gọi) */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                    <DollarSign size={12} className="text-[#C9A227]" />
                    {isEn ? 'Desired Raising Quantum:' : 'Quy mô gọi vốn mong muốn:'}
                  </span>
                  <span className="font-mono text-[#C9A227] font-bold">
                    {currency === 'VND' 
                      ? `${selectedTarget.minVnd} - ${selectedTarget.maxVnd}`
                      : `${selectedTarget.minUsd} - ${selectedTarget.maxUsd}`
                    }
                  </span>
                </div>
                
                {/* Horizontal segment selection grids for highly professional feel */}
                <div className="grid grid-cols-4 gap-2">
                  {targetOptions.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => setFundingTarget(idx)}
                      className={`py-3 px-1.5 rounded transition-all duration-200 border text-center text-[10px] sm:text-xs leading-none flex flex-col justify-center items-center gap-1 font-semibold cursor-pointer ${
                        fundingTarget === idx
                          ? 'bg-[#C9A227]/25 text-white border-[#C9A227] shadow-[0_0_10px_rgba(201,162,39,0.15)]Scale'
                          : 'bg-black text-slate-400 border-slate-900 hover:text-slate-200 hover:border-slate-800'
                      }`}
                      id={`target-selector-btn-${idx}`}
                    >
                      <span>{isEn ? opt.labelEn : opt.labelVi}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* INPUT 2: Current Readiness (Mức độ hoàn thiện hồ sơ gốc) */}
              <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-300 block flex items-center gap-1.5">
                  <FileText size={12} className="text-[#C9A227]" />
                  {isEn ? 'Current Documentation Readiness:' : 'Mức độ sẵn sàng của Hồ sơ:'}
                </label>
                
                <div className="space-y-2">
                  {readinessOptions.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => setReadinessLevel(idx)}
                      className={`w-full text-left p-3 rounded transition-all duration-200 border flex items-center justify-between gap-3 cursor-pointer ${
                        readinessLevel === idx
                          ? 'bg-[#C9A227]/10 text-white border-[#C9A227]/70 shadow-[0_0_8px_rgba(201,162,39,0.08)]'
                          : 'bg-black text-slate-400 border-slate-900 hover:text-slate-200 hover:bg-black/60'
                      }`}
                      id={`readiness-selector-card-${idx}`}
                    >
                      <div className="space-y-0.5 max-w-[90%]">
                        <span className="text-xs font-bold text-white block">
                          {isEn ? opt.titleEn : opt.titleVi}
                        </span>
                        <span className="text-[10px] text-slate-400 block leading-tight">
                          {isEn ? opt.descEn : opt.descVi}
                        </span>
                      </div>
                      <div className={`h-3 w-3 rounded-full border ${
                        readinessLevel === idx ? 'border-[#C9A227] bg-[#C9A227]' : 'border-slate-800 bg-transparent'
                      }`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* INPUT 3: Scope of Service (Phạm vi muốn hợp tác tư vấn) */}
              <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-300 block flex items-center gap-1.5">
                  <Landmark size={12} className="text-[#C9A227]" />
                  {isEn ? 'Select Advisory Collaboration Scope:' : 'Phạm vi Dịch vụ Tư vấn mong muốn:'}
                </label>

                <div className="space-y-2">
                  {scopeOptions.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => setScopeOfService(idx)}
                      className={`w-full text-left p-3 rounded border transition-all duration-200 flex flex-col gap-1.5 cursor-pointer ${
                        scopeOfService === idx
                          ? 'bg-[#C9A227]/10 text-white border-[#C9A227]/70 shadow-[0_0_8px_rgba(201,162,39,0.08)]'
                          : 'bg-black text-slate-400 border-slate-900 hover:text-slate-200 hover:bg-black/60'
                      }`}
                      id={`scope-selector-card-${idx}`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs font-bold text-white">
                          {isEn ? opt.titleEn : opt.titleVi}
                        </span>
                        <span className="text-[9px] font-mono font-semibold tracking-wider bg-[#C9A227]/10 text-[#C9A227] px-2 py-0.5 rounded">
                          {isEn ? opt.feeTextEn : opt.feeTextVi}
                        </span>
                      </div>
                      <span className="text-[10.5px] text-slate-400 leading-normal block">
                        {isEn ? opt.descEn : opt.descVi}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Live Pricing Results Output - Right Column (5/12 width) */}
            <div className="lg:col-span-5 bg-gradient-to-b from-slate-950 to-black p-6 md:p-8 rounded border border-[#C9A227]/30 shadow-[0_4px_30px_rgba(201,162,39,0.06)] flex flex-col justify-between self-stretch" id="calculator-results-board">
              
              <div className="space-y-6">
                
                {/* Header card info */}
                <div className="text-center py-2.5 border-b border-slate-900">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#C9A227] font-bold block mb-1">
                    {isEn ? 'DYNAMIC PRO FORMA ESTIMATION' : 'ƯỚC TÍNH BÁO GIÁ QUY CHUẨN'}
                  </span>
                  <div className="flex items-center justify-center gap-1.5">
                    <div className="h-1.5 w-1.5 bg-[#C9A227] rounded-full animate-pulse" />
                    <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase font-mono">
                      {isEn ? 'CONFIDENTIAL LIVE OUTCOMES' : 'KẾT QUẢ DỰ TOÁN THAM KHẢO'}
                    </span>
                  </div>
                </div>

                {/* KPI Result 1: Retainer flat fee */}
                <div className="p-4 bg-slate-950 border border-slate-900 rounded space-y-1">
                  <span className="text-[10.5px] text-slate-300 block uppercase font-mono font-semibold">
                    {isEn ? 'ESTIMATED RETAINER FEE:' : 'ƯỚC TÍNH PHÍ TƯ VẤN ĐỊNH KỲ HÀNG THÁNG (RETAINER):'}
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3.5xl font-mono text-white font-bold tracking-tight">
                      {currency === 'VND'
                        ? `${estimatedRetainer} Triệu VNĐ`
                        : `$${estimatedRetainer.toLocaleString()}`
                      }
                    </span>
                    <span className="text-xs text-slate-400 font-medium font-mono">
                      {isEn ? '/month' : '/ tháng'}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 block leading-tight">
                    {isEn 
                      ? '*Covers ongoing model refining, packaging audits, and multi-tier VDR security operations.' 
                      : '*Bao gồm phân tích mô hình tài chính, chuẩn hóa tài liệu đầu tư và quản trị phòng dữ liệu bảo mật (VDR).'}
                  </span>
                </div>

                {/* KPI Result 2: Success retainer fee */}
                <div className="p-4 bg-slate-950 border border-slate-900 rounded space-y-1">
                  <span className="text-[10.5px] text-slate-300 block uppercase font-mono font-semibold">
                    {isEn ? 'ESTIMATED SUCCESS FEE RATIO:' : 'TỶ LỆ PHÍ TƯ VẤN THÀNH CÔNG DỰ KIẾN (SUCCESS FEE):'}
                  </span>
                  <div className="flex items-baseline gap-1">
                    {estimatedSuccessMin === '0.0' ? (
                      <span className="text-2xl sm:text-3.5xl font-mono text-slate-500 font-bold tracking-tight">
                        0.0%
                      </span>
                    ) : (
                      <span className="text-2xl sm:text-3.5xl font-mono text-[#C9A227] font-bold tracking-tight">
                        {estimatedSuccessMin}% - {estimatedSuccessMax}%
                      </span>
                    )}
                    <span className="text-xs text-slate-400 font-medium">
                      {isEn ? 'of cash raised' : 'trên tổng vốn giải ngân thực tế'}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 block leading-tight">
                    {estimatedSuccessMin === '0.0'
                      ? (isEn ? '*Flat project-based packaging fee model. No fundraising success incentives applied.' : '*Hợp đồng dịch vụ chỉ bao gồm đóng gói tài liệu, không bao gồm đại diện tiếp cận quỹ.')
                      : (isEn ? '*Payable only upon successful cross-border bank clearance.' : '*Phí thành công chỉ được phát sinh sau khi tiền thực sự đã được giải ngân thành công vào tài khoản doanh nghiệp.')
                    }
                  </span>
                </div>

                {/* KPI Result 3: Expected timeline */}
                <div className="p-4 bg-slate-950 border border-slate-900 rounded space-y-1">
                  <span className="text-[10.5px] text-slate-300 block uppercase font-mono font-semibold">
                    {isEn ? 'ESTIMATED INVESTMENT TIMELINE:' : 'TIẾN ĐỘ THỰC HIỆN DỰ KIẾN:'}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-mono text-white font-bold tracking-tight">
                      {estimatedTimelineMonths} {isEn ? 'Months' : 'Tháng'}
                    </span>
                    <span className="text-xs text-slate-400 font-normal">
                      ({estimatedTimelineWeeks} {isEn ? 'weeks approx.' : 'tuần'})
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 block leading-tight">
                    {isEn 
                      ? '*Subject to market liquidity, sector vertical alignment and DD response pacing.' 
                      : '*Tiến độ thực tế có thể thay đổi tùy thuộc vào tính chất pháp lý của doanh nghiệp và tiến độ rà soát pháp lý (due diligence) của nhà đầu tư.'}
                  </span>
                </div>

                {/* Fee-into-Equity conversion highlight notice */}
                <div className="p-3 bg-[#C9A227]/5 border border-[#C9A227]/20 rounded text-slate-400 leading-normal flex gap-2.5 items-start" id="fee-into-equity-tip">
                  <TrendingUp size={14} className="text-[#C9A227] shrink-0 mt-0.5" />
                  <p className="text-[10.5px] italic">
                    <strong className="text-[#C9A227] not-italic">
                      {isEn ? 'Fee-into-Equity Alignment Option: ' : 'Lựa chọn Chuyển đổi Phí thành Cổ phần (Fee-into-Equity): '}
                    </strong>
                    {isEn 
                      ? 'Select clients may convert up to 50% of success-linked incentives into share warrants/equity options.' 
                      : 'Để giảm áp lực dòng tiền và đồng hành dài hạn, AG Capital hỗ trợ cơ chế chuyển đổi tối đa 50% thù lao thành công thành cổ phần tương đương (Fee-into-Equity).'}
                  </p>
                </div>

              </div>

              {/* Call-to-action to proceed with secure intake registry */}
              <div className="space-y-3 mt-6 lg:mt-8 pt-4 border-t border-slate-900/60">
                <button
                   onClick={scrollToForm}
                  className="w-full py-3.5 bg-[#C9A227] hover:bg-[#B08D20] text-slate-950 font-bold rounded text-xs tracking-wider uppercase transition-all duration-300 shadow-[0_4px_15px_rgba(201,162,39,0.25)] flex items-center justify-center gap-2 hover:scale-[1.01] cursor-pointer"
                >
                  <span>
                    {isEn ? 'Apply Confidential Intake' : 'Đăng Ký Tham Vấn Ngay'}
                  </span>
                  <ArrowRight size={14} />
                </button>
                <p className="text-[9px] text-slate-500 text-center italic leading-tight">
                  {isEn 
                    ? '*Dynamic values are index-based model estimates. Formal bindings require bilateral NDA and custom engagement mandate execution.' 
                    : '*Các thông số trên đây chỉ mang tính chất dự toán tham khảo dựa trên mô hình chuẩn mực. Thỏa thuận ràng buộc pháp lý cụ thể sẽ được xác lập thông qua thỏa thuận song phương.'}
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 12.5 Submit Your Deal Form embed */}
      <section className="py-12 bg-[#02050A] border-y border-slate-900" id="founders-deal-submit-form">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C9A227]">
              {isEn ? 'SECURED INTAKE REGISTRY' : 'MỞ CỔNG TIẾP NHẬN YÊU CẦU'}
            </span>
            <h2 className="text-3xl font-sans font-medium text-white tracking-tight">
              {isEn ? 'Submit Your Confidential Enquiry' : 'Gửi Hồ sơ Đăng ký Tham vấn'}
            </h2>
            <p className="text-xs text-slate-400">
              {isEn ? 'Fields marked with * are strictly required to evaluate strategic alignment.' : 'Các trường thông tin có đánh dấu (*) là bắt buộc để hỗ trợ quá trình đánh giá sơ bộ mức độ sẵn sàng chiến lược.'}
            </p>
          </div>

          <DealSubmissionForm language={language} />
        </div>
      </section>

      {/* 12.6 FAQ Accordion */}
      <section className="py-12 bg-[#000]" id="founders-faqs">
        <div className="max-w-4xl mx-auto px-4 text-left">
          <div className="text-center mb-16">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C9A227]">
              {isEn ? 'KNOWLEDGE ACCUMULATION' : 'CƠ SỞ DỮ LIỆU THAM KHẢO'}
            </span>
            <h2 className="text-3xl font-sans text-white tracking-tight mt-2">
              {isEn ? 'Frequently Asked Questions' : 'Các Câu Hỏi Thường Gặp (FAQs)'}
            </h2>
          </div>

          <div className="space-y-3" id="faqs-accordion-set">
            {faqData.map((faq, fIdx) => {
              const isOpen = openFaqIndex === fIdx;
              return (
                <div
                  key={fIdx}
                  className="border border-slate-900 bg-slate-950/60 rounded overflow-hidden transition-colors"
                  id={`faq-item-${fIdx}`}
                >
                  <button
                    onClick={() => toggleFaq(fIdx)}
                    className="w-full flex items-center justify-between p-5 text-left text-white hover:text-[#C9A227] focus:outline-none transition-colors"
                  >
                    <span className="text-sm font-semibold tracking-tight pr-5">
                      {isEn ? faq.qEn : faq.qVi}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-[#C9A227] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-900 bg-[#000]/20">
                      {isEn ? faq.aEn : faq.aVi}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
