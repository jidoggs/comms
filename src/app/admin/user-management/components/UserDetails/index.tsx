import React from 'react';
import CustomModal, { CustomModalProps } from '@/common/components/CustomModal';
import { User } from '../../types';
import UserDetailsContent from './UserDetailsContent';

interface Props extends CustomModalProps {
  staffData: User | null;
}

function UserDetails({ staffData, ...props }: Props) {
  return (
    <CustomModal {...props} width="100%" className="rounded-none">
      <div className="h-screen w-screen rounded-none">
        <UserDetailsContent userData={staffData} />
      </div>
    </CustomModal>
  );
}

export default UserDetails;
