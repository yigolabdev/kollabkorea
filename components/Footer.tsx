
import React from 'react';
import { useLanguage } from '../LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const footerInfo = t('contact.info');

  return (
    <footer className="bg-black text-white py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          <div>
            <h2 className="text-xs font-black tracking-[0.5em] kollab-red mb-12 uppercase">
              {t('footer.contactUs')}
            </h2>
            <div className="mb-12">
              <span className="logo-font text-5xl tracking-tighter">
                KOLLAB<span className="kollab-red">KOREA</span>
              </span>
            </div>
            <div className="logo-font text-7xl md:text-9xl flex flex-col leading-[0.8]">
              <span className="opacity-40">LET'S</span>
              <span className="kollab-red">KOLLAB</span>
            </div>
            <p className="mt-12 text-zinc-500 font-black tracking-[0.2em] uppercase">Where Seoul Meets LA</p>
          </div>

          <div className="bg-zinc-900/40 backdrop-blur-sm border border-white/5 p-12 md:p-16">
            <h3 className="text-xs font-black tracking-[0.5em] text-white/40 mb-12 uppercase">
              {t('footer.headquarters')}
            </h3>
            <div className="space-y-10">
              <div className="flex items-center space-x-8 group">
                <div className="w-1.5 h-10 bg-zinc-800 group-hover:bg-kollab-red transition-all"></div>
                <div>
                  <span className="block text-[10px] font-black uppercase text-zinc-500 mb-2 tracking-widest">{t('contact.officeHours')}</span>
                  <span className="text-xl font-black uppercase">{footerInfo.hours}</span>
                </div>
              </div>
              <div className="flex items-center space-x-8 group">
                <div className="w-1.5 h-10 bg-zinc-800 group-hover:bg-kollab-red transition-all"></div>
                <div>
                  <span className="block text-[10px] font-black uppercase text-zinc-500 mb-2 tracking-widest">{t('contact.emailInquiry')}</span>
                  <a href={`mailto:${footerInfo.email}`} className="text-xl font-black hover:text-kollab-red transition-colors">
                    {footerInfo.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-8 group">
                <div className="w-1.5 h-10 bg-zinc-800 group-hover:bg-kollab-red transition-all"></div>
                <div>
                  <span className="block text-[10px] font-black uppercase text-zinc-500 mb-2 tracking-widest">{t('contact.socialChannel')}</span>
                  <a href="https://instagram.com/kollabkorea" target="_blank" rel="noopener noreferrer" className="text-xl font-black hover:text-kollab-red transition-colors">
                    {footerInfo.instagram}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <span className="text-[10px] font-black tracking-[0.5em] uppercase opacity-30">{t('footer.rights')}</span>
          <div className="flex space-x-16">
            <a href="#" className="text-[10px] font-black tracking-widest uppercase opacity-30 hover:opacity-100 transition-opacity">{t('footer.privacy')}</a>
            <a href="#" className="text-[10px] font-black tracking-widest uppercase opacity-30 hover:opacity-100 transition-opacity">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
