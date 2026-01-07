# KOLLAB KOREA 브랜드 입점 신청 랜딩페이지

<div align="center">

![KOLLAB KOREA](https://img.shields.io/badge/KOLLAB-KOREA-dc0000?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=for-the-badge&logo=vite)

**Seoul × LA 콘셉트의 K-브랜드 글로벌 진출 플랫폼**

[🌐 Live Demo](http://kollabkorea.s3-website-ap-northeast-2.amazonaws.com) | [📖 Documentation](./docs) | [🚀 Deployment Guide](./DEPLOY_README.md)

</div>

---

## 📋 목차

- [프로젝트 소개](#-프로젝트-소개)
- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [로컬 개발](#-로컬-개발)
- [배포](#-배포)
- [프로젝트 구조](#-프로젝트-구조)
- [디자인 시스템](#-디자인-시스템)
- [기여하기](#-기여하기)

---

## 🎯 프로젝트 소개

**KOLLAB KOREA**는 한국의 우수한 브랜드를 미국 LA 시장에 진출시키기 위한 브랜드 입점 신청 랜딩페이지입니다.

### 핵심 가치
- 🌏 **Seoul × LA** - 한미 브랜드 교류의 허브
- 🎨 **K-브랜드 글로벌화** - 한국 브랜드의 해외 진출 지원
- 🚀 **원스톱 솔루션** - 브랜드 액티베이션부터 미국 수출까지

---

## ✨ 주요 기능

### 1. 인터랙티브 로드맵 시각화
- 5단계 브랜드 여정을 아크형 디자인으로 표현
- 애니메이션 곡선 경로 및 이동 점
- 아이콘 기준 완벽한 대칭 정렬

### 2. 반응형 디자인
- 모바일: 수직 타임라인
- 데스크톱: 아크형 인터랙티브 로드맵
- 완벽한 크로스 브라우저 지원

### 3. 다국어 지원
- 한국어 / English 전환
- 컨텍스트 기반 언어 관리

### 4. AI 챗봇 통합
- Gemini API 기반 브랜드 상담
- 실시간 Q&A 지원

### 5. 브랜드 신청 시스템
- 직관적인 입점 신청 폼
- 실시간 유효성 검증

---

## 🛠️ 기술 스택

### Frontend
- **React 19.2.0** - UI 라이브러리
- **TypeScript 5.8.2** - 타입 안전성
- **Vite 6.2.0** - 빌드 도구
- **Tailwind CSS** - 스타일링
- **Framer Motion 12.23.24** - 애니메이션

### Tools & Libraries
- **Lucide React 0.553.0** - 아이콘
- **Google Gemini API 1.29.0** - AI 챗봇

### Deployment
- **AWS S3** - 정적 호스팅
- **GitHub Actions** - CI/CD
- **CloudFront** (선택) - CDN

---

## 💻 로컬 개발

### 사전 요구사항
- Node.js 18 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/yigolabdev/kollabkorea.git
cd kollabkorea

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 브라우저에서 확인
# http://localhost:3001
```

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

---

## 🚀 배포

### GitHub → S3 자동 배포

**저장소**: `yigolabdev/kollabkorea`  
**S3 버킷**: `kollabkorea`

#### 빠른 배포 (5분)

1. **AWS S3 버킷 설정**
   ```
   버킷 이름: kollabkorea
   리전: ap-northeast-2
   정적 웹사이트 호스팅 활성화
   ```

2. **IAM 사용자 생성**
   ```
   권한: AmazonS3FullAccess
   액세스 키 생성 및 저장
   ```

3. **GitHub Secrets 설정**
   ```
   Settings → Secrets → Actions
   
   필수 Secrets:
   - AWS_ACCESS_KEY_ID
   - AWS_SECRET_ACCESS_KEY
   - AWS_REGION (ap-northeast-2)
   - S3_BUCKET_NAME (kollabkorea)
   ```

4. **배포 실행**
   ```bash
   git push origin main
   # GitHub Actions가 자동으로 배포!
   ```

#### 상세 가이드
- 📘 [전체 배포 가이드](./DEPLOY_README.md)
- 🔑 [GitHub Secrets 설정](./GITHUB_SECRETS_GUIDE.md)
- ✅ [배포 체크리스트](./DEPLOYMENT_CHECKLIST.md)
- 📚 [S3 상세 가이드](./S3_DEPLOYMENT_GUIDE.md)

#### 배포 URL
```
S3: http://kollabkorea.s3-website-ap-northeast-2.amazonaws.com
CloudFront: https://kollab.kr (커스텀 도메인)
```

---

## 📁 프로젝트 구조

```
kollab-brandpage/
├── .github/
│   └── workflows/
│       ├── deploy.yml          # S3 자동 배포
│       └── preview.yml         # PR 빌드 테스트
├── public/
│   └── assets/                 # 정적 파일
│       ├── images/
│       ├── photos/
│       └── brands/
├── src/
│   ├── components/             # React 컴포넌트
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── StageCard.tsx      # 로드맵 카드
│   │   ├── CurvedPath.tsx     # SVG 곡선 경로
│   │   └── Background.tsx
│   ├── pages/                  # 페이지 컴포넌트
│   │   ├── Home.tsx
│   │   ├── Platform.tsx       # 로드맵 페이지
│   │   ├── About.tsx
│   │   ├── Brands.tsx
│   │   ├── Contact.tsx
│   │   └── FAQ.tsx
│   ├── content/                # 다국어 컨텐츠
│   │   ├── home.ko.ts
│   │   ├── home.en.ts
│   │   └── ...
│   ├── services/               # API 서비스
│   │   └── geminiService.ts   # AI 챗봇
│   ├── types.ts                # TypeScript 타입
│   ├── constants.ts            # 상수 정의
│   ├── LanguageContext.tsx    # 언어 관리
│   ├── App.tsx                 # 메인 앱
│   └── index.tsx               # 엔트리 포인트
├── docs/                       # 프로젝트 문서
├── DEPLOY_README.md            # 배포 가이드
├── GITHUB_SECRETS_GUIDE.md     # Secrets 설정
├── S3_DEPLOYMENT_GUIDE.md      # S3 상세 가이드
└── README.md                   # 이 파일
```

---

## 🎨 디자인 시스템

### KOLLAB 브랜드 컬러

| 컬러 | HEX | 용도 |
|------|-----|------|
| **KOLLAB Red** | `#dc0000` | CTA, 강조, Hover |
| **KOLLAB Beige** | `#e4e0db` | 배경, 부드러운 영역 |
| **KOLLAB Silver** | `#c0c0c0` | 보조, 구분선 |
| **KOLLAB Black** | `#000000` | 텍스트, 아이콘 |
| **KOLLAB Dark** | `#111111` | 진한 배경 |

### 타이포그래피
- **Primary Font**: Inter
- **Weights**: 300 (Light), 600 (Semi-Bold), 900 (Black)
- **제목**: Inter Black (900) + uppercase + tracking-tighter
- **본문**: Inter Semi-Bold (600) + leading-relaxed
- **CTA**: Inter Black (900) + uppercase + tracking-widest

### 스페이싱
- **기본 단위**: 4px
- **Section padding**: py-20 md:py-32 lg:py-40
- **Container**: container mx-auto px-6

### 애니메이션
- **FAST**: 300ms (버튼, 호버)
- **MEDIUM**: 500ms (카드, 전환)
- **SLOW**: 700ms (이미지)
- **Easing**: ease-out

---

## 🏗️ 주요 컴포넌트

### StageCard
5단계 브랜드 여정 카드 컴포넌트
- 아이콘 중심 정렬
- Hover 인터랙션
- 반응형 레이아웃

### CurvedPath
SVG 기반 곡선 경로 애니메이션
- 완벽한 대칭 아크
- 이동 점 애니메이션
- KOLLAB Red 브랜드 컬러

### Background
그라데이션 배경 컴포넌트
- Mesh 그라데이션
- Noise 텍스처
- 부드러운 애니메이션

---

## 📊 브랜드 여정 (5단계)

1. **브랜드 액티베이션** - ZONE 별 오프라인 체험
2. **콘텐츠 제작** - 릴스 중심 숏폼 콘텐츠
3. **인플루언서 마케팅** - 브랜드 협업 및 UGC
4. **PR** - 오프라인 PR 자산 확보
5. **미국 수출 연결** - LA 리테일 샵 입점

---

## 🤝 기여하기

### 개발 워크플로우

```bash
# 1. Fork 및 Clone
git clone https://github.com/yigolabdev/kollabkorea.git

# 2. 브랜치 생성
git checkout -b feature/amazing-feature

# 3. 변경사항 커밋
git commit -m "feat: Add amazing feature"

# 4. Push
git push origin feature/amazing-feature

# 5. Pull Request 생성
```

### 커밋 메시지 컨벤션
- `feat`: 새로운 기능
- `fix`: 버그 수정
- `style`: 스타일링 변경
- `design`: 디자인 시스템 변경
- `refactor`: 리팩토링
- `docs`: 문서 수정
- `chore`: 빌드/설정 변경

---

## 📄 라이선스

Apache-2.0 License

---

## 📞 문의

**KOLLAB KOREA**  
- GitHub: [@yigolabdev](https://github.com/yigolabdev)
- Website: [kollabkorea.s3-website-ap-northeast-2.amazonaws.com](http://kollabkorea.s3-website-ap-northeast-2.amazonaws.com)

---

<div align="center">

**Made with ❤️ by KOLLAB KOREA Team**

[⬆ Back to top](#kollab-korea-브랜드-입점-신청-랜딩페이지)

</div>
