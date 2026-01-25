import { style } from '@vanilla-extract/css';
import { vars } from '@azit/design-system';

export const paymentMethodSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  width: '100%',
});

export const title = style({
  fontSize: vars.typography.body.b2.fontSize,
  fontWeight: vars.typography.body.b2.fontWeight,
  lineHeight: vars.typography.body.b2.lineHeight,
  color: vars.colors.black,
  minWidth: '100%',
  width: 'min-content',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const paymentMethodContainer = style({
  position: 'relative',
  height: '52px',
  width: '100%',
});

export const paymentMethodCard = style({
  position: 'absolute',
  border: `0.5px solid ${vars.colors.gray20}`,
  borderRadius: '12px',
  height: '52px',
  left: 0,
  top: 0,
  width: '100%',
  overflow: 'hidden',
});

export const paymentMethodContent = style({
  position: 'absolute',
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
  left: '15.5px',
  top: '12.5px',
});

export const paymentLogo = style({
  height: '25px',
  width: '67px',
  borderRadius: '500px',
  position: 'relative',
  overflow: 'hidden',
});

export const paymentLogoImage = style({
  position: 'absolute',
  height: '181.51%',
  left: '-7.82%',
  maxWidth: 'none',
  top: '-28.77%',
  width: '123.17%',
});

export const paymentName = style({
  fontSize: vars.typography.body.b3.fontSize,
  fontWeight: vars.typography.body.b3.fontWeight,
  lineHeight: vars.typography.body.b3.lineHeight,
  color: vars.colors.black,
});
