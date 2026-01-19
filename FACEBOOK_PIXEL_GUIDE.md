# Facebook Pixel 통합 가이드

## 📊 개요

KOLLAB KOREA 브랜드페이지에 Facebook Pixel이 전문적으로 통합되었습니다.

**Pixel ID:** `1217892046393474`

---

## 🏗️ 구조

### 1. 서비스 파일
**위치:** `services/facebookPixel.ts`

- ✅ 타입 안전한 Facebook Pixel API
- ✅ 표준 이벤트 및 커스텀 이벤트 지원
- ✅ 개발/프로덕션 환경 분리
- ✅ KOLLAB KOREA 특화 이벤트 프리셋

### 2. React Hook
**위치:** `hooks/useFacebookPixel.ts`

- ✅ React 컴포넌트에서 쉽게 사용
- ✅ 자동 초기화
- ✅ 메모이제이션으로 성능 최적화

### 3. 앱 통합
**위치:** `App.tsx`

- ✅ 전역 초기화
- ✅ 자동 페이지뷰 트래킹

---

## 🚀 사용 방법

### 기본 사용법

```typescript
import { useFacebookPixel } from './hooks/useFacebookPixel';

function MyComponent() {
  const { track, events } = useFacebookPixel();

  // 표준 이벤트
  track('ViewContent', {
    content_name: 'Product Page',
    content_category: 'Brands',
  });

  // KOLLAB 특화 이벤트
  events.brandApplicationStart();
  events.brandApplicationComplete('브랜드명');
  events.contactClick();
}
```

### 페이지뷰 자동 트래킹

```typescript
import { usePageView } from './hooks/useFacebookPixel';

function MyPage() {
  usePageView('BrandsPage');
  
  return <div>...</div>;
}
```

---

## 📋 지원 이벤트

### Facebook 표준 이벤트
- `PageView` - 페이지 조회
- `ViewContent` - 콘텐츠 조회
- `Lead` - 리드 생성
- `CompleteRegistration` - 등록 완료
- `Contact` - 문의하기
- 그 외 모든 Facebook 표준 이벤트

### KOLLAB KOREA 특화 이벤트

#### 1. 브랜드 입점 신청 시작
```typescript
events.brandApplicationStart();
```

#### 2. 브랜드 입점 신청 완료
```typescript
events.brandApplicationComplete('브랜드명');
```

#### 3. 문의하기 클릭
```typescript
events.contactClick();
```

#### 4. 페이지 조회
```typescript
events.viewPage('home'); // 자동 실행됨
```

#### 5. 외부 링크 클릭
```typescript
events.externalLinkClick('https://example.com', '링크 이름');
```

---

## 🔧 설정

### 환경 변수
프로덕션 환경에서만 실제 데이터 전송됩니다.

- **개발 모드:** 콘솔 로그로 이벤트 확인
- **프로덕션 모드:** Facebook으로 데이터 전송

### Pixel ID 변경
`services/facebookPixel.ts` 파일의 `FACEBOOK_PIXEL_ID` 상수를 수정하세요.

```typescript
const FACEBOOK_PIXEL_ID = '1217892046393474';
```

---

## 📊 추적 가능한 데이터

### 자동 추적
- ✅ 페이지뷰 (모든 페이지 전환 시)
- ✅ 페이지별 콘텐츠 조회

### 수동 추적 (구현 필요)
아래 컴포넌트에서 이벤트를 추가하세요:

#### Contact 페이지
```typescript
// pages/Contact.tsx
const handleSubmit = () => {
  events.brandApplicationComplete(formData.brandName);
  // ... 기존 로직
};

const handleContactClick = () => {
  events.contactClick();
  // ... 기존 로직
};
```

#### Brands 페이지
```typescript
// pages/Brands.tsx
const handleApplyClick = () => {
  events.brandApplicationStart();
  // ... 기존 로직
};
```

---

## 🧪 테스트

### 개발 환경에서 테스트
1. 로컬 서버 실행: `npm run dev`
2. 브라우저 콘솔 확인
3. 페이지 이동 시 로그 확인:
   ```
   ✅ Facebook Pixel initialized: 1217892046393474
   📊 Facebook Pixel Event: PageView
   📊 Facebook Pixel Event: ViewContent { content_name: "home" }
   ```

### Facebook Events Manager에서 확인
1. [Facebook Events Manager](https://business.facebook.com/events_manager2) 접속
2. Pixel ID `1217892046393474` 선택
3. 실시간 이벤트 확인 (Test Events 탭)

---

## 🎯 최적화 팁

### 1. 중요 전환 이벤트 설정
Facebook Ads Manager에서 다음 이벤트를 전환 이벤트로 설정하세요:
- `CompleteRegistration` (브랜드 입점 신청 완료)
- `Lead` (신청 시작)
- `Contact` (문의하기)

### 2. 값(Value) 설정
고객 생애 가치(LTV) 추정을 위해 가치를 설정할 수 있습니다:
```typescript
events.brandApplicationComplete('브랜드명', {
  value: 1000,  // 예상 가치 (USD)
  currency: 'USD'
});
```

### 3. 캠페인 파라미터
UTM 파라미터로 캠페인 효과를 측정하세요:
```
https://www.kollabkorea.com/?utm_source=facebook&utm_medium=ad&utm_campaign=brand_recruitment
```

---

## 🔒 개인정보 보호

### 자동 수집 정보
- 페이지 URL
- 브라우저 정보
- 디바이스 정보
- IP 주소 (Facebook에서 자동 해싱)

### 수동 전송 금지 정보
❌ **절대 전송하지 마세요:**
- 이메일 주소
- 전화번호
- 실제 이름
- 주소
- 기타 개인 식별 정보

개인정보를 전송해야 할 경우 반드시 SHA-256 해싱 후 전송하세요.

---

## 📞 문제 해결

### Pixel이 초기화되지 않음
- 브라우저 콘솔에서 에러 확인
- Ad Blocker 비활성화 확인
- 네트워크 탭에서 `fbevents.js` 로드 확인

### 이벤트가 전송되지 않음
- 개발 모드에서는 콘솔 로그만 출력됨
- 프로덕션 빌드 후 테스트 필요
- Facebook Pixel Helper 확장 프로그램 사용 권장

### TypeScript 에러
```bash
npm run build
```
타입 에러 확인 후 수정하세요.

---

## 📚 참고 자료

- [Facebook Pixel 공식 문서](https://developers.facebook.com/docs/facebook-pixel)
- [표준 이벤트 목록](https://developers.facebook.com/docs/facebook-pixel/reference)
- [Facebook Business Help Center](https://www.facebook.com/business/help/952192354843755)

---

## ✅ 체크리스트

배포 전 확인사항:

- [x] Pixel 서비스 파일 생성
- [x] React Hook 생성
- [x] App.tsx 통합
- [x] 자동 페이지뷰 트래킹
- [ ] Contact 폼 이벤트 연결
- [ ] Brands 신청 버튼 이벤트 연결
- [ ] Facebook Events Manager 테스트
- [ ] 프로덕션 배포 후 실제 데이터 확인

---

**업데이트:** 2026-01-19
**작성자:** KOLLAB KOREA Dev Team
**Pixel ID:** 1217892046393474
