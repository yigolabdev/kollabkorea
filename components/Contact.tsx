import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface ContactProps {
  onApplyClick: () => void;
}

const Contact: React.FC<ContactProps> = ({ onApplyClick }) => {
  const { t } = useLanguage();
  const footerInfo = t('contact.info') || {};
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="max-w-7xl mx-auto">
      <div className={`bg-[#dc0000] p-10 md:p-20 relative overflow-hidden group transition-all duration-1000 hover:shadow-[0_0_100px_rgba(220,0,0,0.5)] ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity duration-700" 
             style={{ backgroundImage: 'repeating-linear-gradient(-45deg, #000, #000 20px, transparent 20px, transparent 40px)' }}></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 text-white">
          <div className="text-center md:text-left">
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter mb-3 uppercase leading-none text-white group-hover:tracking-tight transition-all duration-500">
              {t('contact.title')}
            </h3>
            <p className="text-lg md:text-xl font-bold opacity-90 max-w-xl text-white group-hover:opacity-100 transition-opacity">
              {t('contact.sub')}
            </p>
          </div>
          
          <button 
            onClick={onApplyClick}
            className="px-14 py-5 bg-black text-white font-black tracking-[0.3em] uppercase flex items-center hover:scale-110 hover:bg-white hover:text-black transition-all duration-500 shadow-2xl group/btn"
          >
            {t('contact.cta')}
            <ArrowRight className="ml-4 group-hover/btn:translate-x-2 transition-transform" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
