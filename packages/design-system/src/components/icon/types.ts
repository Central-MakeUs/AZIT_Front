import type { SVGProps } from 'react';
import type { IconColor } from './icon.css';

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: IconColor;
}
