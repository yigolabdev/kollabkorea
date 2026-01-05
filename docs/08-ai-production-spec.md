# 08-ai-production-spec.md  
AI-Driven Brand Page Production Specification v1.0

---

## 1. 이 문서의 목적

이 문서는 **Brand Page를 AI 스튜디오(Gemini, GPT, Claude 등)로 실제 생산하기 위한
범용 실행 규격**이다.

이 문서는:
- 프롬프트 예시 모음 ❌
- 특정 툴 사용법 ❌  

→ **사람·AI·도구가 달라도 결과 정합성이 유지되도록 하는 ‘제작 규칙’**이다.

---

## 2. AI 제작의 기본 원칙

### 원칙 1. AI는 ‘창작자’가 아니다
AI는 아이디어를 만들지 않는다.  
**이미 정의된 구조를 구현한다.**

→ 판단은 항상 상위 문서(00–07)에 있다.

---

### 원칙 2. 전체 생성 금지
- 전체 페이지 한 번에 생성 ❌
- 스타일 포함 생성 ❌

→ **Section Module 단위 생성만 허용**

---

### 원칙 3. 재생성은 국소적으로
- 수정 요청 = 모듈 단위
- 재작성 ≠ 재설계

---

## Prompt Delivery Rule (Mandatory)

All AI production prompts must be delivered in a **single code block**.

Rules:
- No inline text prompts
- No conversational instructions
- No mixed explanation + prompt delivery

Rationale:
- Prevent instruction leakage
- Preserve execution boundaries
- Ensure reproducibility across AI studios

Any prompt not delivered as a code block
is considered **invalid and non-executable**.

---

## 3. AI 입력 구조 (고정)

모든 AI 요청은 아래 구조를 따른다.

[Context]

브랜드 성격 요약 (brand-core-addon 참조)

현재 작업 문서 번호

[Module Type]

Hero Signal / Narrative / Grid / Continuity 등

[Intent]

이 모듈이 수행해야 할 인식 목적 (1문장)

[Constraints]

금지 요소

최대 텍스트 길이

레이아웃 타입

[Output Format]

텍스트 / 구조 / 목록 등


이 구조를 벗어나는 프롬프트는 허용되지 않는다.

---

## 4. Module별 AI 생성 규칙

### 4.1 Signal Module 생성 규칙

- 출력: 문장 1개 또는 이미지 설명
- 길이: 최대 15단어
- 금지:
  - 설명
  - 수식어 중첩
  - CTA

---

### 4.2 Narrative Module 생성 규칙

- 출력: 2–4 문장 블록
- 각 문장은 독립 의미
- 금지:
  - 결론 제시
  - 요약 문장

---

### 4.3 Grid Module 생성 규칙

- 출력: 항목 리스트
- 항목당 최대 10단어
- 설명 문장 ❌
- 감정 표현 ❌

---

### 4.4 Continuity Module 생성 규칙

- 출력: 짧은 제안 문장 + 링크 텍스트
- 설득 문구 ❌
- urgency 표현 ❌

---

## 5. 스타일 생성 금지 규칙

AI에게 아래 항목을 요구하지 않는다.

- 색상
- 폰트
- 그래픽 스타일
- 모션 효과

→ 스타일은 **brand-visual-language.md**에서만 정의

---

## 6. 수정 요청 규칙 (중요)

AI 수정 요청은 반드시 다음 중 하나여야 한다.

- “톤을 더 절제”
- “텍스트 밀도 감소”
- “문장 수 축소”
- “Signal에 더 가깝게”

아래 요청은 금지된다.
- “더 감각적으로”
- “더 트렌디하게”
- “좀 멋있게”

---

## 7. AI 출력 검증 체크

생성 결과는 반드시 아래를 통과해야 한다.

- 00 문서 위반 여부
- 레이아웃 순수성 유지 여부
- 콘텐츠 밀도 초과 여부
- 설득 언어 포함 여부

하나라도 실패 시 폐기한다.

---

## 8. 멀티 AI 환경 대응 규칙

- 동일 모듈을 2개 AI로 생성 가능
- 선택 기준은 ‘멋’이 아니라 **규칙 준수율**
- 혼합 편집 ❌ (한 AI 결과만 사용)

---

## 9. 이후 문서와의 연결

| 문서 | 연결 |
|----|----|
| 05-section-modules.md | 생성 단위 정의 |
| 06-content-framework.md | 텍스트 밀도 검증 |
| 10-quality-evolution-check.md | 결과 검수 |

---

## 10. 선언

> AI로 만든 페이지와  
> 사람이 만든 페이지의 차이는  
> **규칙을 지켰는가의 차이뿐이다.**

---

End of Document
