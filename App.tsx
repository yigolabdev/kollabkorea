
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

const App: React.FC = () => {
  const getPath = () => window.location.pathname.replace('/', '') || 'home';

  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'platform' | 'brands' | 'contact' | 'faq'>(getPath() as any);
  
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    setShowNavbar(true);
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    const handlePopState = () => {
      const page = getPath() as any;
      setCurrentPage(page);
      setShowNavbar(true);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleHeaderVisibility = useCallback((_isVisible: boolean) => {
    // No-op: 홈에서도 항상 헤더 노출
  }, []);

  const navigateTo = (page: string) => {
    const pageId = page.toLowerCase() as any;
    setCurrentPage(pageId);
    window.history.pushState({}, '', `/${pageId === 'home' ? '' : pageId}`);
    
    window.scrollTo({ top: 0, behavior: 'auto' });
    setShowNavbar(true);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home onNavigate={navigateTo} onHeaderVisibilityChange={handleHeaderVisibility} />;
      case 'about': return <About />;
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
        currentPage === 'about' ? (
          <div aria-hidden className="h-[64px] md:h-[88px]" />
        ) : (
          <div aria-hidden className="h-[120px] md:h-[144px]" />
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
