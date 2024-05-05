import React from 'react';
import { Tabs, TabsProps } from 'antd';
import { mergeClassName } from '@/common/utils';

interface CustomTabProps extends TabsProps {
  defaultKey?: string;
}

export type ItemProps = TabsProps['items'];

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
      className={mergeClassName(
        'border-b border-custom-gray_500',
        props.className
      )}
    />
  );
};

export default CustomTab;
