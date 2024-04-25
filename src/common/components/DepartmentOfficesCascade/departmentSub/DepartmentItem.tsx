/* eslint-disable no-unused-vars */
import React, { ReactNode } from 'react';
import { mergeClassName } from '@/common/utils';
import { OfficeProps, ParastatalProps } from '../data';

interface Props
  extends React.InputHTMLAttributes<Omit<HTMLButtonElement, 'type'>> {
  value: string;
  hasChild?: ReactNode;
  item?: any;
  itemClickHandler: (dep: any, step: number) => void; //eslint-disable-line
  // setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
  step: number;
  parastatal?: ParastatalProps;
  setParastatal?: React.Dispatch<React.SetStateAction<ParastatalProps>>;
  office?: OfficeProps;
  setOffice?: React.Dispatch<React.SetStateAction<OfficeProps>>;
  setCurrentStep?: React.Dispatch<React.SetStateAction<number>>;
}

function DepartmentItem({
  value,
  // onClick,
  datatype,
  hasChild,
  className,
  item,
  step,
  itemClickHandler,
  // setSelectedItem,
  setCurrentStep,
  // parastatal,
  // setParastatal,
  // office,
  // setOffice,
}: Props) {
  // console.log('item', item);

  const handleClick = () => {
    itemClickHandler(item, step);

    if (step === 1) {
      setCurrentStep && setCurrentStep(2);
    } else if (step === 2) {
      setCurrentStep && setCurrentStep(3);
    } else if (step === 3) {
      setCurrentStep && setCurrentStep(3);
      // setSelectedItem(item.value);
    }
    // console.log('stepping', id);
  };

  // console.log('item', item);

  return (
    <button
      datatype={datatype}
      className={mergeClassName(
        'flex min-w-[284px] items-center gap-x-1 rounded-md p-2 text-left',
        className
      )}
      // onClick={onClick}
      onClick={handleClick}
    >
      <span className="flex items-center gap-2">{value}</span>
      {hasChild}
    </button>
  );
}

export default DepartmentItem;
