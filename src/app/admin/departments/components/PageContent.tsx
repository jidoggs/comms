'use client';
import React, { useState } from 'react';
import Title from '@/common/components/Title';
import DepartmentOfficesCascade from '@/common/components/DepartmentOfficesCascade/DepartmentOfficesCascade';
import { iHandleClick } from '../../people/types';

const initialDataList = { parastatal: '', office: '', department: '' };

const PageContent = () => {
  const [dataList, setDataList] = useState(initialDataList);

  const clickHandler: iHandleClick = (e) => {
    const dataset = e.currentTarget.dataset;
    const value = dataset.value as string;

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
          department: '',
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

  return (
    <div className="">
      <div className="flex flex-row justify-between px-5 py-3">
        <Title tag="h5" className="font-bold">
          Departments & Offices
        </Title>
        <div>Search Bar</div>
      </div>
      {/* is-admin and group are style identifies */}
      <div className="is-admin group h-screen bg-custom-white_100 px-2.5">
        <DepartmentOfficesCascade
          clickHandler={clickHandler}
          dataList={dataList}
          className="h-full"
          isEditable
        />
      </div>
    </div>
  );
};

export default PageContent;
