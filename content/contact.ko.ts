export const contactContentKo = {
  hero: {
    title: 'JOIN\nKOLLAB',
    deck: '콜랩과 함께 글로벌 시장으로 진출하세요'
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
    rowLabels: ['전업 위치 /\n미디어 플레이', '제품 판매 운영', '콘텐츠 제공', '인플루언서 노출', 'Kollab SNS 노출', 'Monthly 콜랩 인플루언서 이벤트 노출', '미국 팝업 & 리테일샵 동시 입점 신청'],
    tiers: [
      {
        name: 'BASIC',
        subtitle: '20 브랜드',
        accent: 'default',
        linesEn: ['Designated zone', 'O', 'Basic content support', 'X', 'IG Story (brand tag)', 'X', 'O'],
        linesKo: ['뒤쪽 전업 존', 'O', '기본 컨텐츠 서포트', 'X', 'IG Story (브랜드 태그)', 'X', 'O']
      },
      {
        name: 'PREMIUM',
        subtitle: '4 브랜드',
        accent: 'premium',
        linesEn: ['Main zone', 'O', 'Short-form video + Product/Store photos + Brand content', '5 people', 'IG Post + Story + TikTok', 'O', 'O'],
        linesKo: ['메인 존', 'O', '숏폼 영상 + 제품/매장 사진 + 브랜드 콘텐츠 제공', '월 5명', 'IG Post + Story + TikTok', 'O', 'O']
      },
      {
        name: 'STANDARD',
        subtitle: '6 브랜드',
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
    title: '입점 문의 작성하기',
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

