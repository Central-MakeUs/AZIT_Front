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
        d="M16 8C16 9.06087 15.5786 10.0783 14.8284 10.8284C14.0783 11.5786 13.0609 12 12 12C10.9391 12 9.92172 11.5786 9.17157 10.8284C8.42143 10.0783 8 9.06087 8 8M3.63274 7.40138L2.93275 15.8014C2.65737 18.606 2.51968 20.0082 3.01221 21.0792C3.43522 21.9907 4.14456 22.7453 5.03172 23.2257C6.00001 23.75 7.40541 23.75 10.2162 23.75H13.7838C16.5946 23.75 17.9999 23.75 18.9682 23.2257C19.8554 22.7453 20.5648 21.9907 20.9878 21.0792C21.4803 20.0082 21.3426 18.606 21.0673 15.8014L20.3673 7.40138C20.1244 5.03438 20.003 3.85088 19.4534 2.98484C18.9757 2.21743 18.2748 1.61511 17.4465 1.25635C16.5199 0.85 15.3284 0.85 12.9454 0.85L11.0546 0.85C8.67161 0.85 7.48013 0.85 6.55351 1.25634C5.72531 1.61509 5.02466 2.21742 4.54691 2.98484C3.99732 3.85088 3.87594 5.03438 3.63274 7.40138Z"
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
