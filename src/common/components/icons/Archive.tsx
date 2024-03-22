import * as React from 'react';
import { Icon } from './type';

const Archive: Icon = ({ size = '19', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16.7662 20.8543H5.23453C2.11786 20.8543 1.95286 19.1402 1.81536 17.756L1.44869 13.1635C1.36619 12.2743 1.62286 11.3852 2.19119 10.6702C2.86953 9.84516 3.83203 9.396 4.86786 9.396H17.1329C18.1504 9.396 19.1129 9.84516 19.7637 10.6243L19.9195 10.8352C20.4145 11.5135 20.6345 12.3385 20.552 13.1727L20.1854 17.7468C20.0479 19.1402 19.8829 20.8543 16.7662 20.8543ZM4.86786 10.771C4.25369 10.771 3.66703 11.046 3.28203 11.5227L3.21786 11.5868C2.92453 11.9627 2.76869 12.4943 2.82369 13.0443L3.19036 17.6368C3.31869 18.9752 3.37369 19.4793 5.23453 19.4793H16.7662C18.6362 19.4793 18.682 18.9752 18.8104 17.6277L19.177 13.0352C19.232 12.4943 19.0762 11.9535 18.7187 11.5318L18.627 11.4218C18.2145 10.991 17.692 10.771 17.1237 10.771H4.86786Z"
      fill="currentColor"
    />
    <path
      d="M18.7923 11.2017C18.4165 11.2017 18.1048 10.89 18.1048 10.5142V8.87334C18.1048 6.14167 17.6281 5.66501 14.8965 5.66501H12.559C11.5231 5.66501 11.1657 5.29834 10.7715 4.77584L9.58898 3.20834C9.18565 2.67667 9.09398 2.54834 8.26898 2.54834H7.10482C4.37315 2.54834 3.89648 3.02501 3.89648 5.75667V10.4775C3.89648 10.8533 3.58482 11.165 3.20898 11.165C2.83315 11.165 2.52148 10.8533 2.52148 10.4775V5.75667C2.52148 2.24584 3.59398 1.17334 7.10482 1.17334H8.27815C9.68982 1.17334 10.1298 1.63167 10.6982 2.38334L11.8715 3.94167C12.119 4.27167 12.1373 4.29001 12.5681 4.29001H14.9057C18.4165 4.29001 19.489 5.36251 19.489 8.87334V10.5142C19.4798 10.89 19.1681 11.2017 18.7923 11.2017Z"
      fill="currentColor"
    />
    <path
      d="M13.3562 16.271H8.64453C8.2687 16.271 7.95703 15.9593 7.95703 15.5835C7.95703 15.2077 8.2687 14.896 8.64453 14.896H13.3562C13.732 14.896 14.0437 15.2077 14.0437 15.5835C14.0437 15.9593 13.7412 16.271 13.3562 16.271Z"
      fill="currentColor"
    />
  </svg>
);

export default Archive;
