'use client';
import React, { useContext } from 'react';
import { TabsProps } from 'antd';
import CustomTab from '@/common/components/CustomTab';
import { DetailContext } from '../service-context/DetailContextWrapper';

const CorrepondenceTabs = () => {
  const detailsData = useContext(DetailContext);
  const items: TabsProps['items'] = [
    {
      key: 'minutes',
      label: 'Minutes',
    },
    {
      key: 'timelines',
      label: 'Timelines',
    },
    {
      key: 'documents',
      label: 'Documents',
    },
  ];

  return (
    <CustomTab
      items={items}
      size="middle"
      defaultKey={detailsData?.activeTab}
      onChange={detailsData?.tabChangeHandler}
      tabBarGutter={24}
      className='!bg-red-500'
    />
  );
};

export default CorrepondenceTabs;
