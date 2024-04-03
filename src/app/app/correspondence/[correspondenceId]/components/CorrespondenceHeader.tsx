import React, { useContext } from 'react';
import { Avatar } from 'antd';
import { useRouter } from 'next/navigation';
import CustomButton from '@/common/components/CustomButton';
import Title from '@/common/components/Title';
import { DetailContext } from '../PageContent';
import { BackwardArrow, Dot, InfoCircle } from '@/common/components/icons';

const CorrespondenceHeader = () => {
  const router = useRouter();
  const detailsData = useContext(DetailContext);
  return (
    <div className="my-1.5 flex flex-row items-center justify-between px-5">
      <div className="flex flex-row items-center gap-3">
        <CustomButton
          description="Back"
          type="primary"
          size="small"
          icon={<BackwardArrow size={18} />}
          onClick={() => router.back()}
          className="border !border-custom-gray_400"
          descriptionPlacement="bottom"
        />
        <Title type="h1" className="text-lg leading-[22.77px] text-custom-main">
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
              className="!border-full !border-1 !border-solid !border-black"
            />
          </div>
        </div>
        <CustomButton
          description="Correspondence"
          type="text"
          size="small"
          icon={<InfoCircle size={18} />}
          onClick={detailsData?.openDetailsHandler}
        />
      </div>
    </div>
  );
};

export default CorrespondenceHeader;
