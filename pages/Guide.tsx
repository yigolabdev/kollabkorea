/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, ExternalLink, Copy, Check } from 'lucide-react';

interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
}

const Guide: React.FC = () => {
  const [copiedGoogle, setCopiedGoogle] = useState(false);
  const [copiedNaver, setCopiedNaver] = useState(false);
  
  const [googleChecklist, setGoogleChecklist] = useState<ChecklistItem[]>([
    { id: 'g1', label: 'Google Search Console 접속', completed: false },
    { id: 'g2', label: '속성 추가 (https://kollabkorea.com)', completed: false },
    { id: 'g3', label: 'HTML 태그 방식으로 소유권 확인', completed: false },
    { id: 'g4', label: 'verification 코드 복사', completed: false },
    { id: 'g5', label: '와이고 개발팀에 코드 전달', completed: false },
    { id: 'g6', label: '개발팀 배포 완료 알림 확인', completed: false },
    { id: 'g7', label: '소유권 확인 완료', completed: false },
    { id: 'g8', label: 'Sitemap 제출 (sitemap.xml)', completed: false },
  ]);

  const [naverChecklist, setNaverChecklist] = useState<ChecklistItem[]>([
    { id: 'n1', label: 'Naver Search Advisor 접속', completed: false },
    { id: 'n2', label: '사이트 등록 (https://kollabkorea.com)', completed: false },
    { id: 'n3', label: 'HTML 태그 방식으로 소유 확인', completed: false },
    { id: 'n4', label: 'verification 코드 복사', completed: false },
    { id: 'n5', label: '와이고 개발팀에 코드 전달', completed: false },
    { id: 'n6', label: '개발팀 배포 완료 알림 확인', completed: false },
    { id: 'n7', label: '소유 확인 완료', completed: false },
    { id: 'n8', label: 'Sitemap 제출 (sitemap.xml)', completed: false },
  ]);

  const toggleGoogleItem = (id: string) => {
    setGoogleChecklist(prev =>
      prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item)
    );
  };

  const toggleNaverItem = (id: string) => {
    setNaverChecklist(prev =>
      prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item)
    );
  };

  const copyToClipboard = (text: string, type: 'google' | 'naver') => {
    navigator.clipboard.writeText(text);
    if (type === 'google') {
      setCopiedGoogle(true);
      setTimeout(() => setCopiedGoogle(false), 2000);
    } else {
      setCopiedNaver(true);
      setTimeout(() => setCopiedNaver(false), 2000);
    }
  };

  const googleProgress = (googleChecklist.filter(item => item.completed).length / googleChecklist.length) * 100;
  const naverProgress = (naverChecklist.filter(item => item.completed).length / naverChecklist.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tight mb-4">
            SEO 등록 가이드
          </h1>
          <p className="text-lg text-black/70 font-semibold">
            Google 및 Naver 검색 엔진 등록 프로세스
          </p>
          <div className="mt-6 inline-block bg-yellow-100 border-2 border-yellow-400 rounded-lg px-6 py-3">
            <p className="text-sm font-bold text-yellow-900">
              ⚠️ 이 페이지는 관리자 전용입니다. 등록 완료 후 삭제 예정
            </p>
          </div>
        </motion.div>

        {/* Google Search Console */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16 bg-white border-2 border-black/10 rounded-2xl p-8 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-black text-black uppercase tracking-tight">
              Google Search Console
            </h2>
            <a
              href="https://search.google.com/search-console"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-black text-white font-bold text-sm uppercase tracking-wider hover:bg-kollab-red transition-colors"
            >
              접속하기
              <ExternalLink size={16} />
            </a>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-black/70">진행률</span>
              <span className="text-sm font-bold text-black">{Math.round(googleProgress)}%</span>
            </div>
            <div className="w-full h-3 bg-zinc-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${googleProgress}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-kollab-red"
              />
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-6">
            <div className="border-l-4 border-kollab-red pl-6">
              <h3 className="text-xl font-black text-black mb-3">1단계: 속성 추가</h3>
              <ol className="space-y-2 text-black/80">
                <li className="flex items-start gap-2">
                  <span className="font-bold min-w-[24px]">1.</span>
                  <span>좌측 상단 "속성 선택" → "속성 추가"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold min-w-[24px]">2.</span>
                  <span>"URL 접두어" 선택</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold min-w-[24px]">3.</span>
                  <div className="flex-1">
                    <span>URL 입력: </span>
                    <button
                      onClick={() => copyToClipboard('https://kollabkorea.com', 'google')}
                      className="inline-flex items-center gap-2 ml-2 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 rounded font-mono text-sm transition-colors"
                    >
                      https://kollabkorea.com
                      {copiedGoogle ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </li>
              </ol>
            </div>

            <div className="border-l-4 border-kollab-red pl-6">
              <h3 className="text-xl font-black text-black mb-3">2단계: 소유권 확인</h3>
              <ol className="space-y-2 text-black/80 mb-4">
                <li className="flex items-start gap-2">
                  <span className="font-bold min-w-[24px]">1.</span>
                  <span>"HTML 태그" 방법 선택</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold min-w-[24px]">2.</span>
                  <span>meta 태그에서 <code className="bg-zinc-100 px-2 py-1 rounded">content="..."</code> 부분만 복사</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold min-w-[24px]">3.</span>
                  <div className="flex-1">
                    <span className="font-semibold text-kollab-red">복사한 코드를 와이고 개발팀에 전달</span>
                    <p className="text-sm mt-2 text-black/60">
                      파일 수정은 개발팀이 처리합니다. 아래 형식으로 전달해주세요:
                    </p>
                  </div>
                </li>
              </ol>
              <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto mb-4">
                <code>
                  &lt;meta name="google-site-verification" content="<span className="text-yellow-300">여기에_복사한_코드_붙여넣기</span>" /&gt;
                </code>
              </div>
              <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
                <p className="text-sm font-bold text-blue-900 mb-2">📧 개발팀 전달 사항</p>
                <p className="text-sm text-blue-800">
                  ✅ Google verification 코드: <code className="bg-white px-2 py-1 rounded">복사한_코드</code><br />
                  ✅ 작업 요청: index.html의 google-site-verification 메타 태그에 코드 입력<br />
                  ✅ 배포 완료 후 알림 요청
                </p>
              </div>
              <p className="mt-4 text-sm text-black/70">
                4. 개발팀 작업 완료 및 배포 대기 (2-3분)<br />
                5. 배포 완료 알림 받은 후 "확인" 버튼 클릭
              </p>
            </div>

            <div className="border-l-4 border-kollab-red pl-6">
              <h3 className="text-xl font-black text-black mb-3">3단계: Sitemap 제출</h3>
              <ol className="space-y-2 text-black/80">
                <li className="flex items-start gap-2">
                  <span className="font-bold min-w-[24px]">1.</span>
                  <span>좌측 메뉴 "Sitemaps" 클릭</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold min-w-[24px]">2.</span>
                  <div className="flex-1">
                    <span>"새 사이트맵 추가" 입력: </span>
                    <code className="bg-zinc-100 px-3 py-1 rounded font-mono">sitemap.xml</code>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold min-w-[24px]">3.</span>
                  <span>"제출" 클릭</span>
                </li>
              </ol>
            </div>
          </div>

          {/* Checklist */}
          <div className="mt-8 pt-8 border-t-2 border-zinc-200">
            <h3 className="text-lg font-black text-black mb-4 uppercase">체크리스트</h3>
            <div className="space-y-3">
              {googleChecklist.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleGoogleItem(item.id)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-50 transition-colors text-left"
                >
                  {item.completed ? (
                    <CheckCircle2 size={24} className="text-kollab-red flex-shrink-0" />
                  ) : (
                    <Circle size={24} className="text-zinc-300 flex-shrink-0" />
                  )}
                  <span className={`font-semibold ${item.completed ? 'text-black/50 line-through' : 'text-black'}`}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Naver Search Advisor */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16 bg-white border-2 border-black/10 rounded-2xl p-8 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-black text-black uppercase tracking-tight">
              Naver Search Advisor
            </h2>
            <a
              href="https://searchadvisor.naver.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-[#03C75A] text-white font-bold text-sm uppercase tracking-wider hover:bg-[#02b350] transition-colors"
            >
              접속하기
              <ExternalLink size={16} />
            </a>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-black/70">진행률</span>
              <span className="text-sm font-bold text-black">{Math.round(naverProgress)}%</span>
            </div>
            <div className="w-full h-3 bg-zinc-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${naverProgress}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-[#03C75A]"
              />
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-6">
            <div className="border-l-4 border-[#03C75A] pl-6">
              <h3 className="text-xl font-black text-black mb-3">1단계: 사이트 등록</h3>
              <ol className="space-y-2 text-black/80">
                <li className="flex items-start gap-2">
                  <span className="font-bold min-w-[24px]">1.</span>
                  <span>상단 "웹마스터 도구" 클릭</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold min-w-[24px]">2.</span>
                  <span>좌측 "사이트 관리" → "사이트 등록"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold min-w-[24px]">3.</span>
                  <div className="flex-1">
                    <span>URL 입력: </span>
                    <button
                      onClick={() => copyToClipboard('https://kollabkorea.com', 'naver')}
                      className="inline-flex items-center gap-2 ml-2 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 rounded font-mono text-sm transition-colors"
                    >
                      https://kollabkorea.com
                      {copiedNaver ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </li>
              </ol>
            </div>

            <div className="border-l-4 border-[#03C75A] pl-6">
              <h3 className="text-xl font-black text-black mb-3">2단계: 사이트 소유 확인</h3>
              <ol className="space-y-2 text-black/80 mb-4">
                <li className="flex items-start gap-2">
                  <span className="font-bold min-w-[24px]">1.</span>
                  <span>"HTML 태그" 선택</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold min-w-[24px]">2.</span>
                  <span>meta 태그에서 <code className="bg-zinc-100 px-2 py-1 rounded">content="..."</code> 부분만 복사</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold min-w-[24px]">3.</span>
                  <div className="flex-1">
                    <span className="font-semibold text-[#03C75A]">복사한 코드를 와이고 개발팀에 전달</span>
                    <p className="text-sm mt-2 text-black/60">
                      파일 수정은 개발팀이 처리합니다. 아래 형식으로 전달해주세요:
                    </p>
                  </div>
                </li>
              </ol>
              <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto mb-4">
                <code>
                  &lt;meta name="naver-site-verification" content="<span className="text-yellow-300">여기에_복사한_코드_붙여넣기</span>" /&gt;
                </code>
              </div>
              <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                <p className="text-sm font-bold text-green-900 mb-2">📧 개발팀 전달 사항</p>
                <p className="text-sm text-green-800">
                  ✅ Naver verification 코드: <code className="bg-white px-2 py-1 rounded">복사한_코드</code><br />
                  ✅ 작업 요청: index.html의 naver-site-verification 메타 태그에 코드 입력<br />
                  ✅ 배포 완료 후 알림 요청
                </p>
              </div>
              <p className="mt-4 text-sm text-black/70">
                4. 개발팀 작업 완료 및 배포 대기 (2-3분)<br />
                5. 배포 완료 알림 받은 후 "소유확인" 버튼 클릭
              </p>
            </div>

            <div className="border-l-4 border-[#03C75A] pl-6">
              <h3 className="text-xl font-black text-black mb-3">3단계: Sitemap 제출</h3>
              <ol className="space-y-2 text-black/80">
                <li className="flex items-start gap-2">
                  <span className="font-bold min-w-[24px]">1.</span>
                  <span>좌측 "요청" → "사이트맵 제출"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold min-w-[24px]">2.</span>
                  <div className="flex-1">
                    <span>URL 입력: </span>
                    <code className="bg-zinc-100 px-3 py-1 rounded font-mono">https://kollabkorea.com/sitemap.xml</code>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold min-w-[24px]">3.</span>
                  <span>"확인" 클릭</span>
                </li>
              </ol>
            </div>
          </div>

          {/* Checklist */}
          <div className="mt-8 pt-8 border-t-2 border-zinc-200">
            <h3 className="text-lg font-black text-black mb-4 uppercase">체크리스트</h3>
            <div className="space-y-3">
              {naverChecklist.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleNaverItem(item.id)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-50 transition-colors text-left"
                >
                  {item.completed ? (
                    <CheckCircle2 size={24} className="text-[#03C75A] flex-shrink-0" />
                  ) : (
                    <Circle size={24} className="text-zinc-300 flex-shrink-0" />
                  )}
                  <span className={`font-semibold ${item.completed ? 'text-black/50 line-through' : 'text-black'}`}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Footer Warning */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center bg-red-50 border-2 border-red-300 rounded-xl p-6"
        >
          <p className="text-sm font-bold text-red-900 mb-2">
            🚨 중요: 파일 수정은 와이고 개발팀이 처리합니다
          </p>
          <div className="text-sm text-red-800 text-left max-w-3xl mx-auto space-y-3">
            <div className="bg-white rounded-lg p-4 border border-red-200">
              <p className="font-bold mb-2">📧 개발팀에 전달할 정보:</p>
              <ol className="space-y-1 ml-4">
                <li>1. Google verification 코드 (복사한 content 값)</li>
                <li>2. Naver verification 코드 (복사한 content 값)</li>
                <li>3. 작업 요청: index.html 메타 태그 추가</li>
                <li>4. 배포 완료 후 알림 요청</li>
              </ol>
            </div>
            <div className="bg-white rounded-lg p-4 border border-red-200">
              <p className="font-bold mb-2">✅ 등록 완료 후 가이드 페이지 삭제 작업 (개발팀):</p>
              <ol className="space-y-1 ml-4">
                <li>1. pages/Guide.tsx 파일 삭제</li>
                <li>2. App.tsx에서 Guide 라우팅 제거</li>
                <li>3. types.ts에서 'guide' 타입 제거</li>
                <li>4. robots.txt에서 /guide 제외 규칙 제거</li>
                <li>5. GitHub 푸시 및 배포</li>
              </ol>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Guide;
