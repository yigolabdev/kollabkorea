import type { AboutContent } from './about.en';

export const aboutContentKo: AboutContent = {
  pageLabel: 'ABOUT',
  structureSection: {
    title: 'KOLLAB KOREA는\n브랜드, 인플루언서, 소비자, 디스트리뷰터, 리테일을\n하나의 구조로 연결하는 글로벌 런치 플랫폼입니다.',
    leftNode: { title: 'KOLLAB', subtitle: 'KOREA\n성수' },
    rightNode: { title: 'KOLLAB', subtitle: 'Downtown\nLA' },
    lanes: [
      { text: '브랜드 전입 | 월 단위 합리적 비용 & 제품만 제공' },
      { text: 'KOLLAB 리테일 플랫폼 | 마케팅 에이전시 기반 온·오프라인 통합 실행 구조' },
      { text: '소비자 | 오프라인 체험 · 구매 전환 · 브랜드 인지 형성' },
      { text: '인플루언서 | 자발적 방문 · 콘텐츠 생성 · 소셜 확산' },
      { text: '데이터 및 검증 | 판매 데이터 · 콘텐츠 성과 · 소비자 반응' },
      { text: '유통업체 연결 & 메이저 리테일 입점 기회 | 한국 & 미국 동시 검증 및 확장' }
    ]
  },
  readyBanner: {
    title: 'READY TO GO\nGLOBAL?',
    line: 'KOLLAB KOREA와 함께 당신의 브랜드를 알리세요.'
  },
  topPrelude: {
    label: 'ABOUT',
    introTitle: 'KOLLAB KOREA는',
    introLines: [
      '한국의 뷰티, 패션, 라이프, F&B, 굿즈 등 브랜드를 선별 · 운영하고',
      '검증된 브랜드의 성공적인 미국 진출로 연결하는 역할을 합니다.',
      '우리는 브랜드를 선별하고, 공간을 합리적으로 운영하며',
      '시장을 넘나드는 오프라인 성장 기회를 만듭니다.',
      '한국에서 시작해, 세계로 이어지는 오프라인 여정을 함께 하겠습니다.'
    ],
    bigTitle: 'KOLLAB KOREA는 브랜드, 인플루언서소비자, 디스트리뷰터, 리테일을 하나의 구조로 연결하는 글로벌 런치 플랫폼',
    diagram: {
      src: '/assets/photos/shoots/about-diagram.png',
      alt: 'KOLLAB Korea 플랫폼 구조 다이어그램'
    }
  },
  hero: {
    title: 'Born in Los Angeles.\nOperated in Korea.',
    deck: '글로벌 야망과 로컬 전문성이 만나는 곳'
  },
  gallery: {
    images: [
      { src: '/assets/photos/shoots/design_guide02.png', alt: 'KOLLAB LA reference 01' },
      { src: '/assets/photos/shoots/design_guide03.png', alt: 'KOLLAB LA reference 02' },
      { src: '/assets/images/hero/kollab-hero-bg-01.png', alt: 'KOLLAB reference 03' },
      { src: '/assets/images/hero/kollab-hero-bg-02.png', alt: 'KOLLAB reference 04' }
    ]
  },
  sections: [
    {
      id: 'operations',
      title: '',
      blocks: [
        {
          kind: 'body',
          ko: '우리는 브랜드를 선별하고, 공간을 합리적으로 운영하며,\n시장을 넘나드는 오프라인 성장 기회를 만듭니다.'
        }
      ]
    },
    {
      id: 'intro',
      title: '',
      blocks: [
        {
          kind: 'lead',
          ko: 'KOLLAB은 LA에서 시작된\n경험 중심의 큐레이션 리테일 플랫폼입니다.'
        },
        {
          kind: 'body',
          ko:
            'KOLLAB KOREA는\n한국 시장에서 브랜드를 선별 · 운영하고\n검증된 브랜드를 미국 팝업 기회로 연결하는 역할을 합니다.'
        }
      ]
    },
    {
      id: 'what-we-do',
      title: 'What We Do',
      blocks: [
        { kind: 'body', ko: '우리는 한국에서 미국으로 이어지는 오프라인 경로를 만듭니다.' }
      ]
    },
    {
      id: 'platform-not-consulting',
      title: '',
      blocks: [
        {
          kind: 'body',
          ko:
            'KOLLAB은 컨설팅이나 일회성 홍보를 제공하지 않습니다.\n실제 리테일 환경에서 브랜드가 검증 → 성장 → 확장할 수 있는 구조를 제공합니다.'
        }
      ]
    },
    {
      id: 'our-philosophy',
      title: 'Our Philosophy',
      blocks: [
        {
          kind: 'body',
          ko: '브랜드는\n직접 경험될 때 가장 강력해 진다고 믿습니다.'
        },
        {
          kind: 'body',
          ko:
            '오프라인 경험은\n디지털 노출만으로는 얻을 수 없는\n신뢰와 인사이트, 그리고 다음 단계로의 동력을 만듭니다.'
        }
      ]
    },
    {
      id: 'our-role',
      title: 'Our Role',
      blocks: [
        { kind: 'quote', ko: 'KOLLAB은 에이전시가 아닙니다.\nKOLLAB은 플랫폼입니다.' },
        {
          kind: 'body',
          ko:
            '우리는 브랜드를 선별하고, 공간을 운영하며,\n시장을 넘나드는 오프라인 성장 기회를 만듭니다.'
        }
      ]
    }
  ]
};

export type AboutContentKo = typeof aboutContentKo;

