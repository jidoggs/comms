import * as React from 'react';
import { Icon } from './type';

const Plus: Icon = ({ ...props }) => (
  <svg
    {...props}
    width="34"
    height="34"
    viewBox="0 0 34 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ cursor: 'pointer' }}
  >
    <path
      d="M21.5 17.0625H12.5C12.4869 17.0625 12.4713 17.0573 12.457 17.043C12.4427 17.0287 12.4375 17.0131 12.4375 17C12.4375 16.9869 12.4427 16.9713 12.457 16.957C12.4713 16.9427 12.4869 16.9375 12.5 16.9375H21.5C21.5131 16.9375 21.5287 16.9427 21.543 16.957C21.5573 16.9713 21.5625 16.9869 21.5625 17C21.5625 17.0131 21.5573 17.0287 21.543 17.043C21.5287 17.0573 21.5131 17.0625 21.5 17.0625Z"
      fill="#11142D"
      stroke="#11142D"
    />
    <path
      d="M17 21.5625C16.9869 21.5625 16.9713 21.5573 16.957 21.543C16.9427 21.5287 16.9375 21.5131 16.9375 21.5V12.5C16.9375 12.4869 16.9427 12.4713 16.957 12.457C16.9713 12.4427 16.9869 12.4375 17 12.4375C17.0131 12.4375 17.0287 12.4427 17.043 12.457C17.0573 12.4713 17.0625 12.4869 17.0625 12.5V21.5C17.0625 21.5131 17.0573 21.5287 17.043 21.543C17.0287 21.5573 17.0131 21.5625 17 21.5625Z"
      fill="#11142D"
      stroke="#11142D"
    />
  </svg>
);

export default Plus;
