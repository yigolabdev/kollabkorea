import type { PlatformContent } from './platform.en';

export const platformContentKo: PlatformContent = {
  topPrelude: {
    label: 'PLATFORM',
    introTitle: 'KOLLAB KOREA는',
    introLines: [
      '한국의 뷰티, 패션, 라이프, F&B, 굿즈 등 브랜드를 선별 · 운영하고',
      '검증된 브랜드의 성공적인 미국 진출로 연결하는 역할을 합니다.',
      '우리는 브랜드를 선별하고, 공간을 합리적으로 운영하며,',
      '시장을 넘나드는 오프라인 성장 기회를 만듭니다.',
      '한국에서 시작해, 세계로 이어지는 오프라인 여정을 함께 하겠습니다.'
    ],
    bigTitle: 'KOLLAB KOREA는 브랜드, 인플루언서, 소비자, 디스트리뷰터, 리테일을 하나의 구조로 연결하는 글로벌 런치 플랫폼',
    diagram: {
      src: '/assets/photos/shoots/about-diagram.png',
      alt: 'KOLLAB Korea 플랫폼 구조 다이어그램'
    }
  },
  roadmap: [
    {
      id: 1,
      title: '브랜드 액티베이션',
      subtitle: 'Brand Activation',
      description: [
        'ZONE 별 오프라인 체험중심',
        '브랜드 제품 판매',
        '팝업 및 인플루언서 마케팅',
        '판매 데이터 공유'
      ],
      icon: 'Store',
      color: 'from-kollab-red to-red-600'
    },
    {
      id: 2,
      title: '콘텐츠 제작',
      subtitle: 'Content Creation',
      description: [
        '브랜드 제품 콘텐츠',
        '릴스 중심 숏폼',
        '실사용 기반 스토리 발행'
      ],
      icon: 'Video',
      color: 'from-zinc-700 to-kollab-dark'
    },
    {
      id: 3,
      title: '인플루언서 마케팅',
      subtitle: 'Influencer Marketing',
      description: [
        '인플루언서 마케팅',
        '브랜드 협업',
        '자발적 UGC 생성'
      ],
      icon: 'Users',
      color: 'from-kollab-black to-zinc-900'
    },
    {
      id: 4,
      title: 'PR',
      subtitle: 'Public Relations',
      description: [
        '오프라인 PR 자산확보',
        '미디어/리테일 연계 레퍼런스'
      ],
      icon: 'Megaphone',
      color: 'from-zinc-800 to-kollab-dark'
    },
    {
      id: 5,
      title: '미국 수출 연결 기회',
      subtitle: 'US Export Opportunity',
      description: [
        '미국 수출 연결 기회',
        'LA 팝업스토어 연계',
        'LA 리테일 샵 입점',
        '메이저 리테일 연결기회',
        '(Ulta, Sephora 등)'
      ],
      icon: 'Plane',
      color: 'from-kollab-red to-red-700'
    }
  ],
  hero: {
    title: 'PLATFORM',
    image: {
      src: '/assets/photos/shoots/design_guide02.png',
      alt: '성수동 팝업공간 인테리어'
    },
    intro: [
      {
        kind: 'lead',
        en:
          'KOLLAB is a structured offline platform\n' +
          'designed to validate brands in Korea\n' +
          'and selectively connect them to pop-up opportunities in the United States.'
      },
      {
        kind: 'lead',
        ko:
          'KOLLAB은\n' +
          '한국 오프라인 시장에서 브랜드를 검증하고,\n' +
          '선별된 브랜드를 미국 팝업 기회로 연결하는\n' +
          '구조화된 오프라인 플랫폼입니다.'
      }
    ]
  },
  sections: [
    {
      id: 'space-structure',
      title: 'Space Structure',
      blocks: [
        {
          kind: 'lead',
          en: 'Flexible spaces based on brand goals',
          ko: '브랜드 목표에 맞춘 유연한 공간 구조'
        }
      ],
      tiers: [
        {
          type: 'Premium',
          titleEn: 'Flagship-level visibility and storytelling.',
          titleKo: '브랜드 스토리를 집중적으로 보여주는 플래그십 포지션'
        },
        {
          type: 'Standard',
          titleEn: 'Sales-driven testing and customer interaction.',
          titleKo: '판매 및 고객 반응 테스트 중심 공간'
        },
        {
          type: 'Basic',
          titleEn: 'Entry-level offline validation.',
          titleKo: '오프라인 검증을 시작하는 브랜드를 위한 구조'
        }
      ]
    },
    {
      id: 'korea-us-flow',
      title: 'Korea → U.S. Flow',
      blocks: [
        {
          kind: 'lead',
          en: 'From local validation to global experience',
          ko: '한국 검증 → 글로벌 확장'
        }
      ],
      rows: [
        {
          step: '1.',
          title: 'Korea Pop-up Validation',
          descEn: 'Test brand response in the Korean market.',
          descKo: '한국 시장에서 브랜드 반응 검증'
        },
        {
          step: '2.',
          title: 'Curation & Performance Review',
          descEn: 'Evaluate brand readiness and scalability.',
          descKo: '성과 및 확장 가능성 평가'
        },
        {
          step: '3.',
          title: 'U.S. Pop-up Opportunity',
          descEn: 'Selected brands may access curated U.S. pop-ups.',
          descKo: '선별 브랜드에 한해 미국 팝업 기회 제공'
        }
      ],
      notice: {
        en: 'U.S. pop-up participation is subject to internal review and partner approval.',
        ko: '미국 팝업은 내부 심사 및 파트너 승인에 따라 진행됩니다.'
      }
    }
  ]
};

export type PlatformContentKo = typeof platformContentKo;

