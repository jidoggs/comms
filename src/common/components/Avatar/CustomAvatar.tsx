import React from 'react';
import { Avatar } from 'antd';
import { CustomAvatarProps } from './types';

const titleHandler = (value?: string) => {
  let val = '';
  if (value) {
    val = value.split('')?.[0];
  }
  return val;
};

const CustomAvatar = ({
  firstName,
  lastName,
  backgroundColor,
  ...props
}: CustomAvatarProps) => {
  return (
    <Avatar
      {...props}
      style={{ ...props.style, backgroundColor, border: '1px solid white' }}
    >
      {titleHandler(firstName)} {titleHandler(lastName)}
    </Avatar>
  );
};

export default CustomAvatar;
