import { typography, vars } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

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
  gap: 10,
});

export const crewMetaData = style([
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
