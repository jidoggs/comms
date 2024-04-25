'use client';
import React, { useContext } from 'react';
// import CustomTable, { CustomTableProps } from '@/common/components/CustomTable';
import CustomTab from '@/common/components/CustomTab';
// import TableActions from './TableActions';
import { UserMgmtDataContext } from '../service-context/UserMgmtContextWrapper';
import Title from '@/common/components/Title';
import Roles_Permissions from './Roles_Permissions';
import Users from './Users';
// import RegistrationDetail from './RegistrationDetail';
// import { User } from '@/app/auth/types/auth';

const CorrespondencePage = () => {
  const contextInfo = useContext(UserMgmtDataContext);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [staffData, setStaffData] = useState<User | null>(null);

  // const rowClickHandler: CustomTableProps<any>['onRow'] = (record) => ({
  //   onClick: () => {
  //     setStaffData(record);
  //     setIsModalOpen(true);
  //   },
  //   style: { cursor: 'pointer' },
  // });

  // const handleCancel = () => {
  // setIsModalOpen(false);
  // setStaffData(null);
  // };

  // console.log('contextInfo?.tabItem', contextInfo?.tabItem);

  return (
    <div className="pt-4">
      <Title tag="h3" className="px-5">
        User Management
      </Title>
      <div className="flex flex-col px-5 py-3">
        <CustomTab
          onChange={contextInfo?.handleTabChange}
          defaultKey={contextInfo?.tabItem}
          items={contextInfo?.tabItemList}
        />
        {/* <div className="w-full py-2"> */}
        {contextInfo?.tabItem === 'roles-permissions' && <Roles_Permissions />}
        {contextInfo?.tabItem === 'users' && <Users />}
        {/* </div> */}
      </div>
    </div>
  );
};

export default CorrespondencePage;
