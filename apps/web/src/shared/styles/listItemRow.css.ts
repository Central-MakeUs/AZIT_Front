import { vars } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

/** 마이페이지 메뉴·알림 설정 등 리스트 아이템 행 공통 스타일 (Figma 1184:7974 기준) */
export const listItemRow = style({
  padding: '12px 20px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  selectors: {
    '&:first-child': { paddingTop: 20 },
    '&:last-child': { paddingBottom: 20 },
  },
});

/** 리스트 아이템 사이 구분선 (Figma 1184:7974 - Rectangle 3469202/3469203: 0.5px, gray/10, x:20, width:295) */
export const listItemDivider = style({
  width: 'calc(100% - 40px)',
  height: 0.5,
  minHeight: 0.5,
  margin: '0 20px',
  backgroundColor: vars.colors.gray10,
  border: 'none',
  flexShrink: 0,
});
