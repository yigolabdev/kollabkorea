import { useEffect, RefObject } from 'react';

/**
 * 특정 요소 외부 클릭을 감지하는 커스텀 훅
 * @param ref - 감지할 요소의 ref
 * @param handler - 외부 클릭 시 실행할 콜백 함수
 */
export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const element = ref?.current;
      
      // ref가 없거나, 클릭한 요소가 ref 내부인 경우 무시
      if (!element || element.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

