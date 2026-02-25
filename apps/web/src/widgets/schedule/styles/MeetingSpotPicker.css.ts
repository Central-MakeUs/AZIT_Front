import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

import { layoutStyles } from '@/shared/styles/layout.css';

export const mapContainer = style({
  flex: 1,
  minHeight: 0,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  overflowY: 'hidden',
  position: 'relative',
});

export const mapDescription = style([
  typography.heading.h3,
  {
    color: vars.colors.black,
    padding: '8px 24px 16px',
    flexShrink: 0,
    whiteSpace: 'pre-line',
  },
]);

export const mapArea = style({
  flex: 1,
  minHeight: 0,
  width: '100%',
  backgroundColor: vars.colors.background_sub,
});

export const footerWrapper = style([
  layoutStyles.footerWrapper,
  {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '10px 20px 20px',
    backgroundColor: 'transparent',
  },
]);
