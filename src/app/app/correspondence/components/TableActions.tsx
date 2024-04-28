import React from 'react';
import { useRouter } from 'next/navigation';
import CustomInput from '@/common/components/CustomInput';
import CustomButton from '@/common/components/CustomButton';
import { Add, Search } from '@/common/components/icons';

function TableActions() {
  const router = useRouter();
  const createNewCorrespondeceHandler = () => {
    router.push('correspondence/new_correspondence');
  };

  return (
    <div className="flex items-center gap-x-2.5">
      <CustomInput
        prefix={<Search className="text-custom-gray_400" />}
        placeholder="Search"
        className="border-custom-gray_400 bg-custom-white_100 placeholder:text-custom-gray_400"
      />
      <CustomButton
        type="primary"
        icon={<Add />}
        description="Add New Correspondence"
        onClick={createNewCorrespondeceHandler}
      />
    </div>
  );
}

export default TableActions;
