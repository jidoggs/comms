import React, { useState } from 'react';
import Dropdown from 'antd/es/dropdown/dropdown';
import { MenuProps } from 'antd/es/menu';
import UserDetails from './UserDetails';
import DeleteModal from './modals/DeleteModal';
import CustomButton from '@/common/components/CustomButton';
import MoreFile from '@/common/components/icons/MoreFile';
import Edit from '@/common/components/icons/Edit';
import Delete from '@/common/components/icons/Delete';
import { iHandleClick } from '@/types';

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
  const submitHandler = () => {
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
        <UserDetails
          open={isModalOpen.edit}
          staffData={data}
          closeHandler={handleCancel}
        />
        <DeleteModal
          warningText="Are you sure you want to delete this account?"
          isModalOpen={isModalOpen.delete}
          handleSubmit={submitHandler}
          deleteRoleIsMutating={false}
          handleCancel={handleCancel}
        />
      </div>
    </TableRowActionContext.Provider>
  );
}

export default TableRowAction;
