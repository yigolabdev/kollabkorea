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
let lockedScrollY = 0;
let prevBodyStyle: {
  overflow: string;
  position: string;
  width: string;
  top: string;
  left: string;
  right: string;
  paddingRight: string;
} | null = null;

export const lockBodyScroll = (): void => {
  // 이미 잠겨있으면 중복 적용 방지
  if (prevBodyStyle) return;

  const { body, documentElement } = document;

  lockedScrollY = window.scrollY || window.pageYOffset || 0;

  // 스크롤바로 인한 레이아웃 시프트 방지(데스크탑 등)
  const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

  prevBodyStyle = {
    overflow: body.style.overflow,
    position: body.style.position,
    width: body.style.width,
    top: body.style.top,
    left: body.style.left,
    right: body.style.right,
    paddingRight: body.style.paddingRight,
  };

  body.style.overflow = 'hidden';
  body.style.position = 'fixed';
  body.style.width = '100%';
  body.style.top = `-${lockedScrollY}px`;
  body.style.left = '0';
  body.style.right = '0';

  if (scrollbarWidth > 0) {
    body.style.paddingRight = `${scrollbarWidth}px`;
  }
};

export const unlockBodyScroll = (): void => {
  if (!prevBodyStyle) return;

  const { body } = document;
  const restoreY = lockedScrollY;

  body.style.overflow = prevBodyStyle.overflow;
  body.style.position = prevBodyStyle.position;
  body.style.width = prevBodyStyle.width;
  body.style.top = prevBodyStyle.top;
  body.style.left = prevBodyStyle.left;
  body.style.right = prevBodyStyle.right;
  body.style.paddingRight = prevBodyStyle.paddingRight;

  prevBodyStyle = null;
  lockedScrollY = 0;

  // 원래 스크롤 위치로 복원(메뉴 오픈/클로즈 시 점프 방지)
  window.scrollTo({ top: restoreY, behavior: 'auto' });
};
