import { vars } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const layoutStyles = {
  headerWrapper: style({
    flexShrink: 0,
    width: '100%',
  }),

  mainContainer: style({
    flex: 1,
    minHeight: 0,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  }),

  footerWrapper: style({
    flexShrink: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: vars.colors.white,
    padding: '20px',
  }),
};
