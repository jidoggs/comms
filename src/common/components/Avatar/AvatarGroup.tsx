'use client';

import { Avatar } from 'antd';
import CustomAvatar from './CustomAvatar';
import { customThemeColor } from '@/common/utils';
import { AvatarData, AvatarGroupProps } from './types';

const AvatarGroup = ({ maxCount, avatarData }: AvatarGroupProps) => {
  return (
    <Avatar.Group
      maxCount={maxCount}
      maxPopoverTrigger="click"
      size="small"
      maxStyle={{
        color: '#f56a00',
        backgroundColor: '#fde3cf',
        cursor: 'pointer',
      }}
    >
      {/* <Avatar
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        className="mr-2"
      /> */}
      {avatarData?.map((data: AvatarData, index: number) => (
        <CustomAvatar
          key={index}
          url={data?.image_url}
          firstName={data?.first_name}
          lastName={data?.last_name}
          backgroundColor={`${customThemeColor.gray_200}${index}`}
        />
      ))}
    </Avatar.Group>
  );
};

export default AvatarGroup;
