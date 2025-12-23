import React, { useState, useEffect, useRef } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  const rawFaqItems = t('faq.items');
  const faqItems = Array.isArray(rawFaqItems) ? rawFaqItems : [];
  const faqTitle = t('faq.title');
  const faqSub = t('faq.sub');

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
    <div ref={sectionRef} className="max-w-4xl mx-auto">
      <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-xs font-black tracking-[0.5em] kollab-red mb-4 uppercase">{faqSub}</h2>
        <h3 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-black">{faqTitle}</h3>
      </div>
      <div className="space-y-px bg-black/5">
        {faqItems.map((faq: { q: string, a: string }, idx: number) => (
          <div 
            key={idx} 
            className={`bg-white border border-black/5 hover:border-[#dc0000]/20 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
            style={{ transitionDelay: `${idx * 100}ms` }}
          >
            <button 
              className="w-full px-8 py-8 flex items-center justify-between text-left group transition-all hover:bg-zinc-50 hover:px-10"
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            >
              <span className="text-xl font-bold tracking-tight text-black group-hover:text-[#dc0000] transition-colors">
                {faq.q}
              </span>
              <div className={`shrink-0 transition-all duration-300 ${openIdx === idx ? 'rotate-180 scale-110' : ''}`}>
                {openIdx === idx ? (
                  <Minus size={20} className="text-[#dc0000]" />
                ) : (
                  <Plus size={20} className="text-black opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all" />
                )}
              </div>
            </button>
            <div className={`overflow-hidden transition-all duration-700 ${openIdx === idx ? 'max-h-96 pb-12 px-8 opacity-100' : 'max-h-0 opacity-0'}`}>
              <p className="text-gray-600 leading-relaxed font-medium text-base">
                {faq.a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
