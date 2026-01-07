# 🔑 GitHub Secrets 설정 가이드
## yigolabdev/kollabkorea

---

## 📍 설정 위치

**URL**: https://github.com/yigolabdev/kollabkorea/settings/secrets/actions

또는:

```
GitHub 저장소 → Settings → Secrets and variables → Actions
```

---

## 🔐 필수 Secrets (4개)

### 1️⃣ AWS_ACCESS_KEY_ID

```
Name: AWS_ACCESS_KEY_ID
Secret: AKIA로 시작하는 20자 문자열

예시: AKIAIOSFODNN7EXAMPLE
```

**얻는 방법:**
1. AWS IAM 콘솔
2. github-actions-kollabkorea 사용자 선택
3. 보안 자격 증명 탭
4. 액세스 키 만들기
5. **액세스 키 ID 복사**

---

### 2️⃣ AWS_SECRET_ACCESS_KEY

```
Name: AWS_SECRET_ACCESS_KEY
Secret: 40자 영숫자 문자열

예시: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

**얻는 방법:**
1. 액세스 키 생성 시 함께 표시됨
2. **⚠️ 한 번만 표시되므로 반드시 저장!**
3. 분실 시 새로운 액세스 키 생성 필요

---

### 3️⃣ AWS_REGION

```
Name: AWS_REGION
Secret: ap-northeast-2
```

**고정 값**: `ap-northeast-2` (서울 리전)

---

### 4️⃣ S3_BUCKET_NAME

```
Name: S3_BUCKET_NAME
Secret: kollabkorea
```

**고정 값**: `kollabkorea`

---

## 🎯 선택 Secret (CloudFront 사용 시)

### 5️⃣ CLOUDFRONT_DISTRIBUTION_ID (선택)

```
Name: CLOUDFRONT_DISTRIBUTION_ID
Secret: E로 시작하는 14자 문자열

예시: E1234567890ABC
```

**얻는 방법:**
1. AWS CloudFront 콘솔
2. Distribution 목록에서 ID 확인
3. ID 열의 값 복사

---

## 📝 설정 단계별 가이드

### 1단계: GitHub 저장소 접속
```
https://github.com/yigolabdev/kollabkorea
```

### 2단계: Settings 메뉴
```
상단 탭 → Settings 클릭
```

### 3단계: Secrets 메뉴
```
왼쪽 사이드바 → Secrets and variables → Actions 클릭
```

### 4단계: Secret 추가
```
"New repository secret" 버튼 클릭
```

### 5단계: 첫 번째 Secret 입력
```
Name: AWS_ACCESS_KEY_ID
Secret: [IAM에서 복사한 액세스 키 ID]
"Add secret" 버튼 클릭
```

### 6단계: 나머지 Secrets 반복
```
위 과정을 4번 반복:
1. AWS_ACCESS_KEY_ID ✅
2. AWS_SECRET_ACCESS_KEY
3. AWS_REGION
4. S3_BUCKET_NAME
```

---

## ✅ 설정 확인 체크리스트

### GitHub Secrets 페이지에 표시되어야 할 항목:

```
□ AWS_ACCESS_KEY_ID          Updated XX seconds ago
□ AWS_SECRET_ACCESS_KEY      Updated XX seconds ago
□ AWS_REGION                 Updated XX seconds ago
□ S3_BUCKET_NAME            Updated XX seconds ago
□ CLOUDFRONT_DISTRIBUTION_ID Updated XX seconds ago (선택)
```

---

## 🔍 설정 값 확인표

| Secret Name | 값 | 확인 |
|------------|-----|------|
| AWS_ACCESS_KEY_ID | AKIA로 시작 (20자) | [ ] |
| AWS_SECRET_ACCESS_KEY | 40자 영숫자 | [ ] |
| AWS_REGION | `ap-northeast-2` | [ ] |
| S3_BUCKET_NAME | `kollabkorea` | [ ] |
| CLOUDFRONT_DISTRIBUTION_ID | E로 시작 (14자, 선택) | [ ] |

---

## 🛡️ 보안 주의사항

### ✅ DO (해야 할 것)
- GitHub Secrets에만 저장
- 액세스 키 안전하게 보관
- 주기적으로 키 교체 (3-6개월)
- 최소 권한 원칙 적용

### ❌ DON'T (하지 말아야 할 것)
- 코드에 하드코딩
- 공개 저장소에 노출
- .env 파일을 Git에 커밋
- 스크린샷 공유 시 키 노출

---

## 🆘 문제 해결

### ❌ Secret이 보이지 않음
```
해결: Secrets는 추가 후 값을 다시 볼 수 없습니다.
이름만 표시됩니다. 정상입니다.
```

### ❌ AWS 권한 오류
```
해결: 
1. AWS_ACCESS_KEY_ID 오타 확인
2. AWS_SECRET_ACCESS_KEY 오타 확인
3. IAM 사용자 권한 확인 (AmazonS3FullAccess)
```

### ❌ 리전 오류
```
해결: AWS_REGION이 정확히 ap-northeast-2인지 확인
(하이픈 포함, 소문자)
```

### ❌ S3 버킷을 찾을 수 없음
```
해결: S3_BUCKET_NAME이 정확히 kollabkorea인지 확인
(소문자, 띄어쓰기 없음)
```

---

## 🔄 Secret 수정/삭제

### Secret 수정
```
1. Secrets 페이지에서 해당 Secret 클릭
2. "Update secret" 버튼 클릭
3. 새 값 입력
4. "Update secret" 확인
```

### Secret 삭제
```
1. Secrets 페이지에서 해당 Secret 클릭
2. "Remove secret" 버튼 클릭
3. 삭제 확인
```

---

## 📋 빠른 복사용 (정확한 값)

```bash
# Secret Names (정확히 입력)
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_REGION
S3_BUCKET_NAME
CLOUDFRONT_DISTRIBUTION_ID

# Fixed Values
AWS_REGION: ap-northeast-2
S3_BUCKET_NAME: kollabkorea
```

---

## 🎉 설정 완료 후

Secrets 설정이 완료되면:

```bash
git add .
git commit -m "feat: 배포 설정 완료"
git push origin main
```

GitHub Actions가 자동으로:
1. 프로젝트 빌드
2. S3에 배포
3. 배포 완료 알림

**배포 진행 확인**: https://github.com/yigolabdev/kollabkorea/actions

---

## 📞 추가 도움

- 전체 배포 가이드: `DEPLOY_README.md`
- 상세 S3 가이드: `S3_DEPLOYMENT_GUIDE.md`
- 빠른 체크리스트: `DEPLOYMENT_CHECKLIST.md`

**설정 완료! 이제 자동 배포가 가능합니다! 🚀**

