import { globalStyle, style } from '@vanilla-extract/css';
import { layoutStyles } from '@/shared/styles/layout.css';
import { vars } from '@azit/design-system';

const typography = {
  h1: {
    fontSize: vars.typography.heading.h1.fontSize,
    fontWeight: vars.typography.heading.h1.fontWeight,
    lineHeight: vars.typography.heading.h1.lineHeight,
    letterSpacing: vars.typography.heading.h1.letterSpacing,
  },
  h2: {
    fontSize: vars.typography.heading.h2.fontSize,
    fontWeight: vars.typography.heading.h2.fontWeight,
    lineHeight: vars.typography.heading.h2.lineHeight,
    letterSpacing: vars.typography.heading.h2.letterSpacing,
  },
  h3: {
    fontSize: vars.typography.heading.h3.fontSize,
    fontWeight: vars.typography.heading.h3.fontWeight,
    lineHeight: vars.typography.heading.h3.lineHeight,
    letterSpacing: vars.typography.heading.h3.letterSpacing,
  },
  bodyB1: {
    fontSize: vars.typography.body.b1.fontSize,
    fontWeight: vars.typography.body.b1.fontWeight,
    lineHeight: vars.typography.body.b1.lineHeight,
    letterSpacing: vars.typography.body.b1.letterSpacing,
  },
  bodyB2: {
    fontSize: vars.typography.body.b2.fontSize,
    fontWeight: vars.typography.body.b2.fontWeight,
    lineHeight: vars.typography.body.b2.lineHeight,
    letterSpacing: vars.typography.body.b2.letterSpacing,
  },
  bodyB3: {
    fontSize: vars.typography.body.b3.fontSize,
    fontWeight: vars.typography.body.b3.fontWeight,
    lineHeight: vars.typography.body.b3.lineHeight,
    letterSpacing: vars.typography.body.b3.letterSpacing,
  },
};

export const headerWrapper = style([layoutStyles.headerWrapper]);

export const markdownContainer = style([
  layoutStyles.mainContainer,
  {
    backgroundColor: vars.colors.background_sub,
    padding: 20,
    fontFamily: vars.typography.fontFamily.primary,
    color: vars.colors.gray100,
  },
]);

/* Heading */
globalStyle(`${markdownContainer} h1`, {
  ...typography.h1,
  marginTop: '1.5rem',
  marginBottom: '0.75rem',
});

globalStyle(`${markdownContainer} h1:first-child`, {
  marginTop: 0,
});

globalStyle(`${markdownContainer} h2`, {
  ...typography.h2,
  marginTop: '1.5rem',
  marginBottom: '0.75rem',
});

globalStyle(`${markdownContainer} h2:first-child`, {
  marginTop: 0,
});

globalStyle(`${markdownContainer} h3`, {
  ...typography.h3,
  marginTop: '1.25rem',
  marginBottom: '0.5rem',
});

globalStyle(`${markdownContainer} h3:first-child`, {
  marginTop: 0,
});

/* Paragraph */
globalStyle(`${markdownContainer} p`, {
  ...typography.bodyB2,
  marginTop: 0,
  marginBottom: '0.75rem',
});

/* List */
globalStyle(`${markdownContainer} ul`, {
  ...typography.bodyB2,
  marginTop: 0,
  marginBottom: '0.75rem',
  paddingLeft: '1.25rem',
  listStyleType: 'disc',
  listStylePosition: 'outside',
});

globalStyle(`${markdownContainer} ol`, {
  ...typography.bodyB2,
  marginTop: 0,
  marginBottom: '0.75rem',
  paddingLeft: '1.25rem',
  listStyleType: 'decimal',
  listStylePosition: 'outside',
});

globalStyle(`${markdownContainer} li`, {
  marginBottom: '0.25rem',
});

globalStyle(`${markdownContainer} li:last-child`, {
  marginBottom: 0,
});

/* Bold */
globalStyle(`${markdownContainer} strong`, {
  fontWeight: typography.bodyB1.fontWeight,
});

/* Code (inline) */
globalStyle(`${markdownContainer} code`, {
  ...typography.bodyB3,
  backgroundColor: vars.colors.gray10,
  color: vars.colors.gray100,
  padding: '0.2rem 0.4rem',
  borderRadius: '4px',
});

/* Code block */
globalStyle(`${markdownContainer} pre`, {
  marginTop: 0,
  marginBottom: '0.75rem',
  overflow: 'auto',
  borderRadius: '4px',
});

globalStyle(`${markdownContainer} pre code`, {
  display: 'block',
  padding: '0.75rem 1rem',
  backgroundColor: vars.colors.gray10,
});

/* Link */
globalStyle(`${markdownContainer} a`, {
  ...typography.bodyB2,
  color: vars.colors.blue60,
  textDecoration: 'underline',
});

/* Blockquote */
globalStyle(`${markdownContainer} blockquote`, {
  ...typography.bodyB3,
  marginTop: 0,
  marginBottom: '0.75rem',
  paddingLeft: '1rem',
  borderLeft: `3px solid ${vars.colors.gray30}`,
  color: vars.colors.gray70,
});

/* Horizontal rule */
globalStyle(`${markdownContainer} hr`, {
  margin: '1.25rem 0',
  border: 'none',
  borderTop: `1px solid ${vars.colors.gray20}`,
});
