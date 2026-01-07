
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Instagram } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer 
      className="font-brand py-24 px-6 md:px-12 bg-black text-white relative z-10 w-full"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
        <div className="space-y-6">
          <button
            type="button"
            onClick={() => onNavigate?.('home')}
            className="cursor-pointer uppercase flex flex-col items-center gap-0 bg-transparent border-none p-0 text-center"
          >
            <span className="block text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-none">
              KOLLAB
            </span>
            <span className="block text-base md:text-lg font-extrabold tracking-[0.42em] text-white leading-none mt-2">
              KOREA
            </span>
          </button>
        </div>
        <div className="space-y-6 md:text-right flex flex-col md:items-end">
          <p className="text-sm font-extrabold text-white uppercase tracking-[0.1em]">CONTACT INFORMATION</p>
          <div className="space-y-2 text-base font-semibold text-white uppercase leading-relaxed tracking-wide flex flex-col md:items-end">
            <p>AM 10:00 - PM 08:00</p>
            <p>info@kollabkorea.com</p>
            <a 
              href="https://www.instagram.com/kollab_korea" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-50 transition-opacity pt-1 text-white"
            >
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex justify-center items-center pt-12 border-t border-[#EDEBE4]/15">
        <p className="text-xs text-white tracking-[0.22em] uppercase font-extrabold text-center">© 2026 KOLLAB KOREA. ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  );
};

export default Footer;
