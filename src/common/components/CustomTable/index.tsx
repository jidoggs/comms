import React, { forwardRef } from 'react';
import { Table } from 'antd';
import Title from '../Title';
import CustomPaginationHeader from '../CustomPaginationHeader';
import { CustomTableProps } from './type';
import { mergeClassName } from '@/common/utils';
export * from './type';

const CustomTable = forwardRef<any, CustomTableProps<any>>((props, ref) => {
  const {
    tabs,
    searchPanel,
    tableTitle,
    currentPage = 1,
    dataSource,
    pageSize = 100,
    totalContent = 0,
    pageChangeCallBack,
    className,
    rowClassName,
    ...otherTableProps
  } = props;
  const paginationHeader = (
    <>
      {totalContent === 0 ? (
        <Title tag="h1" className="text-lg">
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
      <div
        className={mergeClassName(
          'px-5',
          !stringClassName && className?.header
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
      </div>
      <div
        className={mergeClassName(
          'flex h-full flex-col bg-transparent',
          !stringClassName ? className?.tableContainer : ''
        )}
      >
        <div
          className={mergeClassName(
            'h-[calc(100vh-192px)] overflow-auto [&_.ant-empty-normal]:flex [&_.ant-empty-normal]:h-[calc(100vh-320px)] [&_.ant-empty-normal]:items-center [&_.ant-empty-normal]:justify-center [&_.ant-empty-normal_.ant-empty-image]:text-2xl',
            !stringClassName ? className?.tableWrapper : ''
          )}
        >
          <Table
            {...otherTableProps}
            sticky
            scroll={{ x: 'max-content' }}
            pagination={false}
            tableLayout="auto"
            dataSource={dataSource}
            ref={ref}
            rowClassName={mergeClassName('bg-transparent', rowClassName)}
            rowKey={otherTableProps.rowKey || '_id'}
            className={mergeClassName(
              '!bg-transparent',
              stringClassName ? className : className?.table
            )}
          />
        </div>
      </div>
    </section>
  );
});

CustomTable.displayName = 'CustomTable';

export default CustomTable;
