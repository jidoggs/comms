import React from 'react';
import CustomModal, { CustomModalProps } from '@/common/components/CustomModal';
import { User } from '../../types';
import UserDetailsContent from './UserDetailsContent';

interface Props extends CustomModalProps {
  staffData: User | null;
}

function UserDetails({ staffData, ...props }: Props) {
  return (
    <CustomModal
      {...props}
      width="100%"
      className="rounded-none"
      destroyOnClose
      style={{ top: 0, bottom: 0, padding: 0 }}
    >
      <UserDetailsContent userData={staffData} />
    </CustomModal>
  );
}

export default UserDetails;
