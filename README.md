# 🏃‍♂️ AZIT (아지트) - 러닝 크루를 위한 운영 및 제휴 서비스
![](https://img.shields.io/badge/CMC_18th-청춘탐험대-blue) ![](https://img.shields.io/github/contributors/Central-MakeUs/AZIT_Front) ![](https://img.shields.io/github/last-commit/Central-MakeUs/AZIT_Front)
<img width="1920" height="1080" alt="1" src="https://github.com/user-attachments/assets/447349c4-98e3-447d-8d09-1e6d7b23c9ca" />


**"크루원과 함께하는 실시간 출석 인증부터 아지트 전용 스토어까지"**

AZIT는 러닝 크루의 일정을 체계적으로 관리하고, 위치 기반 출석 체크 및 포인트 적립을 통해 크루원들의 참여도를 높이는 러닝 크루 전용 플랫폼입니다.   
React Native와 React WebView를 결합한 하이브리드 앱을 개발 및 운영합니다.

<br>
<div align="center">
  <a href="https://apps.apple.com/kr/app/%EC%95%84%EC%A7%80%ED%8A%B8-azit/id6758881115" target="_blank">
    <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Download on the App Store" height="40" align="middle">
  </a>
  <a href="https://play.google.com/store/apps/details?id=com.azitcrew.app&hl=ko" target="_blank">
    <img src="https://play.google.com/intl/en_us/badges/static/images/badges/ko_badge_web_generic.png" alt="Get it on Google Play" height="54" align="middle">
  </a>
</div>
<br>

## ✨ 핵심 기능
<div align="center">
  <img src="https://github.com/user-attachments/assets/d9faf147-acce-4c12-b06c-963053ac7d39" alt="스크린샷1" width="19%">
  <img src="https://github.com/user-attachments/assets/431a3f81-ac53-4280-ad90-e195c3749731" alt="스크린샷2" width="19%">
  <img src="https://github.com/user-attachments/assets/50411a62-8091-4d78-a1b9-482da3dcb199" alt="스크린샷3" width="19%">
  <img src="https://github.com/user-attachments/assets/707e9697-2091-4053-8d8b-071834341681" alt="스크린샷4" width="19%">
  <img src="https://github.com/user-attachments/assets/9c06c0a7-0aa8-48ee-af4a-f2b12ddb8a20" alt="스크린샷5" width="19%">
</div>
<br>

### 1. 📍 실시간 위치 기반 출석 체크
* **GPS 기반 인증**: 모임 장소 반경 100m 이내에서만 출석하기 버튼이 활성화되어 정확한 출석을 유도합니다.
* **스마트 타임 윈도우**: 모임 시간 1시간 전부터 1시간 후까지만 출석이 가능하도록 제한하여 운영의 신뢰성을 높였습니다.
* **홈 위젯**: 앱 진입 시 가장 가까운 일정의 출석 가능 상태(D-Day, 남은 시간)를 직관적으로 확인할 수 있습니다.

### 2. 📅 캘린더 기반 러닝 참여 및 생성
* **월별 일정 조회**: 정기런과 번개런을 캘린더에 색상 점(Dot)으로 구분하여 한눈에 크루 일정을 파악할 수 있습니다.
* **충돌 방지 로직**: 내가 이미 참여 중인 일정과 시간이 겹치는 새로운 일정에는 참여할 수 없도록 검증 로직이 적용되어 있습니다.

### 3. 🎁 출석 보상 및 전용 스토어
* **포인트 적립**: 출석을 완료할 때마다 자동으로 100 포인트가 즉시 적립됩니다.
* **아지트 크루 전용 스토어**: 모은 포인트를 활용해 러닝 용품 등 아지트만의 특별한 상품을 합리적인 가격에 주문할 수 있습니다.

### 4. 👥 크루 관리
* 운영진을 위한 가입 승인/거절, 멤버 방출 등의 원스톱 멤버 관리가 가능합니다.

<br>

## 🛠 기술 스택
| 영역 | 기술 |
|------|------|
| **Web Framework** | React 19.1, TypeScript, Vite |
| **Mobile** | React Native 0.81, Expo 54, TypeScript |
| **Routing** | Stackflow |
| **State Management** | Zustand, TanStack Query |
| **Styling** | Vanilla Extract |
| **Design System** | Radix UI, Storybook |
| **Validation** | Zod |
| **HTTP Client** | Ky |
| **Bridge** | webview-bridge |
| **Package Manager** | pnpm |
| **Monorepo** | Turborepo |
| **Linting / Formatting** | ESLint, Prettier, commitlint |
| **Git Hooks** | Lefthook |
| **CI/CD** | GitHub Actions, Vercel, AWS |
| **Code Review** | Gemini Code Assist |

<br>

## 🏗️ 프로젝트 구조

pnpm 워크스페이스 기반의 모노레포로 구성되어 있습니다.

```
AZIT_Front/
├── apps/
│   ├── web/       # React + Vite (메인 웹앱, FSD 아키텍처)
│   └── mobile/    # Expo React Native (WebView 쉘)
└── packages/
    ├── bridge/        # 웹-앱 브릿지 공유 타입
    └── design-system/ # 공유 디자인 시스템
```

웹앱은 [Feature-Sliced Design(FSD)](https://github.com/Central-MakeUs/AZIT_Front/wiki/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B5%AC%EC%A1%B0) 아키텍처를 따릅니다.

```
apps/web/src/
├── app/       # 라우팅, 프로바이더, 글로벌 스타일
├── pages/     # 화면 컴포넌트
├── widgets/   # 여러 feature를 조합한 재사용 UI 블록
├── features/  # 사용자 시나리오 단위 기능 (auth, schedule, store, cart, order …)
├── entities/  # 도메인 엔티티 (user, crew, schedule, order, cart, address …)
└── shared/    # 공통 유틸, UI 원자, API 클라이언트
```

<br>

## 🚀 실행 방법

### 설치

```bash
pnpm install
```

### 개발 서버 실행

```bash
# Web + Mobile 전체
pnpm dev

# Web만
pnpm dev:web

# Mobile만
pnpm dev:mobile
```

### 빌드

```bash
# 전체 빌드
pnpm build

# Web만
pnpm build:web
```


- 프로젝트 구조는 [위키](https://github.com/Central-MakeUs/AZIT_Front/wiki/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B5%AC%EC%A1%B0)를 참고해주세요!
