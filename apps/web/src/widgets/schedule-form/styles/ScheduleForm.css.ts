import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: 28,
});

export const topGroup = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: 16,
});

export const dateTimeGroup = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: 12,
});

export const bottomGroup = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: 20,
});

export const section = style({
  display: 'flex',
  width: '100%',
  gap: 8,
});

export const horizontalSection = style([
  section,
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
]);

export const verticalSection = style([
  section,
  {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
]);

export const label = style([
  typography.body.b2,
  {
    color: vars.colors.black,
    whiteSpace: 'nowrap',
    padding: '0 4px',
    flexShrink: 0,
  },
]);

export const inputFull = style({
  width: '100%',
  minHeight: 48,
  backgroundColor: vars.colors.white,
});

export const fakeInputContainer = style({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  minHeight: 48,
  gap: 10,
  borderRadius: 12,
  border: `0.5px solid ${vars.colors.gray20}`,
  padding: '10px 16px',
  backgroundColor: vars.colors.white,
  cursor: 'pointer',
  color: vars.colors.gray40,
});

export const fakeInputText = style([
  typography.body.b2,
  {
    flexGrow: 1,
    color: vars.colors.black,
  },
]);

export const fakeInputPlaceholder = style([
  typography.body.b2,
  {
    flexGrow: 1,
    color: vars.colors.gray30,
  },
]);

export const runTypeWrapper = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 8,
  width: '100%',
});

export const runTypeChipButton = style([
  typography.body.b2,
  {
    display: 'flex',
    gap: 6,
    fontSize: '15px',
  },
]);

export const dateInputHidden = style({
  position: 'absolute',
  opacity: 0,
  width: 0,
  height: 0,
  pointerEvents: 'none',
});

export const mapSearchButton = style([
  typography.body.b2,
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    width: '100%',
    minHeight: 48,
    padding: '10px 16px',
    borderRadius: 12,
    border: `0.5px solid ${vars.colors.blue80}`,
    backgroundColor: vars.colors.white,
    color: vars.colors.blue80,
    cursor: 'pointer',
  },
]);

export const gridRow = style({
  display: 'flex',
  width: '100%',
  gap: 11,
});

export const gridCell = style({
  width: '100%',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

export const unitInputWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  width: '100%',
  minHeight: 48,
  borderRadius: 8,
  border: `0.5px solid ${vars.colors.gray20}`,
  padding: '10px 16px',
  backgroundColor: vars.colors.white,
  cursor: 'pointer',
});

export const unitInputWrapperError = style({
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  width: '100%',
  minHeight: 48,
  borderRadius: 8,
  border: `1px solid ${vars.colors.error}`,
  padding: '10px 16px',
  backgroundColor: vars.colors.white,
  cursor: 'pointer',
});

export const fixedWidthInputWrapper160 = style({
  width: 160,
  flexShrink: 0,
});

export const fixedWidthInputWrapper72 = style({
  width: 72,
  flexShrink: 0,
});

export const unitInputErrorMessage = style([
  typography.body.b3,
  {
    color: vars.colors.error,
    textAlign: 'right',
    paddingRight: 4,
    width: '100%',
  },
]);

export const unitInputFieldWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  flexShrink: 1,
  minWidth: 0,
});

export const unitInput = style([
  typography.body.b2,
  {
    flex: 1,
    minWidth: 0,
    border: 'none',
    outline: 'none',
    backgroundColor: 'inherit',
    color: vars.colors.black,
    textAlign: 'right',
    selectors: {
      '&::placeholder': {
        color: vars.colors.gray30,
      },
    },
  },
]);

export const unitInputPlaceholder = style([
  typography.body.b2,
  {
    flex: 1,
    minWidth: 0,
    color: vars.colors.gray30,
    textAlign: 'right',
  },
]);

export const unitSuffix = style([
  typography.body.b2,
  {
    color: vars.colors.black,
    flexShrink: 0,
  },
]);

export const textarea = style([
  typography.body.b2,
  {
    width: '100%',
    minHeight: 114,
    padding: '12px 16px',
    borderRadius: 12,
    border: `0.5px solid ${vars.colors.gray20}`,
    backgroundColor: vars.colors.white,
    color: vars.colors.black,
    outline: 'none',
    resize: 'none',
    selectors: {
      '&::placeholder': {
        color: vars.colors.gray30,
      },
    },
  },
]);

export const supplyRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  width: '100%',
});

export const supplyDeleteButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  padding: 0,
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  color: vars.colors.blue80,
});

export const addSupplyButton = style([
  typography.body.b3,
  {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    padding: 0,
    border: 'none',
    background: 'none',
    color: vars.colors.blue80,
    cursor: 'pointer',
  },
]);

export const titleCounter = style([
  typography.body.b3,
  {
    color: vars.colors.gray30,
    flexShrink: 0,
  },
]);

export const titleInputWrapper = style({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  minHeight: 48,
  gap: 10,
  borderRadius: 12,
  border: `0.5px solid ${vars.colors.gray20}`,
  padding: '10px 16px',
  backgroundColor: vars.colors.white,
});

export const titleInput = style([
  typography.body.b3,
  {
    flexGrow: 1,
    minWidth: 0,
    border: 'none',
    outline: 'none',
    backgroundColor: 'inherit',
    color: vars.colors.black,
    selectors: {
      '&::placeholder': {
        color: vars.colors.gray30,
      },
    },
  },
]);

export const bottomSheetContent = style({
  marginBottom: '20px',
});

export const accordionGroup = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

export const accordionItem = style({
  display: 'flex',
  flexDirection: 'column',
});

export const accordionHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 0',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  width: '100%',
  textAlign: 'left',
  WebkitTapHighlightColor: 'transparent',
});

export const accordionLeftGroup = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

export const accordionLabel = style([
  typography.body.b2,
  {
    color: vars.colors.black,
  },
]);

export const accordionContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  paddingBottom: 16,
});

export const accordionDivider = style({
  height: 1,
  width: '100%',
  backgroundColor: vars.colors.gray20,
  flexShrink: 0,
});

const timeSelectBase = {
  display: 'inline-flex' as const,
  alignItems: 'center' as const,
  minHeight: 48,
  borderRadius: 12,
  border: `0.5px solid ${vars.colors.gray20}`,
  padding: '10px 16px',
  backgroundColor: vars.colors.white,
  cursor: 'pointer',
  whiteSpace: 'nowrap' as const,
};

export const timeSelectButton = style([
  typography.body.b2,
  { ...timeSelectBase, color: vars.colors.black },
]);

export const timeSelectButtonPlaceholder = style([
  typography.body.b2,
  { ...timeSelectBase, color: vars.colors.gray30 },
]);

export const timePickerRow = style({
  display: 'flex',
  width: '100%',
  padding: '8px 0',
});

export const timePickerColumn = style({
  flex: 1,
});

export const pacePickerRow = style({
  display: 'flex',
  width: '100%',
  padding: '8px 0',
});

export const pacePickerColumn = style({
  flex: 1,
});

export const timePickerFooter = style({
  padding: '12px 0 20px',
});
