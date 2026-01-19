/**
 * Facebook Pixel React Hook
 * 
 * React 컴포넌트에서 Facebook Pixel을 쉽게 사용하기 위한 Hook
 */

import { useEffect, useCallback } from 'react';
import { initFacebookPixel, trackEvent, trackCustomEvent, KollabPixelEvents } from '../services/facebookPixel';
import type { facebook } from '../services/facebookPixel';

/**
 * Facebook Pixel Hook
 * @returns Facebook Pixel 유틸리티 함수들
 */
export const useFacebookPixel = () => {
  // Pixel 초기화 (컴포넌트 마운트 시 한 번만 실행)
  useEffect(() => {
    const initialized = initFacebookPixel();
    
    if (!initialized) {
      console.warn('⚠️ Failed to initialize Facebook Pixel');
    }
  }, []);

  // 이벤트 트래킹 함수 (메모이제이션)
  const track = useCallback((
    eventName: facebook.Pixel.StandardEvent,
    parameters?: facebook.Pixel.EventParameters
  ) => {
    trackEvent(eventName, parameters);
  }, []);

  const trackCustom = useCallback((
    eventName: string,
    parameters?: facebook.Pixel.EventParameters
  ) => {
    trackCustomEvent(eventName, parameters);
  }, []);

  // KOLLAB 특화 이벤트 함수들
  const events = useCallback(() => KollabPixelEvents, []);

  return {
    track,
    trackCustom,
    events: events(),
  };
};

/**
 * 페이지뷰 자동 트래킹 Hook
 * @param pageName - 페이지 이름
 * @param dependencies - 의존성 배열
 */
export const usePageView = (pageName: string, dependencies: unknown[] = []) => {
  useEffect(() => {
    KollabPixelEvents.viewPage(pageName);
  }, [pageName, ...dependencies]);
};

export default useFacebookPixel;
