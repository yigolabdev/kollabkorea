
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

const FAQ_ITEMS = [
  { q: "참가 비용은 얼마인가요?", a: "10월 팝업 기간에는 1일 100달러입니다. 12월부터는 공간 유형과 운영 기간에 따라 비용이 달라집니다." },
  { q: "어떤 브랜드가 지원할 수 있나요?", a: "K-뷰티, K-패션, 라이프스타일(굿즈)을 중심으로 운영하지만, KOLLAB의 비전과 정체성이 맞는 브랜드라면 누구나 지원 가능합니다." },
  { q: "LA에 직접 상주해야 하나요?", a: "아니요. KOLLAB이 전시·판매·로컬 프로모션 등 운영 전반을 제공합니다." },
  { q: "수익 분배는 어떻게 진행되나요?", a: "행사 규모와 브랜드 카테고리에 따라 개별 협의를 통해 결정됩니다." }
];

const FAQ: React.FC = () => {
  return (
    <div className="pt-0 pb-24 px-6 max-w-4xl mx-auto">
      <h2 className="text-5xl md:text-8xl font-extrabold mb-24 text-center uppercase text-black tracking-normal leading-[0.95]">FAQ</h2>
      <div className="space-y-16">
        {FAQ_ITEMS.map((item, i) => (
          <div key={i} className="border-b-2 border-black/10 pb-16">
            <h4 className="text-3xl font-semibold mb-8 text-black leading-tight tracking-normal break-keep">Q. {item.q}</h4>
            <p className="text-[#1A1A1A] leading-relaxed text-xl font-regular tracking-wide break-keep">{item.a}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-24 p-12 border-2 border-black text-center">
        <p className="text-base font-semibold uppercase tracking-[0.22em] mb-4">
          Have questions or want to explore participation?
        </p>
        <p className="text-lg opacity-80 max-w-2xl mx-auto tracking-wide">
          Reach out to our team for more details.
        </p>
        <p className="text-lg opacity-80 max-w-2xl mx-auto tracking-wide break-keep">
          추가 문의나 참여 관련 상담이 필요하신가요? <a href="mailto:INFO@KOLLAB-LA.COM" className="underline underline-offset-8">직접 문의해 주세요.</a>
        </p>
      </div>
    </div>
  );
};

export default FAQ;
