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
import CustomButton from '../../../../../../common/components/CustomButton';

const MinuteAction = () => {
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
            <div className="h-full  w-px border-l border-custom-gray_500 bg-custom-gray_500" />
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
        <CustomButton className="mt-3 flex items-center justify-center self-end !rounded-xl bg-custom-gray_400 !p-2 !text-custom-white_300">
          <Send /> <span className="ml-2">Push</span>
        </CustomButton>
      </div>
    </div>
  );
};

export default MinuteAction;
