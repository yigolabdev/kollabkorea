
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
          className="font-brand fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-12 py-10"
          style={{
            WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)'
          }}
        >
          <div 
            className="cursor-pointer z-50 uppercase flex flex-col items-center gap-0"
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
            className="lg:hidden text-black z-50 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
             {mobileMenuOpen ? <X size={36} /> : <Menu size={36} />}
          </button>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="fixed inset-0 z-40 bg-[#EDEBE4] flex flex-col items-center justify-center gap-10 lg:hidden"
              >
                {SECTIONS.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleNav(item)}
                    className="text-6xl font-extrabold text-black uppercase tracking-tight"
                  >
                    {item}
                  </button>
                ))}
                <button 
                  onClick={() => handleNav('CONTACT')}
                  className="mt-8 bg-black text-[#EDEBE4] px-14 py-6 text-2xl font-extrabold uppercase tracking-[0.22em] hover:bg-kollab-red transition-all"
                >
                  APPLY NOW
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
