# Spline 통합 가이드
## KOLLAB KOREA - 3D 인터랙티브 콘텐츠

---

## 📦 설치

### Spline React 라이브러리 추가

```bash
npm install @splinetool/react-spline
```

또는

```bash
npm install @splinetool/runtime
```

---

## 🎯 사용 방법

### 방법 1: React Spline Component (권장)

#### 1. 기본 사용법

```tsx
import Spline from '@splinetool/react-spline';

export default function App() {
  return (
    <div>
      <Spline scene="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode" />
    </div>
  );
}
```

#### 2. 히어로 섹션에 통합

**파일: `pages/Home.tsx`**

```tsx
import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

const Home: React.FC = ({ onNavigate, onHeaderVisibilityChange }) => {
  return (
    <>
      {/* HERO with Spline Background */}
      <section className="relative overflow-hidden bg-white z-0 min-h-[80vh] md:min-h-[88vh] flex items-center">
        
        {/* Spline 3D Background */}
        <div className="absolute inset-0 w-full h-full -z-10">
          <Spline 
            scene="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode"
            className="w-full h-full"
          />
        </div>

        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="z-10 max-w-6xl w-full mx-auto px-6 text-center"
        >
          <h1 className="text-[7vw] font-extrabold text-kollab-red">
            KOLLAB KOREA
          </h1>
          <p className="text-[2vw] text-kollab-red opacity-70">
            Seoul × LA
          </p>
        </motion.div>
      </section>
    </>
  );
};
```

#### 3. 이벤트 핸들링

```tsx
import Spline from '@splinetool/react-spline';

export default function App() {
  function onLoad(spline) {
    const obj = spline.findObjectByName('Cube');
    console.log(obj);
  }

  function onMouseDown(e) {
    console.log('Mouse down:', e);
  }

  return (
    <Spline
      scene="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode"
      onLoad={onLoad}
      onMouseDown={onMouseDown}
    />
  );
}
```

---

### 방법 2: Runtime API (고급)

```tsx
import { Application } from '@splinetool/runtime';

export default function App() {
  React.useEffect(() => {
    const canvas = document.getElementById('canvas3d');
    const app = new Application(canvas);
    app.load('https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode');
  }, []);

  return (
    <canvas id="canvas3d" />
  );
}
```

---

## 🎨 KOLLAB KOREA 통합 예시

### 히어로 섹션 (Home.tsx)

```tsx
import React, { useEffect, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import { homeContentEn } from '../content/home.en';
import { homeContentKo } from '../content/home.ko';

const Home: React.FC<HomeProps> = ({ onNavigate, onHeaderVisibilityChange }) => {
  const { language } = useLanguage();
  const content = language === 'en' ? homeContentEn : homeContentKo;
  const [splineLoaded, setSplineLoaded] = useState(false);

  function onSplineLoad(spline) {
    console.log('Spline loaded:', spline);
    setSplineLoaded(true);
  }

  return (
    <>
      {/* HERO with Spline 3D Background */}
      <section
        id="hero-section"
        className="relative overflow-hidden bg-white z-0 min-h-[80vh] md:min-h-[88vh] flex items-center"
      >
        {/* Spline 3D Scene */}
        <div className="absolute inset-0 w-full h-full -z-10">
          <Spline 
            scene="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode"
            onLoad={onSplineLoad}
            className="w-full h-full"
            style={{ 
              opacity: splineLoaded ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out'
            }}
          />
          {/* Loading state */}
          {!splineLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-white">
              <div className="text-kollab-red text-xl font-bold animate-pulse">
                Loading 3D Scene...
              </div>
            </div>
          )}
        </div>

        {/* Hero Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="z-10 max-w-6xl w-full mx-auto px-6 text-center flex flex-col items-center py-20 md:py-24"
        >
          <div className="bg-black text-[#EDEBE4] px-2 py-0.5 font-semibold tracking-[0.42em] uppercase text-sm mb-4 md:mb-6">
            {content.badge}
          </div>
          <h1 className="text-[7vw] md:text-[5.5vw] leading-[1.1] font-extrabold tracking-tight text-kollab-red mb-4 uppercase">
            {content.hero.title}
          </h1>
          <p className="text-[3.6vw] md:text-[2vw] font-semibold text-kollab-red opacity-70">
            {content.hero.deck}
          </p>
        </motion.div>
      </section>
    </>
  );
};
```

---

## 🎯 Platform 페이지 통합 예시

```tsx
import Spline from '@splinetool/react-spline';

const Platform: React.FC = () => {
  return (
    <div className="bg-white">
      <section className="relative pt-16 md:pt-24 pb-24 px-6">
        
        {/* 3D 배경 */}
        <div className="absolute inset-0 w-full h-[600px] -z-10">
          <Spline 
            scene="https://prod.spline.design/YOUR_PLATFORM_SCENE/scene.splinecode"
            className="w-full h-full opacity-30"
          />
        </div>

        {/* 로드맵 콘텐츠 */}
        <div className="relative z-10">
          {/* 기존 StageCard 컴포넌트들 */}
        </div>
      </section>
    </div>
  );
};
```

---

## ⚡ 성능 최적화

### 1. Lazy Loading

```tsx
import React, { Suspense, lazy } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

export default function App() {
  return (
    <Suspense fallback={<div>Loading 3D...</div>}>
      <Spline scene="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode" />
    </Suspense>
  );
}
```

### 2. 조건부 로딩 (모바일 제외)

```tsx
import { useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';

export default function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <div className="relative">
      {!isMobile ? (
        <Spline scene="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode" />
      ) : (
        <div className="bg-gradient-to-b from-kollab-beige to-white" />
      )}
    </div>
  );
}
```

### 3. 로딩 상태 관리

```tsx
import { useState } from 'react';
import Spline from '@splinetool/react-spline';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-kollab-red" />
        </div>
      )}
      <Spline
        scene="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode"
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}
```

---

## 📋 Spline Scene URL 받기

### Spline 웹사이트에서:

```
1. Spline 디자인 완료
2. 우측 상단 "Export" 클릭
3. "Code Export" 선택
4. "Copy Code" 클릭
5. scene URL 복사:
   https://prod.spline.design/ABC123XYZ/scene.splinecode
```

---

## 🎨 디자인 시스템과 통합

### KOLLAB 컬러 적용

Spline에서 KOLLAB 브랜드 컬러 사용:

```
KOLLAB Red: #dc0000
KOLLAB Beige: #e4e0db
KOLLAB Silver: #c0c0c0
KOLLAB Black: #000000
```

---

## 🔧 TypeScript 타입 정의

```typescript
// types.ts에 추가
import { SplineEvent } from '@splinetool/react-spline';

export interface SplineSceneProps {
  scene: string;
  className?: string;
  onLoad?: (spline: any) => void;
  onMouseDown?: (e: SplineEvent) => void;
  onMouseUp?: (e: SplineEvent) => void;
  onMouseHover?: (e: SplineEvent) => void;
}
```

---

## 📦 설치 및 배포

### 설치

```bash
cd "/Users/hyojoonchoi/Hyojoon Drive/Cursor-Project/kollab-brandpage"
npm install @splinetool/react-spline
```

### 빌드 확인

```bash
npm run build
```

### Git 커밋

```bash
git add package.json package-lock.json
git commit -m "feat: Spline 3D 라이브러리 추가"
git push origin main
```

---

## 🌐 배포 후 테스트

```
http://kollabkorea.s3-website-ap-northeast-2.amazonaws.com/

확인 사항:
✅ 3D 씬 로딩
✅ 인터랙션 작동
✅ 모바일 성능
✅ 텍스트 가독성
```

---

## 🆘 문제 해결

### Spline이 로드되지 않음

```bash
해결:
1. npm install 재실행
2. node_modules 삭제 후 재설치
3. Vite 캐시 삭제: rm -rf node_modules/.vite
```

### 성능 이슈

```bash
해결:
1. Spline 씬 최적화 (폴리곤 수 감소)
2. 모바일에서 비활성화
3. Lazy loading 적용
```

---

## 🎉 완료!

Spline을 KOLLAB KOREA 프로젝트에 통합할 준비가 되었습니다! 🚀

