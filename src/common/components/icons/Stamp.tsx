import * as React from "react";
import { Icon } from "./type";

const Stamp: Icon = ({ size = "30", ...props }) => (
  <svg width={size} height={size}  {...props} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.1775 16.9424L10.0459 16.46C9.90891 16.4974 9.77342 16.5219 9.63166 16.5342L9.63166 16.5342L9.62523 16.5349C9.42248 16.5551 9.20783 16.5624 8.97748 16.5624C8.54726 16.5624 8.10313 16.5271 7.65217 16.4496L7.65149 16.4495C4.56158 15.9228 2.03353 13.3879 1.52079 10.2834L1.52079 10.2834C1.11172 7.80778 1.87907 5.39789 3.63103 3.64592C5.38227 1.89469 7.79204 1.1338 10.2615 1.53576C13.359 2.04879 15.8999 4.56956 16.4269 7.65762C16.5404 8.3465 16.5679 9.01622 16.5119 9.6456L16.51 9.66769V9.67463C16.4972 9.80814 16.4734 9.93637 16.4382 10.0659C16.4323 10.086 16.4163 10.1057 16.3869 10.1155C16.3865 10.1157 16.3803 10.1176 16.3675 10.115C16.355 10.1124 16.3406 10.1063 16.3275 10.0965C15.5335 9.43191 14.5224 9.06237 13.4775 9.06237C11.0257 9.06237 9.03998 11.0568 9.03998 13.4999C9.03998 14.5477 9.41158 15.5616 10.0797 16.3566L10.0797 16.3566L10.0815 16.3587C10.0909 16.3697 10.0936 16.3779 10.0946 16.3832C10.0957 16.3886 10.0964 16.3988 10.0913 16.415C10.086 16.4313 10.0794 16.4396 10.0744 16.4444C10.0693 16.4493 10.0601 16.456 10.0427 16.4609L10.1775 16.9424ZM10.1775 16.9424C10.365 16.8899 10.5075 16.7549 10.5675 16.5674L7.56748 16.9424C8.04748 17.0249 8.51998 17.0624 8.97748 17.0624C9.21748 17.0624 9.44998 17.0549 9.67498 17.0324C9.84748 17.0174 10.0125 16.9874 10.1775 16.9424ZM1.65169 10.2665L1.65175 10.2669C2.15895 13.3182 4.62474 15.8096 7.67922 16.3254L7.68028 16.3256C8.14673 16.4033 8.61106 16.4538 9.07065 16.437L9.87854 16.4077L9.49142 15.6979C9.12608 15.0282 8.92998 14.2704 8.92998 13.4999C8.92998 10.986 10.9786 8.93737 13.4925 8.93737C14.263 8.93737 15.0208 9.13348 15.6906 9.49882L16.4149 9.89392L16.4299 9.06896C16.4381 8.61998 16.3971 8.16138 16.3182 7.68767L16.318 7.6864C15.8022 4.64026 13.3112 2.16587 10.2582 1.66643C9.81808 1.59441 9.39354 1.56237 8.97748 1.56237C7.00777 1.56237 5.14048 2.32726 3.72642 3.74132C2.00576 5.46198 1.25072 7.84469 1.65169 10.2665Z" fill="#11142D" stroke="#11142D"/>
<path d="M16.9125 10.215L16.4324 10.0756C16.321 10.459 16.1249 10.7905 15.839 11.0764L11.054 15.8614C10.7703 16.1451 10.4322 16.3425 10.0538 16.4546C10.045 16.457 10.039 16.4575 10.035 16.4575C10.0205 16.4575 10.0119 16.4545 10.0083 16.4529C10.0056 16.4516 10.0042 16.4505 10.0022 16.448L9.99617 16.4403L9.98983 16.4327C9.3 15.6144 8.91504 14.5733 8.91504 13.5C8.91504 10.9861 10.9637 8.9375 13.4775 8.9375C14.5527 8.9375 15.5925 9.31617 16.4084 10.0107L16.4084 10.0108L16.4141 10.0155C16.4214 10.0215 16.4276 10.0302 16.4312 10.0421C16.4349 10.0544 16.4348 10.067 16.4318 10.0776L16.9125 10.215ZM16.9125 10.215C16.7775 10.68 16.5375 11.085 16.1925 11.43L11.4075 16.215C11.0625 16.56 10.65 16.8 10.1925 16.935L9.60754 16.755C8.84254 15.8475 8.41504 14.6925 8.41504 13.5C8.41504 10.71 10.6875 8.4375 13.4775 8.4375C14.67 8.4375 15.825 8.8575 16.7325 9.63C16.905 9.7725 16.9725 10.005 16.9125 10.215ZM9.81024 15.9954L10.0618 16.3621L10.4554 16.155C10.6486 16.0533 10.8159 15.9237 10.9661 15.7736L15.7511 10.9886C15.9013 10.8384 16.0308 10.6711 16.1325 10.4779L16.3396 10.0843L15.9729 9.8327C15.2441 9.33271 14.3729 9.0625 13.4775 9.0625C11.0258 9.0625 9.04004 11.057 9.04004 13.5C9.04004 14.3953 9.31025 15.2666 9.81024 15.9954Z" fill="#11142D" stroke="#11142D"/>
</svg>
  
);

export default Stamp;
