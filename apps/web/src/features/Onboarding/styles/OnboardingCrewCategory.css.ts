import { typography, vars } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const headerWrapper = style({
  flexShrink: 0,
  width: '100%',
});

export const stepContainer = style({
  flex: 1,
  minHeight: 0,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  paddingLeft: 20,
  paddingRight: 20,
  paddingTop: 8,
});

export const headerSection = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 8,
  marginBottom: 40,
});

export const title = style([
  typography.heading.h2,
  {
    color: vars.colors.black,
    textAlign: 'left',
  },
]);

export const subtitle = style([
  typography.body.b2,
  {
    color: vars.colors.blue80,
    fontWeight: '500',
    textAlign: 'left',
  },
]);

export const cardsGrid = style({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 12,
});

export const categoryCard = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 4,
  width: 104,
  height: 80,
  backgroundColor: vars.colors.white,
  border: `1px solid ${vars.colors.gray20}`,
  borderRadius: 12,
  cursor: 'pointer',
  transition: 'border-color 0.15s ease',
});

export const categoryCardSelected = style({
  borderColor: vars.colors.blue60,
  borderWidth: '1.5px',
});

export const categoryCardDisabled = style({
  backgroundColor: vars.colors.gray10,
  cursor: 'default',
});

export const categoryLabel = style([
  typography.body.b3,
  {
    color: vars.colors.black,
  },
]);

export const categoryLabelDisabled = style([
  typography.body.b3,
  {
    color: vars.colors.gray50,
  },
]);

export const buttonWrapper = style({
  flexShrink: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: 20,
  backgroundColor: vars.colors.white,
  width: '100%',
});
