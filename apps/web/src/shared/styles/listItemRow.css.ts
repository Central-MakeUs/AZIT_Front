import { vars } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

/** 마이페이지 메뉴·알림 설정 등 리스트 아이템 행 공통 스타일 */
export const listItemRow = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  padding: '20px 20px 12px 20px',
  backgroundColor: 'transparent',
  borderBottom: `1px solid ${vars.colors.gray10}`,
  selectors: {
    '&:last-child': {
      borderBottom: 'none',
      paddingBottom: '20px',
    },
  },
});
