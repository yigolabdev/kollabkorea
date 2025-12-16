import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ApplyCTAProps {
  onApplyClick: () => void;
}

export const ApplyCTA: React.FC<ApplyCTAProps> = ({ onApplyClick }) => {
  return (
    <section 
      className="min-h-[50vh] w-full flex flex-col justify-center items-center bg-kollab-red text-white relative overflow-hidden px-6 py-20 md:py-32"
      aria-labelledby="cta-heading"
    >
       {/* Background Pattern */}
       <div 
         className="absolute inset-0 opacity-10 pointer-events-none" 
         style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, #000 20px, #000 40px)' }}
         aria-hidden="true"
       />
       
       <div className="relative z-10 text-center flex flex-col items-center">
          <div className="mb-8 overflow-hidden">
            <h2 id="cta-heading" className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
              Ready<br/>
              To Go<br/>
              <span className="text-black">Global?</span>
            </h2>
          </div>
          
          <p className="text-base md:text-xl font-bold mb-10 max-w-2xl mx-auto opacity-90 leading-relaxed break-keep">
             KOLLAB SEOUL과 함께<br/>
             당신의 브랜드를 전 세계에 알리세요.
          </p>
          
          <button 
              onClick={onApplyClick}
              className="group relative inline-flex items-center justify-center bg-black text-white font-black text-base md:text-xl px-12 py-6 hover:bg-white hover:text-black transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] uppercase tracking-widest border-2 border-transparent hover:border-black"
              aria-label="브랜드 입점 신청하기"
          >
              <span className="mr-4">Apply Now</span>
              <ArrowRight size={24} className="group-hover:translate-x-3 transition-transform" aria-hidden="true" />
          </button>
       </div>
    </section>
  );
};