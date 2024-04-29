import CustomInput from '@/common/components/CustomInput';
import React from 'react';

type FieldRowProps = {
  isEdit?: boolean;
  title?: string;
  value?: string;
};

const FieldRow = ({ title, value, isEdit, ...props }: FieldRowProps) => {
  return (
    <>
      <div className="flex w-full items-center py-2">
        <p className="w-1/4">{title}</p>
        {!isEdit ? (
          <>
            <p className="font-semibold text-custom-main">{value}</p>
            <hr className="!border-red-600" />
          </>
        ) : (
          <CustomInput
            className="!border-white !border-b-custom-gray_400 !border-r-custom-gray_400 !bg-custom-white_100 !shadow-none !outline-none !py-1"
            value={value}
            {...props}
          />
        )}
      </div>
    </>
  );
};

export default FieldRow;
