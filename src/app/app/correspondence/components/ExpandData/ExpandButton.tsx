import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import CustomButton from '@/common/components/CustomButton';
import CustomModal from '@/common/components/CustomModal';
import SentCorrespondece from '../SentCorrespondece';
import Form from './Form';
import { CorrespondenceData } from '../../types';
import Maximize from '@/common/components/icons/Maximize';

type Props = {
  className: string;
  description?: string;
};

function ExpandButton({ className, description }: Props) {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const openModalHandler = () => setOpenModal(true);
  const closeModalHandler = () => setOpenModal(false);
  const closeConfirmModalHandler = () => setOpenConfirmModal(false);

  //eslint-disable-next-line
  const correspondenceFormSubmitHandler = (data: CorrespondenceData) => {
    closeModalHandler();
    setOpenConfirmModal(true);
  };

  const viewCorrespondenceHandler = () => {
    closeConfirmModalHandler();
    router.push('correspondence/export_of_brewery_products');
  };

  const newCorrespondenceHandler = () => {
    closeConfirmModalHandler();
  };

  return (
    <>
      <CustomButton
        icon={<Maximize size={18} className={className} />}
        description={description || 'Maximize'}
        size="small"
        type="text"
        onClick={openModalHandler}
      />
      <CustomModal
        title="New correspondence"
        open={openModal}
        onCancel={closeModalHandler}
        width={800}
      >
        <Form handleSubmit={correspondenceFormSubmitHandler} />
      </CustomModal>
      <SentCorrespondece
        newCorrespondence={newCorrespondenceHandler}
        viewCorrespondence={viewCorrespondenceHandler}
        onCancel={closeConfirmModalHandler}
        open={openConfirmModal}
      />
    </>
  );
}

export default ExpandButton;
