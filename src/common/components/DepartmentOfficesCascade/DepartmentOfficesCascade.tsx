/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
// import { Cascader } from 'antd';
import React, { useMemo } from 'react';
import { governmentData } from './data';
import DepartmentsContainer from './departmentSub/DepartmentsContainer';
import { AnimatePresence } from 'framer-motion';
import { iHandleClick } from '@/types';
import { mergeClassName } from '@/common/utils';

interface Props {
  dataList: Record<string, string>;
  clickHandler: iHandleClick;
  className?: string;
  isEditable?: boolean;
}

const DepartmentOfficesCascade = ({
  clickHandler,
  dataList,
  className,
  isEditable,
}: Props) => {
  // const { getListSwr } = useParastals({ get_all: true });
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
  const stepFour =
    useMemo(
      () =>
        stepTwo?.find((office) => office.value === dataList.office)?.children,
      [dataList.department]
    ) || [];

  return (
    <div
      className={mergeClassName(
        'flex w-full border border-custom-gray_500 bg-custom-white_100',
        className
      )}
    >
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
            isEditable={isEditable}
          />
        ) : null}
      </AnimatePresence>
      {isEditable ? (
        <AnimatePresence>
          {stepFour.length ? (
            <DepartmentsContainer
              items={stepFour}
              title={`${dataList.department} (${stepFour.length} members)`}
              step="person"
              clickHandler={clickHandler}
            />
          ) : null}
        </AnimatePresence>
      ) : null}
    </div>
  );
};

export default DepartmentOfficesCascade;
