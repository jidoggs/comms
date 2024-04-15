import { File } from '@/common/components/icons';
import Image from 'next/image';
import React from 'react';

type UploadCardProps = {
  fileName: string;
};

const UploadCard = ({ fileName }: UploadCardProps) => {
  return (
    <div className="flex w-full justify-between gap-0">
      <div className="flex w-full flex-col justify-between border-l-8 bg-custom-gray_100 p-1">
        <p>Nigerian Brewries</p>
        <div className="-ml-2 flex items-center">
          <File />
          <p>{fileName}</p>
        </div>
      </div>
      <Image height={60} width={40} src="/images/letter.png" alt="document" />
    </div>
  );
};

export default UploadCard;
