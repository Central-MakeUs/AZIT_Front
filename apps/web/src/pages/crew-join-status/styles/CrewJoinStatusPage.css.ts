import { style } from '@vanilla-extract/css';
import { vars, typography } from '@azit/design-system';

export const pageContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: 'inherit',
  padding: '0 20px',
});

export const contentWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 16,
  flex: 1,
  width: '100%',
});

export const crewInfoContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 12,
});

export const crewName = style([
  typography.heading.h2,
  {
    color: vars.colors.black,
    textAlign: 'center',
  },
]);

export const statusMessageContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
});

export const primaryStatusMessage = style([
  typography.body.b2,
  {
    color: vars.colors.blue80,
    textAlign: 'center',
  },
]);

export const secondaryStatusMessage = style([
  typography.body.b3,
  {
    color: vars.colors.blue80,
    textAlign: 'center',
  },
]);

export const buttonWrapper = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: vars.colors.white,
});
