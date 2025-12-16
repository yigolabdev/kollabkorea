import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ApplyCTAProps {
  onApplyClick: () => void;
}

export const ApplyCTA: React.FC<ApplyCTAProps> = ({ onApplyClick }) => {
  return (
    <section 
      className="min-h-[70vh] w-full flex flex-col justify-center items-center bg-kollab-red text-white relative overflow-hidden px-6 py-40 md:py-60"
      aria-labelledby="cta-heading"
    >
       {/* Background Pattern */}
       <div 
         className="absolute inset-0 opacity-10 pointer-events-none" 
         style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, #000 20px, #000 40px)' }}
         aria-hidden="true"
       />
       
       <div className="relative z-10 text-center flex flex-col items-center">
          <div className="mb-12 overflow-hidden">
            <h2 id="cta-heading" className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter leading-[0.9]">
              Ready<br/>
              To Go<br/>
              <span className="text-black">Global?</span>
            </h2>
          </div>
          
          <p className="text-xl md:text-3xl font-bold mb-16 max-w-3xl mx-auto opacity-90 leading-relaxed break-keep">
             KOLLAB SEOUL과 함께<br/>
             당신의 브랜드를 전 세계에 알리세요.
          </p>
          
          <button 
              onClick={onApplyClick}
              className="group relative inline-flex items-center justify-center bg-black text-white font-black text-xl md:text-3xl px-20 py-10 hover:bg-white hover:text-black transition-all duration-300 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.5)] uppercase tracking-widest border-2 border-transparent hover:border-black"
              aria-label="브랜드 입점 신청하기"
          >
              <span className="mr-6">Apply Now</span>
              <ArrowRight size={40} className="group-hover:translate-x-3 transition-transform" aria-hidden="true" />
          </button>
       </div>
    </section>
  );
};