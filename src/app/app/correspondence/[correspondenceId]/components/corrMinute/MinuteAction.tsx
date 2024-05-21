import React, { useState } from 'react';
import ExpandedMinuteForm from './ExpandedMinuteForm';
import CustomModal from '@/common/components/CustomModal';
// import { CustomTextArea } from '@/common/components/CustomInput';
import CustomButton from '@/common/components/CustomButton';
// import Users from '@/common/components/icons/Users';
// import Briefcase from '@/common/components/icons/Briefcase';
// import CloseCircled from '@/common/components/icons/CloseCircled';
import Maximize from '@/common/components/icons/Maximize';
// import Send from '@/common/components/icons/Send';
import Title from '@/common/components/Title';
import MinuteForm from './MinuteForm';

const MinuteAction = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="w-full rounded-md bg-white drop-shadow-chat ">
      <div className="flex flex-col p-3">
        <div className="mb-2 flex items-center justify-between">
          <Title>New Minute</Title>
          <div className="flex flex-row gap-1">
            <div className="h-8 self-center border-l border-custom-gray_500 bg-custom-gray_500" />
            <CustomButton
              description="Maximize"
              type="primary"
              icon={<Maximize size={18} />}
              onClick={showModal}
            />
            <CustomModal width={600} open={isModalOpen} onCancel={handleCancel}>
              <ExpandedMinuteForm />
            </CustomModal>
          </div>
        </div>
        <MinuteForm />
      </div>
    </div>
  );
};

export default MinuteAction;
