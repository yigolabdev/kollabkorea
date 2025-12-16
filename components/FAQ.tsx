import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "입점 비용은 어떻게 되나요?",
      answer: "Zone별로 차별화된 가격 정책을 운영하고 있습니다. Basic Zone은 가장 합리적인 가격으로 시작할 수 있으며, Premium Zone은 최고의 노출과 혜택을 제공합니다. 정확한 비용은 브랜드 미팅 시 상세히 안내해드립니다."
    },
    {
      question: "계약 기간은 어떻게 되나요?",
      answer: "Basic Zone은 2주 단위 회전 시스템으로 운영되며, Standard/Premium Zone은 1개월 또는 3개월 단위로 계약이 가능합니다. 성과에 따라 계약 연장이 가능하며, 우수 브랜드는 LA 진출 기회가 주어집니다."
    },
    {
      question: "어떤 카테고리의 브랜드를 받나요?",
      answer: "Beauty (Skincare/Makeup), Fashion, Food & Beverage, Lifestyle/Goods 등 다양한 카테고리를 받습니다. K-브랜드의 글로벌 진출 가능성과 독창적인 브랜드 아이덴티티가 있다면 모두 환영합니다."
    },
    {
      question: "매장 운영은 어떻게 하나요?",
      answer: "매장 운영은 100% KOLLAB SEOUL이 담당합니다. 브랜드는 제품만 납품하시면 되며, 진열, 판매, 고객 응대 등 모든 운영을 저희가 책임집니다. 정기적으로 판매 데이터와 고객 피드백을 공유해드립니다."
    },
    {
      question: "LA 진출 기회는 어떻게 주어지나요?",
      answer: "성수동 팝업에서 판매 성과가 우수한 브랜드에게 KOLLAB LA 입점 기회가 우선적으로 제공됩니다. 판매 데이터, 고객 반응, 브랜드 성장 가능성 등을 종합적으로 평가하여 선정합니다. 2025년 8월 LA 오픈 예정입니다."
    },
    {
      question: "콘텐츠 촬영은 어떻게 진행되나요?",
      answer: "모든 Zone에 기본 제품 사진 1컷이 제공되며, Standard/Premium Zone은 현장 릴스 영상이 포함됩니다. Premium Zone은 전문 촬영팀이 고품질 콘텐츠를 제작해드립니다. 촬영된 콘텐츠는 브랜드 마케팅에 자유롭게 활용 가능합니다."
    },
    {
      question: "신생 브랜드도 지원 가능한가요?",
      answer: "네, Basic Zone은 신생 브랜드를 위해 특별히 설계되었습니다. 2주 회전 시스템으로 부담 없이 시작할 수 있으며, 성과가 좋으면 Standard Zone으로 업그레이드할 수 있습니다. 시장 테스트와 데이터 수집에 최적화되어 있습니다."
    },
    {
      question: "입점 신청 후 얼마나 걸리나요?",
      answer: "입점 신청서 검토는 영업일 기준 3-5일 소요됩니다. 승인 후 브랜드 미팅을 통해 Zone 배정 및 계약 조건을 협의하며, 제품 준비 기간을 포함하여 약 2-3주 내 입점이 가능합니다."
    }
  ];

  return (
    <section id="faq" className="w-full flex flex-col justify-center bg-kollab-black text-white px-6 py-16 md:py-20">
      <div className="container mx-auto flex flex-col max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-10 h-[2px] bg-kollab-red"></div>
            <span className="text-kollab-red font-bold tracking-widest text-xs uppercase">FAQ</span>
            <div className="w-10 h-[2px] bg-kollab-red"></div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-none mb-4">
            Frequently Asked <span className="text-kollab-red">Questions</span>
          </h2>
          <p className="text-sm md:text-base text-zinc-400">
            입점 관련 자주 묻는 질문들을 확인하세요
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-zinc-800 bg-zinc-900/30 hover:border-kollab-red transition-all duration-300"
            >
              {/* Question */}
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-5 md:p-6 flex items-center justify-between text-left group"
                aria-expanded={openIndex === index}
              >
                <h3 className="text-sm md:text-base font-bold text-white group-hover:text-kollab-red transition-colors pr-4">
                  {faq.question}
                </h3>
                <ChevronDown 
                  size={20} 
                  className={`text-kollab-red shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Answer */}
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="p-5 md:p-6 pt-0 border-t border-zinc-800">
                  <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center p-8 border border-zinc-800 bg-zinc-900/30">
          <p className="text-sm md:text-base text-zinc-400 mb-4">
            더 궁금한 사항이 있으신가요?
          </p>
          <a 
            href="mailto:info@kollabkorea.com"
            className="inline-block bg-kollab-red text-white font-black text-xs md:text-sm px-8 py-3 uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
          >
            직접 문의하기
          </a>
        </div>

      </div>
    </section>
  );
};

