import MoreFile from '@/common/components/icons/MoreFile';
// import { customThemeColor } from '@/common/utils';
import React from 'react';

function Action() {
  return (
    <div className="flex items-center gap-x-1 px-2.5">
      {/* <button className="cursor-pointer rounded-lg px-2 py-2.5">
        <Maximize size={18} className="transition-all hover:scale-125" />
      </button> */}
      <button className="cursor-pointer rounded-lg px-2 py-2.5">
        <MoreFile size={18} />
      </button>
      {/* <div className="border-custom-gray_500 h-8  w-px border-l" />
      <button className="bg-custom-main cursor-pointer rounded-lg fill-white px-2 py-2.5">
        <Send
          size={18}
          fill={customThemeColor.white_100}
          stroke={customThemeColor.white_100}
          className="transition-all hover:scale-125"
        />
      </button> */}
    </div>
  );
}

export default Action;
