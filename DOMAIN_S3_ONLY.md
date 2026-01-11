# 🌐 S3 단독 도메인 연결 가이드 (HTTP만 지원)

## ⚠️ 경고
이 방법은 **HTTP만 지원**하며, HTTPS를 사용할 수 없습니다.
- 브라우저에서 "안전하지 않음" 경고 표시
- SEO 순위 하락
- 보안 취약

**프로덕션 환경에서는 CloudFront + HTTPS 사용을 강력히 권장합니다.**

---

## 📋 도메인 정보
- **도메인**: kollabkorea.com
- **S3 버킷**: kollabkorea
- **리전**: ap-northeast-2 (서울)

---

## 🚀 1단계: S3 버킷 Static Website Hosting 설정

### AWS S3 Console 접속

```bash
1. AWS Console → S3 → kollabkorea 버킷 선택
2. Properties 탭 → Static website hosting
3. Edit 클릭
```

### 설정 값

```
Static website hosting: Enable

Hosting type: Host a static website

Index document: index.html

Error document: index.html  # SPA 라우팅용 (중요!)
```

### 저장 후 엔드포인트 확인

```
Bucket website endpoint가 생성됨:
http://kollabkorea.s3-website.ap-northeast-2.amazonaws.com
```

⚠️ **주의**: `http://`이며 `https://`가 아닙니다!

---

## 🔓 2단계: S3 버킷 Public Access 설정

### Block Public Access 해제

```bash
S3 Console → kollabkorea → Permissions 탭

Block public access (bucket settings)
→ Edit → 모든 체크박스 해제 → Save changes
```

⚠️ **보안 경고**: 버킷이 공개됩니다. CloudFront 사용 시에는 불필요한 설정입니다.

---

## 📜 3단계: Bucket Policy 추가

### Permissions → Bucket Policy → Edit

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

**Save changes 클릭**

---

## 🌐 4단계: app.hosting.kr DNS 설정

### DNS 레코드 추가

1. **app.hosting.kr 로그인**
   - 도메인 관리 → kollabkorea.com → DNS 설정

2. **CNAME 레코드 추가**

#### 방법 A: www 서브도메인만 사용 (권장)

```
Type: CNAME
Host: www
Value: kollabkorea.s3-website.ap-northeast-2.amazonaws.com
TTL: 300
```

#### 방법 B: 루트 도메인 (app.hosting.kr이 지원하는 경우)

```
Type: ALIAS 또는 ANAME
Host: @ (또는 kollabkorea.com)
Value: kollabkorea.s3-website.ap-northeast-2.amazonaws.com
TTL: 300
```

⚠️ **주의**: 
- 대부분의 DNS 서비스는 루트 도메인(@)에 CNAME을 지원하지 않습니다.
- app.hosting.kr이 ALIAS 레코드를 지원하는지 확인 필요
- 지원하지 않으면 `www.kollabkorea.com`만 사용 가능

3. **저장 및 전파 대기**
   - DNS 전파: 5분 ~ 48시간 (평균 1-2시간)

---

## ✅ 5단계: 테스트

### DNS 전파 확인

```bash
# 터미널에서 확인
dig www.kollabkorea.com
nslookup www.kollabkorea.com

# 웹에서 확인
https://dnschecker.org/?domain=www.kollabkorea.com
```

### 브라우저 테스트

```
http://www.kollabkorea.com
```

⚠️ **주의**: `https://`가 아닌 `http://`로 접속해야 합니다!

---

## 🔧 6단계: GitHub Actions 업데이트 (선택사항)

현재 배포는 이미 설정되어 있으므로 변경 불필요합니다.

---

## ❌ S3 단독 사용의 한계

### 1. HTTPS 불가
```
http://www.kollabkorea.com ✅ 작동
https://www.kollabkorea.com ❌ 작동 안 함 (SSL 인증서 없음)
```

### 2. 브라우저 경고
```
크롬: "주의 요함" 또는 "안전하지 않음"
파이어폭스: "안전하지 않은 연결"
```

### 3. SEO 불리
```
구글 검색 알고리즘: HTTPS 사이트를 우선 순위로 함
→ 검색 순위 하락
```

### 4. 서버 이동 시 불편
```
새 서버로 이동 시:
1. DNS 레코드 변경 필요
2. DNS 전파 대기 (최대 48시간)
3. 다운타임 발생 가능

CloudFront 사용 시:
1. Origin만 변경
2. 즉시 반영 (캐시 무효화)
3. DNS 변경 불필요
```

---

## 🆙 CloudFront로 업그레이드하는 방법

S3 단독 사용 후 나중에 CloudFront로 전환하려면:

### 추가 작업 필요

1. **ACM SSL 인증서 발급** (us-east-1)
2. **CloudFront Distribution 생성**
3. **DNS 레코드 변경** (S3 엔드포인트 → CloudFront 도메인)
4. **S3 버킷을 다시 Private으로 변경** (보안 강화)
5. **Bucket Policy 업데이트** (CloudFront만 접근 허용)

→ **처음부터 CloudFront를 사용하는 것이 훨씬 간단합니다!**

---

## 💰 비용 비교

### S3 단독
```
S3 스토리지 (50GB): $1.15/월
S3 데이터 전송: $0.09/GB (첫 10TB)
예상 비용: $3-5/월 (트래픽 5만 방문 기준)
```

### S3 + CloudFront
```
S3 스토리지 (50GB): $1.15/월
CloudFront 데이터 전송: $0.085/GB (S3보다 저렴!)
ACM SSL 인증서: 무료
예상 비용: $5-10/월 (트래픽 5만 방문 기준)
```

**결론**: CloudFront가 $2-5 더 비싸지만, HTTPS + CDN + 보안을 제공

---

## 🆘 문제 해결

### 1. "403 Forbidden" 에러

**원인**: Bucket Policy가 올바르게 설정되지 않음

**해결**:
```bash
1. S3 → kollabkorea → Permissions
2. Block public access 모두 해제 확인
3. Bucket Policy 재확인
4. Policy 적용 후 5분 대기
```

---

### 2. "404 Not Found" (서브 페이지 새로고침 시)

**원인**: Error document가 설정되지 않음

**해결**:
```bash
S3 → kollabkorea → Properties → Static website hosting
Error document: index.html
```

---

### 3. "이 사이트는 안전하지 않습니다" 경고

**원인**: HTTP를 사용하고 있음 (정상)

**해결**: CloudFront + HTTPS로 업그레이드

---

### 4. DNS 연결이 안 됨

**원인**: app.hosting.kr이 루트 도메인 CNAME을 지원하지 않음

**해결**:
```
옵션 1: www.kollabkorea.com만 사용
옵션 2: AWS Route 53으로 DNS 이전 (ALIAS 레코드 지원)
옵션 3: CloudFlare로 DNS 프록시 사용
```

---

## 📊 체크리스트

### 완료 확인
- [ ] S3 Static Website Hosting 활성화
- [ ] S3 Public Access 차단 해제
- [ ] Bucket Policy 추가
- [ ] app.hosting.kr DNS CNAME 레코드 추가
- [ ] DNS 전파 확인 (dnschecker.org)
- [ ] HTTP 접속 테스트
- [ ] 서브 페이지 라우팅 테스트

### 알고 있어야 할 것
- [ ] HTTPS 사용 불가 (HTTP만 가능)
- [ ] 브라우저 보안 경고 발생
- [ ] SEO에 불리
- [ ] 서버 이동 시 DNS 재설정 필요

---

## 🎯 권장사항

**프로덕션 배포라면:**
→ **`DOMAIN_CLOUDFRONT.md` 가이드를 따라 CloudFront + HTTPS 설정 권장**

**테스트 목적이라면:**
→ 이 가이드대로 S3 단독 사용 가능

**나중에 서버 이동 계획이 있다면:**
→ **지금 CloudFront를 설정하는 것이 훨씬 유리함!**
   - Origin만 변경하면 됨 (S3 → EC2/ECS/Lambda 등)
   - DNS 변경 불필요
   - 다운타임 없음

---

**마지막 업데이트**: 2026년 1월 8일
