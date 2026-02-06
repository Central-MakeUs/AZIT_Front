import { typography, vars } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const header = style({
  position: 'relative',
  width: '100%',
  minHeight: 48,
  flexShrink: 0,
});

export const closeButton = style({
  position: 'absolute',
  top: 20,
  right: 0,
  width: 24,
  height: 24,
  padding: 0,
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 4,
  paddingBottom: 24,
});

export const crewInfoSection = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  alignSelf: 'stretch',
  gap: 12,
});

export const crewLogoPlaceholder = style([
  typography.heading.h2,
  {
    width: 96,
    height: 96,
    borderRadius: '100%',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: vars.colors.blue80,
    color: vars.colors.secondary,
  },
]);

export const crewName = style([
  typography.heading.h2,
  {
    color: vars.colors.black,
    textAlign: 'center',
  },
]);

export const crewMetaSection = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 4,
});

export const crewCategory = style([
  typography.body.b3,
  {
    color: vars.colors.gray60,
    textAlign: 'center',
  },
]);

export const crewMemberCount = style([
  typography.body.b3,
  {
    color: vars.colors.gray60,
    textAlign: 'center',
  },
]);

export const buttonSection = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  paddingTop: 24,
});

export const requestButton = style({
  width: '100%',
});
