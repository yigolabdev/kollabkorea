# 05-section-modules.md  
Universal Section Module System v1.0

---

## 1. 이 문서의 목적

이 문서는 **Brand Page를 구성하는 ‘섹션 단위’를 표준화**한다.  
레이아웃(04)을 실제 제작 가능한 **모듈 단위**로 분해하여  
AI·디자이너·개발자 모두가 동일한 단위로 작업하도록 만든다.

이 문서는:
- 컴포넌트 명세 ❌
- 디자인 가이드 ❌  
→ **Brand Page의 최소 의미 단위 정의서**다.

---

## 2. Section Module의 정의

Section Module이란:
- 하나의 인식 목적을 가지며
- 하나의 레이아웃 타입을 따르고
- 단독으로도 의미가 유지되는 블록

이다.

> 모듈은 “예쁜 블록”이 아니라  
> **인식 단위**다.

---

## 3. 모듈 설계의 3대 원칙

### 원칙 1. Single Intent
- 한 모듈 = 하나의 역할
- 두 가지 메시지 ❌

### 원칙 2. Layout Purity
- 하나의 레이아웃 타입만 사용
- 혼합 금지

### 원칙 3. Replaceable
- 삭제·교체해도 전체 구조 붕괴 ❌

---

## 4. 범용 Section Module 목록

아래 모듈은 **모든 브랜드 페이지에서 공통 사용 가능**하다.

---

### 4.1 Hero Signal Module

- 레이아웃: Signal
- 목적: 첫 인식 형성
- 포함 요소:
  - 문장 1–2개 또는 이미지/영상
- 금지:
  - 설명
  - 수치
  - CTA 강조

---

### 4.2 Philosophy / Point of View Module

- 레이아웃: Narrative
- 목적: 브랜드 관점 전달
- 포함 요소:
  - 짧은 문장 블록
  - 질문 또는 선언
- 규칙:
  - 한 화면 = 한 생각

---

### 4.3 Context Explanation Module

- 레이아웃: Narrative
- 목적: 존재 이유 설명
- 포함 요소:
  - 문제 인식
  - 브랜드 시각
- 금지:
  - 연혁 나열
  - 자기자랑

---

### 4.4 Evidence Grid Module

- 레이아웃: Grid
- 목적: 신뢰 축적
- 포함 요소:
  - 프로젝트
  - 파트너
  - 숫자
- 규칙:
  - 설명 최소
  - 스캔 가능

---

### 4.5 Highlight Case Module

- 레이아웃: Archive
- 목적: 깊이 허용
- 포함 요소:
  - 대표 사례
  - 상세 링크
- 규칙:
  - Brand Page 주 서사와 분리

---

### 4.6 Quote / Statement Module

- 레이아웃: Narrative 또는 Signal
- 목적: 인식 강화
- 포함 요소:
  - 한 문장 인용
- 규칙:
  - 장식용 사용 금지

---

### 4.7 Media / Visual Emphasis Module

- 레이아웃: Signal
- 목적: 감정 환기
- 포함 요소:
  - 이미지 / 영상 단독 사용
- 규칙:
  - 설명 텍스트 최소 또는 없음

---

### 4.8 Continuity / Soft CTA Module

- 레이아웃: Continuity
- 목적: 관계 제안
- 포함 요소:
  - Contact
  - Apply
- 규칙:
  - 강요 금지
  - 페이지 주 서사와 분리

---

## 5. 모듈 조합 규칙

- 동일 모듈 연속 사용 가능 (Grid 제외)
- Narrative 모듈은 연속 2개까지 허용
- Signal 모듈은 전체 페이지 기준 3개 이하 권장

---

## 6. 모듈 순서 기본 패턴 (권장)

Hero Signal
→ Philosophy
→ Context
→ Evidence Grid
→ Highlight Case (Optional)
→ Quote / Visual
→ Continuity

---

## 7. AI 제작 단위와의 연결

- **1 Module = 1 AI 생성 단위**
- 수정/재생성은 모듈 단위로만 수행
- 전체 페이지 재생성 금지

---

## 8. 이후 문서와의 연결

| 문서 | 연결 |
|----|----|
| 06-content-framework.md | 모듈 내부 콘텐츠 규칙 |
| 08-ai-production-spec.md | 모듈 생성 프롬프트 규격 |
| 10-quality-evolution-check.md | 모듈 일관성 검증 |

---

## 9. 선언

> 섹션을 통제하지 못하면  
> 페이지는 반드시 무너진다.

---

End of Document
