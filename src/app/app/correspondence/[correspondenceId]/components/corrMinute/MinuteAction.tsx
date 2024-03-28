import CustomButton from '@/common/components/CustomButton';
import {
  Briefcase,
  CloseCircled,
  Maximize,
  Send,
  Users,
} from '@/common/components/icons';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';

const MinuteAction = () => {
  return (
    <div className="mt-2 w-full rounded-md bg-white">
      <div className="flex flex-col p-3">
        <div className="mb-2 flex flex-row items-center justify-between">
          <div className="left">Left</div>
          <div className="flex flex-row">
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
            <div className="h-8  w-px self-center border-l border-custom-gray_500 bg-custom-gray_500" />
            <CustomButton
              description="Create a meeting"
              type="primary"
              icon={<Maximize size={18} />}
            />
            <CustomButton
              description="Create Project"
              type="primary"
              icon={<CloseCircled size={18} />}
            />
          </div>
        </div>
        <TextArea />
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
