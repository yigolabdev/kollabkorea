import type { ContentBlock, ContentSection } from './contentBlocks';

export interface AboutContent {
  pageLabel: string;
  hero: { title: string; deck: string };
  topPrelude?: {
    label: string;
    introTitle: string;
    introLines: string[];
    bigTitle: string;
    diagram: { src: string; alt: string };
  };
  structureSection?: {
    title: string;
    leftNode: { title: string; subtitle: string };
    rightNode: { title: string; subtitle: string };
    lanes: { text: string }[];
  };
  readyBanner?: {
    title: string;
    line: string;
  };
  gallery: { images: { src: string; alt: string }[] };
  sections: ContentSection[];
}

export const aboutContentEn: AboutContent = {
  pageLabel: 'ABOUT',
  structureSection: {
    title:
      'KOLLAB KOREA is a global launch platform that connects brands, influencers, consumers, distributors, and retail into one structure.',
    leftNode: { title: 'KOLLAB', subtitle: 'KOREA\nSeongsu' },
    rightNode: { title: 'KOLLAB', subtitle: 'Downtown\nLA' },
    lanes: [
      { text: 'Brand onboarding (monthly)\nreasonable cost · products only' },
      { text: 'KOLLAB retail platform\nintegrated offline execution structure' },
      { text: 'Consumers · offline experience\nconversion · awareness' },
      { text: 'Influencers · voluntary visits\ncontent · social spread' },
      { text: 'Data & validation · sales data\ncontent performance · customer response' },
      { text: 'Distribution & major retail opportunities\nKorea & U.S. validation and expansion' }
    ]
  },
  readyBanner: {
    title: 'READY TO GO\nGLOBAL?',
    line: 'Promote your brand with KOLLAB KOREA.'
  },
  topPrelude: {
    label: 'ABOUT',
    introTitle: 'KOLLAB KOREA',
    introLines: [
      'selects and operates Korean beauty, fashion, lifestyle, F&B, and goods brands,',
      'connecting validated brands to successful U.S. market entry.',
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
    title: 'Born in Los Angeles.\nOperated in Korea.',
    deck: 'Where Global Ambition Meets Local Expertise'
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
          en: 'We curate brands and operate spaces with efficiency,\ncreating offline growth opportunities across markets.'
        }
      ]
    },
    {
      id: 'intro',
      title: '',
      blocks: [
        {
          kind: 'lead',
          en:
            'KOLLAB is an LA-born,\nexperience-driven curation retail platform.'
        },
        {
          kind: 'body',
          en:
            'KOLLAB KOREA selects and operates brands in the Korean market\nand connects validated brands to U.S. pop-up opportunities.'
        }
      ]
    },
    {
      id: 'what-we-do',
      title: 'What We Do',
      blocks: [
        { kind: 'body', en: 'We build an offline pathway from Korea to the U.S.' }
      ]
    },
    {
      id: 'platform-not-consulting',
      title: '',
      blocks: [
        {
          en:
            'KOLLAB does not offer consulting or one-time promotions.\nWe provide a structure where brands can validate → grow → expand\nthrough real retail experience.'
        }
      ]
    },
    {
      id: 'our-philosophy',
      title: 'Our Philosophy',
      blocks: [
        {
          kind: 'body',
          en: 'We believe brands grow strongest\nwhen they are experienced in person.'
        },
        {
          kind: 'body',
          en:
            'Offline experience creates trust, insight, and momentum\nthat digital exposure alone cannot replace.'
        }
      ]
    },
    {
      id: 'our-role',
      title: 'Our Role',
      blocks: [
        { kind: 'quote', en: 'KOLLAB is not an agency.\nKOLLAB is a platform.' },
        {
          en:
            'We curate brands, operate spaces,\nand create offline growth opportunities across markets.'
        }
      ]
    }
  ]
};

export type AboutContentType = AboutContent;

