import { forwardRef } from 'react';
import type { Ref } from 'react';
import { clsx } from 'clsx';
import { iconVariant } from './Icon.css';
import type { IconProps } from './types';

function ShoppingBagIcon(
  { size = 24, color, className, ...props }: IconProps,
  ref: Ref<SVGSVGElement>
) {
  return (
    <svg
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      ref={ref}
      className={clsx(iconVariant({ color }), className)}
      {...props}
    >
      <path
        d="M14.1978 6C14.1978 7.06087 13.7764 8.07828 13.0263 8.82843C12.2761 9.57857 11.2587 10 10.1978 10C9.13696 10 8.11955 9.57857 7.3694 8.82843C6.61926 8.07828 6.19783 7.06087 6.19783 6M1.83105 5.40138L1.13105 13.8014C0.980672 15.6059 0.905483 16.5082 1.21051 17.2042C1.47852 17.8157 1.94286 18.3204 2.53002 18.6382C3.1983 19 4.10369 19 5.91447 19H14.4812C16.292 19 17.1974 19 17.8656 18.6382C18.4528 18.3204 18.9171 17.8157 19.1851 17.2042C19.4902 16.5082 19.415 15.6059 19.2646 13.8014L18.5646 5.40138C18.4352 3.84875 18.3705 3.07243 18.0267 2.48486C17.7239 1.96744 17.2731 1.5526 16.7323 1.29385C16.1182 1 15.3392 1 13.7812 1L6.61447 1C5.05645 1 4.27745 1 3.66335 1.29384C3.12257 1.5526 2.67173 1.96744 2.36896 2.48486C2.02513 3.07243 1.96043 3.84875 1.83105 5.40138Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ForwardRef = forwardRef(ShoppingBagIcon);
export default ForwardRef;
