# 🎨 KOLLAB KOREA Favicon 가이드

## 📁 파비콘 파일 구조

```
public/
├── favicon.svg                  # 메인 파비콘 (SVG)
├── favicon-16x16.svg           # 16x16 사이즈
├── favicon-32x32.svg           # 32x32 사이즈
├── apple-touch-icon.svg        # iOS 홈 화면 아이콘 (180x180)
├── android-chrome-192x192.svg  # Android Chrome 192x192
├── android-chrome-512x512.svg  # Android Chrome 512x512
└── site.webmanifest            # PWA 매니페스트
```

---

## 🎨 디자인 컨셉

### 심볼
- **"K" 레터**: KOLLAB의 첫 글자를 강렬하게 표현
- **블랙 배경**: 프리미엄하고 모던한 느낌
- **레드 액센트**: KOLLAB Red (#dc0000) 사용

### 디자인 요소
```
⬛ 블랙 배경 (#000000)
🔴 KOLLAB Red K 레터 (#dc0000)
━━ 레드 액센트 라인
```

---

## 📱 플랫폼별 파비콘

### 1. **웹 브라우저**
```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="icon" sizes="16x16" href="/favicon-16x16.svg" />
<link rel="icon" sizes="32x32" href="/favicon-32x32.svg" />
```

- **Chrome, Firefox, Edge**: SVG 파비콘 지원
- **Safari**: SVG 및 PNG 파비콘 지원
- **IE (레거시)**: ICO 파일 필요 시 변환 가능

### 2. **iOS (Apple)**
```html
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.svg" />
```

- **용도**: 홈 화면에 추가 시
- **사이즈**: 180x180px
- **특징**: 자동으로 둥근 모서리 적용

### 3. **Android (Chrome)**
```json
// site.webmanifest
{
  "icons": [
    { "src": "/android-chrome-192x192.svg", "sizes": "192x192" },
    { "src": "/android-chrome-512x512.svg", "sizes": "512x512" }
  ]
}
```

- **용도**: 홈 화면 추가, PWA
- **사이즈**: 192x192, 512x512
- **특징**: 배경색 및 테마 컬러 설정 포함

---

## 🔧 기술 스펙

### SVG 장점
✅ **확장성**: 어떤 크기에서도 선명
✅ **용량**: 작은 파일 크기 (< 1KB)
✅ **유지보수**: 코드로 관리 가능
✅ **브랜드 일관성**: 정확한 컬러 (#dc0000) 사용

### 브라우저 지원
- ✅ Chrome 99+
- ✅ Firefox 98+
- ✅ Safari 15+
- ✅ Edge 99+
- ⚠️ IE 11: PNG/ICO 변환 필요

---

## 🎯 사용 위치

### HTML Head
```html
<!-- index.html -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
<link rel="manifest" href="/site.webmanifest" />
```

### PWA Manifest
```json
// site.webmanifest
{
  "name": "KOLLAB KOREA",
  "short_name": "KOLLAB",
  "theme_color": "#000000",
  "background_color": "#000000"
}
```

---

## 🔄 파비콘 업데이트 방법

### 1. SVG 파일 수정
```bash
# SVG 에디터 또는 코드 에디터로 파일 수정
public/favicon.svg
```

### 2. 브라우저 캐시 클리어
```bash
# 하드 리프레시
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

### 3. 빌드 및 배포
```bash
npm run build
git add public/
git commit -m "update: favicon design"
git push origin main
```

---

## 📊 파일 사이즈

| 파일 | 사이즈 | 용도 |
|------|--------|------|
| `favicon.svg` | ~800B | 메인 파비콘 |
| `favicon-16x16.svg` | ~400B | 작은 브라우저 탭 |
| `favicon-32x32.svg` | ~500B | 일반 브라우저 탭 |
| `apple-touch-icon.svg` | ~1KB | iOS 홈 화면 |
| `android-chrome-192x192.svg` | ~1KB | Android 홈 |
| `android-chrome-512x512.svg` | ~1.5KB | Android PWA |
| `site.webmanifest` | ~300B | PWA 설정 |

**총 용량: ~5KB** (매우 경량!)

---

## 🎨 디자인 가이드라인

### 컬러 사용
```css
/* KOLLAB Brand Colors */
--kollab-red: #dc0000;    /* K 레터 */
--kollab-black: #000000;  /* 배경 */
```

### 금지 사항
❌ KOLLAB Red 이외의 컬러 사용
❌ 복잡한 그라데이션
❌ 가독성 떨어지는 디테일
❌ 브랜드 가이드라인 위배

### 권장 사항
✅ 심플하고 강렬한 디자인
✅ 작은 사이즈에서도 인식 가능
✅ 브랜드 아이덴티티 반영
✅ SVG 포맷 우선 사용

---

## 🧪 테스트 체크리스트

### 브라우저 테스트
- [ ] Chrome - 탭 아이콘
- [ ] Firefox - 탭 아이콘
- [ ] Safari - 탭 아이콘
- [ ] Edge - 탭 아이콘

### 모바일 테스트
- [ ] iOS Safari - 홈 화면 추가
- [ ] Android Chrome - 홈 화면 추가
- [ ] PWA 설치 - 앱 아이콘

### 다크/라이트 모드
- [ ] 다크 모드에서 가시성
- [ ] 라이트 모드에서 가시성

---

## 📝 변경 이력

### v1.0.0 (2025-01-17)
- ✅ SVG 파비콘 생성
- ✅ 멀티 플랫폼 지원 (Web, iOS, Android)
- ✅ PWA 매니페스트 추가
- ✅ SEO 메타 태그 통합
- ✅ KOLLAB Red (#dc0000) K 레터 디자인

---

## 🚀 추후 개선 사항

### 1. PNG 폴백 추가
```bash
# SVG를 PNG로 변환 (IE 11 지원)
# ImageMagick 사용 예시
convert favicon.svg -resize 32x32 favicon-32x32.png
```

### 2. ICO 파일 생성
```bash
# 레거시 브라우저 지원
# favicon.ico 생성
```

### 3. 애니메이션 파비콘
```javascript
// 이벤트 발생 시 파비콘 변경
// 예: 신규 입점 브랜드 알림
```

### 4. 다크모드 대응
```html
<!-- 다크모드별 파비콘 -->
<link rel="icon" href="/favicon-dark.svg" media="(prefers-color-scheme: dark)" />
<link rel="icon" href="/favicon-light.svg" media="(prefers-color-scheme: light)" />
```

---

## 🔗 참고 자료

- [Favicon Generator](https://realfavicongenerator.net/)
- [MDN - Link types: icon](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel#icon)
- [Web.dev - Add a web app manifest](https://web.dev/add-manifest/)
- [Apple - Configuring Web Applications](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)

---

<div align="center">
  <p><strong>© 2025 KOLLAB KOREA</strong></p>
  <p>Made with ❤️ in Seoul</p>
</div>

