import { vars } from '@azit/design-system';
import { globalStyle } from '@vanilla-extract/css';

globalStyle('.react-calendar', {
  width: '100%',
  lineHeight: '1.125em',
});

globalStyle(
  '.react-calendar, .react-calendar *, .react-calendar *:before, .react-calendar *:after',
  {
    MozBoxSizing: 'border-box',
    WebkitBoxSizing: 'border-box',
    boxSizing: 'border-box',
  }
);

globalStyle('.react-calendar button', {
  margin: 0,
  border: 0,
  outline: 'none',
});

globalStyle('.react-calendar button:enabled:hover', {
  cursor: 'pointer',
});

globalStyle('.react-calendar__navigation', {
  display: 'none',
});

globalStyle(
  '.react-calendar__decade-view__years__year--neighboringDecade, .react-calendar__century-view__decades__decade--neighboringCentury',
  {
    display: 'none',
  }
);

globalStyle('.react-calendar__month-view__weekdays', {
  fontSize: vars.typography.body.b2.fontSize,
  fontWeight: vars.typography.body.b2.fontWeight,
  lineHeight: vars.typography.body.b2.lineHeight,
  letterSpacing: vars.typography.body.b2.letterSpacing,
  textAlign: 'center',
  textTransform: 'uppercase',
  font: 'inherit',
});

globalStyle('.react-calendar__month-view__weekdays__weekday', {
  padding: '0.5em',
  color: vars.colors.black,
});

globalStyle('.react-calendar__month-view__weekdays__weekday > abbr', {
  fontSize: vars.typography.body.b4.fontSize,
  fontWeight: vars.typography.body.b4.fontWeight,
  lineHeight: vars.typography.body.b4.lineHeight,
  letterSpacing: vars.typography.body.b4.letterSpacing,
  color: vars.colors.gray30,
});

globalStyle('abbr', {
  fontWeight: 'var(--font-weight-regular)',
  textDecoration: 'none',
  position: 'sticky',
  fontSize: '16px',
});

globalStyle('.react-calendar__month-view__days__day--weekend', {
  color: vars.colors.black,
});

globalStyle('.react-calendar__month-view__days', {
  display: 'grid !important',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: '4px',
});

globalStyle('.react-calendar__tile', {
  maxHeight: '50px',
  padding: '10px',
  display: 'grid',
  placeItems: 'center',
  font: 'inherit',
  borderRadius: '8px',
  width: '100%',
  height: '6vh',
  border: `1px solid ${vars.colors.white} !important`,
});

globalStyle('.react-calendar__tile:disabled', {
  // display: 'none',
  pointerEvents: 'none',
});

globalStyle('.react-calendar__month-view__days__day--neighboringMonth', {
  visibility: 'hidden',
  pointerEvents: 'none',
});

globalStyle('.react-calendar__tile--hasActive', {
  border: `1px solid ${vars.colors.blue80} !important`,
  color: vars.colors.blue80,
});

globalStyle('.react-calendar__tile--active', {
  border: `1px solid ${vars.colors.blue80} !important`,
  color: vars.colors.blue80,
});

globalStyle('.react-calendar__tile--now', {
  // border: `1px solid ${vars.colors.blue80} !important`,
});
