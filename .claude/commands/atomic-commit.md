# Atomic Commit

현재 staged/unstaged 변경사항을 분석하여 관심사별로 분리된 atomic commit을 수행합니다.

## 작업 절차

1. `git fetch origin`을 먼저 실행한 뒤, `git status`와 `git diff HEAD`로 전체 변경사항을 파악한다.
   - `git status`에서 브랜치가 remote보다 뒤처져 있으면(`behind`), 커밋 전에 자동으로 최신화한다.
   - 최신화 절차: `git stash` → `git pull origin <현재 브랜치>` → `git stash pop`
2. 변경사항을 **관심사(concern)** 기준으로 논리적 그룹으로 분류한다.
   - 예: 모델/타입 변경, 비즈니스 로직, UI 컴포넌트, 스타일, 테스트, 설정 등
   - 서로 의존하는 변경이라도 관심사가 다르면 별도 커밋으로 분리한다.
3. 그룹별로 관련 파일만 staging하여 순서대로 커밋한다.
4. **커밋 메시지 규칙**:
   - 형식: `<emoji> [<type>] <subject>`
   - subject는 **한국어**로 작성한다.
   - type + emoji 매핑:
     - `✨ [feat]` — 새 기능
     - `🐛 [fix]` — 버그 수정
     - `♻️ [refactor]` — 기능 변경 없는 코드 개선
     - `💄 [style]` — 포맷, 세미콜론 등 로직 무관 변경
     - `🔄 [chore]` — 빌드, 설정, 패키지 등
     - `📝 [docs]` — 문서
     - `✅ [test]` — 테스트
     - `⚡️ [perf]` — 성능 개선
   - subject는 명령형, 현재 시제, 마침표 없음
5. **Co-authored-by 줄은 절대 포함하지 않는다.**
6. 각 커밋 전에 어떤 파일을 어떤 메시지로 커밋할지 사용자에게 계획을 보여주고 승인을 받은 뒤 실행한다.

## 출력 형식 (계획 단계)

커밋을 실행하기 전에 아래 형식으로 계획을 출력한다:

```
[커밋 1] ✨ [feat] 아코디언 UI 및 섹션별 컴포넌트 분리
  - src/widgets/schedule-form/ui/AccordionItem.tsx
  - src/widgets/schedule-form/ui/ScheduleFormGoalSection.tsx
  - ...

[커밋 2] ♻️ [refactor] useCallback/useRef 기반 안정적 핸들러로 리팩터링
  - src/widgets/schedule-form/model/useScheduleForm.ts

...
```

계획 승인 후 순서대로 커밋을 실행한다.
