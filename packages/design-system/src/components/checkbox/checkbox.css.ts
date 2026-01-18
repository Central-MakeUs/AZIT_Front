import { vars } from '../../shared/config/vars.css';
import { style } from '@vanilla-extract/css';
import { globalStyle } from '@vanilla-extract/css';

export const checkboxRoot = style({
  width: 20,
  height: 20,
  borderRadius: 4,
  border: `1px solid ${vars.colors.gray20}`,
  backgroundColor: vars.colors.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  padding: 0,
  margin: 0,
  outline: 'none',
  transition: 'all 0.2s ease',
  ':focus-visible': {
    outline: `2px solid ${vars.colors.blue60}`,
    outlineOffset: 2,
  },
});

globalStyle(`${checkboxRoot}[data-state="checked"]`, {
  backgroundColor: vars.colors.blue60,
  borderColor: vars.colors.blue60,
});

globalStyle(`${checkboxRoot}[data-state="indeterminate"]`, {
  backgroundColor: vars.colors.blue60,
  borderColor: vars.colors.blue60,
});

globalStyle(`${checkboxRoot}[data-state="unchecked"]`, {
  backgroundColor: vars.colors.white,
  borderColor: vars.colors.gray20,
});

globalStyle(`${checkboxRoot}[data-disabled]`, {
  cursor: 'not-allowed',
  opacity: 0.5,
});

export const checkboxIndicator = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 16,
  height: 16,
});

globalStyle(`${checkboxIndicator} svg`, {
  color: vars.colors.white,
  width: 16,
  height: 16,
});
