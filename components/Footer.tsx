
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
      className="py-24 px-6 md:px-12 bg-white relative z-10 w-full"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
        <div className="space-y-6">
          <img 
            src="https://kollabkorea.s3.ap-northeast-2.amazonaws.com/assets/images/kollab_squar_logo-05.jpg" 
            alt="KOLLAB" 
            className="h-24 w-auto grayscale hover:grayscale-0 transition-all duration-500"
          />
          <p className="text-xl font-semibold text-black/60 uppercase tracking-[0.02em]">From Korea to the U.S.</p>
        </div>
        <div className="space-y-6 md:text-right flex flex-col md:items-end">
          <p className="text-sm font-extrabold text-black uppercase tracking-[0.1em]">CONTACT INFORMATION</p>
          <div className="space-y-2 text-base font-semibold text-[#1A1A1A] uppercase leading-relaxed tracking-wide flex flex-col md:items-end">
            <p>AM 10:00 - PM 08:00</p>
            <p>info@kollabkorea.com</p>
            <a 
              href="http://instagram.com/kollabkorea" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-50 transition-opacity pt-1"
            >
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex justify-center items-center pt-12 border-t border-black/10">
        <p className="text-xs text-black/40 tracking-[0.22em] uppercase font-extrabold text-center">© 2026 KOLLAB KOREA. ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  );
};

export default Footer;
