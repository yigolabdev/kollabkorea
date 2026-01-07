# KOLLAB KOREA - S3 배포 가이드

## 📋 목차
1. [사전 준비](#사전-준비)
2. [AWS S3 설정](#aws-s3-설정)
3. [GitHub Secrets 설정](#github-secrets-설정)
4. [배포 실행](#배포-실행)
5. [CloudFront 설정 (선택)](#cloudfront-설정)
6. [문제 해결](#문제-해결)

---

## 🚀 사전 준비

### 필요한 것들
- ✅ GitHub 계정 및 저장소
- ✅ AWS 계정
- ✅ AWS IAM 사용자 (프로그래밍 방식 액세스)

---

## 📦 AWS S3 설정

### 1. S3 버킷 생성

```bash
# AWS Console에서 진행
1. AWS S3 콘솔 접속
2. "버킷 만들기" 클릭
3. 버킷 이름 입력 (예: kollab-brandpage)
4. 리전 선택 (예: ap-northeast-2 - 서울)
5. "퍼블릭 액세스 차단 설정" 해제 ✅
6. 버킷 만들기
```

### 2. S3 버킷 정적 웹사이트 호스팅 설정

```bash
1. 생성한 버킷 선택
2. "속성" 탭 클릭
3. 스크롤 다운 → "정적 웹 사이트 호스팅" 편집
4. 활성화 선택
5. 인덱스 문서: index.html
6. 오류 문서: index.html (SPA 라우팅용)
7. 저장
```

### 3. S3 버킷 정책 설정

버킷 → "권한" 탭 → "버킷 정책" → 편집:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    }
  ]
}
```

**⚠️ YOUR-BUCKET-NAME을 실제 버킷 이름으로 변경!**

---

## 🔐 AWS IAM 사용자 생성

### 1. IAM 사용자 생성

```bash
1. AWS IAM 콘솔 접속
2. "사용자" → "사용자 추가"
3. 사용자 이름: github-actions-deploy
4. "프로그래밍 방식 액세스" 선택
5. 다음
```

### 2. 권한 설정

**옵션 A: 기존 정책 직접 연결**
- `AmazonS3FullAccess` (S3 배포용)
- `CloudFrontFullAccess` (CloudFront 사용 시)

**옵션 B: 최소 권한 정책 (권장)**

사용자 정의 정책 생성:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:PutObjectAcl",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::YOUR-BUCKET-NAME",
        "arn:aws:s3:::YOUR-BUCKET-NAME/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation"
      ],
      "Resource": "*"
    }
  ]
}
```

### 3. 액세스 키 저장

- ✅ **액세스 키 ID** 복사
- ✅ **비밀 액세스 키** 복사
- ⚠️ **비밀 키는 다시 볼 수 없으니 안전하게 보관!**

---

## 🔑 GitHub Secrets 설정

### 1. GitHub 저장소 → Settings → Secrets and variables → Actions

### 2. New repository secret 클릭하여 다음 추가:

| Secret Name | 값 | 예시 |
|------------|-----|------|
| `AWS_ACCESS_KEY_ID` | IAM 액세스 키 ID | `AKIAIOSFODNN7EXAMPLE` |
| `AWS_SECRET_ACCESS_KEY` | IAM 비밀 액세스 키 | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` |
| `AWS_REGION` | AWS 리전 | `ap-northeast-2` |
| `S3_BUCKET_NAME` | S3 버킷 이름 | `kollab-brandpage` |
| `CLOUDFRONT_DISTRIBUTION_ID` | CloudFront ID (선택) | `E1234567890ABC` |

### 설정 방법:

```bash
1. GitHub 저장소 페이지
2. Settings 클릭
3. 왼쪽 메뉴 → Secrets and variables → Actions
4. "New repository secret" 버튼 클릭
5. Name: AWS_ACCESS_KEY_ID
6. Secret: (IAM에서 받은 액세스 키 ID 붙여넣기)
7. "Add secret" 클릭
8. 위 표의 모든 secret에 대해 반복
```

---

## 🚀 배포 실행

### 자동 배포 (권장)

```bash
# main 또는 master 브랜치에 push하면 자동 배포
git add .
git commit -m "feat: 로드맵 아크 디자인 통합 및 배포 설정"
git push origin main
```

### 배포 확인

```bash
1. GitHub 저장소 → Actions 탭
2. 최신 workflow 실행 확인
3. 각 단계별 로그 확인
4. ✅ 성공 시 S3 URL로 접속 테스트
```

### S3 URL

```
http://YOUR-BUCKET-NAME.s3-website-AWS-REGION.amazonaws.com

예시:
http://kollab-brandpage.s3-website-ap-northeast-2.amazonaws.com
```

---

## 🌐 CloudFront 설정 (선택 - HTTPS 및 성능 향상)

### 1. CloudFront Distribution 생성

```bash
1. AWS CloudFront 콘솔 접속
2. "Create Distribution" 클릭
3. Origin domain: S3 버킷 웹사이트 엔드포인트 선택
4. Viewer protocol policy: Redirect HTTP to HTTPS
5. Default root object: index.html
6. Error pages 설정:
   - HTTP 403 → /index.html (SPA 라우팅)
   - HTTP 404 → /index.html (SPA 라우팅)
7. Create Distribution
```

### 2. Distribution ID 복사

```bash
1. CloudFront Distribution 목록에서 ID 복사
2. GitHub Secrets에 CLOUDFRONT_DISTRIBUTION_ID 추가
```

### 3. 커스텀 도메인 연결 (선택)

```bash
1. Route 53 또는 도메인 등록 업체에서 CNAME 레코드 추가
2. CloudFront Distribution → Alternate domain names (CNAMEs) 추가
3. SSL/TLS 인증서 설정 (AWS Certificate Manager)
```

---

## 🛠️ 문제 해결

### ❌ 배포 실패 시

#### 1. AWS 권한 오류
```bash
Error: Access Denied

해결:
- IAM 사용자 권한 확인
- S3 버킷 정책 확인
- GitHub Secrets 값이 정확한지 확인
```

#### 2. 빌드 오류
```bash
Error: Build failed

해결:
- 로컬에서 npm run build 테스트
- package.json의 dependencies 확인
- .env 파일이 필요한 경우 GitHub Secrets에 추가
```

#### 3. 404 에러 (SPA 라우팅)
```bash
Error: 404 Not Found on refresh

해결:
S3 버킷 → 속성 → 정적 웹사이트 호스팅
- 오류 문서: index.html로 설정
```

#### 4. CloudFront 캐시 문제
```bash
변경사항이 반영되지 않음

해결:
- CloudFront Invalidation 실행
- 또는 GitHub Actions가 자동으로 실행 (설정 시)
```

---

## 📝 배포 체크리스트

### 배포 전
- [ ] AWS S3 버킷 생성 완료
- [ ] S3 정적 웹사이트 호스팅 활성화
- [ ] S3 버킷 정책 설정 완료
- [ ] IAM 사용자 생성 및 권한 부여
- [ ] GitHub Secrets 모두 설정
- [ ] 로컬에서 `npm run build` 테스트

### 배포 후
- [ ] GitHub Actions 성공 확인
- [ ] S3 URL 접속 테스트
- [ ] 모든 페이지 라우팅 동작 확인
- [ ] 이미지 및 에셋 로드 확인
- [ ] 모바일/데스크톱 반응형 확인

---

## 🔄 배포 플로우

```
개발자
  ↓
git push origin main
  ↓
GitHub Actions 트리거
  ↓
1. 코드 체크아웃
2. Node.js 설치
3. 의존성 설치 (npm ci)
4. 프로젝트 빌드 (npm run build)
5. AWS 자격증명 설정
6. S3에 dist/ 폴더 업로드
7. CloudFront 캐시 무효화 (선택)
  ↓
배포 완료 ✅
  ↓
사용자가 웹사이트 접속
```

---

## 📞 추가 도움말

### AWS 비용
- S3: 저장량 + 전송량 기준 (무료 티어: 5GB 저장, 20,000 GET 요청)
- CloudFront: 전송량 기준 (무료 티어: 50GB/월)

### 보안 권장사항
- ✅ IAM 사용자는 최소 권한 원칙
- ✅ GitHub Secrets 절대 코드에 포함하지 않기
- ✅ 정기적으로 액세스 키 로테이션
- ✅ CloudFront로 HTTPS 사용

### 성능 최적화
- ✅ CloudFront CDN 사용
- ✅ 이미지 최적화 (WebP, 압축)
- ✅ Gzip/Brotli 압축 활성화
- ✅ 캐시 헤더 설정

---

## 🎉 완료!

이제 `git push`만 하면 자동으로 S3에 배포됩니다!

**배포 URL 예시:**
- S3: `http://kollab-brandpage.s3-website-ap-northeast-2.amazonaws.com`
- CloudFront: `https://d1234567890abc.cloudfront.net`
- 커스텀 도메인: `https://kollab.kr`

