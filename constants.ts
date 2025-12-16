import { Benefit, ZoneInfo, NavigationLink, ContactInfo } from './types';
import { Globe, Camera, TrendingUp, Users, BarChart3, ShoppingBag } from 'lucide-react';

// ============================================
// NAVIGATION
// ============================================
export const NAVIGATION_LINKS: NavigationLink[] = [
  { name: 'ABOUT', href: '#about' },
  { name: 'BENEFITS', href: '#benefits' },
  { name: 'ZONES', href: '#zones' },
  { name: 'MOOD', href: '#mood' },
  { name: 'CRITERIA', href: '#partners' },
  { name: 'CONTACT', href: '#contact' },
];

// ============================================
// SCROLL & ANIMATION
// ============================================
export const SCROLL_THRESHOLD = 50;
export const PARALLAX_STRENGTH = 15;
export const ANIMATION_DURATION = {
  FAST: 300,
  MEDIUM: 500,
  SLOW: 700,
  VERY_SLOW: 1000,
} as const;

// ============================================
// CONTACT INFORMATION
// ============================================
export const CONTACT_INFO: ContactInfo = {
  email: 'info@kollabkorea.com',
  instagram: '@kollab_korea',
  instagramUrl: 'https://instagram.com/kollab_korea',
  businessHours: 'Am 10:00 - Pm 08:00',
};

// ============================================
// BENEFITS
// ============================================
export const BENEFITS: (Benefit & { icon: any })[] = [
  {
    title: '글로벌 감성 포지셔닝',
    icon: Globe,
    items: [
      'LA × SEOUL 프리미엄 셀렉트 스토어 입점',
      '브랜드 이미지 상승 및 라이프스타일 포지셔닝 강화'
    ]
  },
  {
    title: '브랜드 콘텐츠 제공',
    icon: Camera,
    items: [
      '현장 촬영 사진 1컷 제공',
      'Premium/Standard는 현장 릴스영상 포함'
    ]
  },
  {
    title: '글로벌 확장 기회',
    icon: TrendingUp,
    items: [
      '판매 성과 우수 브랜드 → KOLLAB LA 입점 기회',
      'KOLLAB LA 리테일 스토어 연계'
    ]
  },
  {
    title: '멀티 브랜드 시너지',
    icon: Users,
    items: [
      '총 30개 브랜드 입점 예정',
      '교차 구매 및 체류시간 증가로 매출 상승'
    ]
  },
  {
    title: '판매 데이터 리포트',
    icon: BarChart3,
    items: [
      '인기 SKU 및 판매 추이 분석 제공',
      '소비자 반응 인사이트 공유'
    ]
  },
  {
    title: '운영 부담 ZERO',
    icon: ShoppingBag,
    items: [
      '매장 운영 100% KOLLAB SEOUL 관리',
      '제품만 납품하면 즉시 운영 가능'
    ]
  }
];

// ============================================
// ZONES
// ============================================
export const ZONES: ZoneInfo[] = [
  {
    name: 'PREMIUM ZONE',
    count: 4,
    features: [
      '가장 높은 노출 (포토존 인근 전면)',
      '글로벌·디자이너 브랜드 우선 배치',
      '1개월 또는 3개월 계약 가능',
      '현장 릴스 영상 제공'
    ],
    color: 'bg-red-600'
  },
  {
    name: 'STANDARD ZONE',
    count: 6,
    features: [
      '메인 중앙 모듈존',
      '카테고리별 체계적 구성',
      'KOLLAB SEOUL의 핵심 존',
      '현장 릴스 영상 제공'
    ],
    color: 'bg-zinc-800'
  },
  {
    name: 'BASIC ZONE',
    count: 20,
    features: [
      '벽면 선반형 진열',
      '2주 단위 회전 시스템',
      '신생 브랜드·테스트 브랜드 최적화',
      '효율적인 공간 활용'
    ],
    color: 'bg-zinc-400'
  }
];