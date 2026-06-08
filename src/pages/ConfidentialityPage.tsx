/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PageId, Language } from '../types';

interface ConfidentialityPageProps {
  language: Language;
}

export default function ConfidentialityPage({ language }: ConfidentialityPageProps) {
  const isEn = language === 'EN';

  return (
    <div className="flex flex-col min-h-screen bg-[#02050A]" id="corporate-confidentiality-page">
      {/* Hero */}
      <section className="relative pt-36 pb-20 bg-gradient-to-b from-[#101F35]/30 to-transparent border-b border-slate-900" id="confidentiality-hero">
        <div className="max-w-4xl mx-auto px-4 text-left">
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#C9A227] block mb-3 font-bold">
            {isEn ? 'LEGAL DISCLOSURE' : 'THÔNG TIN BÁO CÁO PHÁP LÝ'}
          </span>
          <h1 className="text-3xl font-sans font-medium text-white tracking-tight">
            {isEn ? 'Confidentiality Notice' : 'Thông cáo về Cam kết Bảo mật'}
          </h1>
          <p className="text-xs text-slate-500 mt-2 font-mono">
            {isEn ? 'Effective date: June 1, 2026' : 'Hiệu lực áp dụng: Ngày 1 tháng 6 năm 2026'}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-[#000]" id="confidentiality-content">
        <div className="max-w-4xl mx-auto px-4 text-left prose prose-invert text-slate-300 text-xs sm:text-sm space-y-8 leading-relaxed">
          {isEn ? (
            <>
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white tracking-tight">1. Confidentiality by Design</h3>
                <p>
                  At AG Capital Advisory, safeguarding intellectual assets and operating metrics is integrated directly into our workflow. We understand that leaked operational indices can compromise brand positioning and weaken founder negotiation levers with investors.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white tracking-tight">2. Information Classification</h3>
                <p>
                  Any records submitted via this portal, including company metrics lists, financial predictions, transaction histories, capitalization tables, or investor discussion drafts, are classified as Level-1 Confidential Assets. No internal data is shared externally without formal, project-specific written consent.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white tracking-tight">3. Structured Data Access Controls</h3>
                <p>
                  Our internal cloud repositories enforce strict credential keys. Credentials are audit-logged, preventing unsolicited duplication of corporate files or financial models.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white tracking-tight">4. Execution of NDA</h3>
                <p>
                  We execute custom, bilateral Non-Disclosure Agreements (NDAs) with all prospective clients prior to requesting accounting ledgers, employee records, or detailed historical capitalization tables.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white tracking-tight">1. Nguyên tắc Bảo mật làm Chủ đạo</h3>
                <p>
                  Bảo lưu bí mật kinh doanh và an toàn chỉ số kinh tế cho chủ thương hiệu là văn hóa cốt tử của AG Capital Advisory. Chúng tôi hiểu rằng việc xòe rò rỉ chỉ số thô sẽ dìm bớt đáng kể vị thế đàm phán của nhà sáng lập với các ban bệ quỹ và làm gia tăng lợi thế phi cạnh tranh cho đối thủ.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white tracking-tight">2. Phân loại Cấp bậc Dữ liệu Mật</h3>
                <p>
                  Mọi tệp tin, sơ thảo pitch deck, mô phỏng margin giá gốc được nộp qua biểu mẫu đăng kí này đều lập ước lưu giữ dưới dạng Khối Tài sản Mật Cấp 1 (Level-1 Confidential Assets). Chúng tôi lập định cơ chế lưu vết gắt gao hành vi sao chép nội bộ bừa bãi.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white tracking-tight">3. Định chế và Mã hóa Phân quyền</h3>
                <p>
                  Hệ thống quản lý dữ liệu số (VDR nội bộ) vận hành bởi cơ chế khóa đa lớp, tự liên thông lưu vết lịch sử người tải. Partner phụ trách thương vụ chịu trách rà soát quản lý chặt chẽ thông tin từng vòng, ngăn dơ rò rỉ.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white tracking-tight">4. Cam kết Ký kết Thỏa thuận NDA</h3>
                <p>
                  Chúng tôi luôn yêu cầu và thực thi ký Thỏa thuận Biên bản bảo mật thông tin song phương (NDA) có giá trị thi hành pháp luật đầy đủ trước thời điểm yêu cầu sáng lập gửi báo cáo tài chính kiểm toán chi tiết của các năm cũ.
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
