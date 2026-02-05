import { style } from '@vanilla-extract/css';
import { vars, typography } from '@azit/design-system';

export const pageContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
});

export const topSection = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  padding: '20px',
  backgroundColor: vars.colors.white,
});

export const scheduleSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  width: '100%',
  backgroundColor: vars.colors.background_sub,
  padding: '20px',
  height: '100%',
});

export const sectionTitle = style([
  typography.body.b1,
  {
    color: vars.colors.black,
  },
]);
