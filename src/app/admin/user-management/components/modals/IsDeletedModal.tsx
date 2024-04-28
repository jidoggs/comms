import React from 'react';
import CustomModal from '@/common/components/CustomModal';
import { Thrash } from '@/common/components/icons';
import { Divider } from 'antd';
import CustomButton from '@/common/components/CustomButton';
import Title from '@/common/components/Title';

type Props = {
  isModalOpen: boolean;
  handleCancel: VoidFunction; //eslint-disable-line
};

function IsDeletedModal({ handleCancel, isModalOpen }: Props) {
  return (
    <CustomModal
      width={500}
      // title={<CustomModalTitle title="Add" hasLink />}
      open={isModalOpen}
      onCancel={handleCancel}
      destroyOnClose
      className="!bg-none"
      centered
    >
      <div className="flex w-full flex-col items-center gap-2 text-base text-custom-gray_200">
        <Thrash size={90} />

        <Title tag="h3" className="!babas text-center">
          Role Deleted
        </Title>
        <Title tag="h5" className="text-center">
          Administrator role has been deleted
        </Title>
        <Divider className="!w-[200px] !border-custom-gray_500" />
        <div className="-mt-3 flex w-full justify-center">
          <CustomButton
            type="default"
            size="small"
            className="w-full"
            onClick={handleCancel}
          >
            Done
          </CustomButton>
          {/* </div> */}
        </div>
      </div>
    </CustomModal>
  );
}

export default IsDeletedModal;
