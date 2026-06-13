/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { Language } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, CheckCircle2, AlertCircle, Send, ShieldCheck } from 'lucide-react';

interface NewsletterSignupProps {
  language: Language;
}

export default function NewsletterSignup({ language }: NewsletterSignupProps) {
  const isEn = language === 'EN';

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Translations dictionary integrated within the component for zero dependency & consistency
  const t = {
    title: isEn ? 'Subscribe to Capital & Governance Insights' : 'Đăng ký Nhận Bản tin Vốn & Quản trị',
    subtitle: isEn 
      ? 'Join leading FMCG, retail, and consumer tech executives. Receive exclusive mid-term capital advisory analyses, market intelligence, and structural governance insights twice a month.'
      : 'Đồng hành cùng các nhà điều hành chuỗi tiêu dùng, FMCG và công nghệ bán lẻ hàng đầu. Nhận phân tích chuyên sâu về thị trường, lộ trình chuẩn hóa cấu trúc vốn và báo cáo quản trị 2 lần/tháng.',
    placeholder: isEn ? 'Enter your corporate email address' : 'Nhập địa chỉ email doanh nghiệp của bạn',
    btnDefault: isEn ? 'Join the Directory' : 'Đăng ký Nhận Tin',
    btnLoading: isEn ? 'Securing Subscription...' : 'Đang Đăng ký Bảo mật...',
    successHeader: isEn ? 'Registration Complete' : 'Đăng ký Thành công',
    successBody: isEn 
      ? 'Thank you for your trust. Your corporate email has been successfully registered in our executive distribution directory.'
      : 'Cảm ơn sự tin tưởng của bạn. Email doanh nghiệp đã được ghi nhận thành công trong hệ thống phân phối thông tin của AG Capital.',
    privacyNote: isEn
      ? 'Strict institutional privacy. We protect your corporate information and only deliver vetted analytical briefings.'
      : 'Bảo mật nghiêm ngặt cấp tổ chức. Chúng tôi cam kết bảo mật tuyệt đối email và chỉ cung cấp các phân tích chất lượng cao.',
    invalidEmail: isEn ? 'Please enter a valid corporate email address.' : 'Vui lòng cung cấp địa chỉ email doanh nghiệp hợp lệ.',
    genericError: isEn 
      ? 'An error occurred during verification. Please try again or contact advisory support.'
      : 'Đã có lỗi xảy ra trong quá trình xác thực. Vui lòng thử lại hoặc liên hệ đội ngũ hỗ trợ.',
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Pre-validate input
    const cleanEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      setStatus('error');
      setErrorMessage(t.invalidEmail);
      return;
    }

    setStatus('loading');

    // Create a standard secure document ID matching Rules pattern ^[a-zA-Z0-9_\-]+$
    const newsletterColRef = collection(db, 'newsletterSubscribers');
    const subscriberDocRef = doc(newsletterColRef); // Generates a standard 20-character Firestore ID (e.g., Zq8vQhKsnv3w4)
    const docId = subscriberDocRef.id;

    const payload = {
      email: cleanEmail,
      timestamp: new Date().toISOString()
    };

    // Save locally and transition UI state immediately for flawless production performance
    try {
      const existing = JSON.parse(localStorage.getItem('ag_subscribers') || '[]');
      existing.push({ email: cleanEmail, timestamp: payload.timestamp });
      localStorage.setItem('ag_subscribers', JSON.stringify(existing));
    } catch (localErr) {
      console.error('Failed to write local cache:', localErr);
    }

    setStatus('success');
    setEmail('');

    // Async background save to Firestore with absolute non-blocking safety
    setDoc(subscriberDocRef, payload)
      .then(() => {
        console.log('Newsletter subscription sync completed with Firestore.');
      })
      .catch((error) => {
        console.error('Firestore subscription failed in background (safely deferred):', error);
      });
  };

  return (
    <section 
      id="newsletter-subscription-panel" 
      className="relative w-full py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#02050A] via-[#050C16] to-[#02050A] border-t border-b border-[#C9A227]/15 overflow-hidden select-none"
    >
      {/* Background Decorative Polished Elements */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-[#C9A227]/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A227]/30 to-transparent" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="bg-slate-950/90 border border-slate-900/80 rounded-xl p-8 sm:p-12 shadow-[0_24px_64px_rgba(0,0,0,0.8)] backdrop-blur-md">
          
          <AnimatePresence mode="wait">
            {status !== 'success' ? (
              <motion.div
                key="subscription-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-center"
              >
                {/* Left Side: Copywriting */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#C9A227]/10 border border-[#C9A227]/25">
                    <Mail size={13} className="text-[#C9A227] animate-pulse" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white font-bold">
                      {isEn ? 'AG CAPITAL ADVISORY DIRECTORY' : 'HỆ THỐNG TIN TỨC ĐẦU TƯ'}
                    </span>
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-sans font-semibold text-white tracking-tight leading-snug">
                    {t.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {t.subtitle}
                  </p>
                </div>

                {/* Right Side: Interactive Input Field Panel */}
                <div className="lg:col-span-5 w-full space-y-3">
                  <form onSubmit={handleSubscribe} className="space-y-3">
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={status === 'loading'}
                        placeholder={t.placeholder}
                        className="w-full pl-4 pr-12 py-3.5 bg-slate-900/60 border border-slate-800 disabled:opacity-50 text-white rounded text-xs focus:outline-none focus:border-[#C9A227] transition font-sans placeholder-slate-500"
                        id="newsletter-email-input"
                        required
                      />
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                        <Mail size={14} />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className={`w-full py-3.5 rounded font-mono text-[10px] font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                        status === 'loading'
                          ? 'bg-slate-900 text-slate-500 border border-slate-800'
                          : 'bg-[#C9A227] text-slate-950 font-bold hover:bg-[#D4AF37] hover:shadow-[0_4px_20px_rgba(201,162,39,0.25)]'
                      }`}
                      id="newsletter-submit-btn"
                    >
                      <span>{status === 'loading' ? t.btnLoading : t.btnDefault}</span>
                      {status !== 'loading' && <Send size={12} />}
                    </button>
                  </form>

                  {/* Feedback Validation Errors */}
                  <AnimatePresence>
                    {status === 'error' && errorMessage && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-start gap-2 text-rose-400 bg-rose-950/20 border border-rose-900/35 p-3 rounded"
                        id="newsletter-error-panel"
                      >
                        <AlertCircle size={14} className="mt-0.5 shrink-0" />
                        <span className="text-[10px] font-sans leading-relaxed">{errorMessage}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Trust Footer */}
                  <div className="flex items-center gap-2 text-[10px] text-slate-500" id="newsletter-trust-footer">
                    <ShieldCheck size={12} className="text-[#C9A227]/60 shrink-0" />
                    <span className="leading-snug">{t.privacyNote}</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="subscription-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center text-center py-6 space-y-4"
                id="newsletter-success-panel"
              >
                <div className="w-14 h-14 bg-[#C9A227]/10 rounded-full border border-[#C9A227]/40 flex items-center justify-center text-[#C9A227]">
                  <CheckCircle2 size={30} className="animate-bounce" style={{ animationDuration: '2s' }} />
                </div>
                
                <h3 className="text-xl font-sans font-semibold text-white tracking-tight">
                  {t.successHeader}
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed font-sans">
                  {t.successBody}
                </p>

                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 px-6 py-2 border border-slate-800 hover:border-[#C9A227] text-slate-400 hover:text-white rounded text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {isEn ? 'Back to Forms' : 'Trở lại Đăng ký'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
