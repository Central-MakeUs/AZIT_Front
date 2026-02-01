import { style } from '@vanilla-extract/css';
import { vars, typography } from '@azit/design-system';

export const pageContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  flexGrow: 1,
  overflowY: 'auto',
  backgroundColor: 'transparent',
});

export const contentWrapper = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  overflowY: 'auto',
  paddingBottom: 100,
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
