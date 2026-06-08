/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PageId, Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { Anchor, ShieldAlert, Award, Star, Library, FileText, Calendar, DollarSign, TrendingUp, Users } from 'lucide-react';

interface AlignmentPageProps {
  language: Language;
  setActivePage: (page: PageId) => void;
  onBookDiscussionClick: () => void;
}

export default function AlignmentPage({ language, setActivePage, onBookDiscussionClick }: AlignmentPageProps) {
  const t = (key: string) => TRANSLATIONS[language][key] || key;
  const isEn = language === 'EN';

  return (
    <div className="flex flex-col min-h-screen bg-[#02050A]" id="corporate-alignment-page">
      {/* Hero Header */}
      <section className="relative pt-36 pb-10 bg-gradient-to-b from-[#101F35]/30 to-transparent border-b border-slate-900" id="alignment-hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C9A227] block mb-3">
            {isEn ? 'THE ALIGNMENT PATTERN' : 'MÔ HÌNH ĐỒNG HÀNH GẮN KẾT LỢI ÍCH'}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-medium tracking-tight text-white max-w-4xl leading-tight font-sans">
            {isEn
              ? 'Our Interests are Aligned With Your Long-Term Success'
              : 'Cơ Chế Hợp Tác Uy Tín: Đồng Hành Cùng Tăng Trưởng Bền Vững'}
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-4 max-w-2xl leading-relaxed">
            {isEn
              ? 'We do not operate as high-volume transactional broker. We succeed only when your business secures the right capital on terms that sustain long-term value.'
              : 'AG Capital Advisory không hoạt động như một đơn vị môi giới trung gian thương mại thuần túy. Chúng tôi chỉ thành công khi doanh nghiệp của bạn tiếp nhận được dòng vốn phù hợp cùng các điều khoản bảo toàn giá trị bền vững.'}
          </p>
        </div>
      </section>

      {/* 13.1 Selective Commitment & 13.2 Fee-Into-Equity */}
      <section className="py-10 bg-[#000]" id="alignment-content-blocks">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4 text-left">
              <span className="font-mono text-xs font-bold text-[#C9A227] tracking-wider uppercase block">
                {isEn ? '01 / SELECTIVE ALLOCATION' : '01 / SỐ LƯỢNG CHỌN LỌC'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-sans text-white tracking-tight">
                {isEn ? 'Selective Over Mass Engagement' : 'Ưu tiên Chất lượng thay vì Quy mô Số lượng'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {isEn
                  ? 'Traditional brokers accept dozens of client decks, blast them indiscriminately to generic email distribution lists, and hope for a lucky matching hit. This approach damages your business reputation, leaks sensitive metrics to competitors, and triggers early investor fatigue.'
                  : 'Nhiều bên môi giới truyền thống thường tiếp nhận hồ sơ đại trà, rồi gửi phát tán diện rộng thiếu kiểm soát đến danh sách email chung của các quỹ. Phương thức tiếp cận này dễ làm ảnh hưởng đến uy tín thương hiệu, rò rỉ các chỉ số tài chính nhạy bén ra thị trường và gây tâm lý ngần ngại cho các nhà đầu tư.'}
              </p>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pt-2">
                {isEn
                  ? 'We do the opposite. Our boutique allocation restricts active client engagements to a carefully select handful of businesses at any single point in time. This guarantees that your business receives customized strategic preparation and confidential, direct access to qualified, active capital.'
                  : 'Chúng tôi thực thi triết lý hoàn toàn khác biệt. Với mô hình tư vấn chuyên biệt (Boutique), số lượng dự án đồng hành tại cùng một thời điểm luôn được giới hạn chặt chẽ. Điều này đảm bảo doanh nghiệp của bạn nhận được sự chuẩn bị chiến lược sâu sát nhất và tiếp cận trực tiếp các nhà đầu tư phù hợp dưới sự bảo mật tuyệt đối.'}
              </p>
            </div>

            <div className="bg-slate-950 p-8 rounded border border-[#C9A227]/25 space-y-4 relative text-left" id="fee-into-equity-card">
              <span className="font-mono text-[9px] tracking-widest text-[#C9A227] block font-bold">
                {isEn ? 'INNOVATIVE COMPENSATION' : 'PHƯƠNG THỨC HỢP TÁC LINH HOẠT'}
              </span>
              <h3 className="text-xl font-bold font-sans text-white">
                {isEn ? 'Fee-into-Equity Model' : 'Mô hình Chuyển đổi Phí thành Cổ phần (Fee-into-Equity)'}
              </h3>
              <p className="text-xs leading-relaxed text-slate-400">
                {isEn
                  ? 'We believe in aligning our incentives with your capital outcomes. For selected, high-fit corporate mandates, AG Capital Advisory offers options to convert a pre-agreed portion of our success consulting fee into equity shares, warrants, or convertible instruments.'
                  : 'Chúng tôi tin vào việc gắn kết lợi ích cùng sự bứt phá của doanh nghiệp. Đối với các dự án đạt chuẩn tuyển chọn và có mức độ cam kết cao, AG Capital áp dụng cơ chế hoán đổi một phần phí dịch vụ thành công thành cổ phần phổ thông thương mại hoặc quyền chọn chứng quyền tương đương.'}
              </p>
              <div className="pt-4 border-t border-slate-900 flex justify-between items-center">
                <span className="text-[10px] font-mono text-slate-500 uppercase">
                  {isEn ? 'Interests aligned' : 'Sự gắn kết lợi ích'}
                </span>
                <span className="text-xs text-[#C9A227] font-semibold">
                  100% {isEn ? 'Long-term Aligned' : 'Đồng hành dài hạn'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Five-Tier Fee Structure Section */}
      <section className="py-10 bg-[#000] border-b border-slate-900" id="five-tier-fee-structure">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C9A227]">
              {isEn ? 'FEE & RETENTION STRUCTURE' : 'CƠ CẤU PHÍ & HOẠT ĐỘNG'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-sans text-white tracking-tight">
              {isEn ? 'Five-Tier Retention Model' : 'Khung Biểu phí 5 Cấu phần Linh hoạt'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {isEn
                ? 'We align pricing with stages and complexity, ensuring highly specialized boutique care for consumer founders.'
                : 'Chúng tôi thiết lập cơ cấu biểu phí theo tính chất, quy mô và mức độ phức tạp để bảo đảm tính chuyên biệt cao nhất.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-left" id="fee-tier-grid">
            {[
              {
                icon: FileText,
                num: 'Tier 01',
                title: isEn ? 'Project-Based Retainer' : 'Phí Tư vấn theo Dự án',
                desc: isEn
                  ? 'Customized retainer per project based on transaction size, complexity, and materials required.'
                  : 'Phí dịch vụ cố định được xác lập cụ thể dựa trên quy mô thương vụ, khối lượng tài liệu cần chuẩn hóa và mức độ phức tạp của hồ sơ.',
              },
              {
                icon: Calendar,
                num: 'Tier 02',
                title: isEn ? 'Monthly Recurring Retainer' : 'Phí Tư vấn Định kỳ Hàng tháng (Retainer Fee)',
                desc: isEn
                  ? 'Monthly recurring structure for continuous board reporting, cap table governance, and management support.'
                  : 'Duy trì nguồn lực chuyên gia giải quyết các vấn đề liên quan đến báo cáo HĐQT, kiểm soát cơ cấu cổ đông và đồng hành cố vấn vận hành liên tục.',
              },
              {
                icon: DollarSign,
                num: 'Tier 03',
                title: isEn ? 'Direct Success Commission' : 'Phí Tư vấn Thành công (Success Fee)',
                desc: isEn
                  ? 'Standard success fee applied strictly on completed transaction closures or strategic M&A completions.'
                  : 'Khoản phí thành công được áp dụng sòng phẳng trên lượng vốn thực tế được giải ngân thành công vào tài khoản doanh nghiệp theo các điều khoản chuyển nhượng.',
              },
              {
                icon: TrendingUp,
                num: 'Tier 04',
                title: isEn ? 'Fee-into-Equity Conversion' : 'Phí Chuyển đổi Cổ phần (Fee-into-Equity)',
                desc: isEn
                  ? 'Option to convert up to 30%-50% of success commissions into company equity to fully align long-term interests.'
                  : 'Lựa chọn chuyển đổi tối đa 30% - 50% phí thành công thành cổ phần sở hữu hoặc chứng quyền dài hạn của doanh nghiệp.',
              },
              {
                icon: Users,
                num: 'Tier 05',
                title: isEn ? 'Governance & Board Representation' : 'Phí Tư vấn Thường niên & Đại diện Hội đồng Quản trị',
                desc: isEn
                  ? 'Independent advisory representation fee for monitoring allocation thresholds and attending BOD sessions.'
                  : 'Thù lao hỗ trợ giám sát sử dụng vốn hậu thương vụ, duy trì tính ổn định của hệ thống quản trị và kiểm soát hạn mức phê duyệt ngân sách.',
              },
            ].map((tier, tIdx) => (
              <div
                key={tIdx}
                className="bg-slate-950 p-6 rounded border border-slate-900 flex flex-col justify-between hover:border-[#C9A227]/40 transition group"
                id={`fee-tier-box-${tIdx}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <tier.icon className="text-[#C9A227] group-hover:scale-110 transition" size={20} />
                    <span className="font-mono text-[9px] font-bold text-slate-500 uppercase">{tier.num}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white mb-2 leading-snug">{tier.title}</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed font-sans">{tier.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Advantages */}
      <section className="py-10 bg-[#02050A] border-y border-slate-900" id="alignment-advantages">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C9A227]">
            {isEn ? 'BRAND DIFFERENCES' : 'GIÁ TRỊ KHÁC BIỆT'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-sans text-white tracking-tight mt-2 mb-12">
            {isEn ? 'Why True Alignment Matters' : 'Sự Khác Biệt từ Tư Duy Đồng Hành Thực Chất'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left" id="advantages-grid">
            {[
              {
                icon: Anchor,
                title: isEn ? 'Protects Focus & Energy' : 'Tối ưu hóa Thời gian và Tập trung',
                desc: isEn
                  ? 'We handle structured preparation and early data room matching so you can run the business without fundraising fatigue.'
                  : 'Chúng tôi chịu trách nhiệm toàn bộ khâu chuẩn bị tài liệu kỹ thuật tài chính và thiết lập phòng dữ liệu (VDR), giúp nhà sáng lập tập trung tối đa duy trì cốt lõi vận hành.',
              },
              {
                icon: ShieldAlert,
                title: isEn ? 'Defends Your Valuation' : 'Bảo toàn Sức khỏe Định giá',
                desc: isEn
                  ? 'By cleaning up silent holdings and organizing clear management reports, we prevent aggressive due diligence discounts.'
                  : 'Bằng hoạt động kiểm duyệt, dọn dẹp cơ cấu gốc cổ phần mập mờ và thống nhất dữ liệu báo cáo, chúng tôi giảm thiểu rủi ro bị ép định giá khi làm việc cùng các quỹ.',
              },
              {
                icon: Award,
                title: isEn ? 'Ensures Selective Match' : 'Tiếp cận Trọng điểm đúng Khẩu vị',
                desc: isEn
                  ? 'We introduce deals only to funds who are actively deploying, understand the consumer economy, and support scalability.'
                  : 'Hồ sơ được giới thiệu chọn lọc và kín kẽ đến những nhà đầu tư đang có hoạt động giải ngân tích cực, am hiểu sâu sắc bức tranh tiêu dùng địa phương.',
              },
            ].map((adv, aIdx) => (
              <div
                key={aIdx}
                className="p-6 rounded bg-slate-950 border border-slate-900 flex flex-col justify-between"
                id={`alignment-advantage-card-${aIdx}`}
              >
                <div>
                  <adv.icon className="text-[#C9A227] mb-4" size={24} />
                  <h4 className="text-sm font-semibold text-white mb-2">{adv.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{adv.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-12 bg-[#000]" id="alignment-closing-cta">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-sans font-medium text-white tracking-tight text-sans">
            {isEn
              ? 'Work with a partner that measures value over volume.'
              : 'Cùng làm việc với một đối tác xem trọng giá trị thực chất thay vì số lượng giao dịch đại trà.'}
          </h2>
          <div className="pt-2">
            <button
              onClick={onBookDiscussionClick}
              className="px-8 py-3.5 bg-[#C9A227] hover:bg-[#D4AF37] text-black font-semibold text-xs tracking-wider uppercase rounded"
            >
              {isEn ? 'Start a Discussion' : 'Đặt lịch Tham vấn Bảo mật'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
