import dynamic from 'next/dynamic';
import React, { useEffect, useRef } from 'react';
import Title from '../Title';
import CustomPaginationHeader from '../CustomPaginationHeader';
import EmptyList from '../EmptyList';
import { mergeClassName } from '@/common/utils';
import { CustomTableProps } from './type';
export * from './type';

const Table = dynamic(() => import('antd/es/table/Table'));

const CustomTable = (props: CustomTableProps<any>) => {
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
  const stringClassName = typeof className === 'string';

  const containerRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  const calcScrollHeight = (other: number) => {
    if (!containerRef.current) return 0;
    return (
      containerRef.current.offsetHeight - containerRef.current.offsetTop - other
    );
  };

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

  const emptyTable = () => {
    return <EmptyList style={{ height: calcScrollHeight(64) }} />;
  };

  useEffect(() => {
    pageRef.current?.children.item(0)?.scrollIntoView({
      block: 'end',
      behavior: 'smooth',
    });
  }, [JSON.stringify(dataSource)]); //eslint-disable-line

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
            'flex flex-wrap items-center justify-between gap-2',
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
          'flex h-screen flex-col bg-transparent',
          !stringClassName ? className?.tableContainer : ''
        )}
      >
        <div
          className={mergeClassName(
            'h-full',
            !stringClassName ? className?.tableWrapper : ''
          )}
          ref={containerRef}
        >
          <Table
            {...otherTableProps}
            sticky
            scroll={{
              x: 'max-content',
              y: calcScrollHeight(50),
            }}
            pagination={false}
            tableLayout="auto"
            dataSource={dataSource}
            locale={{
              emptyText: emptyTable,
            }}
            components={{
              body: {
                wrapper: (props: any) => <tbody {...props} ref={pageRef} />,
              },
            }}
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
};

export default CustomTable;
