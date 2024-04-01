import CustomButton from '@/common/components/CustomButton';
import Title from '@/common/components/Title';
import { ArrowRight, DocumentUpload, Folder } from '@/common/components/icons';
import React from 'react';

const RandomDocument = () => {
  return (
    <div className="flex gap-x-2.5 p-2.5">
      <div className="rounded-10 self-start bg-custom-gray_100 p-2.5 text-custom-main">
        <Folder size={18} />
      </div>
      <div className="flex flex-col">
        <Title type="sm" className="font-medium">
          Requirments.pdf
        </Title>
        <Title type="sm" className="font-medium text-custom-gray_600">
          20-10-2022
        </Title>
      </div>
    </div>
  );
};

function RecentUpload() {
  return (
    <div className="flex w-full flex-col rounded bg-white text-gray-400 shadow-md">
      <div className="flex w-full items-center justify-between border-b border-custom-gray_500 py-2 pl-1 pr-2.5">
        <CustomButton
          type="text"
          size="small"
          className="flex items-center gap-x-1"
        >
          <Title type="sm" className="font-semibold text-custom-gray_200">
            Recent uploads
          </Title>
          <ArrowRight />
        </CustomButton>

        <CustomButton
          size="small"
          type="text"
          icon={<DocumentUpload />}
          description="Upload"
          borderLeft
        />
      </div>
      <div className="no-scrollbar size-full max-h-[118px] space-y-0.5 overflow-y-scroll">
        <RandomDocument />
        <RandomDocument />
      </div>
    </div>
  );
}

export default RecentUpload;
