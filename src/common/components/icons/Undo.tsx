
import * as React from "react";
import { Icon } from "./type";

const Undo: Icon = ({ size = "18", ...props }) => (
    <svg
        {...props}
        width={size}
        height={size}
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M19.3474 21.7949H13.3474C13.3343 21.7949 13.3187 21.7897 13.3044 21.7754C13.2901 21.7611 13.2849 21.7455 13.2849 21.7324C13.2849 21.7194 13.2901 21.7037 13.3044 21.6894C13.3187 21.6751 13.3343 21.6699 13.3474 21.6699H19.3474C21.3786 21.6699 23.0349 20.0136 23.0349 17.9824C23.0349 15.9513 21.3786 14.2949 19.3474 14.2949H11.0974C11.0843 14.2949 11.0687 14.2897 11.0544 14.2754C11.0401 14.2611 11.0349 14.2455 11.0349 14.2324C11.0349 14.2194 11.0401 14.2037 11.0544 14.1894C11.0687 14.1751 11.0843 14.1699 11.0974 14.1699H19.3474C21.4488 14.1699 23.1599 15.8811 23.1599 17.9824C23.1599 20.0838 21.4488 21.7949 19.3474 21.7949Z"
            fill="currentColor"
            stroke="currentColor" />
        <path d="M11.3439 13.8341L10.9903 14.1877L11.3439 14.5412L12.8664 16.0637C12.8758 16.0732 12.883 16.0878 12.883 16.1077C12.883 16.1275 12.8758 16.1422 12.8664 16.1516L12.8603 16.1577L12.8554 16.1629C12.8547 16.1633 12.8532 16.1642 12.8506 16.1652C12.8436 16.1679 12.8334 16.1702 12.8224 16.1702C12.8127 16.1702 12.8051 16.1684 12.7992 16.1661C12.7939 16.1639 12.7869 16.16 12.7785 16.1516L10.8585 14.2316C10.849 14.2222 10.8418 14.2075 10.8418 14.1877C10.8418 14.1678 10.849 14.1532 10.8585 14.1437L12.7785 12.2237C12.7879 12.2143 12.8026 12.207 12.8224 12.207C12.8422 12.207 12.8569 12.2143 12.8664 12.2237C12.8758 12.2332 12.883 12.2478 12.883 12.2677C12.883 12.2875 12.8758 12.3022 12.8664 12.3116L11.3439 13.8341Z"
             fill="currentColor"
             stroke="currentColor" />
    </svg>
);

export default Undo;