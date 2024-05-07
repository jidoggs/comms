import { AvatarProps } from 'antd/es/avatar';
import { GroupProps } from 'antd/es/avatar/group';

export interface CustomAvatarProps extends AvatarProps {
  backgroundColor?: string;
}
export interface GroupAvatarProps {
  surname?: string;
  firstName?: string;
  src?: string;
}

export interface AvatarGroupProps extends GroupProps {
  avatarData: GroupAvatarProps[];
}
