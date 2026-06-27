# AZIT Web — Claude Code Guide

## 프로젝트 개요

AZIT는 크루(팀) 기반 일정 관리 + 커머스 통합 플랫폼이다.  
주요 도메인: 스케줄, 크루, 커머스(스토어·장바구니·주문), 주소, 마이페이지, 알림, 설정

**모노레포 위치:** `apps/web` (루트: `AZIT_Front`)

---

## 기술 스택

| 분류              | 라이브러리                                                |
| ----------------- | --------------------------------------------------------- |
| UI                | React 19, TypeScript (strict)                             |
| 빌드              | Vite 7                                                    |
| 라우팅/네비게이션 | Stackflow (앱 스택 기반)                                  |
| 서버 상태         | TanStack React Query v5                                   |
| 클라이언트 상태   | Zustand v5                                                |
| HTTP              | ky (Bearer 토큰 자동 주입, 401 시 토큰 갱신)              |
| API 타입          | openapi-typescript (자동 생성 → `shared/api/apiTypes.ts`) |
| 스타일            | Vanilla Extract (CSS-in-TS, 제로 런타임)                  |
| 폼 검증           | Zod v4                                                    |
| 에러 추적         | Sentry                                                    |
| 지도              | Naver Maps API                                            |
| 테스트            | Vitest + jsdom                                            |

---

## 아키텍처: Feature Sliced Design (FSD)

```
src/
├── app/          # 부트스트랩, 라우터, 프로바이더, 글로벌 스타일
├── entities/     # 도메인 모델 (api, model, ui, styles)
├── features/     # 사용자 인터랙션 단위
├── pages/        # 라우트 단위 화면 (features + widgets 조합)
├── shared/       # 공통 인프라 (API 클라이언트, 쿼리, 스토어, UI, 유틸)
└── widgets/      # 재사용 가능한 복합 UI 블록
```

각 슬라이스 내부 구조: `api/`, `model/`, `ui/`, `styles/`, `lib/`

---

## 디렉토리 구조

### entities/

| 디렉토리         | 도메인        |
| ---------------- | ------------- |
| `Address/`       | 주소록        |
| `CommerceCart/`  | 장바구니      |
| `CommerceOrder/` | 주문          |
| `CommerceStore/` | 상품/스토어   |
| `Crew/`          | 크루(팀) 관리 |
| `Schedule/`      | 일정/이벤트   |
| `location/`      | 지오로케이션  |
| `user/`          | 유저 프로필   |

> **주의:** 모든 엔티티 디렉토리명은 PascalCase (`Crew`, `Schedule` 등). import 시 대소문자 일치 필수.

### pages/ (도메인별 그룹)

```
pages/
├── Address/          # AddressSettingPage, AddressRegisterPage, AddressSearchPage, AddressEditPage
├── CommerceCart/     # CommerceCartPage
├── CommerceOrder/    # CommerceOrderPage, CommerceOrderDetailPage, CommerceOrderCompletePage, CommerceOrderHistoryPage
├── CommerceStore/    # CommerceStorePage, CommerceStoreDetailPage
├── Crew/             # CrewPage, CrewInfoEditPage, CrewMemberManagePage, CrewMemberViewPage, CrewAttendancePage, CrewBannedStatusPage
├── Onboarding/       # OnboardingPage, OnboardingTermAgreePage, OnboardingCompletePage
├── Schedule/         # SchedulePage, ScheduleDetailPage, ScheduleCreatePage, ScheduleEditPage, ScheduleMembersPage, ScheduleLocationPage
├── Settings/         # SettingsPage, SettingsNotificationPage, SettingsTermDetailPage
├── HomePage/
├── LoginPage/
├── MyPage/
├── MyProfileEditPage/
├── NotFoundPage/
├── HomeNotificationPage/
└── LoginRedirectPage/     # Kakao OAuth 콜백
```

### features/ (kebab-case)

`auth`, `address`, `cart`, `order`, `store`, `term-agree`  
`crew-create`, `crew-join`, `crew-join-status`, `crew-confirm-status`, `crew-manage`  
`schedule`, `schedule-check-in`, `schedule-create`, `schedule-edit`, `schedule-manage`, `schedule-participate`

---

## 라우팅

- **파일:** `src/app/routes/config.ts`
- **방식:** Stackflow 기반 스택 네비게이션 (앱처럼 동작)
- **코드 스플리팅:** `lazyImport()` 유틸로 모든 페이지 lazy load
- **인증 가드:** `withAuth: true` 라우트는 `withAuth.tsx` HOC가 처리

라우트 추가 시 `config.ts`에 `{ name, path, element, withAuth }` 형식으로 추가.

---

## API 레이어

```
shared/api/apiClient.ts   # ky 기반 HTTP 클라이언트
shared/api/apiTypes.ts    # openapi-typescript 자동 생성 (수동 수정 금지)
shared/api/models/        # 도메인별 요청/응답 모델
shared/queries/           # TanStack Query 커스텀 훅 (도메인별 파일)
```

- 토큰: Bearer 자동 주입 → 401 시 네이티브 브릿지로 갱신 → 재시도
- 403 `INVALID_MEMBER_STATUS` → 크루 강퇴 상태 페이지로 리다이렉트
- API 타입 재생성: `pnpm run generate:api-types`

---

## 스타일링

- **Vanilla Extract** — 모든 스타일 파일은 `[ComponentName].css.ts`
- 컴포넌트와 같은 디렉토리에 위치 (`Button.tsx` + `Button.css.ts`)
- 글로벌 스타일: `src/app/styles/`
- CSS 변수: `src/shared/styles/`
- 런타임 className 조합: `clsx` 사용

---

## 네이밍 규칙

| 대상            | 규칙                   | 예시                             |
| --------------- | ---------------------- | -------------------------------- |
| 컴포넌트 파일   | PascalCase             | `ScheduleListItem.tsx`           |
| 스타일 파일     | PascalCase + `.css.ts` | `ScheduleListItem.css.ts`        |
| 유틸/훅 파일    | camelCase              | `useStack.ts`, `hangul.ts`       |
| 엔티티 디렉토리 | PascalCase             | `CommerceCart/`, `Crew/`         |
| 피처 디렉토리   | kebab-case             | `schedule-create/`, `crew-join/` |
| 페이지 컴포넌트 | 도메인 + `Page` suffix | `CommerceOrderDetailPage`        |
| 쿼리 훅         | `use` + 도메인 + 동작  | `useScheduleDetail`              |

---

## 주요 커맨드

```bash
pnpm dev              # API 타입 생성 후 개발 서버 시작
pnpm build            # tsc 검사 + Vite 빌드
pnpm typecheck        # tsc --noEmit
pnpm lint             # ESLint
pnpm test             # Vitest
pnpm generate:api-types  # OpenAPI → apiTypes.ts 재생성
```

---

## 공통 유틸 (shared/)

| 파일/훅                              | 용도                     |
| ------------------------------------ | ------------------------ |
| `lib/stackflow/useStack.ts`          | Stackflow 네비게이션     |
| `lib/useFunnel.tsx`                  | 멀티스텝 폼              |
| `lib/usePullToRefresh.ts`            | 모바일 당겨서 새로고침   |
| `lib/hangul.ts`                      | 한글 처리 (es-hangul)    |
| `lib/image.ts`                       | 이미지 S3 업로드         |
| `store/auth.ts`                      | 인증 토큰/유저 전역 상태 |
| `store/addressSelection.ts`          | 주소 선택 전역 상태      |
| `ui/async-boundary/`                 | 에러 바운더리 + Suspense |
| `ui/navigation/BottomNavigation.tsx` | 하단 네비게이션 바       |

---

## 주의사항

- `shared/api/apiTypes.ts`는 자동 생성 파일 — 직접 수정 금지
- 엔티티 import 경로는 PascalCase 디렉토리명 정확히 사용 (`@/entities/Crew/...`, `@/entities/Schedule/...`)
- 페이지 import 경로는 도메인 그룹 포함 (`@/pages/CommerceOrder/CommerceOrderDetailPage`)
- `tsconfig.app.json` 경로 별칭: `@/*` → `src/*`
