import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { ArrowRight, Sparkles } from 'lucide-react';

const WhatIsKollab: React.FC = () => {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
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
    <div ref={sectionRef} className="relative max-w-7xl mx-auto min-h-[80vh] flex items-center">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Circle */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#dc0000]/5 rounded-full blur-3xl"></div>
        {/* Small Circle */}
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-zinc-200 rounded-full blur-2xl"></div>
        {/* Vertical Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-black/10 to-transparent"></div>
      </div>

      <div className="grid lg:grid-cols-2 gap-20 items-center w-full relative z-10">
        
        {/* Left Side - Statement */}
        <div className={`space-y-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
          {/* Icon Badge */}
          <div className="inline-flex items-center space-x-3 px-5 py-3 bg-black rounded-full">
            <Sparkles size={20} className="text-[#dc0000]" />
            <span className="text-white text-xs font-black tracking-widest uppercase">
              {language === 'ko' ? 'What is KOLLAB' : 'What is KOLLAB'}
            </span>
          </div>

          <div className="space-y-8">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] text-black break-keep tracking-tight">
              {language === 'ko' ? (
                <>
                  KOLLAB은<br />
                  <span className="relative inline-block">
                    단순한
                    <div className="absolute -bottom-2 left-0 w-full h-3 bg-[#dc0000]/20"></div>
                  </span>{' '}
                  팝업 공간이<br />
                  아닙니다.
                </>
              ) : (
                <>
                  KOLLAB is<br />
                  <span className="relative inline-block">
                    not just
                    <div className="absolute -bottom-2 left-0 w-full h-3 bg-[#dc0000]/20"></div>
                  </span><br />
                  a pop-up space.
                </>
              )}
            </h2>

            {/* Decorative Quote */}
            <div className="flex items-start space-x-4 pl-6 border-l-4 border-[#dc0000]">
              <p className="text-lg md:text-xl font-semibold text-black/60 italic leading-relaxed break-keep">
                {language === 'ko' 
                  ? '"오프라인과 온라인을 연결하는 브랜드 성장의 허브"' 
                  : '"A hub for brand growth connecting offline and online"'}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Description */}
        <div className={`space-y-10 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
          {/* Main Description Card */}
          <div className="bg-gradient-to-br from-zinc-50 to-white p-10 border border-black/5 shadow-xl relative overflow-hidden group hover:shadow-2xl transition-shadow duration-500">
            {/* Corner Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#dc0000]/5 rounded-bl-full group-hover:scale-150 transition-transform duration-700"></div>
            
            <div className="relative z-10 space-y-6">
              {language === 'ko' ? (
                <>
                  <p className="text-xl md:text-2xl font-bold leading-relaxed text-black break-keep">
                    한국 오프라인 리테일을 시작으로
                  </p>
                  <p className="text-xl md:text-2xl font-bold leading-relaxed text-black break-keep">
                    미국 팝업까지 연결되는
                  </p>
                  <p className="text-2xl md:text-3xl font-black leading-relaxed text-[#dc0000] break-keep">
                    크로스보더 브랜드 플랫폼입니다.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-xl md:text-2xl font-semibold leading-relaxed text-black break-keep">
                    It is a cross-border retail platform designed to help brands
                  </p>
                  <p className="text-xl md:text-2xl font-semibold leading-relaxed text-black break-keep">
                    build offline presence in Korea
                  </p>
                  <p className="text-2xl md:text-3xl font-black leading-relaxed text-[#dc0000] break-keep">
                    and expand into curated pop-up opportunities in the U.S.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-6 border border-black/10 hover:border-[#dc0000] transition-colors group">
              <div className="text-4xl font-black text-[#dc0000] mb-2 group-hover:scale-110 transition-transform">01</div>
              <p className="text-sm font-bold text-black/70 break-keep">
                {language === 'ko' ? '한국 리테일' : 'Korea Retail'}
              </p>
            </div>
            <div className="bg-white p-6 border border-black/10 hover:border-[#dc0000] transition-colors group">
              <div className="text-4xl font-black text-[#dc0000] mb-2 group-hover:scale-110 transition-transform">02</div>
              <p className="text-sm font-bold text-black/70 break-keep">
                {language === 'ko' ? '미국 팝업' : 'U.S. Pop-up'}
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex items-center space-x-3 text-black group cursor-pointer">
            <span className="text-sm font-black tracking-widest uppercase">
              {language === 'ko' ? '더 알아보기' : 'Learn More'}
            </span>
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform text-[#dc0000]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIsKollab;
