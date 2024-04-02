import * as React from "react";
import { Icon } from "./type";

const DatePicker: Icon = ({ size = "30", ...props }) => (
  <svg
    {...props}
    width={size}
    height={size}
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M7.33301 4.771C7.23332 4.771 7.14551 4.68319 7.14551 4.5835V1.8335C7.14551 1.7338 7.23332 1.646 7.33301 1.646C7.4327 1.646 7.52051 1.73381 7.52051 1.8335V4.5835C7.52051 4.68319 7.4327 4.771 7.33301 4.771Z"
      fill="current"
      stroke="#121212" />
    <path d="M14.667 5.271C14.2912 5.271 13.9795 4.95933 13.9795 4.5835V1.8335C13.9795 1.45766 14.2912 1.146 14.667 1.146C15.0428 1.146 15.3545 1.45766 15.3545 1.8335V4.5835C15.3545 4.95933 15.0428 5.271 14.667 5.271Z"
      fill="currentColor" />
    <path d="M7.79167 13.2916C7.6725 13.2916 7.55333 13.2733 7.44333 13.2183C7.33333 13.1725 7.23249 13.1083 7.14083 13.0258C6.97583 12.8516 6.875 12.6133 6.875 12.375C6.875 12.2558 6.9025 12.1366 6.94833 12.0266C6.99417 11.9166 7.05833 11.8158 7.14083 11.7241C7.23249 11.6416 7.33333 11.5774 7.44333 11.5316C7.77333 11.3941 8.18584 11.4675 8.44251 11.7241C8.52501 11.8158 8.58916 11.9166 8.635 12.0266C8.68083 12.1366 8.70833 12.2558 8.70833 12.375C8.70833 12.6133 8.60751 12.8516 8.44251 13.0258C8.26834 13.1908 8.03 13.2916 7.79167 13.2916Z" fill="currentColor" />
    <path d="M10.9997 13.2918C10.7613 13.2918 10.523 13.191 10.3488 13.026C10.2663 12.9343 10.2022 12.8335 10.1563 12.7235C10.1105 12.6135 10.083 12.4943 10.083 12.3751C10.083 12.1368 10.1838 11.8985 10.3488 11.7243C10.6055 11.4676 11.0088 11.3851 11.348 11.5318C11.458 11.5776 11.5588 11.6418 11.6505 11.7243C11.8155 11.8985 11.9163 12.1368 11.9163 12.3751C11.9163 12.4943 11.898 12.6135 11.843 12.7235C11.7972 12.8335 11.733 12.9343 11.6505 13.026C11.5588 13.1085 11.458 13.1726 11.348 13.2185C11.238 13.2735 11.1188 13.2918 10.9997 13.2918Z" fill="currentColor" />
    <path d="M7.79167 16.4998C7.6725 16.4998 7.55333 16.4723 7.44333 16.4265C7.33333 16.3806 7.23249 16.3165 7.14083 16.234C6.97583 16.0598 6.875 15.8306 6.875 15.5831C6.875 15.464 6.9025 15.3448 6.94833 15.2348C6.99417 15.1156 7.05833 15.024 7.14083 14.9323C7.23249 14.8498 7.33333 14.7856 7.44333 14.7398C7.77333 14.5931 8.18584 14.6756 8.44251 14.9323C8.52501 15.024 8.58916 15.1156 8.635 15.2348C8.68083 15.3448 8.70833 15.464 8.70833 15.5831C8.70833 15.8306 8.60751 16.0598 8.44251 16.234C8.26834 16.399 8.03 16.4998 7.79167 16.4998Z" fill="currentColor" />
    <path d="M18.7913 9.02002H3.20801C2.83217 9.02002 2.52051 8.70835 2.52051 8.33252C2.52051 7.95669 2.83217 7.64502 3.20801 7.64502H18.7913C19.1672 7.64502 19.4788 7.95669 19.4788 8.33252C19.4788 8.70835 19.1672 9.02002 18.7913 9.02002Z" fill="currentColor" />
    <path d="M16.4997 21.7708C14.098 21.7708 12.1455 19.8183 12.1455 17.4167C12.1455 15.015 14.098 13.0625 16.4997 13.0625C18.9013 13.0625 20.8538 15.015 20.8538 17.4167C20.8538 19.8183 18.9013 21.7708 16.4997 21.7708ZM16.4997 14.4375C14.8588 14.4375 13.5205 15.7758 13.5205 17.4167C13.5205 19.0575 14.8588 20.3958 16.4997 20.3958C18.1405 20.3958 19.4788 19.0575 19.4788 17.4167C19.4788 15.7758 18.1405 14.4375 16.4997 14.4375Z" fill="currentColor" />
    <path d="M17.8658 18.1499H15.125C14.7492 18.1499 14.4375 17.8382 14.4375 17.4624C14.4375 17.0866 14.7492 16.7749 15.125 16.7749H17.8658C18.2417 16.7749 18.5533 17.0866 18.5533 17.4624C18.5533 17.8382 18.2508 18.1499 17.8658 18.1499Z" fill="currentColor" />
    <path d="M16.5 19.5523C16.1242 19.5523 15.8125 19.2407 15.8125 18.8648V16.124C15.8125 15.7482 16.1242 15.4365 16.5 15.4365C16.8758 15.4365 17.1875 15.7482 17.1875 16.124V18.8648C17.1875 19.2407 16.8758 19.5523 16.5 19.5523Z" fill="currentColor" />
    <path d="M14.0892 20.8543H7.33333C3.9875 20.8543 2.0625 18.9293 2.0625 15.5835V7.79183C2.0625 4.446 3.9875 2.521 7.33333 2.521H14.6667C18.0125 2.521 19.9375 4.446 19.9375 7.79183V14.9968C19.9375 15.281 19.7633 15.5377 19.4883 15.6385C19.2225 15.7393 18.92 15.666 18.7275 15.446C18.1592 14.8043 17.3433 14.4377 16.4908 14.4377C14.85 14.4377 13.5117 15.776 13.5117 17.4168C13.5117 17.9577 13.6583 18.4893 13.9425 18.9477C14.0983 19.2227 14.3 19.4518 14.52 19.6443C14.74 19.8277 14.8225 20.1302 14.7217 20.4052C14.6392 20.671 14.3825 20.8543 14.0892 20.8543ZM7.33333 3.896C4.71167 3.896 3.4375 5.17016 3.4375 7.79183V15.5835C3.4375 18.2052 4.71167 19.4793 7.33333 19.4793H12.6683C12.3292 18.856 12.1458 18.1502 12.1458 17.4168C12.1458 15.0152 14.0983 13.0627 16.5 13.0627C17.2242 13.0627 17.9392 13.246 18.5625 13.5852V7.79183C18.5625 5.17016 17.2883 3.896 14.6667 3.896H7.33333Z" fill="currentColor" />
  </svg>

);

export default DatePicker;
