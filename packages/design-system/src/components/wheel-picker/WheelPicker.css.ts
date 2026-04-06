import { style } from '@vanilla-extract/css';
import { vars } from '../../shared/styles/theme.css';
import { typography } from '../../shared/styles';

export const container = style({
  position: 'relative',
  overflow: 'hidden',
  userSelect: 'none',
  touchAction: 'none',
  cursor: 'grab',

  selectors: {
    '&:active': {
      cursor: 'grabbing',
    },
    '&:focus-visible': {
      outline: `2px solid ${vars.colors.blue60}`,
      outlineOffset: '2px',
      borderRadius: '8px',
    },
  },
});

export const containerDisabled = style({
  opacity: 0.4,
  pointerEvents: 'none',
  cursor: 'not-allowed',
});

export const list = style({
  display: 'flex',
  flexDirection: 'column',
  willChange: 'transform',
});

export const item = style([
  typography.body.b1,
  {
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: 'color 0.15s ease',
    color: vars.colors.gray20,
  },
]);

export const itemSelected = style({
  color: vars.colors.black,
});

export const gradientTop = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: '88px', // 44px * 2
  background: `linear-gradient(to bottom, ${vars.colors.background} 0%, transparent 100%)`,
  pointerEvents: 'none',
  zIndex: 2,
});

export const gradientBottom = style({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '88px', // 44px * 2
  background: `linear-gradient(to top, ${vars.colors.background} 0%, transparent 100%)`,
  pointerEvents: 'none',
  zIndex: 2,
});

export const selectionIndicator = style({
  position: 'absolute',
  left: 0,
  right: 0,
  height: '44px',
  top: '88px', // 44px * 2
  borderTop: `0.5px solid ${vars.colors.gray10}`,
  borderBottom: `0.5px solid ${vars.colors.gray10}`,
  pointerEvents: 'none',
  zIndex: 1,
});
