import { vars } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const listItemRow = style({
  padding: '12px 20px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  selectors: {
    '&:first-child': { paddingTop: 20 },
    '&:last-child': { paddingBottom: 20 },
  },
});

export const listItemDivider = style({
  width: 'calc(100% - 40px)',
  height: 1,
  minHeight: 1,
  margin: '0 20px',
  backgroundColor: vars.colors.gray10,
  border: 'none',
  flexShrink: 0,
});
