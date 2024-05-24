import * as React from 'react';
import { Icon } from './type';

const MoreLoading: Icon = ({ size = '30', ...props }) => (
  <svg
    {...props}
    width={size}
    height={size}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 7.5C3.175 7.5 2.5 8.175 2.5 9C2.5 9.825 3.175 10.5 4 10.5C4.825 10.5 5.5 9.825 5.5 9C5.5 8.175 4.825 7.5 4 7.5Z"
      fill="white"
      className="animate-opacity transition delay-200"
    />
    <path
      d="M9 7.5C8.175 7.5 7.5 8.175 7.5 9C7.5 9.825 8.175 10.5 9 10.5C9.825 10.5 10.5 9.825 10.5 9C10.5 8.175 9.825 7.5 9 7.5Z"
      fill="white"
      className="animate-opacity transition delay-500"
    />
    <path
      d="M14 7.5C13.175 7.5 12.5 8.175 12.5 9C12.5 9.825 13.175 10.5 14 10.5C14.825 10.5 15.5 9.825 15.5 9C15.5 8.175 14.825 7.5 14 7.5Z"
      fill="white"
      className="animate-opacity transition  delay-1000"
    />
  </svg>
);

export default MoreLoading;
