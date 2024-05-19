/* eslint-disable no-unused-vars */
import { useCallback, useMemo, useState } from 'react';

export type Ipagination = {
  pageChangeHandler: (page: number) => void;
  setLimitHander: (limit: number) => void;
  setTotalCountHandler: (count: number) => void;
  currentPage: number;
  itemPerPage: number;
  totalPages: number;
  totalDataCount: number;
};

type args = {
  startPage?: number;
  pageSize?: number;
  onPageChange?: () => void;
};

const usePagination = (args?: args): Ipagination => {
  const intialData = {
    currentPage: args?.startPage || 1,
    itemPerPage: args?.pageSize || 20,
    totalDataCount: 0,
  };
  const [data, setData] = useState(intialData);

  const pageChangeHandler = useCallback(
    (page: number) => {
      args?.onPageChange && args.onPageChange();
      setData((prev) => ({ ...prev, currentPage: page }));
    },
    [] //eslint-disable-line
  );

  const setLimitHander = useCallback((limit: number) => {
    setData((prev) => ({ ...prev, itemPerPage: limit }));
  }, []);

  const setTotalCountHandler = useCallback((count: number) => {
    setData((prev) => ({ ...prev, totalDataCount: count }));
  }, []);

  const totalPages = useMemo(() => {
    return Math.ceil(data.totalDataCount / data.itemPerPage);
  }, [data.itemPerPage, data.totalDataCount]);

  return {
    ...data,
    pageChangeHandler,
    setLimitHander,
    setTotalCountHandler,
    totalPages,
  };
};

export default usePagination;
