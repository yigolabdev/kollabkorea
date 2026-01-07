
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
    <>
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
              className="cursor-pointer uppercase flex flex-col items-center gap-0"
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

            {/* 모바일 햄버거 버튼 */}
            <button 
              className="lg:hidden text-black p-2 touch-manipulation active:scale-95 transition-transform"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <Menu size={32} strokeWidth={2.5} />
            </button>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* 모바일 전용 풀스크린 메뉴 */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99999] bg-white lg:hidden"
          >
            {/* 상단 헤더 영역 - 고정 */}
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-8 bg-white border-b border-zinc-200">
              {/* 로고 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="cursor-pointer uppercase flex flex-col items-center gap-0"
                onClick={() => handleNav('home')}
              >
                <span className="block text-3xl font-extrabold tracking-tight text-black leading-none">
                  KOLLAB
                </span>
                <span className="block text-xs font-extrabold tracking-[0.42em] text-black/70 leading-none mt-0.5">
                  KOREA
                </span>
              </motion.div>

              {/* 닫기 버튼 */}
              <motion.button
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.15 }}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 touch-manipulation active:scale-95 transition-transform"
                aria-label="Close mobile menu"
              >
                <X size={32} strokeWidth={2.5} className="text-black" />
              </motion.button>
            </div>

            {/* 메뉴 콘텐츠 영역 - 스크롤 가능 */}
            <div className="h-full pt-24 pb-8 px-6 overflow-y-auto flex flex-col items-center justify-center gap-6">
              {SECTIONS.map((item, index) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.2 + (index * 0.08),
                    type: 'spring',
                    damping: 20,
                    stiffness: 200
                  }}
                  onClick={() => handleNav(item)}
                  className={`text-4xl font-extrabold uppercase tracking-tight touch-manipulation py-4 px-8 transition-all active:scale-95 ${
                    currentPage === item.toLowerCase() 
                      ? 'text-kollab-red scale-110' 
                      : 'text-black active:text-kollab-red'
                  }`}
                >
                  {item}
                </motion.button>
              ))}

              {/* Apply Now 버튼 */}
              <motion.button 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.2 + (SECTIONS.length * 0.08),
                  type: 'spring',
                  damping: 20,
                  stiffness: 200
                }}
                onClick={() => handleNav('CONTACT')}
                className="mt-8 bg-kollab-red text-white px-12 py-5 text-lg font-extrabold uppercase tracking-[0.22em] touch-manipulation shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
              >
                APPLY NOW
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
