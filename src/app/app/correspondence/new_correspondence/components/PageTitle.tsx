import CustomButton from '@/common/components/CustomButton';
import { BackwardArrow } from '@/common/components/icons';
import { useRouter } from 'next/navigation';
import React from 'react';

function PageTitle() {
  const router = useRouter();
  const clickHandler = () => {
    router.back();
  };
  return (
    <span className="flex items-center gap-x-2.5">
      <CustomButton
        size="small"
        type="primary"
        icon={<BackwardArrow />}
        onClick={clickHandler}
        className="!border !border-custom-gray_500"
      />
      <span>New correspondence</span>
    </span>
  );
}

export default PageTitle;
