import { vars } from '@azit/design-system';
import { globalStyle } from '@vanilla-extract/css';

globalStyle(
  '[data-sonner-toaster][data-x-position="center"][data-y-position="bottom"]',
  {
    left: '50% !important',
    right: 'auto !important',
    width: 'auto !important',
  }
);

globalStyle('.azit-toast', {
  left: '50% !important',
  right: 'auto !important',
  transform: 'translateX(-50%) var(--y) !important',
  marginBottom: '80px',
  backgroundColor: `${vars.colors.gray80} !important`,
  borderRadius: '8px !important',
  border: 'none !important',
  color: `${vars.colors.white} !important`,
  width: 'fit-content !important',
  padding: '8px 24px !important',
  textWrap: 'nowrap !important',
  fontFamily: `${vars.typography.fontFamily.primary} !important`,
  fontSize: `${vars.typography.body.b3.fontSize} !important`,
  fontWeight: `${vars.typography.body.b3.fontWeight} !important`,
  lineHeight: `${vars.typography.body.b3.lineHeight} !important`,
  letterSpacing: `${vars.typography.body.b3.letterSpacing} !important`,
});
