import React from 'react';

type FieldRowProps = {
  title?: string;
  value?: string;
};

const FieldRow = ({ title, value }: FieldRowProps) => {
  return (
    <>
      <div className="flex w-full py-2">
        <p className="w-1/4">{title}</p>
        <p className="font-semibold text-custom-main">{value} </p>
      </div>
      <hr />
    </>
  );
};

export default FieldRow;
