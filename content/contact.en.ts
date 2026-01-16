export const contactContentEn = {
  hero: {
    title: 'JOIN\nKOLLAB',
    deck: 'Join KOLLAB to expand your brand globally'
  },
  mechanismSection: {
    title: '',
    cards: [
      {
        title: 'Validate',
        body: 'Test real demand through in-person experience.\nCapture customer response and product performance.'
      },
      {
        title: 'Operate',
        body: 'Run a structured retail system — space, staffing, and execution.\nBuild repeatable offline playbooks.'
      },
      {
        title: 'Expand',
        body: 'Turn validated brands into cross-border opportunities.\nConnect to U.S. pop-ups and retail channels.'
      }
    ]
  },
  spaceStructure: {
    title: 'SPACE STRUCTURE',
    subtitleEn: 'FLEXIBLE SPACES BASED ON BRAND GOALS',
    subtitleKo: '브랜드 목표에 맞춘 유연한 공간 구조',
    rowLabels: ['Display Zone /\nMedia Play', 'Product Sales', 'Content Support', 'Influencer Exposure', 'Kollab SNS Exposure', 'Monthly Kollab Influencer Event', 'U.S. Pop-up & Retail Shop Application'],
    tiers: [
      {
        name: 'BASIC',
        subtitle: '20 Brands',
        accent: 'default',
        linesEn: ['Designated zone', 'O', 'Basic content support', 'X', 'IG Story (brand tag)', 'X', 'O'],
        linesKo: ['뒤쪽 전업 존', 'O', '기본 컨텐츠 서포트', 'X', 'IG Story (브랜드 태그)', 'X', 'O']
      },
      {
        name: 'PREMIUM',
        subtitle: '4 Brands',
        accent: 'premium',
        linesEn: ['Main zone', 'O', 'Short-form video + Product/Store photos + Brand content', '5 people', 'IG Post + Story + TikTok', 'O', 'O'],
        linesKo: ['메인 존', 'O', '숏폼 영상 + 제품/매장 사진 + 브랜드 콘텐츠 제공', '월 5명', 'IG Post + Story + TikTok', 'O', 'O']
      },
      {
        name: 'STANDARD',
        subtitle: '6 Brands',
        accent: 'default',
        linesEn: ['Central module zone', 'O', 'Short-form video + Product/Store photos', '2 people', 'IG Post + Story', 'X', 'O'],
        linesKo: ['중앙 모듈존', 'O', '숏폼 영상 + 제품/매장 사진', '월 2명', 'IG Post + Story', 'X', 'O']
      }
    ],
    additionalInfo: {
      titleKo: '입점 프로세스',
      titleEn: 'Application Process',
      stepsKo: [
        '1. 브랜드 신청서 제출 및 검토',
        '2. 공간 구조 및 플랜 선택',
        '3. 계약 체결 및 입점 준비',
        '4. 브랜드 론칭 및 마케팅 시작'
      ],
      stepsEn: [
        '1. Submit brand application and review',
        '2. Select space structure and plan',
        '3. Contract signing and preparation',
        '4. Brand launch and marketing start'
      ],
      noteKo: '※ BASIC 플랜은 2주 또는 1개월 단위로, STANDARD와 PREMIUM 플랜은 1개월 단위로 운영됩니다. 제품 판매 및 재고 관리는 브랜드에서 직접 진행합니다.',
      noteEn: '※ BASIC plan operates on a 2-week or 1-month basis, while STANDARD and PREMIUM plans operate monthly. Product sales and inventory management are handled directly by the brand.'
    }
  },
  whoShouldApply: {
    title: 'Who Should Apply',
    items: [
      { en: 'Have a clear brand identity and positioning', ko: '명확한 브랜드 아이덴티티' },
      { en: 'Are ready for offline customer engagement', ko: '오프라인 고객 경험 준비' },
      { en: 'Seek validation before global expansion', ko: '글로벌 확장 전 검증' },
      { en: 'Aim for sustainable, long-term growth', ko: '지속 가능한 성장' }
    ]
  },
  contactInfo: {
    title: 'Contact Information',
    emailLabel: 'EMAIL',
    email: 'info@kollabkorea.com',
    instagramLabel: 'INSTAGRAM',
    instagram: '@kollab_korea',
    instagramUrl: 'https://instagram.com/kollab_korea'
  },
  form: {
    title: 'Submit Your Application',
    fields: {
      brandName: 'Brand Name',
      contactPerson: 'Contact Person',
      phone: 'Phone',
      email: 'Email',
      category: 'Category',
      website: 'Website / SNS',
      message: 'Message'
    },
    submit: 'SUBMIT APPLICATION',
    submitting: 'SENDING...',
    successTitle: 'Submission received.',
    successBody: 'Your inquiry has been received. We will get back to you as soon as possible.',
    errorTitle: 'Failed to send.',
    errorBody: 'Please try again shortly. If the issue persists, contact us via email.',
    validation: {
      required: 'This field is required.',
      invalidEmail: 'Please enter a valid email.'
    }
  },
  applyLeft: {
    copy:
      'KOLLAB welcomes brands with a clear identity and readiness for offline customer experience.\nAs you prepare for global expansion, we look forward to brands that think with us about validation\nand sustainable growth.'
  },
  banner: {
    title: 'READY TO GO\nGLOBAL?',
    line: 'Promote your brand with KOLLAB SEOUL.'
  }
};

export type ContactContent = typeof contactContentEn;

