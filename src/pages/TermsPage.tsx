/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PageId, Language } from '../types';

interface TermsPageProps {
  language: Language;
}

export default function TermsPage({ language }: TermsPageProps) {
  const isEn = language === 'EN';

  return (
    <div className="flex flex-col min-h-screen bg-[#02050A]" id="corporate-terms-page">
      <section className="relative pt-36 pb-20 bg-gradient-to-b from-[#101F35]/30 to-transparent border-b border-slate-900" id="terms-hero">
        <div className="max-w-4xl mx-auto px-4 text-left">
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#C9A227] block mb-3 font-bold">
            {isEn ? 'LEGAL DISCLOSURE' : 'THÔNG TIN BÁO CÁO PHÁP LÝ'}
          </span>
          <h1 className="text-3xl font-sans font-medium text-white tracking-tight">
            {isEn ? 'Terms of Use' : 'Điều khoản Sử dụng Hệ thống'}
          </h1>
          <p className="text-xs text-slate-500 mt-2 font-mono">
            {isEn ? 'Effective date: June 1, 2026' : 'Hiệu lực áp dụng: Ngày 1 tháng 6 năm 2026'}
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#000]" id="terms-content">
        <div className="max-w-4xl mx-auto px-4 text-left prose prose-invert text-slate-300 text-xs sm:text-sm space-y-8 leading-relaxed">
          {isEn ? (
            <>
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white tracking-tight">1. General Provisions</h3>
                <p>
                  Accessing, browsing, and submitting data through the AG Capital Advisory portal constitutes full electronic acceptance of these Terms. If you do not accept these provisions, please discontinue utilizing this digital dashboard immediately.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white tracking-tight">2. No Advisory Relationship Created</h3>
                <p>
                  This portal’s contents, including articles, calculators, checklists, and templates, are for educational, high-level illustrative, and informational purposes only. Submitting data, contacting us, or requesting a pre-screening call does not construct a professional client-advisor relationship. A formal relationship occurs exclusively upon signing a physical consultation contract.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white tracking-tight">3. User Representation & Warranties</h3>
                <p>
                  By submitting deal information, financial figures, or company profiles, users warrant and represent that they possess the necessary legal authority to share these indicators and that the information provided is structurally accurate and not misleading.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white tracking-tight">4. Limitation of Liability</h3>
                <p>
                  In no event will AG Capital Advisory or its affiliates be liable for any direct, indirect, or consequential damages resulting from the use or inability to use this platform, including errors in models, templates, or calculations provided herein.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white tracking-tight">1. Quy khế Thỏa ước chung</h3>
                <p>
                  Việc quý vị truy cập hệ thống trang tin hay tự khai số liệu qua hệ thống bảng tính của AG Capital Advisory biểu thị sự chấp thuận điện tử trọn vẹn của quý đối tác với Điều khoản này. Nếu không tán đồng, vui lòng tắt liên kết truy cập hệ thống ngay lập tức.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white tracking-tight">2. Không Thành lập Giao ước Khách hàng lập tức</h3>
                <p>
                  Toàn bộ tài nguyên lưu trữ trên trang web (bài nghiên cứu, bảng tính điểm, danh mục checklist) chỉ mang định chế tham khảo lý thuyết sơ khởi. Hành vi điền tờ trình của sáng lập hoàn toàn chưa tạo lập quan hệ đại diện tư vấn hữu hảo chính thức cho tới khi có hợp đồng dịch vụ ký tươi.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white tracking-tight">3. Cam kết Tính hợp pháp của Số liệu gửi</h3>
                <p>
                  Quá trình cung ứng thông tin, chủ doanh nghiệp tuyên xưng bản thân là cá nhân chịu trách nhiệm trước pháp luật về quyền đại diện sở hữu cổ phần để chia sẻ dữ liệu và bảo chứng số liệu trung thực, lành mạnh.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white tracking-tight">4. Giới giới hạn nghĩa vụ pháp quy</h3>
                <p>
                  AG Capital Advisory cùng các đại diện liên thông hoàn toàn được miễn trừ các trách lây lan thiệt hại trực tiếp hay gián tiếp nảy sinh ngoài ý muốn xuất phát từ kết quả xử lý của các thuật toán mẫu tính trực tuyến trên cổng này.
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
