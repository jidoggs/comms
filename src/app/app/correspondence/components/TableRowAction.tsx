import CustomButton from '@/common/components/CustomButton';
import { Maximize, MoreFile, Send } from '@/common/components/icons';
import React from 'react';

function TableRowAction() {
  const icon = 'transition-all hover:scale-125 group/button-hover:scale-125';
  return (
    <div className="hidden items-center gap-x-1 px-2.5 group-hover:flex">
      <CustomButton
        icon={<Maximize size={18} className={icon} />}
        description="Maximize"
        size="small"
        type="text"
      />
      <CustomButton
        icon={<MoreFile size={18} className={icon} />}
        description="View More"
        size="small"
        type="text"
      />
      <div className="h-8 w-px  border-l border-custom-gray_500" />
      <CustomButton
        icon={<Send size={18} className={icon} />}
        description="Send"
        size="small"
      />
    </div>
  );
}

export default TableRowAction;
