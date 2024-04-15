import Title from '@/common/components/Title';
import React from 'react';

interface MinuteProps {
  fileSend: any;
}

const FileMinute = ({ fileSend }: MinuteProps) => {
  return (
    <div className="flex-col items-center justify-end gap-y-5 rounded-md border border-custom-gray_500 p-2.5">
      <Title className="text-center text-black">Upload PDF in Next js</Title>
      {/* <button onClick={fileSend()}></button> */}
      <input
        type="file"
        name=""
        id=""
        onChange={(e) => fileSend(e)}
        className="w-full rounded-lg border border-black"
        prefix="Chhose File"
      />
    </div>
  );
};

export default FileMinute;
