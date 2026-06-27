import { vars } from '@azit/design-system';
import { style, styleVariants } from '@vanilla-extract/css';

export const fab = style({
  position: 'fixed',
  bottom: '80px',
  right: '16px',
  zIndex: 9999,
  width: '44px',
  height: '44px',
  borderRadius: '50%',
  backgroundColor: vars.colors.blue100,
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
  userSelect: 'none',
});

export const fabIcon = style({
  fontSize: '20px',
  lineHeight: '1',
});

export const badge = style({
  position: 'absolute',
  top: '-2px',
  right: '-2px',
  minWidth: '16px',
  height: '16px',
  borderRadius: '8px',
  backgroundColor: vars.colors.error,
  color: vars.colors.white,
  fontSize: '9px',
  fontWeight: '700',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 3px',
  fontFamily: 'monospace',
});

/* BottomSheet 내부 콘텐츠 */
export const sheetHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingBottom: '12px',
  borderBottom: `1px solid ${vars.colors.gray20}`,
  marginBottom: '4px',
});

export const sheetTitle = style({
  fontSize: '14px',
  fontWeight: '700',
  color: vars.colors.gray80,
});

export const clearBtn = style({
  fontSize: '12px',
  color: vars.colors.gray50,
  cursor: 'pointer',
  padding: '4px 8px',
  borderRadius: '6px',
  border: `1px solid ${vars.colors.gray20}`,
  backgroundColor: vars.colors.background,
  selectors: {
    '&:hover': {
      backgroundColor: vars.colors.gray10,
    },
  },
});

export const logList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1px',
  overflowY: 'auto',
  maxHeight: '55vh',
  paddingBottom: '8px',
});

export const emptyState = style({
  padding: '32px 0',
  textAlign: 'center',
  color: vars.colors.gray40,
  fontSize: '13px',
});

export const logItem = style({
  padding: '8px 4px',
  borderBottom: `1px solid ${vars.colors.gray10}`,
  cursor: 'pointer',
  borderRadius: '4px',
  selectors: {
    '&:hover': {
      backgroundColor: vars.colors.gray10,
    },
  },
});

export const logRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
});

export const methodBadge = styleVariants({
  GET: {
    padding: '1px 6px',
    borderRadius: '4px',
    fontWeight: '700',
    fontSize: '10px',
    backgroundColor: '#dcfce7',
    color: '#166534',
    flexShrink: 0,
    fontFamily: 'monospace',
  },
  POST: {
    padding: '1px 6px',
    borderRadius: '4px',
    fontWeight: '700',
    fontSize: '10px',
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    flexShrink: 0,
    fontFamily: 'monospace',
  },
  PUT: {
    padding: '1px 6px',
    borderRadius: '4px',
    fontWeight: '700',
    fontSize: '10px',
    backgroundColor: '#fef9c3',
    color: '#854d0e',
    flexShrink: 0,
    fontFamily: 'monospace',
  },
  PATCH: {
    padding: '1px 6px',
    borderRadius: '4px',
    fontWeight: '700',
    fontSize: '10px',
    backgroundColor: '#ede9fe',
    color: '#5b21b6',
    flexShrink: 0,
    fontFamily: 'monospace',
  },
  DELETE: {
    padding: '1px 6px',
    borderRadius: '4px',
    fontWeight: '700',
    fontSize: '10px',
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    flexShrink: 0,
    fontFamily: 'monospace',
  },
  DEFAULT: {
    padding: '1px 6px',
    borderRadius: '4px',
    fontWeight: '700',
    fontSize: '10px',
    backgroundColor: vars.colors.gray20,
    color: vars.colors.gray60,
    flexShrink: 0,
    fontFamily: 'monospace',
  },
});

export const logUrl = style({
  flex: 1,
  fontSize: '12px',
  color: vars.colors.gray70,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontFamily: 'monospace',
});

export const statusBadge = styleVariants({
  success: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#16a34a',
    flexShrink: 0,
    fontFamily: 'monospace',
  },
  error: {
    fontSize: '11px',
    fontWeight: '700',
    color: vars.colors.error,
    flexShrink: 0,
    fontFamily: 'monospace',
  },
  pending: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#ca8a04',
    flexShrink: 0,
    fontFamily: 'monospace',
  },
});

export const durationText = style({
  fontSize: '10px',
  color: vars.colors.gray40,
  flexShrink: 0,
  fontFamily: 'monospace',
});

export const expandedSection = style({
  marginTop: '6px',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
});

export const tabs = style({
  display: 'flex',
  gap: '2px',
  backgroundColor: vars.colors.gray10,
  borderRadius: '6px',
  padding: '2px',
});

export const tab = style({
  flex: 1,
  padding: '4px 0',
  textAlign: 'center',
  fontSize: '11px',
  fontWeight: '600',
  color: vars.colors.gray50,
  cursor: 'pointer',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: 'transparent',
});

export const tabActive = style({
  backgroundColor: vars.colors.white,
  color: vars.colors.gray80,
  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
});

export const headersTable = style({
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '10px',
  fontFamily: 'monospace',
});

export const headerRow = style({
  borderBottom: `1px solid ${vars.colors.gray20}`,
  selectors: {
    '&:last-child': {
      borderBottom: 'none',
    },
  },
});

export const headerKey = style({
  padding: '3px 6px 3px 0',
  color: vars.colors.gray50,
  fontWeight: '600',
  verticalAlign: 'top',
  whiteSpace: 'nowrap',
  width: '1%',
});

export const headerValue = style({
  padding: '3px 0',
  color: vars.colors.gray70,
  wordBreak: 'break-all',
});

export const sectionDivider = style({
  fontSize: '9px',
  fontWeight: '700',
  color: vars.colors.gray40,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  padding: '4px 0 2px',
  borderTop: `1px solid ${vars.colors.gray20}`,
  marginTop: '4px',
  selectors: {
    '&:first-child': {
      borderTop: 'none',
      marginTop: '0',
    },
  },
});

export const bodyBlock = style({
  backgroundColor: vars.colors.gray10,
  borderRadius: '6px',
  padding: '8px',
  overflowX: 'auto',
  maxHeight: '140px',
  overflowY: 'auto',
});

export const bodyLabel = style({
  fontSize: '9px',
  fontWeight: '700',
  color: vars.colors.gray50,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  marginBottom: '4px',
});

export const bodyPre = style({
  margin: '0',
  fontSize: '10px',
  color: vars.colors.gray70,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-all',
  fontFamily: 'monospace',
  lineHeight: '1.5',
});

export const errorText = style({
  color: vars.colors.error,
});
