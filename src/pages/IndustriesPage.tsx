/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PageId, Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { ShoppingBag, Store, Utensils, Smartphone, Globe, BarChart2, CheckCircle2 } from 'lucide-react';

interface IndustriesPageProps {
  language: Language;
  setActivePage: (page: PageId) => void;
  onSubmitDealClick: () => void;
}

export default function IndustriesPage({ language, setActivePage, onSubmitDealClick }: IndustriesPageProps) {
  const t = (key: string) => TRANSLATIONS[language][key] || key;
  const isEn = language === 'EN';

  const industryData = [
    {
      id: 'fmcg',
      num: '01',
      icon: ShoppingBag,
      title: t('IND_1_TITLE'),
      content: isEn
        ? 'Packaged foods, beverages, personal care, household products and scalable consumer brands operating in high-volume urban or rural trade networks.'
        : 'Thực phẩm đóng gói, đồ uống đóng chai, hóa phẩm gia dụng, sản phẩm chăm sóc cá nhân có độ phủ kệ phân phối đại lý truyền thống (GT) hoặc đa kênh tiện ích (MT).',
      metrics: isEn
        ? [
            'Revenue growth (CAGR / YoY trend)',
            'Gross margin percentages (target: 40-50%+)',
            'Distribution reach (registered active outlets)',
            'Repeat purchase & brand affinity indices',
            'Inventory day-turns & factory capacity run-rate',
            'Core brand strength & marketing ROI thresholds',
          ]
        : [
            'Tốc độ tăng trưởng doanh thu (YoY / CAGR định kỳ)',
            'Phần trăm biên lợi nhuận gộp (mục tiêu chuẩn: từ 40% - 50%+)',
            'Độ phủ phân phối kênh GT/MT (số cổng bán đại lý kích hoạt thực tế)',
            'Tần suất mua lặp lại và chỉ số sức khỏe thương hiệu',
            'Tỷ lệ vòng quay hàng tồn kho và tải trọng bảo dưỡng nhà máy',
            'Chỉ số ROI của chiết khấu phân phối và hiệu suất quảng bá',
          ],
    },
    {
      id: 'retail',
      num: '02',
      icon: Store,
      title: t('IND_2_TITLE'),
      content: isEn
        ? 'Retail chains, specialty stores, pharmacy networks, cosmetics boutiques, and omnichannel direct-to-consumer models scaling regional footprints.'
        : 'Chuỗi điểm bán lẻ, cửa hàng chuyên biệt, chuỗi dược phẩm tiện ích, chuỗi mỹ phẩm thời trang D2C nhân rộng diện mạo thương mại tại các thành đô lớn.',
      metrics: isEn
        ? [
            'Store-level unit economics (CAPEX payback)',
            'Same-Store Sales Growth (SSSG) trends',
            'Inventory turnover days in hub and stores',
            'Payback period per new outlet launch',
            'Expansion readiness index (SOP standardization)',
            'Customer acquisition cost vs. footfall yield',
          ]
        : [
            'Kinh tế học đơn điểm cửa hàng (tải trọng hoàn vốn CAPEX đầu tư)',
            'Tăng trưởng doanh số so sánh cùng điểm bán (chỉ số sức khỏe SSSG)',
            'Số ngày vòng quay hàng hóa tại tổng kho trung tâm và kệ lẻ',
            'Thời gian hoàn vốn ròng của một điểm khai trương mới',
            'Độ chuẩn hóa quy chế quy trình chuỗi (SOP sẵn sàng nhân bản)',
            'Chi phí chuyển đổi kéo khách tại vị trí so sánh doanh số ròng',
          ],
    },
    {
      id: 'fb',
      num: '03',
      icon: Utensils,
      title: t('IND_3_TITLE'),
      content: isEn
        ? 'Scalable restaurant concepts, café chains, bakery franchises, and innovative delivery-first food platforms with solid brand traction.'
        : 'Chuỗi ẩm thực ăn uống phục vụ tại chỗ, chuỗi cà phê trà sữa, thương hiệu nhượng quyền bánh ngọt, mô hình cloud kitchen có độ nhận diện cao.',
      metrics: isEn
        ? [
            'Unit economics and store-level EBITDA',
            'Material cost margins (COGS control limits)',
            'Store-level profitability within 3 months',
            'Replication potential and franchise readiness',
            'Customer retention & average bill value indices',
            'Delivery vs. dine-in revenue distribution ratios',
          ]
        : [
            'Biên nội nhuận tối ưu EBITDA đơn điểm bán lẻ',
            'Kiểm soát chi phí nguyên vật liệu (COGS cốt lõi ẩm thực)',
            'Thời gian đạt EBITDA dương của một điểm bán mới (Target < 3 tháng)',
            'Mức độ đóng gói nhượng quyền thương mại (franchise readiness)',
            'Tỷ lệ khách quay lại và giá trị trung bình trên một hóa đơn (AOV)',
            'Cơ cấu cân bằng doanh thu bán lẻ trực tiếp so với giao đồ online',
          ],
    },
    {
      id: 'tech',
      num: '04',
      icon: Smartphone,
      title: t('IND_4_TITLE'),
      content: isEn
        ? 'Consumer-facing technology platforms supporting commerce, online loyalty ecosystem, social commerce tools, and transaction gateways.'
        : 'Ứng dụng công nghệ hướng tới khách hàng, giải pháp tiện ích thanh toán tích điểm, ứng dụng thương mại đa kênh xã hội, cổng dịch vụ tiêu dùng.',
      metrics: isEn
        ? [
            'Monthly Active Users (MAU) & retention rates',
            'Retention curves of core user cohorts',
            'Monetization run-rate & transaction volumes',
            'Customer Acquisition Cost (CAC) vs. LTV scale',
            'Lifetime Value (LTV) models validated',
            'Net Promoter Score (NPS) tracking',
          ]
        : [
            'Số thành viên dùng app hàng tháng (MAU) và tỷ lệ mở lại app',
            'Biểu đồ dốc duy trì hoạt động người dùng theo cohort tháng',
            'Mức hóa doanh thu qua phí giao dịch (monetization rate)',
            'Chi phí kéo đổi một thành viên (CAC) so sánh Giá trị trọn đời (LTV)',
            'Định lượng giá trị sử dụng lâu dài (LTV model)',
            'Xét điểm tương tác hài lòng ròng khảo sát NPS',
          ],
    },
    {
      id: 'ecommerce',
      num: '05',
      icon: Globe,
      title: t('IND_5_TITLE'),
      content: isEn
        ? 'Digital-first consumer brands, social commerce businesses, specialized omnichannel marketplaces, and logistical e-commerce enablers.'
        : 'Các nhãn hàng bản địa khởi nguồn số D2C, bán hàng thương mại mạng xã hội hàng đầu, sàn ngành hàng chuyên biệt và hậu cần bổ trợ thương điện.',
      metrics: isEn
        ? [
            'Topline revenue growth & digital marketing CAC',
            'Repeat purchase frequencies & multi-item buying',
            'Logistical fulfillment efficiency & return rate',
            'Digital marketing spend efficiency (ROAS margins)',
            'Contribution margin 1 & 2 after fulfillment costs',
            'Omnichannel conversion ratios (web to store)',
          ]
        : [
            'Doanh thu ròng kênh số và chi phí tiếp thị số CAC',
            'Tần số đặt hàng lặp lại và sản phẩm gộp trên một giỏ hàng',
            'Tỷ lệ hoàn trả hàng (return rate) và hiệu suất xử lý đơn ship',
            'Chỉ số sinh lời trên chi phí quảng cáo số (ROAS có biên)',
            'Biên lợi nhuận đóng góp (Contribution margin 1 và 2 hậu giao vận)',
            'Độ chuyển dịch khách ảo lên hạ tầng trải nghiệm thực đa kênh',
          ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#02050A]" id="corporate-industries-page">
      {/* Hero Header */}
      <section className="relative pt-36 pb-10 bg-gradient-to-b from-[#101F35]/30 to-transparent border-b border-slate-900" id="industries-hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C9A227] block mb-3">
            {isEn ? 'THE ECOSYSTEM' : 'ĐỊA BÀN CHUYÊN SÂU'}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-medium tracking-tight text-white max-w-4xl leading-tight font-sans">
            {isEn ? 'Focused Expertise Across Vietnam’s Consumer Economy' : 'Am hiểu Chuyên sâu về Nền Kinh tế Tiêu dùng Việt Nam'}
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-4 max-w-2xl leading-relaxed">
            {isEn
              ? 'We focus on sectors where market traction, brand relevance, distribution capability and operating discipline create investable value.'
              : 'Chúng tôi chỉ dồn trí tuệ tập trung rà soát các lĩnh vực nơi sức mua nội địa, mạng lưới kênh phân phối và kỷ luật dòng vốn định danh giá trị vững cho doanh nghiệp.'}
          </p>
        </div>
      </section>

      {/* Industries grid listing */}
      <section className="py-10 bg-[#000]" id="industries-detailed-list">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {industryData.map((ind, indIdx) => {
            const IconComponent = ind.icon;
            return (
              <div
                key={ind.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start p-8 rounded bg-slate-950 border border-slate-900 hover:border-[#C9A227]/30 transition group duration-500"
                id={`industry-detail-${ind.id}`}
              >
                {/* Left block of industry item */}
                <div className="lg:col-span-5 space-y-4 text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#C9A227] tracking-wider">
                      SECTOR {ind.num}
                    </span>
                    <span className="h-[1px] w-8 bg-[#C9A227]/30" />
                  </div>
                  <div className="flex items-center gap-3">
                    <IconComponent className="text-[#C9A227]" size={24} />
                    <h3 className="text-xl font-bold text-white group-hover:text-[#C9A227] transition">
                      {ind.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pt-2">
                    {ind.content}
                  </p>
                </div>

                {/* Right block: Metrics scrutinized by Private Equity / Strategic partners */}
                <div className="lg:col-span-7 bg-black p-6 rounded border border-slate-900">
                  <div className="flex items-center gap-1.5 mb-4 text-[#C9A227]">
                    <BarChart2 size={14} />
                    <span className="text-[10px] font-mono tracking-widest uppercase font-bold">
                      {isEn ? 'CORE DUE-DILIGENCE SCORING METRICS' : 'CÁC VĂN BẢN VÀ THÔNG SỐ ĐẦU TƯ RÀ SOÁT'}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {ind.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="flex items-start gap-2 text-xs text-slate-300 text-left">
                        <CheckCircle2 className="text-[#C9A227]/80 shrink-0 mt-0.5" size={13} />
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-[#02050A] border-t border-slate-900" id="industries-closing-cta">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-sans font-medium text-white tracking-tight">
            {isEn ? 'Building a consumer business with real traction?' : 'Bạn đang làm chủ thương hiệu tiêu dùng giàu tiềm năng?'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            {isEn
              ? 'Our selective advisory allocation matches senior attention with rigorous preparation pipelines. Share your objectives with our team.'
              : 'Năng lực xử lý boutique có giới hạn giúp duy trì chất lượng cao hàng đầu cho việc bảo mật hồ sơ thương vụ của bạn.'}
          </p>
          <div className="pt-2">
            <button
              onClick={onSubmitDealClick}
              className="px-8 py-3.5 bg-[#C9A227] hover:bg-[#D4AF37] text-black font-semibold text-xs tracking-wider uppercase rounded shadow-lg"
            >
              {isEn ? 'Share Your Opportunity' : 'Gửi đề xuất gọi vốn'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
