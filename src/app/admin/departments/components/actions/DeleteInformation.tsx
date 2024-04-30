import ApproveModalContent from '@/common/components/ApproveModalContent';
import CustomButton from '@/common/components/CustomButton';
import { Delete } from '@/common/components/icons';
import React, { useContext, useState } from 'react';
import { MoreInfoContext } from '../modals/MoreInformationModal';
import { CascadeContext } from '@/common/components/SectionCascade';
import { useSWRConfig } from 'swr';

function DeleteInformation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate } = useSWRConfig();

  const information = useContext(MoreInfoContext);
  const cascadeContextInfo = useContext(CascadeContext);
  const type = information?.type;
  const loading = information?.isDeleting;

  const deleteHandler = () => {
    if (!information?.handleDelete) return;
    information
      ?.handleDelete({ type: 'delete' })
      .then(() => {
        if (!type || !cascadeContextInfo?.deleteCascadeItemHandler) return;
        mutate(cascadeContextInfo.dataList?.[type]?.key); // revalidate key
        cascadeContextInfo?.deleteCascadeItemHandler(type); //update state stored info
      })
      .finally(information.handleCancel);
  };

  const openHandler = () => {
    setIsModalOpen(true);
  };

  const closeHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <CustomButton
        type="default"
        className="!bg-custom-gray_100 !px-6 !text-custom-main"
        icon={<Delete size={18} />}
        size="small"
        title="Delete"
        onClick={openHandler}
      >
        Delete
      </CustomButton>
      <ApproveModalContent
        isModalOpen={isModalOpen}
        handleCancel={closeHandler}
        handleSubmit={deleteHandler}
        isLoading={loading}
        text={`Are you sure you want to delete this ${type}?`}
        actionText="Delete"
      />
    </>
  );
}

export default DeleteInformation;