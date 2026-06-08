/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, Landmark, Search } from 'lucide-react';
import DragonLogo from './DragonLogo';
import { PageId, Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface HeaderProps {
  activePage: PageId;
  setActivePage: (page: PageId) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onSubmitDealClick: () => void;
  onBookDiscussionClick: () => void;
  onSearchClick: () => void;
}

export default function Header({
  activePage,
  setActivePage,
  language,
  setLanguage,
  onSubmitDealClick,
  onBookDiscussionClick,
  onSearchClick,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = (key: string) => TRANSLATIONS[language][key] || key;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: PageId; labelKey: string }[] = [
    { id: 'home', labelKey: 'NAV_HOME' },
    { id: 'about', labelKey: 'NAV_ABOUT' },
    { id: 'services', labelKey: 'NAV_SERVICES' },
    { id: 'governance', labelKey: 'NAV_GOVERNANCE' },
    { id: 'industries', labelKey: 'NAV_INDUSTRIES' },
    { id: 'process', labelKey: 'NAV_PROCESS' },
    { id: 'insights', labelKey: 'NAV_INSIGHTS' },
    { id: 'founders', labelKey: 'NAV_FOUNDERS' },
    { id: 'contact', labelKey: 'NAV_CONTACT' },
  ];

  const handleNavClick = (pageId: PageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLanguageToggle = () => {
    setLanguage(language === 'EN' ? 'VI' : 'EN');
  };

  return (
    <>
      <header
        id="corporate-sticky-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#000000]/95 backdrop-blur-md border-b border-[#C9A227]/30 py-3 shadow-lg'
            : 'bg-transparent border-b border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top subtle branding badge on desktop if not scrolled */}
          {!isScrolled && (
            <div
              className="hidden lg:flex items-center justify-between mb-2 text-[10px] uppercase tracking-widest text-[#9CA3AF] opacity-80"
              id="top-micro-brand-bar"
            >
              <div className="flex items-center gap-1.5">
                <Landmark size={11} className="text-[#C9A227]" />
                <span>{t('MANAGED_BY')}</span>
              </div>
              <div className="tracking-widest">{t('THINK_FORWARD')}</div>
            </div>
          )}

          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              className="cursor-pointer"
              onClick={() => handleNavClick('home')}
              id="brand-logo-nav"
            >
              <DragonLogo showText={true} theme="dark" size="md" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-1.5" id="desktop-nav-menu">
              {navItems.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-link-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-3 py-1.5 rounded text-sm transition-all duration-300 relative ${
                      isActive
                        ? 'text-white font-medium'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>{t(item.labelKey)}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-[1.5px] bg-gradient-to-r from-[#C9A227]/40 via-[#C9A227] to-[#C9A227]/40" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* CTAs and Utils */}
            <div className="hidden lg:flex items-center gap-4" id="header-ctas-utils">
              {/* Search Trigger */}
              <button
                onClick={onSearchClick}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs tracking-widest font-mono text-[#F4F6F8] hover:text-[#C9A227] hover:bg-white/5 border border-white/10 hover:border-[#C9A227]/30 transition-all duration-300 cursor-pointer"
                title="Search / Tìm kiếm"
                id="header-search-trigger"
              >
                <Search size={13} className="text-[#C9A227]/80" />
                <span>{language === 'EN' ? 'SEARCH' : 'TÌM KIẾM'}</span>
              </button>

              {/* Language Toggle */}
              <button
                onClick={handleLanguageToggle}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded text-xs tracking-widest font-mono text-[#F4F6F8] hover:text-[#C9A227] hover:bg-white/5 border border-white/10 hover:border-[#C9A227]/30 transition-all duration-300"
                title="Change Language / Đổi ngôn ngữ"
                id="language-selector-btn"
              >
                <Globe size={13} className="text-[#C9A227]/80" />
                <span>{language === 'EN' ? 'VI' : 'EN'}</span>
              </button>

              {/* Secondary CTA: Book Discussion */}
              <button
                id="header-cta-book"
                onClick={onBookDiscussionClick}
                className="hidden xl:inline-block px-3.5 py-1.5 rounded text-xs font-medium tracking-wide text-slate-300 hover:text-[#C9A227] border border-slate-600 hover:border-[#C9A227]/50 hover:bg-slate-900/50 transition-all duration-300"
              >
                {t('BTN_BOOK_DISCUSSION')}
              </button>

              {/* Primary CTA: Submit Your Deal */}
              <button
                id="header-cta-submit"
                onClick={onSubmitDealClick}
                className="px-4 py-1.5 rounded text-xs font-semibold tracking-wide bg-[#C9A227] text-black shadow-[0_0_15px_rgba(201,162,39,0.2)] hover:bg-[#D4AF37] hover:shadow-[0_0_20px_rgba(201,162,39,0.4)] transition-all duration-300"
              >
                {t('BTN_SUBMIT_DEAL')}
              </button>
            </div>

            {/* Mobile Actions: Language toggle & Hamburger */}
            <div className="flex xl:hidden items-center gap-2">
              <button
                onClick={onSearchClick}
                className="flex items-center gap-1 px-2 py-1 rounded text-xs font-mono text-slate-300 border border-white/10 cursor-pointer text-[10px]"
                id="mobile-search-toggle"
              >
                <Search size={11} className="text-[#C9A227]" />
                <span>{language === 'EN' ? 'SEARCH' : 'TÌM'}</span>
              </button>

              <button
                onClick={handleLanguageToggle}
                className="flex items-center gap-1 px-2 py-1 rounded text-xs font-mono text-slate-300 border border-white/10"
                id="mobile-language-toggle"
              >
                <Globe size={12} className="text-[#C9A227]" />
                <span>{language === 'EN' ? 'VI' : 'EN'}</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1 rounded text-slate-300 hover:text-white hover:bg-white/5 transition"
                aria-label="Toggle navigation menu"
                id="mobile-hamburger-btn"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        id="mobile-navigation-drawer"
        className={`fixed inset-y-0 right-0 z-40 w-full max-w-xs bg-[#000000] border-l border-slate-800 shadow-2xl p-6 flex flex-col justify-between transform transition-transform duration-500 ease-out xl:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-8 mt-16">
          <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-[#9CA3AF] pb-4 border-b border-white/5">
            <Landmark size={10} className="text-[#C9A227]" />
            <span>{t('MANAGED_BY')}</span>
          </div>

          {/* Links list */}
          <nav className="flex flex-col gap-4" id="mobile-nav-links">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left py-2 text-base transition-colors ${
                    isActive
                      ? 'text-[#C9A227] font-medium pl-2 border-l-2 border-[#C9A227]'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {t(item.labelKey)}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Action Buttons at the Bottom */}
        <div className="flex flex-col gap-3 pt-6 border-t border-white/5">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onBookDiscussionClick();
            }}
            className="w-full py-2.5 rounded text-xs font-semibold tracking-wide text-center text-slate-300 border border-slate-300/45 hover:bg-white/5"
            id="mobile-nav-book"
          >
            {t('BTN_BOOK_DISCUSSION')}
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onSubmitDealClick();
            }}
            className="w-full py-2.5 rounded text-xs font-bold tracking-wide text-center bg-[#C9A227] text-black shadow-lg"
            id="mobile-nav-submit"
          >
            {t('BTN_SUBMIT_DEAL')}
          </button>
          <p className="text-[10px] text-center text-[#9CA3AF] mt-4 font-mono uppercase tracking-widest">
            {t('THINK_FORWARD')}
          </p>
        </div>
      </div>

      {/* Backdrop for mobile drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm xl:hidden"
        />
      )}
    </>
  );
}
