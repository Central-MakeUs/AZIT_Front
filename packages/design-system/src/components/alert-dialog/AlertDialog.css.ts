import { style } from '@vanilla-extract/css';
import { vars } from '../../shared/styles/theme.css';
import { typography } from '../../shared/styles/typography.css';

export const overlay = style({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 1000,
});

export const content = style({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: '335px',
  minHeight: '175px',
  backgroundColor: vars.colors.white,
  borderRadius: '16px',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  zIndex: 1001,
  boxShadow: vars.elevation.level1,
});

export const textContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '6px',
  width: '100%',
  marginTop: '16px',
});

export const title = style([
  typography.body.b1,
  {
    color: vars.colors.black,
    textAlign: 'center',
    width: '100%',
  },
]);

export const description = style([
  typography.body.b3,
  {
    color: vars.colors.gray70,
    textAlign: 'center',
    width: '100%',
  },
]);

export const buttonContainer = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '11px',
  width: '100%',
  marginTop: '25px',
});

export const cancelButton = style([
  typography.body.b2,
  {
    width: '146px',
    height: '44px',
    borderRadius: '12px',
    backgroundColor: vars.colors.gray10,
    color: vars.colors.gray70,
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: vars.typography.fontFamily.primary,
  },
]);

export const actionButton = style([
  typography.body.b2,
  {
    width: '146px',
    height: '44px',
    borderRadius: '12px',
    backgroundColor: vars.colors.blue80,
    color: vars.colors.white,
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: vars.typography.fontFamily.primary,
  },
]);
