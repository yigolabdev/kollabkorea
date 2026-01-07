# 🚀 KOLLAB KOREA - 배포 가이드

## 📍 프로젝트 정보
- **GitHub**: `yigolabdev/kollabkorea`
- **S3 버킷**: `kollabkorea`
- **프로젝트**: KOLLAB KOREA 브랜드 입점 신청 랜딩페이지

---

## ⚡ 빠른 시작 (5분 배포)

### 1단계: AWS S3 버킷 설정 ✅

#### S3 버킷 생성
```bash
버킷 이름: kollabkorea
리전: ap-northeast-2 (서울)
퍼블릭 액세스: 차단 해제
```

#### 정적 웹사이트 호스팅 활성화
```bash
1. S3 콘솔 → kollabkorea 버킷 선택
2. 속성 탭 → 정적 웹 사이트 호스팅 → 편집
3. 활성화 선택
4. 인덱스 문서: index.html
5. 오류 문서: index.html ⚠️ 매우 중요! (SPA 라우팅용)
6. 저장
```

**⚠️ 중요:** 오류 문서를 `index.html`로 설정하지 않으면 페이지 새로고침 시 404 에러가 발생합니다!

#### S3 버킷 정책 설정
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

### 2단계: IAM 사용자 생성 ✅

```bash
1. AWS IAM 콘솔
2. 사용자 추가: github-actions-kollabkorea
3. 프로그래밍 방식 액세스 체크
4. 권한: AmazonS3FullAccess
5. 액세스 키 저장:
   - AWS_ACCESS_KEY_ID: AKIA...
   - AWS_SECRET_ACCESS_KEY: wJal...
```

### 3단계: GitHub Secrets 설정 ✅

**GitHub 저장소**: https://github.com/yigolabdev/kollabkorea

```bash
Settings → Secrets and variables → Actions → New repository secret
```

| Secret Name | 값 |
|------------|-----|
| `AWS_ACCESS_KEY_ID` | AKIA... (IAM에서 복사) |
| `AWS_SECRET_ACCESS_KEY` | wJal... (IAM에서 복사) |
| `AWS_REGION` | `ap-northeast-2` |
| `S3_BUCKET_NAME` | `kollabkorea` |

### 4단계: 배포 실행 🚀

```bash
# 로컬에서 변경사항 커밋
git add .
git commit -m "feat: Platform 페이지 로드맵 디자인 및 자동 배포 설정"
git push origin main

# GitHub Actions가 자동으로 배포 시작!
```

---

## 🌐 배포 URL

### S3 Website URL
```
http://kollabkorea.s3-website-ap-northeast-2.amazonaws.com
```

### CloudFront URL (선택 - HTTPS용)
CloudFront 설정 후:
```
https://d1234567890.cloudfront.net
또는
https://kollab.kr (커스텀 도메인)
```

---

## 📋 배포 체크리스트

### AWS 설정
- [ ] S3 버킷 `kollabkorea` 생성 완료
- [ ] 정적 웹사이트 호스팅 활성화
- [ ] 버킷 정책 추가 (PublicReadGetObject)
- [ ] IAM 사용자 `github-actions-kollabkorea` 생성
- [ ] 액세스 키 ID와 비밀 키 저장

### GitHub 설정
- [ ] https://github.com/yigolabdev/kollabkorea 접속
- [ ] Settings → Secrets에 4개 값 추가:
  - [ ] AWS_ACCESS_KEY_ID
  - [ ] AWS_SECRET_ACCESS_KEY
  - [ ] AWS_REGION
  - [ ] S3_BUCKET_NAME
- [ ] `.github/workflows/deploy.yml` 파일 존재 확인

### 배포 실행
- [ ] `git push origin main` 실행
- [ ] GitHub → Actions 탭에서 진행 확인
- [ ] 배포 성공 확인 (녹색 체크)
- [ ] S3 URL 접속 테스트

### 사이트 테스트
- [ ] 홈 페이지
- [ ] Platform 페이지 (로드맵 아크)
- [ ] About 페이지
- [ ] Brands 페이지
- [ ] Contact 페이지
- [ ] FAQ 페이지
- [ ] 모바일 반응형
- [ ] 페이지 라우팅

---

## 🔄 배포 프로세스

```
개발자
  ↓
git push origin main
  ↓
GitHub: yigolabdev/kollabkorea
  ↓
GitHub Actions 자동 트리거
  ↓
1. 코드 체크아웃
2. Node.js 18 설치
3. npm ci (의존성 설치)
4. npm run build (Vite 빌드)
5. AWS 자격증명 설정
6. S3 kollabkorea 버킷에 업로드
7. CloudFront 캐시 무효화 (선택)
  ↓
배포 완료! ✅
  ↓
http://kollabkorea.s3-website-ap-northeast-2.amazonaws.com
```

---

## 🛠️ 빠른 명령어

### 로컬 개발
```bash
npm run dev
# http://localhost:3001
```

### 로컬 빌드 테스트
```bash
npm run build
npm run preview
```

### 배포
```bash
git add .
git commit -m "your message"
git push origin main
```

### 배포 확인
```bash
# GitHub Actions 페이지
https://github.com/yigolabdev/kollabkorea/actions
```

---

## 🆘 문제 해결

### ❌ Access Denied (S3)
```bash
해결:
1. IAM 사용자 권한 확인 (AmazonS3FullAccess)
2. S3 버킷 정책 확인 (PublicReadGetObject)
3. GitHub Secrets 값 재확인
```

### ❌ Build Failed
```bash
해결:
1. 로컬에서 npm run build 테스트
2. package.json 의존성 확인
3. GitHub Actions 로그 확인
```

### ❌ 404 on Page Refresh
```bash
증상:
- /platform 등 페이지에서 새로고침 시 404 에러
- 직접 URL 입력 시 404 에러

원인:
S3가 실제 파일 경로를 찾으려고 시도 (SPA 라우팅 문제)

해결:
1. S3 버킷 → 속성 → 정적 웹사이트 호스팅 → 편집
2. 오류 문서: index.html 설정 확인 ⚠️ 매우 중요!
3. 변경 사항 저장
4. 브라우저 캐시 지우고 재시도 (Ctrl+Shift+R 또는 Cmd+Shift+R)
```

### ❌ GitHub Secrets 오류
```bash
해결:
Settings → Secrets and variables → Actions
4개 Secret 모두 정확히 입력되었는지 확인:
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- AWS_REGION (ap-northeast-2)
- S3_BUCKET_NAME (kollabkorea)
```

---

## 📞 상세 가이드

더 자세한 내용은 다음 파일 참조:
- `S3_DEPLOYMENT_GUIDE.md` - 전체 상세 가이드
- `DEPLOYMENT_CHECKLIST.md` - 빠른 체크리스트

---

## 🎉 배포 준비 완료!

**GitHub 저장소**: https://github.com/yigolabdev/kollabkorea  
**S3 버킷**: kollabkorea  
**배포 URL**: http://kollabkorea.s3-website-ap-northeast-2.amazonaws.com

지금 바로 AWS 설정을 시작하고 `git push`로 배포하세요! 🚀

