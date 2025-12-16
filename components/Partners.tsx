import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const Partners: React.FC = () => {
  return (
    // Changed: Removed h-screen, snap-start. Added py-32
    <section id="partners" className="min-h-screen w-full flex flex-col justify-center bg-kollab-black border-b border-zinc-800 relative overflow-hidden px-6 py-32 md:py-40">
      <div className="container mx-auto flex flex-col">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 shrink-0 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
                <div className="w-12 h-[2px] bg-kollab-red"></div>
                <span className="text-kollab-red font-bold tracking-widest text-sm uppercase">Selection Criteria</span>
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tight leading-none">
              The Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-kollab-red to-white">Global Icon</span>
            </h2>
          </div>
          <p className="text-zinc-400 font-medium text-sm md:text-lg text-right md:text-left max-w-sm leading-relaxed hidden md:block">
            단순 입점이 아닌, 글로벌 시장을 리드할<br/>
            <strong>강력한 브랜드 아이덴티티</strong>를 찾습니다.
          </p>
        </div>

        {/* Content Grid - Removed flex-grow/h-full reliance, used grid with min-height */}
        <div className="grid md:grid-cols-3 gap-0 border border-zinc-800 bg-zinc-900/30">
          
          {/* Card 1 */}
          <div className="group relative border-r border-b md:border-b-0 border-zinc-800 hover:bg-zinc-900 transition-all duration-300 flex flex-col">
            {/* Image Area - Fixed Aspect Ratio */}
            <div className="aspect-[4/3] w-full overflow-hidden border-b border-zinc-800 relative">
              <img 
                src="https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=800&auto=format&fit=crop" 
                alt="Brand Identity Styling" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
              />
              <div className="absolute top-4 left-6 text-6xl font-black text-white/10 group-hover:text-kollab-red/20 transition-colors z-10">01</div>
            </div>
            {/* Text Area */}
            <div className="p-10 flex flex-col justify-center flex-1">
              <h3 className="text-3xl font-black mb-6 text-white group-hover:text-kollab-red transition-colors">Unique Identity</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                   <CheckCircle2 size={20} className="mr-4 text-kollab-red mt-1 shrink-0"/>
                   <div>
                     <p className="text-white font-bold text-lg mb-1">독창적인 디자인</p>
                     <p className="text-zinc-500 text-sm leading-relaxed">미국 시장에서도 눈에 띄는 패키지</p>
                   </div>
                </div>
                <div className="flex items-start">
                   <CheckCircle2 size={20} className="mr-4 text-kollab-red mt-1 shrink-0"/>
                   <div>
                     <p className="text-white font-bold text-lg mb-1">명확한 타겟</p>
                     <p className="text-zinc-500 text-sm leading-relaxed">팬덤을 형성할 수 있는 스토리텔링</p>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative border-r border-b md:border-b-0 border-zinc-800 hover:bg-zinc-900 transition-all duration-300 flex flex-col">
             <div className="aspect-[4/3] w-full overflow-hidden border-b border-zinc-800 relative">
              <img 
                src="https://images.unsplash.com/photo-1556228578-f6605f0d8688?q=80&w=800&auto=format&fit=crop" 
                alt="Product Quality Texture" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
              />
               <div className="absolute top-4 left-6 text-6xl font-black text-white/10 group-hover:text-kollab-red/20 transition-colors z-10">02</div>
            </div>
            <div className="p-10 flex flex-col justify-center flex-1">
              <h3 className="text-3xl font-black mb-6 text-white group-hover:text-kollab-red transition-colors">Product Power</h3>
               <div className="space-y-6">
                <div className="flex items-start">
                   <CheckCircle2 size={20} className="mr-4 text-kollab-red mt-1 shrink-0"/>
                   <div>
                     <p className="text-white font-bold text-lg mb-1">차별화된 성분</p>
                     <p className="text-zinc-500 text-sm leading-relaxed">효능이 입증된 핵심 원료 사용</p>
                   </div>
                </div>
                <div className="flex items-start">
                   <CheckCircle2 size={20} className="mr-4 text-kollab-red mt-1 shrink-0"/>
                   <div>
                     <p className="text-white font-bold text-lg mb-1">검증된 품질</p>
                     <p className="text-zinc-500 text-sm leading-relaxed">임상 데이터 및 인증 보유 권장</p>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative border-zinc-800 hover:bg-zinc-900 transition-all duration-300 flex flex-col">
             <div className="aspect-[4/3] w-full overflow-hidden border-b border-zinc-800 relative">
              <img 
                src="https://images.unsplash.com/photo-1444723121867-c61e74e36b1d?q=80&w=800&auto=format&fit=crop" 
                alt="Global Vision City" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
              />
               <div className="absolute top-4 left-6 text-6xl font-black text-white/10 group-hover:text-kollab-red/20 transition-colors z-10">03</div>
            </div>
            <div className="p-10 flex flex-col justify-center flex-1">
              <h3 className="text-3xl font-black mb-6 text-white group-hover:text-kollab-red transition-colors">Global Vision</h3>
               <div className="space-y-6">
                <div className="flex items-start">
                   <CheckCircle2 size={20} className="mr-4 text-kollab-red mt-1 shrink-0"/>
                   <div>
                     <p className="text-white font-bold text-lg mb-1">적극적 협업</p>
                     <p className="text-zinc-500 text-sm leading-relaxed">마케팅 캠페인에 대한 참여 의지</p>
                   </div>
                </div>
                <div className="flex items-start">
                   <CheckCircle2 size={20} className="mr-4 text-kollab-red mt-1 shrink-0"/>
                   <div>
                     <p className="text-white font-bold text-lg mb-1">수출 준비성</p>
                     <p className="text-zinc-500 text-sm leading-relaxed">해외 판매에 결격 사유가 없는 제품</p>
                   </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};