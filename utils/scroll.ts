/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * 스크롤 관련 유틸리티 함수
 */

/**
 * 부드러운 상단 스크롤
 */
export const scrollToTop = (behavior: ScrollBehavior = 'auto'): void => {
  window.scrollTo({ top: 0, behavior });
};

/**
 * 요소가 스크롤 가능한지 체크
 */
export const isScrollable = (el: Element): boolean => {
  const style = window.getComputedStyle(el);
  const overflowY = style.overflowY;
  return (
    (overflowY === 'auto' || overflowY === 'scroll') &&
    (el as HTMLElement).scrollHeight > (el as HTMLElement).clientHeight
  );
};

/**
 * 스크롤 가능한 부모 요소 찾기
 */
export const getScrollableParent = (start: Element | null): HTMLElement | null => {
  let el: Element | null = start;
  while (el && el !== document.body) {
    if (isScrollable(el)) return el as HTMLElement;
    el = el.parentElement;
  }
  return null;
};

/**
 * body 스크롤 잠금/해제
 */
export const lockBodyScroll = (): void => {
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.width = '100%';
};

export const unlockBodyScroll = (): void => {
  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.width = '';
};
