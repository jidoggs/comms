import * as React from 'react';
import { Icon } from './type';

const TickCircle: Icon = ({ size = '30', ...props }) => (
  <svg
    {...props}
    width={size}
    height={size}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity="0.4"
      d="M16 9C16 12.866 12.866 16 9 16C5.13401 16 2 12.866 2 9C2 5.13401 5.13401 2 9 2C12.866 2 16 5.13401 16 9Z"
      fill="#00A96E"
      stroke="currentColor"
    />
    <path
      d="M7.58152 10.6812L7.93508 11.0348L8.28863 10.6812L12.1436 6.82625L11.7901 6.4727L12.1436 6.82625C12.1531 6.81681 12.1678 6.80957 12.1876 6.80957C12.2074 6.80957 12.2221 6.81681 12.2315 6.82625L12.5851 6.4727L12.2315 6.82625C12.241 6.83569 12.2482 6.85039 12.2482 6.8702C12.2482 6.89 12.241 6.9047 12.2315 6.91414L7.97902 11.1666C7.96672 11.1789 7.95096 11.1852 7.93508 11.1852C7.91919 11.1852 7.90343 11.1789 7.89113 11.1666L5.76863 9.04414C5.75919 9.0347 5.75195 9.02 5.75195 9.0002C5.75195 8.98039 5.75919 8.96569 5.76863 8.95625C5.77808 8.94681 5.79277 8.93957 5.81258 8.93957C5.83239 8.93957 5.84708 8.94681 5.85652 8.95625L7.58152 10.6812Z"
      fill="#00A96E"
      stroke="currentColor"
    />
  </svg>
);

export default TickCircle;
