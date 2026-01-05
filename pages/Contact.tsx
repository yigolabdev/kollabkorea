/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const CRITERIA = [
  {
    title: "Have a clear brand identity and positioning",
    kor: "명확한 브랜드 아이덴티티"
  },
  {
    title: "Are ready for offline customer engagement",
    kor: "오프라인 고객 경험 준비"
  },
  {
    title: "Seek validation before global expansion",
    kor: "글로벌 확장 전 검증을 원하는 브랜드"
  },
  {
    title: "Aim for sustainable, long-term growth",
    kor: "지속 가능한 성장을 목표로 하는 브랜드"
  }
];

const Contact: React.FC = () => {
  return (
    <div className="bg-[#EDEBE4]">
      {/* Intro Banner */}
      <section className="pt-0 pb-24 px-6 max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-8xl font-extrabold text-black leading-[0.95] mb-12 uppercase tracking-normal">CONTACT</h1>
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-xl md:text-3xl font-semibold text-black/60 uppercase tracking-[0.08em]">
            Let’s build your offline journey<br />from Korea to the U.S.
          </p>
          <p className="text-xl font-medium text-black/60 tracking-wide">
            한국에서 시작해, 미국까지 이어지는 오프라인 여정을 함께합니다.
          </p>
        </div>
      </section>

      {/* Apply Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div className="space-y-16">
          <div>
            <h2 className="text-5xl font-extrabold text-black uppercase mb-10 tracking-wide">Who Should Apply</h2>
            <div className="space-y-8">
              {CRITERIA.map((item, i) => (
                <div key={i} className="flex items-start gap-4 border-b border-black/10 pb-6">
                  <CheckCircle2 className="w-7 h-7 text-black mt-1 shrink-0" />
                  <div>
                    <p className="text-xl font-semibold text-[#1A1A1A] uppercase tracking-wide">{item.title}</p>
                    <p className="text-base font-medium text-black/60 tracking-wide">{item.kor}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-10">
            <h2 className="text-5xl font-extrabold text-black uppercase tracking-wide">Contact Information</h2>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-extrabold text-black uppercase tracking-[0.12em] mb-2">EMAIL</p>
                <a href="mailto:info@kollabkorea.com" className="text-3xl font-extrabold text-black hover:underline underline-offset-8 tracking-wide">info@kollabkorea.com</a>
              </div>
              <div>
                <p className="text-sm font-extrabold text-black uppercase tracking-[0.12em] mb-2">INSTAGRAM</p>
                <a href="https://www.instagram.com/kollabkorea" className="text-3xl font-extrabold text-black hover:underline underline-offset-8 tracking-wide">@kollabkorea</a>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white p-12 border-2 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-4xl font-extrabold text-black uppercase mb-12 tracking-wide">Submit Application</h3>
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-extrabold uppercase text-black tracking-[0.12em]">Brand Name</label>
              <input type="text" className="w-full border-b-2 border-black/20 py-3 focus:outline-none focus:border-black text-xl font-semibold uppercase tracking-wide" placeholder="Kollab Beauty" />
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-extrabold uppercase text-black tracking-[0.12em]">Contact Person</label>
                <input type="text" className="w-full border-b-2 border-black/20 py-3 focus:outline-none focus:border-black text-xl font-semibold tracking-wide" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-extrabold uppercase text-black tracking-[0.12em]">Category</label>
                <select className="w-full border-b-2 border-black/20 py-3 focus:outline-none focus:border-black text-xl font-semibold uppercase bg-transparent tracking-wide">
                  <option>Beauty</option>
                  <option>Fashion</option>
                  <option>Goods</option>
                  <option>F&B</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-extrabold uppercase text-black tracking-[0.12em]">Website / SNS</label>
              <input type="text" className="w-full border-b-2 border-black/20 py-3 focus:outline-none focus:border-black text-xl font-semibold tracking-wide" placeholder="https://..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-extrabold uppercase text-black tracking-[0.12em]">Message</label>
              <textarea rows={3} className="w-full border-b-2 border-black/20 py-3 focus:outline-none focus:border-black text-xl font-medium tracking-wide" placeholder="Brief intro..." />
            </div>
            <button className="w-full bg-black text-[#EDEBE4] py-8 text-2xl font-extrabold uppercase tracking-[0.42em] hover:bg-[#1A1A1A] transition-all">
              SUBMIT APPLICATION
            </button>
          </form>
        </div>
      </section>

      {/* Global Banner */}
      <section className="mt-32 relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,white_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>
        <div className="relative z-10 text-center text-[#EDEBE4] space-y-10 px-6">
          <h2 className="text-5xl md:text-[7vw] font-extrabold uppercase leading-none tracking-tight">READY TO GO<br />GLOBAL?</h2>
          <div className="space-y-4">
            <p className="text-2xl md:text-3xl font-semibold uppercase tracking-wide">KOLLAB SEOUL과 함께 당신의 브랜드를 전 세계에 알리세요.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;