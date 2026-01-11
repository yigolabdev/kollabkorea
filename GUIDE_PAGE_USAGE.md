# 📋 SEO 가이드 페이지 사용 안내

## 🔗 접속 방법

```
https://kollabkorea.com/guide
```

또는 로컬 개발 환경:
```
http://localhost:3000/guide
```

---

## 📌 페이지 특징

### ✅ 검색 엔진에서 제외됨
- `robots.txt`에 `/guide` 제외 설정 완료
- Google, Naver 모두 크롤링 차단
- 직접 링크로만 접근 가능

### ✅ 헤더/푸터 없음
- 순수 가이드 페이지로만 구성
- 언어 토글 버튼 숨김
- 풀스크린 콘텐츠

### ✅ 인터랙티브 기능
1. **진행률 추적**: 실시간 진행률 표시
2. **체크리스트**: 각 단계별 완료 체크
3. **복사 버튼**: URL 원클릭 복사
4. **외부 링크**: 각 서비스로 바로 이동

---

## 🎯 사용 방법

### 1. Google Search Console 등록

#### Step 1: 접속
- "접속하기" 버튼 클릭 → Google Search Console 열림
- Google 계정 로그인

#### Step 2: 속성 추가
1. 좌측 상단 "속성 선택" → "속성 추가"
2. "URL 접두어" 선택
3. 복사 버튼으로 `https://kollabkorea.com` 복사
4. 붙여넣고 "계속"

#### Step 3: 소유권 확인
1. "HTML 태그" 선택
2. `content="..."` 부분만 복사
3. **와이고 개발팀에 전달**:
   ```
   📧 Google verification 코드: abc123XYZ456...
   📧 작업 요청: index.html의 google-site-verification 메타 태그에 코드 입력
   📧 배포 완료 후 알림 요청
   ```
4. 개발팀 작업 완료 및 배포 대기 (2-3분)
5. 배포 완료 알림 받은 후 "확인" 클릭

#### Step 4: Sitemap 제출
1. 좌측 "Sitemaps" 메뉴
2. `sitemap.xml` 입력
3. "제출"

#### Step 5: 체크리스트 완료
- 각 단계마다 체크박스 클릭하여 진행 상황 추적

---

### 2. Naver Search Advisor 등록

#### Step 1: 접속
- "접속하기" 버튼 클릭 → Naver Search Advisor 열림
- 네이버 계정 로그인

#### Step 2: 사이트 등록
1. "웹마스터 도구" 클릭
2. "사이트 관리" → "사이트 등록"
3. 복사 버튼으로 `https://kollabkorea.com` 복사
4. 붙여넣고 "추가"

#### Step 3: 소유 확인
1. "HTML 태그" 선택
2. `content="..."` 부분만 복사
3. **와이고 개발팀에 전달**:
   ```
   📧 Naver verification 코드: xyz789ABC123...
   📧 작업 요청: index.html의 naver-site-verification 메타 태그에 코드 입력
   📧 배포 완료 후 알림 요청
   ```
4. 개발팀 작업 완료 및 배포 대기 (2-3분)
5. 배포 완료 알림 받은 후 "소유확인" 클릭

#### Step 4: Sitemap 제출
1. "요청" → "사이트맵 제출"
2. `https://kollabkorea.com/sitemap.xml` 입력
3. "확인"

#### Step 5: 체크리스트 완료
- 각 단계마다 체크박스 클릭하여 진행 상황 추적

---

## ⏰ 예상 소요 시간

### Google Search Console
- 등록 작업: **10-15분**
- 첫 색인: **1-2주**
- 검색 노출: **2-4주**

### Naver Search Advisor
- 등록 작업: **10-15분**
- 첫 색인: **3-7일**
- 검색 노출: **1-2주**

---

## 🚨 등록 완료 후 필수 작업

### ✅ 페이지 삭제 절차

등록이 모두 완료되면 가이드 페이지를 삭제해야 합니다 (개발팀 작업):

```bash
# 1. Guide.tsx 파일 삭제
rm pages/Guide.tsx

# 2. App.tsx 수정
# - import Guide from './pages/Guide'; 삭제
# - case 'guide': return <Guide />; 삭제
# - const isGuidePage = currentPage === 'guide'; 관련 코드 제거

# 3. types.ts 수정
# - export type PageId = '...' | 'guide'; 에서 'guide' 제거

# 4. robots.txt 수정
# - Disallow: /guide 라인 제거 (3곳)

# 5. 커밋 및 푸시
git add -A
git commit -m "chore: SEO 등록 완료 - 가이드 페이지 제거"
git push origin main
```

---

## 📧 개발팀 전달 템플릿

### Google Search Console
```
제목: [KOLLAB KOREA] Google Search Console 소유권 확인 요청

내용:
안녕하세요,

Google Search Console 등록을 위한 소유권 확인 코드를 전달드립니다.

📌 Google verification 코드: [여기에_복사한_코드_붙여넣기]

📌 작업 요청:
index.html 파일의 <head> 태그 내에 아래 메타 태그를 추가해주세요.

<meta name="google-site-verification" content="[여기에_복사한_코드_붙여넣기]" />

📌 배포 완료 후 알림 부탁드립니다.

감사합니다.
```

### Naver Search Advisor
```
제목: [KOLLAB KOREA] Naver Search Advisor 소유 확인 요청

내용:
안녕하세요,

Naver Search Advisor 등록을 위한 소유 확인 코드를 전달드립니다.

📌 Naver verification 코드: [여기에_복사한_코드_붙여넣기]

📌 작업 요청:
index.html 파일의 <head> 태그 내에 아래 메타 태그를 추가해주세요.

<meta name="naver-site-verification" content="[여기에_복사한_코드_붙여넣기]" />

📌 배포 완료 후 알림 부탁드립니다.

감사합니다.
```

---

## 📞 문제 발생 시

### 소유권 확인 실패
```
원인: verification 코드가 잘못 입력되었거나 배포가 안됨
해결: 
1. 개발팀에 전달한 코드 재확인
2. GitHub Actions에서 배포 상태 확인
3. 브라우저에서 페이지 소스 보기로 meta 태그 확인
4. 개발팀에 재배포 요청
```

### Sitemap 제출 실패
```
원인: URL이 잘못되었거나 sitemap.xml 접근 불가
해결:
1. https://kollabkorea.com/sitemap.xml 직접 접속 테스트
2. robots.txt에서 Sitemap 경로 확인
3. 404 에러 시 배포 재확인
```

### 색인이 안됨
```
원인: 시간이 더 필요하거나 robots.txt 설정 문제
해결:
1. Google: 1-2주 대기
2. Naver: 3-7일 대기
3. robots.txt에서 Allow: / 확인
4. URL 검사로 수동 색인 요청
```

---

## 📊 확인 방법

### Google 검색 확인
```
site:kollabkorea.com
```

### Naver 검색 확인
```
site:kollabkorea.com
```

또는
```
KOLLAB KOREA
콜랩코리아
```

---

## 📝 체크리스트 (완료 여부)

### Google Search Console
- [ ] 소유권 확인 코드 복사 완료
- [ ] 와이고 개발팀에 코드 전달
- [ ] 개발팀 배포 완료 알림 확인
- [ ] 소유권 확인 완료
- [ ] Sitemap 제출 완료
- [ ] 색인 상태 확인 (1-2주 후)

### Naver Search Advisor
- [ ] 소유 확인 코드 복사 완료
- [ ] 와이고 개발팀에 코드 전달
- [ ] 개발팀 배포 완료 알림 확인
- [ ] 소유 확인 완료
- [ ] Sitemap 제출 완료
- [ ] 색인 상태 확인 (3-7일 후)

### 정리 작업 (개발팀)
- [ ] 가이드 페이지 삭제
- [ ] App.tsx 라우팅 제거
- [ ] types.ts 타입 제거
- [ ] robots.txt 업데이트
- [ ] GitHub 푸시 완료

---

**작성일**: 2026-01-12  
**버전**: 1.0.0  
**담당**: KOLLAB KOREA Development Team
