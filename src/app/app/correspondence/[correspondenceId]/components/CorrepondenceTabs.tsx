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
    <div className="flex h-full flex-row gap-5">
      <CustomTab
        items={items}
        size="middle"
        defaultKey={detailsData?.activeTab}
        onChange={detailsData?.tabChangeHandler}
        tabBarGutter={30}
      />
    </div>
  );
};

export default CorrepondenceTabs;
