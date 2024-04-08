import React from 'react';
import { Avatar } from 'antd';
import { CustomAvatarProps } from './types';

const CustomAvatar = ({
  backgroundColor,
  children,
  ...props
}: CustomAvatarProps) => {
  return (
    <Avatar
      {...props}
      style={{
        ...props.style,
        backgroundColor: props.style?.backgroundColor || backgroundColor,
        border: props.style?.border || '1px solid white',
        color: props.style?.color || 'white',
      }}
    >
      {children}
    </Avatar>
  );
};

export default CustomAvatar;
