import * as React from 'react';
import { Icon } from './type';

const ArrowUp: Icon = ({ size = '18', ...props }) => (
  <svg
    {...props}
    width={size}
    height={size}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.9401 11.3505C14.9304 11.3505 14.9228 11.3488 14.9169 11.3464C14.9116 11.3443 14.9046 11.3404 14.8962 11.332L10.0062 6.44199C9.45093 5.88673 8.54935 5.88673 7.99408 6.44199L3.10408 11.332C3.09464 11.3414 3.07995 11.3487 3.06014 11.3487C3.04033 11.3487 3.02563 11.3414 3.01619 11.332C3.00675 11.3225 2.99951 11.3079 2.99951 11.288C2.99951 11.2682 3.00675 11.2535 3.01619 11.2441L7.90619 6.3541C8.50477 5.75552 9.48638 5.7529 10.095 6.355C10.0952 6.35525 10.0955 6.3555 10.0957 6.35576L14.9841 11.2441C14.9935 11.2535 15.0008 11.2682 15.0008 11.288C15.0008 11.3047 14.9956 11.3178 14.9884 11.3271C14.9621 11.3487 14.9423 11.3505 14.9401 11.3505Z"
      fill="currentColor"
      stroke="currentColor"
    />
  </svg>
);

export default ArrowUp;