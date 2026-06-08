/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PageId, Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { SITE_CONFIG } from '../config';
import { ContactInquiryForm } from '../components/LeadForms';
import { MapPin, Mail, Phone, Calendar, Clock, ShieldCheck, HelpCircle } from 'lucide-react';

interface ContactPageProps {
  language: Language;
  setActivePage: (page: PageId) => void;
}

export default function ContactPage({ language, setActivePage }: ContactPageProps) {
  const t = (key: string) => TRANSLATIONS[language][key] || key;
  const isEn = language === 'EN';

  return (
    <div className="flex flex-col min-h-screen bg-[#02050A]" id="corporate-contact-page">
      {/* Hero Header */}
      <section className="relative pt-36 pb-10 bg-gradient-to-b from-[#101F35]/30 to-transparent border-b border-slate-900" id="contact-hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C9A227] block mb-3">
            {isEn ? 'THE ARCHWAY' : 'KHỞI ĐẦU ĐỒNG HÀNH'}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-medium tracking-tight text-white max-w-4xl leading-tight font-sans">
            {isEn
              ? 'Start a Confidential Pre-Screening Discussion'
              : 'Khởi đầu Thảo luận và Đánh giá Sơ bộ'}
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-4 max-w-2xl leading-relaxed">
            {isEn
              ? 'All initial communications are handled with strict discretion by our senior partners. Get in touch to assess eligibility.'
              : 'Tất cả các trao đổi khởi đầu đều được xử lý dưới quy chuẩn bảo mật nghiêm ngặt bởi ban điều hành cấp cao của chúng tôi.'}
          </p>
        </div>
      </section>

      {/* Main section content with form and info */}
      <section className="py-10 bg-[#000]" id="contact-form-row">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="contact-columns-grid">
            {/* Left side metadata box */}
            <div className="lg:col-span-5 space-y-8 text-left" id="contact-meta-card">
              <div className="space-y-4">
                <span className="font-mono text-[9px] tracking-widest text-[#C9A227] uppercase block font-bold">
                  {isEn ? 'OFFICE DESTINATION' : 'VĂN PHÒNG ĐẠI DIỆN'}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-sans text-white tracking-tight">
                  {isEn ? 'The Advisory Headquarters' : 'Văn phòng AG Capital Advisory'}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {isEn
                    ? 'Our headquarters are located in the financial heart of Ho Chi Minh City, structured for high-end advisory consultations.'
                    : 'Trụ sở làm việc của chúng tôi nằm tại trung tâm tài chính sầm uất của Thành phố Hồ Chí Minh, được thiết kế tối ưu cho các buổi tham vấn cấp cao.'}
                </p>
              </div>

              {/* Physical metadata points */}
              <div className="space-y-4 text-xs text-slate-300" id="hq-location-points-set">
                <div className="flex gap-3 p-4 rounded bg-slate-950 border border-slate-900">
                  <MapPin className="text-[#C9A227] shrink-0" size={18} />
                  <div className="space-y-1">
                    <span className="font-semibold text-white block">
                      {isEn ? 'Office Address' : 'Địa chỉ Trụ sở'}
                    </span>
                    <span className="text-slate-400 block leading-relaxed">{SITE_CONFIG.address}</span>
                  </div>
                </div>

                <div className="flex gap-3 p-4 rounded bg-slate-950 border border-slate-900">
                  <Mail className="text-[#C9A227] shrink-0" size={18} />
                  <div className="space-y-1">
                    <span className="font-semibold text-white block">
                      {isEn ? 'Inquiries Email' : 'Hộp thư tiếp nhận'}
                    </span>
                    <a href={`mailto:${SITE_CONFIG.email}`} className="text-[#C9A227] hover:underline block font-mono">
                      {SITE_CONFIG.email}
                    </a>
                  </div>
                </div>

                <div className="flex gap-3 p-4 rounded bg-slate-950 border border-slate-900">
                  <Clock className="text-[#C9A227] shrink-0" size={18} />
                  <div className="space-y-1">
                    <span className="font-semibold text-white block">
                      {isEn ? 'Office Core Hours' : 'Thời gian vận hành'}
                    </span>
                    <span className="text-slate-400 block">
                      {isEn ? 'Monday - Friday (09:00 AM - 06:00 PM ICT)' : 'Thứ Hai - Thứ Sáu (09:00 - 18:00 ICT)'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Minimal office photo mock card */}
              <div className="p-5 rounded bg-slate-950 border border-[#C9A227]/15 leading-relaxed text-slate-500 text-[11px]" id="office-visual-mockup">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#C9A227] block font-bold mb-1">
                  AG Capital Advisory Building
                </span>
                <p>
                  {isEn
                    ? 'In-person boutique consultations are available exclusively through pre-scheduled and confirmed calendar appointments.'
                    : 'Các buổi làm việc trực tiếp tại văn phòng chỉ được tiếp đón đối với các đối tác đã đặt lịch hẹn trước và nhận được thông báo xác nhận chính thức qua email.'}
                </p>
              </div>
            </div>

            {/* Right side contact form embed */}
            <div className="lg:col-span-7 bg-slate-950 p-6 md:p-8 rounded border border-slate-900 text-left" id="contact-form-housing">
              <span className="font-mono text-[9px] tracking-widest text-slate-500 uppercase block mb-3">
                {isEn ? 'ONLINE ASSIGNMENT REGISTRY' : 'CỔNG TIẾP NHẬN YÊU CẦU'}
              </span>
              <h4 className="text-xl font-bold font-sans text-white mb-6">
                {isEn ? 'Submit General Contact Enquiry' : 'Gửi Yêu cầu Tham vấn'}
              </h4>

              <ContactInquiryForm language={language} />
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Confidential Disclaimer Notice */}
      <section className="py-12 bg-slate-950/60 border-y border-slate-900 text-left" id="contact-disclaimer-notice">
        <div className="max-w-4xl mx-auto px-4 flex gap-4">
          <ShieldCheck className="text-[#C9A227] shrink-0 mt-0.5" size={24} />
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#C9A227] block font-bold mb-1">
              {isEn ? 'Archival Confidential Commitment' : 'Cam kết Bảo mật Thông tin'}
            </span>
            <p className="text-[11px] leading-relaxed text-slate-500">
              {isEn
                ? 'All submitted inquiries are treated with extreme discretion. Information shared in this inquiry dashboard is assessed by internal specialists only and does not establish a binding advisory client engagement until a formal mutual Non-Disclosure Agreement (NDA) and consulting service contracts are duly signed.'
                : 'Mọi thông tin gửi qua cổng trực tuyến đều được hệ thống bảo lưu và xử lý tuyệt đối kín kẽ. Các dữ liệu này chỉ đóng vai trò hỗ trợ quá trình khảo sát, đánh giá sơ bộ và hoàn toàn không cấu thành một cam kết dịch vụ cho đến khi một Thỏa thuận Bảo mật thông tin song phương (NDA) và Hợp đồng tư vấn chính thức được hai bên ký kết.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
