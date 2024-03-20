import * as React from "react";
import { Icon } from "./type";

const Dot: Icon = ({ size = "30", ...props }) => (
  <svg width={size} height={size} {...props} viewBox="0 0 40 34" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="19" width="2" height="8" fill="url(#paint0_linear_11894_72602)"/>
  <circle cx="20" cy="17" r="7.5" fill="white" stroke="#11142D" stroke-width="5"/>
  <rect x="19" y="26" width="2" height="8" fill="#585A69"/>
  <defs>
  <linearGradient id="paint0_linear_11894_72602" x1="20" y1="0" x2="20" y2="8" gradientUnits="userSpaceOnUse">
  <stop stop-color="#F2F2F2"/>
  <stop offset="1" stop-color="#585A69"/>
  </linearGradient>
  </defs>
  </svg>
  
);

export default Dot;
