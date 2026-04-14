import { createGlobalTheme } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
  colors: {
    gray10: '#F2F4F6',
    gray20: '#E5E8EB',
    gray30: '#D1D6DC',
    gray40: '#AFB8C1',
    gray50: '#8B95A1',
    gray60: '#6B7684',
    gray70: '#4E5968',
    gray80: '#333D4B',
    gray90: '#191F28',
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
    background_sub: '#F5F6FA',
    secondary: '#D1F801',
    error: '#FF4545',
    green10: '#BAEBC1',
    green80: '#187B28',
    white: '#FFFFFF',
    black: '#000000',
    grad: 'linear-gradient(135deg, #2F5BFF 0%, #1C3799 100%)',
    grad_secondary: 'linear-gradient(152deg, #CCF00D 10.56%, #83B452 89.94%)',
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
