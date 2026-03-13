import { composeStyles, style } from '@vanilla-extract/css';

import { container } from '@/shared/styles/container.css';

export const loginContainer = composeStyles(
  container,
  style({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  })
);

export const logoWrapper = style({
  position: 'absolute',
  top: 280,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
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

export const buttonWrapper = style({
  position: 'absolute',
  left: 20,
  right: 20,
  bottom: 100,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 12,
  marginTop: 185,
});

export const textWrapper = style({
  width: 'fit-content',
  flexWrap: 'nowrap',
  justifyContent: 'start',
  display: 'flex',
  alignItems: 'center',
  marginRight: 18,
});

export const kakaoIcon = style({
  width: 18,
  height: 18,
  marginRight: 18,
  marginLeft: 18,
});

export const loginImage = style({
  minWidth: 470,
  minHeight: 470,
  objectFit: 'fill',
  position: 'fixed',
  scale: 1,
  bottom: -150,
  right: -100,
});
