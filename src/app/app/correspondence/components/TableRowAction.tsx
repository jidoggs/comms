import { Maximize, MoreFile, Send } from '@/common/components/icons';
import React from 'react';

function TableRowAction() {
  return (
    <div className="hidden items-center gap-x-1 px-2.5 group-hover:flex">
      <button className="cursor-pointer rounded-lg px-2 py-2.5">
        <Maximize size={18} className="transition-all hover:scale-125" />
      </button>
      <button className="cursor-pointer rounded-lg px-2 py-2.5">
        <MoreFile size={18} />
      </button>
      <div className="h-8 w-px  border-l border-custom-gray_500" />
      <button className="cursor-pointer rounded-lg bg-custom-main px-2 py-2.5 text-custom-white_100">
        <Send size={18} className="transition-all hover:scale-125" />
      </button>
    </div>
  );
}

export default TableRowAction;
