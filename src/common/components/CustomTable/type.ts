import { TableProps } from 'antd';
import React from 'react';

type ClassNames =
  | 'table'
  | 'tableWrapper'
  | 'tableContainer'
  | 'search'
  | 'tabs'
  | 'search-tabs'
  | 'container';

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
