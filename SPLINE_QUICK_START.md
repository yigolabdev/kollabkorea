# 🎨 Spline 통합 빠른 시작 가이드

## 📊 현재 프로젝트 정보

```json
{
  "framework": "React 19.2.0 + TypeScript 5.8.2",
  "buildTool": "Vite 6.2.0",
  "animation": "Framer Motion 12.23.24",
  "type": "SPA (Single Page Application)",
  "port": "3000 (local), 3001 (dev)"
}
```

---

## ⚡ 빠른 설치 (2분)

### 1️⃣ Spline 라이브러리 설치

```bash
npm install @splinetool/react-spline
```

### 2️⃣ 기본 사용 예시

```tsx
import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <div className="relative h-screen">
      <Spline 
        scene="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode"
        className="absolute inset-0"
      />
      <h1 className="relative z-10">KOLLAB KOREA</h1>
    </div>
  );
}
```

---

## 🎯 히어로 섹션 통합 (Home.tsx)

```tsx
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  return (
    <section className="relative min-h-[88vh] flex items-center">
      {/* Spline 3D Background */}
      <div className="absolute inset-0 -z-10">
        <Spline scene="YOUR_SPLINE_URL" />
      </div>

      {/* Text Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 text-center"
      >
        <h1 className="text-kollab-red">KOLLAB KOREA</h1>
      </motion.div>
    </section>
  );
};
```

---

## 📋 Spline Scene URL 얻기

```
1. Spline 웹사이트에서 디자인 완료
2. 우측 상단 "Export" → "Code Export"
3. "Copy Code" 클릭
4. URL 복사:
   https://prod.spline.design/ABC123XYZ/scene.splinecode
```

---

## 🎨 KOLLAB 브랜드 컬러

Spline에서 사용할 컬러:

```
KOLLAB Red: #dc0000
KOLLAB Beige: #e4e0db
KOLLAB Silver: #c0c0c0
KOLLAB Black: #000000
```

---

## ⚡ 성능 최적화

### 모바일 제외

```tsx
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  setIsMobile(window.innerWidth < 768);
}, []);

return (
  <>
    {!isMobile && <Spline scene="YOUR_URL" />}
  </>
);
```

### 로딩 상태

```tsx
const [loading, setLoading] = useState(true);

<Spline 
  scene="YOUR_URL"
  onLoad={() => setLoading(false)}
/>
```

---

## 📚 상세 가이드

전체 문서: `SPLINE_INTEGRATION_GUIDE.md`

- 설치 방법
- 사용 예시
- 이벤트 핸들링
- 성능 최적화
- 문제 해결

---

## 🚀 배포 프로세스

```bash
# 1. Spline 라이브러리 설치
npm install @splinetool/react-spline

# 2. 코드 작성 (Home.tsx 수정)

# 3. 로컬 테스트
npm run dev

# 4. Git 커밋 & 푸시
git add .
git commit -m "feat: Spline 3D 히어로 배경 추가"
git push origin main

# 5. 자동 배포 (S3)
# GitHub Actions가 자동으로 배포
```

---

## 🎉 시작하기

**지금 바로:**
1. `npm install @splinetool/react-spline` 실행
2. Spline에서 씬 디자인
3. `Home.tsx` 파일 수정
4. `git push` → 자동 배포!

**상세 가이드:** `SPLINE_INTEGRATION_GUIDE.md` 참조

