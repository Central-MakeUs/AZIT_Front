import { vars } from '../../shared/styles/theme.css';
import { recipe } from '@vanilla-extract/recipes';
import { style, globalStyle } from '@vanilla-extract/css';
import { typography } from '../../shared/styles';

export type InputVariants = NonNullable<Parameters<typeof inputContainer>[0]>;
export type InputState = InputVariants['state'];

export const inputContainer = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    gap: '10px',
    borderRadius: '12px',
    border: `0.5px solid ${vars.colors.gray20}`,
    transition: 'border-color 0.2s ease',
    padding: '10px 16px',
    selectors: {
      '&::placeholder': {
        color: vars.colors.gray30,
      },
    },
  },
  variants: {
    state: {
      default: {},
      error: {
        borderColor: vars.colors.error,
      },
      disabled: {
        backgroundColor: vars.colors.gray10,
        color: vars.colors.gray50,
        cursor: 'not-allowed',
      },
    },
  },
  defaultVariants: {
    state: 'default',
  },
});

export const input = style([
  typography.body.b2,
  {
    flexGrow: 1,
    width: '100%',
    border: 'none',
    backgroundColor: vars.colors.white,
    color: vars.colors.black,
    outline: 'none',
    selectors: {
      '&::placeholder': {
        color: vars.colors.gray30,
      },
      '&:disabled': {
        backgroundColor: 'inherit',
        color: 'inherit',
        cursor: 'not-allowed',
      },
      '&[type="number"]': {
        MozAppearance: 'textfield',
      },
    },
  },
]);

globalStyle(`${input}[type="number"]::-webkit-inner-spin-button`, {
  WebkitAppearance: 'none',
  margin: 0,
});

globalStyle(`${input}[type="number"]::-webkit-outer-spin-button`, {
  WebkitAppearance: 'none',
  margin: 0,
});

export const iconSlot = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none',
  flexShrink: 0,
  width: 'auto',
  height: 'auto',
});
