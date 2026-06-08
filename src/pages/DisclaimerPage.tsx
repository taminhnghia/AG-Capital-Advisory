/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PageId, Language } from '../types';

interface DisclaimerPageProps {
  language: Language;
}

export default function DisclaimerPage({ language }: DisclaimerPageProps) {
  const isEn = language === 'EN';

  return (
    <div className="flex flex-col min-h-screen bg-[#02050A]" id="corporate-disclaimer-page">
      <section className="relative pt-36 pb-20 bg-gradient-to-b from-[#101F35]/30 to-transparent border-b border-slate-900" id="disclaimer-hero">
        <div className="max-w-4xl mx-auto px-4 text-left">
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#C9A227] block mb-3 font-bold">
            {isEn ? 'LEGAL DISCLOSURE' : 'THÔNG TIN BÁO CÁO PHÁP LÝ'}
          </span>
          <h1 className="text-3xl font-sans font-medium text-white tracking-tight font-sans">
            {isEn ? 'Advisory Disclaimer' : 'Tuyên bố Miễn trừ Trách nhiệm Tư vấn'}
          </h1>
          <p className="text-xs text-slate-500 mt-2 font-mono">
            {isEn ? 'Effective date: June 1, 2026' : 'Hiệu lực áp dụng: Ngày 1 tháng 6 năm 2026'}
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#000]" id="disclaimer-content">
        <div className="max-w-4xl mx-auto px-4 text-left prose prose-invert text-slate-300 text-xs sm:text-sm space-y-8 leading-relaxed">
          {isEn ? (
            <>
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white tracking-tight">1. Scope of Advisory</h3>
                <p>
                  AG Capital Advisory provides capital preparation, governance improvement diagnostics, and professional strategic advisory. We do not provide licensed public audit, investment banking underwriting services, or direct corporate registration agency filings. No information on this website constitutes an offer to sell or the solicitation of an offer to buy securities.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white tracking-tight">2. No Fundraising Guarantees</h3>
                <p>
                  Securing investment depends on numerous variables including individual company performance, macro market conditions, investor liquidity cycles, and valuation alignments. AG Capital Advisory does not guarantee fundraising outcomes, closing timelines, or access to third-party strategic cash.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white tracking-tight">3. Legal & Regulatory Compliance</h3>
                <p>
                  Our services are offered in compliance with relevant local statutes governing consulting activities in Vietnam. All corporate structural reforms, equity issuance documents, shareholder voting agreements, and binding terms should be checked by licensed legal and tax counsel in Vietnam before execution.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white tracking-tight">1. Bản chất Hoạt động Tư vấn</h3>
                <p>
                  AG Capital Advisory chịu trách nhiệm thiết lập các báo cáo đánh giá thực trạng quản lý, chuẩn vị phòng dữ liệu, hoàn thiện tệp tài liệu và định hướng kết nối quỹ chiến lược. Chúng tôi không hoạt động như đại lý chào bán môi giới đại chúng chứng khoán ra công chúng hay cung cấp dịch vụ kiểm toán công chứng bắt buộc pháp quy. Không một thông tin nào trên trang web này cấu thành lời khuyên đầu tư cụ thể.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white tracking-tight">2. Miễn trừ bảo chứng thành bài gọi vốn</h3>
                <p>
                  Hành trình gọi giải ngân vốn chịu sự phán định của muôn vàn thách thức vĩ mô nằm ngoài khả năng can thiệp trực tiếp của trung gian tài chính. Do vậy, chúng tôi hoàn toàn miễn trừ trách bảo đảm kết quả kết hôn hoặc tiến độ cụ thể của việc giải ngân tài chính ròng từ các quỹ.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white tracking-tight">3. Thẩm duyệt Pháp luật & Thuế nội địa</h3>
                <p>
                  Phạm vi chuyên môn tư vấn nằm trong văn khuôn pháp luật Việt Nam điều hành ngành nghề Dịch vụ Tư vấn. Mọi cam kết cổ phần, phát hành cổ phiếu thưởng thực tế, điều chuyển tỷ lệ biểu quyết bắt buộc phải được gửi để rà soát chứng thực ranh giới pháp lý bởi hội luật sư Việt Nam.
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
