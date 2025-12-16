import { useState, useEffect } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface NormalizedMousePosition {
  x: number;
  y: number;
}

/**
 * 마우스 위치를 추적하는 커스텀 훅
 * @param normalize - 위치를 -1~1 범위로 정규화할지 여부 (기본값: false)
 * @returns 마우스 위치 (픽셀 또는 정규화된 값)
 */
export const useMousePosition = (normalize: boolean = false): MousePosition | NormalizedMousePosition => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (normalize) {
        // -1 ~ 1 범위로 정규화
        const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
        const normalizedY = (e.clientY / window.innerHeight) * 2 - 1;
        setMousePosition({ x: normalizedX, y: normalizedY });
      } else {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [normalize]);

  return mousePosition;
};

