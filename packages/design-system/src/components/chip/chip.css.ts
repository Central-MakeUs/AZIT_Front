import { vars } from '../../shared/styles/theme.css';
import { recipe } from '@vanilla-extract/recipes';

export type ChipVariants = NonNullable<Parameters<typeof chipVariant>[0]>;
export type ChipType = ChipVariants['type'];

export const chipVariant = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '4px 8px',
    borderRadius: '8px',
    border: 'none',
    fontFamily: vars.typography.fontFamily.primary,
    ...vars.typography.body.b4,
    textAlign: 'center',
  },
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
    },
  },
  defaultVariants: {
    type: 'primary',
  },
});
