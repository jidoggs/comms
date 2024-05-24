import React from 'react';

interface NotificationProps {
  label: string;
}

const SingleNotification = ({ label }: NotificationProps) => {
  return <div>{label}</div>;
};

export default SingleNotification;
