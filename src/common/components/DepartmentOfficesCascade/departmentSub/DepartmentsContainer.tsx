'use client';
import React from 'react';
import DepartmentItem from './DepartmentItem';
import { ArrowRight } from '@/common/components/icons';
import Title from '../../Title';

type Props = {
  items: any[];
  itemClickHandler: (dep: any, step: number) => void; //eslint-disable-line
  step: number;
  selectedItem: string;
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  parastatal: string;
  setParastatal: React.Dispatch<React.SetStateAction<string>>;
  office: string;
  setOffice: React.Dispatch<React.SetStateAction<string>>;
  // setCurrentStep: (step: number) => void;
};

function DepartmentsContainer({
  items,
  itemClickHandler,
  step,
  // selectedItem,
  setSelectedItem,
  parastatal,
  setParastatal,
  office,
  setOffice,
  // currentStep,
  setCurrentStep,
}: Props) {
  // console.log('items', items);
  // console.log('selectedItem', selectedItem);

  return (
    <div className="flex flex-col gap-y-2.5 border-r border-custom-gray_500 bg-custom-white_100">
      {step === 1 && (
        <Title className="flex h-12 items-center border-b border-custom-gray_500 bg-custom-gray_900 px-3 py-2.5">
          Parastatals
        </Title>
      )}
      {step === 2 && (
        <Title className="flex h-12 items-center border-b border-custom-gray_500 bg-custom-gray_900 px-3 py-2.5">
          {parastatal}
        </Title>
      )}
      {step === 3 && (
        <Title className="flex h-12 items-center border-b border-custom-gray_500 bg-custom-gray_900 px-3 py-2.5">
          {office}
        </Title>
      )}
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
            setSelectedItem={setSelectedItem}
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
