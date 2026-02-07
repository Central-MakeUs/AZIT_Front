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

export const logoutButton = style([
  typography.body.b3,
  {
    display: 'block',
    width: 'fit-content',
    padding: '16px',
    marginTop: '60px',
    textAlign: 'center',
    color: vars.colors.gray50,
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    alignSelf: 'center',
  },
]);
