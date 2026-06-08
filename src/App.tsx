/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId, Language } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import ServicesPage from './pages/ServicesPage';
import GovernanceAdvisoryPage from './pages/GovernanceAdvisoryPage';
import IndustriesPage from './pages/IndustriesPage';
import OurProcessPage from './pages/OurProcessPage';
import ForFoundersPage from './pages/ForFoundersPage';
import InsightsPage from './pages/InsightsPage';
import ContactPage from './pages/ContactPage';
import AlignmentPage from './pages/AlignmentPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import DisclaimerPage from './pages/DisclaimerPage';
import ConfidentialityPage from './pages/ConfidentialityPage';
import { ContactInquiryForm, DealSubmissionForm } from './components/LeadForms';
import { X } from 'lucide-react';
import { TRANSLATIONS } from './translations';
import LiveEditorPanel from './components/LiveEditorPanel';
import { InitialAppLoader, TopProgressBar, PageSkeleton } from './components/SkeletonLoader';
import Breadcrumbs from './components/Breadcrumbs';
import ScrollToTop from './components/ScrollToTop';
import SearchModal from './components/SearchModal';

export default function App() {
  const [language, setLanguage] = useState<Language>('EN');
  const [activePage, setActivePage] = useState<PageId>('home');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [editorRevision, setEditorRevision] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);

  // Perceived performance state controls
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const [pendingPageId, setPendingPageId] = useState<PageId | null>(null);

  // Transition initial loaders at kickoff
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1100);
    return () => clearTimeout(timer);
  }, []);

  const triggerRefresh = () => {
    setEditorRevision((prev) => prev + 1);
  };

  const t = (key: string) => TRANSLATIONS[language][key] || key;

  // Global overlay modal states
  type ModalType = null | 'book' | 'submit';
  const [modalType, setModalType] = useState<ModalType>(null);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalType(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Listen and parse key workspace administration parameters for query toggles
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('cms') === 'true' || params.get('admin') === 'true') {
        localStorage.setItem('ag_cms_enabled', 'true');
        window.dispatchEvent(new Event('cms_state_changed'));
      } else if (params.get('cms') === 'false' || params.get('admin') === 'false') {
        localStorage.removeItem('ag_cms_enabled');
        window.dispatchEvent(new Event('cms_state_changed'));
      }
    }
  }, []);

  // Scroll to top on page navigation with simulating high-fidelity transition states
  const handlePageChange = (newPageId: PageId) => {
    setPendingPageId(newPageId);
    setIsPageTransitioning(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const transitionTimer = setTimeout(() => {
      setActivePage(newPageId);
      setSelectedArticleId(null); // Reset read article
      setIsPageTransitioning(false);
      setPendingPageId(null);
    }, 450); // Liquid 450ms block representing premium layout calculations
  };

  // Helper trigger to handle direct article links
  const handleSelectedArticleId = (id: string | null) => {
    setSelectedArticleId(id);
    if (id) {
      setActivePage('insights');
    }
  };

  // Switch to correct pages upon clicking CTA buttons
  const handleBookDiscussionClick = () => {
    setModalType('book');
  };

  const handleSubmitDealClick = () => {
    setModalType('submit');
  };

  // Render proper child component based on activePage state
  const renderPageContent = () => {
    switch (activePage) {
      case 'home':
        return (
          <Home
            language={language}
            setActivePage={handlePageChange}
            onSubmitDealClick={handleSubmitDealClick}
            onBookDiscussionClick={handleBookDiscussionClick}
            setSelectedArticleId={handleSelectedArticleId}
          />
        );
      case 'about':
        return (
          <About
            language={language}
            setActivePage={handlePageChange}
            onBookDiscussionClick={handleBookDiscussionClick}
          />
        );
      case 'services':
        return (
          <ServicesPage
            language={language}
            setActivePage={handlePageChange}
            onSubmitDealClick={handleSubmitDealClick}
            onBookDiscussionClick={handleBookDiscussionClick}
          />
        );
      case 'governance':
        return (
          <GovernanceAdvisoryPage
            language={language}
            setActivePage={handlePageChange}
            onBookDiscussionClick={handleBookDiscussionClick}
          />
        );
      case 'industries':
        return (
          <IndustriesPage
            language={language}
            setActivePage={handlePageChange}
            onSubmitDealClick={handleSubmitDealClick}
          />
        );
      case 'process':
        return (
          <OurProcessPage
            language={language}
            setActivePage={handlePageChange}
            onSubmitDealClick={handleSubmitDealClick}
          />
        );
      case 'founders':
        return (
          <ForFoundersPage
            language={language}
            setActivePage={handlePageChange}
          />
        );
      case 'insights':
        return (
          <InsightsPage
            language={language}
            selectedArticleId={selectedArticleId}
            setSelectedArticleId={setSelectedArticleId}
            onBookDiscussionClick={handleBookDiscussionClick}
          />
        );
      case 'contact':
        return (
          <ContactPage
            language={language}
            setActivePage={handlePageChange}
          />
        );
      case 'alignment':
        return (
          <AlignmentPage
            language={language}
            setActivePage={handlePageChange}
            onBookDiscussionClick={handleBookDiscussionClick}
          />
        );
      case 'privacy':
        return <PrivacyPage language={language} />;
      case 'terms':
        return <TermsPage language={language} />;
      case 'disclaimer':
        return <DisclaimerPage language={language} />;
      case 'confidentiality':
        return <ConfidentialityPage language={language} />;
      default:
        return (
          <Home
            language={language}
            setActivePage={handlePageChange}
            onSubmitDealClick={handleSubmitDealClick}
            onBookDiscussionClick={handleBookDiscussionClick}
            setSelectedArticleId={handleSelectedArticleId}
          />
        );
    }
  };

  if (isInitialLoading) {
    return <InitialAppLoader language={language} />;
  }

  return (
    <div className="flex flex-col min-h-screen text-slate-100 bg-[#02050A]" id="ag-capital-root" key={editorRevision}>
      {isPageTransitioning && <TopProgressBar />}

      {/* Global Header */}
      <Header
        language={language}
        setLanguage={setLanguage}
        activePage={activePage}
        setActivePage={handlePageChange}
        onSubmitDealClick={handleSubmitDealClick}
        onBookDiscussionClick={handleBookDiscussionClick}
        onSearchClick={() => setSearchOpen(true)}
      />

      {/* Dynamic Breadcrumbs */}
      <Breadcrumbs
        language={language}
        activePage={activePage}
        setActivePage={handlePageChange}
        selectedArticleId={selectedArticleId}
        setSelectedArticleId={handleSelectedArticleId}
      />

      {/* Main View Area with high perceived-performance transition skeleton screens */}
      <main className="flex-grow">
        {isPageTransitioning ? (
          <PageSkeleton pageId={pendingPageId || activePage} />
        ) : (
          renderPageContent()
        )}
      </main>

      {/* Global Footer */}
      <Footer
        language={language}
        setActivePage={handlePageChange}
      />

      {/* Dynamic CTA Modals */}
      {modalType && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto transition-opacity"
          id="global-modal-overlay"
          onClick={() => setModalType(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-slate-950 border border-slate-900 rounded p-6 sm:p-8 max-h-[90vh] overflow-y-auto mt-12 mb-6"
            id="global-modal-container"
            onClick={(e) => e.stopPropagation()} // Stop closing on body click
          >
            {/* Close button */}
            <button
              onClick={() => setModalType(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white hover:bg-slate-900 rounded-full transition-colors"
              id="global-modal-close"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {modalType === 'book' ? (
              <div id="modal-book-box">
                <span className="font-mono text-[9px] tracking-widest text-[#C9A227] uppercase block mb-2 font-bold animate-pulse">
                  {t('MODAL_BOOK_BADGE')}
                </span>
                <h3 className="text-xl font-bold font-sans text-white mb-6">
                  {t('MODAL_BOOK_TITLE')}
                </h3>
                <ContactInquiryForm language={language} onSuccess={() => setTimeout(() => setModalType(null), 2500)} />
              </div>
            ) : (
              <div id="modal-submit-box">
                <span className="font-mono text-[9px] tracking-widest text-[#C9A227] uppercase block mb-2 font-bold animate-pulse">
                  {t('MODAL_SUBMIT_BADGE')}
                </span>
                <h3 className="text-xl font-bold font-sans text-white mb-6">
                  {t('MODAL_SUBMIT_TITLE')}
                </h3>
                <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                  {t('MODAL_SUBMIT_SUB')}
                </p>
                <DealSubmissionForm language={language} onSuccess={() => setTimeout(() => setModalType(null), 2500)} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Scroll to Top floating actions */}
      <ScrollToTop />

      {/* Global Search Overlay Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        language={language}
        setActivePage={handlePageChange}
        setSelectedArticleId={handleSelectedArticleId}
      />

      {/* Corporate Website Live visual CMS and Emblem editor */}
      <LiveEditorPanel language={language} onRefresh={triggerRefresh} />
    </div>
  );
}
