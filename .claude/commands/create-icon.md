# Create Icon

SVG를 받아 디자인 시스템에 아이콘 컴포넌트를 추가한다.

## 아이콘 컴포넌트 위치

- 컴포넌트: `packages/design-system/src/components/icon/{Name}Icon.tsx`
- export index: `packages/design-system/src/components/icon/index.ts`

## 작업 절차

1. **아이콘 이름을 확인한다**:
   - `$ARGUMENTS`에 이름이 포함되어 있으면 그것을 사용한다.
   - 없으면 AskUserQuestion으로 질문한다: "이 아이콘의 컴포넌트 이름을 입력해주세요 (예: ArrowRight → ArrowRightIcon으로 생성됩니다)"
   - 입력받은 이름은 PascalCase로 정규화하고, 끝에 `Icon`이 없으면 자동으로 붙인다.

2. **SVG를 가져온다** (아래 방법 중 우선순위대로):

   **방법 A — SVG 직접 붙여넣기 (권장)**
   - 사용자에게 Figma에서 해당 노드를 선택 → 우클릭 → "Copy as SVG" 후 여기에 붙여넣어달라고 안내한다.
   - 붙여넣은 SVG 마크업을 파싱하여 도형 요소를 추출한다.

   **방법 B — Figma URL에서 추출 (Figma MCP 인증 완료 시)**
   - `$ARGUMENTS`에 Figma URL이 있으면 node-id를 파싱하여 MCP로 SVG를 가져온다.
   - Figma MCP 인증이 필요하면 OAuth 흐름을 진행하거나 방법 A로 폴백한다.

3. **SVG를 전처리한다**:
   - `fill`, `stroke` 속성 값이 하드코딩된 색상이면 `currentColor`로 교체한다.
   - SVG 루트의 `width`, `height` 고정 속성은 제거한다 (size prop으로 제어).
   - `viewBox` 값은 유지한다.
   - `<path>`, `<circle>`, `<rect>`, `<g>`, `<defs>`, `<clipPath>` 등 내부 요소는 그대로 유지한다.

4. 아래 템플릿으로 컴포넌트 파일을 생성한다:

```tsx
import { forwardRef } from 'react';
import type { Ref } from 'react';
import { clsx } from 'clsx';
import { iconVariant } from './Icon.css';
import type { IconProps } from './types';

function {Name}Icon(
  { size = 24, color, className, ...props }: IconProps,
  ref: Ref<SVGSVGElement>
) {
  return (
    <svg
      viewBox="{viewBox}"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      ref={ref}
      className={clsx(iconVariant({ color }), className)}
      {...props}
    >
      {/* SVG 도형 요소 */}
    </svg>
  );
}

const ForwardRef = forwardRef({Name}Icon);
export default ForwardRef;
```

5. `index.ts`에 export를 **알파벳 순서**에 맞게 삽입한다:

```ts
export { default as {Name}Icon } from './{Name}Icon';
```

6. 완료 후 생성된 파일 경로를 알려주고, 렌더링 확인을 위해 `Icon.stories.tsx`에 추가 여부를 물어본다.

## 주의 사항

- `stroke="currentColor"` 또는 `fill="currentColor"` 로 통일하여 `color` prop이 동작하도록 한다.
- 아이콘이 `fill` 기반이면 `fill="currentColor"` + `stroke="none"`, `stroke` 기반이면 `stroke="currentColor"` + `fill="none"` 으로 처리한다.
- SVG 내부에 `<g>` 래퍼가 있을 경우 그대로 유지한다.
- `clipPath`, `defs` 등 필요한 SVG 정의 요소도 포함한다.
