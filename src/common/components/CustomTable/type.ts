import { TableProps } from 'antd/es/table';
import React from 'react';

type ClassNames =
  | 'table'
  | 'tableWrapper'
  | 'tableContainer'
  | 'search'
  | 'tabs'
  | 'search-tabs'
  | 'container'
  | 'header';

export interface CustomTableProps<T>
  extends Omit<TableProps<T>, 'pagination' | 'title' | 'className'> {
  tableTitle?: string | null | React.ReactNode;
  pageSize?: number;
  currentPage?: number;
  totalContent?: number;
  tabs?: React.ReactNode;
  searchPanel?: React.ReactNode;
  pageChangeCallBack?: (page: number) => void; // eslint-disable-line
  className?: string | Partial<Record<ClassNames, string>>;
}
