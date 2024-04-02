import { AvatarProps } from 'antd';
import { GroupProps } from 'antd/es/avatar/group';

export interface CustomAvatarProps extends AvatarProps {
  lastName?: string;
  firstName?: string;
  backgroundColor?: string;
}

export interface AvatarGroupProps extends GroupProps {
  avatarData: CustomAvatarProps[];
}
