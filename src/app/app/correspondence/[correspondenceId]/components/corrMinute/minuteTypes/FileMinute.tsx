import React from 'react';

interface MinuteProps {
  fileSend: any;
}

const FileMinute = ({ fileSend }: MinuteProps) => {
  return (
    <div className="w-full flex-col items-center justify-end gap-5 rounded-md border !border-gray-500 p-5">
      <h1 className="text-center text-black">Upload PDF in Next js</h1>
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
