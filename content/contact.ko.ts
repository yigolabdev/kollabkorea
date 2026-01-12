export const contactContentKo = {
  hero: {
    title: 'SPACE STRUCTURE',
    deck: '브랜드 목표에 맞춘 유연한 공간 구조'
  },
  mechanismSection: {
    title: '',
    cards: [
      {
        title: '검증',
        body: '오프라인 경험으로 실제 수요를 검증합니다.\n고객 반응과 제품 성과를 데이터로 확인합니다.'
      },
      {
        title: '운영',
        body: '공간, 인력, 실행을 포함한 구조화된 리테일 시스템을 운영합니다.\n재현 가능한 오프라인 플레이북을 만듭니다.'
      },
      {
        title: '확장',
        body: '검증된 브랜드를 크로스보더 기회로 전환합니다.\n미국 팝업과 리테일 채널로 연결합니다.'
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
    title: '입점 문의',
    fields: {
      brandName: '브랜드명',
      contactPerson: '담당자명',
      phone: '연락처',
      email: '이메일 주소',
      category: '카테고리',
      website: '웹사이트 / SNS',
      message: '브랜드 소개'
    },
    submit: 'SUBMIT APPLICATION',
    submitting: 'SENDING...',
    successTitle: '접수가 완료되었습니다.',
    successBody: '입점 문의가 정상적으로 접수되었습니다. 검토 후 가능한 한 빠르게 회신드리겠습니다.',
    errorTitle: '전송에 실패했습니다.',
    errorBody: '잠시 후 다시 시도해 주세요. 문제가 지속되면 이메일로 문의해 주세요.',
    validation: {
      required: '필수 입력 항목입니다.',
      invalidEmail: '이메일 형식이 올바르지 않습니다.'
    }
  },
  applyLeft: {
    copy:
      '콜랩은 명확한 브랜드 아이덴티티와 오프라인 고객 경험을 준비한 브랜드를 환영합니다.\n\n글로벌 확장을 앞두고 검증과 지속 가능한 성장을 함께 고민하는 브랜드의 참여를 기다립니다.'
  },
  banner: {
    title: 'READY TO GO\nGLOBAL?',
    line: 'KOLLAB SEOUL과 함께 당신의 브랜드를 알리세요.'
  }
};

export type ContactContentKo = typeof contactContentKo;

