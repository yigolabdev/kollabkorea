# 검색 엔진 등록 가이드

## 📋 사전 준비 완료 항목
✅ `robots.txt` 생성 완료 (https://www.kollabkorea.com/robots.txt)
✅ `sitemap.xml` 생성 완료 (https://www.kollabkorea.com/sitemap.xml)
✅ SEO 메타 태그 추가 완료
✅ 사이트 배포 완료 (https://www.kollabkorea.com)

---

## 🔍 구글 Search Console 등록

### 1단계: Google Search Console 접속
1. https://search.google.com/search-console 접속
2. 구글 계정으로 로그인

### 2단계: 속성 추가
1. 왼쪽 상단 속성 선택 드롭다운 클릭
2. **"속성 추가"** 버튼 클릭
3. **"URL 접두어"** 방식 선택
4. `https://www.kollabkorea.com` 입력 후 **계속** 클릭

### 3단계: 소유권 확인 (HTML 태그 방식)
1. 확인 방법 중 **"HTML 태그"** 선택
2. 제공되는 메타 태그 복사 (예시: `<meta name="google-site-verification" content="ABC123..."/>`)
3. 이 메타 태그를 개발팀에 전달하여 `index.html`의 `<head>` 섹션에 추가 요청
   - 현재 위치: `YOUR_GOOGLE_VERIFICATION_CODE` 부분을 실제 코드로 교체
4. 코드 추가 후 사이트 재배포 (GitHub 푸시)
5. 배포 완료 후 Google Search Console에서 **"확인"** 버튼 클릭

### 4단계: Sitemap 제출
1. 왼쪽 메뉴에서 **"Sitemaps"** 클릭
2. 새 사이트맵 추가란에 `sitemap.xml` 입력
3. **"제출"** 클릭
4. 상태가 "성공"으로 표시되면 완료

### 5단계: URL 검사 (선택사항)
1. 상단 검색창에 `https://www.kollabkorea.com` 입력
2. **"색인 생성 요청"** 클릭
3. 구글이 즉시 크롤링 시작

**예상 소요 시간:** 
- 소유권 확인: 즉시
- 검색 결과 노출: 1-7일

---

## 🔍 네이버 Search Advisor 등록

### 1단계: 네이버 서치어드바이저 접속
1. https://searchadvisor.naver.com 접속
2. 네이버 계정으로 로그인

### 2단계: 사이트 등록
1. **"웹마스터 도구"** 클릭
2. 오른쪽 상단 **"사이트 추가"** 버튼 클릭
3. `https://www.kollabkorea.com` 입력
4. **"확인"** 클릭

### 3단계: 사이트 소유 확인 (HTML 태그 방식)
1. 확인 방법 중 **"HTML 태그"** 선택
2. 제공되는 메타 태그 복사 (예시: `<meta name="naver-site-verification" content="XYZ789..."/>`)
3. 이 메타 태그를 개발팀에 전달하여 `index.html`의 `<head>` 섹션에 추가 요청
   - 현재 위치: `YOUR_NAVER_VERIFICATION_CODE` 부분을 실제 코드로 교체
4. 코드 추가 후 사이트 재배포 (GitHub 푸시)
5. 배포 완료 후 네이버 서치어드바이저에서 **"소유확인"** 버튼 클릭

### 4단계: 사이트맵 제출
1. 왼쪽 메뉴에서 **"요청" > "사이트맵 제출"** 클릭
2. `https://www.kollabkorea.com/sitemap.xml` 입력
3. **"확인"** 버튼 클릭

### 5단계: RSS 제출 (선택사항 - 블로그가 있는 경우)
- 현재 KOLLAB KOREA는 정적 사이트이므로 생략

### 6단계: 수집 요청 (선택사항)
1. 왼쪽 메뉴에서 **"요청" > "수집 요청"** 클릭
2. 주요 페이지 URL 입력:
   - https://www.kollabkorea.com/
   - https://www.kollabkorea.com/about
   - https://www.kollabkorea.com/platform
   - https://www.kollabkorea.com/brands
   - https://www.kollabkorea.com/contact
3. 각 URL에 대해 **"확인"** 클릭

**예상 소요 시간:**
- 소유권 확인: 즉시
- 검색 결과 노출: 3-14일

---

## ✅ 등록 완료 후 확인 사항

### 구글
- [ ] 소유권 확인 완료
- [ ] Sitemap 제출 완료
- [ ] 색인 생성 요청 완료
- [ ] 1주일 후 "site:kollabkorea.com" 검색하여 노출 확인

### 네이버
- [ ] 소유권 확인 완료
- [ ] Sitemap 제출 완료
- [ ] 수집 요청 완료
- [ ] 2주일 후 "site:kollabkorea.com" 검색하여 노출 확인

---

## 📊 등록 후 모니터링

### Google Search Console
- **실적 보고서**: 검색어, 클릭수, 노출수 확인
- **커버리지**: 색인 생성된 페이지 수 확인
- **개선사항**: 모바일 최적화, 페이지 속도 등

### 네이버 Search Advisor
- **검색 반영 현황**: 수집된 페이지 수 확인
- **사이트 최적화**: 페이지 품질 점검
- **통계**: 검색 유입 통계 확인

---

## 🚨 주의사항

1. **verification code는 절대 삭제하지 마세요**
   - 한 번 등록 후에도 계속 확인용으로 사용됩니다

2. **robots.txt와 sitemap.xml 유지**
   - 이 파일들은 검색 엔진이 지속적으로 확인합니다

3. **HTTPS 사용 필수**
   - 현재 사이트는 HTTPS 적용되어 있으므로 문제없음

4. **정기적인 업데이트**
   - 새로운 페이지 추가 시 sitemap.xml 업데이트
   - `<lastmod>` 날짜를 최신으로 변경

---

## 📞 문제 발생 시

- **구글 헬프센터**: https://support.google.com/webmasters
- **네이버 고객센터**: https://help.naver.com/
- **개발팀 문의**: info@kollabkorea.com

---

**작성일**: 2026-01-13  
**최종 수정일**: 2026-01-13  
**작성자**: KOLLAB KOREA 개발팀
