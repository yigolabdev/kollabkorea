import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const Pricing: React.FC = () => {
  const packages = [
    {
      name: "BASIC ZONE",
      subtitle: "신생 브랜드 테스트",
      brands: 20,
      duration: "2주 단위",
      features: [
        "벽면 선반형 진열",
        "2주 회전 시스템",
        "기본 제품 사진 1컷",
        "매장 운영 지원",
        "판매 데이터 리포트"
      ],
      highlight: false,
      color: "border-zinc-600"
    },
    {
      name: "STANDARD ZONE",
      subtitle: "핵심 브랜드 포지셔닝",
      brands: 6,
      duration: "1개월 / 3개월",
      features: [
        "메인 중앙 모듈존",
        "카테고리별 체계적 구성",
        "현장 릴스 영상 제공",
        "프리미엄 콘텐츠 촬영",
        "LA 진출 우선 검토",
        "맞춤형 마케팅 지원"
      ],
      highlight: false,
      color: "border-zinc-700"
    },
    {
      name: "PREMIUM ZONE",
      subtitle: "최고 노출 & 프리미엄",
      brands: 4,
      duration: "1개월 / 3개월",
      features: [
        "포토존 전면 배치",
        "글로벌 디자이너 브랜드 전용",
        "현장 릴스 영상 제공",
        "전문 콘텐츠 촬영팀",
        "LA 진출 최우선 기회",
        "전담 브랜드 매니저",
        "VIP 이벤트 초청"
      ],
      highlight: true,
      color: "border-kollab-red"
    }
  ];

  return (
    <section id="pricing" className="w-full flex flex-col justify-center bg-kollab-beige text-black px-6 py-16 md:py-20">
      <div className="container mx-auto flex flex-col">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-10 h-[2px] bg-kollab-red"></div>
            <span className="text-kollab-red font-bold tracking-widest text-xs uppercase">Packages</span>
            <div className="w-10 h-[2px] bg-kollab-red"></div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-black uppercase tracking-tight leading-none mb-4">
            Choose Your <span className="text-kollab-red">Zone</span>
          </h2>
          <p className="text-sm md:text-base text-zinc-700 max-w-2xl mx-auto">
            브랜드의 단계와 목표에 맞는 최적의 패키지를 선택하세요
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto w-full">
          {packages.map((pkg, index) => (
            <div 
              key={index}
              className={`relative bg-white border-2 ${pkg.color} ${pkg.highlight ? 'shadow-2xl scale-105 md:scale-110' : 'shadow-md'} transition-all duration-300 hover:shadow-xl flex flex-col`}
            >
              {/* Highlight Badge */}
              {pkg.highlight && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-kollab-red text-white px-6 py-1 text-xs font-black uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              {/* Header */}
              <div className={`p-6 md:p-7 border-b-2 ${pkg.color}`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg md:text-xl font-black uppercase tracking-tight">
                    {pkg.name}
                  </h3>
                  <span className={`text-xs font-bold px-2 py-1 ${pkg.highlight ? 'bg-kollab-red text-white' : 'bg-zinc-200 text-zinc-700'}`}>
                    {pkg.brands} Brands
                  </span>
                </div>
                <p className="text-xs md:text-sm text-zinc-600 mb-3">{pkg.subtitle}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-zinc-500">계약 기간:</span>
                  <span className="text-base md:text-lg font-bold">{pkg.duration}</span>
                </div>
              </div>

              {/* Features */}
              <div className="p-6 md:p-7 flex-1">
                <ul className="space-y-3">
                  {pkg.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className={`${pkg.highlight ? 'text-kollab-red' : 'text-zinc-600'} mt-0.5 shrink-0`} />
                      <span className="text-xs md:text-sm text-zinc-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="p-6 md:p-7 border-t border-zinc-200">
                <button className={`w-full py-3 font-black text-sm uppercase tracking-widest transition-all duration-300 ${
                  pkg.highlight 
                    ? 'bg-kollab-red text-white hover:bg-black' 
                    : 'bg-black text-white hover:bg-kollab-red'
                }`}>
                  문의하기
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-xs md:text-sm text-zinc-600 mb-2">
            * 모든 패키지는 매장 운영 및 판매 데이터 리포트가 포함됩니다
          </p>
          <p className="text-xs md:text-sm text-zinc-600">
            * 정확한 가격은 입점 문의 시 안내해드립니다
          </p>
        </div>

      </div>
    </section>
  );
};

