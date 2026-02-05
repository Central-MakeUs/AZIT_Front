import { style } from '@vanilla-extract/css';
import { vars, typography } from '@azit/design-system';

export const headerWrapper = style({
  flexShrink: 0,
  width: '100%',
});

export const pageContainer = style({
  flex: 1,
  minHeight: 0,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  backgroundColor: 'transparent',
  paddingBottom: '100px',
});

export const contentWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

export const menuSectionWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  width: '100%',
  padding: '24px 20px 0',
  backgroundColor: 'transparent',
});

export const logoutButton = style([
  typography.body.b3,
  {
    display: 'block',
    width: '100%',
    padding: '16px',
    paddingTop: '60px',
    textAlign: 'center',
    color: vars.colors.gray50,
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
]);
