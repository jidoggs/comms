import React from 'react';
import RegistrationContent from './RegistrationContent';
import CustomModal, { CustomModalProps } from '@/common/components/CustomModal';
import { User } from '@/app/auth/types/auth';

interface Props extends CustomModalProps {
  staffData: User | null;
}

function RegistrationDetail({ staffData, ...props }: Props) {
  return (
    <CustomModal {...props} width="80%">
      <RegistrationContent registrationData={staffData} />
    </CustomModal>
  );
}

export default RegistrationDetail;
