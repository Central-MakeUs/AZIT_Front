import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  width: '100%',
});

export const dateTimeRow = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '24px',
});

export const infoItem = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
});

export const infoText = style([
  typography.body.b2,
  {
    color: vars.colors.gray80,
  },
]);

export const locationBlock = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  width: '100%',
});

export const locationRow = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '8px',
  width: '100%',
});

export const locationTexts = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  flex: 1,
});

export const locationName = style([
  typography.body.b2,
  {
    color: vars.colors.gray80,
  },
]);

export const address = style([
  typography.body.b3,
  {
    color: vars.colors.gray80,
  },
]);

export const iconWrapper = style({
  display: 'flex',
  alignItems: 'flex-start',
  flexShrink: 0,
  width: 20,
  height: 20,
  color: vars.colors.gray50,
});

export const mapContainer = style({
  width: '100%',
  height: 160,
  borderRadius: 16,
  backgroundColor: vars.colors.gray10,
  overflow: 'hidden',
});
