export const contactContentEn = {
  hero: {
    title: 'SPACE STRUCTURE',
    deck: 'Flexible spaces based on brand goals'
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
    tiers: [
      {
        name: 'STANDARD',
        accent: 'default',
        linesEn: ['Central module zone', '1 month', 'On-site photo / short-form content', 'Sales report', 'U.S. pop-up application eligible'],
        linesKo: ['중앙 모듈 존', '1개월', '현장 사진, 숏폼컨텐츠', '판매 리포트', '미국 팝업 신청가능']
      },
      {
        name: 'PREMIUM',
        accent: 'premium',
        linesEn: ['Highest visibility', 'Main zone', '1 month or 3 months', 'On-site photo / short-form content', 'Sales report', 'Korea & U.S. pop-ups concurrently'],
        linesKo: ['가장 높은 노출', '메인 존', '1개월 또는 3개월', '현장 사진, 숏폼컨텐츠', '판매 리포트', '한국&미국 팝업 동시진행']
      },
      {
        name: 'BASIC',
        accent: 'default',
        linesEn: ['Wall display zone', '2 weeks or 1 month', 'On-site photo provided', 'Sales report', 'U.S. pop-up application eligible'],
        linesKo: ['벽면 선반형 존', '2주 또는 1개월', '현장 사진 제공', '판매 리포트', '미국 팝업 신청가능']
      }
    ]
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
    title: 'Submit Application',
    fields: {
      brandName: 'Brand Name',
      contactPerson: 'Contact Person',
      phone: 'Phone',
      email: 'Email',
      category: 'Category',
      website: 'Website / SNS',
      message: 'Message'
    },
    submit: 'SUBMIT APPLICATION'
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

