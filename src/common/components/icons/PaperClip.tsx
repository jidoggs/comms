import * as React from "react";
import { Icon } from "./type";

const PaperClip: Icon = ({ size = "30", ...props }) => (
  <svg
    {...props}
    width={size}
    height={size}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M8.22754 16.5625C5.71368 16.5625 3.66504 14.5139 3.66504 12V7.5C3.66504 4.57364 6.05118 2.1875 8.97754 2.1875C11.9039 2.1875 14.29 4.57364 14.29 7.5V11.625C14.29 13.1039 13.0814 14.3125 11.6025 14.3125C10.1237 14.3125 8.91504 13.1039 8.91504 11.625V9C8.91504 8.98694 8.92024 8.97128 8.93453 8.95699C8.94882 8.9427 8.96448 8.9375 8.97754 8.9375C8.9906 8.9375 9.00626 8.9427 9.02055 8.95699C9.03484 8.97128 9.04004 8.98694 9.04004 9V11.625C9.04004 13.0411 10.1864 14.1875 11.6025 14.1875C13.0187 14.1875 14.165 13.0411 14.165 11.625V7.5C14.165 4.63636 11.8412 2.3125 8.97754 2.3125C6.1139 2.3125 3.79004 4.63636 3.79004 7.5V12C3.79004 14.443 5.77578 16.4375 8.22754 16.4375C8.2406 16.4375 8.25626 16.4427 8.27055 16.457C8.28484 16.4713 8.29004 16.4869 8.29004 16.5C8.29004 16.5357 8.26206 16.5625 8.22754 16.5625Z"
      fill="currentColor"
      stroke="currentColor" />
  </svg>

);

export default PaperClip;
