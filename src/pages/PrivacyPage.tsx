/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PageId, Language } from '../types';

interface PrivacyPageProps {
  language: Language;
}

export default function PrivacyPage({ language }: PrivacyPageProps) {
  const isEn = language === 'EN';

  return (
    <div className="flex flex-col min-h-screen bg-[#02050A]" id="corporate-privacy-page">
      <section className="relative pt-36 pb-20 bg-gradient-to-b from-[#101F35]/30 to-transparent border-b border-slate-900" id="privacy-hero">
        <div className="max-w-4xl mx-auto px-4 text-left">
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#C9A227] block mb-3 font-bold">
            {isEn ? 'LEGAL DISCLOSURE' : 'THÔNG TIN BÁO CÁO PHÁP LÝ'}
          </span>
          <h1 className="text-3xl font-sans font-medium text-white tracking-tight">
            {isEn ? 'Privacy & Data Protection Policy' : 'Chính sách Bảo mật & An toàn Dữ liệu'}
          </h1>
          <p className="text-xs text-slate-500 mt-2 font-mono">
            {isEn ? 'Effective date: June 1, 2026' : 'Hiệu lực áp dụng: Ngày 1 tháng 6 năm 2026'}
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#000]" id="privacy-content">
        <div className="max-w-4xl mx-auto px-4 text-left prose prose-invert text-slate-300 text-xs sm:text-sm space-y-8 leading-relaxed">
          {isEn ? (
            <>
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white tracking-tight">1. Scope of Privacy</h3>
                <p>
                  AG Capital Advisory under AG Invest is committed to safeguarding the privacy and commercial secrets of founders and corporate entities submitting information for potential advisory evaluation. This document specifies how we intake, store, and utilize core metrics.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white tracking-tight">2. Information Received & Processed</h3>
                <p>
                  We receive client information through web-based digital submit forms, email, and virtual data rooms. This comprises company names, registration coordinates, operational revenue margins, pitch documents, financial models, capitalization tables, and related business intelligence assets.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white tracking-tight">3. Security Auditing Protocols</h3>
                <p>
                  All transmitted corporate metrics and client files are stored on secure cloud-container formats. Access is strictly limited on a need-to-know basis to key senior partners of AG Capital Advisory under authorized credentials. No metrics are traded or compiled into third-party indexes.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white tracking-tight">4. Non-disclosure Obligations</h3>
                <p>
                  Formal financial due diligence reviews, capital structure assessments, and tax compliance evaluations are covered under a bilateral bilateral Non-Disclosure Agreement (NDA). Information submitted before an NDA execution is kept entirely confidential and is used solely for initial fit evaluations.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white tracking-tight">5. Regulatory compliance</h3>
                <p>
                  We operate and store metrics conforming to Vietnam’s cybersecurity decree 53/2022/ND-CP and related data residency and server protection ordinances.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white tracking-tight">1. Phạm vi Điều chỉnh của Chính sách</h3>
                <p>
                  AG Capital Advisory trực thuộc hệ sinh thái thương hiệu AG Invest cam kết sâu sắc về tính nguyên vẹn bảo mật thông số và bí mật kinh doanh của sáng lập viên. Quy tắc này lập định cách thức dữ liệu hồ sơ của đối tác được xử lý và lưu trữ thông suốt hệ thống.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white tracking-tight">2. Thu thập & Phân nhóm Dữ liệu gửi</h3>
                <p>
                  Hồ sơ tổng thể được tiếp nhận thông qua tờ trình liên hệ, form khảo sát, phòng VDR và liên hệ trực tiếp. Hồ sơ chứa: tên pháp nhân, giấy phép, báo cáo tài lý sơ sài, định hướng tăng trưởng, sơ đồ cơ cấu thành viên HĐQT và lịch trình giải ngân dự kiến.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white tracking-tight">3. Tiêu chuẩn Mã hóa An toàn Dữ liệu</h3>
                <p>
                  Tập tin đối tác chuyển giao được xử lý lưu trữ an toàn trên máy chủ đám mây ảo hóa hóa phân lớp bảo mật cao diện. Thẩm quyền rà soát tuyệt đối giới hạn ở các partner kỳ cựu phụ trách chốt thương vụ. Hoàn toàn không chia sẻ dữ liệu cho đại lý thứ ba không liên can.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white tracking-tight">4. Khung Cam kết Bảo mật Pháp lý</h3>
                <p>
                  Mọi tài liệu mật liên quan đến chỉ số ròng, margin chi phí hay tài sản trí tuệ bắt buộc phải được bọc trong Thỏa thuận bảo mật song phương (NDA) có chữ ký đại diện pháp lý chính thức. Hồ sơ nộp sơ tuyển phục vụ việc lọc định trạng thái phù hợp.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white tracking-tight">5. Cơ sở pháp luật điều tiết</h3>
                <p>
                  Chúng tôi cam kết tuyệt đoạt tuân thủ Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân nước Cộng hòa Xã hội Chủ nghĩa Việt Nam và các chế tài lưu vết điện tử liên quan.
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
