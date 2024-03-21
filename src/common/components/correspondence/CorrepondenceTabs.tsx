'use client';
import CustomTab from '@/common/components/CustomTab';
// import { mergeClassName } from '@/common/utils';
// import { Button } from 'antd';
import React from 'react';
import { TabsProps } from 'antd';

const CorrepondenceTabs = ({ activeTab, setActiveTab }: any) => {
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

  const tabChangeHandler = (state: string) => {
    setActiveTab(state);
  };

  return (
    <div className="flex h-full flex-row gap-5">
      <CustomTab
        items={items}
        size="middle"
        defaultKey={activeTab}
        onChange={tabChangeHandler}
        tabBarGutter={30}
      />
      {/* <button
        onClick={() => setActiveTab('Minutes')}
        className={mergeClassName(
          'h-full',
          activeTab === 'Minutes'
            ? 'border-b-2 border-solid border-[#5D5FEF]'
            : 'border-none'
        )}
      >
        Minutes
      </button>
      <button
        onClick={() => setActiveTab('Timelines')}
        className={mergeClassName(
          'h-full',
          activeTab === 'Timelines'
            ? 'border-b-2 border-solid border-[#5D5FEF]'
            : 'border-none'
        )}
      >
        Timelines
      </button>
      <button
        onClick={() => setActiveTab('Documents')}
        className={mergeClassName(
          'h-full border-b-2',
          activeTab === 'Documents'
            ? 'border-b-2 border-solid border-[#5D5FEF]'
            : 'border-none'
        )}
      >
        Documents
      </button> */}
    </div>
  );
};

export default CorrepondenceTabs;
