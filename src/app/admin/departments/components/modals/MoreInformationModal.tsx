import React, { createContext } from 'react';
import CustomModal from '@/common/components/CustomModal';
import Content from '../forms/UpdateDetail/Form';
import { Mutate } from '@/types';
import BackwardArrow from '@/common/components/icons/BackwardArrow';

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

function MoreInformationModal(props: Props) {
  const { handleCancel, isModalOpen } = props;
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
        }}
        title={
          <button
            onClick={handleCancel}
            className="flex items-center gap-x-1 rounded-10 border-2 border-custom-gray_400 bg-custom-gray_900 px-4 py-2.5 text-sm "
          >
            <BackwardArrow /> <span>Back</span>
          </button>
        }
      >
        <Content />
      </CustomModal>
    </MoreInfoContext.Provider>
  );
}

export default MoreInformationModal;
