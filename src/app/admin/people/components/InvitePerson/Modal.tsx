import React from 'react';
import InviteForm from './Form';
import CustomModal from '@/common/components/CustomModal';
import CustomModalTitle from '@/common/components/CustomModalTitle';

type Props = {
  isModalOpen: boolean;
  isLoading?: boolean;
  handleCancel: VoidFunction; //eslint-disable-line
  handleSubmit: (val: any) => void; //eslint-disable-line
};

function InvitePersonModal({
  handleCancel,
  handleSubmit,
  isModalOpen,
  isLoading = false,
}: Props) {
  return (
    <CustomModal
      width={600}
      title={<CustomModalTitle title="Invite" hasLink />}
      open={isModalOpen}
      onCancel={handleCancel}
      destroyOnClose
    >
      <InviteForm onFinish={handleSubmit} isLoading={isLoading} />
    </CustomModal>
  );
}

export default InvitePersonModal;
