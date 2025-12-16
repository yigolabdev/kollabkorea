# 🔐 GitHub Secrets 설정 가이드

## ⚠️ 중요: 배포를 위해 반드시 설정해야 합니다!

GitHub Actions가 AWS S3에 자동 배포하려면 다음 Secrets를 설정해야 합니다.

---

## 📝 설정할 Secrets 목록

### 필수 Secrets (4개)

| Secret 이름 | 설명 | 예시 값 |
|-------------|------|---------|
| `AWS_ACCESS_KEY_ID` | AWS IAM 사용자의 Access Key ID | `AKIAIOSFODNN7EXAMPLE` |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM 사용자의 Secret Access Key | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` |
| `AWS_REGION` | AWS 리전 (서울) | `ap-northeast-2` |
| `S3_BUCKET` | S3 버킷 이름 | `kollabkorea` |

### 선택 Secrets (CloudFront 사용 시)

| Secret 이름 | 설명 | 예시 값 |
|-------------|------|---------|
| `CLOUDFRONT_DISTRIBUTION_ID` | CloudFront Distribution ID | `E1234567890ABC` |

---

## 🚀 설정 방법 (단계별)

### 1단계: GitHub 저장소로 이동

```
https://github.com/yigolabdev/kollabkorea
```

### 2단계: Settings 메뉴 접근

1. 저장소 상단 메뉴에서 **Settings** 클릭
2. 좌측 사이드바에서 **Secrets and variables** 확장
3. **Actions** 클릭

### 3단계: Secrets 추가

각 Secret에 대해 다음을 반복:

1. **New repository secret** 버튼 클릭
2. **Name** 필드에 Secret 이름 입력 (예: `AWS_ACCESS_KEY_ID`)
3. **Secret** 필드에 값 입력
4. **Add secret** 버튼 클릭

---

## 🔑 AWS Credentials 확인 방법

### AWS Access Key 확인/생성

1. **AWS Console** 로그인
2. 우측 상단 사용자명 클릭 → **Security credentials**
3. **Access keys** 섹션에서:
   - 기존 키가 있으면 사용
   - 없으면 **Create access key** 클릭
   - ⚠️ Secret Key는 생성 시 한 번만 표시됩니다!

### AWS Region 확인

- 서울 리전: `ap-northeast-2`
- 도쿄 리전: `ap-northeast-1`
- 버지니아 리전: `us-east-1`

### S3 Bucket 이름 확인

```bash
# AWS CLI로 확인
aws s3 ls

# 또는 AWS Console에서
# S3 서비스 → 버킷 목록 확인
```

---

## ✅ 설정 확인 체크리스트

설정 완료 후 다음을 확인하세요:

- [ ] `AWS_ACCESS_KEY_ID` 추가됨
- [ ] `AWS_SECRET_ACCESS_KEY` 추가됨
- [ ] `AWS_REGION` = `ap-northeast-2` 추가됨
- [ ] `S3_BUCKET` = `kollabkorea` 추가됨
- [ ] (선택) `CLOUDFRONT_DISTRIBUTION_ID` 추가됨

---

## 🧪 배포 테스트

Secrets 설정 후 배포를 테스트하세요:

### 방법 1: 코드 푸시

```bash
# 간단한 변경사항 추가
echo "# Test" >> README.md
git add README.md
git commit -m "test: 배포 테스트"
git push origin main
```

### 방법 2: 수동 워크플로우 실행

1. GitHub 저장소 → **Actions** 탭
2. **Deploy to AWS S3** 워크플로우 선택
3. **Run workflow** 버튼 클릭
4. **Run workflow** 확인

---

## 📊 배포 상태 확인

### GitHub Actions 로그

```
https://github.com/yigolabdev/kollabkorea/actions
```

### 배포 성공 시

```
✅ Deployment completed successfully!
🌐 Site URL: http://kollabkorea.s3-website-ap-northeast-2.amazonaws.com
```

### 배포 실패 시

1. **Actions** 탭에서 실패한 워크플로우 클릭
2. 빨간색 X 표시된 단계 확인
3. 로그에서 에러 메시지 확인

---

## 🐛 일반적인 에러 해결

### Error: "Credentials not set"

**원인:** Secrets가 설정되지 않았거나 이름이 잘못됨

**해결:**
- Secret 이름이 정확한지 확인 (대소문자 구분)
- 모든 필수 Secrets가 추가되었는지 확인

### Error: "Access Denied"

**원인:** IAM 권한 부족

**해결:**
IAM 사용자에 다음 정책 추가:

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
        "arn:aws:s3:::kollabkorea",
        "arn:aws:s3:::kollabkorea/*"
      ]
    }
  ]
}
```

### Error: "Bucket does not exist"

**원인:** S3 버킷 이름이 잘못됨

**해결:**
- `S3_BUCKET` Secret 값 확인
- AWS Console에서 버킷 이름 확인

---

## 🔒 보안 모범 사례

### ✅ DO (해야 할 것)

- ✅ IAM 사용자에 최소 권한만 부여
- ✅ Access Key를 정기적으로 교체
- ✅ Secrets를 절대 코드에 하드코딩하지 않기
- ✅ CloudTrail로 API 호출 모니터링

### ❌ DON'T (하지 말아야 할 것)

- ❌ Root 계정의 Access Key 사용
- ❌ Secrets를 공개 저장소에 커밋
- ❌ 여러 프로젝트에서 같은 Access Key 공유
- ❌ Access Key를 Slack/Discord에 공유

---

## 📞 도움이 필요하신가요?

### AWS IAM 권한 설정 도움

```bash
# IAM 정책 생성 (AWS CLI)
aws iam create-policy \
  --policy-name KollabKoreaS3DeployPolicy \
  --policy-document file://iam-policy.json
```

### GitHub Actions 디버깅

```yaml
# .github/workflows/deploy.yml에 디버그 추가
- name: Debug AWS Credentials
  run: |
    echo "AWS Region: ${{ secrets.AWS_REGION }}"
    echo "S3 Bucket: ${{ secrets.S3_BUCKET }}"
    aws sts get-caller-identity
```

---

## 🎉 설정 완료!

모든 Secrets가 설정되었다면:

1. ✅ 코드를 푸시하면 자동으로 배포됩니다
2. ✅ GitHub Actions에서 배포 상태를 확인할 수 있습니다
3. ✅ 배포된 사이트는 S3 URL에서 확인할 수 있습니다

```
🌐 http://kollabkorea.s3-website.ap-northeast-2.amazonaws.com
```

---

<div align="center">
  <strong>Happy Deploying! 🚀</strong>
</div>

