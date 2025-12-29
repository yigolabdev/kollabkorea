import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../LanguageContext';

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
    <div ref={sectionRef} className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        
        {/* Left Side - Statement */}
        <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
          <div className="space-y-4">
            <p className="text-2xl md:text-3xl lg:text-4xl font-black leading-tight text-black break-keep">
              {language === 'ko' ? (
                <>
                  KOLLAB은<br />
                  단순한 팝업 공간이<br />
                  아닙니다.
                </>
              ) : (
                <>
                  KOLLAB is not just<br />
                  a pop-up space.
                </>
              )}
            </p>
          </div>
        </div>

        {/* Right Side - Description */}
        <div className={`space-y-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
          <div className="space-y-4">
            {language === 'ko' ? (
              <>
                <p className="text-lg md:text-xl font-semibold leading-relaxed text-black/80 break-keep">
                  한국 오프라인 리테일을 시작으로
                </p>
                <p className="text-lg md:text-xl font-semibold leading-relaxed text-black/80 break-keep">
                  미국 팝업까지 연결되는 크로스보더 브랜드 플랫폼입니다.
                </p>
              </>
            ) : (
              <>
                <p className="text-lg md:text-xl font-medium leading-relaxed text-black/80 break-keep">
                  It is a cross-border retail platform designed to help brands
                </p>
                <p className="text-lg md:text-xl font-medium leading-relaxed text-black/80 break-keep">
                  build offline presence in Korea
                </p>
                <p className="text-lg md:text-xl font-medium leading-relaxed text-black/80 break-keep">
                  and expand into curated pop-up opportunities in the U.S.
                </p>
              </>
            )}
          </div>

          {/* Accent Line */}
          <div className="w-20 h-1 bg-[#dc0000] mt-8"></div>
        </div>
      </div>
    </div>
  );
};

export default WhatIsKollab;

