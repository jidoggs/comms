import CustomButton from '@/common/components/CustomButton';
import { ArrowDown, CloseCircle } from '@/common/components/icons';
import Title from '@/common/components/Title';
import { Dropdown, Menu, Skeleton } from 'antd';
import React, { useContext } from 'react';
import { UserMgmtDataContext } from '../service-context/UserMgmtContextWrapper';

interface PermissionSectionProps {
  title: string;
  permissions: string[];
  handleCancelPermission: (permission: string) => void;
  handleAddPermission: (key: string) => void;
  options: { _id: string; name: string }[];
  role?: any;
  editRole?: any;
  currentRole?: any;
}

const RoleTitle = ({ children }: any) => (
  <Title className="text-custom-gray_700">{children}</Title>
);

const PermissionSection = ({
  title,
  permissions,
  handleCancelPermission,
  handleAddPermission,
  options,
  role,
}: PermissionSectionProps) => {
  const contextInfo = useContext(UserMgmtDataContext);
  if (!contextInfo) {
    // Handle the case where contextInfo is null
    return <Skeleton active />;
  }

  return (
    <div className="flex flex-col justify-between">
      <RoleTitle>{title}</RoleTitle>
      <div className="flex flex-row flex-wrap gap-2 py-2">
        {permissions?.map((permission) => (
          <div
            key={permission}
            className="flex h-6 items-center rounded-md border border-custom-gray_400 p-1"
          >
            <Title>{permission}</Title>
            <button onClick={() => handleCancelPermission(permission)}>
              {(contextInfo.editRole && contextInfo.currentRole === role._id) ||
              role.name === '' ? (
                <CloseCircle size="18" />
              ) : (
                ''
              )}
            </button>
          </div>
        ))}
        {(contextInfo.editRole && contextInfo.currentRole === role._id) ||
        role.name === '' ? (
          <Dropdown
            overlay={
              <Menu onClick={({ key }) => handleAddPermission(key.toString())}>
                {options.map((option) => (
                  <Menu.Item key={option._id}>
                    {option.name.replace(/_/g, ' ')}
                  </Menu.Item>
                ))}
              </Menu>
            }
          >
            <CustomButton
              type="primary"
              size="middle"
              className="flex !h-6 flex-row gap-1 !rounded-md !border !border-custom-gray_400 bg-custom-white_100"
            >
              <Title>Add</Title> <ArrowDown />
            </CustomButton>
          </Dropdown>
        ) : null}
      </div>
    </div>
  );
};

export default PermissionSection;
