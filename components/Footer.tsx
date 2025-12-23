import React from 'react';
import { useLanguage } from '../LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const footerInfo = t('contact.info');

  return (
    <footer className="bg-black text-white py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-xs font-black tracking-[0.5em] text-[#dc0000] mb-8 uppercase">
              {t('footer.contactUs')}
            </h2>
            <div className="mb-8">
              <span className="logo-font text-4xl tracking-tighter text-white">
                KOLLAB<span className="text-[#dc0000]">KOREA</span>
              </span>
            </div>
            <div className="logo-font text-6xl md:text-8xl flex flex-col leading-[0.8]">
              <span className="text-white opacity-40">LET'S</span>
              <span className="text-[#dc0000]">KOLLAB</span>
            </div>
            <p className="mt-8 text-zinc-500 font-black tracking-[0.2em] uppercase text-sm">
              Where Seoul Meets LA
            </p>
          </div>

          <div className="bg-zinc-900/40 backdrop-blur-sm border border-white/5 p-10 md:p-12">
            <h3 className="text-xs font-black tracking-[0.5em] text-white/40 mb-8 uppercase">
              {t('footer.headquarters')}
            </h3>
            <div className="space-y-8">
              <div className="flex items-center space-x-6 group">
                <div className="w-1.5 h-10 bg-zinc-800 group-hover:bg-[#dc0000] transition-all"></div>
                <div>
                  <span className="block text-[10px] font-black uppercase text-zinc-500 mb-2 tracking-widest">
                    {t('contact.officeHours')}
                  </span>
                  <span className="text-lg font-black uppercase text-white">
                    {footerInfo.hours}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-6 group">
                <div className="w-1.5 h-10 bg-zinc-800 group-hover:bg-[#dc0000] transition-all"></div>
                <div>
                  <span className="block text-[10px] font-black uppercase text-zinc-500 mb-2 tracking-widest">
                    {t('contact.emailInquiry')}
                  </span>
                  <a href={`mailto:${footerInfo.email}`} className="text-lg font-black text-white hover:text-[#dc0000] transition-colors">
                    {footerInfo.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-6 group">
                <div className="w-1.5 h-10 bg-zinc-800 group-hover:bg-[#dc0000] transition-all"></div>
                <div>
                  <span className="block text-[10px] font-black uppercase text-zinc-500 mb-2 tracking-widest">
                    {t('contact.socialChannel')}
                  </span>
                  <a href="https://instagram.com/kollabkorea" target="_blank" rel="noopener noreferrer" className="text-lg font-black text-white hover:text-[#dc0000] transition-colors">
                    {footerInfo.instagram}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <span className="text-[10px] font-black tracking-[0.5em] uppercase opacity-30 text-white">
            {t('footer.rights')}
          </span>
          <div className="flex space-x-12">
            <a href="#" className="text-[10px] font-black tracking-widest uppercase opacity-30 hover:opacity-100 transition-opacity text-white">
              {t('footer.privacy')}
            </a>
            <a href="#" className="text-[10px] font-black tracking-widest uppercase opacity-30 hover:opacity-100 transition-opacity text-white">
              {t('footer.terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
