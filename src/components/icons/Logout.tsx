import * as React from "react";
import { Icon } from "./type";

const Logout: Icon = ({ size = "18", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6.675 5.67c.233-2.7 1.62-3.803 4.657-3.803h.098c3.353 0 4.695 1.343 4.695 4.695v4.89c0 3.353-1.342 4.695-4.695 4.695h-.098c-3.014 0-4.402-1.087-4.65-3.742M11.25 9H2.715M4.388 6.488 1.875 9l2.513 2.512" />
    </g>
  </svg>
);

export default Logout;
