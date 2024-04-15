import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { DetailContext } from '../service-context/DetailContextWrapper';
import CustomButton from '@/common/components/CustomButton';
import Title from '@/common/components/Title';
import TimelineComponent from '@/common/components/TimelineComponent/TimelineComponent';
import { BackwardArrow, Dot, InfoCircle } from '@/common/components/icons';

const CorrespondenceHeader = () => {
  const router = useRouter();
  const detailsData = useContext(DetailContext);

  const timeline = {
    name: 'Adbul Jabar',
    office: 'HM Trade & Inv...',
    date: dayjs(new Date(), 'DD MMM YYYY, h:mmA'),
    img: '/images/user2.jpeg',
  };

  return (
    <div className="my-1.5 flex items-center justify-between px-5">
      <div className="flex items-center gap-3">
        <CustomButton
          description="Back"
          type="primary"
          size="small"
          icon={<BackwardArrow size={18} />}
          onClick={() => router.back()}
          className="border !border-custom-gray_400"
          descriptionPlacement="bottom"
        />
        <Title tag="h1" className="text-lg leading-[22.77px]">
          Export of Brewery Products
        </Title>
      </div>
      <div className="flex items-center justify-between gap-1">
        <div className="flex gap-2">
          <Dot />
          <TimelineComponent timeline={timeline} />
        </div>
        <CustomButton
          description="Toggle detail"
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
