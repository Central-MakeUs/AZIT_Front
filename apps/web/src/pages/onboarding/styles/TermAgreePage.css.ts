import { typography, vars } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const pageContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  paddingLeft: 20,
  paddingRight: 20,
  paddingTop: 44,
});

export const headerSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  marginBottom: 40,
});

export const title = style([
  typography.heading.h2,
  {
    color: vars.colors.black,
  },
]);

export const subtitle = style([
  typography.body.b2,
  {
    color: vars.colors.blue80,
  },
]);

export const termsSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
  width: '100%',
});

export const allAgreeItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

export const allAgreeLabel = style([
  typography.body.b1,
  {
    color: vars.colors.black,
  },
]);

export const divider = style({
  width: '100%',
  height: 1,
  backgroundColor: vars.colors.gray10,
});

export const termsList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  width: '100%',
});

export const buttonWrapper = style({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingLeft: 20,
  paddingRight: 20,
  paddingBottom: 38,
});
