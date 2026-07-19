import { typography, vars } from '@azit/design-system';
import { WarningIcon } from '@azit/design-system/icon';
import { style } from '@vanilla-extract/css';

const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
  paddingBottom: 66,
});

const message = style([
  typography.body.b2,
  {
    color: vars.colors.gray60,
    marginTop: 12,
  },
]);

interface Props {
  message?: string;
}

export function PageErrorFallback({
  message: msg = '정보를 불러오지 못했어요',
}: Props) {
  return (
    <div className={container}>
      <WarningIcon size={64} />
      <span className={message}>{msg}</span>
    </div>
  );
}
