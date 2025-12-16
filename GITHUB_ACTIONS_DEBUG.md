# GitHub Actions 디버깅 가이드

## 🔍 S3 배포가 안되는 경우 체크리스트

### 1. GitHub Actions 실행 확인
1. GitHub 리포지토리 접속: `https://github.com/yigolabdev/kollabkorea`
2. **Actions** 탭 클릭
3. 최근 워크플로우 실행 내역 확인

**확인 사항:**
- ✅ 워크플로우가 실행되었는가?
- ✅ 모든 단계가 성공했는가?
- ❌ 실패한 단계가 있는가? → 로그 확인

---

### 2. GitHub Secrets 설정 확인

**필수 Secrets (모두 설정되어 있어야 함):**

#### 접속 경로:
```
GitHub Repository → Settings → Secrets and variables → Actions
```

#### 필수 Secrets 목록:
| Secret 이름 | 설명 | 예시 |
|------------|------|------|
| `AWS_ACCESS_KEY_ID` | AWS IAM 액세스 키 | `AKIAIOSFODNN7EXAMPLE` |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM 시크릿 키 | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` |
| `AWS_REGION` | S3 버킷 리전 | `us-west-2` 또는 `ap-northeast-2` |
| `S3_BUCKET` | S3 버킷 이름 | `kollabkorea` |

#### 선택 Secrets (CloudFront 사용 시):
| Secret 이름 | 설명 |
|------------|------|
| `CLOUDFRONT_DISTRIBUTION_ID` | CloudFront 배포 ID (선택) |

---

### 3. AWS IAM 권한 확인

GitHub Actions에서 사용하는 IAM 사용자가 다음 권한을 가지고 있어야 합니다:

#### 필수 S3 권한:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
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

#### CloudFront 권한 (선택):
```json
{
  "Effect": "Allow",
  "Action": [
    "cloudfront:CreateInvalidation"
  ],
  "Resource": "*"
}
```

---

### 4. S3 버킷 설정 확인

#### AWS S3 콘솔에서 확인:
1. S3 버킷 `kollabkorea` 접속
2. **Properties** 탭 → **Static website hosting** 활성화
3. **Permissions** 탭 → **Bucket policy** 설정

#### 필수 Bucket Policy:
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

---

### 5. 워크플로우 수동 실행

GitHub Actions가 자동으로 실행되지 않는 경우:

1. GitHub Repository → **Actions** 탭
2. 왼쪽 사이드바에서 **Deploy to AWS S3** 선택
3. 오른쪽 상단 **Run workflow** 버튼 클릭
4. **Run workflow** 확인

---

### 6. 일반적인 오류 및 해결 방법

#### ❌ "Access Denied" 오류
**원인**: IAM 권한 부족  
**해결**: IAM 사용자에게 S3 권한 추가

#### ❌ "NoSuchBucket" 오류
**원인**: S3 버킷 이름 오류 또는 리전 불일치  
**해결**: 
- `S3_BUCKET` Secret 값 확인
- `AWS_REGION` Secret 값 확인
- S3 버킷이 실제로 존재하는지 확인

#### ❌ "Invalid credentials" 오류
**원인**: AWS 자격 증명 오류  
**해결**:
- `AWS_ACCESS_KEY_ID` 재확인
- `AWS_SECRET_ACCESS_KEY` 재확인
- IAM 사용자가 활성화되어 있는지 확인

#### ❌ 워크플로우가 실행되지 않음
**원인**: 
- `.github/workflows/deploy.yml` 파일 누락
- 브랜치 이름 불일치 (main vs master)

**해결**:
- 워크플로우 파일 존재 확인
- `on.push.branches` 설정 확인

---

### 7. 로컬에서 AWS 연결 테스트

터미널에서 AWS CLI로 직접 테스트:

```bash
# AWS 자격 증명 설정
export AWS_ACCESS_KEY_ID="your-access-key"
export AWS_SECRET_ACCESS_KEY="your-secret-key"
export AWS_REGION="your-region"

# S3 버킷 목록 확인
aws s3 ls

# 특정 버킷 확인
aws s3 ls s3://kollabkorea

# 테스트 파일 업로드
echo "test" > test.txt
aws s3 cp test.txt s3://kollabkorea/test.txt

# 업로드 확인
aws s3 ls s3://kollabkorea/test.txt
```

---

### 8. 배포 확인

배포가 성공하면 다음 URL에서 사이트 확인:

```
http://kollabkorea.s3-website-[AWS_REGION].amazonaws.com
```

예시:
- `http://kollabkorea.s3-website-us-west-2.amazonaws.com`
- `http://kollabkorea.s3-website-ap-northeast-2.amazonaws.com`

---

## 🚨 긴급 체크리스트

배포가 안될 때 순서대로 확인:

- [ ] 1. GitHub Actions 탭에서 워크플로우 실행 여부 확인
- [ ] 2. 워크플로우 로그에서 오류 메시지 확인
- [ ] 3. GitHub Secrets 4개 모두 설정되어 있는지 확인
- [ ] 4. AWS IAM 사용자 권한 확인
- [ ] 5. S3 버킷 존재 및 리전 확인
- [ ] 6. S3 버킷 정책 설정 확인
- [ ] 7. 로컬에서 AWS CLI 테스트
- [ ] 8. 워크플로우 수동 실행 시도

---

## 📞 추가 도움이 필요한 경우

GitHub Actions 로그의 오류 메시지를 공유해주시면 더 정확한 진단이 가능합니다.

**로그 확인 방법:**
1. GitHub → Actions → 실패한 워크플로우 클릭
2. 실패한 단계 클릭
3. 전체 로그 복사

