import React, { useState } from 'react';
import { useForm } from 'antd/es/form/Form';
import MinuteForm from '../../../../components/forms/CreateMinute/MinuteForm';
import CustomModal from '@/common/components/CustomModal';
import CustomButton from '@/common/components/CustomButton';
import Maximize from '@/common/components/icons/Maximize';

const initialFormExtras = {
  upload: false,
  attachment: false,
};

const MinuteAction = () => {
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
    <div className="w-full rounded-md bg-white drop-shadow-chat ">
      <div className="flex flex-col p-3">
        <MinuteForm
          form={form}
          isAttachmentOpen={formExtras.attachment}
          isUploadOpen={formExtras.upload}
          toggleAttachment={toggleAttachment}
          toggleUpload={toggleUpload}
          expandAction={
            <>
              <CustomButton
                description="Maximize"
                type="primary"
                icon={<Maximize size={18} />}
                onClick={showModal}
              />
              <CustomModal
                width={600}
                open={isModalOpen}
                onCancel={handleCancel}
              >
                <MinuteForm
                  form={form}
                  isAttachmentOpen={formExtras.attachment}
                  isUploadOpen={formExtras.upload}
                  toggleAttachment={toggleAttachment}
                  toggleUpload={toggleUpload}
                />
              </CustomModal>
            </>
          }
        />
      </div>
    </div>
  );
};

export default MinuteAction;
