import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: 24,
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
  },
]);

export const inputFull = style({
  width: '100%',
  color: vars.colors.gray30,
});

export const fakeInputContainer = style({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  gap: '10px',
  borderRadius: '12px',
  border: `0.5px solid ${vars.colors.gray20}`,
  padding: '10px 16px',
  backgroundColor: vars.colors.white,
  cursor: 'pointer',
  color: vars.colors.gray40,
});

export const fakeInputText = style([
  typography.body.b3,
  {
    flexGrow: 1,
    color: vars.colors.black,
  },
]);

export const fakeInputPlaceholder = style([
  typography.body.b3,
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

export const dateSelectButton = style({ borderRadius: 8 });

export const dateInputHidden = style({
  position: 'absolute',
  opacity: 0,
  width: 0,
  height: 0,
  pointerEvents: 'none',
});

export const timeRow = style({
  display: 'flex',
  justifyContent: 'end',
  alignItems: 'center',
  gap: 8,
  width: '100%',
});

export const amPmRow = style({
  display: 'flex',
  gap: 6,
  flexShrink: 0,
});

export const timeInputsRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
});

export const timeColon = style([
  typography.body.b2,
  {
    color: vars.colors.gray50,
    flexShrink: 0,
  },
]);

export const timeInput = style({
  padding: '6px 12px',
  textAlign: 'center',
});

export const mapSearchButton = style({
  marginTop: 8,
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
});

export const gridRow = style({
  display: 'flex',
  gap: 12,
  width: '100%',
});

export const gridCell = style({
  width: '50%',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

export const unitInputWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  width: '100%',
  borderRadius: 12,
  border: `0.5px solid ${vars.colors.gray20}`,
  padding: '10px 16px',
  backgroundColor: vars.colors.white,
});

export const unitInput = style([
  typography.body.b3,
  {
    flex: 1,
    minWidth: 0,
    border: 'none',
    outline: 'none',
    backgroundColor: 'inherit',
    color: vars.colors.black,
    textAlign: 'right',
  },
]);

export const unitSuffix = style([
  typography.body.b3,
  {
    color: vars.colors.gray50,
    flexShrink: 0,
  },
]);

export const textarea = style([
  typography.body.b3,
  {
    width: '100%',
    minHeight: 120,
    padding: '10px 16px',
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

export const addSupplyButton = style([
  typography.body.b3,
  {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    padding: 0,
    border: 'none',
    background: 'none',
    cursor: 'pointer',
  },
]);

export const titleCounter = style([
  typography.body.b4,
  {
    color: vars.colors.gray40,
    flexShrink: 0,
    width: '30px',
  },
]);

export const titleInputRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  width: '100%',
});

export const bottomSheetContent = style({
  marginBottom: '20px',
});
