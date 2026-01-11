/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PageId } from '../types';

/**
 * 네비게이션 관련 유틸리티
 */

/**
 * URL path에서 페이지 ID 추출
 */
export const getPathFromUrl = (): PageId => {
  const path = window.location.pathname.replace('/', '') || 'home';
  return path as PageId;
};

/**
 * 페이지 ID를 URL path로 변환
 */
export const getUrlFromPageId = (pageId: PageId): string => {
  return pageId === 'home' ? '/' : `/${pageId}`;
};

/**
 * 페이지 네비게이션 (history API 사용)
 */
export const navigateToPage = (pageId: PageId): void => {
  const url = getUrlFromPageId(pageId);
  window.history.pushState({}, '', url);
};
