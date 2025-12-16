import React, { useState, useCallback, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { NAVIGATION_LINKS, SCROLL_THRESHOLD } from '../constants';
import { useScrollPosition, useClickOutside } from '../hooks';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrolled } = useScrollPosition(SCROLL_THRESHOLD);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleLinkClick = useCallback(() => {
    closeMenu();
  }, [closeMenu]);

  // 모바일 메뉴 외부 클릭 시 닫기
  useClickOutside(mobileMenuRef, closeMenu);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black py-4 border-b border-zinc-800' : 'bg-transparent py-6'
      }`}
      role="navigation"
      aria-label="메인 네비게이션"
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a 
          href="#" 
          className="group flex items-center gap-1"
          aria-label="KOLLAB 홈으로 이동"
        >
          <span className="text-3xl font-black tracking-tighter text-white group-hover:text-kollab-red transition-colors">
            KOLLAB
          </span>
          <div 
            className="h-2 w-2 bg-kollab-red rounded-full opacity-0 group-hover:opacity-100 transition-opacity" 
            aria-hidden="true"
          />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10" role="menubar">
          {NAVIGATION_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-bold text-zinc-300 hover:text-white hover:text-kollab-red transition-colors tracking-widest uppercase"
              role="menuitem"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white hover:text-kollab-red transition-colors p-2" 
          onClick={toggleMenu}
          aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div 
          id="mobile-menu"
          ref={mobileMenuRef}
          className="md:hidden absolute top-full left-0 w-full bg-black border-t border-zinc-800 py-0 shadow-xl h-screen"
          role="menu"
        >
          <div className="flex flex-col divide-y divide-zinc-900">
            {NAVIGATION_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-2xl font-black text-white hover:bg-zinc-900 hover:text-kollab-red p-8 transition-colors uppercase tracking-tighter"
                onClick={handleLinkClick}
                role="menuitem"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};