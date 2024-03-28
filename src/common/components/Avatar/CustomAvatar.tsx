import { Avatar } from 'antd';
import React from 'react';

type CustomAvatarProps = {
  url?: string;
  lastName?: string;
  firstName?: string;
  backgroundColor?: string;
};

const CustomAvatar = ({
  url,
  firstName,
  lastName,
  backgroundColor,
}: CustomAvatarProps) => {
  return (
    <Avatar src={url} style={{ backgroundColor }}>
      {firstName?.split('')?.[0]} {lastName?.split('')?.[0]}
    </Avatar>
  );
};

export default CustomAvatar;
