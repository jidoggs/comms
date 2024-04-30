import { useState } from 'react';
import { iHandleClick } from '@/types';

const initialDataList = {
  parastatal: { title: '', id: '', key: '' },
  office: { title: '', id: '', key: '' },
  department: { title: '', id: '', key: '' },
};
type UpdateItemType = {
  level: keyof typeof initialDataList;
  id: string;
  title: string;
};

function useSectionCascade() {
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
            ...value,
            key: '/parastatals/all',
          },
        });
        break;
      case 'office':
        setDataList((prev) => ({
          ...prev,
          office: {
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
