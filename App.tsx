
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Platform from './pages/Platform';
import Brands from './pages/Brands';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import LanguageToggle from './components/LanguageToggle';
import { getPathFromUrl, navigateToPage } from './utils/navigation';
import { scrollToTop, isScrollable, getScrollableParent } from './utils/scroll';
import type { PageId } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageId>(getPathFromUrl());
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    setShowNavbar(true);
    scrollToTop('auto');
  }, [currentPage]);

  // Prevent overscroll "escape" at top/bottom (wheel input)
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      // Allow pinch-to-zoom / trackpad zoom gestures
      if (e.ctrlKey) return;
      if (e.deltaY === 0) return;

      const targetEl = (e.target as Element | null) ?? null;
      const scrollParent = getScrollableParent(targetEl);
      if (scrollParent) {
        const top = (scrollParent as HTMLElement).scrollTop;
        const max = (scrollParent as HTMLElement).scrollHeight - (scrollParent as HTMLElement).clientHeight;
        const atTop = top <= 0;
        const atBottom = top >= max - 1;
        if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom)) {
          e.preventDefault();
        }
        return;
      }

      const docEl = document.documentElement;
      const scrollTop = window.scrollY || docEl.scrollTop;
      const maxScroll = docEl.scrollHeight - window.innerHeight;
      const atTop = scrollTop <= 0;
      const atBottom = scrollTop >= maxScroll - 1;
      if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom)) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel as EventListener);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const page = getPathFromUrl();
      setCurrentPage(page);
      setShowNavbar(true);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleHeaderVisibility = useCallback((_isVisible: boolean) => {
    // No-op: 홈에서도 항상 헤더 노출
  }, []);

  const navigateTo = useCallback((page: string) => {
    const pageId = page.toLowerCase() as PageId;
    setCurrentPage(pageId);
    navigateToPage(pageId);
    scrollToTop('auto');
    setShowNavbar(true);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home onNavigate={navigateTo} onHeaderVisibilityChange={handleHeaderVisibility} />;
      case 'about': return <About onNavigate={navigateTo} />;
      case 'platform': return <Platform />;
      case 'brands': return <Brands navigateTo={navigateTo} />;
      case 'contact': return <Contact />;
      case 'faq': return <FAQ />;
      default: return <Home onNavigate={navigateTo} onHeaderVisibilityChange={handleHeaderVisibility} />;
    }
  };

  return (
    <div style={{ display: 'contents' }}>
      <LanguageToggle />
      
      <Navbar currentPage={currentPage} onNavigate={navigateTo} isVisible={showNavbar} />
      {showNavbar && (
        currentPage === 'home' ? (
          <div aria-hidden className="h-[120px] md:h-[144px]" />
        ) : (
          <div aria-hidden style={{ height: 'var(--nav-h, 88px)' }} />
        )
      )}

      <main style={{ display: 'contents' }}>
        {renderPage()}
      </main>

      <Footer onNavigate={navigateTo} />
    </div>
  );
};

export default App;
