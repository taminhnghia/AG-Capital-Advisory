/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PageId, Language } from '../types';
import { ChevronRight, Home as HomeIcon } from 'lucide-react';
import { ARTICLES_DB } from '../data/articles';

interface BreadcrumbsProps {
  language: Language;
  activePage: PageId;
  setActivePage: (page: PageId) => void;
  selectedArticleId: string | null;
  setSelectedArticleId: (id: string | null) => void;
}

const PAGE_LABELS: Record<PageId, { EN: string; VI: string }> = {
  home: { EN: 'Home', VI: 'Trang chủ' },
  about: { EN: 'About Us', VI: 'Về chúng tôi' },
  services: { EN: 'Services', VI: 'Dịch vụ chọn lọc' },
  governance: { EN: 'Governance Advisory', VI: 'Cố vấn quản trị' },
  industries: { EN: 'Industries', VI: 'Lĩnh vực trọng tâm' },
  process: { EN: 'Our Process', VI: 'Quy trình thực thi' },
  founders: { EN: 'For Founders', VI: 'Sáng lập viên' },
  insights: { EN: 'Insights', VI: 'Góc nhìn & Tri thức' },
  contact: { EN: 'Contact', VI: 'Liên hệ' },
  alignment: { EN: 'Alignment Model', VI: 'Mô hình đồng hành' },
  privacy: { EN: 'Privacy Policy', VI: 'Chính sách bảo mật' },
  terms: { EN: 'Terms of Service', VI: 'Điều khoản sử dụng' },
  disclaimer: { EN: 'Legal Disclaimer', VI: 'Tuyên bố miễn trừ' },
  confidentiality: { EN: 'Confidentiality Charter', VI: 'Điều khoản bảo mật' },
};

export default function Breadcrumbs({
  language,
  activePage,
  setActivePage,
  selectedArticleId,
  setSelectedArticleId,
}: BreadcrumbsProps) {
  if (activePage === 'home') return null;

  const isEn = language === 'EN';
  const labels = PAGE_LABELS[activePage] || { EN: activePage, VI: activePage };
  const currentLabel = isEn ? labels.EN : labels.VI;

  let articleTitle = '';
  if (activePage === 'insights' && selectedArticleId) {
    const article = ARTICLES_DB.find((a) => a.id === selectedArticleId);
    if (article) {
      articleTitle = isEn ? article.titleEN : article.titleVI;
      if (articleTitle.length > 35) {
        articleTitle = articleTitle.slice(0, 32) + '...';
      }
    }
  }

  const handleHomeClick = () => {
    setActivePage('home');
  };

  const handleInsightsClick = () => {
    setSelectedArticleId(null);
    setActivePage('insights');
  };

  return (
    <div 
      className="absolute top-[82px] lg:top-[92px] left-0 right-0 z-30 pointer-events-none" 
      id="site-wide-breadcrumbs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav 
          className="inline-flex items-center gap-2 py-2 px-3 rounded-full bg-[#02050A]/70 backdrop-blur-md border border-[#C9A227]/10 text-[9px] tracking-widest font-mono text-slate-400 pointer-events-auto shadow-lg shadow-black/80" 
          aria-label="Breadcrumb"
        >
          {/* Home Node */}
          <button
            onClick={handleHomeClick}
            className="flex items-center gap-1 hover:text-[#C9A227] text-slate-400 transition-colors uppercase font-mono"
            id="breadcrumb-home-btn"
          >
            <HomeIcon size={10} className="text-[#C9A227]" />
            <span>{isEn ? 'HOME' : 'TRANG CHỦ'}</span>
          </button>

          <ChevronRight size={10} className="text-[#C9A227]/30" />

          {selectedArticleId && activePage === 'insights' ? (
            <>
              {/* Mid Parent Node - Insights */}
              <button
                onClick={handleInsightsClick}
                className="hover:text-[#C9A227] text-slate-400 transition-colors uppercase font-mono"
                id="breadcrumb-parent-insights"
              >
                {isEn ? 'INSIGHTS' : 'TRI THỨC'}
              </button>
              <ChevronRight size={10} className="text-[#C9A227]/30" />
              {/* Leaf Node - Active Article */}
              <span className="text-[#C9A227] font-medium uppercase font-mono truncate max-w-[150px] sm:max-w-xs block" id="breadcrumb-current-item">
                {articleTitle}
              </span>
            </>
          ) : (
            // Leaf Node - Active Page Label
            <span className="text-[#C9A227] font-medium uppercase font-mono" id="breadcrumb-current-item">
              {currentLabel}
            </span>
          )}
        </nav>
      </div>
    </div>
  );
}
