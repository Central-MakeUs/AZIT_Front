import { forwardRef } from 'react';
import type { Ref } from 'react';

interface PointCoinIconProps {
  size?: number;
  className?: string;
}

function PointCoinIcon(
  { size = 24, className, ...props }: PointCoinIconProps,
  ref: Ref<SVGSVGElement>
) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      className={className}
      {...props}
    >
      <g clipPath="url(#clip0_pointcoin)">
        <path
          d="M12 2.25C17.3848 2.25 21.75 6.61522 21.75 12C21.75 17.3848 17.3848 21.75 12 21.75C6.61522 21.75 2.25 17.3848 2.25 12C2.25 6.61522 6.61522 2.25 12 2.25Z"
          fill="#0366FD"
          stroke="#B8D4FF"
          strokeWidth="1.5"
        />
        <path
          d="M12.5403 8.40039H9.60078C9.4351 8.40039 9.30078 8.53471 9.30078 8.70039V15.871C9.30078 16.0367 9.4351 16.171 9.60078 16.171H10.6676C10.8333 16.171 10.9676 16.0367 10.9676 15.871V13.9817C10.9676 13.8161 11.102 13.6817 11.2676 13.6817H12.3112C14.0822 13.6817 15.3008 12.6194 15.3008 11.0359C15.3008 9.44234 14.2692 8.40039 12.5403 8.40039ZM11.8321 12.2857H11.2676C11.102 12.2857 10.9676 12.1514 10.9676 11.9857V10.0856C10.9676 9.91992 11.102 9.78561 11.2676 9.78561H11.8842C12.8524 9.78561 13.5818 10.1397 13.5818 11.0354C13.5818 11.9415 12.8315 12.2857 11.8321 12.2857Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_pointcoin">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

const ForwardRef = forwardRef(PointCoinIcon);
export default ForwardRef;
