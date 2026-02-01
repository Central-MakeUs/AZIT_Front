import { style } from '@vanilla-extract/css';
import { vars, typography } from '@azit/design-system';
import { listItemRow } from '@/shared/styles/listItemRow.css';

export const item = listItemRow;

export const label = style([
  typography.body.b3,
  {
    color: vars.colors.gray70,
  },
]);

export const switchTrack = style({
  position: 'relative',
  width: 42,
  height: 24,
  borderRadius: 9999,
  flexShrink: 0,
  transition: 'background-color 0.2s',
  cursor: 'pointer',
  border: 'none',
  padding: 0,
});

export const switchTrackOn = style({
  backgroundColor: vars.colors.blue80,
});

export const switchTrackOff = style({
  backgroundColor: vars.colors.gray20,
});

export const switchThumb = style({
  position: 'absolute',
  top: 2,
  width: 20,
  height: 20,
  borderRadius: '50%',
  backgroundColor: vars.colors.white,
  transition: 'transform 0.2s',
});

export const switchThumbOn = style({
  transform: 'translateX(20px)',
});

export const switchThumbOff = style({
  transform: 'translateX(2px)',
});
