/* eslint-disable no-unused-vars */
import { BackwardArrow } from '@/common/components/icons';
import Document from '@/common/components/icons/Document';
import Title from '@/common/components/Title';
import { Tooltip } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  setOpenCorrespondence?: any;
};

const CorrespondenceHeader = ({ setOpenCorrespondence }: Props) => {
  const router = useRouter();
  return (
    <div className="my-3 flex flex-row items-center justify-between px-5">
      <div className="flex flex-row items-center gap-3">
        <BackwardArrow
          size={34}
          onClick={() => router.back()}
          className="cursor-pointer"
        />
        <Title type="h1" className="text-lg leading-[22.77px] text-[#11142D]">
          Export of Brewery Products
        </Title>
      </div>
      <div className="flex flex-row items-center justify-between gap-3">
        <div className="">Time Line</div>
        <Tooltip placement="top" title={'Correspondence'} className="mx-2 my-3">
          <Document
            size={18}
            onClick={() => setOpenCorrespondence(true)}
            className="cursor-pointer"
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default CorrespondenceHeader;
