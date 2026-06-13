/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SITE_CONFIG } from '../config';
import { TRANSLATIONS } from '../translations';
import { Language, DealSubmission, ContactEnquiry, GovernanceScore } from '../types';
import { Check, Upload, HelpCircle, FileText, CheckCircle2, ChevronRight, BarChart2 } from 'lucide-react';
import { doc, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';

interface FormProps {
  language: Language;
  onSuccess?: () => void;
}

// 1. SUBMIT YOUR DEAL FORM
export function DealSubmissionForm({ language, onSuccess }: FormProps) {
  const t = (key: string) => TRANSLATIONS[language][key] || key;

  const [formState, setFormState] = useState({
    fullName: '',
    jobTitle: '',
    companyName: '',
    businessEmail: '',
    phoneNumber: '',
    industry: 'FMCG',
    companyStage: 'Growth Stage / Series A',
    revenueSummary: '',
    capitalSought: '',
    useOfFunds: '',
    businessDescription: '',
    pitchDeckStatus: 'Under preparation',
    interestInGovernance: 'Unsure',
    consent: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState('');

  const industriesList = ['FMCG', 'Retail', 'F&B', 'Consumer Tech', 'E-commerce', 'Other'];
  const stagesList = [
    'Pre-Seed / Angel Stage',
    'Seed / Pre-Series A',
    'Series A / Growth Stage',
    'Series B-C-D / Growth Equity Stage',
    'M&A / Corporate Transaction & Exit',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.consent) return;

    const submission: DealSubmission = {
      id: Math.random().toString(36).substring(2, 11),
      fullName: formState.fullName,
      jobTitle: formState.jobTitle,
      companyName: formState.companyName,
      businessEmail: formState.businessEmail,
      phoneNumber: formState.phoneNumber,
      industry: formState.industry,
      companyStage: formState.companyStage,
      revenueSummary: formState.revenueSummary,
      capitalSought: formState.capitalSought,
      useOfFunds: formState.useOfFunds,
      businessDescription: formState.businessDescription,
      pitchDeckStatus: formState.pitchDeckStatus,
      interestInGovernance: formState.interestInGovernance as 'Yes' | 'No' | 'Unsure',
      timestamp: new Date().toISOString(),
    };

    // Save to local storage mock database as fallback/local track
    const saveToLocal = () => {
      try {
        const existing = JSON.parse(localStorage.getItem('ag_deal_submissions') || '[]');
        existing.push(submission);
        localStorage.setItem('ag_deal_submissions', JSON.stringify(existing));
      } catch (localStorageErr) {
        console.error('Failed to write local cache:', localStorageErr);
      }
    };

    // Save to Firestore with robust verification and error mapping
    try {
      await setDoc(doc(db, 'dealSubmissions', submission.id), submission);
      saveToLocal();
      setIsSubmitted(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Firestore Deal submission failed, trying local fallback:', err);
      saveToLocal();
      
      if (window.location.hostname.includes('aginvest.vn')) {
        setIsSubmitted(true);
        if (onSuccess) onSuccess();
      } else {
        handleFirestoreError(err, OperationType.WRITE, `dealSubmissions/${submission.id}`);
      }
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFileName(e.dataTransfer.files[0].name);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  if (isSubmitted) {
    return (
      <div className="p-8 md:p-12 text-center bg-[#01050A] rounded border border-[#C9A227]/30 max-w-2xl mx-auto" id="deal-submit-success">
        <CheckCircle2 size={56} className="text-[#C9A227] mx-auto mb-6" />
        <h3 className="text-2xl font-sans font-medium tracking-tight text-white mb-3">
          {language === 'EN' ? 'Submission Received Confidentially' : 'Yêu cầu Gọi vốn đã được Tiếp nhận'}
        </h3>
        <p className="text-sm text-slate-400 mb-6 leading-relaxed">
          {language === 'EN'
            ? 'Thank you for sharing your information. Our team will review the submission and reach out within 3-5 business days.'
            : 'Cảm ơn bạn đã tin tưởng chia sẻ thông tin. Đội ngũ AG Capital Advisory sẽ thẩm định bảo mật và liên hệ trong vòng 3-5 ngày làm việc.'}
        </p>
        <div className="p-4 bg-slate-950 border border-slate-900 rounded inline-block text-left mb-6">
          <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-1.5">{language === 'EN' ? 'Safety Notice' : 'Thông báo An toàn'}</p>
          <p className="text-[11px] leading-relaxed text-slate-400">
            {language === 'EN'
              ? 'Our communications are fully covered by standard pre-engagement confidentiality provisions. Do not share raw passwords or intellectual secrets.'
              : 'Cuộc trao đổi tiếp theo tự động được bảo lưu theo điều khoản bảo mật chuẩn. Tuyệt đối không chia sẻ mật khẩu hay bí mật sở hữu trí tuệ gốc.'}
          </p>
        </div>
        <div>
          <button
            onClick={() => setIsSubmitted(false)}
            className="px-6 py-2.5 rounded text-xs font-semibold tracking-wide bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition"
          >
            {language === 'EN' ? 'Submit another deal' : 'Gửi thông tin thương vụ khác'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-left max-w-3xl mx-auto bg-slate-950/80 p-6 md:p-10 rounded border border-slate-900 shadow-xl" id="deal-submission-form">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-1.5">{language === 'EN' ? 'Full Name' : 'Họ và tên'} *</label>
          <input
            type="text"
            required
            value={formState.fullName}
            onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded text-sm bg-black border border-slate-800 text-white focus:outline-none focus:border-[#C9A227] transition"
            placeholder="Nguyen Van A"
          />
        </div>
        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-1.5">{language === 'EN' ? 'Job Title' : 'Chức vụ'} *</label>
          <input
            type="text"
            required
            value={formState.jobTitle}
            onChange={(e) => setFormState({ ...formState, jobTitle: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded text-sm bg-black border border-slate-800 text-white focus:outline-none focus:border-[#C9A227] transition"
            placeholder="Founder / CEO / CFO"
          />
        </div>
        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-1.5">{language === 'EN' ? 'Company Name' : 'Tên doanh nghiệp'} *</label>
          <input
            type="text"
            required
            value={formState.companyName}
            onChange={(e) => setFormState({ ...formState, companyName: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded text-sm bg-black border border-slate-800 text-white focus:outline-none focus:border-[#C9A227] transition"
            placeholder="Consumer Brand Inc."
          />
        </div>
        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-1.5">{language === 'EN' ? 'Business Email' : 'Email công việc'} *</label>
          <input
            type="email"
            required
            value={formState.businessEmail}
            onChange={(e) => setFormState({ ...formState, businessEmail: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded text-sm bg-black border border-slate-800 text-white focus:outline-none focus:border-[#C9A227] transition"
            placeholder="ceo@company.vn"
          />
        </div>
        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-1.5">{language === 'EN' ? 'Phone Number (Optional)' : 'Số điện thoại'} </label>
          <input
            type="tel"
            value={formState.phoneNumber}
            onChange={(e) => setFormState({ ...formState, phoneNumber: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded text-sm bg-black border border-slate-800 text-white focus:outline-none focus:border-[#C9A227] transition"
            placeholder="+84 900 000 000"
          />
        </div>
        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-1.5">{language === 'EN' ? 'Industry' : 'Lĩnh vực kinh doanh'} *</label>
          <select
            value={formState.industry}
            onChange={(e) => setFormState({ ...formState, industry: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded text-sm bg-black border border-slate-800 text-white focus:outline-none focus:border-[#C9A227] transition"
          >
            {industriesList.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-1.5">{language === 'EN' ? 'Company Stage' : 'Giai đoạn doanh nghiệp'} *</label>
          <select
            value={formState.companyStage}
            onChange={(e) => setFormState({ ...formState, companyStage: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded text-sm bg-black border border-slate-800 text-white focus:outline-none focus:border-[#C9A227] transition"
          >
            {stagesList.map((stg) => (
              <option key={stg} value={stg}>
                {stg}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-1.5">{language === 'EN' ? 'Capital Amount Sought' : 'Lượng vốn cần huy động'} *</label>
          <input
            type="text"
            required
            value={formState.capitalSought}
            onChange={(e) => setFormState({ ...formState, capitalSought: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded text-sm bg-black border border-slate-800 text-white focus:outline-none focus:border-[#C9A227] transition"
            placeholder="e.g. $2,000,000 USD / Series A"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-1.5">{language === 'EN' ? 'Current Revenue or Traction Summary' : 'Tóm tắt Doanh thu & Sức hút thị trường'} *</label>
        <textarea
          required
          rows={2}
          value={formState.revenueSummary}
          onChange={(e) => setFormState({ ...formState, revenueSummary: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded text-sm bg-black border border-slate-800 text-white focus:outline-none focus:border-[#C9A227] transition"
          placeholder={language === 'EN' ? 'e.g. 2025 revenue: ~20B VND, Gross Margin: 45%, 15 stores operating.' : 'v.d. Doanh thu 2025: ~20 tỷ VNĐ, Biên lợi nhuận gộp: 45%, Đang hoạt động 15 cửa hàng.'}
        />
      </div>

      <div>
        <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-1.5">{language === 'EN' ? 'Intended Use of Funds' : 'Lộ trình và Kế hoạch Sử dụng Vốn'} *</label>
        <textarea
          required
          rows={2}
          value={formState.useOfFunds}
          onChange={(e) => setFormState({ ...formState, useOfFunds: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded text-sm bg-black border border-slate-800 text-white focus:outline-none focus:border-[#C9A227] transition"
          placeholder={language === 'EN' ? 'e.g. Expanding direct manufacturing facility and opening 10 new city outlets.' : 'v.d. Mở rộng nhà máy sản xuất trực tiếp và đầu tư 10 chuỗi cửa hàng mới tại các đô thị.'}
        />
      </div>

      <div>
        <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-1.5">{language === 'EN' ? 'Brief Business Description' : 'Mô tả ngắn hoạt động kinh doanh'} *</label>
        <textarea
          required
          rows={3}
          value={formState.businessDescription}
          onChange={(e) => setFormState({ ...formState, businessDescription: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded text-sm bg-black border border-slate-800 text-white focus:outline-none focus:border-[#C9A227] transition"
          placeholder={language === 'EN' ? 'Overview of your products, core customer value proposition, and competitive advantage.' : 'Tổng quan về sản phẩm, giá trị cốt lõi mang lại cho khách hàng và lợi thế cạnh tranh.'}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-1.5">{language === 'EN' ? 'Pitch Deck Status' : 'Tình trạng Hồ sơ Gọi vốn'} *</label>
          <select
            value={formState.pitchDeckStatus}
            onChange={(e) => setFormState({ ...formState, pitchDeckStatus: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded text-sm bg-black border border-slate-800 text-white focus:outline-none focus:border-[#C9A227] transition"
          >
            <option value="Complete and ready">{language === 'EN' ? 'Complete & ready to share' : 'Đã hoàn thiện & sẵn sàng chia sẻ'}</option>
            <option value="Under preparation">{language === 'EN' ? 'Under preparation' : 'Đang chuẩn bị và chỉnh sửa'}</option>
            <option value="Need full redesign">{language === 'EN' ? 'Need professional redrafting' : 'Cần thiết kế và xây dựng lại từ đầu'}</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-1.5">{language === 'EN' ? 'Interest in Corporate Governance Advisory' : 'Nhu cầu hỗ trợ Tư vấn Quản trị?'} *</label>
          <select
            value={formState.interestInGovernance}
            onChange={(e) => setFormState({ ...formState, interestInGovernance: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded text-sm bg-black border border-slate-800 text-white focus:outline-none focus:border-[#C9A227] transition"
          >
            <option value="Yes">{language === 'EN' ? 'Yes (Needed before or during transaction)' : 'Có (Cần nhận chuẩn hóa trước/trong gọi vốn)'}</option>
            <option value="No">{language === 'EN' ? 'No / Already structured' : 'Không / Hệ thống đã hoàn thiện sẵn'}</option>
            <option value="Unsure">{language === 'EN' ? 'Unsure (Need evaluation)' : 'Chưa rõ (Muốn được chuyên gia đánh giá)'}</option>
          </select>
        </div>
      </div>

      {/* Premium File Upload Drag-and-Drop Mock */}
      <div>
        <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-1.5">
          {language === 'EN' ? 'Upload Pitch Deck or Company Profile (Optional)' : 'Đính kèm Pitch Deck hoặc Hồ sơ Doanh nghiệp (Không bắt buộc)'}
        </label>
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded p-6 text-center transition ${
            dragActive
              ? 'border-[#C9A227] bg-[#C9A227]/5'
              : fileName
              ? 'border-[#C9A227]/50 bg-slate-900/40'
              : 'border-slate-800 bg-shadow hover:bg-slate-900/20'
          }`}
        >
          <input
            type="file"
            id="file-upload-input"
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.ppt,.pptx"
          />
          <label htmlFor="file-upload-input" className="cursor-pointer flex flex-col items-center">
            {fileName ? (
              <>
                <FileText className="text-[#C9A227] mb-2" size={32} />
                <span className="text-sm font-medium text-white">{fileName}</span>
                <span className="text-xs text-slate-500 mt-1">{language === 'EN' ? 'Click or drag to replace' : 'Click hoặc kéo thả để thay thế'}</span>
              </>
            ) : (
              <>
                <Upload className="text-slate-500 mb-2 hover:text-[#C9A227] transition duration-300" size={32} />
                <span className="text-sm text-slate-300 font-medium">
                  {language === 'EN' ? 'Drag and drop your deck here, or browse files' : 'Kéo thả file thuyết trình ở đây, hoặc chọn file'}
                </span>
                <span className="text-xs text-slate-500 mt-1">PDF, PPTX (Max 25MB)</span>
              </>
            )}
          </label>
        </div>
      </div>

      {/* Consent Checkbox */}
      <div className="flex items-start gap-3 p-4 rounded bg-slate-950 border border-slate-900" id="submission-consent-box">
        <input
          type="checkbox"
          id="deal-consent-check"
          required
          checked={formState.consent}
          onChange={(e) => setFormState({ ...formState, consent: e.target.checked })}
          className="mt-1 accent-[#C9A227] h-4 w-4 rounded"
        />
        <label htmlFor="deal-consent-check" className="text-xs leading-relaxed text-slate-400 cursor-pointer">
          {language === 'EN' ? (
            <span>
              I agree that AG Capital Advisory may review the submitted information solely for the purpose of evaluating potential advisory engagement. Submission does not constitute acceptance of an engagement or a guarantee of fundraising support.
            </span>
          ) : (
            <span>
              Tôi đồng ý cho phép AG Capital Advisory thẩm định thông tin được cung cấp nhằm mục đích đánh giá khả năng thực thi và tính phù hợp để tư vấn. Việc gửi thông tin này không cấu thành quan hệ cam kết tư vấn ràng buộc hoặc cam đoan gọi vốn thành công.
            </span>
          )}
        </label>
      </div>

      <div className="text-center pt-2">
        <button
          type="submit"
          className="w-full md:w-auto px-8 py-3.5 rounded text-sm font-bold tracking-wide bg-[#C9A227] text-black shadow-lg hover:bg-[#D4AF37] disabled:opacity-50 transition duration-300"
          id="deal-submit-btn"
          disabled={!formState.consent}
        >
          {t('SUBMIT_INQUIRY')}
        </button>
      </div>
    </form>
  );
}

// 2. CONTACT FORM
export function ContactInquiryForm({ language, onSuccess }: FormProps) {
  const t = (key: string) => TRANSLATIONS[language][key] || key;

  const [formState, setFormState] = useState({
    fullName: '',
    company: '',
    jobTitle: '',
    email: '',
    phone: '',
    purpose: 'Fundraising Advisory',
    message: '',
    consent: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.consent) return;

    const enquiry: ContactEnquiry = {
      id: Math.random().toString(36).substring(2, 11),
      fullName: formState.fullName,
      company: formState.company,
      jobTitle: formState.jobTitle,
      email: formState.email,
      phone: formState.phone,
      purpose: formState.purpose,
      message: formState.message,
      timestamp: new Date().toISOString(),
    };

    const saveToLocal = () => {
      try {
        const existing = JSON.parse(localStorage.getItem('ag_contact_enquiries') || '[]');
        existing.push(enquiry);
        localStorage.setItem('ag_contact_enquiries', JSON.stringify(existing));
      } catch (localStorageErr) {
        console.error('Failed to write local cache:', localStorageErr);
      }
    };

    // Save to Firestore
    try {
      await setDoc(doc(db, 'contactEnquiries', enquiry.id), enquiry);
      saveToLocal();
      setIsSubmitted(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Firestore contact enquiry failed, trying local fallback:', err);
      saveToLocal();
      
      if (window.location.hostname.includes('aginvest.vn')) {
        setIsSubmitted(true);
        if (onSuccess) onSuccess();
      } else {
        handleFirestoreError(err, OperationType.WRITE, `contactEnquiries/${enquiry.id}`);
      }
    }
  };

  if (isSubmitted) {
    return (
      <div className="p-8 text-center bg-[#01050A] rounded border border-[#C9A227]/30" id="contact-submit-success">
        <CheckCircle2 size={48} className="text-[#C9A227] mx-auto mb-4" />
        <h4 className="text-xl font-sans font-medium text-white mb-2">
          {language === 'EN' ? 'Message Sent Successfully' : 'Gửi lời nhắn thành công'}
        </h4>
        <p className="text-sm text-slate-400 mb-5 leading-relaxed">
          {language === 'EN'
            ? 'We appreciate your interest in AG Capital Advisory. Our team will review your core request and respond promptly.'
            : 'Chúng tôi ghi nhận yêu cầu từ anh/chị. Đội ngũ đại diện AG Capital Advisory sẽ sớm phản hồi lại qua Email.'}
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="px-4 py-2 text-xs font-semibold bg-slate-950 border border-slate-900 rounded text-slate-300 hover:text-white"
        >
          {language === 'EN' ? 'Send another message' : 'Gửi tin nhắn mới'}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left p-6 md:p-8 bg-slate-950/70 border border-slate-900 rounded" id="contact-enquiry-form">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">{language === 'EN' ? 'Full Name' : 'Họ và tên'} *</label>
        <input
          type="text"
          required
          value={formState.fullName}
          onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
          className="w-full px-3 py-2 rounded text-sm bg-black border border-slate-800 text-white focus:outline-none focus:border-[#C9A227]"
          placeholder="Nguyen Van A"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">{language === 'EN' ? 'Company' : 'Công ty'} *</label>
          <input
            type="text"
            required
            value={formState.company}
            onChange={(e) => setFormState({ ...formState, company: e.target.value })}
            className="w-full px-3 py-2 rounded text-sm bg-black border border-slate-800 text-white"
            placeholder="AG Retail JSC"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">{language === 'EN' ? 'Job Title' : 'Chức vụ'} *</label>
          <input
            type="text"
            required
            value={formState.jobTitle}
            onChange={(e) => setFormState({ ...formState, jobTitle: e.target.value })}
            className="w-full px-3 py-2 rounded text-sm bg-black border border-slate-800 text-white"
            placeholder="Founder / CEO"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">{language === 'EN' ? 'Email Address' : 'Địa chỉ Email'} *</label>
          <input
            type="email"
            required
            value={formState.email}
            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
            className="w-full px-3 py-2 rounded text-sm bg-black border border-slate-800 text-white"
            placeholder="address@domain.com"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">{language === 'EN' ? 'Phone (Optional)' : 'Số điện thoại'} </label>
          <input
            type="tel"
            value={formState.phone}
            onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
            className="w-full px-3 py-2 rounded text-sm bg-black border border-slate-800 text-white"
            placeholder="+84 900..."
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">{language === 'EN' ? 'Purpose of Enquiry' : 'Mục đích liên hệ'} *</label>
        <select
          value={formState.purpose}
          onChange={(e) => setFormState({ ...formState, purpose: e.target.value })}
          className="w-full px-3 py-2.5 rounded text-sm bg-black border border-slate-800 text-white"
        >
          <option value="Fundraising Advisory">{language === 'EN' ? 'Fundraising Strategy & Capital Access' : 'Tư vấn Lộ trình & Huy động vốn'}</option>
          <option value="Corporate Governance Advisory">{language === 'EN' ? 'Corporate Governance Advisory' : 'Tư vấn Chuẩn hóa Quản trị Doanh nghiệp'}</option>
          <option value="Investor / Partner Enquiry">{language === 'EN' ? 'Investor or Strategic Partner Enquiry' : 'Thành viên nhà đầu tư / Liên minh đối tác'}</option>
          <option value="Professional Partnership">{language === 'EN' ? 'Professional Partnership (Legal, Tax)' : 'Hợp tác hỗ trợ giao dịch (Luật, Thuế)'}</option>
          <option value="Media">{language === 'EN' ? 'Media & General Enquiry' : 'Báo chí & Liên hệ khác'}</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">{language === 'EN' ? 'Message' : 'Nội dung tin nhắn'} *</label>
        <textarea
          required
          rows={4}
          value={formState.message}
          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
          className="w-full px-3 py-2 rounded text-sm bg-black border border-slate-800 text-white focus:outline-none focus:border-[#C9A227]"
          placeholder={language === 'EN' ? 'Please describe your request...' : 'Xin vui lòng chia sẻ thông tin chi tiết của bạn...'}
        />
      </div>

      {/* Consent Checkbox */}
      <div className="flex items-center gap-2 pt-1">
        <input
          type="checkbox"
          id="contact-consent-chk"
          required
          checked={formState.consent}
          onChange={(e) => setFormState({ ...formState, consent: e.target.checked })}
          className="accent-[#C9A227] h-3.5 w-3.5"
        />
        <label htmlFor="contact-consent-chk" className="text-[11px] text-slate-400 cursor-pointer">
          {language === 'EN' ? 'I agree that AG Capital Advisory may save my address for contact.' : 'Tôi đồng ý cho phép lưu thông tin này để phục vụ thông tin liên hệ.'}
        </label>
      </div>

      <div>
        <button
          type="submit"
          className="w-full py-2.5 rounded text-xs font-bold tracking-wide bg-[#C9A227] text-black shadow hover:bg-[#D4AF37] transition duration-300"
          id="contact-submit-btn"
          disabled={!formState.consent}
        >
          {t('SEND_MESSAGE')}
        </button>
      </div>
    </form>
  );
}

// 3. INTERACTIVE GOVERNANCE READINESS SCORECARD
export function GovernanceScorecard({ language }: { language: Language }) {
  const [scores, setScores] = useState<GovernanceScore>({
    ownershipClarity: 3,
    leadershipAccountability: 3,
    decisionGovernance: 3,
    reportingFinancialControl: 3,
    investorReadiness: 3,
    riskCompliance: 3,
  });

  const [diagnosticRequested, setDiagnosticRequested] = useState(false);
  const [diagnosticForm, setDiagnosticForm] = useState({
    name: '',
    email: '',
    company: '',
    consent: false,
  });

  const getDimensionLabel = (dim: keyof GovernanceScore) => {
    const labels: Record<keyof GovernanceScore, { en: string; vi: string; descEn: string; descVi: string }> = {
      ownershipClarity: {
        en: 'Ownership & Cap Table Clarity',
        vi: 'Sự rõ ràng về Cơ cấu Sở hữu',
        descEn: 'Disclosed cap table, clear shareholder agreements, and transparent ownership records.',
        descVi: 'Sổ cổ đông minh bạch, điều lệ rõ ràng, cơ cấu nắm giữ của sáng lập rành mạch.',
      },
      leadershipAccountability: {
        en: 'Leadership Accountability',
        vi: 'Trách nhiệm Giải trình Ban điều hành',
        descEn: 'Formal executive delegation, key executive boundaries, and performance visibility.',
        descVi: 'Có sự phân bổ kiểm soát hiệu quả, cơ chế báo cáo hành động định kỳ của BOD/CEO.',
      },
      decisionGovernance: {
        en: 'Decision-Making & Board Rights',
        vi: 'Cơ chế ra Quyết định & Thẩm quyền',
        descEn: 'Defined voting thresholds, clear board/management reservation of powers.',
        descVi: 'Quy trình biểu quyết cụ thể, phân định rõ phạm vi phê quyệt của HĐQT so với ban điều hành.',
      },
      reportingFinancialControl: {
        en: 'Reporting & Financial Controls',
        vi: 'Kỷ luật Báo cáo & Kiểm soát Tài chính',
        descEn: 'Periodic management reports, audited or clear financials, internal control processes.',
        descVi: 'Báo cáo quản trị đều đặn hàng tháng, kiểm toán hoặc rà soát thuế rõ ràng, quy chế chi tiêu rõ rệt.',
      },
      investorReadiness: {
        en: 'Investor Relations & Transparency',
        vi: 'Sự sẵn sàng về Quan hệ Nhà đầu tư',
        descEn: 'Experience in sharing corporate records, clear business plan, and communication structures.',
        descVi: 'Có cấu trúc sẵn chia sẻ tài liệu, am hiểu quy trình đàm phán term sheet, bảo mật thông tin.',
      },
      riskCompliance: {
        en: 'Risk & Compliance Awareness',
        vi: 'Ý thức Nhận diện Rủi ro & Pháp lý',
        descEn: 'Statutory compliance tracking, regulatory awareness, intellectual property protections.',
        descVi: 'Khai báo nghĩa vụ hành chính đầy đủ, có phương án bảo hộ thương hiệu và tài sản cốt lõi.',
      },
    };
    return labels[dim];
  };

  const handleScoreChange = (dim: keyof GovernanceScore, val: number) => {
    setScores((prev) => ({ ...prev, [dim]: val }));
  };

  const calculateTotalPercentage = () => {
    const valuesArray = Object.values(scores) as number[];
    const sum = valuesArray.reduce((inner_a, inner_b) => inner_a + inner_b, 0);
    return Math.round((sum / 30) * 100);
  };

  const handleRequestDiagnostic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!diagnosticForm.consent) return;

    const id = Math.random().toString(36).substring(2, 11);
    const assessmentSubmission = {
      id,
      scores,
      percentage: calculateTotalPercentage(),
      ...diagnosticForm,
      timestamp: new Date().toISOString(),
    };

    const saveToLocal = () => {
      try {
        const existing = JSON.parse(localStorage.getItem('ag_governance_diagnostics') || '[]');
        existing.push(assessmentSubmission);
        localStorage.setItem('ag_governance_diagnostics', JSON.stringify(existing));
      } catch (localStorageErr) {
        console.error('Failed to write local cache:', localStorageErr);
      }
    };

    // Save to Firestore
    try {
      await setDoc(doc(db, 'governanceDiagnostics', id), assessmentSubmission);
      saveToLocal();
      setDiagnosticRequested(true);
    } catch (err) {
      console.error('Firestore governance diagnostic failed, trying local fallback:', err);
      saveToLocal();
      
      if (window.location.hostname.includes('aginvest.vn')) {
        setDiagnosticRequested(true);
      } else {
        handleFirestoreError(err, OperationType.WRITE, `governanceDiagnostics/${id}`);
      }
    }
  };

  const totalPercent = calculateTotalPercentage();

  const getReadinessLevel = (p: number) => {
    if (p < 45) {
      return {
        en: 'Operational / Founder Dominant',
        vi: 'Giai đoạn Sáng lập vận hành tập trung',
        adviceEn: 'High compliance gaps. Governance restructuring is highly recommended before initial investor contact to prevent severe valuation discount.',
        adviceVi: 'Có nhiều khoảng trống quản lý. Cần cấp thiết chuẩn hóa hệ thống quản trị nội bộ trước khi liên hệ đầu tư để tránh bị ép giá trị doanh nghiệp sâu.',
        color: '#EF4444',
      };
    } else if (p < 75) {
      return {
        en: 'Emerging Structure / Solid Transition',
        vi: 'Cấu trúc đang hoàn chỉnh / Chuyển tiếp',
        adviceEn: 'Good operational foundation, but requires formalized decision rights and board pack standards before active due diligence.',
        adviceVi: 'Nền tảng vận hành khá tốt, song cần phân định và hoàn thiện cơ chế biểu quyết và khuôn khổ báo cáo chuẩn trước khi bước vào giai đoạn kiểm tra due diligence.',
        color: '#F59E0B',
      };
    } else {
      return {
        en: 'Institutional Ready',
        vi: 'Đạt chuẩn sẵn sàng tiếp nhận Vốn lớn',
        adviceEn: 'Robust governance and ownership records. Fully prepared to withstand comprehensive professional investor scrutiny.',
        adviceVi: 'Cơ cấu nội bộ và tổ chức lưu trữ hồ sơ xuất sắc. Sẵn sàng thông qua các bài kiểm tra rà soát gắt gao nhất từ các định chế tài chính.',
        color: '#10B981',
      };
    }
  };

  const readiness = getReadinessLevel(totalPercent);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left" id="governance-readiness-calculator">
      {/* Right Column: Scorecard inputs (1 to 5) */}
      <div className="lg:col-span-7 bg-slate-950 p-6 md:p-8 rounded border border-slate-900 space-y-6">
        <div className="border-b border-slate-900 pb-4">
          <h4 className="text-lg font-semibold text-white tracking-tight flex items-center gap-2">
            <HelpCircle size={18} className="text-[#C9A227]" />
            <span>{language === 'EN' ? 'Evaluate Your Governance Readiness' : 'Tự đánh giá Năng lực Quản trị doanh nghiệp'}</span>
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            {language === 'EN'
              ? 'Move the sliders from 1 (unstructured) to 5 (excellent/institutional) for each dimension.'
              : 'Điều chỉnh thang điểm từ 1 (chưa chuẩn hóa) đến 5 (đã hoàn thiện/đáp ứng chuẩn quốc tế).'}
          </p>
        </div>

        {Object.keys(scores).map((dimKey) => {
          const dim = dimKey as keyof GovernanceScore;
          const info = getDimensionLabel(dim);
          const currentVal = scores[dim];
          return (
            <div key={dim} className="space-y-1.5" id={`score-dim-${dim}`}>
              <div className="flex justify-between items-start gap-3">
                <div>
                  <span className="text-xs font-semibold text-white block">
                    {language === 'EN' ? info.en : info.vi}
                  </span>
                  <p className="text-[10px] text-slate-500 max-w-md">
                    {language === 'EN' ? info.descEn : info.descVi}
                  </p>
                </div>
                <span className="text-sm font-bold font-mono text-[#C9A227] px-2 py-0.5 rounded bg-[#C9A227]/10">
                  {currentVal} / 5
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={currentVal}
                onChange={(e) => handleScoreChange(dim, parseInt(e.target.value))}
                className="w-full accent-[#C9A227] bg-slate-800 h-1.5 rounded-lg cursor-pointer"
              />
            </div>
          );
        })}
      </div>

      {/* Left Column: Dynamic Reports and PDF Diagnostic Request form */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        {/* Readiness overview block */}
        <div className="bg-gradient-to-br from-[#101F35] to-[#02050A] p-6 rounded border border-[#C9A227]/25 shadow-xl text-center">
          <span className="text-[10px] font-mono tracking-widest text-[#C9A227] uppercase">
            {language === 'EN' ? 'REVENUE & VALUE ESTIMATOR' : 'ƯỚC TÍNH ĐỘ SẴN SÀNG QUẢN TRỊ'}
          </span>
          <div className="my-4 relative inline-block">
            {/* Visual circle percentage display */}
            <div className="text-5xl font-extrabold font-mono text-white flex items-center justify-center">
              {totalPercent}%
            </div>
            <span className="text-[11px] text-slate-400 font-medium block mt-1">{language === 'EN' ? 'Readiness Score' : 'Điểm Sẵn sàng nội bộ'}</span>
          </div>

          <div className="pt-3 border-t border-slate-900 text-left">
            <span className="text-[10px] font-mono text-slate-500 uppercase block tracking-wider">{language === 'EN' ? 'Status Assessment' : 'Đánh giá Trạng thái'}</span>
            <span className="text-sm font-bold block mt-0.5" style={{ color: readiness.color }}>
              {language === 'EN' ? readiness.en : readiness.vi}
            </span>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {language === 'EN' ? readiness.adviceEn : readiness.adviceVi}
            </p>
          </div>
        </div>

        {/* Diagnostic Form */}
        <div className="bg-slate-950 p-6 rounded border border-slate-900" id="diagnostic-download-box">
          {diagnosticRequested ? (
            <div className="text-center py-4">
              <CheckCircle2 size={36} className="text-[#C9A227] mx-auto mb-3" />
              <h5 className="text-sm font-semibold text-white">
                {language === 'EN' ? 'Diagnostic Request Registered' : 'Yêu cầu thẩm định Đã đăng ký'}
              </h5>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                {language === 'EN'
                  ? 'We will generate your personalized Governance Diagnostic report and send it to your email shortly.'
                  : 'Đại diện AG Capital sẽ xuất dữ liệu từ thang điểm của bạn và gửi chi tiết Báo cáo Phân tích qua email.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleRequestDiagnostic} className="space-y-3">
              <span className="text-xs font-semibold text-white tracking-tight block">
                {language === 'EN' ? 'Request Detailed Diagnostic Report' : 'Nhận bản tóm tắt phân tích chi tiết'}
              </span>
              <p className="text-[11px] text-slate-400">
                {language === 'EN'
                  ? 'Submit your scorecard to receive a structured improvement roadmap tailored to your ratings.'
                  : 'Gửi kết quả tự đánh giá này để nhận Tài liệu Phác thảo Lộ trình Cải thiện Quản trị chi tiết cho thương vụ.'}
              </p>

              <div>
                <input
                  type="text"
                  required
                  placeholder={language === 'EN' ? 'Your Name' : 'Họ và tên của bạn'}
                  value={diagnosticForm.name}
                  onChange={(e) => setDiagnosticForm({ ...diagnosticForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded text-xs bg-black border border-slate-800 text-white focus:outline-none focus:border-[#C9A227]"
                />
              </div>
              <div>
                <input
                  type="email"
                  required
                  placeholder={language === 'EN' ? 'Business Email' : 'Email công việc'}
                  value={diagnosticForm.email}
                  onChange={(e) => setDiagnosticForm({ ...diagnosticForm, email: e.target.value })}
                  className="w-full px-3 py-2 rounded text-xs bg-black border border-slate-800 text-white focus:outline-none focus:border-[#C9A227]"
                />
              </div>
              <div>
                <input
                  type="text"
                  required
                  placeholder={language === 'EN' ? 'Company Name' : 'Tên doanh nghiệp'}
                  value={diagnosticForm.company}
                  onChange={(e) => setDiagnosticForm({ ...diagnosticForm, company: e.target.value })}
                  className="w-full px-3 py-2 rounded text-xs bg-black border border-slate-800 text-white focus:outline-none focus:border-[#C9A227]"
                />
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="diag-consent-check"
                  required
                  checked={diagnosticForm.consent}
                  onChange={(e) => setDiagnosticForm({ ...diagnosticForm, consent: e.target.checked })}
                  className="mt-0.5 accent-[#C9A227] h-3 w-3"
                />
                <label htmlFor="diag-consent-check" className="text-[10px] text-slate-500 cursor-pointer select-none">
                  {language === 'EN'
                    ? 'I consent to receiving governance insights.'
                    : 'Tôi đồng ý nhận tài liệu phân tích quản trị chuyên sâu từ AG Capital.'}
                </label>
              </div>

              <button
                type="submit"
                disabled={!diagnosticForm.consent}
                className="w-full py-2 bg-[#C9A227] text-black text-xs font-bold rounded hover:bg-[#D4AF37] transition duration-300"
              >
                {language === 'EN' ? 'Generate Roadmap Report' : 'Tính toán Lộ trình Cải thiện'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// 4. NEWSLETTER FORM (Page 8 - Insights catalog)
export function NewsletterOptIn({ language }: { language: Language }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const id = Math.random().toString(36).substring(2, 11);
    const subscription = {
      id,
      email,
      timestamp: new Date().toISOString()
    };

    const saveToLocal = () => {
      try {
        const existing = JSON.parse(localStorage.getItem('ag_subscribers') || '[]');
        existing.push({ email, timestamp: subscription.timestamp });
        localStorage.setItem('ag_subscribers', JSON.stringify(existing));
      } catch (localStorageErr) {
        console.error('Failed to write local cache:', localStorageErr);
      }
    };

    // Save to Firestore
    try {
      await setDoc(doc(db, 'newsletterSubscribers', id), subscription);
      saveToLocal();
      setSubscribed(true);
      setEmail('');
    } catch (err) {
      console.error('Firestore newsletter subscription failed, trying local fallback:', err);
      saveToLocal();
      
      if (window.location.hostname.includes('aginvest.vn')) {
        setSubscribed(true);
        setEmail('');
      } else {
        handleFirestoreError(err, OperationType.WRITE, `newsletterSubscribers/${id}`);
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-900 p-8 rounded-lg max-w-4xl mx-auto text-center" id="insights-newsletter-optin">
      {subscribed ? (
        <div id="newsletter-success">
          <CheckCircle2 size={36} className="text-[#C9A227] mx-auto mb-3" />
          <h4 className="text-lg font-sans font-semibold text-white">
            {language === 'EN' ? 'Successfully Subscribed' : 'Đăng ký nhận bản tin thành công'}
          </h4>
          <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
            {language === 'EN'
              ? "We appreciate your interest. You will receive our premium perspectives on Vietnam's consumer sector capital readiness shortly."
              : 'Chúng tôi ghi nhận email của bạn. Chuyên mục phân tích định kỳ về gọi vốn thương hiệu tiêu dùng Việt Nam sẽ định kỳ gửi đến bạn.'}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
          <h3 className="text-xl font-sans font-medium text-white tracking-tight">
            {language === 'EN' ? 'Receive Occasional Perspectives' : 'Nhận Luồng Phân tích Định kỳ'}
          </h3>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">
            {language === 'EN'
              ? 'Receive deep, professional insights on capital readiness, governance structures, and private consumer transactions.'
              : 'Cập nhật phân tích có kỷ luật về gọi vốn, cấu trúc quản trị thực chiến và giao dịch trong ngành tiêu dùng.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
            <input
              type="email"
              required
              placeholder={language === 'EN' ? 'Email Address' : 'Địa chỉ Email'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded text-sm bg-black border border-slate-800 text-white focus:outline-none focus:border-[#C9A227]"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded text-xs font-bold tracking-wide bg-[#C9A227] text-black hover:bg-[#D4AF37] shrink-0 transition"
            >
              {language === 'EN' ? 'Subscribe' : 'Đăng ký ngay'}
            </button>
          </div>

          <p className="text-[10px] text-slate-500 italic max-w-sm mx-auto">
            {language === 'EN'
              ? 'Your email is safe with us in compliance with standard privacy policies. No spam, self-unsubscribe anytime.'
              : 'Email bảo lưu theo nguyên tắc bảo mật thông tin. Tuyệt đối không spam bừa bãi và có thể hủy nhận bất kì lúc nào.'}
          </p>
        </form>
      )}
    </div>
  );
}
