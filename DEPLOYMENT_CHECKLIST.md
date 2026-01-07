# 🚀 KOLLAB KOREA - 빠른 배포 체크리스트

## ⚡ 5분 안에 배포하기

### 1단계: AWS S3 버킷 생성 (2분)
```bash
□ AWS S3 콘솔 접속
□ 버킷 만들기 (이름: kollab-brandpage)
□ 퍼블릭 액세스 차단 해제
□ 정적 웹사이트 호스팅 활성화
  - 인덱스: index.html
  - 오류: index.html
□ 버킷 정책 추가 (PublicReadGetObject)
```

### 2단계: IAM 사용자 생성 (1분)
```bash
□ IAM 콘솔 → 사용자 추가
□ 프로그래밍 방식 액세스 선택
□ 권한: AmazonS3FullAccess
□ 액세스 키 ID 복사 ✅
□ 비밀 액세스 키 복사 ✅
```

### 3단계: GitHub Secrets 설정 (1분)
```bash
GitHub 저장소 → Settings → Secrets and variables → Actions

필수 Secrets:
□ AWS_ACCESS_KEY_ID
□ AWS_SECRET_ACCESS_KEY  
□ AWS_REGION (예: ap-northeast-2)
□ S3_BUCKET_NAME (예: kollab-brandpage)

선택 Secrets:
□ CLOUDFRONT_DISTRIBUTION_ID (CloudFront 사용 시)
```

### 4단계: 배포 실행 (1분)
```bash
□ git add .
□ git commit -m "feat: S3 자동 배포 설정"
□ git push origin main
□ GitHub → Actions 탭에서 진행 상황 확인 ✅
```

---

## 📋 필수 정보 메모

### AWS 정보
```
AWS 리전: _________________ (예: ap-northeast-2)
S3 버킷 이름: _________________ (예: kollab-brandpage)
IAM 액세스 키 ID: _________________
IAM 비밀 키: _________________ (안전하게 보관!)
```

### 배포 URL
```
S3 Website URL:
http://[버킷이름].s3-website-[리전].amazonaws.com

예시:
http://kollab-brandpage.s3-website-ap-northeast-2.amazonaws.com
```

### CloudFront (선택)
```
Distribution ID: _________________
CloudFront URL: https://_________________.cloudfront.net
커스텀 도메인: https://_________________
```

---

## ✅ 배포 확인

### 테스트 항목
- [ ] 홈 페이지 로드
- [ ] Platform 페이지 (로드맵 아크 표시)
- [ ] About 페이지
- [ ] Brands 페이지
- [ ] Contact 페이지
- [ ] FAQ 페이지
- [ ] 페이지 라우팅 (뒤로가기/앞으로가기)
- [ ] 이미지 로드
- [ ] 모바일 반응형
- [ ] 데스크톱 레이아웃

---

## 🆘 빠른 문제 해결

### ❌ Access Denied
→ IAM 권한 확인, S3 버킷 정책 확인

### ❌ Build Failed  
→ 로컬에서 `npm run build` 테스트

### ❌ 404 on Refresh
→ S3 오류 문서를 index.html로 설정

### ❌ 변경사항 미반영
→ CloudFront 캐시 무효화 또는 시간 대기

---

## 📞 상세 가이드

자세한 내용은 `S3_DEPLOYMENT_GUIDE.md` 참조

---

**배포 준비 완료! 🎉**

