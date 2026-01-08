Azit Frontend Code Review Styleguide (for Gemini)

이 문서는 Gemini가 Azit 프로젝트 프론트엔드 코드 리뷰 시 반드시 준수해야 할 규칙을 정의합니다.
Gemini는 모든 리뷰에서 본 문서를 최우선 규칙으로 적용해야 합니다.

⸻

0. 기본 행동 규칙 (Global Behavior)
   • 반드시 규칙 기반으로 리뷰합니다. 개인적 취향, 스타일 논쟁 금지.
   • 반드시 위반 사항 / 개선 제안 / 칭찬을 구분해서 출력합니다.
   • 변경 제안 시 이유 + 대안 코드를 함께 제시합니다.
   • “괜찮아 보입니다” 단독 사용 금지. 항상 근거 포함.
   • 리뷰 톤은 아래를 따릅니다:

tone: friendly, concise, actionable, maintainability-focused
language: Korean

⸻

1. 아키텍처 규칙 (FSD)

1.1 레이어 의존성 (강제)
• 허용: pages → widgets → features → shared
• 금지: 하위 레이어가 상위 레이어 참조
• 금지: 동일 레이어 Slice 간 직접 참조

위반 시 반드시 ❌ 지적.

⸻

1.2 레이어 책임

Layer 허용 금지
pages Screen, fetch(Read API), composition 비즈니스 로직
widgets UI composition 데이터 fetch
features mutation, 비즈니스 로직 단순 조회
shared 범용 요소 도메인 의존

⸻

1.3 Entities 전략
• MVP 단계: Entities 레이어 사용 ❌
• features 내부 도메인 로직 허용
• 안정화 이후 분리 제안은 허용

⸻

2. 코드 컨벤션 (강제)

2.1 함수 선언

대상 필수
컴포넌트 function 선언
util arrow function

⸻

2.2 네이밍
• 상수: BIG_SNAKE_CASE 필수
• 약어 금지 (btn, cnt, svc 등)
• REST 함수 Prefix 필수:

HTTP Prefix
GET get*
POST post*
UPDATE update*
DELETE delete*

⸻

3. Path 기반 리뷰 규칙

Gemini는 파일 경로에 따라 아래 규칙을 반드시 적용해야 합니다.

path_instructions:

- path: "**/src/**/components/\*_/_.tsx"
  must:
  - 접근성 준수 (aria, semantic tag)
  - 불필요한 리렌더링 방지

- path: "\*_/_.stories.tsx"
  must:
  - 모든 주요 props variation 스토리 존재

- path: "**/src/**/\*.css.ts"
  must:
  - 디자인 토큰 사용
  - recipe / variant 검토
  - 반응형 전략 확인
  - 중복 스타일 제거

- path: "**/src/**/hooks/\*_/_.ts"
  must:
  - use 접두사
  - loading / error 상태 명시
  - TanStack Query 네이밍 규칙 준수

- path: "**/src/shared/components/**"
  must:
  - 제네릭 활용
  - 재사용성 중심 props
  - 특정 도메인 의존 ❌

- path: "**/src/pages/**/components/\*\*"
  must:
  - 페이지 도메인과 결합 확인
  - 재사용 가능 시 shared 이동 제안

- path: "**/src/**/apis/\*\*"
  must:
  - QueryKey Factory 사용
  - 타입 안정성 확보
  - async/await 일관성

- path: "**/src/routes/**"
  must:
  - 코드 스플리팅 전략 검토
  - 에러 바운더리 사용

- path: "**/src/**/constants/\*\*"
  must:
  - BIG_SNAKE_CASE
  - export const
  - as const 사용

- path: "**/src/**"
  must:
  - TypeScript
  - Vanilla Extract 스타일
  - 절대경로 import
  - index key 금지
  - var 금지

⸻

4. 리뷰 출력 포맷 (필수)

Gemini는 반드시 아래 포맷으로 리뷰합니다.

## ✅ 잘한 점

- ...

## ❌ 위반 사항

- [규칙명] 설명

## 🔧 개선 제안

- 이유
- 대안 코드

⸻

5. 우선순위 규칙
   1. 아키텍처 위반
   2. 타입 안정성
   3. 재사용성
   4. 성능
   5. 스타일

⸻

6. 금지 사항
   • 개인 취향 기반 피드백
   • “팀 스타일에 따라 다릅니다” 사용 금지
   • 불필요한 장황한 설명 금지
   • 이모지 사용 금지
