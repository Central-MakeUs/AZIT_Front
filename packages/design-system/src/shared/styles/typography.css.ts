import { style } from '@vanilla-extract/css';
import { vars } from './theme.css';

export const typography = {
  heading: {
    h1: style({
      fontSize: vars.typography.heading.h1.fontSize,
      fontWeight: vars.typography.heading.h1.fontWeight,
      lineHeight: vars.typography.heading.h1.lineHeight,
      letterSpacing: vars.typography.heading.h1.letterSpacing,
    }),
    h2: style({
      fontSize: vars.typography.heading.h2.fontSize,
      fontWeight: vars.typography.heading.h2.fontWeight,
      lineHeight: vars.typography.heading.h2.lineHeight,
      letterSpacing: vars.typography.heading.h2.letterSpacing,
    }),
    h3: style({
      fontSize: vars.typography.heading.h3.fontSize,
      fontWeight: vars.typography.heading.h3.fontWeight,
      lineHeight: vars.typography.heading.h3.lineHeight,
      letterSpacing: vars.typography.heading.h3.letterSpacing,
    }),
  },
  body: {
    b1: style({
      fontSize: vars.typography.body.b1.fontSize,
      fontWeight: vars.typography.body.b1.fontWeight,
      lineHeight: vars.typography.body.b1.lineHeight,
      letterSpacing: vars.typography.body.b1.letterSpacing,
    }),
    b2: style({
      fontSize: vars.typography.body.b2.fontSize,
      fontWeight: vars.typography.body.b2.fontWeight,
      lineHeight: vars.typography.body.b2.lineHeight,
      letterSpacing: vars.typography.body.b2.letterSpacing,
    }),
    b3: style({
      fontSize: vars.typography.body.b3.fontSize,
      fontWeight: vars.typography.body.b3.fontWeight,
      lineHeight: vars.typography.body.b3.lineHeight,
      letterSpacing: vars.typography.body.b3.letterSpacing,
    }),
    b4: style({
      fontSize: vars.typography.body.b4.fontSize,
      fontWeight: vars.typography.body.b4.fontWeight,
      lineHeight: vars.typography.body.b4.lineHeight,
      letterSpacing: vars.typography.body.b4.letterSpacing,
    }),
  },
};
