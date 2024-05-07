import React, { useContext } from 'react';
import InvitePerson from './InvitePerson';
import CustomInput from '@/common/components/CustomInput';
import CustomButton from '@/common/components/CustomButton';
import Document from '@/common/components/icons/Document';
import Search from '@/common/components/icons/Search';
import { PeopleDataContext } from '../service-context/PeopleListContextWrapper';

function TableActions() {
  const contextInfo = useContext(PeopleDataContext);
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
      <InvitePerson />
    </div>
  );
}

export default TableActions;
