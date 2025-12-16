# 🎨 KOLLAB 로고 설정 가이드

## 📁 로고 파일 저장하기

첨부하신 로고 이미지들을 다음 경로에 저장해주세요:

```
public/assets/logos/
```

## 📝 파일 명명 규칙

첨부된 로고 이미지를 아래 이름으로 저장해주세요:

### 한 줄 로고 (KOLLAB)

1. **kollab-black.svg** 또는 **kollab-black.png**
   - 첨부 이미지 1번: 흰 배경에 검은색 "KOLLAB"
   - 사용처: About, Benefits 섹션 (밝은 배경)

2. **kollab-white.svg** 또는 **kollab-white.png**
   - 첨부 이미지 4번: 검은 배경에 흰색 "KOLLAB"
   - 사용처: Navbar, Footer, Hero (어두운 배경)

3. **kollab-red.svg** 또는 **kollab-red.png**
   - 첨부 이미지 7번: 흰 배경에 빨간색 "KOLLAB"
   - 사용처: 특별한 강조가 필요한 곳

### 두 줄 로고 (KOL LAB)

4. **kollab-stacked-black.svg** 또는 **kollab-stacked-black.png**
   - 첨부 이미지 2번: 흰 배경에 검은색 "KOL LAB"
   - 사용처: 밝은 배경 위 대형 로고

5. **kollab-stacked-white.svg** 또는 **kollab-stacked-white.png**
   - 첨부 이미지 3번 (반전) 또는 6번: "KOL LAB" 흰색
   - 사용처: Hero 섹션, 어두운 배경 위 대형 로고

6. **kollab-stacked-red.svg** 또는 **kollab-stacked-red.png**
   - 첨부 이미지 3번 또는 5번: 빨간색 "KOL LAB"
   - 사용처: CTA 섹션, 특별 강조

## 🚀 빠른 설정 방법

### macOS/Linux
```bash
# 1. public/assets/logos 폴더로 이동
cd "/Users/hyojoonchoi/Hyojoon Drive/Cursor-Project/kollab-korea/public/assets/logos"

# 2. 로고 파일들을 이 폴더로 복사/이동
# Finder에서 드래그 앤 드롭하거나
# 다운로드 폴더에서 복사

# 3. 파일 이름 확인
ls -la
```

### 권장 파일 형식

- **SVG (권장)**: 벡터 파일, 모든 크기에서 선명
- **PNG**: 투명 배경, 고해상도 (최소 2000px)

## 💻 코드에서 사용하기

### React 컴포넌트 (Logo.tsx)

```tsx
import { Logo } from './components/Logo';

// Navbar
<Logo variant="primary" color="white" className="h-8" />

// Hero
<Logo variant="stacked" color="white" className="h-32 md:h-48" />

// About
<Logo variant="primary" color="black" className="h-10" />
```

### 직접 img 태그 사용

```tsx
// Navbar
<img 
  src="/assets/logos/kollab-white.svg" 
  alt="KOLLAB" 
  className="h-8"
/>

// Hero (대형)
<img 
  src="/assets/logos/kollab-stacked-white.svg" 
  alt="KOLLAB" 
  className="h-32 md:h-48"
/>
```

## 📋 로고 파일 체크리스트

저장 후 다음을 확인하세요:

- [ ] 6개 로고 파일 모두 저장됨
- [ ] 파일 이름이 정확함 (kollab-black, kollab-white 등)
- [ ] 파일 경로가 `public/assets/logos/`
- [ ] 투명 배경 (PNG) 또는 벡터 (SVG)
- [ ] 충분한 해상도 (PNG인 경우 2000px 이상)

## 🔄 Git에 커밋하기

```bash
# 로고 파일 추가
git add public/assets/logos/

# 커밋
git commit -m "assets: KOLLAB 로고 파일 추가

- 한 줄 로고 (primary): black, white, red
- 두 줄 로고 (stacked): black, white, red
- SVG/PNG 포맷
- 디자인 시스템 준수"

# 푸시
git push origin main
```

## 🎯 다음 단계

로고 파일 저장 후:

1. ✅ Navbar에 로고 적용
2. ✅ Footer에 로고 적용
3. ✅ Hero 섹션에 대형 로고 적용
4. ✅ Favicon 설정
5. ✅ OG 이미지 설정

## 📞 문의

로고 관련 문의:
- **Email**: info@kollabkorea.com
- **GitHub Issues**: https://github.com/yigolabdev/kollabkorea/issues

---

<div align="center">
  <strong>KOLLAB 로고를 올바르게 사용해주세요! 🎨</strong>
</div>

