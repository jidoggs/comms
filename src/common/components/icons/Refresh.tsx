import React from "react";
import { Icon } from "./type";

const Refresh: Icon = ({ size = "19", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 19 19"
    fill="none"
    {...props}
  >
    <path
      d="M17 9.5C17 13.64 13.64 17 9.5 17C5.36 17 2.8325 12.83 2.8325 12.83M2.8325 12.83H6.2225M2.8325 12.83V16.58M2 9.5C2 5.36 5.33 2 9.5 2C14.5025 2 17 6.17 17 6.17M17 6.17V2.42M17 6.17H13.67"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Refresh;
