import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

import { layoutStyles } from '@/shared/styles/layout.css';

export const headerWrapper = style([layoutStyles.headerWrapper]);

export const mainContainer = style([
  layoutStyles.mainContainer,
  {
    gap: '12px',
    alignItems: 'center',
  },
]);

export const contentWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  alignItems: 'flex-start',
  width: '100%',
  padding: '0 20px',
});

export const detailsSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  alignItems: 'flex-start',
  width: '100%',
});

export const optionWrapper = style({
  width: '100%',
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
  background: `linear-gradient(to bottom, ${vars.colors.white}00 0%, ${vars.colors.white} 53.07%)`,
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

export const moreInfoButtonText = style([
  typography.body.b1,
  {
    color: vars.colors.blue80,
  },
]);

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

export const bottomSheetPurchaseButton = style([
  purchaseButton,
  {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    width: 'calc(100% - 40px)',
  },
]);

export const buttonWrapper = style({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
  width: '100%',
});

export const bottomSheetContent = style({
  height: '456px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  alignItems: 'center',
  paddingBottom: '80px',
  width: '100%',
});

export const divider = style({
  width: 'calc(100% - 40px)',
  margin: '0 auto',
});

export const expectFeeContainer = style({
  display: 'flex',
  width: '100%',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
});

export const expectFeeLabel = style([
  typography.body.b3,
  {
    color: vars.colors.black,
  },
]);

export const expectFeeAmount = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

export const expectFeeAmountValue = style([
  typography.body.b1,
  {
    color: vars.colors.black,
    textAlign: 'right',
  },
]);

export const shippingFeeValue = style([
  typography.body.b3,
  {
    color: vars.colors.gray50,
    textAlign: 'right',
  },
]);

export const selectedOptionContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  alignItems: 'center',
  position: 'absolute',
  bottom: '20px',
  left: '20px',
  width: 'calc(100% - 40px)',
});

export const selectedOptionList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  width: '100%',
  maxHeight: 'calc(100% - 235px)',
  overflowY: 'scroll',
});
