import type { SVGProps } from 'react';
import type { IconColor } from './Icon.css';

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: IconColor;
}
