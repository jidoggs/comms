import * as React from 'react';
import { Icon } from './type';

const ListUl: Icon = ({ size = '30', ...props }) => (
  <svg
    {...props}
    width={size}
    height={size}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.25 9C3.25 9.13636 3.13636 9.25 3 9.25C2.86364 9.25 2.75 9.13636 2.75 9C2.75 8.86364 2.86364 8.75 3 8.75C3.13636 8.75 3.25 8.86364 3.25 9ZM3.25 12C3.25 12.1364 3.13636 12.25 3 12.25C2.86364 12.25 2.75 12.1364 2.75 12C2.75 11.8636 2.86364 11.75 3 11.75C3.13636 11.75 3.25 11.8636 3.25 12ZM3.25 6C3.25 6.13636 3.13636 6.25 3 6.25C2.86364 6.25 2.75 6.13636 2.75 6C2.75 5.86364 2.86364 5.75 3 5.75C3.13636 5.75 3.25 5.86364 3.25 6ZM15.25 9C15.25 9.13636 15.1364 9.25 15 9.25H6C5.86364 9.25 5.75 9.13636 5.75 9C5.75 8.86364 5.86364 8.75 6 8.75H15C15.1364 8.75 15.25 8.86364 15.25 9ZM15.25 12C15.25 12.1364 15.1364 12.25 15 12.25H6C5.86364 12.25 5.75 12.1364 5.75 12C5.75 11.8636 5.86364 11.75 6 11.75H15C15.1364 11.75 15.25 11.8636 15.25 12ZM6 6.25C5.86364 6.25 5.75 6.13636 5.75 6C5.75 5.86364 5.86364 5.75 6 5.75H15C15.1364 5.75 15.25 5.86364 15.25 6C15.25 6.13636 15.1364 6.25 15 6.25H6Z"
      fill="currentColor"
      stroke="currentColor"
    />
  </svg>
);

export default ListUl;
