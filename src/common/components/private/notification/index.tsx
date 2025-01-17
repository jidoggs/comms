'use client';
import React from 'react';
import CustomButton from '../../CustomButton';
import NotificationBell from '../../icons/NotificationBell';
import { Dropdown, MenuProps, message } from 'antd';
import Title from '../../Title';
import { sampleData } from './component/sampleData';
import SingleNotification from './component';

const Notification = () => {
  const onClick: MenuProps['onClick'] = ({ key }) => {
    message.info(`Click on item ${key}`);
  };
  const items: MenuProps['items'] = [
    ...sampleData.map((data) => {
      return {
        key: data.key,
        type: data.type,
        label: data.label,
        children: [
          ...data.children.map((item) => {
            return {
              key: item.key,
              label: <SingleNotification item={item} />,
              onClick: onClick,
              style: {
                padding: '0',
                borderBottom: '1px solid #f0f0f0',
              },
            };
          }),
        ],
      };
    }),
  ];

  const menuStyle: React.CSSProperties = {
    boxShadow: 'none',
    maxHeight: '80vh',
    overflowY: 'auto',
    paddingBottom: '10px',
    paddingLeft: 0,
    paddingRight: 0,
  };

  const count = 0;

  return (
    <div className="relative text-custom-main">
      <Dropdown
        menu={{ items }}
        placement="bottom"
        dropdownRender={(menu) => (
          <div className="rounded-lg border border-custom-gray_400 bg-custom-white_100">
            <div className="flex flex-row items-center justify-between gap-10 p-5">
              <div className="flex flex-row items-center gap-2">
                <Title className="circular font-medium">Notifications</Title>
                <Title
                  tag="span"
                  className="rounded-10 border border-gray-400 px-2 py-0.5 text-center"
                >
                  {count}
                </Title>
              </div>
              <CustomButton
                type="text"
                size="small"
                className="!text-custom-purple_100"
              >
                Mark all as read
              </CustomButton>
            </div>
            <div className="h-px w-full bg-custom-gray_100" />
            {React.cloneElement(menu as React.ReactElement, {
              style: menuStyle,
            })}
            <div className="h-px w-full bg-custom-gray_100" />
            <CustomButton
              type="text"
              size="small"
              className="!w-full !rounded-none !text-custom-purple_100"
            >
              Clear ist
            </CustomButton>
          </div>
        )}
      >
        <CustomButton
          className="p-2 !text-custom-main"
          type="link"
          size="small"
          icon={<NotificationBell />}
        />
      </Dropdown>
    </div>
  );
};

export default Notification;
