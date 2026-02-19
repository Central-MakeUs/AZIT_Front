import { vars } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const profileImage = style({
  borderRadius: '100%',
  objectFit: 'cover',
  flexShrink: 0,
  backgroundColor: vars.colors.gray20,
});

export const placeholderContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '100%',
  backgroundColor: vars.colors.gray20,
  flexShrink: 0,
  width: 'var(--profile-image-size, 96px)',
  height: 'var(--profile-image-size, 96px)',
});
