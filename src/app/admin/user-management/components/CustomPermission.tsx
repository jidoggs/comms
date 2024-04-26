import { CloseCircle } from '@/common/components/icons';
import React from 'react';

interface Props {
  permission: any;
  handleCancelPermission: (
    permission: string,
    type: 'parastatals' | 'offices' | 'departments'
  ) => void;
}

const CustomPermission = ({ permission, handleCancelPermission }: Props) => {
  return (
    <div className="flex items-center rounded-md border border-custom-gray_400 p-1">
      <span>{permission}</span>
      <button onClick={() => handleCancelPermission(permission, 'parastatals')}>
        <CloseCircle size="18" />
      </button>
    </div>
  );
};

export default CustomPermission;
