import { vars } from '../../shared/config/vars.css';
import { style } from '@vanilla-extract/css';

export const dropdownTrigger = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  padding: '10px 16px',
  backgroundColor: vars.colors.white,
  border: `0.5px solid ${vars.colors.gray20}`,
  borderRadius: '12px',
  fontFamily: vars.typography.fontFamily.primary,
  ...vars.typography.body.b2,
  color: vars.colors.gray30,
  cursor: 'pointer',
  outline: 'none',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 16px center',
  // selectors: {
  //   '&:disabled': {
  //     opacity: 0.6,
  //     cursor: 'not-allowed',
  //   },
  // },
  // disabled가 디자인에 없어 일단 미구현
});

export const dropdownValue = style({
  color: vars.colors.black,
  flex: 1,
  textAlign: 'left',
});

export const dropdownPlaceholder = style({
  color: vars.colors.gray30,
});

export const dropdownIcon = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: '8px',
  flexShrink: 0,
  transition: 'transform 0.2s ease',
});

export const dropdownIconOpen = style({
  transform: 'rotate(180deg)',
});

export const dropdownContent = style({
  minWidth: 'var(--radix-dropdown-menu-trigger-width)',
  backgroundColor: vars.colors.white,
  borderRadius: '12px',
  border: `0.5px solid ${vars.colors.gray20}`,
  boxShadow: vars.elevation.level1,
  zIndex: 1000,
  maxHeight: '300px',
  overflow: 'auto',
});

export const dropdownItem = style({
  display: 'flex',
  alignItems: 'center',
  padding: '10px 16px',
  fontFamily: vars.typography.fontFamily.primary,
  ...vars.typography.body.b2,
  color: vars.colors.black,
  cursor: 'pointer',
  outline: 'none',
  position: 'relative',
  selectors: {
    '&[data-highlighted]': {
      color: vars.colors.blue60,
    },
    '&[data-disabled]': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
    '&:not(:last-child)::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '0.5px',
      backgroundColor: vars.colors.gray20,
    },
  },
});

export const dropdownItemIndicator = style({
  position: 'absolute',
  left: '16px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '16px',
  height: '16px',
  color: vars.colors.blue60,
});

export const dropdownItemText = style({
  color: 'inherit',
  marginLeft: '24px',
});
