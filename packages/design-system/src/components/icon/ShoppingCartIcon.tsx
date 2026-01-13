import { forwardRef } from 'react';
import type { Ref } from 'react';
import { clsx } from 'clsx';
import { iconVariant } from './icon.css';
import type { IconProps } from './types';

function ShoppingCartIcon(
  { size = 24, color, className, ...props }: IconProps,
  ref: Ref<SVGSVGElement>
) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      ref={ref}
      className={clsx(iconVariant({ color }), className)}
      {...props}
    >
      <path
        d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 18.105 17.895 19 19 19C20.105 19 21 18.105 21 17C21 15.895 20.105 15 19 15C17.895 15 17 15.895 17 17V13M9 19.5C9.828 19.5 10.5 18.828 10.5 18C10.5 17.172 9.828 16.5 9 16.5C8.172 16.5 7.5 17.172 7.5 18C7.5 18.828 8.172 19.5 9 19.5ZM20 19.5C20.828 19.5 21.5 18.828 21.5 18C21.5 17.172 20.828 16.5 20 16.5C19.172 16.5 18.5 17.172 18.5 18C18.5 18.828 19.172 19.5 20 19.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ForwardRef = forwardRef(ShoppingCartIcon);
export default ForwardRef;
