import { style } from '@vanilla-extract/css';
import { vars } from '@azit/design-system';

export const pageContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  alignItems: 'center',
  width: '100%',
  paddingBottom: '120px',
});

export const contentWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  alignItems: 'flex-start',
  width: '100vw',
  padding: '0 20px',
});

export const divider = style({
  width: '100%',
  height: '1px',
  backgroundColor: vars.colors.gray10,
  flexShrink: 0,
});

export const detailsSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  alignItems: 'flex-start',
  width: '100%',
});

export const purchaseButtonWrapper = style({
  position: 'fixed',
  bottom: '0',
  left: '0',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: vars.colors.white,
  padding: '20px',
});

export const purchaseButton = style({
  width: '100%',
  height: '54px',
  backgroundColor: vars.colors.blue80,
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px',
  border: 'none',
  cursor: 'pointer',
});

export const purchaseButtonText = style({
  fontSize: vars.typography.body.b1.fontSize,
  fontWeight: vars.typography.body.b1.fontWeight,
  lineHeight: vars.typography.body.b1.lineHeight,
  color: vars.colors.white,
});

export const moreInfoPlaceholder = style({
  width: '100vw',
  height: '400px',
  backgroundColor: vars.colors.gray10,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  position: 'relative',
});

export const moreInfoGradient = style({
  width: '100%',
  height: '114px',
  background:
    'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, white 53.07%)',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  padding: '0 20px',
});

export const moreInfoButton = style({
  width: '100%',
  maxWidth: 'calc(100% - 40px)',
  height: '54px',
  backgroundColor: vars.colors.white,
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4px',
  border: 'none',
  cursor: 'pointer',
});

export const moreInfoButtonText = style({
  fontSize: vars.typography.body.b1.fontSize,
  fontWeight: vars.typography.body.b1.fontWeight,
  lineHeight: vars.typography.body.b1.lineHeight,
  color: vars.colors.blue80,
});

export const headerIconWrapper = style({
  display: 'flex',
  gap: '20px',
  alignItems: 'center',
});

export const iconButton = style({
  width: '24px',
  height: '24px',
  overflow: 'hidden',
  position: 'relative',
  flexShrink: 0,
  cursor: 'pointer',
  border: 'none',
  backgroundColor: 'transparent',
  padding: 0,
});
