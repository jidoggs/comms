import { Avatar } from 'antd';
import CustomAvatar from './CustomAvatar';
import { customThemeColor } from '@/common/utils';
import { AvatarGroupProps } from './types';
import { generateRandomColor } from '@/common/hooks/corrUtils';

const AvatarGroup = ({
  avatarData,
  size,
  maxCount = 3,
  ...props
}: AvatarGroupProps) => {
  return (
    <Avatar.Group
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
          firstName={data?.firstName}
          size={size}
          lastName={data?.lastName}
          backgroundColor={!data.src ? generateRandomColor() : undefined}
        />
      ))}
    </Avatar.Group>
  );
};

export default AvatarGroup;
