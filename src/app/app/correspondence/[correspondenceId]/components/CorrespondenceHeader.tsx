import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import CustomButton from '@/common/components/CustomButton';
import Title from '@/common/components/Title';
import { DetailContext } from '../PageContent';
import { BackwardArrow, Dot, InfoCircle } from '@/common/components/icons';
import TimelineComponent from '@/common/components/TimelineComponent/TimelineComponent';
import dayjs from 'dayjs';

const CorrespondenceHeader = () => {
  const router = useRouter();
  const detailsData = useContext(DetailContext);

  const timeline = {
    name: 'Adbul Jabar',
    office: 'string',
    date: dayjs('30 Jan 2024, 4:22pm', 'DD MMM YYYY, h:mmA'),
  };

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
      <div className="flex flex-row items-center justify-between gap-1">
        <div className="flex flex-row gap-2">
          <Dot />
          <TimelineComponent timeline={timeline} />
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
