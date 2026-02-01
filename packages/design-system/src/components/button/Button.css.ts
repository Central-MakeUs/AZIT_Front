import { typography } from '../../shared/styles';
import { vars } from '../../shared/styles/theme.css';
import { recipe } from '@vanilla-extract/recipes';

export type ButtonVariants = NonNullable<Parameters<typeof buttonVariant>[0]>;
export type ButtonSize = ButtonVariants['size'];
export type ButtonColor = ButtonVariants['state'];

export const buttonVariant = recipe({
  base: {
    borderRadius: 16,
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  variants: {
    size: {
      large: [
        typography.body.b1,
        {
          height: 54,
        },
      ],
    },
    state: {
      kakao: {
        backgroundColor: '#FEE500',
        color: vars.colors.black,
        fontSize: 16,
        borderRadius: 12,
      },
      apple: {
        backgroundColor: vars.colors.white,
        color: vars.colors.black,
        fontSize: 16,
        borderRadius: 12,
      },
      active: { backgroundColor: vars.colors.blue80, color: vars.colors.white },
      outline: {
        backgroundColor: vars.colors.white,
        color: vars.colors.blue80,
        border: `1px solid ${vars.colors.blue80}`,
      },
      disabled: {
        backgroundColor: vars.colors.gray10,
        color: vars.colors.gray50,
      },
    },
  },
  defaultVariants: {
    size: 'large',
    state: 'active',
  },
});
