import React from 'react';
import AddForm from '../forms/Add/Form';
import CustomModal from '@/common/components/CustomModal';
import CustomModalTitle from '@/common/components/CustomModalTitle';

type Props = {
  isModalOpen: boolean;
  isLoading?: boolean;
  handleCancel: VoidFunction; //eslint-disable-line
  handleSubmit: (val: any) => void; //eslint-disable-line
};

function AddModal({
  handleCancel,
  handleSubmit,
  isModalOpen,
  isLoading,
}: Props) {
  return (
    <CustomModal
      width={500}
      title={<CustomModalTitle title="Add" />}
      open={isModalOpen}
      onCancel={handleCancel}
      destroyOnClose
    >
      <AddForm onFinish={handleSubmit} isLoading={isLoading} />
    </CustomModal>
  );
}

export default AddModal;
