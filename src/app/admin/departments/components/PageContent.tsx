'use client';
import React from 'react';
import Title from '@/common/components/Title';
import SectionCascade from '@/common/components/SectionCascade';
import { useSectionCascade } from '@/common/hooks';
import CustomInput from '@/common/components/CustomInput';
import { Search } from '@/common/components/icons';

const PageContent = () => {
  const { clickHandler, dataList } = useSectionCascade();
  return (
    <>
      <header className="flex items-center justify-between px-5 py-3">
        <Title tag="h5" bold>
          Departments & Offices
        </Title>
        <CustomInput
          prefix={<Search className="text-custom-gray_400" />}
          placeholder="Search"
          className="!w-[160px] border-custom-gray_400 bg-custom-white_100 placeholder:text-custom-gray_400"
        />
      </header>
      {/* is-admin and group are style identifies */}
      <section className="is-admin group h-[calc(100vh-120px)] bg-custom-white_100 px-2.5">
        <SectionCascade
          className="h-full"
          showMembers
          clickHandler={clickHandler}
          dataList={dataList}
        />
      </section>
    </>
  );
};

export default PageContent;
