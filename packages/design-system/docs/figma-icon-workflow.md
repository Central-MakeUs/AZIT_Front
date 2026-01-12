# Workflow: Converting Figma Icons to React Components

This document describes the complete process of importing icons from Figma and converting them into reusable React components.

## Overview

This workflow covers the process of converting icons from the Figma design system into React components and integrating them into the project.

## Workflow

### Step 1: Retrieve Icon Information from Figma

1. **Extract Information from Figma URL**
   - `fileKey`: Figma file key (e.g., `VYuTtTgt0ozC3bg1nl1OsI`)
   - `nodeId`: Icon node ID (e.g., `77:2057`)

2. **Use Figma MCP Tools**
   - Get design context: `mcp_Figma_get_design_context(fileKey, nodeId)`
   - Get metadata: `mcp_Framelink_MCP_for_Figma_get_figma_data(fileKey, nodeId)`
   - Visual confirmation: `mcp_Figma_get_screenshot(fileKey, nodeId)`

3. **Information to Verify**
   - Icon name
   - Type (COMPONENT, IMAGE-SVG, etc.)
   - Dimensions (width, height)
   - Style attributes (stroke, fill, etc.)

### Step 2: Download SVG File

```typescript
mcp_Framelink_MCP_for_Figma_download_figma_images(
  fileKey,
  localPath: 'packages/design-system/src/shared/assets/icon',
  nodes: [{ nodeId, fileName: 'icon-name.svg' }]
)
```

**Save Path**: `packages/design-system/src/shared/assets/icon/{icon-name}.svg`

### Step 3: Convert to React Component

#### Conversion Rules

1. **SVG Attribute Conversion**
   - Transform SVG attributes from kebab-case to camelCase
   - Use `currentColor` for fill and stroke attributes

2. **Component Structure**

   ```tsx
   import { forwardRef } from 'react';
   import type { Ref, SVGProps } from 'react';

   function IconName(
     {
       size = 24,
       ...props
     }: SVGProps<SVGSVGElement> & {
       size?: number | string;
     },
     ref: Ref<SVGSVGElement>
   ) {
     return (
       <svg
         viewBox="0 0 24 24"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
         width={size}
         height={size}
         ref={ref}
         className={clsx(iconVariant({ color }), className)}
         {...props}
       >
         {/* SVG path content */}
       </svg>
     );
   }

   const ForwardRef = forwardRef(IconName);
   export default ForwardRef;
   ```

   **Common Patterns**:
   - Use `forwardRef`
   - Support `size` prop (default: 24)
   - Support `SVGProps<SVGSVGElement>` type
   - Use `currentColor` (for theme color support)

3. **Save and Export component**
   - Save component to `packages/design-system/src/components/icon/{icon-name}.tsx`
   - Export component in `packages/design-system/src/components/icon/index.ts` using:

   ```tsx
   export { default as IconName } from './IconName';
   ```

### Step 4: Fix Linter Errors

- Use `import type` for type imports
- Comply with ESLint rules
- Pass TypeScript type checks

### Step 5: Remove Original SVG File

- Remove the original SVG file from the `packages/design-system/src/shared/assets/icon` directory

### Step 6: Add to Storybook AllIcons Story

After creating icon components, add them to the Storybook `AllIcons` story for easy visual inspection and testing.

#### Implementation Steps

1. Import icon components\*\* in `Icon.stories.tsx`:
2. Add icon component to the `iconComponents` array:

#### Key Features

- **Grid Layout**: Responsive grid that automatically adjusts columns based on screen size
- **Unified Controls**: All icons share the same `size` and `color` props via Storybook controls
- **Visual Organization**: Each icon is displayed in a card with its name below
- **Easy Maintenance**: Simply add new icons to the `iconComponents` array to include them in the story

#### Benefits

- **Visual Inspection**: View all icons at once to ensure consistency
- **Interactive Testing**: Use Storybook controls to test different sizes and colors across all icons
- **Documentation**: Serves as a visual catalog of available icons
- **Quality Assurance**: Quickly identify any rendering issues or inconsistencies

## Usage Examples

```tsx
import { HomeIcon } from '@azit/design-system/components/icon';

// Basic usage
<HomeIcon />

// Change size
<HomeIcon size={32} />

// Pass ref
const iconRef = useRef<SVGSVGElement>(null);
<HomeIcon ref={iconRef} />
```

## Automatable Steps

The following steps can be automated with scripts:

1. Parse Figma URL (extract fileKey, nodeId)
2. Download SVG
3. Convert SVG → React component
4. Create and save files
5. Run linter and auto-fix

## References

- [Figma MCP Tools Documentation](https://cursor.sh/docs)
- [React forwardRef Documentation](https://react.dev/reference/react/forwardRef)
- [SVG Props Types](https://react.dev/reference/react-dom/components#svg-elements)
