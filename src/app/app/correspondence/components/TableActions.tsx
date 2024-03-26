import React from 'react';
import CustomInput from '@/common/CustomInput';
import { Add, Search } from '@/common/components/icons';
import CustomButton from '@/common/components/CustomButton';

function TableActions() {
  return (
    <div className="flex items-center gap-x-2.5">
      <CustomInput
        prefix={<Search className="text-custom-gray_400" />}
        placeholder="Search"
        className={{
          input:
            'border-custom-gray_400 bg-custom-white_100 placeholder:text-custom-gray_400',
        }}
      />
      <CustomButton
        type="primary"
        icon={<Add />}
        description="Add New Correspondence"
      />
    </div>
  );
}

export default TableActions;
