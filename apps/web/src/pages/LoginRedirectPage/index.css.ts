import { composeStyles, style } from '@vanilla-extract/css';

import { container } from '@/shared/styles/container.css';

export const loginContainer = composeStyles(
  container,
  style({
    flex: 1,
    position: 'relative',
    minHeight: '100%',
  })
);

export const logoWrapper = style({
  position: 'fixed',
  top: 240,
  left: 0,
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
});

export const logoImage = style({
  width: 182,
  height: 112,
  objectFit: 'contain',
});

export const statusText = style({
  marginTop: 8,
  fontSize: 16,
  fontWeight: 500,
  lineHeight: 1.4,
  color: '#FFFFFF',
});
