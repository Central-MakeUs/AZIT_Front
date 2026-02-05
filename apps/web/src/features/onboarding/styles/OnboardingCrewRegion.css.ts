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
    textAlign: 'left',
  },
]);

export const regionGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 12,
  width: '100%',
});

export const regionCard = style([
  typography.body.b2,
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    padding: 10,
    backgroundColor: vars.colors.white,
    border: `0.5px solid ${vars.colors.gray20}`,
    borderRadius: 12,
    cursor: 'pointer',
    color: vars.colors.black,
    transition: 'all 0.2s ease',
    ':hover': {
      borderColor: vars.colors.blue80,
    },
    ':active': {
      transform: 'scale(0.98)',
    },
  },
]);

export const regionCardSelected = style({
  borderColor: vars.colors.blue80,
  backgroundColor: vars.colors.blue10,
});

export const buttonWrapper = style({
  flexShrink: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingLeft: 20,
  paddingRight: 20,
  paddingTop: 20,
  paddingBottom: 38,
  backgroundColor: vars.colors.white,
  width: '100%',
});
