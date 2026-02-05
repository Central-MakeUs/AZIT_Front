import { style } from '@vanilla-extract/css';
import { vars, typography } from '@azit/design-system';

export const tabsContainer = style({
  display: 'flex',
  gap: '8px',
  width: '100%',
  padding: '16px',
});

export const tabButton = style([
  typography.body.b2,
  {
    width: 'fit-content',
    flex: 1,
    padding: '8px 16px',
    borderRadius: '8px',
    backgroundColor: vars.colors.white,
    border: `1px solid ${vars.colors.gray10}`,
    color: vars.colors.gray50,
    cursor: 'pointer',
    textAlign: 'center',
  },
]);

export const tabButtonActive = style([
  typography.body.b2,
  {
    flex: 1,
    padding: '8px 16px',
    borderRadius: '8px',
    backgroundColor: vars.colors.blue60,
    border: 'none',
    color: vars.colors.white,
    cursor: 'pointer',
    textAlign: 'center',
  },
]);
