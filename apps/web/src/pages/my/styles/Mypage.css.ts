import { style } from '@vanilla-extract/css';
import { vars, typography } from '@azit/design-system';
import { layoutStyles } from '@/shared/styles/layout.css';

export const headerWrapper = style([layoutStyles.headerWrapper]);

export const mainContainer = style([
  layoutStyles.mainContainer,
  {
    backgroundColor: 'transparent',
    paddingBottom: '100px',
  },
]);

export const menuSectionWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  width: '100%',
  padding: '24px 20px 0',
  backgroundColor: 'transparent',
});

export const buttonWrapper = style({
  width: '100%',
  marginTop: '30px',
  padding: '0 20px',
});

export const buttonContainer = style({
  display: 'flex',
  width: '100%',
  gap: 0,
});

export const logoutButtonWrapper = style({
  width: '50%',
  display: 'flex',
  justifyContent: 'center',
});

export const withdrawButtonWrapper = style({
  width: '50%',
  display: 'flex',
  justifyContent: 'center',
});

export const logoutButton = style([
  typography.body.b3,
  {
    width: 'fit-content',
    padding: '4px',
    textAlign: 'center',
    color: vars.colors.gray50,
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
]);

export const withdrawButton = style([
  typography.body.b3,
  {
    width: 'fit-content',
    padding: '4px',
    textAlign: 'center',
    color: vars.colors.gray50,
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
]);
