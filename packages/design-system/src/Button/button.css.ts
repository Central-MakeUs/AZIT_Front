import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../shared/config/vars.css';

const base = style({
  borderRadius: 8,
  border: 'none',
  backgroundColor: vars.colors.blue40,
});

export const sizeVariant = styleVariants({
  small: [base, { padding: 8 }],
  medium: [base, { padding: 12 }],
  large: [base, { padding: 16 }],
});

export const colorVariant = styleVariants({
  primary: { backgroundColor: vars.colors.blue40 },
  secondary: { backgroundColor: vars.colors.secondary },
});
