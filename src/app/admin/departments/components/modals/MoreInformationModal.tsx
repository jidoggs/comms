import CustomModal from '@/common/components/CustomModal';
import Content from '../forms/UpdateDetail/Form';
import React, { createContext } from 'react';
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
      >
        <Content />
      </CustomModal>
    </MoreInfoContext.Provider>
  );
}

export default MoreInformationModal;
