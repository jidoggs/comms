/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React from 'react';
import CustomModal from '@/common/components/CustomModal';
import CustomModalTitle from '@/common/components/CustomModalTitle';
import { InfoCircle } from '@/common/components/icons';
import { Divider } from 'antd';
import CustomButton from '@/common/components/CustomButton';

type Props = {
  isModalOpen: boolean;
  handleCancel: VoidFunction; //eslint-disable-line
  handleSubmit: () => void; //eslint-disable-line
};

function DeleteModal({ handleCancel, handleSubmit, isModalOpen }: Props) {
  return (
    <CustomModal
      width={375}
      // title={<CustomModalTitle title="Add" hasLink />}
      open={isModalOpen}
      onCancel={handleCancel}
      destroyOnClose
      className="!bg-none"
      centered
    >
      <div className="flex flex-col items-center gap-2 text-base text-custom-gray_200">
        <InfoCircle size={90} />

        <p className="text-center">
          Are you sure you want to delete this role?
        </p>
        <Divider className="!border-custom-gray_500" />
        <div className="-mt-3 flex w-full justify-between">
          <div className="!w-1/2">
            <CustomButton type="text" className="w-full" onClick={handleCancel}>
              Cancel
            </CustomButton>
          </div>
          <div className="!w-1/2">
            <CustomButton type="text" className="w-full" onClick={handleSubmit}>
              Yes, Delete
            </CustomButton>
          </div>
        </div>
      </div>
      {/* <AddForm onFinish={handleSubmit} /> */}
    </CustomModal>
  );
}

export default DeleteModal;
