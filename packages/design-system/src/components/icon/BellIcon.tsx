import { forwardRef } from 'react';
import type { Ref } from 'react';
import { clsx } from 'clsx';
import { iconVariant } from './Icon.css';
import type { IconProps } from './types';

function BellIcon(
  { size = 24, color, className, ...props }: IconProps,
  ref: Ref<SVGSVGElement>
) {
  return (
    <svg
      viewBox="0 0 20 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      ref={ref}
      className={clsx(iconVariant({ color }), className)}
      {...props}
    >
      <path
        d="M7.09321 20C7.79834 20.6224 8.72459 21 9.73903 21C10.7535 21 11.6797 20.6224 12.3849 20M15.739 7C15.739 5.4087 15.1069 3.88258 13.9817 2.75736C12.8565 1.63214 11.3303 1 9.73903 1C8.14773 1 6.62161 1.63214 5.49639 2.75736C4.37117 3.88258 3.73903 5.4087 3.73903 7C3.73903 10.0902 2.9595 12.206 2.0887 13.6054C1.35416 14.7859 0.986891 15.3761 1.00036 15.5408C1.01527 15.7231 1.05389 15.7926 1.20081 15.9016C1.33349 16 1.93162 16 3.12789 16H16.3502C17.5464 16 18.1446 16 18.2773 15.9016C18.4242 15.7926 18.4628 15.7231 18.4777 15.5408C18.4912 15.3761 18.1239 14.7859 17.3894 13.6054C16.5186 12.206 15.739 10.0902 15.739 7Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ForwardRef = forwardRef(BellIcon);
export default ForwardRef;
