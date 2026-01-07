# 🔧 S3 SPA 라우팅 문제 해결 가이드

## ❌ 문제 증상

```
1. 메인 페이지 (/) 접속 → ✅ 정상
2. Platform 페이지 (/platform) 이동 → ✅ 정상
3. 브라우저 새로고침 (F5) → ❌ 404 에러!
4. URL 직접 입력 → ❌ 404 에러!
```

---

## 🔍 원인

### React SPA vs S3 정적 호스팅

**React (SPA):**
```
/ → index.html 로드 → React Router가 /platform 처리 ✅
/platform → index.html 로드 → React Router가 /platform 처리 ✅
```

**S3 정적 호스팅 (오류 문서 미설정):**
```
/ → index.html 찾기 → 제공 ✅
/platform → platform 파일 찾기 → 없음 → 404 ❌
```

**해결책:** 모든 404 에러를 index.html로 리다이렉트!

---

## ✅ 해결 방법

### 단계별 가이드 (5분)

#### 1️⃣ AWS S3 콘솔 접속
```
https://s3.console.aws.amazon.com/s3/
```

#### 2️⃣ kollabkorea 버킷 선택
```
1. 버킷 목록에서 "kollabkorea" 클릭
2. "속성" 탭 클릭
```

#### 3️⃣ 정적 웹사이트 호스팅 설정
```
1. 스크롤 다운 → "정적 웹 사이트 호스팅" 섹션 찾기
2. "편집" 버튼 클릭
```

#### 4️⃣ 오류 문서 설정
```
현재 설정:
┌─────────────────────────────────────┐
│ 인덱스 문서: index.html            │
│ 오류 문서: [비어있음 또는 다른 값]   │ ← 여기가 문제!
└─────────────────────────────────────┘

올바른 설정:
┌─────────────────────────────────────┐
│ 인덱스 문서: index.html            │
│ 오류 문서: index.html              │ ← 이렇게 변경!
└─────────────────────────────────────┘
```

**입력:**
```
인덱스 문서: index.html
오류 문서: index.html
```

#### 5️⃣ 변경 사항 저장
```
"변경 사항 저장" 버튼 클릭
```

---

## 🧪 테스트

### 설정 후 확인

```bash
# 1. 메인 페이지 접속
http://kollabkorea.s3-website-ap-northeast-2.amazonaws.com/

# 2. Platform 페이지로 이동
클릭: Platform 메뉴

# 3. 새로고침 (F5 또는 Cmd+R)
✅ 404 에러 없이 정상 표시되어야 함!

# 4. URL 직접 입력
http://kollabkorea.s3-website-ap-northeast-2.amazonaws.com/platform
✅ 정상 접속되어야 함!

# 5. 모든 페이지 테스트
/about → 새로고침 → ✅
/brands → 새로고침 → ✅
/contact → 새로고침 → ✅
/faq → 새로고침 → ✅
```

---

## 🔄 브라우저 캐시 문제

### 설정 후에도 404가 나온다면?

**브라우저 캐시 지우기:**

```bash
# Chrome / Edge
Ctrl + Shift + Delete (Windows)
Cmd + Shift + Delete (Mac)

# 또는 강력 새로고침
Ctrl + Shift + R (Windows)
Cmd + Shift + R (Mac)

# Firefox
Ctrl + Shift + Delete (Windows)
Cmd + Shift + Delete (Mac)
```

**시크릿 모드로 테스트:**
```
Ctrl + Shift + N (Windows)
Cmd + Shift + N (Mac)
```

---

## 📋 체크리스트

설정 확인:

- [ ] AWS S3 콘솔 접속
- [ ] kollabkorea 버킷 선택
- [ ] 속성 탭 → 정적 웹사이트 호스팅
- [ ] 오류 문서가 정확히 `index.html`로 설정됨
- [ ] 변경 사항 저장 완료
- [ ] 브라우저 캐시 지움
- [ ] 모든 페이지에서 새로고침 테스트 ✅

---

## 🎯 작동 원리

### 오류 문서 설정 전:
```
사용자 → /platform → S3 → platform 파일 찾기 → 없음 → 404 ❌
```

### 오류 문서 설정 후:
```
사용자 → /platform 
  → S3 → platform 파일 찾기 
  → 없음 → 오류 문서 (index.html) 제공 
  → React Router가 /platform 처리 
  → ✅ 정상!
```

---

## 🆘 여전히 문제가 있다면?

### 1. S3 설정 재확인
```bash
버킷: kollabkorea
정적 웹사이트 호스팅: 활성화됨
인덱스 문서: index.html
오류 문서: index.html ← 정확히 확인!
```

### 2. 버킷 정책 확인
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

### 3. 배포 재확인
```bash
# GitHub Actions에서 최신 배포 확인
https://github.com/yigolabdev/kollabkorea/actions

# dist/ 폴더에 index.html이 있는지 확인
로컬에서: npm run build
결과: dist/index.html 존재 확인
```

---

## 🎉 완료!

설정이 완료되면:
- ✅ 모든 페이지에서 새로고침 가능
- ✅ URL 직접 입력 가능
- ✅ 북마크 정상 작동
- ✅ 뒤로가기/앞으로가기 정상 작동

**이제 완벽한 SPA 라우팅이 작동합니다!** 🚀

