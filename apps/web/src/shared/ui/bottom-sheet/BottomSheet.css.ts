import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '@azit/design-system';
import { recipe } from '@vanilla-extract/recipes';

export const slideUp = keyframes({
  from: { transform: 'translateY(100%)' },
  to: { transform: 'translateY(0)' },
});

export const slideDown = keyframes({
  from: { transform: 'translateY(0)' },
  to: { transform: 'translateY(100%)' },
});

export const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export const fadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});

export const overlay = recipe({
  base: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'flex-end',
    transition: 'opacity 0.3s ease-out',
    maxWidth: '480px',
    margin: '0 auto',
  },
  variants: {
    state: {
      entering: { animation: `${fadeIn} 0.3s ease-out` },
      entered: { opacity: 1 },
      exiting: { animation: `${fadeOut} 0.3s ease-out`, opacity: 0 },
      exited: { opacity: 0 },
    },
  },
});

export const container = recipe({
  base: {
    position: 'relative',
    width: '100%',
    backgroundColor: vars.colors.white,
    borderTopLeftRadius: '24px',
    borderTopRightRadius: '24px',
    zIndex: 1001,
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0px -4px 16px rgba(0, 0, 0, 0.08)',
    transition: 'transform 0.3s ease-out',
  },
  variants: {
    state: {
      entering: { animation: `${slideUp} 0.3s ease-out` },
      entered: { transform: 'translateY(0)' },
      exiting: {
        animation: `${slideDown} 0.3s ease-out`,
        transform: 'translateY(100%)',
      },
      exited: { transform: 'translateY(100%)' },
    },
  },
});

export const dragHandle = style({
  width: '40px',
  height: '4px',
  backgroundColor: vars.colors.gray20,
  borderRadius: '2px',
  margin: '12px auto 24px',
  flexShrink: 0,
});

export const content = style({
  padding: '0 20px',
  overflowY: 'auto',
  flexGrow: 1,
});
