import { typography, vars } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const stepContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  paddingLeft: 20,
  paddingRight: 20,
  paddingTop: 64,
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

export const roleCard = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 12,
  padding: 24,
  backgroundColor: vars.colors.white,
  border: `1px solid ${vars.colors.gray20}`,
  borderRadius: 16,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  minHeight: 140,
  ':hover': {
    borderColor: vars.colors.blue80,
  },
  ':active': {
    transform: 'scale(0.98)',
  },
});

export const roleCardSelected = style({
  borderColor: vars.colors.blue80,
  backgroundColor: vars.colors.blue10,
});

export const roleCardIcon = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const roleCardLabel = style([
  typography.body.b2,
  {
    color: vars.colors.black,
    textAlign: 'center',
  },
]);
