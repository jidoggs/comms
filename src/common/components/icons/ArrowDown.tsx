import * as React from 'react';
import { Icon } from './type';

const ArrowDown: Icon = ({ size = '19', ...props }) => (
  <svg
    width={size}
    height={size}
    {...props}
    viewBox="0 0 14 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ cursor: 'pointer' }}
  >
    <path
      d="M6.99989 6.09998C6.60292 6.09998 6.20648 5.94696 5.90595 5.64643L1.01595 0.756427C1.0065 0.746983 0.999268 0.73229 0.999268 0.71248C0.999268 0.692671 1.0065 0.677978 1.01595 0.668534C1.02539 0.65909 1.04008 0.651855 1.05989 0.651855C1.0797 0.651855 1.0944 0.65909 1.10384 0.668534L5.99384 5.55853C6.5491 6.1138 7.45068 6.1138 8.00595 5.55853L12.8959 0.668534C12.9054 0.659091 12.9201 0.651855 12.9399 0.651855C12.9597 0.651855 12.9744 0.659091 12.9838 0.668534C12.9933 0.677977 13.0005 0.692671 13.0005 0.71248C13.0005 0.73229 12.9933 0.746983 12.9838 0.756427L8.09384 5.64643C7.7933 5.94697 7.39687 6.09998 6.99989 6.09998Z"
      stroke={'currentColor'}
    />
  </svg>
);

export default ArrowDown;
