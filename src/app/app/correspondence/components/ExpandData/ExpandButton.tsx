import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import CustomButton from '@/common/components/CustomButton';
import CustomModal from '@/common/components/CustomModal';
import SentCorrespondence from '../SentCorrespondence';
import Form from './Form';
import Maximize from '@/common/components/icons/Maximize';
import { UploadFile } from 'antd';
import { useSession } from '@/common/hooks';
import useCorrespondence from '@/app/app/hooks/useCorrespondence';
import { messageHandler } from '@/common/utils/notification';
import { useForm } from 'antd/es/form/Form';
import { TableRowActionContext } from '../TableRowAction';
import { removeNullOrUndefinedProperties } from '@/common/utils';

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
  const context = useContext(TableRowActionContext);

  const { data: user } = useSession();
  const [form] = useForm();
  const parastatalId = user.parastatal?.[0]?._id;

  const { createCorrSwr } = useCorrespondence({
    can_create: true,
  });

  const correspondenceFormSubmitHandler = async (values: any) => {
    const backendData = removeNullOrUndefinedProperties({
      ...values,
      files: values?.files?.map((item: UploadFile<any>) => item.originFileObj),
      status: 'sent', // Assuming the status for sent correspondences is "sent"
    });
    const data = {
      ...backendData,
      parastatal: parastatalId,
    };
    createCorrSwr
      .trigger({ data })
      .then(() => {
        closeModalHandler();
        form.resetFields();
      })
      .catch((error) => {
        messageHandler('error', error.message);
      });
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
      </CustomModal>
      <SentCorrespondence
        newCorrespondence={newCorrespondenceHandler}
        viewCorrespondence={viewCorrespondenceHandler}
        onCancel={closeConfirmModalHandler}
        open={openConfirmModal}
      />
    </>
  );
}

export default ExpandButton;
