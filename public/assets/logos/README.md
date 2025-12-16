# KOLLAB Logo Assets

이 폴더에는 다양한 버전의 KOLLAB 로고가 포함되어 있습니다.

## 📁 파일 구조

```
logos/
├── kollab-black.svg          # 검은 배경용 (한 줄)
├── kollab-white.svg          # 흰 배경용 (한 줄)
├── kollab-red.svg            # 빨간 배경용 (한 줄)
├── kollab-stacked-black.svg  # 검은 배경용 (두 줄)
├── kollab-stacked-white.svg  # 흰 배경용 (두 줄)
├── kollab-stacked-red.svg    # 빨간 배경용 (두 줄)
└── README.md
```

## 🎨 사용 가이드

### 한 줄 로고 (KOLLAB)
- **메인 로고**: 가로 공간이 충분할 때
- **Navbar**: 헤더에 사용
- **Footer**: 푸터 하단에 사용

### 두 줄 로고 (KOL / LAB)
- **Hero 섹션**: 대형 로고가 필요할 때
- **모바일**: 세로 공간 활용
- **정사각형 레이아웃**: SNS 프로필 등

## 🎯 사용처별 권장 로고

| 위치 | 배경색 | 권장 로고 | 파일명 |
|------|--------|-----------|--------|
| **Navbar (기본)** | Transparent/Black | 화이트 | `kollab-white.svg` |
| **Navbar (스크롤)** | Black | 화이트 | `kollab-white.svg` |
| **Hero Section** | Black | 화이트 (stacked) | `kollab-stacked-white.svg` |
| **Footer** | Black | 화이트 또는 레드 | `kollab-white.svg` |
| **CTA Section** | Red | 화이트 (stacked) | `kollab-stacked-white.svg` |
| **About Section** | Beige | 블랙 | `kollab-black.svg` |
| **Benefits Section** | Silver | 블랙 | `kollab-black.svg` |

## ⚠️ 주의사항

1. **최소 크기**: 로고는 최소 60px 높이를 유지
2. **여백**: 로고 주변에 충분한 여백 확보 (최소 로고 높이의 0.5배)
3. **변형 금지**: 로고를 왜곡하거나 회전하지 말 것
4. **컬러 변경 금지**: 정의된 버전만 사용

## 💻 코드 예시

### React 컴포넌트에서 사용

```tsx
// Navbar (흰색 로고)
<img 
  src="/assets/logos/kollab-white.svg" 
  alt="KOLLAB" 
  className="h-8"
/>

// Hero (두 줄, 흰색)
<img 
  src="/assets/logos/kollab-stacked-white.svg" 
  alt="KOLLAB" 
  className="h-32 md:h-48"
/>

// About (검은색 로고)
<img 
  src="/assets/logos/kollab-black.svg" 
  alt="KOLLAB" 
  className="h-10"
/>
```

## 🔗 관련 문서

- [디자인 시스템](../../DESIGN_SYSTEM.md)
- [브랜드 가이드라인](../../BRAND_GUIDELINES.md)

