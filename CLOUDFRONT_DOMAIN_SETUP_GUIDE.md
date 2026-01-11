# 🌐 CloudFront 도메인 연결 가이드

## 📋 작업 개요

**도메인**: `kollabkorea.com`  
**구매처**: app.hosting.kr  
**현재 상태**: S3 정적 웹사이트 호스팅  
**목표**: CloudFront + SSL 인증서 + 커스텀 도메인 연결

---

## 🎯 전체 작업 순서

### Phase 1: ACM SSL 인증서 발급
1. AWS Certificate Manager (ACM) 접속
2. 인증서 요청 (반드시 `us-east-1` 리전)
3. DNS 검증 레코드 확인
4. app.hosting.kr에 CNAME 레코드 추가
5. 인증서 검증 완료 대기 (5-30분)

### Phase 2: CloudFront Distribution 생성
6. CloudFront 콘솔 접속
7. Distribution 생성
8. S3 버킷 연결
9. 커스텀 도메인 설정 (kollabkorea.com, www.kollabkorea.com)
10. SSL 인증서 연결
11. Error Pages 설정 (SPA 라우팅)

### Phase 3: DNS 설정
12. CloudFront Distribution Domain Name 확인
13. app.hosting.kr에 CNAME 레코드 추가
14. DNS 전파 대기 (5-60분)

### Phase 4: 최종 확인
15. HTTPS 접속 테스트
16. 라우팅 테스트
17. GitHub Actions 업데이트

---

## 📝 Phase 1: ACM SSL 인증서 발급

### Step 1: AWS Certificate Manager 접속

1. AWS 콘솔 로그인
2. **리전을 반드시 `us-east-1` (버지니아 북부)로 변경**
   - ⚠️ CloudFront는 us-east-1 리전의 인증서만 사용 가능
3. 서비스 검색: "Certificate Manager" 또는 "ACM"
4. "인증서 요청" 클릭

### Step 2: 인증서 요청

**인증서 유형:**
- ✅ 퍼블릭 인증서 요청

**도메인 이름:**
```
kollabkorea.com
*.kollabkorea.com
```
또는 개별 추가:
```
kollabkorea.com
www.kollabkorea.com
```

**검증 방법:**
- ✅ DNS 검증 (권장)
- ❌ 이메일 검증 (사용하지 않음)

**태그 (선택사항):**
- Key: `Project`, Value: `KOLLAB-KOREA`
- Key: `Environment`, Value: `Production`

**"요청" 버튼 클릭**

### Step 3: DNS 검증 레코드 확인

인증서 요청 후 화면에 표시되는 정보:

```
도메인 이름: kollabkorea.com
레코드 이름: _xxxxxxxxxxxxxxxxxxxx.kollabkorea.com
레코드 유형: CNAME
레코드 값: _yyyyyyyyyyyyyyyyyyyy.acm-validations.aws.
```

**📋 이 정보를 복사하세요!**

### Step 4: app.hosting.kr DNS 설정

1. **app.hosting.kr 로그인**
2. **내 도메인 관리** → `kollabkorea.com` 선택
3. **DNS 레코드 관리** 또는 **DNS 설정** 메뉴
4. **새 레코드 추가:**

| 타입 | 호스트 (Name) | 값 (Value) | TTL |
|------|---------------|------------|-----|
| CNAME | `_xxxxxxxxxxxxxxxxxxxx` | `_yyyyyyyyyyyyyyyyyyyy.acm-validations.aws.` | 3600 |

⚠️ **중요**: 
- 호스트에는 `_xxxxxxxxxxxxxxxxxxxx`만 입력 (`.kollabkorea.com` 제외)
- 값은 ACM에서 제공한 전체 문자열 입력
- 끝에 `.`이 있는 경우 포함해야 함

**저장** 버튼 클릭

### Step 5: 인증서 검증 대기

1. AWS ACM 콘솔로 돌아가기
2. 인증서 상태 확인: "검증 대기 중"
3. **5-30분 대기** (보통 10분 이내)
4. 상태가 "발급됨"으로 변경되면 완료 ✅

**DNS 전파 확인 (선택사항):**
```bash
# macOS/Linux
dig _xxxxxxxxxxxxxxxxxxxx.kollabkorea.com CNAME

# Windows
nslookup -type=CNAME _xxxxxxxxxxxxxxxxxxxx.kollabkorea.com
```

---

## 📝 Phase 2: CloudFront Distribution 생성

### Step 1: CloudFront 콘솔 접속

1. AWS 콘솔에서 "CloudFront" 검색
2. "Create Distribution" 클릭

### Step 2: Origin 설정

**Origin Domain:**
- S3 버킷 선택: `kollabkorea.s3.ap-northeast-2.amazonaws.com`
- 또는 S3 정적 웹사이트 엔드포인트: `kollabkorea.s3-website.ap-northeast-2.amazonaws.com`

⚠️ **중요**: 
- S3 정적 웹사이트 엔드포인트 사용 시 **Custom Origin** 선택
- Protocol: `HTTP only` (S3 정적 호스팅은 HTTPS 미지원)

**Origin Path:**
- 비워두기 (루트 경로 사용)

**Name:**
- 자동 생성 또는 `kollabkorea-s3-origin`

**Origin Access:**
- ✅ Origin access control settings (recommended)
- Create control setting 클릭
  - Name: `kollabkorea-oac`
  - Signing behavior: Sign requests (recommended)

### Step 3: Default Cache Behavior

**Path Pattern:**
- `Default (*)` (자동 설정)

**Viewer Protocol Policy:**
- ✅ **Redirect HTTP to HTTPS** (권장)

**Allowed HTTP Methods:**
- ✅ **GET, HEAD, OPTIONS**

**Cache Policy:**
- ✅ **CachingOptimized** (기본값)

**Origin Request Policy:**
- None (기본값)

### Step 4: Distribution Settings

**Alternate Domain Names (CNAMEs):**
```
kollabkorea.com
www.kollabkorea.com
```
또는 와일드카드 사용:
```
kollabkorea.com
*.kollabkorea.com
```

**Custom SSL Certificate:**
- ✅ 앞서 발급받은 ACM 인증서 선택
- `kollabkorea.com (xxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)`

**Default Root Object:**
```
index.html
```

**Description (선택사항):**
```
KOLLAB KOREA Production Distribution
```

### Step 5: Error Pages 설정 (SPA 라우팅 지원)

⚠️ **매우 중요**: React SPA 라우팅을 위해 반드시 설정 필요

Distribution 생성 후:

1. Distribution 선택 → **Error Pages** 탭
2. **Create Custom Error Response** 클릭

**403 에러 처리:**
| 항목 | 값 |
|------|-----|
| HTTP Error Code | 403: Forbidden |
| Customize Error Response | Yes |
| Response Page Path | `/index.html` |
| HTTP Response Code | 200: OK |

**404 에러 처리:**
| 항목 | 값 |
|------|-----|
| HTTP Error Code | 404: Not Found |
| Customize Error Response | Yes |
| Response Page Path | `/index.html` |
| HTTP Response Code | 200: OK |

**"Create" 버튼 클릭**

### Step 6: S3 Bucket Policy 업데이트

CloudFront가 S3 버킷에 접근할 수 있도록 권한 설정:

1. S3 콘솔 → `kollabkorea` 버킷 선택
2. **Permissions** 탭 → **Bucket Policy**
3. 아래 정책 추가:

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
            "Resource": "arn:aws:s3:::kollabkorea/*",
            "Condition": {
                "StringEquals": {
                    "AWS:SourceArn": "arn:aws:cloudfront::YOUR-ACCOUNT-ID:distribution/YOUR-DISTRIBUTION-ID"
                }
            }
        }
    ]
}
```

**변경 사항:**
- `YOUR-ACCOUNT-ID`: AWS 계정 ID (12자리 숫자)
- `YOUR-DISTRIBUTION-ID`: CloudFront Distribution ID (예: E1234ABCDEFG5H)

**저장**

---

## 📝 Phase 3: DNS 설정

### Step 1: CloudFront Distribution Domain Name 확인

1. CloudFront 콘솔 → Distribution 선택
2. **Distribution domain name** 복사
   - 예: `d1234abcdefg5h.cloudfront.net`

### Step 2: app.hosting.kr DNS 레코드 추가

1. **app.hosting.kr 로그인**
2. **내 도메인 관리** → `kollabkorea.com` 선택
3. **DNS 레코드 관리**

**Root 도메인 설정:**

| 타입 | 호스트 (Name) | 값 (Value) | TTL |
|------|---------------|------------|-----|
| CNAME | `@` 또는 비워두기 | `d1234abcdefg5h.cloudfront.net` | 3600 |

> ⚠️ **중요**: 일부 DNS 제공자는 루트 도메인에 CNAME을 허용하지 않습니다.
> - 대안 1: **ALIAS** 레코드 사용 (지원하는 경우)
> - 대안 2: **A 레코드** + CloudFront IP 사용 (권장하지 않음)
> - 대안 3: 루트 도메인 리다이렉트 → www.kollabkorea.com

**www 서브도메인 설정:**

| 타입 | 호스트 (Name) | 값 (Value) | TTL |
|------|---------------|------------|-----|
| CNAME | `www` | `d1234abcdefg5h.cloudfront.net` | 3600 |

**저장**

### Step 3: DNS 전파 대기

- **예상 시간**: 5분 ~ 1시간
- **일반적**: 10-15분

**전파 확인:**
```bash
# macOS/Linux
dig kollabkorea.com
dig www.kollabkorea.com

# Windows
nslookup kollabkorea.com
nslookup www.kollabkorea.com
```

**온라인 도구:**
- https://www.whatsmydns.net/
- 도메인 입력 → CNAME 또는 A 레코드 확인

---

## 📝 Phase 4: 최종 확인 및 테스트

### Step 1: HTTPS 접속 테스트

브라우저에서 접속:
```
https://kollabkorea.com
https://www.kollabkorea.com
```

✅ **성공 조건:**
- HTTPS로 접속 가능
- SSL 인증서 유효 (자물쇠 아이콘)
- 페이지 정상 로드

### Step 2: 라우팅 테스트

SPA 라우팅 확인:
```
https://kollabkorea.com/about
https://kollabkorea.com/platform
https://kollabkorea.com/brands
https://kollabkorea.com/contact
```

✅ **성공 조건:**
- 모든 페이지 정상 접속
- 새로고침 시에도 페이지 유지 (403/404 에러 없음)

### Step 3: GitHub Actions 업데이트

`.github/workflows/deploy.yml` 파일 수정:

**변경 전:**
```yaml
- name: Deploy to S3
  run: |
    aws s3 sync dist/ s3://kollabkorea --delete
```

**변경 후:**
```yaml
- name: Deploy to S3
  run: |
    aws s3 sync dist/ s3://kollabkorea --delete

- name: Invalidate CloudFront Cache
  run: |
    aws cloudfront create-invalidation \
      --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
      --paths "/*"
```

**GitHub Secrets에 추가:**
1. GitHub 리포지토리 → **Settings**
2. **Secrets and variables** → **Actions**
3. **New repository secret**
   - Name: `CLOUDFRONT_DISTRIBUTION_ID`
   - Value: CloudFront Distribution ID (예: `E1234ABCDEFG5H`)

---

## 🎉 완료!

모든 작업이 완료되었습니다!

### 최종 체크리스트

- [x] ACM SSL 인증서 발급 완료
- [x] CloudFront Distribution 생성
- [x] Error Pages 설정 (403, 404)
- [x] S3 Bucket Policy 설정
- [x] DNS 레코드 추가
- [x] HTTPS 접속 테스트
- [x] 라우팅 테스트
- [x] GitHub Actions 업데이트

### 배포 URL

- 🌐 **메인 도메인**: https://kollabkorea.com
- 🌐 **www 도메인**: https://www.kollabkorea.com
- 🚀 **CloudFront**: https://d1234abcdefg5h.cloudfront.net

---

## 🔧 트러블슈팅

### 문제 1: SSL 인증서가 보이지 않음
**원인**: CloudFront는 us-east-1 리전의 인증서만 사용 가능  
**해결**: ACM 콘솔에서 리전을 us-east-1로 변경 후 인증서 재발급

### 문제 2: 403 Forbidden 에러
**원인**: S3 Bucket Policy 미설정 또는 Error Pages 미설정  
**해결**: 
1. S3 Bucket Policy에 CloudFront 접근 권한 추가
2. CloudFront Error Pages 설정 (403 → /index.html)

### 문제 3: 페이지 새로고침 시 404 에러
**원인**: SPA 라우팅을 위한 Error Pages 미설정  
**해결**: CloudFront Error Pages에서 404 → /index.html 매핑 추가

### 문제 4: 캐시 업데이트 안됨
**원인**: CloudFront 캐시가 오래된 버전 유지  
**해결**: Invalidation 생성
```bash
aws cloudfront create-invalidation \
  --distribution-id E1234ABCDEFG5H \
  --paths "/*"
```

### 문제 5: DNS 전파 느림
**원인**: TTL 설정 또는 DNS 서버 캐시  
**해결**: 
1. TTL을 300초(5분)로 낮춤
2. 최대 1시간 대기
3. 온라인 DNS 전파 체크 도구 사용

---

## 📚 참고 문서

- [AWS CloudFront 공식 문서](https://docs.aws.amazon.com/cloudfront/)
- [ACM SSL 인증서 가이드](https://docs.aws.amazon.com/acm/)
- [S3 정적 웹사이트 호스팅](https://docs.aws.amazon.com/s3/static-website/)

---

**마지막 업데이트**: 2026-01-11  
**작성자**: KOLLAB KOREA DevOps Team
