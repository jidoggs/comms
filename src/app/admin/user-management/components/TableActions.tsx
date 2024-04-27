import React from 'react';

import CustomInput from '@/common/components/CustomInput';
import CustomButton from '@/common/components/CustomButton';
import { Document, Search } from '@/common/components/icons';

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
        icon={<Document size={18} />}
        size="small"
        description="Download"
      />
    </div>
  );
}

export default TableActions;
