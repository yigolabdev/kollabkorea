/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * 텍스트 처리 유틸리티 함수
 */

/**
 * 한글 포함 여부 체크
 */
export const hasKorean = (text: string): boolean => {
  return /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(text);
};

/**
 * 두 줄로 분리
 */
export const splitTwoLines = (text: string): { a: string; b: string } => {
  const [a, b] = text.split('\n');
  return { a: a ?? '', b: b ?? '' };
};

/**
 * 브랜드명 볼드 처리 (KOLLAB KOREA, KOLLAB LA)
 */
export const highlightBrandName = (text: string): Array<{ text: string; bold: boolean }> => {
  const parts = text.split(/(KOLLAB KOREA|KOLLAB LA)/g);
  return parts.map((part) => ({
    text: part,
    bold: part === 'KOLLAB KOREA' || part === 'KOLLAB LA'
  }));
};

/**
 * 줄바꿈 기준으로 배열 변환
 */
export const splitLines = (text: string): string[] => {
  return text.split('\n').filter(Boolean);
};
