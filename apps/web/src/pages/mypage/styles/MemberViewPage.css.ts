import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

import { layoutStyles } from '@/shared/styles/layout.css';

export const headerWrapper = style([layoutStyles.headerWrapper]);

export const mainContainer = style([
  layoutStyles.mainContainer,
  {
    backgroundColor: vars.colors.background_sub,
    padding: 20,
  },
]);

export const totalCount = style([
  typography.body.b2,
  {
    color: vars.colors.black,
    padding: '0 4px',
    marginBottom: 12,
  },
]);
