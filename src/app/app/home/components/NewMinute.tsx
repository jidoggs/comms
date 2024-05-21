'use client';
import CustomButton from '@/common/components/CustomButton';
import CustomModal from '@/common/components/CustomModal';
import Send from '@/common/components/icons/Send';
import React, { useContext, useEffect, useState } from 'react';
import ExpandedMinuteForm from '../../correspondence/[correspondenceId]/components/corrMinute/ExpandedMinuteForm';
import { CorrAppContext } from '../../service-context/AppContextWrapper';

const NewMinute = ({ minute }: any) => {
  // const detailsData = useContext(DetailContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const appContextData = useContext(CorrAppContext);

  const showModal = () => {
    appContextData?.setCorrId(minute.correspondence._id);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (appContextData?.closeModal) {
      setIsModalOpen(false);
    }
  }, [appContextData?.closeModal]);

  return (
    <>
      {/* <CustomButton
        size="small"
        type="text"
        icon={<Send />}
        description="Push"
        onClick={openModalHandler}
        />
      <CustomModal
        title="Edit correspondence"
        open={openModal}
        onCancel={closeModalHandler}
        width={800}
        >
        <Form
          currentCorr={context?.data}
          form={form}
          handleSubmit={correspondenceFormSubmitHandler}
          />
      </CustomModal> */}
      <CustomButton
        size="small"
        description="Push"
        type="primary"
        icon={<Send size={18} />}
        onClick={() => {
          showModal();
          appContextData?.setCorrId(minute.correspondence._id);
        }}
      />
      <CustomModal width={600} open={isModalOpen} onCancel={handleCancel}>
        <ExpandedMinuteForm />
      </CustomModal>
    </>
  );
};

export default NewMinute;
