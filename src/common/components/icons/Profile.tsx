import * as React from "react";
import { Icon } from "./type";

const Profile: Icon = ({ size = "18", ...props }) => (
  <svg
    {...props}
    width={size}
    height={size}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ cursor: 'pointer' }}
  >
    <g
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.12 8.152a1.363 1.363 0 0 0-.248 0A3.315 3.315 0 0 1 5.67 4.83 3.327 3.327 0 0 1 9 1.5a3.327 3.327 0 0 1 .12 6.652ZM5.37 10.92c-1.815 1.215-1.815 3.195 0 4.402 2.063 1.38 5.445 1.38 7.507 0 1.816-1.214 1.816-3.194 0-4.402-2.055-1.373-5.437-1.373-7.507 0Z" />
    </g>
  </svg>
);

export default Profile;
