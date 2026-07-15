import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const statsCard = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'flex-start',
  padding: '12px 16px',
  backgroundColor: vars.colors.background_sub,
  borderRadius: '16px',
  width: '100%',
});

export const statsCardWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  marginTop: '16px',
  backgroundColor: vars.colors.background,
});

export const statItem = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  width: '42px',
});

export const statLabel = style([
  typography.body.b3,
  {
    color: vars.colors.gray70,
    textAlign: 'center',
  },
]);

export const statValue = style([
  typography.body.b3,
  {
    color: vars.colors.black,
    fontWeight: '500',
    textAlign: 'center',
  },
]);

export const xIconColor = vars.colors.gray60;

export const lightIconColor = vars.colors.secondary;
