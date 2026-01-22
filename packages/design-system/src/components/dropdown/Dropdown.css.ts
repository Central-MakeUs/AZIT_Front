import { style } from '@vanilla-extract/css';
import { vars, typography } from '../../shared/styles';

export const dropdownContainer = style({
  position: 'relative',
  width: '100%',
});

export const dropdownTrigger = style([
  typography.body.b2,
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '10px 16px',
    backgroundColor: vars.colors.white,
    border: `0.5px solid ${vars.colors.gray20}`,
    borderRadius: '12px',
    cursor: 'pointer',
    outline: 'none',
  },
]);

export const placeholder = style({
  color: vars.colors.gray30,
  flex: 1,
  textAlign: 'left',
});

export const selectedValue = style({
  color: vars.colors.black,
  flex: 1,
  textAlign: 'left',
});

export const iconWrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: '8px',
  flexShrink: 0,
  transition: 'transform 0.2s ease',
  color: vars.colors.gray40,
});

export const iconOpen = style({
  transform: 'rotate(180deg)',
});

export const dropdownContent = style({
  position: 'absolute',
  top: 'calc(100% + 8px)',
  left: 0,
  right: 0,
  backgroundColor: vars.colors.white,
  borderRadius: '12px',
  border: `0.5px solid ${vars.colors.gray20}`,
  zIndex: 1000,
  maxHeight: '300px',
  overflow: 'auto',
});

export const dropdownItem = style([
  typography.body.b2,
  {
    height: '45px',
    display: 'flex',
    alignItems: 'center',
    padding: '10px 16px',
    color: vars.colors.black,
    cursor: 'pointer',
    outline: 'none',
    position: 'relative',
    backgroundColor: 'transparent',
    border: 'none',
    width: '100%',
    textAlign: 'left',
    ':hover': {
      color: vars.colors.blue60,
    },
    selectors: {
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
  },
]);

export const dropdownItemSelected = style({
  color: vars.colors.blue60,
});
