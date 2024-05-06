import { useState } from 'react';
import { iHandleClick } from '@/types';

export const initialDataList = {
  parastatal: { title: '', id: '', key: '', disabled: false },
  office: { title: '', id: '', key: '', disabled: false },
  department: { title: '', id: '', key: '', disabled: false },
};
export type UpdateItemType = {
  level: keyof typeof initialDataList;
  id: string;
  title: string;
};

type Props = Partial<{
  parastatal: '';
  office: '';
  department: '';
}>;

function useSectionCascade(props?: Props) {
  const [dataList, setDataList] = useState(initialDataList);

  const clickCascadeItemHandler: iHandleClick = (e) => {
    const dataset = e.currentTarget.dataset;
    const title = dataset.value as string;
    const id = dataset.id as string;

    const value = { id, title, key: '' };

    switch (dataset.step) {
      case 'parastatals':
        setDataList({
          ...initialDataList,
          parastatal: {
            ...initialDataList.parastatal,
            ...value,
            key: '/parastatals/all',
          },
        });
        break;
      case 'office':
        setDataList((prev) => ({
          ...prev,
          office: {
            ...initialDataList.office,
            ...value,
            key: `/offices/all?parastatal=${prev.parastatal.id}`,
          },
          department: initialDataList.department,
        }));
        break;
      case 'department':
        setDataList((prev) => ({
          ...prev,
          department: {
            ...initialDataList.department,
            ...value,
            key: `/departments/all?parastatal=${prev.parastatal.id}&office=${prev.office.id}`,
          },
        }));
        break;

      default:
        setDataList({
          ...initialDataList,
        });
        break;
    }
  };

  const updateCascadeItemHandler = (values: UpdateItemType) => {
    const { level, id, title } = values;
    setDataList((prev) => ({ ...prev, [level]: { id, title } }));
  };
  const deleteCascadeItemHandler = (level: keyof typeof dataList) => {
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
  };

  return {
    dataList,
    clickCascadeItemHandler,
    updateCascadeItemHandler,
    deleteCascadeItemHandler,
  };
}

export default useSectionCascade;
