import React from 'react';
import CustomModal, { CustomModalProps } from '@/common/components/CustomModal';
import UserDetailsContent from './UserDetailsContent';
import { User } from '@/types';
import BackwardArrow from '@/common/components/icons/BackwardArrow';

interface Props extends CustomModalProps {
  staffData: User | null;
  closeHandler: () => void;
}

function UserDetails({ staffData, closeHandler, ...props }: Props) {
  return (
    <CustomModal
      {...props}
      width="100%"
      onCancel={closeHandler}
      className="rounded-none"
      destroyOnClose
      style={{ top: 0, bottom: 0, padding: 0 }}
      classNames={{
        header: '!m-0 !p-0 absolute',
        content: '[&_.ant-modal-close]:!hidden',
      }}
      title={
        <button
          onClick={closeHandler}
          className="flex items-center gap-x-1 rounded-10 border-2 border-custom-gray_400 bg-custom-gray_900 px-3 py-2"
        >
          <BackwardArrow size={18} />
          <span className="text-sm leading-[16.94px]">Back</span>
        </button>
      }
    >
      <UserDetailsContent
        userData={staffData}
        key={staffData?._id}
        closeHandler={closeHandler}
      />
    </CustomModal>
  );
}

export default UserDetails;
