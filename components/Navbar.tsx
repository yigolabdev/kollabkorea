import React, { useState } from 'react';
import { NAVIGATION } from '../constants';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface NavbarProps {
  activeSection: string;
  onApplyClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, onApplyClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'ko' ? 'en' : 'ko');
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#e4e0db]/95 backdrop-blur-md border-b border-black/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center">
          <a href="#home" className="flex items-center group">
            <img 
              src="logo.png" 
              alt="KOLLAB" 
              className="h-6 md:h-7 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'block';
              }}
            />
            <span className="hidden logo-font text-2xl md:text-3xl tracking-tighter text-black" style={{ display: 'none' }}>
              KOLLAB<span className="text-[#dc0000]">KOREA</span>
            </span>
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {NAVIGATION.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-[11px] font-black tracking-widest transition-colors duration-300 uppercase ${
                activeSection === item.href.substring(1) 
                  ? 'text-[#dc0000]' 
                  : 'text-black hover:text-[#dc0000]'
              }`}
            >
              {t(`nav.${item.label.toLowerCase()}`)}
            </a>
          ))}
          
          {/* Language Switcher */}
          <button 
            onClick={toggleLanguage}
            className="flex items-center space-x-2 px-3 py-1 border border-black/20 hover:border-black transition-all rounded-full bg-white/50"
          >
            <Globe size={14} className="text-black" />
            <span className="text-[10px] font-black tracking-widest uppercase text-black">
              {language === 'ko' ? 'EN' : 'KO'}
            </span>
          </button>

          <button
            onClick={onApplyClick}
            className="px-6 py-2 bg-black text-white text-[10px] font-black tracking-widest hover:bg-[#dc0000] transition-colors uppercase"
          >
            {t('nav.apply')}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 text-black" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#e4e0db] border-t border-black/10 absolute top-20 left-0 w-full py-10 px-6 flex flex-col space-y-6 shadow-lg">
          {NAVIGATION.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-3xl font-black tracking-tighter text-black hover:text-[#dc0000] transition-colors uppercase"
            >
              {t(`nav.${item.label.toLowerCase()}`)}
            </a>
          ))}
          <button 
            onClick={() => { toggleLanguage(); setIsOpen(false); }}
            className="text-left text-2xl font-black tracking-tighter text-gray-600 hover:text-black"
          >
            SWITCH TO {language === 'ko' ? 'ENGLISH' : '한국어'}
          </button>
          <button
            onClick={() => { onApplyClick(); setIsOpen(false); }}
            className="w-full py-6 bg-black text-white text-center font-black tracking-widest hover:bg-[#dc0000] transition-colors uppercase"
          >
            {t('nav.apply')}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
