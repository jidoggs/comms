import React, { useContext } from 'react';

import CustomInput from '@/common/components/CustomInput';
import CustomButton from '@/common/components/CustomButton';
import Search from '@/common/components/icons/Search';
import Document from '@/common/components/icons/Document';
import { UserMgmtDataContext } from '../service-context/UserMgmtContextWrapper';

function UserTabActions() {
  const contextInfo = useContext(UserMgmtDataContext);
  return (
    <div className="flex items-center gap-x-2.5">
      <CustomInput
        prefix={<Search className="text-custom-gray_400" />}
        placeholder="Search"
        className="border-custom-gray_400 bg-custom-white_100 placeholder:text-custom-gray_400"
        value={contextInfo?.search}
        onChange={contextInfo?.searchHandler}
      />
      <CustomButton
        type="primary"
        icon={<Document size={18} />}
        size="small"
        description="Download"
      />
    </div>
  );
}

export default UserTabActions;
