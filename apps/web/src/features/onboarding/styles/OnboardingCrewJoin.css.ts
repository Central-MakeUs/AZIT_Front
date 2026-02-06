import { typography, vars } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const stepContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  paddingLeft: 20,
  paddingRight: 20,
  paddingTop: 8,
  paddingBottom: 100,
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
  alignItems: 'flex-start',
  gap: 4,
});

export const inputField = style({
  height: 48,
  padding: '10px 16px',
  backgroundColor: vars.colors.white,
});

export const errorMessage = style([
  typography.body.b3,
  {
    color: vars.colors.error,
    paddingLeft: 4,
  },
]);

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
  backgroundColor: vars.colors.white,
});
