/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
// import { Cascader } from 'antd';
import React, { useState } from 'react';
import { governmentData } from './data';
import DepartmentsContainer from './departmentSub/DepartmentsContainer';
import { mergeClassName } from '@/common/utils';

interface Props {
  selectedDepartment: string;
  setSelectedDepartment: React.Dispatch<React.SetStateAction<string>>;
  departmentData?: string[];
  className?: string | Partial<string>;
}
const DepartmentOfficesCascade = ({
  // selectedOffice,
  selectedDepartment,
  setSelectedDepartment,
  className,
  // departmentData,
}: Props) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [allData, setAllData] = useState(governmentData);
  const [parastatal, setParastatal] = useState<any>([]);
  const [office, setOffice] = useState<any>([]);
  const [department, setDepartment] = useState<any>([]);
  const [people, setPeople] = useState<any>([]);
  const [stepFourAllowed, setStepFourAllowed] = useState<boolean>(false);
  // const [selectedItem, setSelectedItem] = useState('Parastatals'); // Initialize selectedItem with default value

  const stepOne = allData;
  const stepTwo = allData.find((itm) => itm.isActive)?.children || [];
  const stepThree = stepTwo.find((office) => office.isActive)?.children; // Find the active office // Extract its children (departments)
  const stepFour = stepFourAllowed && stepThree && []; // Find the active office // Extract its children (departments)

  const handleClick: any = (item: any, step: number) => {
    let updatedData = [...allData];

    console.log('item', item);

    switch (step) {
      case 1:
        // Click on Parastatal
        setCurrentStep(1);
        setParastatal(item);
        setOffice('');
        setSelectedDepartment('');
        updatedData = updatedData.map((itm) => ({
          ...itm,
          isActive: itm.key === item.key,
          children: itm.children.map((child) => ({
            ...child,
            isActive: false,
          })),
        }));
        break;
      case 2:
        // Click on Office
        setCurrentStep(2);
        setOffice(item);
        setSelectedDepartment('');
        updatedData = updatedData.map((itm) => ({
          ...itm,
          children: itm.children
            .map((child) => ({
              ...child,
              isActive: child.id === item.id, // Set isActive to true for the selected office
            }))
            .map((child) => ({
              ...child,
              children: child.children.map((department) => ({
                ...department,
                isActive: false, // Set isActive to false for all departments under the selected office
              })),
            })),
        }));
        break;
      case 3:
        // Click on Department
        setCurrentStep(3);
        setDepartment(item);
        setSelectedDepartment(item);
        updatedData = updatedData.map((itm) => ({
          ...itm,
          children: itm.children.map((child) => ({
            ...child,
            children: child.children.map((grandChild) => ({
              ...grandChild,
              isActive: grandChild.id === item.id, // Set isActive to true for the selected department
            })),
          })),
        }));
        break;
      case 4:
        // Click on Person
        setCurrentStep(4);
        setPeople(item.value);
        updatedData = updatedData.map((itm) => {
          if (itm.value === parastatal.value) {
            return {
              ...itm,
              children: itm.children.map((child) => ({
                ...child,
                isActive: child.id === item.id,
              })),
            };
          }
          return itm;
        });
        break;
      default:
        break;
    }
    setAllData(updatedData);
  };

  return (
    <div className="w-full py-2">
      <div
        className={mergeClassName(
          'flex w-full flex-row overflow-scroll border border-custom-gray_500',
          className ? className : 'rounded-lg'
        )}
      >
        {stepOne.length ? (
          <DepartmentsContainer
            itemClickHandler={handleClick}
            items={allData}
            step={1}
            // selectedItem={selectedItem}
            // setSelectedItem={setSelectedItem}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            parastatal={parastatal}
            setParastatal={setParastatal}
            office={office}
            setOffice={setOffice}
            department={department}
            setDepartment={setDepartment}
          />
        ) : null}
        {stepTwo.length ? (
          <DepartmentsContainer
            itemClickHandler={handleClick}
            items={stepTwo}
            step={2}
            // selectedItem={selectedItem}
            // setSelectedItem={setSelectedItem}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            parastatal={parastatal}
            setParastatal={setParastatal}
            // office={office}
            // setOffice={setOffice}
            // setCurrentStep={setCurrentStep}
          />
        ) : null}
        {stepThree ? (
          <DepartmentsContainer
            itemClickHandler={handleClick}
            items={stepThree}
            step={3}
            // selectedItem={selectedItem}
            // setSelectedItem={setSelectedItem}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            // parastatal={parastatal}
            // setParastatal={setParastatal}
            office={office}
            setOffice={setOffice}
            // setCurrentStep={setCurrentStep}
          />
        ) : null}
        {stepFour ? (
          <DepartmentsContainer
            itemClickHandler={handleClick}
            items={stepFour}
            step={4}
            // selectedItem={selectedItem}
            // setSelectedItem={setSelectedItem}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            people={people}
            setPeople={setPeople}
            // parastatal={parastatal}
            // setParastatal={setParastatal}
            // office={office}
            // setOffice={setOffice}
            // setCurrentStep={setCurrentStep}
            department={department}
            setDepartment={setDepartment}
          />
        ) : null}
      </div>
    </div>
  );
};

export default DepartmentOfficesCascade;
