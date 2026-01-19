/**
 * Facebook Pixel Service
 * 
 * 전문적인 Facebook Pixel 통합을 위한 서비스
 * - 타입 안전성 제공
 * - 환경별 설정 지원
 * - 이벤트 트래킹 유틸리티
 */

// Facebook Pixel 타입 정의
declare global {
  interface Window {
    fbq: facebook.Pixel.Event;
    _fbq: facebook.Pixel.Event;
  }
}

export namespace facebook.Pixel {
  export type Event = {
    (command: 'init', pixelId: string, options?: object): void;
    (command: 'track', eventName: StandardEvent | string, parameters?: EventParameters): void;
    (command: 'trackCustom', eventName: string, parameters?: EventParameters): void;
    callMethod?: Function;
    queue?: unknown[];
    push?: Function;
    loaded?: boolean;
    version?: string;
  };

  export type StandardEvent =
    | 'PageView'
    | 'ViewContent'
    | 'Search'
    | 'AddToCart'
    | 'AddToWishlist'
    | 'InitiateCheckout'
    | 'AddPaymentInfo'
    | 'Purchase'
    | 'Lead'
    | 'CompleteRegistration'
    | 'Contact'
    | 'CustomizeProduct'
    | 'Donate'
    | 'FindLocation'
    | 'Schedule'
    | 'StartTrial'
    | 'SubmitApplication'
    | 'Subscribe';

  export interface EventParameters {
    content_category?: string;
    content_ids?: string[];
    content_name?: string;
    content_type?: string;
    contents?: Array<{
      id: string;
      quantity: number;
    }>;
    currency?: string;
    num_items?: number;
    predicted_ltv?: number;
    search_string?: string;
    status?: string;
    value?: number;
    [key: string]: unknown;
  }
}

// Facebook Pixel 설정
const FACEBOOK_PIXEL_ID = '1217892046393474';
const IS_PRODUCTION = import.meta.env.PROD;
const IS_DEBUG = import.meta.env.DEV;

/**
 * Facebook Pixel 초기화
 * @returns boolean - 초기화 성공 여부
 */
export const initFacebookPixel = (): boolean => {
  try {
    // 이미 초기화되어 있으면 스킵
    if (window.fbq) {
      if (IS_DEBUG) {
        console.log('✅ Facebook Pixel already initialized');
      }
      return true;
    }

    // Facebook Pixel 베이스 코드 로드
    (function(f: Window, b: Document, e: string, v: string) {
      const n: facebook.Pixel.Event = window.fbq = function(...args: unknown[]) {
        if (n.callMethod) {
          n.callMethod.apply(n, args);
        } else {
          n.queue?.push(args);
        }
      };
      
      if (!window._fbq) window._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = '2.0';
      n.queue = [];
      
      const t = b.createElement(e) as HTMLScriptElement;
      t.async = true;
      t.src = v;
      
      const s = b.getElementsByTagName(e)[0];
      s.parentNode?.insertBefore(t, s);
    })(
      window,
      document,
      'script',
      'https://connect.facebook.net/en_US/fbevents.js'
    );

    // Pixel 초기화
    window.fbq('init', FACEBOOK_PIXEL_ID);
    
    // 자동 PageView 추적
    window.fbq('track', 'PageView');

    if (IS_DEBUG) {
      console.log('✅ Facebook Pixel initialized:', FACEBOOK_PIXEL_ID);
    }

    return true;
  } catch (error) {
    console.error('❌ Facebook Pixel initialization failed:', error);
    return false;
  }
};

/**
 * 표준 이벤트 트래킹
 * @param eventName - Facebook 표준 이벤트명
 * @param parameters - 이벤트 파라미터
 */
export const trackEvent = (
  eventName: facebook.Pixel.StandardEvent,
  parameters?: facebook.Pixel.EventParameters
): void => {
  if (!window.fbq) {
    console.warn('⚠️ Facebook Pixel not initialized');
    return;
  }

  try {
    window.fbq('track', eventName, parameters);
    
    if (IS_DEBUG) {
      console.log('📊 Facebook Pixel Event:', eventName, parameters);
    }
  } catch (error) {
    console.error('❌ Facebook Pixel event tracking failed:', error);
  }
};

/**
 * 커스텀 이벤트 트래킹
 * @param eventName - 커스텀 이벤트명
 * @param parameters - 이벤트 파라미터
 */
export const trackCustomEvent = (
  eventName: string,
  parameters?: facebook.Pixel.EventParameters
): void => {
  if (!window.fbq) {
    console.warn('⚠️ Facebook Pixel not initialized');
    return;
  }

  try {
    window.fbq('trackCustom', eventName, parameters);
    
    if (IS_DEBUG) {
      console.log('📊 Facebook Pixel Custom Event:', eventName, parameters);
    }
  } catch (error) {
    console.error('❌ Facebook Pixel custom event tracking failed:', error);
  }
};

/**
 * KOLLAB KOREA 특화 이벤트 트래커
 */
export const KollabPixelEvents = {
  /**
   * 브랜드 입점 신청 시작
   */
  brandApplicationStart: () => {
    trackEvent('Lead', {
      content_category: 'Brand Application',
      content_name: 'Application Form Started',
    });
  },

  /**
   * 브랜드 입점 신청 완료
   */
  brandApplicationComplete: (brandName?: string) => {
    trackEvent('CompleteRegistration', {
      content_category: 'Brand Application',
      content_name: 'Application Form Completed',
      value: 1,
      currency: 'USD',
    });
    
    if (brandName) {
      trackCustomEvent('BrandSubmitted', {
        content_name: brandName,
      });
    }
  },

  /**
   * 문의하기 클릭
   */
  contactClick: () => {
    trackEvent('Contact', {
      content_category: 'Contact',
      content_name: 'Contact Button Clicked',
    });
  },

  /**
   * 페이지별 조회
   */
  viewPage: (pageName: string) => {
    trackEvent('ViewContent', {
      content_type: 'page',
      content_name: pageName,
    });
  },

  /**
   * 외부 링크 클릭
   */
  externalLinkClick: (linkUrl: string, linkName: string) => {
    trackCustomEvent('ExternalLinkClick', {
      content_name: linkName,
      content_category: 'External Link',
      value: linkUrl,
    });
  },
};

export default {
  init: initFacebookPixel,
  track: trackEvent,
  trackCustom: trackCustomEvent,
  events: KollabPixelEvents,
};
