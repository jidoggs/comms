import React from 'react';
import { useRouter } from 'next/navigation';
import CustomButton from '@/common/components/CustomButton';
import Archive from '@/common/components/icons/Archive';
import Send from '@/common/components/icons/Send';

function TableActions() {
  const router = useRouter();
  const clickHandler = () => {
    router.push('/app/correspondence/export_of_brewery_products');
  };
  return (
    <div className="flex items-center gap-x-2.5">
      <CustomButton
        icon={<Archive />}
        type="primary"
        size="small"
        className="!border !border-custom-gray_400"
      />
      <CustomButton
        icon={<Send />}
        type="primary"
        size="small"
        className="!border !border-custom-gray_400"
        onClick={clickHandler}
      >
        Push
      </CustomButton>
    </div>
  );
}

export default TableActions;
