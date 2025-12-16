import React from 'react';
import { Mail, Instagram, Clock } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer 
      id="contact" 
      className="w-full flex flex-col justify-center bg-black px-6 border-t border-zinc-900 py-24 md:py-32"
      role="contentinfo"
    >
      <div className="container mx-auto flex flex-col h-full justify-center">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 flex-grow gap-12">
          
          <div className="flex flex-col justify-center h-full">
            <div className="text-kollab-red font-bold text-base mb-6 tracking-[0.2em] uppercase">Contact Us</div>
            <h2 className="text-6xl md:text-[8rem] lg:text-[10rem] font-black text-white tracking-tighter mb-6 leading-none">
              LET'S <br/><span className="text-kollab-red">KOLLAB</span>
            </h2>
            <p className="text-2xl md:text-4xl font-bold text-zinc-500 mt-6">
              Where Seoul Meets LA
            </p>
          </div>

          <div className="mt-8 md:mt-0 bg-zinc-900/50 p-10 md:p-16 border border-zinc-800 min-w-[300px] md:min-w-[500px]">
            <h3 className="font-black text-xl md:text-3xl mb-10 text-white uppercase tracking-widest">Headquarters</h3>
            <address className="space-y-8 text-zinc-400 not-italic">
              <div className="flex items-center group">
                <Clock className="w-8 h-8 mr-6 text-kollab-red group-hover:text-white transition-colors" aria-hidden="true" />
                <span className="font-medium text-xl group-hover:text-white transition-colors">
                  {CONTACT_INFO.businessHours}
                </span>
              </div>
              <div className="flex items-center group">
                <Mail className="w-8 h-8 mr-6 text-kollab-red group-hover:text-white transition-colors" aria-hidden="true" />
                <a 
                  href={`mailto:${CONTACT_INFO.email}`} 
                  className="font-medium text-xl group-hover:text-white transition-colors"
                  aria-label={`이메일 보내기: ${CONTACT_INFO.email}`}
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
              <div className="flex items-center group">
                <Instagram className="w-8 h-8 mr-6 text-kollab-red group-hover:text-white transition-colors" aria-hidden="true" />
                <a 
                  href={CONTACT_INFO.instagramUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-medium text-xl group-hover:text-white transition-colors"
                  aria-label={`인스타그램 방문: ${CONTACT_INFO.instagram}`}
                >
                  {CONTACT_INFO.instagram}
                </a>
              </div>
            </address>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-zinc-900 text-sm md:text-base text-zinc-600 font-medium uppercase tracking-wider shrink-0">
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