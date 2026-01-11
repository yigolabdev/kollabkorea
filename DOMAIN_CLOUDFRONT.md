# 🌐 CloudFront + S3 도메인 연결 가이드 (HTTPS 지원)

## ✅ 권장 방법
이 방법은 **HTTPS를 지원**하며, 나중에 서버 이동 시에도 DNS 변경 없이 Origin만 변경하면 됩니다.

---

## 📋 도메인 정보
- **도메인**: kollabkorea.com
- **S3 버킷**: kollabkorea
- **리전**: ap-northeast-2 (서울)

---

## 🚀 전체 프로세스 (예상 시간: 30-40분)

```
1️⃣ SSL 인증서 발급 (5분)
2️⃣ DNS 검증 레코드 추가 (5분)
3️⃣ 인증서 검증 대기 (10분)
4️⃣ CloudFront 생성 (10분)
5️⃣ S3 버킷 설정 (5분)
6️⃣ DNS CNAME 추가 (5분)
7️⃣ GitHub Secrets 추가 (2분)
8️⃣ DNS 전파 대기 (30분)
```

---

## 🔒 1단계: SSL 인증서 발급

### AWS Certificate Manager (ACM)

1. **AWS Console 접속**
   - 리전: **us-east-1 (버지니아)** ⚠️ 필수!
   - CloudFront는 버지니아 리전 인증서만 사용 가능

2. **Certificate Manager로 이동**
   ```
   AWS Console 검색창 → "Certificate Manager"
   리전이 "N. Virginia (us-east-1)"인지 확인!
   ```

3. **Request Certificate 클릭**

4. **Certificate details 입력**
   ```
   Certificate type: Request a public certificate
   
   Fully qualified domain name:
   - kollabkorea.com
   - *.kollabkorea.com
   
   → "Add another name to this certificate" 클릭하여 와일드카드 추가
   ```

5. **Validation method**
   ```
   Select validation method: DNS validation (권장)
   Key algorithm: RSA 2048
   ```

6. **Request 클릭**

7. **DNS 검증 레코드 확인**
   ```
   Certificate 상태: Pending validation
   
   "View certificate" 클릭
   → Domains 섹션에서 CNAME 레코드 확인
   ```

   예시:
   ```
   CNAME Name: _abc123def456.kollabkorea.com
   CNAME Value: _xyz789ghi012.acm-validations.aws.
   ```

   ⚠️ **중요**: 이 값을 복사해두세요!

---

## 🌐 2단계: app.hosting.kr DNS 검증 레코드 추가

1. **app.hosting.kr 로그인**
   - 도메인 관리 → kollabkorea.com 선택 → DNS 설정

2. **CNAME 레코드 추가**

   ```
   레코드 타입: CNAME
   호스트명: _abc123def456
   값: _xyz789ghi012.acm-validations.aws.
   TTL: 300
   ```

   ⚠️ **주의사항**:
   - 호스트명에는 `.kollabkorea.com` 제외하고 입력
   - 값의 끝에 `.`이 있는지 확인 (중요!)

3. **저장 후 5-10분 대기**

4. **ACM에서 검증 확인**
   ```
   AWS Console → Certificate Manager (us-east-1)
   → Certificate 상태: Issued ✅
   ```

   ⏱️ 보통 5-10분 소요, 최대 30분

---

## ☁️ 3단계: CloudFront Distribution 생성

### CloudFront 설정

1. **AWS Console → CloudFront**

2. **Create Distribution 클릭**

3. **Origin 설정**

   ```
   Origin domain: kollabkorea.s3.ap-northeast-2.amazonaws.com
   
   ⚠️ 드롭다운에서 선택하지 말고 직접 입력:
   kollabkorea.s3-website.ap-northeast-2.amazonaws.com
   
   Name: kollabkorea-s3-origin
   
   Origin access: Public
   ```

4. **Default cache behavior**

   ```
   Viewer protocol policy: Redirect HTTP to HTTPS ✅
   
   Allowed HTTP methods: GET, HEAD, OPTIONS
   
   Cache policy: CachingOptimized
   
   Origin request policy: None
   ```

5. **Function associations** (선택사항)
   ```
   Viewer request: None
   Viewer response: None
   ```

6. **Settings**

   ```
   Price class: Use all edge locations (최고 성능)
   
   Alternate domain names (CNAMEs):
   - kollabkorea.com
   - www.kollabkorea.com
   
   Custom SSL certificate:
   → 드롭다운에서 방금 발급한 인증서 선택
     (kollabkorea.com, *.kollabkorea.com)
   
   Supported HTTP versions: HTTP/2, HTTP/3
   
   Default root object: index.html
   
   Standard logging: Off (또는 On - 로그 필요 시)
   
   IPv6: On
   ```

7. **Create distribution 클릭**

   ⏱️ 배포 완료까지 5-15분 소요

8. **Distribution ID 복사**
   ```
   예시: E1234ABCDEFGH
   ```

---

## 📄 4단계: CloudFront Error Pages 설정 (SPA용 - 중요!)

1. **CloudFront → Distributions → 방금 생성한 배포 선택**

2. **Error pages 탭 클릭**

3. **Create custom error response**

   **403 에러 처리:**
   ```
   HTTP error code: 403 Forbidden
   Customize error response: Yes
   Response page path: /index.html
   HTTP response code: 200 OK
   ```

   **Create custom error response 클릭**

   **404 에러 처리:**
   ```
   HTTP error code: 404 Not Found
   Customize error response: Yes
   Response page path: /index.html
   HTTP response code: 200 OK
   ```

   **Create custom error response 클릭**

   ⚠️ **필수**: React Router가 정상 작동하려면 이 설정이 필요합니다!

---

## 🪣 5단계: S3 버킷 Static Website Hosting 설정

1. **S3 Console → kollabkorea 버킷 선택**

2. **Properties 탭 → Static website hosting → Edit**

   ```
   Static website hosting: Enable
   
   Hosting type: Host a static website
   
   Index document: index.html
   
   Error document: index.html
   ```

3. **Save changes**

4. **Permissions 탭으로 이동**

5. **Block public access 확인**
   ```
   ⚠️ CloudFront 사용 시에는 Public Access를 차단해야 보안에 좋습니다.
   
   하지만 현재 Origin이 S3 Website Endpoint이므로:
   → Block public access: OFF
   ```

6. **Bucket Policy 추가**

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::kollabkorea/*"
       }
     ]
   }
   ```

   **Save changes**

---

## 🌐 6단계: app.hosting.kr DNS CNAME 레코드 추가

1. **app.hosting.kr 로그인**
   - 도메인 관리 → kollabkorea.com → DNS 설정

2. **CloudFront Domain Name 복사**
   ```
   AWS CloudFront → Distributions
   → Distribution domain name: d1234abcdefgh.cloudfront.net
   ```

3. **CNAME 레코드 추가**

   **메인 도메인 (kollabkorea.com)**
   ```
   레코드 타입: CNAME
   호스트명: @
   값: d1234abcdefgh.cloudfront.net
   TTL: 300
   ```

   **www 서브도메인**
   ```
   레코드 타입: CNAME
   호스트명: www
   값: d1234abcdefgh.cloudfront.net
   TTL: 300
   ```

   ⚠️ **주의**: 
   - app.hosting.kr이 루트 도메인(@)에 CNAME을 지원하지 않을 수 있습니다.
   - 지원하지 않는 경우:
     1. www만 CNAME 설정
     2. @ → www 리다이렉트 설정 (가능한 경우)
     3. 또는 Route 53으로 DNS 이전

4. **저장**

5. **DNS 전파 대기** (5분 ~ 48시간, 평균 1-2시간)

---

## 🔐 7단계: GitHub Secrets 추가

1. **GitHub Repository 접속**
   ```
   https://github.com/yigolabdev/kollabkorea
   ```

2. **Settings → Secrets and variables → Actions**

3. **New repository secret 클릭**

   ```
   Name: CLOUDFRONT_DISTRIBUTION_ID
   Value: E1234ABCDEFGH (CloudFront Distribution ID)
   ```

4. **Add secret 클릭**

   ✅ 이제 GitHub Actions가 자동으로 CloudFront 캐시를 무효화합니다!

---

## ✅ 8단계: 테스트 및 검증

### DNS 전파 확인

```bash
# 터미널에서 확인
dig kollabkorea.com
dig www.kollabkorea.com

nslookup kollabkorea.com
nslookup www.kollabkorea.com

# 웹에서 확인
https://dnschecker.org/?domain=kollabkorea.com
```

### 브라우저 테스트

```
✅ https://kollabkorea.com
✅ https://www.kollabkorea.com
✅ http://kollabkorea.com → https로 자동 리다이렉트
```

### 체크리스트

- [ ] **ACM 인증서**: Status = Issued
- [ ] **CloudFront**: Status = Enabled
- [ ] **CloudFront Error Pages**: 403, 404 설정 완료
- [ ] **S3 Static Website Hosting**: Enabled
- [ ] **DNS 레코드**: CNAME 추가 완료
- [ ] **GitHub Secret**: CLOUDFRONT_DISTRIBUTION_ID 추가
- [ ] **HTTPS 접속**: 자물쇠 아이콘 표시
- [ ] **HTTP → HTTPS 리다이렉트**: 자동 동작
- [ ] **서브 페이지 라우팅**: /platform, /brands 등 정상 작동
- [ ] **새로고침 시 404 없음**: Error Pages 설정 정상

---

## 🎯 완료 후 작업

### 1. 성능 테스트

```bash
# Lighthouse로 성능 측정
https://pagespeed.web.dev/

목표:
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+
```

### 2. Google Search Console 등록

```
https://search.google.com/search-console

1. 속성 추가: https://kollabkorea.com
2. 소유권 확인 (DNS TXT 레코드)
3. 사이트맵 제출: https://kollabkorea.com/sitemap.xml
```

### 3. robots.txt 추가

```bash
# public/robots.txt
User-agent: *
Allow: /

Sitemap: https://kollabkorea.com/sitemap.xml
```

### 4. 모니터링 설정

```
AWS CloudWatch:
- CloudFront 4xx/5xx 에러 모니터링
- Origin Response Time 모니터링
- Cache Hit Rate 확인

목표:
- Cache Hit Rate: 80% 이상
- Origin Response Time: < 100ms
```

---

## 🔧 문제 해결

### 1. "Certificate doesn't exist" 에러 (CloudFront 설정 시)

**원인**: 인증서를 us-east-1이 아닌 다른 리전에서 발급함

**해결**:
```
1. Certificate Manager로 이동
2. 리전을 us-east-1로 변경
3. 인증서 재발급
```

---

### 2. DNS 레코드 추가 시 "CNAME already exists" 에러

**원인**: 기존 레코드와 충돌

**해결**:
```
1. 기존 레코드 확인 (A, CNAME 등)
2. 기존 레코드 삭제
3. CloudFront CNAME 레코드 추가
```

---

### 3. "This site can't be reached" 에러

**원인**: DNS 전파가 완료되지 않음

**해결**:
```
1. 1-2시간 더 대기
2. DNS 캐시 초기화:
   
   # Mac
   sudo dscacheutil -flushcache
   sudo killall -HUP mDNSResponder
   
   # Windows
   ipconfig /flushdns
   
3. 시크릿 브라우징 모드에서 테스트
4. https://dnschecker.org 에서 전파 상태 확인
```

---

### 4. 서브 페이지 새로고침 시 404 에러

**원인**: CloudFront Error Pages 설정 누락

**해결**:
```
CloudFront → Error pages
→ 403, 404를 /index.html로 리다이렉트 (응답 코드 200)
→ 설정 후 캐시 무효화:

aws cloudfront create-invalidation \
  --distribution-id E1234ABCDEFGH \
  --paths "/*"
```

---

### 5. app.hosting.kr에서 루트 도메인(@) CNAME 추가 불가

**원인**: DNS 표준상 Apex 도메인에 CNAME 불가

**해결 옵션**:

**A. Route 53으로 DNS 이전 (권장)**
```
1. AWS Route 53 → Hosted Zone 생성
2. kollabkorea.com 입력
3. Route 53이 제공하는 NS 레코드 4개 복사
4. app.hosting.kr에서 네임서버를 Route 53 NS로 변경
5. Route 53에서 ALIAS 레코드 사용:
   
   Type: A - IPv4 address
   Name: kollabkorea.com
   Alias: Yes
   Alias Target: CloudFront Distribution
```

**B. www만 사용하고 메인 도메인 리다이렉트**
```
1. www.kollabkorea.com만 CNAME 설정
2. kollabkorea.com → www.kollabkorea.com 리다이렉트
   (app.hosting.kr 리다이렉트 기능 사용 - 가능한 경우)
```

**C. CloudFlare 사용**
```
1. CloudFlare 무료 계정 생성
2. 도메인 추가
3. CloudFlare NS 레코드를 app.hosting.kr에 설정
4. CloudFlare DNS에서 CNAME Flattening 사용
```

---

## 🚀 서버 이동 시 Origin 변경 방법

나중에 S3에서 다른 서버 (EC2, ECS, Lambda 등)로 이동할 때:

### 1. CloudFront Origin 변경

```
CloudFront → Distribution → Origins 탭
→ 기존 Origin 선택 → Edit

Origin domain: 
  변경 전: kollabkorea.s3-website.ap-northeast-2.amazonaws.com
  변경 후: api.kollabkorea.com (새 서버)

Save changes
```

### 2. 캐시 무효화

```bash
aws cloudfront create-invalidation \
  --distribution-id E1234ABCDEFGH \
  --paths "/*"
```

### 3. DNS 변경 불필요!

```
kollabkorea.com → d1234abcdefgh.cloudfront.net
(동일하게 유지)

CloudFront가 알아서 새 Origin으로 요청을 전달함
```

**장점:**
- DNS 전파 대기 불필요 (즉시 반영)
- 다운타임 최소화
- 롤백 쉬움 (Origin만 다시 변경)

---

## 💰 예상 비용

### 월간 비용 (트래픽 5만 방문 기준)

```
S3 스토리지 (50GB):           $1.15
S3 요청 (10만 GET):           $0.04
CloudFront 데이터 전송 (50GB): $4.25
CloudFront 요청 (10만):        $0.10
ACM SSL 인증서:                무료
Route 53 (선택):               $0.50 (Hosted Zone)
────────────────────────────────────
총 예상 비용:                  $6/월
```

### 트래픽 증가 시

```
트래픽 10만 방문/월:  $10-15
트래픽 50만 방문/월:  $30-50
트래픽 100만 방문/월: $60-100
```

---

## 📊 최종 아키텍처

```
사용자
  ↓
app.hosting.kr DNS (kollabkorea.com)
  ↓
AWS CloudFront (CDN + HTTPS)
  ↓ Origin Request
AWS S3 (kollabkorea 버킷)
  ↓
정적 파일 (HTML, CSS, JS)
```

**보안:**
- ✅ HTTPS 강제 (SSL/TLS 1.2+)
- ✅ S3 버킷 직접 접근 차단 (CloudFront만 허용)
- ✅ DDoS 방어 (AWS Shield Standard)

**성능:**
- ✅ 전세계 CDN (200+ 엣지 로케이션)
- ✅ HTTP/2, HTTP/3 지원
- ✅ Brotli/Gzip 압축 자동
- ✅ 캐시 최적화

**확장성:**
- ✅ Origin 교체 가능 (S3 → EC2/ECS/Lambda)
- ✅ 다운타임 없는 배포
- ✅ Blue-Green 배포 가능

---

## 🎉 완료!

이제 https://kollabkorea.com 으로 접속하면:
- ✅ HTTPS 보안 연결
- ✅ 빠른 CDN 속도
- ✅ React Router 정상 작동
- ✅ 자동 배포 (GitHub Actions)
- ✅ 서버 이동 준비 완료

**다음 단계:**
1. Google Analytics 설정
2. Google Search Console 등록
3. 성능 최적화 (Lighthouse 100점 목표)
4. 모니터링 알림 설정

---

**마지막 업데이트**: 2026년 1월 8일
**소요 시간**: 실제 작업 30분 + 대기 40분
