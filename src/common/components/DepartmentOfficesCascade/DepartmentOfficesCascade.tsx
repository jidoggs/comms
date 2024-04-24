'use client';
// import { Cascader } from 'antd';
import React, { useMemo } from 'react';
import { governmentData } from './data';
import DepartmentsContainer from './departmentSub/DepartmentsContainer';
import { AnimatePresence } from 'framer-motion';
import { iHandleClick } from '@/types';

interface Props {
  dataList: Record<string, string>;
  clickHandler: iHandleClick;
}

const DepartmentOfficesCascade = ({ clickHandler, dataList }: Props) => {
  const stepOne = governmentData;
  const stepTwo =
    useMemo(
      () =>
        governmentData.find((itm) => itm.value === dataList.parastatal)
          ?.children,
      [dataList.parastatal]
    ) || [];
  const stepThree =
    useMemo(
      () =>
        stepTwo?.find((office) => office.value === dataList.office)?.children,
      [dataList.office]
    ) || [];

  return (
    <div className="w-full max-w-screen-lg overflow-x-scroll py-2">
      <div className="flex w-full flex-row overflow-scroll rounded-lg border border-custom-gray_500 bg-custom-white_100">
        {/* <Cascader.Panel
          options={departmentData || governmentData}
          onChange={onChange}
        /> */}
        <AnimatePresence>
          {stepOne.length ? (
            <DepartmentsContainer
              items={governmentData}
              title="Parastatals"
              step="parastatals"
              clickHandler={clickHandler}
              activeIdentifier={dataList.parastatal}
            />
          ) : null}
        </AnimatePresence>
        <AnimatePresence>
          {stepTwo.length ? (
            <DepartmentsContainer
              items={stepTwo}
              title={`${dataList.parastatal} (${stepTwo.length} offices)`}
              step="office"
              clickHandler={clickHandler}
              activeIdentifier={dataList.office}
            />
          ) : null}
        </AnimatePresence>
        <AnimatePresence>
          {stepThree.length ? (
            <DepartmentsContainer
              items={stepThree}
              title={`${dataList.office} (${stepThree.length} departments)`}
              step="department"
              clickHandler={clickHandler}
              activeIdentifier={dataList.department}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DepartmentOfficesCascade;
