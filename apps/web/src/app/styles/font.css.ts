import { globalFontFace, globalStyle } from '@vanilla-extract/css';

const pretendard = 'Pretendard';

/* 100 */
globalFontFace(pretendard, {
  src: 'url("https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Thin.woff2") format("woff2")',
  fontWeight: '100',
  fontDisplay: 'swap',
});

/* 200 */
globalFontFace(pretendard, {
  src: 'url("https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-ExtraLight.woff2") format("woff2")',
  fontWeight: '200',
  fontDisplay: 'swap',
});

/* 300 */
globalFontFace(pretendard, {
  src: 'url("https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Light.woff2") format("woff2")',
  fontWeight: '300',
  fontDisplay: 'swap',
});

/* 400 */
globalFontFace(pretendard, {
  src: 'url("https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Regular.woff2") format("woff2")',
  fontWeight: '400',
  fontDisplay: 'swap',
});

/* 500 */
globalFontFace(pretendard, {
  src: 'url("https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Medium.woff2") format("woff2")',
  fontWeight: '500',
  fontDisplay: 'swap',
});

/* 600 */
globalFontFace(pretendard, {
  src: 'url("https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-SemiBold.woff2") format("woff2")',
  fontWeight: '600',
  fontDisplay: 'swap',
});

/* 700 */
globalFontFace(pretendard, {
  src: 'url("https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Bold.woff2") format("woff2")',
  fontWeight: '700',
  fontDisplay: 'swap',
});

/* 800 */
globalFontFace(pretendard, {
  src: 'url("https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-ExtraBold.woff2") format("woff2")',
  fontWeight: '800',
  fontDisplay: 'swap',
});

/* 900 */
globalFontFace(pretendard, {
  src: 'url("https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Black.woff2") format("woff2")',
  fontWeight: '900',
  fontDisplay: 'swap',
});

/* body */
globalStyle('body', {
  fontFamily: [
    pretendard,
    '-apple-system',
    'BlinkMacSystemFont',
    'system-ui',
    'sans-serif',
  ].join(', '),
});
