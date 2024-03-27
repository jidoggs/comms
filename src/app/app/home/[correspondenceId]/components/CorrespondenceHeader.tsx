import { BackwardArrow, Dot, InfoCircle } from '@/common/components/icons';
import Title from '@/common/components/Title';
import { Avatar, Tooltip } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  setOpenCorrespondenceDetails: React.Dispatch<React.SetStateAction<boolean>>;
};

const CorrespondenceHeader = ({ setOpenCorrespondenceDetails }: Props) => {
  const router = useRouter();
  return (
    <div className="my-2 flex flex-row items-center justify-between px-5">
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
        <div className="flex flex-row gap-2">
          <Dot />
          <div>
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              size="default"
              //   className="mr-2"
            />
          </div>
        </div>
        <Tooltip placement="top" title={'Correspondence'} className="mx-2 my-3">
          <InfoCircle
            size={18}
            onClick={() => setOpenCorrespondenceDetails(true)}
            className="cursor-pointer"
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default CorrespondenceHeader;
