
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isVisible: boolean;
}

const SECTIONS = ['ABOUT', 'PLATFORM', 'BRANDS', 'CONTACT', 'FAQ'] as const;

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, isVisible }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navHeight, setNavHeight] = useState<number>(0);
  const lastScrollY = useRef(0);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Add background when scrolled past 50px
      setScrolled(currentScrollY > 50);
      
      // Hide header when scrolling down, show when scrolling up
      // Hide immediately when scroll-down starts (no buffer)
      if (currentScrollY > lastScrollY.current && currentScrollY > 0 && !mobileMenuOpen) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  // 모바일 메뉴 열렸을 때 body 스크롤 방지
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const updateNavHeight = () => {
      const el = navRef.current;
      if (!el) return;
      const h = Math.ceil(el.getBoundingClientRect().height);
      document.documentElement.style.setProperty('--nav-h', `${h}px`);
      setNavHeight(h);
    };

    // Initial measurement
    updateNavHeight();

    // Re-measure after fonts load (can affect nav height)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fonts: any = (document as any).fonts;
    if (fonts?.ready?.then) {
      fonts.ready.then(() => updateNavHeight()).catch(() => {});
    }

    // Observe size changes
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && navRef.current) {
      ro = new ResizeObserver(() => updateNavHeight());
      ro.observe(navRef.current);
    }

    window.addEventListener('resize', updateNavHeight);
    return () => {
      window.removeEventListener('resize', updateNavHeight);
      ro?.disconnect();
    };
  }, []);

  const handleNav = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setHidden(false);
  };

  return (
    <AnimatePresence initial={false}>
      {isVisible && (
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ 
            y: hidden ? -(navHeight || 140) : 0, 
            opacity: 1,
            backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0)',
            backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)'
          }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ 
            duration: 0.7, 
            ease: [0.22, 1, 0.36, 1],
            backgroundColor: { duration: 0.3 },
            backdropFilter: { duration: 0.3 }
          }}
          ref={(node) => {
            navRef.current = node;
          }}
          className="font-brand fixed top-0 left-0 right-0 z-[9999] flex items-center justify-between px-6 md:px-12 py-10"
          style={{
            WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)'
          }}
        >
          <div 
            className="cursor-pointer z-[10001] uppercase flex flex-col items-center gap-0"
            onClick={() => handleNav('home')}
          >
            <span className="block text-4xl font-extrabold tracking-tight text-black leading-none text-center">
              KOLLAB
            </span>
            <span className="block text-sm font-extrabold tracking-[0.42em] text-black/70 leading-none mt-1 text-center">
              KOREA
            </span>
          </div>
          
          <div className="hidden lg:flex gap-10 text-base font-extrabold tracking-[0.22em] uppercase text-black">
            {SECTIONS.map((item) => (
              <button 
                key={item} 
                onClick={() => handleNav(item)}
                className={`transition-all bg-transparent border-none cursor-pointer hover:opacity-50 relative group ${
                  currentPage === item.toLowerCase() ? 'text-black' : 'text-black/60'
                }`}
              >
                {item}
                <span className={`absolute -bottom-2 left-0 w-full h-px bg-black transform origin-left transition-transform duration-300 ${currentPage === item.toLowerCase() ? 'scale-x-100' : 'scale-x-0'}`}></span>
              </button>
            ))}
          </div>
          
          <button 
            onClick={() => handleNav('CONTACT')}
            className="hidden lg:inline-block bg-black text-[#EDEBE4] px-10 py-4 text-base font-extrabold tracking-[0.22em] uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:bg-kollab-red hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            APPLY NOW
          </button>

          <button 
            className="lg:hidden text-black z-[10001] p-2 touch-manipulation"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
             {mobileMenuOpen ? <X size={36} strokeWidth={2} /> : <Menu size={36} strokeWidth={2} />}
          </button>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{ 
                  type: 'spring',
                  damping: 30,
                  stiffness: 300,
                  duration: 0.3
                }}
                className="fixed inset-0 z-[10000] bg-[#EDEBE4] flex flex-col items-center justify-center gap-8 lg:hidden overflow-hidden"
              >
                {SECTIONS.map((item, index) => (
                  <motion.button
                    key={item}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleNav(item)}
                    className={`text-5xl sm:text-6xl font-extrabold uppercase tracking-tight touch-manipulation py-3 px-6 transition-colors ${
                      currentPage === item.toLowerCase() 
                        ? 'text-kollab-red' 
                        : 'text-black hover:text-kollab-red'
                    }`}
                  >
                    {item}
                  </motion.button>
                ))}
                <motion.button 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: SECTIONS.length * 0.05 }}
                  onClick={() => handleNav('CONTACT')}
                  className="mt-6 bg-black text-[#EDEBE4] px-12 py-5 text-xl font-extrabold uppercase tracking-[0.22em] hover:bg-kollab-red transition-all touch-manipulation shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)]"
                >
                  APPLY NOW
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
