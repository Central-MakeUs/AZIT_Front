import { style } from '@vanilla-extract/css';
import { vars, typography } from '@azit/design-system';
import { listItemRow } from '@/shared/styles/listItemRow.css';

export const item = listItemRow;

export const itemClickable = style({
  cursor: 'pointer',
});

export const label = style([
  typography.body.b3,
  {
    color: vars.colors.gray70,
  },
]);
