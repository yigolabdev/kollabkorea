# 🌐 도메인 연결 가이드

## 📋 개요
app.hosting.kr에서 구매한 도메인을 AWS S3 + CloudFront에 연결하는 가이드입니다.

---

## 🎯 1단계: 사전 준비

### 필요한 정보
- [ ] 도메인 이름 (예: kollabkorea.com)
- [ ] S3 버킷 이름
- [ ] AWS 계정 ID
- [ ] app.hosting.kr 로그인 정보

### 권장 아키텍처
```
사용자 → app.hosting.kr DNS → CloudFront (CDN) → S3 (정적 파일)
         ↑                      ↑
         도메인                 HTTPS (ACM 인증서)
```

---

## 🔒 2단계: SSL 인증서 발급

### AWS Certificate Manager (ACM)

1. **AWS Console 접속**
   - 리전: **us-east-1 (버지니아)** ⚠️ 필수!

2. **인증서 요청**
   ```
   Certificate Manager → Request Certificate
   
   Domain names:
   - kollabkorea.com
   - *.kollabkorea.com
   
   Validation method: DNS validation
   Key algorithm: RSA 2048
   ```

3. **DNS 검증 레코드 확인**
   - ACM이 제공하는 CNAME 레코드를 복사
   - 예시:
     ```
     Name: _abc123.kollabkorea.com
     Value: _xyz789.acm-validations.aws.
     ```

---

## ☁️ 3단계: CloudFront 배포 생성

### CloudFront 설정

1. **AWS Console → CloudFront → Create Distribution**

2. **Origin 설정**
   ```
   Origin Domain: your-bucket.s3.ap-northeast-2.amazonaws.com
   Origin Path: (비워둠)
   Origin Access: Origin Access Control (OAC)
   ```

3. **Default Cache Behavior**
   ```
   Viewer Protocol Policy: Redirect HTTP to HTTPS
   Allowed HTTP Methods: GET, HEAD, OPTIONS
   Cache Policy: CachingOptimized
   ```

4. **Distribution Settings**
   ```
   Price Class: Use All Edge Locations
   
   Alternate Domain Names (CNAMEs):
   - kollabkorea.com
   - www.kollabkorea.com
   
   Custom SSL Certificate: (ACM에서 발급한 인증서 선택)
   Default Root Object: index.html
   ```

5. **Error Pages (SPA 라우팅용 - 중요!)**
   ```
   # 403 에러 처리
   HTTP Error Code: 403
   Response Page Path: /index.html
   HTTP Response Code: 200
   
   # 404 에러 처리
   HTTP Error Code: 404
   Response Page Path: /index.html
   HTTP Response Code: 200
   ```

6. **Create Distribution 클릭**
   - 배포 완료까지 5-10분 소요
   - Distribution ID 복사 (예: E1234ABCDEFGH)

---

## 🪣 4단계: S3 버킷 정책 업데이트

### CloudFront OAC 권한 설정

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontServicePrincipal",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::YOUR_ACCOUNT_ID:distribution/YOUR_DISTRIBUTION_ID"
        }
      }
    }
  ]
}
```

**적용 방법:**
1. S3 Console → 버킷 선택 → Permissions 탭
2. Bucket Policy → Edit
3. 위 JSON 붙여넣기 (YOUR_* 값 수정)
4. Save changes

---

## 🌐 5단계: app.hosting.kr DNS 설정

### DNS 레코드 추가

1. **app.hosting.kr 관리 페이지 접속**
   - 로그인 → 도메인 관리 → DNS 설정

2. **ACM 인증서 검증 레코드 (1회만)**
   ```
   Type: CNAME
   Host: _abc123
   Value: _xyz789.acm-validations.aws.
   TTL: 300
   ```
   - ACM에서 제공한 값 그대로 입력
   - 5-10분 후 ACM에서 "Issued" 상태 확인

3. **CloudFront 연결 레코드**

   **방법 A: CNAME 레코드 (일반적)**
   ```
   # 메인 도메인
   Type: CNAME
   Host: @
   Value: d1234abcd.cloudfront.net
   TTL: 300
   
   # www 서브도메인
   Type: CNAME
   Host: www
   Value: d1234abcd.cloudfront.net
   TTL: 300
   ```

   **방법 B: A 레코드 (루트 도메인 CNAME 미지원 시)**
   ```
   ⚠️ app.hosting.kr이 Apex 도메인 CNAME을 지원하지 않는 경우
   → AWS Route 53으로 DNS 이전 권장
   → ALIAS 레코드 사용 가능
   ```

4. **DNS 전파 대기**
   - 5분 ~ 48시간 소요 (평균 1-2시간)
   - 확인: https://dnschecker.org

---

## 🚀 6단계: GitHub Actions 설정

### CloudFront 캐시 무효화 자동화

1. **GitHub Secrets 추가**
   ```
   Repository → Settings → Secrets and variables → Actions
   
   Name: CLOUDFRONT_DISTRIBUTION_ID
   Value: E1234ABCDEFGH
   ```

2. **이미 설정 완료!**
   - `.github/workflows/deploy.yml`에 이미 구성됨
   - Push 시 자동으로 CloudFront 캐시 무효화

---

## ✅ 7단계: 테스트 및 검증

### 체크리스트

```bash
# 1. ACM 인증서 상태 확인
AWS Console → Certificate Manager → Status: Issued ✅

# 2. CloudFront 배포 상태 확인
AWS Console → CloudFront → Status: Enabled ✅

# 3. DNS 전파 확인
dig kollabkorea.com
nslookup kollabkorea.com
# 또는 https://dnschecker.org

# 4. HTTPS 접속 테스트
curl -I https://kollabkorea.com
# 응답: HTTP/2 200 ✅

# 5. 브라우저 테스트
https://kollabkorea.com
https://www.kollabkorea.com
```

### 테스트 시나리오

- [ ] 메인 페이지 로드
- [ ] 서브 페이지 라우팅 (예: /platform)
- [ ] 새로고침 시 404 발생하지 않음
- [ ] 모바일 반응형 정상 작동
- [ ] HTTPS 자물쇠 아이콘 표시
- [ ] HTTP → HTTPS 자동 리다이렉트

---

## 🔧 문제 해결

### 1. ACM 인증서가 "Pending Validation" 상태

**원인:** DNS 검증 레코드가 올바르게 추가되지 않음

**해결:**
```bash
# DNS 레코드 확인
dig _abc123.kollabkorea.com CNAME

# app.hosting.kr에서 정확히 입력했는지 재확인
# TTL 300으로 설정 후 10분 대기
```

---

### 2. CloudFront 접속 시 "AccessDenied" 에러

**원인:** S3 버킷 정책에 CloudFront 권한이 없음

**해결:**
- S3 Bucket Policy에 CloudFront OAC 권한 추가
- Distribution ARN 정확히 입력

---

### 3. 도메인 접속 시 "This site can't be reached"

**원인:** DNS 전파가 완료되지 않음

**해결:**
```bash
# DNS 전파 상태 확인
https://dnschecker.org/?domain=kollabkorea.com

# 로컬 DNS 캐시 초기화 (Mac)
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder

# 시크릿 브라우징 모드에서 테스트
```

---

### 4. 서브 페이지 새로고침 시 404 에러

**원인:** CloudFront Error Pages 설정 누락

**해결:**
- CloudFront → Error Pages 탭
- 403, 404 에러를 `/index.html`로 리다이렉트 (응답 코드 200)

---

### 5. app.hosting.kr에서 루트 도메인(@) CNAME 추가 불가

**원인:** DNS 표준상 Apex 도메인에 CNAME 불가

**해결 방법:**

**옵션 A: Route 53으로 DNS 이전 (권장)**
```
1. AWS Route 53 → Hosted Zone 생성
2. NS 레코드를 app.hosting.kr에 등록
3. Route 53에서 ALIAS 레코드 사용
   - Type: A - IPv4 address
   - Alias: Yes
   - Target: CloudFront Distribution
```

**옵션 B: www만 사용**
```
# www.kollabkorea.com만 CNAME 설정
# 메인 도메인은 www로 리다이렉트
```

**옵션 C: CloudFlare 사용**
```
# CloudFlare를 DNS 프록시로 사용
# CNAME Flattening 기능 지원
```

---

## 📊 비용 예상

### AWS 서비스별 비용 (월간)

**S3 스토리지**
- 50 GB: ~$1.15
- 데이터 전송: GET 요청당 $0.0004

**CloudFront**
- 데이터 전송 (50GB): ~$4.25
- HTTP 요청 (1만 건): ~$0.10
- HTTPS 요청: 무료 (ACM 인증서)

**Route 53 (선택사항)**
- Hosted Zone: $0.50/월
- DNS 쿼리: 100만 건당 $0.40

**총 예상 비용:** 월 $5-10 (트래픽 5만 방문 기준)

---

## 🎯 완료 후 체크리스트

### 필수
- [ ] ACM 인증서 "Issued" 상태
- [ ] CloudFront 배포 "Enabled" 상태
- [ ] S3 버킷 정책에 CloudFront 권한 추가
- [ ] app.hosting.kr DNS 레코드 추가
- [ ] HTTPS 접속 가능
- [ ] 서브 페이지 라우팅 정상 작동

### 선택
- [ ] GitHub Secrets에 CLOUDFRONT_DISTRIBUTION_ID 추가
- [ ] www 도메인 리다이렉트 설정
- [ ] Google Search Console 등록
- [ ] Google Analytics 설정
- [ ] 성능 테스트 (Lighthouse)

---

## 📚 참고 자료

- [AWS CloudFront 공식 문서](https://docs.aws.amazon.com/cloudfront/)
- [ACM SSL 인증서 가이드](https://docs.aws.amazon.com/acm/)
- [React Router SPA 배포 가이드](https://create-react-app.dev/docs/deployment/)
- [DNS 전파 확인 도구](https://dnschecker.org)

---

## 💡 추가 최적화

### 성능 개선
```
1. CloudFront 캐시 TTL 최적화
2. Brotli 압축 활성화
3. HTTP/3 (QUIC) 활성화
4. Image Optimization (Lambda@Edge)
```

### 보안 강화
```
1. CloudFront Geo-Restriction 설정
2. AWS WAF 규칙 추가
3. S3 버킷 Public Access 완전 차단
4. CORS 정책 설정
```

### 모니터링
```
1. CloudWatch Alarms 설정
2. CloudFront 액세스 로그 활성화
3. AWS Cost Explorer 예산 알림
```

---

## 🆘 지원

문제가 발생하면:
1. 이 문서의 "문제 해결" 섹션 확인
2. AWS Support (Basic/Developer)
3. app.hosting.kr 고객 지원

---

**마지막 업데이트:** 2026년 1월 8일
**작성자:** KOLLAB KOREA Development Team
