# 🎨 KOLLAB KOREA - Design System

<div align="center">
  <h2>WHERE SEOUL MEETS LA</h2>
  <p>인더스트리얼 × 모던 × 프리미엄</p>
</div>

---

## 📋 목차

- [브랜드 아이덴티티](#-브랜드-아이덴티티)
- [컬러 시스템](#-컬러-시스템)
- [타이포그래피](#-타이포그래피)
- [스페이싱](#-스페이싱)
- [컴포넌트](#-컴포넌트)
- [애니메이션](#-애니메이션)
- [사용 가이드](#-사용-가이드)

---

## 🎯 브랜드 아이덴티티

### 핵심 가치
- **Bold & Industrial**: 강렬하고 인더스트리얼한 감성
- **Seoul × LA**: 성수동과 LA의 감성 융합
- **Premium Select**: 프리미엄 큐레이션 스토어
- **Global Vision**: K-브랜드의 글로벌 진출

### 디자인 철학
- **미니멀리즘**: 불필요한 요소 제거, 핵심에 집중
- **대비**: 블랙 × 레드 × 화이트의 강렬한 대비
- **기하학**: 그리드와 선을 활용한 구조적 디자인
- **공간감**: 여백을 활용한 호흡감

---

## 🎨 컬러 시스템

### Primary Colors

#### KOLLAB Red
```
메인 브랜드 컬러 - 강렬하고 눈에 띄는 레드
```

| 속성 | 값 |
|------|-----|
| **HEX** | `#dc0000` |
| **RGB** | `220, 0, 0` |
| **CMYK** | `4, 100, 100, 0` |
| **Tailwind** | `kollab-red` |

**사용처:**
- 주요 CTA 버튼
- 브랜드 로고
- 강조 요소 (제목, 아이콘)
- Hover 상태

**코드 예시:**
```tsx
// Tailwind
<button className="bg-kollab-red text-white">Apply Now</button>

// CSS
.brand-accent {
  background-color: #dc0000;
}
```

---

#### KOLLAB Black
```
기본 배경 컬러 - 프리미엄하고 모던한 블랙
```

| 속성 | 값 |
|------|-----|
| **HEX** | `#000000` |
| **RGB** | `0, 0, 0` |
| **CMYK** | `0, 0, 0, 100` |
| **Tailwind** | `kollab-black` |

**사용처:**
- 메인 배경
- 헤더/푸터
- 텍스트 (화이트 배경 위)
- 다크 섹션

---

### Secondary Colors

#### KOLLAB Wall Beige
```
서브 배경 컬러 - 따뜻하고 차분한 베이지
```

| 속성 | 값 |
|------|-----|
| **HEX** | `#e4e0db` |
| **RGB** | `228, 224, 218` |
| **CMYK** | `13, 13, 14, 0` |
| **Tailwind** | `kollab-beige` |

**사용처:**
- About 섹션 배경
- 교차 배경 섹션
- 카드 배경

---

#### KOLLAB Metallic Silver
```
강조 컬러 - 인더스트리얼한 메탈릭 실버
```

| 속성 | 값 |
|------|-----|
| **HEX** | `#c0c0c0` |
| **RGB** | `192, 192, 192` |
| **CMYK** | `0, 0, 0, 25` |
| **Tailwind** | `kollab-silver` |

**사용처:**
- Benefits 섹션 배경
- 구조적 요소 (라인, 보더)
- 메탈릭 효과

---

### Neutral Colors

#### WHITE
```
화이트 - 깨끗하고 명확한 화이트
```

| 속성 | 값 |
|------|-----|
| **HEX** | `#ffffff` |
| **RGB** | `255, 255, 255` |
| **CMYK** | `0, 0, 0, 0` |

**사용처:**
- 텍스트 (다크 배경 위)
- 카드 배경
- 아이콘

---

### Grayscale

| 이름 | HEX | 사용처 |
|------|-----|--------|
| **Gray 900** | `#111111` | Off-black, 텍스트 |
| **Gray 800** | `#1f1f1f` | 카드 배경 |
| **Gray 700** | `#404040` | Border, 구분선 |
| **Gray 600** | `#525252` | 비활성 텍스트 |
| **Gray 500** | `#737373` | Placeholder |
| **Gray 400** | `#a3a3a3` | Secondary 텍스트 |
| **Gray 300** | `#d4d4d4` | Border light |
| **Gray 200** | `#e5e5e5` | Background subtle |
| **Gray 100** | `#f5f5f5` | Background lightest |

---

## 📝 타이포그래피

### Font Family

```css
font-family: 'Inter', sans-serif;
```

**특징:**
- 현대적이고 깔끔한 산세리프
- 우수한 가독성
- 다양한 weight 지원
- 한글/영문 조화

### Font Weights

| Weight | 값 | 사용처 |
|--------|-----|--------|
| **Light** | 300 | Body text (선택적) |
| **Regular** | 400 | Body text, 단락 |
| **Semi Bold** | 600 | 부제목, 강조 |
| **Bold** | 700 | 제목, 버튼 |
| **Black** | 900 | 대형 제목, 브랜드 워드 |

### Type Scale

```typescript
// Heading Sizes
H1: 'text-7xl md:text-8xl lg:text-9xl'     // 72px / 96px / 128px
H2: 'text-6xl md:text-7xl lg:text-8xl'     // 60px / 72px / 96px
H3: 'text-4xl md:text-5xl lg:text-6xl'     // 36px / 48px / 60px
H4: 'text-3xl md:text-4xl'                 // 30px / 36px
H5: 'text-2xl md:text-3xl'                 // 24px / 30px
H6: 'text-xl md:text-2xl'                  // 20px / 24px

// Body Sizes
Body XL: 'text-xl md:text-2xl'             // 20px / 24px
Body L:  'text-lg md:text-xl'              // 18px / 20px
Body M:  'text-base'                        // 16px (기본)
Body S:  'text-sm'                          // 14px
Body XS: 'text-xs'                          // 12px
```

### Typography Rules

#### 1. 제목 (Headings)
```tsx
// ✅ GOOD
<h1 className="text-8xl font-black tracking-tighter leading-none uppercase">
  WHERE SEOUL MEETS LA
</h1>

// Font: Inter Black (900)
// Letter-spacing: -0.05em (tighter)
// Line-height: 0.9 (leading-none)
// Transform: uppercase
```

#### 2. 본문 (Body)
```tsx
// ✅ GOOD
<p className="text-lg md:text-xl font-medium leading-relaxed break-keep">
  KOLLAB는 K-브랜드의 미국 시장 진출을 가장 전략적으로 시작할 수 있는 첫 단계입니다.
</p>

// Font: Inter Medium (600)
// Line-height: 1.625 (leading-relaxed)
// Word-break: keep-all (한글 줄바꿈)
```

#### 3. 버튼/CTA
```tsx
// ✅ GOOD
<button className="text-lg md:text-xl font-black uppercase tracking-widest">
  APPLY NOW
</button>

// Font: Inter Black (900)
// Transform: uppercase
// Letter-spacing: 0.1em (widest)
```

---

## 📐 스페이싱

### Spacing Scale

```typescript
// Tailwind Spacing (4px base)
xs:  4px   // space-1
sm:  8px   // space-2
md:  16px  // space-4
lg:  24px  // space-6
xl:  32px  // space-8
2xl: 48px  // space-12
3xl: 64px  // space-16
4xl: 96px  // space-24
5xl: 128px // space-32
```

### Layout Grid

#### Container
```tsx
<div className="container mx-auto px-6">
  {/* 컨텐츠 */}
</div>

// Max-width: 1280px (default)
// Padding: 24px (px-6)
// Margin: auto (중앙 정렬)
```

#### Section Padding
```tsx
// 모바일
py-20       // 80px 상하

// 태블릿 이상
md:py-32    // 128px 상하

// 데스크톱
lg:py-40    // 160px 상하
```

### Component Spacing

#### 카드
```tsx
<div className="p-8 md:p-10 space-y-6">
  {/* Padding: 32px / 40px */}
  {/* Gap: 24px */}
</div>
```

#### 버튼
```tsx
<button className="px-12 py-5">
  {/* Horizontal: 48px */}
  {/* Vertical: 20px */}
</button>
```

---

## 🧩 컴포넌트

### Button

#### Variants

```tsx
// Primary
<Button variant="primary" size="lg">
  Apply Now
</Button>
// bg-kollab-red, text-white, font-black

// Secondary  
<Button variant="secondary" size="lg">
  Learn More
</Button>
// bg-white, text-black, font-bold

// Outline
<Button variant="outline" size="md">
  Discover
</Button>
// border-white, text-white, hover:bg-white

// Ghost
<Button variant="ghost" size="sm">
  Close
</Button>
// transparent, text-white, hover:bg-white/10
```

#### Sizes
```typescript
sm:  'px-6 py-2 text-sm'
md:  'px-10 py-3 text-base'
lg:  'px-12 py-5 text-lg'
xl:  'px-16 py-6 text-xl'
```

### Card

```tsx
<div className="bg-white border border-zinc-300 p-10 hover:border-kollab-red transition-all duration-300 shadow-sm hover:shadow-xl">
  {/* 컨텐츠 */}
</div>

// 기본: 화이트 배경, 보더
// Hover: 레드 보더, 그림자 강화
// 전환: 300ms
```

### Input / Form Field

```tsx
<input 
  type="text"
  className="w-full p-3 bg-black border border-zinc-700 text-white rounded-none focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
/>

// 배경: 블랙
// 보더: Zinc 700
// Focus: 레드 보더 + 링
// 코너: 0 (sharp)
```

---

## 🎬 애니메이션

### Duration

```typescript
FAST:      300ms   // 버튼, 호버
MEDIUM:    500ms   // 카드, 전환
SLOW:      700ms   // 이미지, 스케일
VERY_SLOW: 1000ms  // 페이드인, 대형 요소
```

### Easing

```css
ease-out      // 일반 전환 (기본)
ease-in-out   // 부드러운 전환
ease-linear   // 일정한 속도
```

### Hover Effects

#### 버튼
```tsx
<button className="transform hover:scale-105 transition-transform duration-300">
  {/* 5% 확대 */}
</button>
```

#### 카드
```tsx
<div className="hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
  {/* 그림자 + 위로 이동 */}
</div>
```

#### 이미지
```tsx
<img className="scale-100 hover:scale-110 transition-transform duration-700" />
{/* 10% 확대, 느린 전환 */}
```

### Page Load Animations

```tsx
// Fade In
<div className="opacity-0 animate-fade-in" />

// Slide Up
<div className="translate-y-10 opacity-0 animate-slide-up" />

// Scale In
<div className="scale-95 opacity-0 animate-scale-in" />
```

---

## 🎯 사용 가이드

### ✅ DO (해야 할 것)

#### 컬러
- ✅ KOLLAB Red를 주요 CTA와 강조에만 사용
- ✅ 블랙 배경 위에 화이트 텍스트
- ✅ 베이지 배경 위에 블랙 텍스트
- ✅ 60-30-10 규칙: 블랙 60%, 베이지/실버 30%, 레드 10%

#### 타이포그래피
- ✅ 제목에는 Inter Black (900) 사용
- ✅ 본문에는 Inter Medium (600) 사용
- ✅ 한글 텍스트에 `break-keep` 적용
- ✅ 대형 제목에 `tracking-tighter` 사용
- ✅ CTA 버튼에 `uppercase` 사용

#### 레이아웃
- ✅ Container로 컨텐츠 제한 (max-width: 1280px)
- ✅ 섹션 간 충분한 여백 (py-32 이상)
- ✅ 그리드 시스템 사용 (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
- ✅ 모바일 우선 반응형 디자인

#### 컴포넌트
- ✅ 재사용 가능한 UI 컴포넌트 사용
- ✅ 일관된 Hover 상태 제공
- ✅ 접근성 속성 추가 (aria-label, role)
- ✅ 키보드 네비게이션 지원

### ❌ DON'T (하지 말아야 할 것)

#### 컬러
- ❌ KOLLAB Red를 배경 전체에 과도하게 사용
- ❌ 낮은 대비의 컬러 조합 (회색 위 회색 등)
- ❌ 정의되지 않은 커스텀 컬러 사용
- ❌ Gradient 과다 사용

#### 타이포그래피
- ❌ 3개 이상의 폰트 패밀리 사용
- ❌ 너무 작은 폰트 사이즈 (12px 이하)
- ❌ 과도한 letter-spacing
- ❌ 줄 간격이 너무 좁음 (leading-tight)

#### 레이아웃
- ❌ 고정 픽셀 width 사용 (반응형 저해)
- ❌ 일관성 없는 스페이싱
- ❌ 섹션 간 여백 부족
- ❌ 모바일 테스트 생략

#### 애니메이션
- ❌ 과도한 애니메이션 (어지러움 유발)
- ❌ 너무 빠른 전환 (<200ms)
- ❌ 너무 느린 전환 (>1s)
- ❌ 성능 저하를 유발하는 애니메이션

---

## 💻 코드 스니펫

### Section Template

```tsx
<section className="min-h-screen w-full flex flex-col justify-center bg-black text-white px-6 py-32 md:py-40">
  <div className="container mx-auto">
    <SectionHeader
      tag="OUR VISION"
      title="WHERE SEOUL MEETS LA"
      accentWord="LA"
      subtitle="글로벌 K-브랜드의 허브"
    />
    
    <div className="mt-16">
      {/* 컨텐츠 */}
    </div>
  </div>
</section>
```

### Card Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map((item, index) => (
    <div 
      key={index}
      className="bg-white border border-zinc-300 p-10 hover:border-kollab-red transition-all duration-300 group"
    >
      <h3 className="text-2xl font-black mb-4 group-hover:text-kollab-red">
        {item.title}
      </h3>
      <p className="text-zinc-700">{item.description}</p>
    </div>
  ))}
</div>
```

### CTA Section

```tsx
<section className="bg-kollab-red text-white py-40 px-6">
  <div className="container mx-auto text-center">
    <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tighter mb-12">
      Ready To Go<br/>
      <span className="text-black">Global?</span>
    </h2>
    
    <Button variant="secondary" size="xl" icon={ArrowRight}>
      Apply Now
    </Button>
  </div>
</section>
```

---

## 📱 반응형 가이드

### Breakpoints

```typescript
// Tailwind 기본 브레이크포인트
sm:  640px   // 모바일 가로
md:  768px   // 태블릿
lg:  1024px  // 데스크톱 소
xl:  1280px  // 데스크톱
2xl: 1536px  // 대형 데스크톱
```

### 반응형 패턴

```tsx
// Typography
<h1 className="text-5xl md:text-7xl lg:text-9xl">

// Spacing
<div className="px-4 md:px-6 lg:px-8">
<div className="py-20 md:py-32 lg:py-40">

// Layout
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// Display
<div className="hidden md:block">  {/* 모바일 숨김 */}
<div className="md:hidden">        {/* 데스크톱 숨김 */}
```

---

## 🔍 품질 체크리스트

### 컬러 체크
- [ ] KOLLAB 브랜드 컬러만 사용
- [ ] 충분한 대비 비율 (WCAG AA)
- [ ] 일관된 컬러 팔레트

### 타이포그래피 체크
- [ ] Inter 폰트 사용
- [ ] 적절한 폰트 크기 (최소 14px)
- [ ] 한글 텍스트에 break-keep
- [ ] 읽기 편한 줄 간격

### 레이아웃 체크
- [ ] 모바일 우선 디자인
- [ ] 모든 브레이크포인트 테스트
- [ ] 일관된 스페이싱
- [ ] Container 사용

### 접근성 체크
- [ ] ARIA 레이블 추가
- [ ] 키보드 네비게이션
- [ ] 포커스 상태 표시
- [ ] Alt 텍스트 (이미지)

### 성능 체크
- [ ] 불필요한 애니메이션 제거
- [ ] 최적화된 이미지
- [ ] 효율적인 CSS
- [ ] 빠른 로딩 시간

---

## 📚 참고 자료

### Figma 디자인
- 메인 디자인 파일: [링크 필요]
- 컴포넌트 라이브러리: [링크 필요]

### 브랜드 가이드
- 로고 사용 가이드
- 컬러 사용 규정
- 타이포그래피 규칙

### 코드 저장소
- GitHub: https://github.com/yigolabdev/kollabkorea
- Storybook: [링크 필요]

---

<div align="center">
  <h2>🎨 Design System v1.0</h2>
  <p><strong>WHERE SEOUL MEETS LA</strong></p>
  <p>© 2025 KOLLAB KOREA. All Rights Reserved.</p>
</div>

