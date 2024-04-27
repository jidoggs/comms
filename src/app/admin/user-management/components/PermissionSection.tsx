import CustomButton from '@/common/components/CustomButton';
import { ArrowDown, CloseCircle } from '@/common/components/icons';
import Title from '@/common/components/Title';
import { Dropdown, MenuProps, Skeleton } from 'antd';
import React, { useContext } from 'react';
import { UserMgmtDataContext } from '../service-context/UserMgmtContextWrapper';

interface PermissionSectionProps {
  currentRole: any;
  allRoles: any;
  setAllRoles: React.Dispatch<any>;
  allPermissions: any;
  title: string;
  permissions: string[];
  options: { _id: string; name: string }[];
  selectedRole?: any;
  editRole?: any;
}

const RoleTitle = ({ children }: any) => (
  <Title className="text-custom-gray_700">{children}</Title>
);

const PermissionSection = ({
  currentRole,
  allRoles,
  setAllRoles,
  allPermissions,
  title,
  permissions,
  options,
  selectedRole,
}: PermissionSectionProps) => {
  const contextInfo = useContext(UserMgmtDataContext); // Create a state to hold the updated role object

  if (!contextInfo) {
    // Handle the case where contextInfo is null
    return <Skeleton active />;
  }
  const items: MenuProps['items'] = [
    ...options.map((option) => {
      return {
        key: option._id,
        label: option.name.replace(/_/g, ' '),
        onClick: () => {
          // console.log('optioning', option);
          handleAddPermission(option);
        },
      };
    }),
  ];

  const handleCancelPermission = (permission: any) => {
    const normalPermission = permission.replace(/ /g, '_');
    const tempData = allRoles;
    const findSelectedRole = tempData.find(
      (role: any) => role._id === selectedRole._id
    );
    const tempRole = {
      ...findSelectedRole,
      permissions: findSelectedRole.permissions.filter(
        (p: any) => p.name !== normalPermission
      ),
    };
    setAllRoles((prevRoles: any) =>
      prevRoles.map((role: any) =>
        role._id === tempRole._id ? tempRole : role
      )
    );
  };

  const handleAddPermission = (permission: any) => {
    const findSelectedRole = allRoles.find(
      (role: any) => role._id === selectedRole._id
    );
    const particularPermission = allPermissions.find(
      (p: any) => p._id === permission._id
    );

    const tempRole = {
      ...findSelectedRole,
      permissions: [
        ...findSelectedRole.permissions,
        particularPermission,
      ].filter(
        (p: any, index, self) =>
          self.findIndex((t: any) => t._id === p._id) === index
      ),
    };

    const updatedRolePermissions = allRoles.map((role: any) =>
      role._id === selectedRole._id ? tempRole : role
    );

    setAllRoles(updatedRolePermissions);
  };

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
              {(contextInfo.editRole && currentRole === selectedRole._id) ||
              selectedRole.name === '' ? (
                <CloseCircle size="18" />
              ) : (
                ''
              )}
            </button>
          </div>
        ))}
        {(contextInfo.editRole && currentRole === selectedRole._id) ||
        selectedRole.name === '' ? (
          <Dropdown menu={{ items }}>
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
