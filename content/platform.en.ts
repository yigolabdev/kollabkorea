import type { ContentBlock, ContentSection } from './contentBlocks';

export interface PlatformTier {
  type: string;
  titleEn: string;
  titleKo: string;
}

export interface PlatformFlowRow {
  step: string;
  title: string;
  descEn: string;
  descKo: string;
}

export interface PlatformSection extends ContentSection {
  tiers?: PlatformTier[];
  rows?: PlatformFlowRow[];
  notice?: { en: string; ko: string };
}

export interface PlatformContent {
  topPrelude?: {
    label: string;
    introTitle: string;
    introLines: string[];
    bigTitle: string;
    diagram: { src: string; alt: string };
  };
  hero: {
    title: string;
    image: { src: string; alt: string };
    intro: ContentBlock[];
  };
  sections: PlatformSection[];
}

export const platformContentEn: PlatformContent = {
  topPrelude: {
    label: 'PLATFORM',
    introTitle: 'KOLLAB KOREA',
    introLines: [
      'KOLLAB KOREA curates and operates Korean beauty, fashion, lifestyle, F&B, and goods brands,',
      'and connects validated brands to successful U.S. market entry through pop-up opportunities.',
      'We curate brands, operate spaces with efficiency,',
      'and create offline growth opportunities across markets.',
      'Starting in Korea, we move together toward the world.'
    ],
    bigTitle:
      'KOLLAB KOREA is a global launch platform that connects brands, influencers, consumers, distributors, and retail into one structure.',
    diagram: {
      src: '/assets/photos/shoots/about-diagram.png',
      alt: 'KOLLAB Korea cross-border platform structure diagram'
    }
  },
  hero: {
    title: 'PLATFORM',
    image: {
      src: '/assets/photos/shoots/design_guide02.png',
      alt: 'Seongsu pop-up interior concept'
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

export type PlatformContentType = PlatformContent;

