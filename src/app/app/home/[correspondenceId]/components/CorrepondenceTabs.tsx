'use client';
import { mergeClassName } from '@/common/utils';
// import { Button } from 'antd';
import React from 'react';

const CorrepondenceTabs = ({ activeTab, setActiveTab }: any) => {
  return (
    <div className="flex h-full flex-row gap-5">
      <button
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
      </button>
    </div>
  );
};

export default CorrepondenceTabs;
