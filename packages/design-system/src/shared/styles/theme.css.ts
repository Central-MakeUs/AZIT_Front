import { createGlobalTheme } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
  colors: {
    gray10: '#E6E7E9',
    gray20: '#CDCFD2',
    gray30: '#B4B7BC',
    gray40: '#9B9FA6',
    gray50: '#81878F',
    gray60: '#686F79',
    gray70: '#4F5763',
    gray80: '#363F4D',
    gray90: '#1D2736',
    gray100: '#040F20',
    blue10: '#D1E5FE',
    blue20: '#B8D4FF',
    blue30: '#8BB9FF',
    blue40: '#5E9DFF',
    blue50: '#3082FF',
    blue60: '#0366FD',
    blue70: '#0054D4',
    blue80: '#0044AB',
    blue90: '#003483',
    blue100: '#00245A',
    background: '#FFFFFF',
    background_sub: '#F9FAFB',
    secondary: '#D1F801',
    white: '#FFFFFF',
    black: '#000000',
  },
  typography: {
    fontFamily: {
      primary:
        'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
    },
    heading: {
      h1: {
        fontSize: '32px',
        fontWeight: '600',
        lineHeight: '1.4',
        letterSpacing: '0',
      },
      h2: {
        fontSize: '24px',
        fontWeight: '600',
        lineHeight: '1.4',
        letterSpacing: '0',
      },
      h3: {
        fontSize: '20px',
        fontWeight: '600',
        lineHeight: '1.4',
        letterSpacing: '0',
      },
    },
    body: {
      b1: {
        fontSize: '18px',
        fontWeight: '600',
        lineHeight: '1.4',
        letterSpacing: '0',
      },
      b2: {
        fontSize: '16px',
        fontWeight: '500',
        lineHeight: '1.4',
        letterSpacing: '0',
      },
      b3: {
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '1.4',
        letterSpacing: '0',
      },
      b4: {
        fontSize: '12px',
        fontWeight: '400',
        lineHeight: '1.4',
        letterSpacing: '0',
      },
    },
  },
  elevation: {
    level1: '0px 4px 12px 0px rgba(0, 0, 0, 0.16)',
  },
});
