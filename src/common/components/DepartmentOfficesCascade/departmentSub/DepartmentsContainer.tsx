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
  selectedItem,
  setSelectedItem,
  parastatal,
  setParastatal,
  office,
  setOffice,
}: Props) {
  return (
    <div className="flex flex-col gap-y-2.5 border-r border-custom-gray_500 bg-custom-white_100">
      <Title className="flex h-12 items-center border-b border-custom-gray_500 bg-custom-gray_900 px-3 py-2.5">
        {step === 1 ? 'Parastatals' : selectedItem}
        {/* {
          step === 1
            ? 'Parastatals'
            : step === 2
              ? parastatal // Show the selected parastatal
              : office // Show the selected office
        } */}
      </Title>
      {items.map((item, index) => {
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
