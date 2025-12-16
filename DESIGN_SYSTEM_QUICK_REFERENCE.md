# 🎨 KOLLAB KOREA - 디자인 시스템 빠른 참조

개발 중 빠르게 참조할 수 있는 디자인 시스템 요약본입니다.

---

## 🎯 컬러 팔레트

### Primary
```tsx
// KOLLAB Red - CTA, 강조, Hover
className="bg-kollab-red text-white"
// #dc0000 | RGB 220,0,0 | CMYK 4,100,100,0

// KOLLAB Black - 메인 배경
className="bg-kollab-black text-white"
// #000000

// KOLLAB Beige - 서브 배경
className="bg-kollab-beige text-black"
// #e4e0db | RGB 228,224,218

// KOLLAB Silver - 구조 요소
className="bg-kollab-silver text-black"
// #c0c0c0 | RGB 192,192,192
```

### 사용 규칙
- 60-30-10: 블랙 60% | 베이지/실버 30% | 레드 10%
- KOLLAB Red는 CTA와 강조에만 사용
- 충분한 대비 유지 (WCAG AA)

---

## 📝 타이포그래피

### 폰트
```tsx
font-family: 'Inter', sans-serif
```

### 제목
```tsx
// H1 - 대형 히어로
<h1 className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none uppercase">
  WHERE SEOUL MEETS LA
</h1>

// H2 - 섹션 타이틀
<h2 className="text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight">
  Partnership Benefits
</h2>

// H3 - 서브 타이틀
<h3 className="text-4xl md:text-5xl lg:text-6xl font-black">
  Zone Map
</h3>
```

### 본문
```tsx
// Body Large
<p className="text-lg md:text-xl font-medium leading-relaxed break-keep">
  한글 텍스트는 break-keep 필수
</p>

// Body Regular
<p className="text-base font-medium leading-relaxed">
  일반 본문 텍스트
</p>

// Body Small
<p className="text-sm font-medium text-zinc-400">
  보조 설명 텍스트
</p>
```

### 버튼/CTA
```tsx
<button className="text-lg font-black uppercase tracking-widest">
  APPLY NOW
</button>
```

---

## 📐 스페이싱

### Section
```tsx
// 모바일 → 태블릿 → 데스크톱
<section className="py-20 md:py-32 lg:py-40">
```

### Container
```tsx
<div className="container mx-auto px-6">
```

### Card
```tsx
<div className="p-8 md:p-10">
```

### Button
```tsx
// Large
<button className="px-12 py-5">

// Medium
<button className="px-10 py-3">

// Small
<button className="px-6 py-2">
```

---

## 🧩 컴포넌트 패턴

### Button
```tsx
import { Button } from './components/ui/Button';

<Button variant="primary" size="lg" icon={ArrowRight}>
  Apply Now
</Button>

// Variants: primary, secondary, outline, ghost
// Sizes: sm, md, lg, xl
```

### Card
```tsx
<div className="bg-white border border-zinc-300 p-10 hover:border-kollab-red transition-all duration-300 shadow-sm hover:shadow-xl">
  {/* 내용 */}
</div>
```

### Input
```tsx
<input 
  className="w-full p-3 bg-black border border-zinc-700 text-white rounded-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
/>
```

### Section Template
```tsx
<section className="min-h-screen w-full flex flex-col justify-center bg-black text-white px-6 py-32 md:py-40">
  <div className="container mx-auto">
    {/* 내용 */}
  </div>
</section>
```

---

## 🎬 애니메이션

### Duration
```tsx
// 호버, 버튼
duration-300

// 카드, 전환
duration-500

// 이미지, 스케일
duration-700

// 페이드인, 대형
duration-1000
```

### Hover Effects
```tsx
// 버튼
<button className="hover:scale-105 transition-transform duration-300">

// 카드
<div className="hover:shadow-xl hover:-translate-y-1 transition-all duration-500">

// 이미지
<img className="hover:scale-110 transition-transform duration-700" />
```

---

## 📱 반응형

### Breakpoints
```tsx
sm:  640px   // 모바일 가로
md:  768px   // 태블릿
lg:  1024px  // 데스크톱
xl:  1280px  // 대형 데스크톱
```

### 패턴
```tsx
// Typography
text-5xl md:text-7xl lg:text-9xl

// Spacing
px-4 md:px-6 lg:px-8
py-20 md:py-32 lg:py-40

// Layout
grid-cols-1 md:grid-cols-2 lg:grid-cols-3

// Visibility
hidden md:block    // 모바일 숨김
md:hidden          // 데스크톱 숨김
```

---

## ✅ 체크리스트

### 코딩 전
- [ ] 브랜드 컬러 확인
- [ ] 타이포그래피 규칙 확인
- [ ] 컴포넌트 재사용 검토

### 코딩 후
- [ ] 한글 텍스트에 break-keep
- [ ] ARIA 레이블 추가
- [ ] 모든 브레이크포인트 테스트
- [ ] 린트 에러 0개

---

## 🚫 금지 사항

### ❌ DON'T
```tsx
// ❌ 정의되지 않은 컬러
<div className="bg-blue-500">

// ❌ Inter 이외의 폰트
<p style={{ fontFamily: 'Arial' }}>

// ❌ 고정 픽셀 width
<div style={{ width: '500px' }}>

// ❌ 너무 빠른 애니메이션
<div className="duration-100">

// ❌ break-keep 누락
<p>한글 텍스트입니다</p>
```

### ✅ DO
```tsx
// ✅ 브랜드 컬러 사용
<div className="bg-kollab-red">

// ✅ Inter 폰트 (기본)
<p className="font-sans">

// ✅ 반응형 width
<div className="w-full md:w-1/2">

// ✅ 적절한 애니메이션
<div className="duration-300">

// ✅ break-keep 사용
<p className="break-keep">한글 텍스트입니다</p>
```

---

## 🔗 전체 문서

- 📘 **완전한 디자인 시스템**: `DESIGN_SYSTEM.md`
- 🎨 **디자인 토큰**: `design-tokens.ts`
- 📋 **디자인 규칙**: `.design-system-rules.json`

---

<div align="center">
  <strong>WHERE SEOUL MEETS LA</strong>
  <br>
  <small>© 2025 KOLLAB KOREA</small>
</div>

