/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React from 'react';
import CustomModal from '@/common/components/CustomModal';
import CustomModalTitle from '@/common/components/CustomModalTitle';

type Props = {
  isModalOpen: boolean;
  handleCancel: VoidFunction; //eslint-disable-line
  handleSubmit: (val: any) => void; //eslint-disable-line
};

function DeleteModal({ handleCancel, handleSubmit, isModalOpen }: Props) {
  return (
    <CustomModal
      width={500}
      // title={<CustomModalTitle title="Add" hasLink />}
      open={isModalOpen}
      onCancel={handleCancel}
      destroyOnClose
    >
      Delete
      {/* <AddForm onFinish={handleSubmit} /> */}
    </CustomModal>
  );
}

export default DeleteModal;
