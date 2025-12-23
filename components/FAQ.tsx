
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const { t } = useLanguage();
  
  const rawFaqItems = t('faq.items');
  const faqItems = Array.isArray(rawFaqItems) ? rawFaqItems : [];
  const faqTitle = t('faq.title');
  const faqSub = t('faq.sub');

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-xs font-bold tracking-[0.5em] kollab-red mb-4 uppercase">{faqSub}</h2>
        <h3 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">{faqTitle}</h3>
      </div>
      <div className="space-y-px bg-black/5">
        {faqItems.map((faq: { q: string, a: string }, idx: number) => (
          <div key={idx} className="bg-white">
            <button 
              className="w-full px-8 py-8 flex items-center justify-between text-left group"
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            >
              <span className="text-xl font-bold tracking-tight group-hover:kollab-red transition-colors">{faq.q}</span>
              {openIdx === idx ? <Minus size={20} className="kollab-red" /> : <Plus size={20} className="opacity-20" />}
            </button>
            <div className={`overflow-hidden transition-all duration-500 ${openIdx === idx ? 'max-h-96 pb-12 px-8' : 'max-h-0'}`}>
              <p className="text-gray-600 leading-relaxed font-light text-lg">
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
