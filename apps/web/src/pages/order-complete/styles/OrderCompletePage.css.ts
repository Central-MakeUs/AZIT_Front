import { style } from '@vanilla-extract/css';
import { vars } from '@azit/design-system';
import { layoutStyles } from '@/shared/styles/layout.css';

export const headerWrapper = style([layoutStyles.headerWrapper]);

export const mainContainer = style([
  layoutStyles.mainContainer,
  {
    backgroundColor: vars.colors.white,
  },
]);

export const iconButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  height: '24px',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
});

export const headerSection = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '40px',
  width: '100%',
});

export const infoSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  backgroundColor: vars.colors.background_sub,
  padding: '20px',
  marginTop: '40px',
  minHeight: '509px',
});

export const footerWrapper = style([
  layoutStyles.footerWrapper,
  {
    padding: '0 20px',
    paddingTop: '20px',
    paddingBottom: '20px',
  },
]);
