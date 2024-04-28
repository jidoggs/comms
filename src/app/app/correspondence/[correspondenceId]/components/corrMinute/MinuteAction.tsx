import React, { useState } from 'react';
import ExpandedMinuteForm from './ExpandedMinuteForm';
import CustomModal from '@/common/components/CustomModal';
import { CustomTextArea } from '@/common/components/CustomInput';
import CustomButton from '@/common/components/CustomButton';
import {
  Briefcase,
  CloseCircled,
  Maximize,
  Send,
  Users,
} from '@/common/components/icons';

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
          <div className="left">Left</div>
          <div className="flex gap-1">
            <CustomButton
              description="Create a meeting"
              type="primary"
              icon={<Users size={18} />}
            />
            <CustomButton
              description="Create Project"
              type="primary"
              icon={<Briefcase size={18} />}
            />
            <div className="h-8 self-center border-l border-custom-gray_500 bg-custom-gray_500" />

            <CustomButton
              description="Create a meeting"
              type="primary"
              icon={<Maximize size={18} />}
              onClick={showModal}
            />
            <CustomModal width={500} open={isModalOpen} onCancel={handleCancel}>
              <ExpandedMinuteForm />
            </CustomModal>
            <CustomButton
              description="Create Project"
              type="primary"
              icon={<CloseCircled size={18} />}
            />
          </div>
        </div>
        <CustomTextArea />
        <CustomButton
          icon={<Send size={18} />}
          className={{
            container: 'mt-3 flex-[0] justify-end',
          }}
          size="small"
        >
          Push
        </CustomButton>
      </div>
    </div>
  );
};

export default MinuteAction;
