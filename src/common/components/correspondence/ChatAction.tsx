import {
  Briefcase,
  CloseCircled,
  Maximize,
  Send,
  Users,
} from '@/common/components/icons';
import { Tooltip } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';
import CustomButton from '../CustomButton';

const ChatAction = () => {
  return (
    <div className="mt-2 w-full rounded-md bg-white">
      <div className="flex flex-col p-3">
        <div className="mb-2 flex flex-row items-center justify-between">
          <div className="left">Left</div>
          <div className="flex flex-row">
            <Tooltip
              placement="top"
              title={'Create a meeting'}
              className="mx-2 my-3"
            >
              <Users
                size={18}
                //   onClick={() => setOpenCorrespondence(true)}
              />
            </Tooltip>
            <Tooltip
              placement="top"
              title={'Create Project'}
              className="mx-2 my-3"
            >
              <Briefcase
                size={18}
                //   onClick={() => setOpenCorrespondence(true)}
              />
            </Tooltip>
            <div className="bg-custom-gray_500  border-custom-gray_500 h-full w-px border-l" />
            <Tooltip
              placement="top"
              title={'Create a meeting'}
              className="mx-2 my-3"
            >
              <Maximize
                size={18}
                //   onClick={() => setOpenCorrespondence(true)}
              />
            </Tooltip>
            <Tooltip
              placement="top"
              title={'Create Project'}
              className="mx-2 my-3"
            >
              <CloseCircled
                size={18}
                //   onClick={() => setOpenCorrespondence(true)}
              />
            </Tooltip>
          </div>
        </div>
        <TextArea />
        <CustomButton className="!text-custom-white_300 bg-custom-gray_400 mt-3 flex items-center justify-center self-end !rounded-xl !p-2">
          <Send /> <span className="ml-2">Push</span>
        </CustomButton>
      </div>
    </div>
  );
};

export default ChatAction;
