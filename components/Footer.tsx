import React from 'react';
import { Mail, Instagram, Clock } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer 
      id="contact" 
      className="w-full flex flex-col justify-center bg-black px-6 border-t border-zinc-900 py-16 md:py-20"
      role="contentinfo"
    >
      <div className="container mx-auto flex flex-col h-full justify-center">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 flex-grow gap-8">
          
          <div className="flex flex-col justify-center h-full">
            <div className="text-kollab-red font-bold text-xs md:text-sm mb-4 tracking-[0.2em] uppercase">Contact Us</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter mb-4 leading-none">
              LET'S <br/><span className="text-kollab-red">KOLLAB</span>
            </h2>
            <p className="text-base md:text-xl font-bold text-zinc-500 mt-3">
              Where Seoul Meets LA
            </p>
          </div>

          <div className="mt-6 md:mt-0 bg-zinc-900/50 p-6 md:p-10 border border-zinc-800 min-w-[280px] md:min-w-[400px]">
            <h3 className="font-black text-base md:text-xl mb-6 text-white uppercase tracking-widest">Headquarters</h3>
            <address className="space-y-5 text-zinc-400 not-italic">
              <div className="flex items-center group">
                <Clock className="w-5 h-5 mr-4 text-kollab-red group-hover:text-white transition-colors" aria-hidden="true" />
                <span className="font-medium text-sm md:text-base group-hover:text-white transition-colors">
                  {CONTACT_INFO.businessHours}
                </span>
              </div>
              <div className="flex items-center group">
                <Mail className="w-5 h-5 mr-4 text-kollab-red group-hover:text-white transition-colors" aria-hidden="true" />
                <a 
                  href={`mailto:${CONTACT_INFO.email}`} 
                  className="font-medium text-sm md:text-base group-hover:text-white transition-colors"
                  aria-label={`이메일 보내기: ${CONTACT_INFO.email}`}
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
              <div className="flex items-center group">
                <Instagram className="w-5 h-5 mr-4 text-kollab-red group-hover:text-white transition-colors" aria-hidden="true" />
                <a 
                  href={CONTACT_INFO.instagramUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-medium text-sm md:text-base group-hover:text-white transition-colors"
                  aria-label={`인스타그램 방문: ${CONTACT_INFO.instagram}`}
                >
                  {CONTACT_INFO.instagram}
                </a>
              </div>
            </address>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-zinc-900 text-xs md:text-sm text-zinc-600 font-medium uppercase tracking-wider shrink-0">
          <p>© 2025 KOLLAB KOREA. All Rights Reserved.</p>
          <nav className="flex space-x-8 mt-6 md:mt-0" aria-label="법적 정보">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};