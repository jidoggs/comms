'use client';
import { Cascader } from 'antd';
import React from 'react';
import { governmentData } from './data';

interface Props {
  selectedDepartment: string;
  setSelectedDepartment: React.Dispatch<React.SetStateAction<string>>;
  departmentData?: string[];
}
const DepartmentOfficesCascade = ({
  // selectedOffice,
  setSelectedDepartment,
  departmentData,
}: Props) => {
  const onChange = (value: any, selectedOptions: any) => {
    // eslint-disable-next-line no-console
    // setSelectedOffice(selectedOptions.map((option: string) => option.label));
    // console.log('value', value);
    if (selectedOptions && selectedOptions.length > 0) {
      const lastOption = selectedOptions[selectedOptions.length - 1];
      setSelectedDepartment(lastOption.label);
    }
  };

  return (
    <div className="w-full py-2">
      <div className="flex w-full flex-row overflow-scroll rounded-lg border border-custom-gray_500">
        <Cascader.Panel
          options={departmentData || governmentData}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default DepartmentOfficesCascade;
