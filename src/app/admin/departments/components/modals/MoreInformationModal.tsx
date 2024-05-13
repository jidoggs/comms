import React, { createContext, useState } from 'react';
import CustomModal from '@/common/components/CustomModal';
import CustomTab, { ItemProps } from '@/common/components/CustomTab';
import Information from '../forms/UpdateDetail/Form';
import Members from '../forms/UpdateDetail/Members';
import BackwardArrow from '@/common/components/icons/BackwardArrow';
import { Mutate } from '@/types';

type Props = {
  isModalOpen: boolean;
  isUpdating?: boolean;
  isDeleting?: boolean;
  handleCancel?: VoidFunction; //eslint-disable-line
  handleUpdate?: Mutate; //eslint-disable-line
  handleDelete?: Mutate; //eslint-disable-line
  data: any;
  type: 'parastatal' | 'office' | 'department';
};

export const MoreInfoContext = createContext<Props | null>(null);

export const tabItemList: ItemProps = [
  {
    key: 'details',
    label: 'Details',
  },
  {
    key: 'members',
    label: 'Members',
  },
];

function MoreInformationModal(props: Props) {
  const { handleCancel, isModalOpen } = props;
  const [currentTab, setCurrentTab] = useState('details');

  const handleTabChange = (state: string) => {
    setCurrentTab(state);
  };

  return (
    <MoreInfoContext.Provider value={{ ...props }}>
      <CustomModal
        width={'100%'}
        open={isModalOpen}
        onCancel={handleCancel}
        destroyOnClose
        style={{ top: 0, bottom: 0, padding: 0 }}
        classNames={{
          header: '!m-0 !p-0 absolute',
          content: '[&_.ant-modal-close]:!hidden',
        }}
        title={
          <button
            onClick={handleCancel}
            className="flex items-center gap-x-1 rounded-10 border-2 border-custom-gray_400 bg-custom-gray_900 px-3 py-2"
          >
            <BackwardArrow size={18} />
            <span className="text-sm leading-[16.94px]">Back</span>
          </button>
        }
        key={props.data?._id}
      >
        <CustomTab
          onChange={handleTabChange}
          defaultKey={currentTab}
          items={tabItemList}
          className="flex items-center justify-center !border-none [&_.ant-tabs-nav-wrap]:!border-none"
        />
        {currentTab === 'details' ? <Information /> : <Members />}
      </CustomModal>
    </MoreInfoContext.Provider>
  );
}

export default MoreInformationModal;
