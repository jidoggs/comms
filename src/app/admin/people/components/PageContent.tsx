'use client';
import dynamic from 'next/dynamic';
import React, { useContext } from 'react';
import CustomTable from '@/common/components/CustomTable';
import CustomTab from '@/common/components/CustomTab';
import { PeopleDataContext } from '../service-context/PeopleListContextWrapper';

const TableActions = dynamic(() => import('./TableActions'));
const RegistrationDetail = dynamic(() => import('./RegistrationDetail'));

const PeoplePage = () => {
  const contextInfo = useContext(PeopleDataContext);

  return (
    <div className="pt-4">
      <CustomTable
        tableTitle="People"
        pageSize={contextInfo?.pagination.itemPerPage}
        currentPage={contextInfo?.pagination.currentPage}
        totalContent={contextInfo?.pagination.totalDataCount}
        pageChangeCallBack={contextInfo?.pagination.pageChangeHandler}
        tabs={
          <CustomTab
            onChange={contextInfo?.handleTabChange}
            defaultKey={contextInfo?.currentTab}
            items={contextInfo?.tabItemList}
          />
        }
        searchPanel={<TableActions />}
        className={{
          table: 'cursor-pointer',
        }}
        columns={contextInfo?.columns}
        dataSource={contextInfo?.dataSource}
        loading={contextInfo?.isLoading}
        size="large"
        rowClassName="group"
        onRow={contextInfo?.viewDetailsHandler}
      />
      <RegistrationDetail />
    </div>
  );
};

export default PeoplePage;
