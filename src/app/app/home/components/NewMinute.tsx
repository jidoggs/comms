'use client';
import CustomButton from '@/common/components/CustomButton';
import CustomModal from '@/common/components/CustomModal';
import Send from '@/common/components/icons/Send';
import React, { useState } from 'react';
import { useForm } from 'antd/es/form/Form';
import MinuteForm from '../../components/forms/CreateMinute/MinuteForm';

const initialFormExtras = {
  upload: false,
  attachment: false,
};

const NewMinute = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = useForm();
  const [formExtras, setFormExtras] = useState(initialFormExtras);

  const toggleAttachment = () => {
    setFormExtras((prev) => ({ ...prev, attachment: !prev.attachment }));
    if (formExtras.attachment) {
      form.setFieldValue('attach', []);
    }
  };
  const toggleUpload = () => {
    setFormExtras((prev) => ({ ...prev, upload: !prev.upload }));
    if (formExtras.upload) {
      form.setFieldValue('upload', undefined);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <CustomButton
        size="small"
        description="Push"
        type="primary"
        icon={<Send size={18} />}
        onClick={showModal}
      />
      <CustomModal width={600} open={isModalOpen} onCancel={handleCancel}>
        <MinuteForm
          form={form}
          isAttachmentOpen={formExtras.attachment}
          isUploadOpen={formExtras.upload}
          toggleAttachment={toggleAttachment}
          toggleUpload={toggleUpload}
        />
      </CustomModal>
    </>
  );
};

export default NewMinute;
