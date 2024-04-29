import React from 'react';
import CustomAvatar from '../Avatar/CustomAvatar';
import Title from '../Title';
import { Profile } from '../icons';
import { User } from '@/types';

type Props = {
  data: User;
  avatarSize?: number;
};

function CustomUser({ data, avatarSize = 30 }: Props) {
  return (
    <div className="flex cursor-pointer items-center gap-x-2.5 px-1.5 py-0.5 hover:bg-custom-gray_500">
      <CustomAvatar
        size={avatarSize}
        src={data?.img}
        icon={
          <span className="flex h-full flex-1 items-center justify-center">
            <Profile size="22" className="stroke-white" />
          </span>
        }
      />
      <div className="flex flex-col">
        <Title semibold>
          {data?.firstname} {data?.lastname}
        </Title>
        <Title small className="text-custom-gray_600">
          {data?.title}
        </Title>
      </div>
    </div>
  );
}

export default CustomUser;
