/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId, Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { ARTICLES_DB } from '../data/articles';
import NewsletterSignup from '../components/NewsletterSignup';
import { Clock, Filter, ArrowLeft, Send, CheckCircle2, ChevronRight, BookOpen } from 'lucide-react';

interface InsightsPageProps {
  language: Language;
  selectedArticleId: string | null;
  setSelectedArticleId: (id: string | null) => void;
  onBookDiscussionClick: () => void;
}

export default function InsightsPage({
  language,
  selectedArticleId,
  setSelectedArticleId,
  onBookDiscussionClick,
}: InsightsPageProps) {
  const t = (key: string) => TRANSLATIONS[language][key] || key;
  const isEn = language === 'EN';

  // Categories list
  const categories = [
    { en: 'All', vi: 'Tất cả' },
    { en: 'Capital Readiness', vi: 'Chuẩn bị Gọi vốn' },
    { en: 'Governance Before Capital', vi: 'Quản trị đi trước' },
    { en: 'Fundraising Strategy', vi: 'Chiến lược Gọi vốn' },
    { en: 'Transaction Insights', vi: 'Kiến thức Giao dịch' },
    { en: 'Consumer Growth', vi: 'Tăng trưởng Tiêu dùng' },
    { en: 'Beyond the Round', vi: 'Giá trị dài hạn' },
  ];

  const [activeCategory, setActiveCategory] = useState('All');

  // Filter articles based on active category
  const filteredArticles = ARTICLES_DB.filter((art) => {
    if (activeCategory === 'All') return true;
    return art.categoryEN === activeCategory || art.categoryVI === activeCategory;
  });

  const selectedArticle = ARTICLES_DB.find((art) => art.id === selectedArticleId);

  // Scroll to top when reading an article
  useEffect(() => {
    if (selectedArticleId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedArticleId]);

  const handleBackToCatalog = () => {
    setSelectedArticleId(null);
  };

  // 1. ARTICLE READER MODE
  if (selectedArticleId && selectedArticle) {
    const relatedArticles = ARTICLES_DB.filter(
      (art) =>
        art.id !== selectedArticle.id &&
        (art.categoryEN === selectedArticle.categoryEN || art.categoryVI === selectedArticle.categoryVI)
    ).slice(0, 2);

    return (
      <div className="flex flex-col min-h-screen bg-[#02050A]" id="corporate-article-reader">
        {/* Dark Navy Hero Header */}
        <section className="relative pt-36 pb-10 bg-gradient-to-b from-[#101F35]/40 to-transparent border-b border-slate-900" id="reader-hero">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-4">
            <button
              onClick={handleBackToCatalog}
              className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#C9A227] hover:text-white transition duration-300 mb-2"
              id="reader-back-btn"
            >
              <ArrowLeft size={14} />
              <span>{isEn ? 'BACK TO PERSPECTIVES' : 'QUAY LẠI CHUYÊN MỤC'}</span>
            </button>

            {/* Gold Category Label */}
            <span className="inline-block px-2.5 py-1 rounded bg-[#C9A227]/25 text-[10px] sm:text-xs font-mono font-bold tracking-widest text-[#C9A227] uppercase">
              {isEn ? selectedArticle.categoryEN : selectedArticle.categoryVI}
            </span>

            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-sans font-medium tracking-tight text-white leading-tight">
              {isEn ? selectedArticle.titleEN : selectedArticle.titleVI}
            </h1>

            <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 font-mono">
              <span>{selectedArticle.publishedDate}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {selectedArticle.readingTime} {t('EST_READING_TIME')}
              </span>
            </div>
          </div>
        </section>

        {/* Crisp High-Contrast Soft Ivory / White reading card area */}
        <article className="py-8 bg-[#FFF2EA] text-slate-900" id="reader-content-body">
          <div className="max-w-3xl mx-auto px-4 prose prose-slate sm:prose-lg text-left" id="reader-rich-prose">
            {/* Comfortable Typography Content Box */}
            <div className="whitespace-pre-line text-sm sm:text-base leading-relaxed space-y-6 text-slate-800 font-sans">
              {isEn ? selectedArticle.contentEN : selectedArticle.contentVI}
            </div>

            {/* Custom CTA Banner at the end */}
            <div className="mt-16 p-8 rounded bg-[#101F35] text-white border border-[#C9A227]/40 text-center space-y-4 shadow-xl" id="reader-end-cta">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#C9A227] block font-bold">
                ALIGNMENT ADVISORY
              </span>
              <h3 className="text-md sm:text-lg font-sans font-medium max-w-lg mx-auto">
                {isEn
                  ? 'Preparing for capital or governance improvement?'
                  : 'Đang chuẩn bị lộ trình gọi vốn hay nâng cấp bộ chỉ số quản trị?'}
              </h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                {isEn
                  ? 'Start a confidential pre-screening dialogue with AG Capital Advisory.'
                  : 'Hãy thảo luận sơ bộ bảo mật cùng các chuyên gia đại lý của chúng tôi.'}
              </p>
              <div className="pt-2">
                <button
                  onClick={onBookDiscussionClick}
                  className="px-6 py-2.5 bg-[#C9A227] hover:bg-[#D4AF37] text-black font-semibold text-xs tracking-wider uppercase rounded"
                >
                  {t('BTN_BOOK_DISCUSSION')}
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles row */}
        {relatedArticles.length > 0 && (
          <section className="py-8 bg-[#000] border-t border-slate-900" id="reader-related-articles">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
              <h4 className="text-xs font-mono tracking-widest text-slate-500 uppercase mb-8">
                {isEn ? 'CONTINUE READING' : 'GÓC PHÂN TÍCH TƯƠNG ĐỒNG'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedArticles.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => setSelectedArticleId(art.id)}
                    className="p-5 rounded bg-slate-950 border border-slate-900 hover:border-[#C9A227]/30 cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-mono text-[#C9A227] uppercase tracking-wider block mb-2">
                        {isEn ? art.categoryEN : art.categoryVI}
                      </span>
                      <h5 className="text-sm font-semibold text-white line-clamp-2 leading-snug">
                        {isEn ? art.titleEN : art.titleVI}
                      </h5>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[11px] text-[#C9A227] mt-4 font-semibold">
                      <span>{t('READ_ARTICLE')}</span>
                      <ChevronRight size={11} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    );
  }

  // 2. MAIN CATALOG MODE
  // SPOTLIGHT FEATURED ARTICLE: First article in matching DB
  const spotlightArticle = filteredArticles[0];
  const gridArticles = filteredArticles.slice(1);

  return (
    <div className="flex flex-col min-h-screen bg-[#02050A]" id="corporate-insights-page">
      {/* Hero Header */}
      <section className="relative pt-36 pb-8 bg-gradient-to-b from-[#101F35]/30 to-transparent border-b border-slate-900" id="insights-hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C9A227] block mb-3">
            {isEn ? 'AG INTELLIGENCE' : 'HỆ TRI THỨC ĐỒNG HÀNH'}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-medium tracking-tight text-white max-w-4xl leading-tight font-sans">
            {isEn ? 'Perspectives on Capital, Governance & Consumer Growth' : 'Góc nhìn Phân tích Tư duy Gọi vốn & Thể chế Quản lý'}
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-4 max-w-2xl leading-relaxed">
            {isEn
              ? 'Practical thinking for founders building investable and enduring consumer businesses in Vietnam.'
              : 'Góc ghi chép có chiều sâu dành riêng cho các sáng lập viên khao khát chuẩn hóa vận hành làm điểm tựa thăng tiến dòng vốn lớn.'}
          </p>
        </div>
      </section>

      {/* Categories Toggle Bar */}
      <section className="py-6 bg-[#000] border-b border-slate-950 sticky top-16 md:top-20 z-30 opacity-95 backdrop-blur" id="insights-categories-scroller">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto whitespace-nowrap scrollbar-hide py-1">
          <div className="flex items-center gap-1.5" id="category-scroller-track">
            <Filter size={12} className="text-[#C9A227] shrink-0 mr-2" />
            {categories.map((cat) => {
              const catLabel = isEn ? cat.en : cat.vi;
              const isActive = activeCategory === (isEn ? cat.en : cat.vi) || (cat.en === 'All' && activeCategory === 'All');
              return (
                <button
                  key={cat.en}
                  onClick={() => {
                    setActiveCategory(isEn ? cat.en : cat.vi);
                    setSelectedArticleId(null);
                  }}
                  className={`px-3 py-1.5 text-xs font-medium font-sans tracking-tight rounded transition-all duration-200 ${
                    activeCategory === cat.en || activeCategory === cat.vi
                      ? 'bg-[#C9A227] text-black font-semibold shadow-md'
                      : 'text-slate-400 bg-slate-900 border border-slate-900 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {catLabel}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Spotlight and grid area */}
      <section className="py-8 bg-[#02050A]" id="insights-catalog-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-20 border border-slate-900 rounded bg-slate-950" id="no-articles-view">
              <BookOpen size={44} className="text-[#C9A227]/40 mx-auto mb-4" />
              <h4 className="text-white font-medium text-lg">
                {isEn ? 'No articles found in this category' : 'Chưa có bài viết ở chuyên mục này'}
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                {isEn ? 'Check back soon for upcoming insights.' : 'Các nghiên cứu mới nhất đang được biên dịch.'}
              </p>
            </div>
          ) : (
            <>
              {/* Featured article spotlight block */}
              {spotlightArticle && activeCategory === 'All' && (
                <div
                  onClick={() => setSelectedArticleId(spotlightArticle.id)}
                  className="bg-slate-950 border border-slate-900 rounded p-6 sm:p-8 cursor-pointer group hover:border-[#C9A227]/50 transition duration-500 text-left grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                  id="insights-spotlight-card"
                >
                  <div className="lg:col-span-4" id="spotlight-visual-decor">
                    <div className="h-56 rounded bg-[#101F35]/40 border border-[#C9A227]/10 flex flex-col items-center justify-center p-8 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#1F3A5F]/20 to-[#C9A227]/5" />
                      <span className="font-mono text-xs tracking-widest text-slate-500 uppercase block mb-2 font-bold">{isEn ? 'FEATURED PERSPECTIVE' : 'TIÊU ĐIỂM CHUYÊN MÔN'}</span>
                      <BookOpen className="text-[#C9A227]/60 group-hover:scale-110 transition duration-500" size={32} />
                      <span className="text-[10px] text-slate-500 font-mono tracking-widest mt-4 uppercase">AG Capital Advisory</span>
                    </div>
                  </div>

                  <div className="lg:col-span-8 space-y-4">
                    <div className="flex items-center gap-3 text-xs font-mono font-medium tracking-wider text-[#C9A227] uppercase">
                      <span>{isEn ? spotlightArticle.categoryEN : spotlightArticle.categoryVI}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                      <span>{spotlightArticle.publishedDate}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-sans text-white group-hover:text-[#C9A227] transition leading-snug">
                      {isEn ? spotlightArticle.titleEN : spotlightArticle.titleVI}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {isEn ? spotlightArticle.excerptEN : spotlightArticle.excerptVI}
                    </p>
                    <div className="inline-flex items-center gap-2 text-xs text-[#C9A227] font-semibold pt-2">
                      <span>{t('READ_ARTICLE')}</span>
                      <ChevronRight size={13} className="group-hover:translate-x-0.5 transition" />
                    </div>
                  </div>
                </div>
              )}

              {/* Grid block of remaining articles */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="insights-articles-grid-list">
                {(activeCategory === 'All' ? gridArticles : filteredArticles).map((article) => (
                  <div
                    key={article.id}
                    onClick={() => setSelectedArticleId(article.id)}
                    className="group bg-slate-950 border border-slate-900 rounded p-6 cursor-pointer flex flex-col justify-between hover:border-[#C9A227]/40 transition duration-300 text-left"
                    id={`art-card-${article.slug}`}
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-4 text-[10px] font-mono font-medium tracking-wider text-[#C9A227] uppercase">
                        <span>{isEn ? article.categoryEN : article.categoryVI}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-850" />
                        <span className="flex items-center gap-1 shrink-0">
                          <Clock size={10} />
                          {article.readingTime} {t('EST_READING_TIME')}
                        </span>
                      </div>
                      <h4 className="text-md font-semibold text-white group-hover:text-[#C9A227] transition line-clamp-2 leading-snug">
                        {isEn ? article.titleEN : article.titleVI}
                      </h4>
                      <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                        {isEn ? article.excerptEN : article.excerptVI}
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-xs text-[#C9A227] mt-6 font-semibold group-hover:underline text-left">
                      <span>{t('READ_ARTICLE')}</span>
                      <ChevronRight size={12} className="group-hover:translate-x-0.5 transition" />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Newsletter section nested beautifully inside */}
          <div className="pt-12 border-t border-slate-950">
            <NewsletterSignup language={language} />
          </div>
        </div>
      </section>
    </div>
  );
}
