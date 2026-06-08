/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { PageId, Language, Article } from '../types';
import { Search as SearchIcon, X, FileText, Landmark, ShieldCheck, ArrowRight } from 'lucide-react';
import { ARTICLES_DB } from '../data/articles';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  setActivePage: (page: PageId) => void;
  setSelectedArticleId: (id: string | null) => void;
}

interface SearchableService {
  titleEN: string;
  titleVI: string;
  descEN: string;
  descVI: string;
  pageId: PageId;
}

interface SearchablePage {
  titleEN: string;
  titleVI: string;
  descEN: string;
  descVI: string;
  pageId: PageId;
}

const SEARCHABLE_SERVICES: SearchableService[] = [
  {
    titleEN: 'Fundraising Strategy',
    titleVI: 'Chiến lược Gọi vốn',
    descEN: 'Pre-seed to Series A support, dilution modeling, and funding roadmaps.',
    descVI: 'Đồng hành từ Vòng sơ khởi đến Series A, mô phỏng pha loãng và lộ trình gọi vốn.',
    pageId: 'services',
  },
  {
    titleEN: 'Growth Equity Advisory',
    titleVI: 'Cố vấn Vốn chuyên sâu (Growth Equity)',
    descEN: 'Series B, preferred shares, liquidation preferences, and exit planning.',
    descVI: 'Hỗ trợ Series B-C, cổ phần ưu đãi, điều khoản thanh lý và kế hoạch chuyển giao.',
    pageId: 'services',
  },
  {
    titleEN: 'M&A Advisory',
    titleVI: 'Tư vấn Mua bán & Sáp nhập (M&A)',
    descEN: 'Buy-side & sell-side transaction structuring, due diligence, and valuation.',
    descVI: 'Đại diện bên mua/bên bán, thiết kế cấu trúc thương vụ, soát xét pháp lý và định giá.',
    pageId: 'services',
  },
  {
    titleEN: 'Corporate Governance Advisory',
    titleVI: 'Tư vấn Thể chế & Quản trị Doanh nghiệp',
    descEN: 'Readiness checklists, clean cap tables, decision frameworks, and corporate disciplines.',
    descVI: 'Bộ chỉ số sẵn sàng, làm sạch bảng cap table, phân tách quyền hành và báo cáo quản trị.',
    pageId: 'governance',
  },
  {
    titleEN: 'Investor-Ready Materials',
    titleVI: 'Hồ sơ Gọi vốn chuẩn Phát hành',
    descEN: 'Pitch decks, teases, financial models, valuation analyses, and data rooms.',
    descVI: 'Xây dựng slide gọi vốn pitch-deck, mô hình tài chính động và giải trình định giá.',
    pageId: 'services',
  },
  {
    titleEN: 'Investor Access',
    titleVI: 'Kết nối mạng lưới Nhà đầu tư',
    descEN: 'Appetite matching, targeted lists, selective outreach to PE/VC funds.',
    descVI: 'Lọc khẩu vị nhà đầu tư, xây dựng danh sách quỹ và tổ chức tiếp cận bảo mật.',
    pageId: 'services',
  },
];

const SEARCHABLE_PAGES: SearchablePage[] = [
  {
    titleEN: 'About Us & Leadership',
    titleVI: 'Về AG Capital & Hội đồng Cố vấn',
    descEN: 'Our philosophy, parent ecosystem trust, and active advisory council.',
    descVI: 'Triết lý đồng hành, hệ sinh thái AG Invest và Hội đồng cố vấn uy tín.',
    pageId: 'about',
  },
  {
    titleEN: 'For Founders Checklist',
    titleVI: 'Góc Nhà Sáng Lập & Thử thách Thẩm định',
    descEN: 'Pre-check self assessments to measure if your consumer startup is ready.',
    descVI: 'Bài tự thẩm định nhanh xem doanh nghiệp đã sẵn sàng đón dòng vốn định chế chưa.',
    pageId: 'founders',
  },
  {
    titleEN: 'Our Alignment Model (Fee-into-Equity)',
    titleVI: 'Mô hình Đồng hành & Chuyển đổi Phí thành Cổ phần',
    descEN: 'How we align with founders by converting success support fees to equity.',
    descVI: 'Thiết lập lợi ích dài hạn bền bỉ bằng cơ chế chuyển phí dịch vụ thành cổ phần.',
    pageId: 'alignment',
  },
  {
    titleEN: 'Execution Process Framework',
    titleVI: 'Khung Quy trình thực thi thương vụ',
    descEN: 'Step-by-step rigorous process from intake and screening to structured closings.',
    descVI: 'Lộ trình tư vấn chi tiết từ đánh giá, chuẩn bị tài liệu đến kết thúc thương vụ.',
    pageId: 'process',
  },
  {
    titleEN: 'Contact & Secure Deal Submission',
    titleVI: 'Gửi Hồ sơ Thương vụ & Kênh Liên hệ',
    descEN: 'Initiate a secure discussion or submit your preliminary financials directly.',
    descVI: 'Khởi động cuộc thảo luận bảo mật hoặc nộp trực tiếp thông tin dự án.',
    pageId: 'contact',
  },
];

const POPULAR_SUGGESTIONS = [
  { EN: 'M&A', VI: 'Mua bán sáp nhập' },
  { EN: 'Governance', VI: 'Quản trị' },
  { EN: 'Dilution', VI: 'Pha loãng' },
  { EN: 'Series B', VI: 'Vòng gọi vốn lớn' },
  { EN: 'Valuation', VI: 'Định giá' },
];

export default function SearchModal({
  isOpen,
  onClose,
  language,
  setActivePage,
  setSelectedArticleId,
}: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{
    articles: Article[];
    services: SearchableService[];
    pages: SearchablePage[];
  }>({
    articles: [],
    services: [],
    pages: [],
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const isEn = language === 'EN';

  // Automatically focus the input when open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults({ articles: [], services: [], pages: [] });
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  // Handle hotkey ESC to close search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Handle search filtration logic
  useEffect(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      setResults({ articles: [], services: [], pages: [] });
      return;
    }

    // Filter articles
    const matchedArticles = ARTICLES_DB.filter((art) => {
      return (
        art.titleEN.toLowerCase().includes(trimmed) ||
        art.titleVI.toLowerCase().includes(trimmed) ||
        art.excerptEN.toLowerCase().includes(trimmed) ||
        art.excerptVI.toLowerCase().includes(trimmed) ||
        art.contentEN.toLowerCase().includes(trimmed) ||
        art.contentVI.toLowerCase().includes(trimmed) ||
        art.categoryEN.toLowerCase().includes(trimmed) ||
        art.categoryVI.toLowerCase().includes(trimmed)
      );
    });

    // Filter services
    const matchedServices = SEARCHABLE_SERVICES.filter((ser) => {
      return (
        ser.titleEN.toLowerCase().includes(trimmed) ||
        ser.titleVI.toLowerCase().includes(trimmed) ||
        ser.descEN.toLowerCase().includes(trimmed) ||
        ser.descVI.toLowerCase().includes(trimmed)
      );
    });

    // Filter general pages
    const matchedPages = SEARCHABLE_PAGES.filter((p) => {
      return (
        p.titleEN.toLowerCase().includes(trimmed) ||
        p.titleVI.toLowerCase().includes(trimmed) ||
        p.descEN.toLowerCase().includes(trimmed) ||
        p.descVI.toLowerCase().includes(trimmed)
      );
    });

    setResults({
      articles: matchedArticles,
      services: matchedServices,
      pages: matchedPages,
    });
  }, [query]);

  if (!isOpen) return null;

  const handlePageSelect = (pageId: PageId) => {
    setActivePage(pageId);
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleArticleSelect = (articleId: string) => {
    setSelectedArticleId(articleId);
    setActivePage('insights');
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasSearchContent = query.trim().length > 0;
  const noResultsFound =
    hasSearchContent &&
    results.articles.length === 0 &&
    results.services.length === 0 &&
    results.pages.length === 0;

  return (
    <div
      id="search-overlay-modal"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-start justify-center pt-20 pb-8 px-4"
      onClick={onClose}
    >
      {/* Search Modal Panel Box */}
      <div
        id="search-panel-container"
        className="relative w-full max-w-2xl bg-[#02050A] border border-[#C9A227]/30 rounded-xl max-h-[85vh] flex flex-col overflow-hidden shadow-[0_0_50px_rgba(201,162,39,0.15)] animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Search Input */}
        <div className="flex items-center gap-3 p-4 border-b border-slate-900 bg-[#000]">
          <SearchIcon size={18} className="text-[#C9A227] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              isEn
                ? 'Search articles, services, governance terms...'
                : 'Tìm bài viết, dịch vụ cố vấn, hồ sơ phát hành...'
            }
            className="w-full bg-transparent border-none text-white text-sm outline-none focus:ring-0 placeholder-slate-500 font-sans"
            id="search-input-field"
          />

          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/5 font-sans text-xs flex items-center gap-1"
              id="search-clear-btn"
            >
              {isEn ? 'Clear' : 'Xóa'}
            </button>
          )}

          <div className="h-4 w-[1px] bg-slate-800" />

          {/* Close trigger button */}
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-[#C9A227] transition-colors focus:outline-none"
            title={isEn ? 'Close Search (Esc)' : 'Đóng (Esc)'}
            id="search-close-top-btn"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Results Area */}
        <div className="flex-grow overflow-y-auto p-5 space-y-6" id="search-results-area">
          {/* 1. INITIAL EMPTY QUERY STATE (SUGGESTED FILTERS) */}
          {!hasSearchContent && (
            <div className="space-y-5 animate-fade-in" id="search-suggested-initial">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#C9A227] block mb-3 font-bold">
                  ⚡ {isEn ? 'POPULAR TOPICS' : 'CHỦ ĐỀ ĐƯỢC QUAN TÂM'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SUGGESTIONS.map((sug, idx) => {
                    const tag = isEn ? sug.EN : sug.VI;
                    return (
                      <button
                        key={idx}
                        onClick={() => setQuery(tag)}
                        className="px-3 py-1.5 rounded-full text-xs bg-slate-900 border border-slate-800 text-slate-300 hover:text-[#C9A227] hover:border-[#C9A227]/40 transition-all font-sans cursor-pointer"
                        id={`popular-sug-btn-${idx}`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#C9A227] block mb-3 font-bold">
                  📁 {isEn ? 'QUICK DIRECTORIES' : 'DANH MỤC TRUY CẬP'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {SEARCHABLE_PAGES.map((page, idx) => (
                    <button
                      key={idx}
                      onClick={() => handlePageSelect(page.pageId)}
                      className="group flex items-start gap-3 p-3 rounded bg-slate-950 border border-slate-900 hover:border-[#C9A227]/25 text-left transition-colors"
                      id={`quick-dir-p-${idx}`}
                    >
                      <Landmark size={14} className="text-[#C9A227] mt-0.5" />
                      <div className="space-y-0.5">
                        <div className="text-xs font-semibold text-white group-hover:text-[#C9A227] transition-colors font-sans">
                          {isEn ? page.titleEN : page.titleVI}
                        </div>
                        <p className="text-[10px] text-slate-500 leading-normal font-sans">
                          {isEn ? page.descEN : page.descVI}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. NO RESULTS BOX */}
          {noResultsFound && (
            <div className="text-center py-12 px-4 space-y-3 animate-fade-in" id="search-no-results">
              <div className="text-2xl">🔍</div>
              <h4 className="text-sm font-semibold text-white font-sans">
                {isEn ? 'No results found' : 'Không tìm thấy kết quả nào'}
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed font-sans">
                {isEn
                  ? `We couldn't find matches for "${query}". Try looking for generic corporate terms like M&A, Dilution, or Series B.`
                  : `Không tìm thấy tài liệu phù hợp cho từ khóa "${query}". Hãy thử tìm kiếm các thuật ngữ chuyển sâu như M&A, Pha Loãng, Cố Vấn hoặc Series B.`}
              </p>
            </div>
          )}

          {/* 3. ARTICLES RESULTS */}
          {results.articles.length > 0 && (
            <div className="space-y-3 animate-fade-in" id="search-result-articles-block">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#C9A227] block font-bold border-b border-slate-900 pb-1.5">
                📝 {isEn ? 'INSIGHTS & INTEL' : 'GÓC NHÌN & TRI THỨC'} ({results.articles.length})
              </span>
              <div className="space-y-2.5">
                {results.articles.map((art) => (
                  <button
                    key={art.id}
                    onClick={() => handleArticleSelect(art.id)}
                    className="group w-full block text-left p-3 rounded.lg bg-slate-950 border border-slate-900 hover:border-[#C9A227]/30 hover:bg-slate-900/10 transition-colors cursor-pointer"
                    id={`search-art-result-${art.id}`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="font-mono text-[8.5px] uppercase tracking-widest text-[#C9A227] font-bold">
                        {isEn ? art.categoryEN : art.categoryVI}
                      </span>
                      <span className="text-slate-700">•</span>
                      <span className="font-mono text-[8.5px] text-slate-500">
                        {art.readingTime} {isEn ? 'min read' : 'phút đọc'}
                      </span>
                    </div>
                    <h4 className="text-xs font-semibold text-white group-hover:text-[#C9A227] transition-colors leading-snug font-sans flex items-center justify-between">
                      <span>{isEn ? art.titleEN : art.titleVI}</span>
                      <ArrowRight size={11} className="opacity-0 group-hover:opacity-100 text-[#C9A227] transition-opacity shrink-0 ml-2" />
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-1 lines-clamp-2 leading-relaxed font-sans">
                      {isEn ? art.excerptEN : art.excerptVI}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 4. ADVISORY SERVICES RESULTS */}
          {results.services.length > 0 && (
            <div className="space-y-3 animate-fade-in" id="search-result-services-block">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#C9A227] block font-bold border-b border-slate-900 pb-1.5">
                🏆 {isEn ? 'ADVISORY SERVICES' : 'DỊCH VỤ CỐ VẤN'} ({results.services.length})
              </span>
              <div className="space-y-2">
                {results.services.map((ser, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePageSelect(ser.pageId)}
                    className="group w-full block text-left p-3 rounded-lg bg-slate-950 border border-slate-900 hover:border-[#C9A227]/30 hover:bg-slate-900/10 transition-colors cursor-pointer"
                    id={`search-ser-result-${idx}`}
                  >
                    <h4 className="text-xs font-semibold text-white group-hover:text-[#C9A227] transition-colors flex items-center gap-1.5 font-sans">
                      <ShieldCheck size={11.5} className="text-[#C9A227]" />
                      <span>{isEn ? ser.titleEN : ser.titleVI}</span>
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed font-sans">
                      {isEn ? ser.descEN : ser.descVI}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 5. DIRECT PAGES RESULTS */}
          {results.pages.length > 0 && (
            <div className="space-y-3 animate-fade-in" id="search-result-pages-block">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#C9A227] block font-bold border-b border-slate-900 pb-1.5">
                🧭 {isEn ? 'CORE CORPORATE VIEWS' : 'CHUYÊN MỤC THÔN TIN'} ({results.pages.length})
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {results.pages.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePageSelect(p.pageId)}
                    className="group w-full block text-left p-2.5 rounded bg-slate-950 border border-slate-900 hover:border-[#C9A227]/30 hover:bg-gradient-to-r hover:from-white/[0.02] to-transparent transition-colors cursor-pointer"
                    id={`search-p-result-${idx}`}
                  >
                    <div className="text-xs font-semibold text-white group-hover:text-[#C9A227] transition-colors leading-tight font-sans flex items-center justify-between">
                      <span>{isEn ? p.titleEN : p.titleVI}</span>
                      <ArrowRight size={10} className="text-slate-600 group-hover:text-[#C9A227] transition-colors" />
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5 truncate font-sans">
                      {isEn ? p.descEN : p.descVI}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info banner */}
        <div className="p-3 bg-[#000] border-t border-slate-900 text-center flex items-center justify-center gap-1 text-[8.5px] font-mono text-slate-500 tracking-wider">
          <span>🎯 {isEn ? 'Press' : 'Bấm'}</span>
          <kbd className="px-1 py-0.5 bg-slate-900 rounded text-slate-300 font-sans border border-slate-800">ESC</kbd>
          <span>{isEn ? 'anytime to dismiss search' : 'bất kỳ lúc nào để thoát tìm kiếm'}</span>
        </div>
      </div>
    </div>
  );
}
