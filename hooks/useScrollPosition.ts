import { useState, useEffect } from 'react';

interface ScrollPosition {
  x: number;
  y: number;
}

/**
 * 현재 스크롤 위치를 추적하는 커스텀 훅
 * @param threshold - 스크롤 감지 임계값 (기본값: 50)
 * @returns scrolled - 임계값을 넘었는지 여부, scrollPosition - 현재 스크롤 위치
 */
export const useScrollPosition = (threshold: number = 50) => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentScrollX = window.scrollX;
      
      setScrolled(currentScrollY > threshold);
      setScrollPosition({ x: currentScrollX, y: currentScrollY });
    };

    // 초기값 설정
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return { scrolled, scrollPosition };
};

