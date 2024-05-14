import React, { useContext } from 'react';
import CustomInput from '@/common/components/CustomInput';
import Search from '@/common/components/icons/Search';
import { CorrespondeceListContext } from '../service-context/CorrespondeceListContextWrapper';
import CreateCorrespondence from '../../components/actions/CreateCorrespondence';

function TableActions() {
  const contextInfo = useContext(CorrespondeceListContext);

  return (
    <div className="flex items-center gap-x-2.5">
      <CustomInput
        prefix={<Search className="text-custom-gray_400" />}
        placeholder="Search"
        className="border-custom-gray_400 bg-custom-white_100 placeholder:text-custom-gray_400"
        value={contextInfo?.searchValue}
        onChange={contextInfo?.searchHandler}
      />
      <CreateCorrespondence />
    </div>
  );
}

export default TableActions;
