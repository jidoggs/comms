import CustomButton from '@/common/components/CustomButton';
import { Archive, Send } from '@/common/components/icons';
import React from 'react';

function TableActions() {
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
      >
        Push
      </CustomButton>
    </div>
  );
}

export default TableActions;
