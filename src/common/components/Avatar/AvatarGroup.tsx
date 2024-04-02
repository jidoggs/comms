import { Avatar } from 'antd';
import CustomAvatar from './CustomAvatar';
import { customThemeColor } from '@/common/utils';
import { AvatarGroupProps } from './types';

const AvatarGroup = ({ avatarData, size, ...props }: AvatarGroupProps) => {
  return (
    <Avatar.Group
      {...props}
      maxPopoverTrigger="click"
      size={size ? size : 'small'}
      maxStyle={{
        color: customThemeColor.white_100,
        backgroundColor: customThemeColor.gray_700,
        cursor: 'pointer',
      }}
      className="p-0.5"
    >
      {/* <Avatar
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        className="mr-2"
      /> */}
      {avatarData.map((data, index: number) => (
        <CustomAvatar
          style={{
            zIndex: avatarData.length - index,
          }}
          key={index}
          src={data?.src}
          firstName={data?.firstName}
          lastName={data?.lastName}
          backgroundColor={
            !data.src ? `${customThemeColor.gray_200}` : undefined
          }
        />
      ))}
    </Avatar.Group>
  );
};

export default AvatarGroup;
