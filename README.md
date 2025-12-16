# KOLLAB KOREA 🇰🇷 × 🇺🇸

<div align="center">
  <img src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" alt="KOLLAB Banner" width="100%" />
  
  **Seoul × Los Angeles 콘셉트의 K-브랜드 입점 신청 랜딩페이지**
  
  [![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?logo=typescript)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-5.2-646CFF?logo=vite)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwind-css)](https://tailwindcss.com/)
</div>

---

## 📑 목차

- [프로젝트 소개](#-프로젝트-소개)
- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [프로젝트 구조](#-프로젝트-구조)
- [시작하기](#-시작하기)
- [개발 가이드](#-개발-가이드)
- [리팩토링 내역](#-리팩토링-내역)
- [배포](#-배포)

---

## 🎯 프로젝트 소개

**KOLLAB KOREA**는 한국 브랜드의 미국 진출을 지원하는 프리미엄 셀렉트 스토어입니다.  
이 프로젝트는 브랜드 입점 신청을 위한 **반응형 랜딩페이지**로, 인더스트리얼하고 모던한 디자인 시스템을 구현했습니다.

### 핵심 콘셉트
- 🏙️ **Seoul × LA**: 성수동의 인더스트리얼 감성 + LA의 자유로운 무드
- 🎨 **프리미엄 BX 디자인**: 블랙/레드 컬러 시스템
- ⚡ **고성능 UX**: 60fps 애니메이션, 패럴랙스 효과
- ♿ **접근성 우선**: ARIA 레이블, 키보드 네비게이션

---

## ✨ 주요 기능

### 1. **인터랙티브 히어로 섹션**
- 마우스 추적 패럴랙스 효과
- 동적 스포트라이트 그라데이션
- 단계별 페이드인 애니메이션

### 2. **입점 신청 모달**
- 검증 기능이 포함된 폼
- 접근성 개선 (ARIA, 키보드 네비게이션)
- mailto 연동으로 즉시 문의 가능

### 3. **3가지 Zone 소개**
- Premium Zone (4개 브랜드)
- Standard Zone (6개 브랜드)
- Basic Zone (20개 브랜드)
- 인터랙티브 매장 맵 시각화

### 4. **반응형 디자인**
- 모바일 우선 설계
- Sticky CTA 버튼 (모바일)
- 태블릿/데스크톱 최적화

---

## 🛠 기술 스택

### Core
- **React 18.2** - UI 라이브러리
- **TypeScript 5.2** - 타입 안정성
- **Vite 5.2** - 빌드 도구 (⚡ 초고속)

### Styling
- **Tailwind CSS 3.4** - 유틸리티 우선 CSS
- **PostCSS** - CSS 후처리
- **Autoprefixer** - 브라우저 호환성

### Icons & UI
- **Lucide React** - 아이콘 라이브러리

### Code Quality
- **ESLint** - 코드 린팅
- **TypeScript Strict Mode** - 엄격한 타입 체크

---

## 📁 프로젝트 구조

```
kollab-korea/
├── components/           # React 컴포넌트
│   ├── ui/              # 재사용 가능한 UI 컴포넌트
│   │   ├── Button.tsx
│   │   ├── FormField.tsx
│   │   └── SectionHeader.tsx
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Benefits.tsx
│   ├── Zones.tsx
│   ├── MoodBoard.tsx
│   ├── Partners.tsx
│   ├── ApplyCTA.tsx
│   ├── ApplyModal.tsx
│   └── Footer.tsx
├── hooks/               # 커스텀 훅
│   ├── useScrollPosition.ts
│   ├── useClickOutside.ts
│   ├── useMousePosition.ts
│   └── index.ts
├── constants.ts         # 상수 정의
├── types.ts            # TypeScript 타입 정의
├── App.tsx             # 메인 앱 컴포넌트
├── index.tsx           # 엔트리 포인트
├── index.css           # 글로벌 스타일
├── tailwind.config.js  # Tailwind 설정
├── vite.config.ts      # Vite 설정
└── tsconfig.json       # TypeScript 설정
```

---

## 🚀 시작하기

### Prerequisites
- **Node.js** v18 이상
- **npm** 또는 **yarn**

### 설치

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행
npm run dev

# 3. 브라우저에서 열기
# http://localhost:5177 (또는 자동 할당된 포트)
```

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

---

## 💻 개발 가이드

### 컴포넌트 작성 규칙

```typescript
// ✅ GOOD: 함수형 컴포넌트 + TypeScript
interface MyComponentProps {
  title: string;
  onAction: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ title, onAction }) => {
  return (
    <div className="bg-black text-white">
      <h1>{title}</h1>
      <button onClick={onAction}>Action</button>
    </div>
  );
};
```

### 커스텀 훅 사용

```typescript
// 스크롤 위치 추적
import { useScrollPosition } from './hooks';

const { scrolled, scrollPosition } = useScrollPosition(50);

// 마우스 위치 추적 (정규화)
import { useMousePosition } from './hooks';

const mousePos = useMousePosition(true); // -1 ~ 1 범위
```

### 스타일 가이드

```tsx
// Tailwind 유틸리티 클래스 사용
<div className="bg-kollab-red text-white px-6 py-4">
  {/* KOLLAB 브랜드 컬러 */}
</div>

// 한글 텍스트에는 break-keep 사용
<p className="break-keep">
  단어 단위로 줄바꿈이 됩니다.
</p>
```

---

## 🔄 리팩토링 내역

이 프로젝트는 **전문가 수준의 리팩토링**을 거쳤습니다:

### 1. **커스텀 훅 분리**
- `useScrollPosition` - 스크롤 위치 추적
- `useClickOutside` - 외부 클릭 감지
- `useMousePosition` - 마우스 위치 추적

### 2. **재사용 가능한 UI 컴포넌트**
- `Button` - 4가지 variant + 접근성 개선
- `FormField` - 통합 폼 필드 컴포넌트
- `SectionHeader` - 섹션 헤더 템플릿

### 3. **타입 안정성 강화**
- 모든 Props에 interface 정의
- 유틸리티 타입 추가 (MousePosition, ScrollPosition 등)
- BrandCategory enum 타입

### 4. **접근성 개선**
- ARIA 레이블 추가
- 키보드 네비게이션 지원
- 포커스 관리 개선
- 시맨틱 HTML 사용

### 5. **성능 최적화**
- `useCallback`으로 함수 메모이제이션
- `useMemo`로 계산 최적화
- 이벤트 리스너에 `{ passive: true }` 적용

### 6. **코드 품질**
- Magic number를 상수로 추출
- 중복 코드 제거
- 일관된 네이밍 컨벤션
- 린트 에러 0개

---

## 🎨 디자인 시스템

### 컬러 팔레트

```css
--kollab-red:    #dc0000  /* 메인 브랜드 컬러 */
--kollab-beige:  #e4e0db  /* 서브 배경 */
--kollab-silver: #c0c0c0  /* 강조 */
--kollab-black:  #000000  /* 기본 배경 */
--kollab-dark:   #111111  /* 오프 블랙 */
```

### 타이포그래피

- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 600, 700, 900

### 브레이크포인트 (Tailwind 기본)

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

---

## 📦 배포

### Vercel (권장)

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel
```

### Netlify

```bash
# 빌드
npm run build

# dist/ 폴더를 Netlify에 드래그 앤 드롭
```

### GitHub Pages

```bash
# vite.config.ts에 base 설정
export default defineConfig({
  base: '/kollab-korea/',
  // ...
})

# 빌드 후 gh-pages 배포
npm run build
npx gh-pages -d dist
```

---

## 📄 라이선스

© 2025 KOLLAB KOREA. All Rights Reserved.

---

## 👥 Contact

- **Email**: info@kollabkorea.com
- **Instagram**: [@kollab_korea](https://instagram.com/kollab_korea)
- **Business Hours**: 10:00 - 20:00 (KST)

---

<div align="center">
  <strong>Made with ❤️ in Seoul & LA</strong>
</div>
