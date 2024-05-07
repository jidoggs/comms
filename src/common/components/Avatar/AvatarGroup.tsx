import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import CustomAvatar from './CustomAvatar';
import {
  customThemeColor,
  generateInitials,
  generateRandomColor,
} from '@/common/utils';
import { AvatarGroupProps } from './types';

const Avatar = dynamic(() => import('antd/es/avatar/group'));

const AvatarGroup = ({
  avatarData,
  size,
  maxCount = 3,
  ...props
}: AvatarGroupProps) => {
  const memorizedColor = useMemo(() => generateRandomColor(), []);
  return (
    <Avatar
      {...props}
      maxPopoverTrigger="click"
      size={size ? size : 'small'}
      maxCount={maxCount}
      maxStyle={{
        color: customThemeColor.white_100,
        backgroundColor: customThemeColor.gray_700,
        cursor: 'pointer',
        fontSize: 10,
      }}
      className="p-0.5"
    >
      {avatarData.map((data, index: number) => (
        <CustomAvatar
          style={{
            zIndex: maxCount - index,
            fontSize: 8,
          }}
          key={index}
          src={data?.src}
          size={size}
          backgroundColor={!data.src ? memorizedColor : undefined}
        >
          {generateInitials(data?.firstName || '', data.surname)}
        </CustomAvatar>
      ))}
    </Avatar>
  );
};

export default AvatarGroup;
