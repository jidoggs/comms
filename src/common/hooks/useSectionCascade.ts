import { useCallback, useState } from 'react';
import { DepartmentType, OfficeType, ParastatalType } from '@/app/admin/types';

type DataType = {
  parastatal: { data: ParastatalType | null; key: string };
  office: { data: OfficeType | null; key: string };
  department: { data: DepartmentType | null; key: string };
};

export const initialDataList: DataType = {
  parastatal: { data: null, key: '' },
  office: { data: null, key: '' },
  department: { data: null, key: '' },
};
export type UpdateItemType = {
  level: keyof typeof initialDataList;
  data: any;
};

function useSectionCascade() {
  const [dataList, setDataList] = useState(initialDataList);

  const clickCascadeItemHandler = useCallback((step: string, data: any) => {
    switch (step) {
      case 'parastatals':
        setDataList({
          ...initialDataList,
          parastatal: {
            data,
            key: '/parastatals/all',
          },
        });
        break;
      case 'office':
        setDataList((prev) => ({
          ...prev,
          office: {
            data,
            key: `/offices/all?parastatal=${prev?.parastatal?.data?._id}`,
          },
          department: initialDataList.department,
        }));
        break;
      case 'department':
        setDataList((prev) => ({
          ...prev,
          department: {
            data,
            key: `/departments/all?parastatal=${prev?.parastatal?.data?._id}&office=${prev?.office?.data?._id}`,
          },
        }));
        break;

      default:
        setDataList({
          ...initialDataList,
        });
        break;
    }
  }, []);

  const updateCascadeItemHandler = useCallback((values: UpdateItemType) => {
    const { level, data } = values;

    setDataList((prev) => ({
      ...prev,
      [level]: { ...prev[level], data: { ...prev[level].data, ...data } },
    }));
  }, []);
  const deleteCascadeItemHandler = useCallback(
    (level: keyof typeof dataList) => {
      switch (level) {
        case 'office':
          setDataList((prev) => ({
            ...initialDataList,
            parastatal: prev.parastatal,
          }));
          break;
        case 'department':
          setDataList((prev) => ({
            ...prev,
            department: initialDataList.department,
          }));
          break;

        default:
          setDataList({
            ...initialDataList,
          });
          break;
      }
    },
    []
  );

  return {
    dataList,
    clickCascadeItemHandler,
    updateCascadeItemHandler,
    deleteCascadeItemHandler,
  };
}

export default useSectionCascade;
