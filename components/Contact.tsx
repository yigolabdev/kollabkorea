
import React from 'react';
import { ArrowRight, Mail, Instagram, Clock } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const footerInfo = t('contact.info') || {};

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-kollab-red p-12 md:p-24 relative overflow-hidden group">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'repeating-linear-gradient(-45deg, #000, #000 20px, transparent 20px, transparent 40px)' }}></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-white">
          <div className="text-center md:text-left">
            <h3 className="text-4xl md:text-7xl font-black tracking-tighter mb-4 uppercase leading-none">
              {t('contact.title')}
            </h3>
            <p className="text-xl md:text-2xl font-bold opacity-80 max-w-xl">
              {t('contact.sub')}
            </p>
          </div>
          
          <a 
            href={`mailto:${footerInfo.email}`}
            className="px-16 py-6 bg-black text-white font-black tracking-[0.3em] uppercase flex items-center group-hover:scale-105 transition-all shadow-2xl"
          >
            {t('contact.cta')}
            <ArrowRight className="ml-4" size={24} />
          </a>
        </div>
      </div>

      <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-px bg-black/5 border border-black/5">
        <div className="bg-white p-12 flex flex-col items-center text-center space-y-6">
          <Mail className="text-kollab-red" size={32} strokeWidth={1.5} />
          <div className="space-y-2">
            <span className="text-[10px] font-black tracking-widest uppercase opacity-40">{t('contact.emailInquiry')}</span>
            <p className="text-xl font-black tracking-tighter uppercase">{footerInfo.email}</p>
          </div>
        </div>
        <div className="bg-white p-12 flex flex-col items-center text-center space-y-6">
          <Instagram className="text-kollab-red" size={32} strokeWidth={1.5} />
          <div className="space-y-2">
            <span className="text-[10px] font-black tracking-widest uppercase opacity-40">{t('contact.socialChannel')}</span>
            <p className="text-xl font-black tracking-tighter uppercase">{footerInfo.instagram}</p>
          </div>
        </div>
        <div className="bg-white p-12 flex flex-col items-center text-center space-y-6">
          <Clock className="text-kollab-red" size={32} strokeWidth={1.5} />
          <div className="space-y-2">
            <span className="text-[10px] font-black tracking-widest uppercase opacity-40">{t('contact.officeHours')}</span>
            <p className="text-xl font-black tracking-tighter uppercase">{footerInfo.hours}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-20 text-center">
        <p className="text-xs font-black tracking-[0.5em] opacity-30 uppercase">
          {t('contact.journeyInvitation')}
        </p>
      </div>
    </div>
  );
};

export default Contact;
