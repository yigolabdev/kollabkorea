#!/bin/bash

# hosting.kr FTP 업로드 스크립트 (curl 사용)
# 사용법: ./deploy-ftp-simple.sh

# 색상 정의
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}hosting.kr FTP 배포 시작${NC}"
echo -e "${BLUE}================================${NC}"

# FTP 설정
echo -e "${YELLOW}FTP 정보를 입력하세요:${NC}"
echo -e "${BLUE}FTP 서버 (예: ftp.kollabkorea.com):${NC}"
read FTP_HOST

echo -e "${BLUE}FTP 사용자명 (예: hknnu5is1itgcheb):${NC}"
read FTP_USER

echo -e "${BLUE}FTP 비밀번호:${NC}"
read -s FTP_PASS
echo ""

echo -e "${BLUE}서버 디렉토리 (예: /public_html):${NC}"
read FTP_DIR

# dist 폴더 확인
if [ ! -d "dist" ]; then
    echo -e "${RED}❌ dist 폴더가 없습니다.${NC}"
    echo -e "${BLUE}빌드를 실행합니다...${NC}"
    npm run build
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ 빌드 실패${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}✓ dist 폴더 확인 완료${NC}"

# 빌드 재실행 여부
echo -e "${BLUE}새로운 빌드를 생성할까요? (y/n)${NC}"
read -r BUILD_ANSWER
if [ "$BUILD_ANSWER" = "y" ]; then
    echo -e "${BLUE}빌드 실행 중...${NC}"
    npm run build
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ 빌드 완료${NC}"
    else
        echo -e "${RED}❌ 빌드 실패${NC}"
        exit 1
    fi
fi

# 임시 파일 목록 생성
echo -e "${BLUE}업로드할 파일 목록 생성 중...${NC}"
cd dist
FILES=$(find . -type f)
cd ..

FILE_COUNT=$(echo "$FILES" | wc -l | tr -d ' ')
echo -e "${GREEN}✓ $FILE_COUNT 개의 파일을 업로드합니다${NC}"

# FTP 업로드
echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}파일 업로드 중...${NC}"
echo -e "${YELLOW}(시간이 소요될 수 있습니다)${NC}"
echo -e "${BLUE}================================${NC}"

UPLOAD_COUNT=0
ERROR_COUNT=0

for FILE in $FILES; do
    # .DS_Store 파일 제외
    if [[ "$FILE" == *".DS_Store"* ]]; then
        continue
    fi
    
    # 로컬 파일 경로
    LOCAL_FILE="dist/$FILE"
    
    # 원격 파일 경로 (./를 제거)
    REMOTE_FILE="${FTP_DIR}/${FILE#./}"
    REMOTE_DIR=$(dirname "$REMOTE_FILE")
    
    # 디렉토리 생성 (필요한 경우)
    curl -s --ftp-create-dirs \
         -u "$FTP_USER:$FTP_PASS" \
         "ftp://$FTP_HOST$REMOTE_DIR/" > /dev/null 2>&1
    
    # 파일 업로드
    curl -T "$LOCAL_FILE" \
         -u "$FTP_USER:$FTP_PASS" \
         --ftp-create-dirs \
         "ftp://$FTP_HOST$REMOTE_FILE" \
         > /dev/null 2>&1
    
    if [ $? -eq 0 ]; then
        UPLOAD_COUNT=$((UPLOAD_COUNT + 1))
        echo -e "${GREEN}✓${NC} $FILE"
    else
        ERROR_COUNT=$((ERROR_COUNT + 1))
        echo -e "${RED}✗${NC} $FILE"
    fi
done

echo -e "${BLUE}================================${NC}"
if [ $ERROR_COUNT -eq 0 ]; then
    echo -e "${GREEN}✅ 배포 성공!${NC}"
    echo -e "${GREEN}업로드: $UPLOAD_COUNT 개 파일${NC}"
    echo -e "${BLUE}================================${NC}"
    echo -e "${YELLOW}임시 URL로 확인하세요:${NC}"
    echo -e "http://hlxedxif.hostingkr.com"
    echo -e "또는"
    echo -e "https://kollabkorea.com (DNS 변경 후)"
else
    echo -e "${YELLOW}⚠️  배포 완료 (일부 오류 발생)${NC}"
    echo -e "${GREEN}업로드 성공: $UPLOAD_COUNT 개${NC}"
    echo -e "${RED}업로드 실패: $ERROR_COUNT 개${NC}"
    echo -e "${BLUE}================================${NC}"
fi
