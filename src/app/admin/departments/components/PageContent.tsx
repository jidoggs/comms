'use client';
import React, { useState } from 'react';
import Title from '@/common/components/Title';
import DepartmentOfficesCascade from '@/common/components/DepartmentOfficesCascade/DepartmentOfficesCascade';

const PageContent = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  return (
    <div className="">
      <div className="flex flex-row justify-between px-5 py-3">
        <Title tag="h5" className="font-bold">
          Departments & Offices
        </Title>
        <div>Search Bar</div>
      </div>
      <div className="h-screen bg-custom-white_100 px-3">
        <DepartmentOfficesCascade
          selectedDepartment={selectedDepartment}
          setSelectedDepartment={setSelectedDepartment}
          className="rounded-none"
        />
      </div>
    </div>
  );
};

export default PageContent;
