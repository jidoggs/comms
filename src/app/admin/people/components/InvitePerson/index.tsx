import React, { useState } from 'react';
import InvitePersonModal from './Modal';
import CustomButton from '@/common/components/CustomButton';
import { useParastatals } from '@/app/admin/hooks';
import { useSession } from '@/common/hooks';
import { queryHandler } from '@/service/request';
import Add from '@/common/components/icons/Add';

function InvitePerson() {
  const [isOpen, setIsOpen] = useState(false);
  const parastatal = useSession().data?.parastatal._id;
  const { inviteUserSwr } = useParastatals({ can_invite: true });

  const inviteQuery = queryHandler({ parastatal });

  const openModalHandler = () => {
    setIsOpen(true);
  };

  const closeModalHandler = () => {
    setIsOpen(false);
  };

  const onFinishHandler = (values: any) => {
    const data = { parastatal, ...values };
    inviteUserSwr.trigger({ data }).finally(closeModalHandler);
  };

  return (
    <>
      <CustomButton
        type="primary"
        size="small"
        icon={<Add />}
        description="Add"
        onClick={openModalHandler}
      >
        Add
      </CustomButton>
      <InvitePersonModal
        handleCancel={closeModalHandler}
        handleSubmit={onFinishHandler}
        isModalOpen={isOpen}
        isLoading={inviteUserSwr.isMutating}
        inviteLink={inviteQuery}
      />
    </>
  );
}

export default InvitePerson;
