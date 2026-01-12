#!/bin/bash

# hosting.kr FTP 업로드 스크립트
# 사용법: ./deploy-ftp.sh

# 색상 정의
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}hosting.kr FTP 배포 시작${NC}"
echo -e "${BLUE}================================${NC}"

# FTP 설정 (실제 값으로 변경 필요)
FTP_HOST="ftp.kollabkorea.com"  # 또는 hosting.kr에서 제공한 FTP 주소
FTP_USER="hknnu5is1itgcheb"     # FTP 사용자명
FTP_PASS=""                      # FTP 비밀번호 (입력 필요)
FTP_DIR="/public_html"           # 업로드할 서버 디렉토리

# FTP 비밀번호 입력받기
if [ -z "$FTP_PASS" ]; then
    echo -e "${BLUE}FTP 비밀번호를 입력하세요:${NC}"
    read -s FTP_PASS
fi

# dist 폴더 확인
if [ ! -d "dist" ]; then
    echo -e "${RED}❌ dist 폴더가 없습니다. 먼저 빌드를 실행하세요: npm run build${NC}"
    exit 1
fi

echo -e "${GREEN}✓ dist 폴더 확인 완료${NC}"

# 빌드 실행 (선택)
echo -e "${BLUE}새로운 빌드를 생성할까요? (y/n)${NC}"
read -r BUILD_ANSWER
if [ "$BUILD_ANSWER" = "y" ]; then
    echo -e "${BLUE}빌드 실행 중...${NC}"
    npm run build
    echo -e "${GREEN}✓ 빌드 완료${NC}"
fi

# lftp로 업로드
echo -e "${BLUE}파일 업로드 중... (시간이 소요될 수 있습니다)${NC}"

lftp -c "
set ftp:ssl-allow no;
set net:timeout 10;
set net:max-retries 3;
open -u $FTP_USER,$FTP_PASS $FTP_HOST;
lcd dist;
cd $FTP_DIR;
mirror --reverse --delete --verbose --parallel=5;
bye;
"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}================================${NC}"
    echo -e "${GREEN}✅ 배포 성공!${NC}"
    echo -e "${GREEN}================================${NC}"
    echo -e "${BLUE}임시 URL로 확인하세요:${NC}"
    echo -e "http://hlxedxif.hostingkr.com"
    echo -e "또는"
    echo -e "https://kollabkorea.com (DNS 변경 후)"
else
    echo -e "${RED}================================${NC}"
    echo -e "${RED}❌ 배포 실패${NC}"
    echo -e "${RED}================================${NC}"
    echo -e "${RED}FTP 정보를 확인하고 다시 시도하세요.${NC}"
    exit 1
fi
