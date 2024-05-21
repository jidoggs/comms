import * as React from 'react';
import { Icon } from './type';

const Undo: Icon = ({ size = '18', ...props }) => (
  <svg
    {...props}
    width={size}
    height={size}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.3474 13.795H5.34741C5.33435 13.795 5.31869 13.7898 5.3044 13.7755C5.29011 13.7612 5.28491 13.7455 5.28491 13.7325C5.28491 13.7194 5.29011 13.7038 5.3044 13.6895C5.31869 13.6752 5.33435 13.67 5.34741 13.67H11.3474C13.3786 13.67 15.0349 12.0136 15.0349 9.98248C15.0349 7.95134 13.3786 6.29498 11.3474 6.29498H3.09741C3.08435 6.29498 3.06869 6.28978 3.0544 6.27549C3.04011 6.2612 3.03491 6.24555 3.03491 6.23248C3.03491 6.21942 3.04011 6.20376 3.0544 6.18947C3.06869 6.17518 3.08435 6.16998 3.09741 6.16998H11.3474C13.4488 6.16998 15.1599 7.88113 15.1599 9.98248C15.1599 12.0838 13.4488 13.795 11.3474 13.795Z"
      fill="currentColor"
      stroke="currentColor"
    />
    <path
      d="M3.34387 5.83392L2.99031 6.18747L3.34387 6.54103L4.86637 8.06353C4.87581 8.07297 4.88305 8.08766 4.88305 8.10747C4.88305 8.12728 4.87581 8.14198 4.86637 8.15142L4.86027 8.15751L4.85545 8.16269C4.85471 8.16314 4.85319 8.16397 4.85064 8.16498C4.84364 8.16777 4.83342 8.16997 4.82242 8.16997C4.81266 8.16997 4.80505 8.16821 4.79923 8.16587C4.79387 8.16371 4.78691 8.15985 4.77848 8.15142L2.85848 6.23142C2.84903 6.22198 2.8418 6.20728 2.8418 6.18747C2.8418 6.16766 2.84903 6.15297 2.85848 6.14353L4.77848 4.22353C4.78792 4.21408 4.80261 4.20685 4.82242 4.20685C4.84223 4.20685 4.85693 4.21408 4.86637 4.22353C4.87581 4.23297 4.88305 4.24766 4.88305 4.26747C4.88305 4.28728 4.87581 4.30198 4.86637 4.31142L3.34387 5.83392Z"
      fill="currentColor"
      stroke="currentColor"
    />
  </svg>
);

export default Undo;
