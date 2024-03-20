import React from 'react';
import { Table } from 'antd';
import { mergeClassName } from '@/common/utils';
import { CustomTableProps } from './type';
import CustomPaginationHeader from '../CustomPaginationHeader';
import Title from '../Title';

const CustomTable = <T extends object>({
  tabs,
  searchPanel,
  tableTitle,
  currentPage = 1,
  dataSource,
  pageSize = 100,
  totalContent = 0,
  pageChangeCallBack,
  className,
  ...otherTableProps
}: CustomTableProps<T>) => {
  const paginationHeader = (
    <>
      {totalContent === 0 ? (
        <Title type="h1" className="text-lg">
          {tableTitle}
        </Title>
      ) : (
        <CustomPaginationHeader
          currentPage={currentPage}
          pageChangeCallBack={pageChangeCallBack}
          pageSize={pageSize}
          tableTitle={tableTitle}
          totalContent={totalContent}
          className={{
            title: 'text-lg',
          }}
        />
      )}
    </>
  );
  const stringClassName = typeof className === 'string';

  return (
    <section
      className={mergeClassName(
        'flex flex-col',
        !stringClassName ? className?.container : ''
      )}
    >
      {tabs && paginationHeader}
      <div
        className={mergeClassName(
          'mb-3 flex flex-wrap items-center justify-between gap-2',
          !stringClassName ? className?.['search-tabs'] : ''
        )}
      >
        <div
          className={mergeClassName(
            'flex flex-wrap items-center justify-between gap-2 py-1.5',
            !stringClassName ? className?.tabs : ''
          )}
        >
          {tabs ? tabs : paginationHeader}
        </div>
        <div
          className={mergeClassName(
            'flex flex-col',
            !stringClassName ? className?.search : ''
          )}
        >
          {searchPanel}
        </div>
      </div>
      <div
        className={mergeClassName(
          'flex h-full flex-col bg-transparent',
          !stringClassName ? className?.tableContainer : ''
        )}
      >
        <div
          className={mergeClassName(
            'h-[calc(100vh-160px)] overflow-auto [&_.ant-empty-normal]:flex [&_.ant-empty-normal]:h-[calc(100vh-296px)] [&_.ant-empty-normal]:items-center [&_.ant-empty-normal]:justify-center [&_.ant-empty-normal_.ant-empty-image]:text-2xl',
            !stringClassName ? className?.tableWrapper : ''
          )}
        >
          <Table
            {...otherTableProps}
            scroll={{ x: 'max-content' }}
            pagination={false}
            tableLayout="auto"
            dataSource={dataSource}
            rowKey={'id'}
            className={mergeClassName(
              '!bg-transparent',
              stringClassName ? className : className?.table
            )}
          />
        </div>
      </div>
    </section>
  );
};

export default CustomTable;
