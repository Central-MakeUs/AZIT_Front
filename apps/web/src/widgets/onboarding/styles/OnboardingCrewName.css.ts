import { typography, vars } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const backButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 24,
  height: 24,
  padding: 0,
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
});

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

export const inputContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: 8,
});

export const counterWrapper = style({
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%',
});

export const counter = style([
  typography.body.b3,
  {
    color: vars.colors.gray30,
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
