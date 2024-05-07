import React from 'react';
import dynamic from 'next/dynamic';
import Title from '../Title';
import { mergeClassName } from '@/common/utils';

const Pagination = dynamic(() => import('antd/es/pagination/Pagination'));

type ClassName = 'container' | 'title' | 'divider' | 'pagination';

interface Props {
  tableTitle?: string | null | React.ReactNode;
  pageSize?: number;
  currentPage?: number;
  totalContent?: number;
  pageChangeCallBack?: (page: number) => void; // eslint-disable-line
  className?: Partial<Record<ClassName, string>>;
}

function CustomPaginationHeader({
  currentPage,
  pageChangeCallBack,
  pageSize,
  tableTitle,
  totalContent,
  className,
}: Props) {
  return (
    <header
      className={mergeClassName(
        'mb-3 flex flex-wrap items-center justify-start gap-2',
        className?.container
      )}
    >
      <Title
        tag="h1"
        className={mergeClassName(
          'text-xl capitalize text-black',
          className?.title
        )}
      >
        {tableTitle}
      </Title>
      <div
        className={mergeClassName('mx-4 h-5 w-px bg-black', className?.divider)}
      />
      <Pagination
        total={totalContent}
        current={currentPage}
        pageSize={pageSize}
        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total}`}
        onChange={pageChangeCallBack}
        className={className?.pagination}
      />
    </header>
  );
}

export default CustomPaginationHeader;
