/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React from 'react';
import DepartmentItem from './DepartmentItem';
import { ArrowRight } from '@/common/components/icons';
import Title from '../../Title';
import { DepartmentProps, OfficeProps, Option, ParastatalProps } from '../data';

type Props = {
  items?: any[];
  itemClickHandler: (dep: any, step: number) => void; //eslint-disable-line
  step: number;
  currentStep?: number;
  setCurrentStep?: React.Dispatch<React.SetStateAction<number>>;
  parastatal?: ParastatalProps;
  setParastatal?: React.Dispatch<React.SetStateAction<ParastatalProps>>;
  office?: OfficeProps;
  setOffice?: React.Dispatch<React.SetStateAction<OfficeProps>>;
  department?: DepartmentProps;
  setDepartment?: React.Dispatch<React.SetStateAction<DepartmentProps>>;
  people?: Option;
  setPeople?: React.Dispatch<React.SetStateAction<any>>;
};

const HeaderClass = ({ content }: any) => {
  return (
    <div className="flex h-12 w-full items-center border-b border-custom-gray_500 bg-custom-gray_900">
      <div className=" flex flex-row px-3 py-2.5">
        <Title className="">{content}</Title>
      </div>
    </div>
  );
};

function DepartmentsContainer({
  items,
  itemClickHandler,
  step,
  parastatal,
  setParastatal,
  office,
  setOffice,
  department,
  setDepartment,
  // currentStep,
  setCurrentStep,
}: Props) {
  // console.log('items', items);
  // console.log('selectedItem', selectedItem);

  return (
    <div className="flex flex-col gap-y-2.5 border-r border-custom-gray_500 bg-custom-white_100">
      <div className="flex w-full flex-row">
        {step === 1 && <HeaderClass content={'Parastatals'} />}
        {step === 2 && (
          <HeaderClass
            content={
              <>
                {parastatal && parastatal.value} (
                {parastatal &&
                  parastatal.children &&
                  parastatal.children.length}{' '}
                Parastatals)
              </>
            }
          />
        )}
        {step === 3 && (
          <HeaderClass
            content={
              <>
                {office && office.value} (
                {office && office.children && office.children.length} offices)
              </>
            }
          />
        )}
        {step === 4 && (
          <HeaderClass
            content={
              <>
                {department && department.value} (
                {office && office.children && office.children.length} offices)
              </>
            }
          />
        )}
      </div>
      {items?.map((item, index) => {
        // console.log('item', item?.isActive);
        return (
          <DepartmentItem
            key={index}
            value={item?.value}
            item={item}
            itemClickHandler={itemClickHandler}
            className={item?.isActive ? 'm-1 bg-custom-purple_500' : ''}
            step={step}
            // setSelectedItem={setSelectedItem}
            parastatal={parastatal}
            setParastatal={setParastatal}
            office={office}
            setOffice={setOffice}
            setCurrentStep={setCurrentStep}
            hasChild={
              <span className="flex flex-1 justify-end">
                <ArrowRight size={12} />
              </span>
            }
          />
        );
      })}
    </div>
  );
}

export default DepartmentsContainer;
