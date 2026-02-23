import { vars } from '@azit/design-system';
import { globalStyle } from '@vanilla-extract/css';

/* .azit-toast에 디자인시스템 typography body b3 적용 */
globalStyle('.azit-toast', {
  fontFamily: vars.typography.fontFamily.primary,
  fontSize: vars.typography.body.b3.fontSize,
  fontWeight: vars.typography.body.b3.fontWeight,
  lineHeight: vars.typography.body.b3.lineHeight,
  letterSpacing: vars.typography.body.b3.letterSpacing,
});
