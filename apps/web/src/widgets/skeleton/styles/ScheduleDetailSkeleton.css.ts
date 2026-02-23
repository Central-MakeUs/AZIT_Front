import { vars } from '@azit/design-system';
import { keyframes, style } from '@vanilla-extract/css';

import { layoutStyles } from '@/shared/styles/layout.css';

const pulse = keyframes({
  '0%, 100%': { opacity: 1 },
  '50%': { opacity: 0.5 },
});

const skeletonBase = style({
  backgroundColor: vars.colors.gray20,
  borderRadius: '4px',
  animation: `${pulse} 1.5s ease-in-out infinite`,
});

export const mainContainer = style([
  layoutStyles.mainContainer,
  {
    backgroundColor: vars.colors.background,
    gap: '20px',
    padding: '12px 20px',
    boxSizing: 'border-box',
  },
]);

/* Header Section: tagRow + title + leaderRow */
export const headerSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  width: '100%',
});

export const tagRow = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '4px',
});

export const tagLine = style([
  skeletonBase,
  {
    width: '52px',
    height: '28px',
  },
]);

export const titleLine = style([
  skeletonBase,
  {
    width: '80%',
    height: '24px',
  },
]);

export const leaderRow = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '8px',
});

export const avatar = style([
  skeletonBase,
  {
    width: 36,
    height: 36,
    borderRadius: '50%',
    flexShrink: 0,
  },
]);

export const leaderNicknameLine = style([
  skeletonBase,
  {
    width: '72px',
    height: '16px',
  },
]);

/* Info Section: dateTime + location + map */
export const infoSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  width: '100%',
});

export const dateTimeRow = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '24px',
});

export const dateTimeLine = style([
  skeletonBase,
  {
    width: '100px',
    height: '16px',
  },
]);

export const locationBlock = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  width: '100%',
});

export const locationLine = style([
  skeletonBase,
  {
    width: '70%',
    height: '16px',
  },
]);

export const addressLine = style([
  skeletonBase,
  {
    width: '100%',
    height: '14px',
  },
]);

export const mapBlock = style([
  skeletonBase,
  {
    width: '100%',
    height: 160,
  },
]);

/* Description Section */
export const descriptionSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
});

export const descriptionLine = style([
  skeletonBase,
  {
    width: '100%',
    height: '14px',
  },
]);

/* Preparation Section */
export const preparationSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
});

export const preparationTitleLine = style([
  skeletonBase,
  {
    width: '48px',
    height: '16px',
  },
]);

export const preparationItemLine = style([
  skeletonBase,
  {
    width: '100%',
    height: '20px',
  },
]);

/* Participant Section */
export const participantSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  width: '100%',
});

export const participantHeaderRow = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
});

export const participantTitleLine = style([
  skeletonBase,
  {
    width: '80px',
    height: '16px',
  },
]);

export const moreLinkLine = style([
  skeletonBase,
  {
    width: '40px',
    height: '14px',
  },
]);

export const participantListRow = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '8px',
  paddingTop: 4,
});

export const participantAvatar = style([
  skeletonBase,
  {
    width: 40,
    height: 40,
    borderRadius: '50%',
    flexShrink: 0,
  },
]);

export const footerWrapper = style([layoutStyles.footerWrapper]);

export const buttonBlock = style([
  skeletonBase,
  {
    width: '100%',
    height: '54px',
  },
]);
