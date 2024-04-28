import { useState } from 'react';
import { iHandleClick } from '@/types';

const initialDataList = {
  parastatal: { title: '', id: '' },
  office: { title: '', id: '' },
  department: { title: '', id: '' },
};

function useSectionCascade() {
  const [dataList, setDataList] = useState(initialDataList);

  const clickHandler: iHandleClick = (e) => {
    const dataset = e.currentTarget.dataset;
    const title = dataset.value as string;
    const id = dataset.id as string;

    const value = { id, title };

    switch (dataset.step) {
      case 'parastatals':
        setDataList({
          ...initialDataList,
          parastatal: value,
        });
        break;
      case 'office':
        setDataList((prev) => ({
          ...prev,
          office: value,
          department: initialDataList.department,
        }));
        break;
      case 'department':
        setDataList((prev) => ({
          ...prev,
          department: value,
        }));
        break;

      default:
        setDataList({
          ...initialDataList,
        });
        break;
    }
  };
  return { dataList, clickHandler };
}

export default useSectionCascade;
