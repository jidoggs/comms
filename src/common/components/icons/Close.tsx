import * as React from "react";
import { Icon } from "./type";

const Close: Icon = ({ size = "30", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15 27.5c6.875 0 12.5-5.625 12.5-12.5S21.875 2.5 15 2.5 2.5 8.125 2.5 15 8.125 27.5 15 27.5Z"
      fill="currentFill"
    />
    <path
      d="m11.462 18.537 7.075-7.075M18.537 18.537l-7.075-7.075"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Close;
