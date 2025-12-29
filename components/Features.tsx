import React, { useEffect, useRef, useState } from 'react';
import { TrendingUp, CheckCircle, Store, Sparkles } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const Features: React.FC = () => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const reasons = language === 'ko' ? [
    {
      title: 'Korea-to-U.S. Expansion Path',
      titleKo: '한국에서 검증된 브랜드를 미국 팝업으로 연결',
      desc: 'Build offline presence in Korea and scale into U.S. pop-ups.',
      icon: <TrendingUp size={32} strokeWidth={1.5} />
    },
    {
      title: 'Offline Validation',
      titleKo: '글로벌 확장 전, 실제 고객 반응 검증',
      desc: 'Test your brand with real customers before global expansion.',
      icon: <CheckCircle size={32} strokeWidth={1.5} />
    },
    {
      title: 'Curated Environment',
      titleKo: '선별된 브랜드만 운영하는 큐레이션 환경',
      desc: 'Operate within a selective, brand-aligned retail space.',
      icon: <Store size={32} strokeWidth={1.5} />
    },
    {
      title: 'Content-Driven Growth',
      titleKo: '진짜 콘텐츠를 만들 수 있는 물리적 경험 제공',
      desc: 'Generate authentic content through real-world interaction.',
      icon: <Sparkles size={32} strokeWidth={1.5} />
    }
  ] : [
    {
      title: 'Korea-to-U.S. Expansion Path',
      titleKo: 'Korea-to-U.S. Expansion Path',
      desc: 'Build offline presence in Korea and scale into U.S. pop-ups.',
      icon: <TrendingUp size={32} strokeWidth={1.5} />
    },
    {
      title: 'Offline Validation',
      titleKo: 'Offline Validation',
      desc: 'Test your brand with real customers before global expansion.',
      icon: <CheckCircle size={32} strokeWidth={1.5} />
    },
    {
      title: 'Curated Environment',
      titleKo: 'Curated Environment',
      desc: 'Operate within a selective, brand-aligned retail space.',
      icon: <Store size={32} strokeWidth={1.5} />
    },
    {
      title: 'Content-Driven Growth',
      titleKo: 'Content-Driven Growth',
      desc: 'Generate authentic content through real-world interaction.',
      icon: <Sparkles size={32} strokeWidth={1.5} />
    }
  ];

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
      {/* Title Section */}
      <div className={`mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-black mb-6 break-keep">
          {language === 'ko' ? 'Why brands choose KOLLAB' : 'Why brands choose KOLLAB'}
        </h2>
        <div className="w-20 h-1 bg-[#dc0000]"></div>
      </div>
      
      {/* Reasons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {reasons.map((reason, idx) => (
          <div 
            key={idx} 
            className={`bg-white p-8 lg:p-10 border-l-4 border-transparent hover:border-[#dc0000] group hover:shadow-xl transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: `${idx * 150}ms` }}
          >
            {/* Icon */}
            <div className="mb-6 text-black group-hover:text-[#dc0000] transition-colors duration-300">
              {reason.icon}
            </div>
            
            {/* Title */}
            <h4 className="text-xl lg:text-2xl font-black tracking-tight mb-3 text-black group-hover:text-[#dc0000] transition-colors leading-tight">
              {reason.title}
            </h4>
            
            {/* Korean Subtitle */}
            <p className="text-base lg:text-lg font-semibold text-black/70 mb-4 leading-relaxed break-keep">
              {reason.titleKo}
            </p>
            
            {/* Description */}
            <p className="text-sm lg:text-base text-gray-600 leading-relaxed font-medium break-keep">
              {reason.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
