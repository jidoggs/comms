import React from 'react';
import Divider from 'antd/es/divider';
import CustomModal from '@/common/components/CustomModal';
import CustomButton from '@/common/components/CustomButton';
import InfoCircle from '@/common/components/icons/InfoCircle';

type Props = {
  warningText?: string;
  isModalOpen: boolean;
  handleCancel: () => void;
  handleSubmit: () => void;
  deleteRoleIsMutating: boolean;
};

function DeleteModal({
  handleCancel,
  handleSubmit,
  isModalOpen,
  warningText,
  deleteRoleIsMutating,
}: Props) {
  return (
    <CustomModal
      width={375}
      open={isModalOpen}
      onCancel={handleCancel}
      destroyOnClose
      className="!bg-none"
      centered
    >
      <div className="flex flex-col items-center gap-2 text-base text-custom-gray_200">
        <InfoCircle size={90} />

        <p className="text-center">
          {warningText || 'Are you sure you want to delete this role?'}
        </p>
        <Divider className="!border-custom-gray_500" />
        <div className="-mt-3 flex w-full justify-between">
          <div className="!w-1/2">
            <CustomButton
              type="text"
              className="w-full"
              onClick={handleCancel}
              disabled={deleteRoleIsMutating}
            >
              Cancel
            </CustomButton>
          </div>
          <div className="!w-1/2">
            <CustomButton
              type="text"
              className="w-full"
              onClick={handleSubmit}
              loading={deleteRoleIsMutating}
            >
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
