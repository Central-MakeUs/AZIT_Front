import { style } from '@vanilla-extract/css';
import { vars, typography } from '@azit/design-system';

export const pageContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  flexGrow: 1,
  overflowY: 'auto',
  backgroundColor: vars.colors.background,
});

export const contentWrapper = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: '20px',
  paddingBottom: 100,
});

export const dateSection = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: '20px 0',
  borderBottom: `1px solid ${vars.colors.gray10}`,
  ':first-child': {
    paddingTop: 0,
  },
  ':last-child': {
    borderBottom: 'none',
    paddingBottom: 0,
  },
});

export const dateSectionHeader = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  marginBottom: 12,
});

export const dateLabel = style([
  typography.body.b2,
  {
    color: vars.colors.black,
  },
]);

export const detailButton = style([
  typography.body.b4,
  {
    borderRadius: 8,
    border: `1px solid ${vars.colors.blue80}`,
    background: vars.colors.white,
    padding: '6px 12px',
    width: 'fit-content',
    margin: 0,
    height: 'fit-content',
  },
]);
