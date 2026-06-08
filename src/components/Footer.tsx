/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import DragonLogo from './DragonLogo';
import { PageId, Language } from '../types';
import { SITE_CONFIG, SOCIAL_LINKS } from '../config';
import { TRANSLATIONS } from '../translations';
import { Mail, Globe, Send, Linkedin } from 'lucide-react';

interface FooterProps {
  language: Language;
  setActivePage: (page: PageId) => void;
}

export default function Footer({ language, setActivePage }: FooterProps) {
  const t = (key: string) => TRANSLATIONS[language][key] || key;
  const isEn = language === 'EN';

  const [isCmsEnabled, setIsCmsEnabled] = React.useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('ag_cms_enabled') === 'true';
    }
    return false;
  });

  const [copiedLink, setCopiedLink] = React.useState(false);

  React.useEffect(() => {
    const handleCmsStateChanged = () => {
      setIsCmsEnabled(localStorage.getItem('ag_cms_enabled') === 'true');
    };
    window.addEventListener('cms_state_changed', handleCmsStateChanged);
    return () => {
      window.removeEventListener('cms_state_changed', handleCmsStateChanged);
    };
  }, []);

  const handleToggleCms = () => {
    const nextState = !isCmsEnabled;
    if (nextState) {
      localStorage.setItem('ag_cms_enabled', 'true');
    } else {
      localStorage.removeItem('ag_cms_enabled');
    }
    setIsCmsEnabled(nextState);
    window.dispatchEvent(new Event('cms_state_changed'));
  };

  const handleCopyCmsLink = () => {
    if (typeof window !== 'undefined') {
      const adminUrl = `${window.location.origin}${window.location.pathname}?cms=true`;
      navigator.clipboard.writeText(adminUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleLinkClick = (pageId: PageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="corporate-footer"
      className="bg-[#000] border-t border-[#C9A227]/20 text-slate-400 font-sans pt-16 pb-8 px-4 sm:px-6 lg:px-8 mt-auto"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-900">
        {/* Column 1: Brand overview */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          <div onClick={() => handleLinkClick('home')} className="cursor-pointer">
            <DragonLogo size="md" showText={true} />
          </div>
          <p className="text-sm leading-relaxed text-slate-400 mt-2">
            {t('FOOTER_SHORT_DESC')}
          </p>
          <div className="flex flex-col gap-2.5 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Mail size={13} className="text-[#C9A227]" />
              <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-white transition">
                {SITE_CONFIG.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Globe size={13} className="text-[#C9A227]" />
              <a
                href={`https://${SITE_CONFIG.website}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition"
              >
                {SITE_CONFIG.website}
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-full bg-slate-900 border border-slate-800 hover:border-[#C9A227]/50 hover:text-white transition"
              aria-label="LinkedIn"
            >
              <Linkedin size={14} />
            </a>
            <a
              href={SOCIAL_LINKS.telegram}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-full bg-slate-900 border border-slate-800 hover:border-[#C9A227]/50 hover:text-white transition"
              aria-label="Telegram"
            >
              <Send size={14} />
            </a>
          </div>
        </div>

        {/* Column 2: Services */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white border-l-2 border-[#C9A227] pl-2">
            {t('FOOTER_SERVICES')}
          </h4>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <button
                onClick={() => handleLinkClick('services')}
                className="hover:text-white transition text-left"
              >
                {t('SERV_1_TITLE')}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLinkClick('governance')}
                className="hover:text-white transition text-left text-[#C9A227]/90 hover:text-[#C9A227]"
              >
                {t('NAV_GOVERNANCE')}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLinkClick('services')}
                className="hover:text-white transition text-left"
              >
                {t('SERV_3_TITLE')}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLinkClick('services')}
                className="hover:text-white transition text-left"
              >
                {t('SERV_4_TITLE')}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLinkClick('services')}
                className="hover:text-white transition text-left"
              >
                {t('SERV_5_TITLE')}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLinkClick('services')}
                className="hover:text-white transition text-left"
              >
                {t('SERV_6_TITLE')}
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Company */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white border-l-2 border-[#C9A227] pl-2">
            {t('FOOTER_COMPANY')}
          </h4>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <button
                onClick={() => handleLinkClick('about')}
                className="hover:text-white transition text-left"
              >
                {t('NAV_ABOUT')}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLinkClick('industries')}
                className="hover:text-white transition text-left"
              >
                {t('NAV_INDUSTRIES')}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLinkClick('process')}
                className="hover:text-white transition text-left"
              >
                {t('NAV_PROCESS')}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLinkClick('insights')}
                className="hover:text-white transition text-left"
              >
                {t('NAV_INSIGHTS')}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLinkClick('founders')}
                className="hover:text-white transition text-left"
              >
                {t('NAV_FOUNDERS')}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLinkClick('contact')}
                className="hover:text-white transition text-left"
              >
                {t('NAV_CONTACT')}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLinkClick('alignment')}
                className="hover:text-[#C9A227] text-slate-300 transition text-left underline underline-offset-4 decoration-[#C9A227]/30"
              >
                {t('NAV_ALIGNMENT')}
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Legal */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white border-l-2 border-[#C9A227] pl-2">
            {t('FOOTER_LEGAL')}
          </h4>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <button
                onClick={() => handleLinkClick('privacy')}
                className="hover:text-white transition text-left text-xs"
              >
                {t('PRIVACY_POLICY')}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLinkClick('terms')}
                className="hover:text-white transition text-left text-xs"
              >
                {t('TERMS_OF_USE')}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLinkClick('disclaimer')}
                className="hover:text-white transition text-left text-xs"
              >
                {t('ADVISORY_DISCLAIMER')}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLinkClick('confidentiality')}
                className="hover:text-white transition text-left text-xs"
              >
                {t('CONFIDENTIALITY_NOTICE')}
              </button>
            </li>
          </ul>

          <div className="mt-4 p-3.5 rounded bg-slate-950 border border-[#C9A227]/10 flex flex-col gap-2.5" id="cms-control-dashboard-footer">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#C9A227] font-semibold">
                {isEn ? 'CMS MANAGEMENT PANEL' : 'QUẢN LÝ NỘI DUNG CMS'}
              </span>
              <div className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${isCmsEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400">
                  {isCmsEnabled 
                    ? (isEn ? 'ACTIVE' : 'ĐANG HOẠT ĐỘNG') 
                    : (isEn ? 'OFFLINE' : 'CHƯA KÍCH HOẠT')}
                </span>
              </div>
            </div>

            <p className="text-[10px] leading-relaxed text-slate-500">
              {isEn 
                ? 'Toggle the Live CMS Editor directly below, or copy the secure admin link to bookmark/share.' 
                : 'Kích hoạt trực tiếp bảng CMS trực quan ở dưới, hoặc sao chép liên kết quản trị viên bảo mật.'}
            </p>

            <div className="grid grid-cols-2 gap-2 mt-1">
              {/* direct toggle */}
              <button
                onClick={handleToggleCms}
                className={`py-1.5 px-2.5 rounded text-[10px] font-mono uppercase tracking-wider font-semibold border text-center transition duration-300 pointer-events-auto cursor-pointer ${
                  isCmsEnabled 
                    ? 'bg-rose-950/40 hover:bg-rose-900/40 border-rose-900/50 text-rose-300' 
                    : 'bg-emerald-950/40 hover:bg-emerald-900/40 border-emerald-900/50 text-emerald-300'
                }`}
                title="Toggle CMS Widget visible state"
              >
                {isCmsEnabled 
                  ? (isEn ? 'DISABLE CMS' : 'TẮT TRÌNH CMS') 
                  : (isEn ? 'LAUNCH CMS' : 'BẬT TRÌNH CMS')}
              </button>

              {/* copy link */}
              <button
                onClick={handleCopyCmsLink}
                className="py-1.5 px-2 px-2.5 rounded text-[10px] font-mono uppercase tracking-wider font-semibold bg-slate-900 hover:bg-slate-850 hover:text-[#C9A227] border border-slate-800 text-slate-300 transition duration-300 cursor-pointer"
                title="Copy secure admin parameter link"
              >
                {copiedLink 
                  ? (isEn ? 'COPIED!' : 'ĐÃ CHÉP!') 
                  : (isEn ? 'COPY LINK' : 'CHÉP LINK ADMIN')}
              </button>
            </div>

            <div className="h-[1px] bg-slate-900 my-1" />

            <div className="text-[9px] text-slate-600 leading-tight">
              {isEn 
                ? 'Tip: Append "?cms=true" to the URL anytime to force administrator tools on any screen.' 
                : 'Mẹo: Thêm tham số "?cms=true" vào sau đường link để tự động mở bảng tuỳ chỉnh.'}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex flex-col md:flex-row items-center gap-3 text-center md:text-left">
          <span>
            © 2026 AG Capital Advisory. Managed by AG Invest. {t('FOOTER_RIGHTS')}
          </span>
          <span className="hidden md:inline text-slate-800">|</span>
          <span className="text-[#9CA3AF] transition hover:text-slate-300">
            {SITE_CONFIG.address}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#C9A227]/70 uppercase">
          <span>{t('THINK_FORWARD')}</span>
        </div>
      </div>
    </footer>
  );
}
