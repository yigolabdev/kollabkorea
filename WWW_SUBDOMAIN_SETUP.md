# 🌐 www 서브도메인 설정 가이드

## 📋 문제 상황
- ✅ `kollabkorea.com` 정상 작동
- ❌ `www.kollabkorea.com` → 404 에러

---

## 🔍 원인 분석

### 현재 구조
```
kollabkorea.com
├── S3 버킷: kollabkorea.com
├── S3 Website Endpoint: kollabkorea.com.s3-website.ap-northeast-2.amazonaws.com
└── DNS: Cloudflare

Cloudflare DNS 레코드:
✅ @ (루트) → kollabkorea.com.s3-website.ap-northeast-2.amazonaws.com
❌ www → (설정 안됨)
```

### 문제
**www 서브도메인에 대한 DNS 레코드가 없음**

---

## ✅ 해결 방법

### 방법 1: Cloudflare CNAME 레코드 추가 (권장)

#### 단계별 설정

**1. Cloudflare 대시보드 접속**
```
https://dash.cloudflare.com
→ 로그인
→ kollabkorea.com 도메인 선택
```

**2. DNS 설정**
```
좌측 메뉴 → DNS → Records
```

**3. www CNAME 레코드 추가**
```
┌─────────────────────────────────────────────────┐
│ Add record                                      │
├─────────────────────────────────────────────────┤
│ Type: CNAME                                     │
│ Name: www                                       │
│ Target: kollabkorea.com.s3-website.ap-northe... │
│ Proxy status: ☁️ Proxied (주황색)               │
│ TTL: Auto                                       │
└─────────────────────────────────────────────────┘
```

**정확한 Target 값:**
```
kollabkorea.com.s3-website.ap-northeast-2.amazonaws.com
```

**4. Save 클릭**

**5. DNS 전파 대기**
- 소요 시간: 5분 ~ 1시간
- 확인: https://dnschecker.org

---

### 방법 2: Cloudflare Page Rule (301 리다이렉트)

**www를 메인 도메인으로 리다이렉트하는 방법**

#### 단계별 설정

**1. Page Rule 생성**
```
Cloudflare 대시보드 → Rules → Page Rules
→ Create Page Rule
```

**2. 리다이렉트 설정**
```
┌─────────────────────────────────────────────────┐
│ If the URL matches:                             │
│ www.kollabkorea.com/*                           │
├─────────────────────────────────────────────────┤
│ Then the settings are:                          │
│ Forwarding URL                                  │
│ Status Code: 301 - Permanent Redirect          │
│ Destination URL: https://kollabkorea.com/$1    │
└─────────────────────────────────────────────────┘
```

**3. Save and Deploy**

---

### 방법 3: 두 번째 S3 버킷 (완전한 해결책)

**더 안정적이지만 복잡한 방법**

#### 1. www 전용 S3 버킷 생성

```bash
# AWS S3 Console
1. 새 버킷 생성: www.kollabkorea.com
2. 리전: ap-northeast-2 (서울)
3. 정적 웹사이트 호스팅 활성화
```

#### 2. 리다이렉트 설정

```
S3 버킷 www.kollabkorea.com
→ 속성 → 정적 웹사이트 호스팅
→ 리다이렉트 요청 선택

호스트 이름: kollabkorea.com
프로토콜: https
```

#### 3. Cloudflare DNS 추가

```
Type: CNAME
Name: www
Target: www.kollabkorea.com.s3-website.ap-northeast-2.amazonaws.com
Proxy: Proxied
```

---

## 🎯 권장 방법

### 상황별 추천

**1. 빠른 해결 (5분 소요):**
→ **방법 1: Cloudflare CNAME** 추가
- 가장 간단하고 효과적
- 추가 비용 없음
- 즉시 적용

**2. SEO 최적화 (10분 소요):**
→ **방법 2: Page Rule 리다이렉트**
- 301 리다이렉트로 SEO 유지
- www → 메인 도메인 통합
- 무료 (Cloudflare 기본 제공)

**3. 완벽한 구조 (30분 소요):**
→ **방법 3: 별도 S3 버킷**
- 가장 표준적인 방법
- AWS 모범 사례
- 추가 관리 필요

---

## 📝 체크리스트

### 설정 전
- [ ] Cloudflare 계정 로그인 정보 확인
- [ ] kollabkorea.com DNS가 Cloudflare에 있는지 확인
- [ ] 현재 S3 버킷 이름 확인 (kollabkorea.com)
- [ ] S3 Website Endpoint 확인

### 설정 후 (방법 1 선택 시)
- [ ] Cloudflare DNS에 www CNAME 레코드 추가
- [ ] Proxy status: Proxied (주황색)
- [ ] 5분 대기 후 테스트
- [ ] https://www.kollabkorea.com 접속 확인
- [ ] 모든 페이지 라우팅 테스트 (/about, /platform 등)

### 설정 후 (방법 2 선택 시)
- [ ] Cloudflare Page Rule 생성
- [ ] 301 리다이렉트 설정
- [ ] https://www.kollabkorea.com → https://kollabkorea.com 리다이렉트 확인
- [ ] SEO 도구로 301 상태 코드 확인

---

## 🧪 테스트 방법

### 1. DNS 전파 확인

**온라인 도구:**
```
https://dnschecker.org
→ Type: CNAME
→ Domain: www.kollabkorea.com
→ 전 세계 DNS 서버에서 확인
```

**터미널 (Mac):**
```bash
# CNAME 레코드 확인
dig www.kollabkorea.com CNAME

# 전체 DNS 정보
nslookup www.kollabkorea.com
```

### 2. 웹사이트 접속 테스트

```bash
# HTTP 헤더 확인
curl -I https://www.kollabkorea.com

# 예상 결과:
HTTP/2 200
content-type: text/html
server: cloudflare
```

### 3. 브라우저 테스트

**시크릿 모드에서:**
- ✅ https://kollabkorea.com
- ✅ https://www.kollabkorea.com
- ✅ http://kollabkorea.com → https 리다이렉트
- ✅ http://www.kollabkorea.com → https 리다이렉트

### 4. 페이지 라우팅 테스트

```
✅ https://www.kollabkorea.com/about
✅ https://www.kollabkorea.com/platform
✅ https://www.kollabkorea.com/brands
✅ https://www.kollabkorea.com/contact
✅ https://www.kollabkorea.com/faq
```

---

## 🛠️ 문제 해결

### 여전히 404 에러

**원인 1: DNS 전파 중**
```
해결: 5분 ~ 1시간 대기
확인: https://dnschecker.org
```

**원인 2: Cloudflare 캐시**
```
해결:
1. Cloudflare → Caching → Purge Everything
2. 브라우저 캐시 삭제
3. 시크릿 모드에서 테스트
```

**원인 3: Target 주소 오타**
```
올바른 형식:
kollabkorea.com.s3-website.ap-northeast-2.amazonaws.com

잘못된 형식:
kollabkorea.com.s3.ap-northeast-2.amazonaws.com (웹사이트 엔드포인트 아님)
```

### SSL 인증서 에러

**Cloudflare Proxied 모드 사용 시 자동 해결:**
```
Proxy status: ☁️ Proxied (주황색)
→ Cloudflare가 자동으로 SSL 제공
→ 별도 인증서 설정 불필요
```

**SSL/TLS 설정 확인:**
```
Cloudflare → SSL/TLS → Overview
→ Encryption mode: Flexible (권장)
```

### 리다이렉트 루프

**원인:** Cloudflare와 S3 설정 충돌
```
해결:
1. Cloudflare → SSL/TLS → Edge Certificates
2. Always Use HTTPS: Off (S3는 HTTPS 미지원)
3. Cloudflare가 HTTPS를 제공하도록 설정
```

---

## 📊 설정 비교

| 항목 | 방법 1: CNAME | 방법 2: 리다이렉트 | 방법 3: 별도 버킷 |
|------|---------------|-------------------|------------------|
| 난이도 | ⭐ 쉬움 | ⭐⭐ 보통 | ⭐⭐⭐ 복잡 |
| 소요 시간 | 5분 | 10분 | 30분 |
| 비용 | 무료 | 무료 | S3 추가 비용 |
| SEO | Good | Excellent (301) | Excellent |
| 유지보수 | 쉬움 | 쉬움 | 보통 |
| 권장도 | ✅✅✅ | ✅✅ | ✅ |

---

## 🎯 최종 권장 설정

### 대부분의 경우: 방법 1 (CNAME)

**Cloudflare DNS 설정:**

```
1. 루트 도메인
   Type: CNAME
   Name: @
   Target: kollabkorea.com.s3-website.ap-northeast-2.amazonaws.com
   Proxy: ☁️ Proxied
   
2. www 서브도메인
   Type: CNAME
   Name: www
   Target: kollabkorea.com.s3-website.ap-northeast-2.amazonaws.com
   Proxy: ☁️ Proxied
```

**장점:**
- ✅ 두 도메인 모두 같은 콘텐츠 제공
- ✅ HTTPS 자동 제공
- ✅ 설정 간단
- ✅ 관리 편리

---

## 🆘 추가 도움이 필요하면

### 1. Cloudflare 현재 설정 확인

**DNS Records 스크린샷 촬영:**
```
Cloudflare → DNS → Records
→ 모든 레코드 목록 캡처
```

### 2. S3 Bucket 정보 확인

**S3 Console:**
```
버킷 이름: ?
정적 웹사이트 호스팅: 활성화됨
Website Endpoint: ?
```

### 3. 에러 메시지 공유

**브라우저에서:**
```
F12 → Network 탭
→ www.kollabkorea.com 접속
→ 에러 메시지 캡처
```

---

**마지막 업데이트:** 2026년 1월 12일  
**작성자:** KOLLAB KOREA Development Team
