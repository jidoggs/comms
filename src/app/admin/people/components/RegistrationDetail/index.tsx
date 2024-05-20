import dynamic from 'next/dynamic';
import React, { useContext } from 'react';
import { PeopleDataContext } from '../../service-context/PeopleListContextWrapper';
import CustomModal from '@/common/components/CustomModal';
import useModalState from '@/common/hooks/useModalState';
import BackwardArrow from '@/common/components/icons/BackwardArrow';

const DeclinePerson = dynamic(() => import('../DeclinePerson'));
const SubmittedResponseModal = dynamic(
  () => import('../SubmittedResponseModal')
);
const ApprovePerson = dynamic(() => import('../ApprovePerson'));
const RegistrationContent = dynamic(() => import('./RegistrationContent'));

const initialModalState = {
  approve: false,
  decline: false,
  success: false,
};

function RegistrationDetail() {
  const contextInfo = useContext(PeopleDataContext);
  const { handleCancel, isModalOpen, showModal } =
    useModalState(initialModalState);

  const approveHandler = () => {
    showModal('approve');
  };
  const declineHandler = () => {
    showModal('decline');
  };

  return (
    <>
      <CustomModal
        open={!!contextInfo?.userDetail}
        onCancel={contextInfo?.closeDetailsHandler}
        width={'100%'}
        destroyOnClose
        style={{ top: 0, bottom: 0, padding: 0 }}
        classNames={{
          header: '!m-0 !p-0 absolute',
          content: '[&_.ant-modal-close]:!hidden',
        }}
        title={
          <button
            onClick={contextInfo?.closeDetailsHandler}
            className="flex items-center gap-x-1 rounded-10 border-2 border-custom-gray_400 bg-custom-gray_900 px-3 py-2"
          >
            <BackwardArrow size={18} />
            <span className="text-sm leading-[16.94px]">Back</span>
          </button>
        }
      >
        <RegistrationContent
          declineHandler={declineHandler}
          approveHandler={approveHandler}
        />
      </CustomModal>
      <DeclinePerson
        handleCancel={handleCancel}
        isModalOpen={isModalOpen.decline}
        showModal={showModal}
        type="detail"
      />
      <SubmittedResponseModal
        handleCancel={handleCancel}
        isModalOpen={isModalOpen.success}
      />
      <ApprovePerson
        handleCancel={handleCancel}
        isModalOpen={isModalOpen.approve}
        type="detail"
      />
    </>
  );
}

export default RegistrationDetail;
