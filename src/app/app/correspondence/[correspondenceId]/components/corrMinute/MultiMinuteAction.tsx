import React, { useContext } from 'react';
import { DetailContext } from '../../service-context/DetailContextWrapper';
import Title from '@/common/components/Title';
import CustomButton from '@/common/components/CustomButton';
import { Send } from '@/common/components/icons';

function MultiMinuteAction() {
  const detailContextInfo = useContext(DetailContext);
  return (
    <div className="flex w-full items-center justify-center gap-x-10 rounded-md bg-white p-2.5 drop-shadow-chat">
      <Title className="rounded-10 border border-custom-gray_500 p-2">
        {detailContextInfo?.multiSelect.selectedItems.length}{' '}
        <span>selected items</span>
      </Title>
      <CustomButton
        icon={<Send size={18} />}
        className={{
          container: 'border-l border-custom-gray_500 pl-10',
        }}
        size="small"
        // onClick={detailContextInfo?.turnMultiSelectOFFHandler}
      >
        Push
      </CustomButton>
    </div>
  );
}

export default MultiMinuteAction;
