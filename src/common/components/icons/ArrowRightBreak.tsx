import * as React from 'react';
import { Icon } from './type';

const ArrowRightBreak: Icon = ({ size = '18', ...props }) => (
  <svg
    {...props}
    width={size}
    height={size}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.99802 10.0902L6.998 10.0902L6.99457 10.0936L2.11265 14.9755C2.08445 15.0001 2.06286 15.0021 2.06062 15.0021C2.05086 15.0021 2.04325 15.0004 2.03743 14.998C2.03207 14.9959 2.02511 14.992 2.01668 14.9836L1.66313 15.3371L2.01668 14.9836C2.00724 14.9742 2 14.9595 2 14.9396C2 14.9198 2.00724 14.9051 2.01668 14.8957L6.90668 10.0057C7.46194 9.45044 7.46194 8.54886 6.90668 7.9936L2.01668 3.1036C2.00723 3.09415 2 3.07946 2 3.05965C2 3.03984 2.00723 3.02515 2.01668 3.0157C2.02612 3.00626 2.04082 2.99902 2.06062 2.99902C2.08043 2.99902 2.09513 3.00626 2.10457 3.0157L6.99457 7.9057C7.2841 8.19523 7.44812 8.58587 7.44812 8.99965C7.44812 9.41764 7.28878 9.80501 6.99802 10.0902Z"
      stroke={'currentColor'}
    />
    <path
      d="M12.248 10.0902L12.248 10.0902L12.2446 10.0936L7.36265 14.9755C7.33445 15.0001 7.31286 15.0021 7.31062 15.0021C7.30086 15.0021 7.29325 15.0004 7.28743 14.998C7.28207 14.9959 7.27511 14.992 7.26668 14.9836L6.91313 15.3371L7.26668 14.9836C7.25724 14.9742 7.25 14.9595 7.25 14.9396C7.25 14.9198 7.25724 14.9051 7.26668 14.8957L12.1567 10.0057C12.7119 9.45044 12.7119 8.54886 12.1567 7.9936L7.26668 3.1036C7.25723 3.09415 7.25 3.07946 7.25 3.05965C7.25 3.03984 7.25723 3.02515 7.26668 3.0157C7.27612 3.00626 7.29082 2.99902 7.31062 2.99902C7.33043 2.99902 7.34513 3.00626 7.35457 3.0157L12.2446 7.9057C12.5341 8.19523 12.6981 8.58587 12.6981 8.99965C12.6981 9.41764 12.5388 9.80501 12.248 10.0902Z"
      fill={'currentColor'}
      stroke={'currentColor'}
    />
    <path
      d="M15.8081 14.9477C15.5006 14.9477 15.2456 14.6927 15.2456 14.3852V3.61523C15.2456 3.30773 15.5006 3.05273 15.8081 3.05273C16.1156 3.05273 16.3706 3.30773 16.3706 3.61523V14.3852C16.3706 14.6927 16.1231 14.9477 15.8081 14.9477Z"
      fill={'currentColor'}
    />
  </svg>
);

export default ArrowRightBreak;