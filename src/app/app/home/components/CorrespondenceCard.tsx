'use client';

import { Avatar } from 'antd';
import { File } from '@/common/components/icons';

const CorrespondenceCard = () => {
  return (
    <div className="mt-2 flex w-full gap-2 rounded-md bg-white p-2 text-gray-400 shadow-md">
      <div className="size-8 rounded-md bg-gray-100">
        <File />
      </div>
      <div className="w-5/6">
        <div className="flex gap-1 align-middle">
          <Avatar
            className="bg-gray-300"
          >
            U I
          </Avatar>
          <div className="leading-3.2 text-xs">
            <p className="font-bold text-gray-500">Jane Doe</p>
            <p>Registry, Ministry of Trade & Investment</p>
          </div>
        </div>
        <div className="my-2 text-xs font-semibold">
          <p>
            Dear HM, I hope this message finds you well. Please find
            correspondence f ...
          </p>
        </div>
        <div className="mb-1 mt-2 flex items-center gap-1 text-xs font-semibold">
          <p>04:20 PM, 16 Feb 2024</p>
          {/* TODO: REFACTOR TO ITS OWN COMPONENT */}
          <Avatar.Group
            maxCount={3}
            maxPopoverTrigger="click"
            size="small"
            maxStyle={{
              color: '#f56a00',
              backgroundColor: '#fde3cf',
              cursor: 'pointer',
            }}
          >
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" className='mr-2' />
            <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>

            <Avatar style={{ backgroundColor: '#87d068' }} />

            <Avatar style={{ backgroundColor: '#1677ff' }} />
          </Avatar.Group>
        </div>
      </div>
    </div>
  );
};

export default CorrespondenceCard;
