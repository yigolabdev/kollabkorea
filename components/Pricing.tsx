import React, { useState } from 'react';
import { Sparkles, Award, Zap, ArrowRight, Star } from 'lucide-react';

interface PricingProps {
  onApplyClick: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onApplyClick }) => {
  const [hoveredZone, setHoveredZone] = useState<number | null>(null);

  const zones = [
    {
      id: 1,
      name: "BASIC",
      title: "Discovery Zone",
      subtitle: "신생 브랜드의 시작",
      icon: Zap,
      brands: "20 Brands",
      duration: "2주 단위",
      description: "첫 발을 내딛는 브랜드를 위한 테스트 공간",
      features: [
        { title: "벽면 선반형 진열", detail: "효율적인 공간 활용" },
        { title: "2주 회전 시스템", detail: "빠른 시장 반응 테스트" },
        { title: "기본 제품 사진", detail: "1컷 전문 촬영" },
        { title: "매장 운영 지원", detail: "기본 운영 가이드" },
        { title: "판매 데이터", detail: "주간 리포트 제공" }
      ],
      visual: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600&auto=format&fit=crop",
      gradient: "from-zinc-100 to-zinc-50",
      accentColor: "zinc",
      textColor: "text-zinc-900",
      buttonStyle: "bg-zinc-900 text-white hover:bg-kollab-red"
    },
    {
      id: 2,
      name: "STANDARD",
      title: "Core Zone",
      subtitle: "핵심 브랜드 포지셔닝",
      icon: Award,
      brands: "6 Brands",
      duration: "1~3개월",
      description: "브랜드 인지도 확장을 위한 메인 공간",
      features: [
        { title: "메인 중앙 모듈존", detail: "최고의 가시성 확보" },
        { title: "카테고리별 구성", detail: "체계적 브랜드 스토리" },
        { title: "현장 릴스 영상", detail: "SNS 콘텐츠 제공" },
        { title: "프리미엄 촬영", detail: "전문 콘텐츠 제작" },
        { title: "LA 진출 우선", detail: "글로벌 확장 기회" },
        { title: "마케팅 지원", detail: "맞춤형 전략 수립" }
      ],
      visual: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?q=80&w=600&auto=format&fit=crop",
      gradient: "from-white to-zinc-50",
      accentColor: "red",
      textColor: "text-black",
      buttonStyle: "bg-kollab-red text-white hover:bg-black"
    },
    {
      id: 3,
      name: "PREMIUM",
      title: "Prestige Zone",
      subtitle: "럭셔리 브랜드 전용",
      icon: Sparkles,
      brands: "4 Brands Only",
      duration: "1~3개월",
      description: "최상위 노출과 VIP 혜택의 프리미엄 공간",
      features: [
        { title: "포토존 전면 배치", detail: "최고 노출 위치 독점" },
        { title: "디자이너 브랜드", detail: "엄선된 4개 브랜드만" },
        { title: "전문 영상 촬영", detail: "현장 릴스 + 스튜디오" },
        { title: "콘텐츠 제작팀", detail: "전담 크리에이티브 팀" },
        { title: "LA 진출 최우선", detail: "글로벌 런칭 지원" },
        { title: "전담 매니저", detail: "1:1 브랜드 관리" },
        { title: "VIP 이벤트", detail: "독점 네트워킹" }
      ],
      visual: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=600&auto=format&fit=crop",
      gradient: "from-black via-zinc-900 to-black",
      accentColor: "gold",
      textColor: "text-white",
      buttonStyle: "bg-kollab-red text-white hover:bg-white hover:text-black",
      featured: true
    }
  ];

  return (
    <section id="pricing" className="relative w-full min-h-screen flex flex-col justify-center bg-gradient-to-b from-kollab-beige via-white to-kollab-beige px-6 py-24 md:py-32 overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-20 left-10 w-64 h-64 bg-kollab-red rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-black rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-8 border-b border-zinc-300 pb-6 shrink-0 flex flex-col md:flex-row justify-between items-end">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-black uppercase tracking-tight leading-none">
              Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-black">Perfect Zone</span>
            </h2>
            <p className="mt-3 text-xs md:text-sm font-medium text-zinc-600 tracking-wide max-w-xl">
              브랜드의 성장 단계에 맞는 최적의 공간을 선택하세요
            </p>
          </div>
          <div className="text-right hidden md:block mt-3 md:mt-0">
            <span className="text-[10px] text-zinc-500 border border-zinc-400 px-2 py-1 uppercase tracking-widest">Zone Packages</span>
          </div>
        </div>

        {/* Zones - Asymmetric Beauty Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 max-w-7xl mx-auto mb-16 mt-8">
          
          {/* Basic Zone - Compact */}
          <div 
            className="lg:col-span-4 group relative"
            onMouseEnter={() => setHoveredZone(1)}
            onMouseLeave={() => setHoveredZone(null)}
          >
            <div className={`relative h-full bg-gradient-to-br ${zones[0].gradient} border-2 border-zinc-200 overflow-hidden transition-all duration-500 ${hoveredZone === 1 ? 'shadow-2xl scale-[1.02] border-zinc-400' : 'shadow-lg'}`}>
              
              {/* Background Image */}
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <img src={zones[0].visual} alt="" className="w-full h-full object-cover grayscale" />
              </div>

              {/* Content */}
              <div className="relative p-8 flex flex-col h-full min-h-[500px]">
                
                {/* Icon */}
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-zinc-900 text-white rounded-full">
                    {React.createElement(zones[0].icon, { size: 20 })}
                  </div>
                </div>

                {/* Title */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-zinc-500 tracking-widest uppercase">{zones[0].name}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-zinc-900 uppercase tracking-tight leading-none mb-2">
                    {zones[0].title}
                  </h3>
                  <p className="text-sm text-zinc-600">{zones[0].subtitle}</p>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-zinc-300">
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">Capacity</div>
                    <div className="text-sm font-bold text-zinc-900">{zones[0].brands}</div>
                  </div>
                  <div className="w-px h-8 bg-zinc-300"></div>
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">Duration</div>
                    <div className="text-sm font-bold text-zinc-900">{zones[0].duration}</div>
                  </div>
                </div>

                {/* Features */}
                <div className="flex-1 mb-6">
                  <ul className="space-y-3">
                    {zones[0].features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-zinc-900 rounded-full mt-2 shrink-0"></div>
                        <div className="text-xs text-zinc-700 leading-relaxed">{feature.title}</div>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Hover: Show More */}
                  <div className={`mt-4 space-y-2 transition-all duration-300 ${hoveredZone === 1 ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                    {zones[0].features.slice(3).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-zinc-900 rounded-full mt-2 shrink-0"></div>
                        <div className="text-xs text-zinc-700 leading-relaxed">{feature.title}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={onApplyClick}
                  className={`w-full ${zones[0].buttonStyle} py-4 font-black text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group/btn`}
                  aria-label="Basic Zone 문의하기"
                >
                  <span>문의하기</span>
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Premium Zone - Featured Large */}
          <div 
            className="lg:col-span-5 group relative pt-4"
            onMouseEnter={() => setHoveredZone(3)}
            onMouseLeave={() => setHoveredZone(null)}
          >
            {/* Featured Badge - Outside Card */}
            <div className="absolute -top-0 left-1/2 transform -translate-x-1/2 z-20">
              <div className="bg-kollab-red text-white px-6 py-1.5 text-xs font-black uppercase tracking-wider shadow-lg flex items-center gap-2">
                <Sparkles size={12} />
                <span>Most Popular</span>
                <Sparkles size={12} />
              </div>
            </div>

            <div className={`relative h-full bg-gradient-to-br ${zones[2].gradient} border-2 border-kollab-red overflow-hidden transition-all duration-500 ${hoveredZone === 3 ? 'shadow-2xl shadow-kollab-red/20 scale-[1.02] border-kollab-red' : 'shadow-xl'}`}>

              {/* Background Image with Overlay */}
              <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                <img src={zones[2].visual} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="relative p-10 flex flex-col h-full min-h-[600px]">
                
                {/* Icon */}
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-kollab-red text-white rounded-full shadow-lg shadow-kollab-red/50">
                    {React.createElement(zones[2].icon, { size: 28 })}
                  </div>
                </div>

                {/* Title */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-kollab-red tracking-widest uppercase">{zones[2].name}</span>
                    <div className="flex-1 h-[1px] bg-kollab-red/30"></div>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none mb-3">
                    {zones[2].title}
                  </h3>
                  <p className="text-base text-zinc-300">{zones[2].subtitle}</p>
                  <p className="text-sm text-zinc-400 mt-2 italic">{zones[2].description}</p>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 mb-8 pb-6 border-b border-zinc-700">
                  <div>
                    <div className="text-xs text-zinc-400 mb-1">Exclusive</div>
                    <div className="text-lg font-black text-white">{zones[2].brands}</div>
                  </div>
                  <div className="w-px h-10 bg-zinc-700"></div>
                  <div>
                    <div className="text-xs text-zinc-400 mb-1">Contract</div>
                    <div className="text-lg font-black text-white">{zones[2].duration}</div>
                  </div>
                </div>

                {/* Features - All Visible */}
                <div className="flex-1 mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {zones[2].features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3 group/feature">
                        <div className="w-5 h-5 bg-kollab-red rounded-full flex items-center justify-center mt-0.5 shrink-0 group-hover/feature:scale-110 transition-transform">
                          <Star size={10} className="text-white" fill="white" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white leading-tight">{feature.title}</div>
                          <div className="text-xs text-zinc-400 mt-0.5">{feature.detail}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA - Prominent */}
                <button
                  onClick={onApplyClick}
                  className={`w-full ${zones[2].buttonStyle} py-5 font-black text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 shadow-lg group/btn`}
                  aria-label="Premium Zone 문의하기"
                >
                  <span>지금 신청하기</span>
                  <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Standard Zone - Medium */}
          <div 
            className="lg:col-span-3 group relative"
            onMouseEnter={() => setHoveredZone(2)}
            onMouseLeave={() => setHoveredZone(null)}
          >
            <div className={`relative h-full bg-gradient-to-br ${zones[1].gradient} border-2 border-zinc-300 overflow-hidden transition-all duration-500 ${hoveredZone === 2 ? 'shadow-2xl scale-[1.02] border-kollab-red' : 'shadow-lg'}`}>
              
              {/* Background Image */}
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <img src={zones[1].visual} alt="" className="w-full h-full object-cover grayscale" />
              </div>

              {/* Content */}
              <div className="relative p-8 flex flex-col h-full min-h-[500px]">
                
                {/* Icon */}
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-kollab-red text-white rounded-full shadow-md shadow-kollab-red/30">
                    {React.createElement(zones[1].icon, { size: 20 })}
                  </div>
                </div>

                {/* Title */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-kollab-red tracking-widest uppercase">{zones[1].name}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight leading-none mb-2">
                    {zones[1].title}
                  </h3>
                  <p className="text-sm text-zinc-600">{zones[1].subtitle}</p>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-zinc-300">
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">Select</div>
                    <div className="text-sm font-bold text-black">{zones[1].brands}</div>
                  </div>
                  <div className="w-px h-8 bg-zinc-300"></div>
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">Period</div>
                    <div className="text-sm font-bold text-black">{zones[1].duration}</div>
                  </div>
                </div>

                {/* Features */}
                <div className="flex-1 mb-6">
                  <ul className="space-y-3">
                    {zones[1].features.slice(0, 4).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-kollab-red rounded-full mt-1.5 shrink-0"></div>
                        <div className="text-xs text-zinc-700 leading-relaxed">{feature.title}</div>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Hover: Show More */}
                  <div className={`mt-4 space-y-2 transition-all duration-300 ${hoveredZone === 2 ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                    {zones[1].features.slice(4).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-kollab-red rounded-full mt-1.5 shrink-0"></div>
                        <div className="text-xs text-zinc-700 leading-relaxed">{feature.title}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={onApplyClick}
                  className={`w-full ${zones[1].buttonStyle} py-4 font-black text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group/btn`}
                  aria-label="Standard Zone 문의하기"
                >
                  <span>문의하기</span>
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Info - Sophisticated */}
        <div className="max-w-5xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-10">
            <div className="inline-block">
              <h4 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight mb-2">
                All Packages Include
              </h4>
              <div className="h-1 bg-gradient-to-r from-transparent via-kollab-red to-transparent"></div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* 매장 운영 지원 */}
            <div className="group relative bg-white border border-zinc-200 hover:border-kollab-red transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-kollab-red/0 to-kollab-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-6">
                <div className="flex items-start gap-4">
                  <div className="shrink-0">
                    <div className="w-12 h-12 bg-black group-hover:bg-kollab-red transition-colors duration-300 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h5 className="text-base font-black text-black uppercase tracking-tight mb-2 group-hover:text-kollab-red transition-colors">
                      매장 운영 지원
                    </h5>
                    <p className="text-xs text-zinc-600 leading-relaxed">
                      전문 운영팀의 체계적 관리<br/>
                      재고 관리 및 디스플레이 최적화
                    </p>
                  </div>
                </div>
              </div>
              <div className="h-1 bg-gradient-to-r from-transparent via-zinc-300 to-transparent group-hover:via-kollab-red transition-colors duration-300"></div>
            </div>

            {/* 판매 데이터 리포트 */}
            <div className="group relative bg-white border border-zinc-200 hover:border-kollab-red transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-kollab-red/0 to-kollab-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-6">
                <div className="flex items-start gap-4">
                  <div className="shrink-0">
                    <div className="w-12 h-12 bg-black group-hover:bg-kollab-red transition-colors duration-300 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h5 className="text-base font-black text-black uppercase tracking-tight mb-2 group-hover:text-kollab-red transition-colors">
                      판매 데이터 리포트
                    </h5>
                    <p className="text-xs text-zinc-600 leading-relaxed">
                      실시간 분석 및 인사이트<br/>
                      주간/월간 성과 리포트 제공
                    </p>
                  </div>
                </div>
              </div>
              <div className="h-1 bg-gradient-to-r from-transparent via-zinc-300 to-transparent group-hover:via-kollab-red transition-colors duration-300"></div>
            </div>

            {/* 글로벌 확장 기회 */}
            <div className="group relative bg-white border border-zinc-200 hover:border-kollab-red transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-kollab-red/0 to-kollab-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-6">
                <div className="flex items-start gap-4">
                  <div className="shrink-0">
                    <div className="w-12 h-12 bg-black group-hover:bg-kollab-red transition-colors duration-300 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h5 className="text-base font-black text-black uppercase tracking-tight mb-2 group-hover:text-kollab-red transition-colors">
                      글로벌 확장 기회
                    </h5>
                    <p className="text-xs text-zinc-600 leading-relaxed">
                      LA 진출 우선 검토<br/>
                      해외 바이어 네트워킹 지원
                    </p>
                  </div>
                </div>
              </div>
              <div className="h-1 bg-gradient-to-r from-transparent via-zinc-300 to-transparent group-hover:via-kollab-red transition-colors duration-300"></div>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="bg-zinc-50 border border-zinc-200 p-6">
            <div className="flex items-start gap-3">
              <div className="shrink-0 mt-0.5">
                <div className="w-5 h-5 rounded-full bg-kollab-red flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-xs text-zinc-700 leading-relaxed mb-2">
                  정확한 가격 및 상세 조건은 입점 문의 시 안내해드립니다
                </p>
                <p className="text-xs text-zinc-700 leading-relaxed">
                  브랜드 심사 후 최종 승인 여부가 결정됩니다
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
