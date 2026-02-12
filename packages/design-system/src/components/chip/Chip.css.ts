import { typography } from '../../shared/styles';
import { vars } from '../../shared/styles/theme.css';
import { recipe } from '@vanilla-extract/recipes';

export type ChipVariants = NonNullable<Parameters<typeof chipVariant>[0]>;
export type ChipType = ChipVariants['type'];

export const chipVariant = recipe({
  base: [
    typography.body.b4,
    {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      padding: '4px 8px',
      borderRadius: '8px',
      border: 'none',
      textAlign: 'center',
    },
  ],
  variants: {
    type: {
      primary: {
        backgroundColor: vars.colors.blue60,
        color: vars.colors.white,
      },
      secondary: {
        backgroundColor: vars.colors.secondary,
        color: vars.colors.black,
      },
      skyblue: {
        backgroundColor: vars.colors.blue10,
        color: vars.colors.blue60,
      },
      gray: {
        backgroundColor: vars.colors.gray10,
        color: vars.colors.gray80,
      },
      green: {
        backgroundColor: vars.colors.green10,
        color: vars.colors.green80,
      },
    },
  },
  defaultVariants: {
    type: 'primary',
  },
});
