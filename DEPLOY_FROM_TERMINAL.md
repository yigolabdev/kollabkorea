# 🚀 터미널에서 바로 배포하기

## 방법 선택

### 🎯 방법 1: 터미널 FTP 배포 (즉시 사용 가능)
- **장점**: 지금 바로 사용 가능, 빠름
- **단점**: 매번 수동 실행 필요
- **추천**: 긴급 배포, 1회성 배포

### 🎯 방법 2: GitHub Actions 자동 배포 (권장 ⭐)
- **장점**: git push만 하면 자동 배포, 안정적
- **단점**: 초기 설정 필요 (5분)
- **추천**: 일상적인 배포, 팀 협업

---

## 📤 방법 1: 터미널 FTP 배포

### 1단계: lftp 설치 (최초 1회만)

```bash
# Mac (Homebrew)
brew install lftp

# 설치 확인
lftp --version
```

### 2단계: FTP 정보 확인

hosting.kr에서 다음 정보를 확인하세요:

```
FTP 서버: ftp.kollabkorea.com (또는 hosting.kr 제공 주소)
FTP 사용자명: hknnu5is1itgcheb
FTP 비밀번호: (hosting.kr 비밀번호)
FTP 디렉토리: /public_html
```

### 3단계: 배포 스크립트 실행

**터미널에서:**

```bash
cd "/Users/hyojoonchoi/Hyojoon Drive/Cursor-Project/kollab-brandpage"

# 배포 실행
./deploy-ftp.sh
```

**실행 시:**
1. FTP 비밀번호 입력 요청
2. 새 빌드 생성 여부 선택 (y/n)
3. 자동으로 dist/ 폴더 내용을 hosting.kr에 업로드
4. 완료!

**예상 소요 시간:** 2-5분

---

## 🤖 방법 2: GitHub Actions 자동 배포 (권장)

### 1단계: GitHub Secrets 설정

**GitHub 저장소 → Settings → Secrets and variables → Actions**

**3개의 Secret 추가:**

| Name | Value | 설명 |
|------|-------|------|
| `FTP_SERVER` | `ftp.kollabkorea.com` | hosting.kr FTP 서버 주소 |
| `FTP_USERNAME` | `hknnu5is1itgcheb` | FTP 사용자명 |
| `FTP_PASSWORD` | `********` | FTP 비밀번호 |

**추가 방법:**
```
1. "New repository secret" 클릭
2. Name: FTP_SERVER
3. Secret: ftp.kollabkorea.com
4. "Add secret" 클릭
5. 위 3개 모두 반복
```

### 2단계: 워크플로우 파일 푸시

**터미널에서:**

```bash
cd "/Users/hyojoonchoi/Hyojoon Drive/Cursor-Project/kollab-brandpage"

# 파일 추가
git add .github/workflows/deploy-hosting-kr.yml

# 커밋
git commit -m "feat: hosting.kr 자동 배포 설정"

# 푸시
git push origin main
```

### 3단계: 자동 배포 시작!

**이제부터:**
```bash
# 코드 수정 후
git add .
git commit -m "fix: 버그 수정"
git push origin main

# → 자동으로 hosting.kr에 배포됩니다! 🎉
```

### 4단계: 배포 상태 확인

**GitHub 저장소 → Actions 탭**
- ✅ 성공: 녹색 체크
- ❌ 실패: 빨간색 X
- 🟡 진행 중: 노란색 점

**예상 소요 시간:** 2-3분

---

## 🔄 두 방법 비교

| 항목 | 터미널 FTP | GitHub Actions |
|------|-----------|----------------|
| 설정 시간 | 1분 | 5분 |
| 배포 방법 | `./deploy-ftp.sh` | `git push` |
| 자동화 | 수동 | 자동 |
| 롤백 | 수동 | Git revert |
| 팀 협업 | 어려움 | 쉬움 |
| 추천도 | ⭐⭐ | ⭐⭐⭐⭐⭐ |

---

## 🎯 추천 워크플로우

### 개발 중 (로컬 테스트):
```bash
npm run dev
# → http://localhost:3000에서 테스트
```

### 배포 (방법 2 - GitHub Actions):
```bash
git add .
git commit -m "feat: 새 기능 추가"
git push origin main
# → 자동으로 hosting.kr에 배포!
```

### 긴급 배포 (방법 1 - 터미널 FTP):
```bash
./deploy-ftp.sh
# → 즉시 hosting.kr에 배포
```

---

## 📋 체크리스트

### 방법 1 (터미널 FTP) 준비:
- [ ] lftp 설치: `brew install lftp`
- [ ] FTP 정보 확인 (서버, 사용자명, 비밀번호)
- [ ] deploy-ftp.sh 실행 권한: `chmod +x deploy-ftp.sh`
- [ ] 첫 배포 실행: `./deploy-ftp.sh`

### 방법 2 (GitHub Actions) 준비:
- [ ] GitHub Secrets에 FTP_SERVER 추가
- [ ] GitHub Secrets에 FTP_USERNAME 추가
- [ ] GitHub Secrets에 FTP_PASSWORD 추가
- [ ] deploy-hosting-kr.yml 파일 푸시
- [ ] Actions 탭에서 첫 배포 확인

---

## 🛠️ 문제 해결

### ❌ lftp: command not found

**해결:**
```bash
brew install lftp
```

### ❌ FTP 연결 실패

**원인:** FTP 정보 오류

**해결:**
1. hosting.kr cPanel → FTP 계정 확인
2. FTP 서버 주소 정확히 입력
3. 방화벽 확인

### ❌ GitHub Actions 실패

**원인:** Secrets 오류

**해결:**
1. GitHub Secrets 값 재확인
2. FTP_PASSWORD 정확히 입력 (특수문자 주의)
3. FTP_SERVER에 `ftp://` 제거 (도메인만 입력)

### ❌ 파일 업로드 후 404 에러

**원인:** .htaccess 누락

**해결:**
```bash
# dist/.htaccess 파일 확인
ls -la dist/.htaccess

# 없으면 재생성 필요
```

---

## 💡 Pro Tips

### Tip 1: 빠른 배포
```bash
# 빌드 + 배포 한 번에
npm run build && ./deploy-ftp.sh
```

### Tip 2: 배포 전 테스트
```bash
# 로컬 빌드 미리보기
npm run build
npm run preview
# → http://localhost:4173 확인 후 배포
```

### Tip 3: 선택적 배포
```bash
# 개발 브랜치에서는 자동 배포 안됨
git checkout -b feature/new-feature
git push origin feature/new-feature
# → 배포 안됨 (main 브랜치만 자동 배포)

# main에 머지 시 자동 배포
git checkout main
git merge feature/new-feature
git push origin main
# → 자동 배포!
```

---

## 🎉 완료!

이제 두 가지 방법 중 선택해서 배포하세요:

1. **즉시 배포**: `./deploy-ftp.sh` 실행
2. **자동 배포**: GitHub Secrets 설정 후 `git push`

---

**마지막 업데이트:** 2026년 1월 12일  
**작성자:** KOLLAB KOREA Development Team
