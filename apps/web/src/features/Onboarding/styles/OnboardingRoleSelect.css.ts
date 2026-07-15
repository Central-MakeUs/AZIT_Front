import { typography, vars } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const headerWrapper = style({
  width: '100%',
});

export const stepContainer = style({
  flex: 1,
  minHeight: 0,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  paddingLeft: 20,
  paddingRight: 20,
  paddingTop: 64,
});

export const stepContainerWithHeader = style({
  paddingTop: 8,
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
    fontWeight: '500',
    textAlign: 'left',
  },
]);

export const cardsSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  width: '100%',
  marginBottom: 'auto',
});

export const buttonWrapper = style({
  flexShrink: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: 20,
  backgroundColor: vars.colors.white,
  width: '100%',
});

export const roleCard = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 8,
  padding: 20,
  backgroundColor: vars.colors.white,
  border: `1px solid ${vars.colors.gray20}`,
  borderRadius: 16,
  width: '100%',
  cursor: 'pointer',
  textAlign: 'left',
  transition: 'border-color 0.15s ease',
});

export const roleCardSelected = style({
  borderColor: vars.colors.blue60,
  borderWidth: '1.5px',
});

const chipBase = style([
  typography.body.b4,
  {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2px 8px',
    borderRadius: 8,
  },
]);

export const chipLeader = style([
  chipBase,
  {
    backgroundColor: vars.colors.blue60,
    color: vars.colors.white,
  },
]);

export const chipMember = style([
  chipBase,
  {
    backgroundColor: vars.colors.blue10,
    color: vars.colors.blue60,
  },
]);

export const roleSubtitle = style([
  typography.body.b2,
  {
    color: vars.colors.black,
    fontWeight: '500',
  },
]);

export const roleDescRow = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  marginTop: 4,
});

export const roleBullets = style([
  typography.body.b3,
  {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    color: vars.colors.gray50,
    flex: 1,
  },
]);

export const roleIcon = style({
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
