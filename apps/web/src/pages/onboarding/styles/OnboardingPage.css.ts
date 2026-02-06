import { typography, vars } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const mainContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  paddingLeft: 20,
  paddingRight: 20,
  paddingTop: 56,
  paddingBottom: 100,
});

export const headerSection = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 8,
  marginBottom: 40,
});

export const title = style([
  typography.heading.h2,
  {
    color: vars.colors.black,
    textAlign: 'left',
  },
]);

export const subtitle = style([
  typography.body.b2,
  {
    color: vars.colors.blue80,
    textAlign: 'left',
  },
]);

export const cardsSection = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 12,
  width: '100%',
  marginBottom: 'auto',
});

export const buttonWrapper = style({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingLeft: 20,
  paddingRight: 20,
  paddingBottom: 38,
  backgroundColor: vars.colors.white,
});
