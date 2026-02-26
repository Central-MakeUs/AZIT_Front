import { vars } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const discountSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  width: '100%',
});

export const title = style({
  fontSize: vars.typography.body.b2.fontSize,
  fontWeight: vars.typography.body.b2.fontWeight,
  lineHeight: vars.typography.body.b2.lineHeight,
  color: vars.colors.black,
  width: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const pointsContainer = style({
  border: `0.5px solid ${vars.colors.gray20}`,
  borderRadius: '12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
  padding: '15.5px',
  width: '100%',
});

export const pointsHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
});

export const pointsTitle = style({
  display: 'flex',
  gap: '4px',
  alignItems: 'center',
  fontSize: vars.typography.body.b2.fontSize,
  fontWeight: vars.typography.body.b2.fontWeight,
  lineHeight: vars.typography.body.b2.lineHeight,
  color: vars.colors.black,
});

export const availablePoints = style({
  display: 'flex',
  gap: '6px',
  alignItems: 'flex-end',
});

export const availablePointsLabel = style({
  fontSize: vars.typography.body.b3.fontSize,
  fontWeight: vars.typography.body.b3.fontWeight,
  lineHeight: vars.typography.body.b3.lineHeight,
  color: vars.colors.black,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

export const availablePointsValue = style({
  fontSize: vars.typography.body.b2.fontSize,
  fontWeight: vars.typography.body.b2.fontWeight,
  lineHeight: vars.typography.body.b2.lineHeight,
  color: vars.colors.blue60,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

export const pointsInputSection = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '8px',
  width: '100%',
});

export const pointsInputContainer = style({
  border: `0.5px solid ${vars.colors.gray20}`,
  borderRadius: '8px',
  display: 'flex',
  gap: '2px',
  height: '36px',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: '0 16px',
  flex: 1,
});

export const pointsInputContainerDisabled = style([
  pointsInputContainer,
  {
    backgroundColor: vars.colors.gray10,
    opacity: 0.8,
    cursor: 'not-allowed',
  },
]);

export const pointsInput = style({
  fontSize: vars.typography.body.b3.fontSize,
  fontWeight: vars.typography.body.b3.fontWeight,
  lineHeight: vars.typography.body.b3.lineHeight,
  color: vars.colors.black,
  border: 'none',
  outline: 'none',
  textAlign: 'right',
  width: '100%',
  background: 'transparent',
  MozAppearance: 'textfield',
  selectors: {
    '&::-webkit-inner-spin-button': {
      WebkitAppearance: 'none',
      margin: 0,
    },
    '&::-webkit-outer-spin-button': {
      WebkitAppearance: 'none',
      margin: 0,
    },
    '&:disabled': {
      color: vars.colors.gray30,
    },
  },
});

export const pointsUnit = style({
  fontSize: vars.typography.body.b3.fontSize,
  fontWeight: vars.typography.body.b3.fontWeight,
  lineHeight: vars.typography.body.b3.lineHeight,
  color: vars.colors.black,
});

export const useAllButton = style({
  border: `0.5px solid ${vars.colors.blue80}`,
  borderRadius: '8px',
  display: 'flex',
  height: '36px',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '4px 12px',
  minWidth: '64px',
  background: 'transparent',
  cursor: 'pointer',
  flexShrink: 0,
});

export const useAllButtonDisabled = style({
  border: `0.5px solid ${vars.colors.gray30}`,
  borderRadius: '8px',
  display: 'flex',
  height: '36px',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '4px 12px',
  minWidth: '64px',
  background: vars.colors.gray10,
  opacity: 0.8,
  cursor: 'not-allowed',
  flexShrink: 0,
});

export const useAllButtonText = style({
  fontSize: vars.typography.body.b4.fontSize,
  fontWeight: vars.typography.body.b4.fontWeight,
  lineHeight: vars.typography.body.b4.lineHeight,
  color: vars.colors.blue80,
  textWrap: 'nowrap',
  selectors: {
    [`${useAllButtonDisabled} &`]: {
      color: vars.colors.gray50,
    },
  },
});

export const pointsNotice = style({
  fontSize: vars.typography.body.b4.fontSize,
  fontWeight: vars.typography.body.b4.fontWeight,
  lineHeight: vars.typography.body.b4.lineHeight,
  color: vars.colors.gray60,
  textAlign: 'end',
  width: '100%',
});
