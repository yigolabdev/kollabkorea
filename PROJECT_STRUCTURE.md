# 📋 KOLLAB KOREA 프로젝트 구조 가이드

## 📁 프로젝트 구조

```
kollab-brandpage/
├── 📄 types.ts                    # 전역 타입 정의 (중앙 관리)
├── 📄 constants.ts                # 전역 상수
├── 📄 LanguageContext.tsx         # 다국어 Context
├── 📄 App.tsx                     # 메인 앱 컴포넌트
├── 📄 index.tsx                   # 엔트리 포인트
│
├── 📁 utils/                      # 유틸리티 함수 (NEW!)
│   ├── animations.ts              # Framer Motion variants 중앙 관리
│   ├── text.ts                    # 텍스트 처리 (hasKorean, splitLines, etc.)
│   ├── scroll.ts                  # 스크롤 유틸리티 (lockBodyScroll, etc.)
│   └── navigation.ts              # 네비게이션 헬퍼 (getPathFromUrl, etc.)
│
├── 📁 components/                 # 재사용 컴포넌트
│   ├── Navbar.tsx                 # 네비게이션 바
│   ├── Footer.tsx                 # 푸터
│   ├── BlindLine.tsx              # 텍스트 reveal 효과 (NEW!)
│   ├── ScrollIndicator.tsx        # 스크롤 인디케이터 (NEW!)
│   ├── ImageSlider.tsx            # 이미지 슬라이더
│   ├── LanguageToggle.tsx         # 언어 전환 토글
│   ├── StageCard.tsx              # 로드맵 카드
│   ├── CurvedPath.tsx             # SVG 곡선 경로
│   └── ... (기타 컴포넌트)
│
├── 📁 pages/                      # 페이지 컴포넌트
│   ├── Home.tsx                   # 홈 페이지
│   ├── About.tsx                  # 어바웃 페이지
│   ├── Platform.tsx               # 플랫폼/로드맵 페이지
│   ├── Brands.tsx                 # 브랜드 페이지
│   ├── Contact.tsx                # 컨택트 페이지
│   └── FAQ.tsx                    # FAQ 페이지
│
├── 📁 content/                    # 다국어 컨텐츠
│   ├── home.ko.ts                 # 홈 - 한국어
│   ├── home.en.ts                 # 홈 - 영어
│   ├── about.ko.ts                # 어바웃 - 한국어
│   ├── about.en.ts                # 어바웃 - 영어
│   └── ... (기타 컨텐츠)
│
├── 📁 i18n/                       # 다국어 사전
│   ├── ko.json
│   └── en.json
│
├── 📁 services/                   # API 서비스
│   └── geminiService.ts           # AI 챗봇 서비스
│
├── 📁 public/                     # 정적 파일
│   └── assets/
│       ├── brands/                # 브랜드 로고
│       ├── images/                # 이미지
│       └── photos/                # 사진
│
├── 📁 docs/                       # 프로젝트 문서
│   ├── 00-brand-page-core.md
│   ├── 01-reference-abstraction.md
│   └── ... (12개 문서)
│
└── 📁 dist/                       # 빌드 결과물
    ├── index.html
    └── assets/
        ├── index-*.js
        └── *.css
```

---

## 🔧 리팩토링으로 추가된 파일들

### 1. `utils/` 디렉토리 (NEW!)

#### `utils/animations.ts`
**목적**: 모든 Framer Motion animation variants 중앙 관리

```typescript
// 사용 예시
import { containerVariants, itemVariants, blindLineVariants } from '../utils/animations';

<motion.div variants={containerVariants}>
  <motion.div variants={itemVariants}>...</motion.div>
</motion.div>
```

**제공하는 variants**:
- `containerVariants` - 컨테이너 스태거 애니메이션
- `itemVariants` - 아이템 페이드인
- `blindLineVariants` - 텍스트 슬라이드업
- `riseVariants` - 상승 애니메이션
- `scaleInVariants` - 확대 애니메이션
- `fadeInUpVariants` - 페이드인 + 상승

#### `utils/text.ts`
**목적**: 텍스트 처리 유틸리티

```typescript
// 사용 예시
import { hasKorean, splitTwoLines, highlightBrandName } from '../utils/text';

const hasKr = hasKorean('안녕하세요'); // true
const { a, b } = splitTwoLines('Line 1\nLine 2');
const parts = highlightBrandName('KOLLAB KOREA is great');
```

**제공하는 함수**:
- `hasKorean(text)` - 한글 포함 여부 체크
- `splitTwoLines(text)` - 두 줄로 분리
- `highlightBrandName(text)` - 브랜드명 하이라이트 (KOLLAB KOREA, KOLLAB LA)
- `splitLines(text)` - 줄바꿈 기준 배열 변환

#### `utils/scroll.ts`
**목적**: 스크롤 관련 유틸리티

```typescript
// 사용 예시
import { scrollToTop, lockBodyScroll, unlockBodyScroll } from '../utils/scroll';

scrollToTop('smooth');
lockBodyScroll();   // 모바일 메뉴 열 때
unlockBodyScroll(); // 모바일 메뉴 닫을 때
```

**제공하는 함수**:
- `scrollToTop(behavior)` - 페이지 상단으로 스크롤
- `isScrollable(el)` - 요소가 스크롤 가능한지 체크
- `getScrollableParent(el)` - 스크롤 가능한 부모 찾기
- `lockBodyScroll()` - body 스크롤 잠금
- `unlockBodyScroll()` - body 스크롤 해제

#### `utils/navigation.ts`
**목적**: 네비게이션 관련 헬퍼

```typescript
// 사용 예시
import { getPathFromUrl, navigateToPage } from '../utils/navigation';

const currentPage = getPathFromUrl(); // 'home' | 'about' | ...
navigateToPage('about');
```

**제공하는 함수**:
- `getPathFromUrl()` - URL에서 페이지 ID 추출
- `getUrlFromPageId(pageId)` - 페이지 ID를 URL로 변환
- `navigateToPage(pageId)` - 페이지 네비게이션 (history API)

---

### 2. 새로운 컴포넌트

#### `components/BlindLine.tsx` (NEW!)
**목적**: 텍스트 reveal 효과 (About 페이지에서 추출)

```typescript
// 사용 예시
import BlindLine from '../components/BlindLine';

<motion.div variants={blindGroupVariants}>
  <BlindLine>텍스트가 아래에서 위로 슬라이드업</BlindLine>
</motion.div>
```

**특징**:
- `React.memo`로 최적화
- `blindLineVariants` 자동 적용
- About 페이지 스타일 통일

#### `components/ScrollIndicator.tsx` (NEW!)
**목적**: 스크롤 유도 인디케이터

```typescript
// 사용 예시
import ScrollIndicator from '../components/ScrollIndicator';

<ScrollIndicator className="mt-16" delay={1.5} />
```

**Props**:
- `className?: string` - 추가 CSS 클래스
- `delay?: number` - 애니메이션 지연 시간 (기본: 1.5초)

---

## 📖 사용 가이드

### 새로운 페이지 추가 시

1. **페이지 컴포넌트 생성**
```typescript
// pages/NewPage.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '../utils/animations';
import type { NavigationProps } from '../types';

const NewPage: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <motion.div variants={containerVariants}>
      <motion.div variants={itemVariants}>
        Content
      </motion.div>
    </motion.div>
  );
};

export default NewPage;
```

2. **types.ts에 PageId 추가**
```typescript
export type PageId = 'home' | 'about' | 'platform' | 'brands' | 'contact' | 'faq' | 'newpage';
```

3. **App.tsx에 라우트 추가**
```typescript
case 'newpage': return <NewPage onNavigate={navigateTo} />;
```

---

### 새로운 애니메이션 추가 시

1. **`utils/animations.ts`에 variants 정의**
```typescript
export const myCustomVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASING.smooth }
  }
};
```

2. **컴포넌트에서 사용**
```typescript
import { myCustomVariants } from '../utils/animations';

<motion.div variants={myCustomVariants}>...</motion.div>
```

---

### 유틸리티 함수 추가 시

1. **적절한 카테고리 파일 선택**
- 텍스트 관련 → `utils/text.ts`
- 스크롤 관련 → `utils/scroll.ts`
- 네비게이션 관련 → `utils/navigation.ts`
- 기타 → 새 파일 생성

2. **함수 정의 및 export**
```typescript
// utils/text.ts
export const formatPhoneNumber = (phone: string): string => {
  // 구현
};
```

3. **타입이 필요하면 types.ts에 추가**
```typescript
// types.ts
export interface PhoneNumber {
  countryCode: string;
  number: string;
}
```

---

## 🎯 코딩 규칙 (Quick Reference)

### 1. Import 순서
```typescript
// 1. React
import React, { useState, useEffect } from 'react';

// 2. 외부 라이브러리
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

// 3. 내부 모듈 (상대 경로)
import { useLanguage } from '../LanguageContext';
import Button from '../components/Button';
import { containerVariants } from '../utils/animations';

// 4. 타입
import type { PageProps, NavigationProps } from '../types';
```

### 2. 컴포넌트 구조
```typescript
// 1. 타입 정의
interface MyComponentProps {
  title: string;
  onNavigate: (page: string) => void;
}

// 2. 컴포넌트 선언
const MyComponent: React.FC<MyComponentProps> = ({ title, onNavigate }) => {
  // 3. Hooks
  const { language } = useLanguage();
  const [state, setState] = useState(false);
  
  // 4. useEffect
  useEffect(() => {
    // ...
  }, []);
  
  // 5. 이벤트 핸들러
  const handleClick = useCallback(() => {
    // ...
  }, []);
  
  // 6. JSX return
  return (
    <div>{title}</div>
  );
};

// 7. displayName (memo 사용 시)
MyComponent.displayName = 'MyComponent';

// 8. Export
export default MyComponent;
```

### 3. 성능 최적화 체크리스트
- [ ] 재사용 가능한 컴포넌트는 `React.memo` 사용
- [ ] 이벤트 핸들러는 `useCallback` 사용
- [ ] 복잡한 계산은 `useMemo` 사용
- [ ] 불필요한 리렌더링 방지

### 4. 타입 안정성 체크리스트
- [ ] Props는 항상 interface로 정의
- [ ] `any` 사용 금지
- [ ] 타입 추론 활용 (명시적 타입 선언 최소화)
- [ ] 공통 타입은 `types.ts`에 정의

---

## 🚀 개발 워크플로우

### 1. 개발 시작
```bash
npm run dev
# → http://localhost:3000 (또는 3001)
```

### 2. 코드 변경 후
- 자동 리로드 확인
- 브라우저 콘솔 에러 확인
- 타입 에러 확인 (VSCode)

### 3. 빌드 전 체크
```bash
# 린트 체크 (자동)
# 타입 체크 (자동)

# 프로덕션 빌드
npm run build

# 빌드 결과 확인
npm run preview
```

### 4. 배포
```bash
git add .
git commit -m "feat: 기능 추가"
git push origin main
# → GitHub Actions 자동 배포
```

---

## 📚 추가 문서

- **디자인 시스템**: `.cursorrules` 및 `DESIGN_SYSTEM.md`
- **배포 가이드**: `DEPLOY_README.md`, `S3_DEPLOYMENT_GUIDE.md`
- **리팩토링 보고서**: `REFACTORING_REPORT.md` ← 이번에 생성됨!
- **프로젝트 문서**: `docs/` 디렉토리 (12개 문서)

---

## 🎉 요약

### 주요 변경사항
1. ✅ `utils/` 디렉토리 추가 (animations, text, scroll, navigation)
2. ✅ 재사용 컴포넌트 추가 (BlindLine, ScrollIndicator)
3. ✅ 타입 정의 통합 (`types.ts`)
4. ✅ 성능 최적화 (memo, useCallback)
5. ✅ 코드 일관성 향상

### 개발자 경험 개선
- 🔍 **명확한 구조**: 파일 위치를 쉽게 예측 가능
- 🚀 **생산성 향상**: 재사용 가능한 유틸리티 및 컴포넌트
- 🛡️ **타입 안정성**: 완전한 TypeScript 지원
- 📖 **문서화**: 명확한 가이드 제공

---

**마지막 업데이트**: 2026-01-11
