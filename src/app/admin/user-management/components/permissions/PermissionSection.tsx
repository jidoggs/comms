import CustomButton from '@/common/components/CustomButton';
import { ArrowDown, CloseCircle } from '@/common/components/icons';
import Title from '@/common/components/Title';
import { Dropdown, MenuProps } from 'antd';
import React from 'react';
import { uniqueId } from '../../types';
import { PermissionType, RoleType } from '@/app/admin/types';

interface PermissionSectionProps {
  editedRole: RoleType;
  title: string;
  permissions: string[];
  options: { _id: string; name: string; code: string }[];
  isEditMode: boolean;
  handleAddPermission: (permission: PermissionType) => void;
  handleCancelPermission: (permission: any) => void;
}

const RoleTitle = ({ children }: any) => (
  <Title className="text-custom-gray_700">{children}</Title>
);

const PermissionSection = ({
  editedRole,
  title,
  permissions,
  options,
  isEditMode,
  handleAddPermission,
  handleCancelPermission,
}: PermissionSectionProps) => {
  const availableOptions = options.filter(
    (option) => !permissions.includes(option.name)
  );

  const items: MenuProps['items'] = [
    ...availableOptions.map((option: any) => {
      return {
        key: option._id,
        label: option.name.replace(/_/g, ' '),
        onClick: () => {
          handleAddPermission(option);
        },
      };
    }),
  ];

  return (
    <div className="flex flex-col justify-between">
      <RoleTitle>{title}</RoleTitle>
      <div className="flex flex-row flex-wrap gap-2 py-2">
        {permissions?.map((permission) => (
          <div
            key={permission}
            className="flex h-6 items-center rounded-md border border-custom-gray_400 p-1"
          >
            <Title>{permission.replace(/_/g, ' ')}</Title>
            <button onClick={() => handleCancelPermission(permission)}>
              {isEditMode || editedRole._id === uniqueId ? (
                <CloseCircle size="18" />
              ) : (
                ''
              )}
            </button>
          </div>
        ))}
        {isEditMode || editedRole._id === uniqueId ? (
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