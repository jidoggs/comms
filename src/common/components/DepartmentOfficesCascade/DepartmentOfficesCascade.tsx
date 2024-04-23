'use client';
// import { Cascader } from 'antd';
import React, { useState } from 'react';
import { governmentData } from './data';
import DepartmentsContainer from './departmentSub/DepartmentsContainer';

interface Props {
  selectedDepartment: string;
  setSelectedDepartment: React.Dispatch<React.SetStateAction<string>>;
  departmentData?: string[];
}
const DepartmentOfficesCascade = ({
  // selectedOffice,
  setSelectedDepartment,
  // departmentData,
}: Props) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [departments, setDepartments] = useState(governmentData);
  const [parastatal, setParastatal] = useState<string>('');
  const [office, setOffice] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState('Parastatals'); // Initialize selectedItem with default value

  const stepOne = departments;
  const stepTwo = departments.find((itm) => itm.isActive)?.children || [];
  const stepThree = stepTwo.find((office) => office.isActive)?.children; // Find the active office // Extract its children (departments)

  // const handleClick: any = (item: any, step: number) => {
  //   const temp: any[] = departments.map((itm) => {
  //     if (step === 1) {
  //       if (itm.key === item.key) {
  //         setCurrentStep(2);
  //         return {
  //           ...itm,
  //           isActive: true,
  //           children: itm.children.map((child) => ({
  //             ...child,
  //             isActive: false,
  //           })),
  //         };
  //       }
  //       return { ...itm, isActive: false };
  //     }
  //     if (step === 2) {
  //       setCurrentStep(3);
  //       return {
  //         ...itm,
  //         children: itm.children.map((child: any) => {
  //           if (child.id === item.id) {
  //             return { ...child, isActive: true };
  //           }
  //           return { ...child, isActive: false };
  //         }),
  //       };
  //     }
  //     if (step === 3) {
  //       setSelectedDepartment('');
  //       return {
  //         ...itm,
  //         children: itm.children.map((child: any) => {
  //           if (child.id === item.id) {
  //             return { ...child, isActive: true };
  //           }
  //           return { ...child, isActive: false };
  //         }),
  //       };
  //     }
  //     return itm;
  //   });

  //   setDepartments([...temp]);
  // };

  // console.log('stepOne', stepOne);
  // console.log('stepTwo', stepTwo);
  // console.log('stepThree', stepThree);

  const handleClick: any = (item: any, step: number) => {
    let updatedDepartments = [...departments];
    switch (step) {
      case 1:
        // Click on Parastatal
        setCurrentStep(1);
        setParastatal(item.value);
        setOffice('');
        setSelectedDepartment('');
        updatedDepartments = updatedDepartments.map((itm) => ({
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
        setOffice(item.value);
        setSelectedDepartment('');
        updatedDepartments = updatedDepartments.map((itm) => ({
          ...itm,
          children: itm.children.map((child) => ({
            ...child,
            isActive: child.id === item.id,
          })),
        }));
        break;
      case 3:
        // Click on Department
        setCurrentStep(3);
        setSelectedDepartment(item.value);
        updatedDepartments = updatedDepartments.map((itm) => {
          if (itm.value === parastatal) {
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
    setDepartments(updatedDepartments);
  };

  return (
    <div className="w-full py-2">
      <div className="flex w-full flex-row overflow-scroll rounded-lg border border-custom-gray_500">
        {/* <Cascader.Panel
          options={departmentData || governmentData}
          onChange={onChange}
        /> */}
        {stepOne.length ? (
          <DepartmentsContainer
            itemClickHandler={handleClick}
            items={departments}
            step={1}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            parastatal={parastatal}
            setParastatal={setParastatal}
            office={office}
            setOffice={setOffice}
          />
        ) : null}
        {stepTwo.length ? (
          <DepartmentsContainer
            itemClickHandler={handleClick}
            items={stepTwo}
            step={2}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            parastatal={parastatal}
            setParastatal={setParastatal}
            office={office}
            setOffice={setOffice}
            // setCurrentStep={setCurrentStep}
          />
        ) : null}
        {stepThree ? (
          <DepartmentsContainer
            itemClickHandler={handleClick}
            items={stepThree}
            step={3}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            parastatal={parastatal}
            setParastatal={setParastatal}
            office={office}
            setOffice={setOffice}
            // setCurrentStep={setCurrentStep}
          />
        ) : null}
      </div>
    </div>
  );
};

export default DepartmentOfficesCascade;
