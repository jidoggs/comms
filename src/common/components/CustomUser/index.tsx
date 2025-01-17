import React from 'react';
import CustomAvatar from '../Avatar/CustomAvatar';
import Title from '../Title';
import { User } from '@/types';
import Profile from '../icons/Profile';
import { mergeClassName } from '@/common/utils';

type IclassName = 'container';

type Props = {
  data: User | string;
  avatarSize?: number;
  className?: Partial<Record<IclassName, string>>;
};

function CustomUser({ data, avatarSize = 30, className }: Props) {
  return (
    <div
      className={mergeClassName(
        'flex cursor-pointer items-center gap-x-2.5 px-1.5 py-0.5',
        className?.container
      )}
    >
      <CustomAvatar
        size={avatarSize}
        src={typeof data !== 'string' && data?.img}
        icon={
          <span className="flex h-full flex-1 items-center justify-center">
            <Profile size="22" className="stroke-white" />
          </span>
        }
      />
      <div className="flex flex-col">
        <Title semibold>
          {typeof data === 'string'
            ? data
            : `${data?.firstname} ${data?.surname || ''}`}
        </Title>
        {typeof data !== 'string' ? (
          <Title small className="text-custom-gray_600">
            {data?.title}
          </Title>
        ) : null}
      </div>
    </div>
  );
}

export default CustomUser;
