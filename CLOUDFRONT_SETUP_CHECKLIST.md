# ✅ CloudFront 도메인 연결 체크리스트

**도메인**: kollabkorea.com  
**날짜**: 2026-01-11  
**작업자**: _____________

---

## Phase 1: ACM SSL 인증서 발급 (us-east-1)

- [ ] AWS Certificate Manager 접속 (리전: us-east-1)
- [ ] 인증서 요청 (kollabkorea.com, www.kollabkorea.com)
- [ ] DNS 검증 레코드 정보 복사
  ```
  레코드 이름: ___________________.kollabkorea.com
  레코드 값: ___________________.acm-validations.aws.
  ```
- [ ] app.hosting.kr에 CNAME 레코드 추가
- [ ] 인증서 상태 "발급됨" 확인 (5-30분 대기)

**인증서 ARN**: _______________________________________________

---

## Phase 2: CloudFront Distribution 생성

### Origin 설정
- [ ] CloudFront 콘솔 접속
- [ ] Create Distribution 클릭
- [ ] Origin Domain 설정
  - S3 버킷: `kollabkorea.s3.ap-northeast-2.amazonaws.com`
  - 또는 정적 웹사이트: `kollabkorea.s3-website.ap-northeast-2.amazonaws.com`
- [ ] Origin Access Control 설정 (OAC)

### Distribution 설정
- [ ] Viewer Protocol Policy: Redirect HTTP to HTTPS
- [ ] Alternate Domain Names (CNAMEs):
  - `kollabkorea.com`
  - `www.kollabkorea.com`
- [ ] Custom SSL Certificate: 발급받은 ACM 인증서 선택
- [ ] Default Root Object: `index.html`
- [ ] Create Distribution 클릭

### Error Pages 설정 (SPA 라우팅)
- [ ] 403 에러: `/index.html` (200 OK)
- [ ] 404 에러: `/index.html` (200 OK)

### S3 Bucket Policy
- [ ] S3 버킷에 CloudFront 접근 권한 추가
  ```json
  "AWS:SourceArn": "arn:aws:cloudfront::계정ID:distribution/Distribution-ID"
  ```

**Distribution ID**: _______________________________________________  
**Domain Name**: _______________________________________________

---

## Phase 3: DNS 설정 (app.hosting.kr)

- [ ] CloudFront Distribution Domain Name 복사
- [ ] app.hosting.kr DNS 관리 접속

### Root 도메인
- [ ] CNAME 레코드 추가
  - 호스트: `@` 또는 비워두기
  - 값: `d______________.cloudfront.net`
  - TTL: 3600

### www 서브도메인
- [ ] CNAME 레코드 추가
  - 호스트: `www`
  - 값: `d______________.cloudfront.net`
  - TTL: 3600

- [ ] DNS 전파 대기 (10-30분)

---

## Phase 4: 테스트 및 검증

### HTTPS 접속 테스트
- [ ] https://kollabkorea.com 접속
- [ ] https://www.kollabkorea.com 접속
- [ ] SSL 인증서 유효성 확인 (자물쇠 아이콘)

### 라우팅 테스트
- [ ] https://kollabkorea.com/about
- [ ] https://kollabkorea.com/platform
- [ ] https://kollabkorea.com/brands
- [ ] https://kollabkorea.com/contact
- [ ] https://kollabkorea.com/faq
- [ ] 각 페이지 새로고침 테스트 (403/404 에러 없어야 함)

### GitHub Actions 업데이트
- [ ] `.github/workflows/deploy.yml` 수정
- [ ] CloudFront Invalidation 추가
- [ ] GitHub Secrets 추가
  - Name: `CLOUDFRONT_DISTRIBUTION_ID`
  - Value: `_______________`
- [ ] 배포 테스트 (git push)

---

## 최종 확인

- [ ] 모든 페이지 HTTPS로 정상 접속
- [ ] SPA 라우팅 정상 동작
- [ ] GitHub Actions 자동 배포 정상 동작
- [ ] CloudFront 캐시 무효화 정상 동작

---

## 📝 메모

```
작업 시작 시간: __:__
작업 완료 시간: __:__

문제 발생 시:
- 




해결 방법:
- 




```

---

## 🎉 완료!

**최종 배포 URL**: https://kollabkorea.com

**담당자 서명**: _____________ **날짜**: _____________
