import React, { useContext } from 'react';
import { UserMgmtDataContext } from '../service-context/UserMgmtContextWrapper';
import CustomButton from '@/common/components/CustomButton';
import CustomInput from '@/common/components/CustomInput';
import Add from '@/common/components/icons/Add';
import File from '@/common/components/icons/File';
import Search from '@/common/components/icons/Search';

type Props = {
  handleAddRole: () => void;
};

function RolesSearchAction({ handleAddRole }: Props) {
  const contextInfo = useContext(UserMgmtDataContext);

  // console.log('contextInfo.search', contextInfo?.search);

  return (
    <div className="flex flex-row items-center gap-2">
      <CustomInput
        prefix={<Search className="text-custom-gray_400" />}
        placeholder="Search"
        className="border-custom-gray_400 bg-custom-white_100 placeholder:text-custom-gray_400"
        value={contextInfo?.search}
        onChange={contextInfo?.searchHandler}
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
