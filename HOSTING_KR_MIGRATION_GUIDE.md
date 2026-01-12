# 🚀 hosting.kr 호스팅 이전 가이드

## 📋 목차
1. [사전 준비](#1단계-사전-준비)
2. [파일 업로드](#2단계-파일-업로드)
3. [임시 URL 테스트](#3단계-임시-url-테스트)
4. [DNS 설정 변경](#4단계-dns-설정-변경)
5. [최종 확인](#5단계-최종-확인)

---

## 🎯 1단계: 사전 준비

### ✅ 빌드 파일 확인

**빌드 완료:**
```
✓ dist/index.html                   9.05 kB
✓ dist/assets/index-C3KI2cSd.css    1.25 kB
✓ dist/assets/en-CS4TNT5M.js        0.20 kB
✓ dist/assets/ko-BA53AqG0.js        0.21 kB
✓ dist/assets/index-DLe9Vhie.js   418.54 kB
```

**업로드할 폴더:**
```
프로젝트 루트/dist/
├── index.html
├── assets/
│   ├── *.css
│   ├── *.js
│   ├── brands/
│   ├── images/
│   └── photos/
├── BrandLogo/
├── mov01.mp4
├── robots.txt
└── sitemap.xml
```

---

## 📤 2단계: 파일 업로드 (hosting.kr)

### 방법 A: 파일 매니저 사용 (권장)

#### 1. cPanel 접속
```
hosting.kr → cPanel 로그인
→ 파일 → 파일 관리자 (File Manager)
```

#### 2. public_html 폴더로 이동
```
홈 디렉토리 → public_html/
```

⚠️ **중요**: 기존 파일이 있다면 백업 후 삭제하세요!

#### 3. 업로드 방법

**옵션 1: 압축 파일로 업로드 (가장 빠름 ⭐)**

**로컬 터미널에서:**
```bash
# dist 폴더를 압축
cd "/Users/hyojoonchoi/Hyojoon Drive/Cursor-Project/kollab-brandpage"
cd dist
zip -r ../kollab-brandpage.zip .
```

**cPanel에서:**
```
1. public_html 폴더에서 "업로드" 버튼 클릭
2. kollab-brandpage.zip 파일 선택
3. 업로드 완료 대기
4. 파일 우클릭 → "압축 풀기" (Extract)
5. 압축 풀기 완료 후 zip 파일 삭제
```

**옵션 2: 개별 파일 업로드**
```
1. "업로드" 버튼 클릭
2. dist 폴더 내 모든 파일/폴더 선택
3. 업로드 (시간 소요: 5-10분)
```

#### 4. 파일 구조 확인

**업로드 후 public_html 구조:**
```
public_html/
├── index.html          ← 최상위에 있어야 함!
├── assets/
├── BrandLogo/
├── mov01.mp4
├── robots.txt
└── sitemap.xml
```

⚠️ **주의**: `dist` 폴더 자체를 업로드하면 안됩니다!
- ❌ public_html/dist/index.html
- ✅ public_html/index.html

---

### 방법 B: FTP 사용

#### 1. FTP 정보 확인
```
hosting.kr → cPanel → FTP 계정
→ FTP 접속 정보 확인
```

**필요한 정보:**
```
FTP 서버: ftp.yourdomain.com 또는 IP
FTP 사용자명: (cPanel 사용자명)
FTP 비밀번호: (cPanel 비밀번호)
포트: 21
```

#### 2. FTP 클라이언트 (FileZilla 권장)

**FileZilla 다운로드:**
```
https://filezilla-project.org/download.php?type=client
```

**연결 설정:**
```
호스트: ftp.kollabkorea.com
사용자명: hknnu5is1itgcheb (또는 hosting.kr에서 제공한 FTP 계정)
비밀번호: *****
포트: 21
```

#### 3. 파일 업로드

**로컬 (왼쪽):**
```
/Users/hyojoonchoi/Hyojoon Drive/Cursor-Project/kollab-brandpage/dist/
```

**원격 (오른쪽):**
```
/public_html/
```

**dist 폴더 내용을 public_html로 드래그 앤 드롭**

---

## 🧪 3단계: 임시 URL 테스트

### 1. hosting.kr 임시 도메인 확인

**cPanel에서:**
```
일반 정보 (General Information) → 기본 도메인
또는
hlxedxif.hostingkr.com (예시)
```

### 2. 브라우저 테스트

**임시 URL 접속:**
```
http://hlxedxif.hostingkr.com
또는
http://43.200.160.145 (Shared IP Address)
```

### 3. 체크리스트

- [ ] 메인 페이지 로드 확인
- [ ] 이미지/로고 표시 확인
- [ ] 서브 페이지 라우팅 확인
  - `/about`
  - `/platform`
  - `/brands`
  - `/contact`
  - `/faq`
- [ ] 언어 전환 (한글/영문) 확인
- [ ] 모바일 반응형 확인

### 4. 문제 해결

#### ❌ 404 에러 발생 시

**원인:** `.htaccess` 파일 누락 (SPA 라우팅 설정 필요)

**해결:**

**cPanel 파일 매니저에서:**
```
public_html/ → 새 파일 생성 → .htaccess
```

**내용:**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**저장 후 새로고침**

#### ❌ 이미지 로드 실패

**원인:** 파일 권한 문제

**해결:**
```
파일 매니저 → assets 폴더 우클릭 → 권한 변경
→ 755 (읽기/실행 권한)
```

#### ❌ CSS/JS 로드 실패

**원인:** MIME 타입 문제

**해결:**
```
cPanel → MIME Types 확인
.css → text/css
.js  → application/javascript
```

---

## 🌐 4단계: DNS 설정 변경 (도메인 연결)

### 임시 URL 테스트가 성공했다면 도메인을 연결합니다.

### 1. hosting.kr 서버 IP 확인

**cPanel에서:**
```
일반 정보 (General Information) → Shared IP Address
예: 43.200.160.145
```

### 2. Cloudflare DNS 설정 변경

#### A. 기존 S3 레코드 비활성화

**Cloudflare → DNS → Records**

**기존 레코드 찾기:**
```
1. kollabkorea.com (CNAME) → S3 엔드포인트
   → Edit → Proxy status: DNS only로 변경 (또는 삭제)

2. www (CNAME) → S3 엔드포인트
   → Edit → Proxy status: DNS only로 변경 (또는 삭제)
```

#### B. 새 A 레코드 추가

**kollabkorea.com (메인 도메인):**
```
Type: A
Name: @
IPv4 address: 43.200.160.145 (hosting.kr IP)
Proxy status: Proxied (☁️ 주황색) - HTTPS 사용 시
TTL: Auto
```

**www.kollabkorea.com (서브도메인):**
```
Type: A
Name: www
IPv4 address: 43.200.160.145 (hosting.kr IP)
Proxy status: Proxied (☁️ 주황색)
TTL: Auto
```

#### C. DNS 전파 대기

**소요 시간:**
- 최소: 5-10분
- 평균: 30분 ~ 1시간
- 최대: 48시간

**확인:**
```bash
# 터미널에서
dig kollabkorea.com
dig www.kollabkorea.com

# 또는
https://dnschecker.org
```

---

### 3. hosting.kr에서 도메인 추가

#### cPanel → 도메인 관리

**도메인 추가:**
```
Domains → Create A New Domain
또는
Addon Domains

도메인: kollabkorea.com
Document Root: /public_html
```

**www 서브도메인 자동 추가 확인:**
```
www.kollabkorea.com도 자동으로 별칭(alias)으로 추가되어야 함
```

---

## ✅ 5단계: 최종 확인

### 1. 도메인 접속 테스트

**브라우저 시크릿 모드에서:**

```
https://kollabkorea.com
https://www.kollabkorea.com
```

### 2. 전체 기능 체크리스트

- [ ] HTTPS 자동 리다이렉트 (http → https)
- [ ] www 리다이렉트 정상 작동
- [ ] 메인 페이지 로드
- [ ] 모든 서브 페이지 라우팅
  - [ ] /about
  - [ ] /platform
  - [ ] /brands
  - [ ] /contact
  - [ ] /faq
  - [ ] /guide (SEO 가이드)
- [ ] 이미지/비디오 로드
- [ ] 언어 전환 (한글 ↔ 영문)
- [ ] 모바일 반응형
- [ ] 브라우저 콘솔 에러 없음

### 3. 성능 테스트

**Google PageSpeed Insights:**
```
https://pagespeed.web.dev/
→ kollabkorea.com 입력
→ 모바일/데스크톱 점수 확인
```

---

## 🔄 6단계: GitHub Actions 배포 자동화 (선택)

hosting.kr로 자동 배포를 설정하려면 FTP를 통한 배포가 필요합니다.

### 방법 A: FTP Deploy Action 사용

**.github/workflows/deploy-hosting.yml 생성:**

```yaml
name: Deploy to hosting.kr

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build project
        run: npm run build
      
      - name: FTP Deploy
        uses: SamKirkland/FTP-Deploy-Action@v4.3.4
        with:
          server: ftp.kollabkorea.com
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: ./dist/
          server-dir: /public_html/
```

### GitHub Secrets 추가:

```
Repository → Settings → Secrets and variables → Actions

Name: FTP_USERNAME
Value: (hosting.kr FTP 사용자명)

Name: FTP_PASSWORD
Value: (hosting.kr FTP 비밀번호)
```

---

## 🧹 7단계: 기존 S3 정리 (선택)

hosting.kr 이전이 완료되고 안정화되면:

### 1. GitHub Actions 중단

**기존 S3 배포 워크플로우 비활성화:**

```bash
# .github/workflows/deploy.yml 파일명 변경
mv .github/workflows/deploy.yml .github/workflows/deploy.yml.bak
```

또는 파일 내용 상단에 추가:
```yaml
# on:
#   push:
#     branches:
#       - main
```

### 2. S3 버킷 정리 (비용 절감)

**AWS S3 Console:**
```
1. kollabkorea.com 버킷 선택
2. 빈 버킷 만들기 (파일 삭제)
3. 버킷 삭제 (완전 제거 시)
```

### 3. GitHub Secrets 정리

**더 이상 사용하지 않는 Secrets:**
```
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- S3_BUCKET_NAME
- CLOUDFRONT_DISTRIBUTION_ID (사용 중이라면)
```

---

## 📊 hosting.kr vs S3 비교

| 항목 | S3 + CloudFront | hosting.kr |
|------|-----------------|------------|
| 비용 | 트래픽 기반 ($5-10/월) | 고정 요금 |
| 속도 | 매우 빠름 (글로벌 CDN) | 국내 빠름 |
| 설정 | 복잡 | 간단 |
| HTTPS | 자동 (CloudFront) | 제공 (호스팅 업체) |
| 캐시 관리 | 수동 무효화 필요 | 자동 |
| 관리 | AWS Console | cPanel (GUI) |
| 확장성 | 무제한 | 호스팅 플랜 제한 |

---

## 🛠️ 문제 해결

### 1. 업로드 후 빈 페이지

**원인:** index.html이 최상위에 없음

**해결:**
```
public_html/dist/index.html ❌
public_html/index.html ✅
```

### 2. 서브 페이지 404 에러

**원인:** .htaccess 누락

**해결:** 3단계 참조

### 3. 이미지가 안 보임

**원인 1:** 파일 대소문자 문제
```
Linux 서버는 대소문자 구분!
/assets/brands/Logo.png ≠ /assets/brands/logo.png
```

**원인 2:** 경로 문제
```
절대 경로 확인: /assets/... (O)
상대 경로: ../assets/... (X)
```

### 4. HTTPS 리다이렉트 안됨

**Cloudflare 설정:**
```
SSL/TLS → Overview → Full (권장)
또는
SSL/TLS → Edge Certificates → Always Use HTTPS: On
```

---

## 📞 추가 지원

### hosting.kr 고객센터
- 웹사이트: https://hosting.kr
- 이메일: support@hosting.kr
- 전화: (hosting.kr에서 확인)

### cPanel 문서
- https://docs.cpanel.net/

---

## ✅ 완료 체크리스트

### 배포 전
- [ ] npm run build 성공
- [ ] dist 폴더 확인
- [ ] .htaccess 파일 준비
- [ ] FTP 정보 확인

### 배포 중
- [ ] public_html에 파일 업로드
- [ ] 파일 구조 확인 (index.html 최상위)
- [ ] .htaccess 업로드
- [ ] 임시 URL 테스트 성공

### 배포 후
- [ ] Cloudflare DNS 변경
- [ ] hosting.kr 도메인 추가
- [ ] DNS 전파 대기 (30분~1시간)
- [ ] https://kollabkorea.com 접속 확인
- [ ] https://www.kollabkorea.com 접속 확인
- [ ] 모든 페이지 기능 테스트
- [ ] 성능 테스트

### 정리
- [ ] GitHub Actions 업데이트 (FTP 배포)
- [ ] S3 버킷 정리 (선택)
- [ ] 문서 업데이트

---

**마지막 업데이트:** 2026년 1월 12일  
**작성자:** KOLLAB KOREA Development Team

🎉 hosting.kr 이전을 축하합니다!
