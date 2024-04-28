import React, { useState } from 'react';
import { Dropdown, MenuProps } from 'antd';
import CustomButton from '@/common/components/CustomButton';
import { Delete, Edit, MoreFile } from '@/common/components/icons';
import { iHandleClick } from '../types';
import RegistrationDetail from '../../people/components/RegistrationDetail';
import ApproveModalContent from '../../../../common/components/ApproveModalContent';

type Props = {
  data: any;
};

export const TableRowActionContext = React.createContext<Props | null>(null);

const initialModalState = {
  edit: false,
  delete: false,
  success: false,
};

function TableRowAction({ data }: Props) {
  //eslint-disable-next-line
  const [isModalOpen, setIsModalOpen] = useState(initialModalState);

  const showModal = (val: keyof typeof initialModalState) => {
    setIsModalOpen({ ...initialModalState, [val]: true });
  };

  const handleCancel = () => {
    setIsModalOpen({ ...initialModalState });
  };

  //eslint-disable-next-line
  const submitHandler = (value: any) => {
    console.log(value); //eslint-disable-line
    handleCancel();
  };

  const clickHandler: iHandleClick = (e) => {
    e.stopPropagation();
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      icon: (
        <span className="text-custom-green_100">
          <Edit size="18" fill="transparent" />
        </span>
      ),
      label: 'Edit User Details',
      onClick: () => showModal('edit'),
    },
    {
      key: '2',
      icon: (
        <span className="text-custom-red_100">
          <Delete size="18" />
        </span>
      ),
      label: 'Delete User',
      onClick: () => showModal('delete'),
    },
  ];

  return (
    <TableRowActionContext.Provider value={{ data }}>
      {/* eslint-disable-next-line */}
      <div onClick={clickHandler}>
        <Dropdown menu={{ items }} placement="bottom" className="flex h-auto">
          <CustomButton
            className="invisible group-hover:visible"
            size="small"
            type="text"
            icon={<MoreFile />}
          />
        </Dropdown>
        <RegistrationDetail
          open={isModalOpen.edit}
          staffData={data}
          onCancel={handleCancel}
        />
        <ApproveModalContent
          isModalOpen={isModalOpen.delete}
          handleCancel={handleCancel}
        />
      </div>
    </TableRowActionContext.Provider>
  );
}

export default TableRowAction;