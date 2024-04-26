import CustomButton from '@/common/components/CustomButton';
import { ArrowDown, MorePlain } from '@/common/components/icons';
import Title from '@/common/components/Title';
import React from 'react';

const Roles_Permissions = () => {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-10 border-b border-custom-black_200/10 p-4">
        <Title className="col-span-2 font-medium text-custom-gray_600">
          Role
        </Title>
        <Title className="col-span-8  font-medium text-custom-gray_600">
          Permissions
        </Title>
      </div>
      <div className="mt-4 grid grid-cols-10 bg-custom-white_100 p-4">
        <div className="col-span-2">Main Administrator</div>
        <div className="col-span-8 flex flex-row justify-between">
          <Title>Parastatal</Title>
          <div className="flex flex-row gap-2">
            <CustomButton
              icon={<MorePlain />}
              description="Edit"
              type="text"
              size="small"
            />
            <CustomButton
              icon={<ArrowDown />}
              description="Edit"
              type="text"
              size="small"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roles_Permissions;
