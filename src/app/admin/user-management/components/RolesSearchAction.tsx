import CustomButton from '@/common/components/CustomButton';
import CustomInput from '@/common/components/CustomInput';
import Add from '@/common/components/icons/Add';
import File from '@/common/components/icons/File';
import Search from '@/common/components/icons/Search';
import React from 'react';

type Props = {
  handleAddRole: () => void;
};

function RolesSearchAction({ handleAddRole }: Props) {
  return (
    <div className="flex flex-row items-center gap-2">
      <CustomInput
        size="middle"
        className=" text-custom-gray_600"
        prefix={<Search />}
      />
      <CustomButton
        type="default"
        icon={<Add />}
        size="small"
        onClick={handleAddRole}
      >
        Add Role
      </CustomButton>
      <CustomButton
        type="text"
        className="!bg-custom-white_100"
        icon={<File />}
        size="small"
      />
    </div>
  );
}

export default RolesSearchAction;
