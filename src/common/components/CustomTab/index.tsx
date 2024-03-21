import React from 'react';
import { Tabs, TabsProps } from 'antd';

interface CustomTabProps extends TabsProps {
  defaultKey?: string;
}

const CustomTab: React.FunctionComponent<CustomTabProps> = ({
  defaultKey,
  size = 'small',
  tabBarGutter = 10,
  ...props
}) => {
  return (
    <Tabs
      {...props}
      tabBarStyle={{
        margin: 0,
      }}
      size={size}
      tabBarGutter={tabBarGutter}
      defaultActiveKey={defaultKey}
      activeKey={defaultKey}
      className="border-custom-gray_500 border-b"

    />
  );
};

export default CustomTab;
