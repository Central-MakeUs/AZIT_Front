import { style } from '@vanilla-extract/css';
import { layoutStyles } from '@/shared/styles/layout.css';

export const mainContainer = style([
  layoutStyles.mainContainer,
  {
    padding: '12px 20px',
  },
]);

export const addressListContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  width: '100%',
});

export const emptyStateWrapper = style({
  display: 'flex',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  minHeight: 0,
});
