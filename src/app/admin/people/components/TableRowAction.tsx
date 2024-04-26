import React, { useState } from 'react';
import { Dropdown, MenuProps } from 'antd';
import CustomButton from '@/common/components/CustomButton';
import { CloseCircled, MoreFile, TickCircle } from '@/common/components/icons';
import { iHandleClick } from '../types';

type Props = {
  data: any;
};

export const TableRowActionContext = React.createContext<Props | null>(null);

const initialModalState = {
  approve: false,
  decline: false,
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
          <TickCircle size="18" fill="transparent" />
        </span>
      ),
      label: 'Approve',
      onClick: () => showModal('approve'),
    },
    {
      key: '2',
      icon: (
        <span className="text-custom-red_100">
          <CloseCircled size="18" />
        </span>
      ),
      label: 'Decline',
      onClick: () => showModal('decline'),
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
      </div>
    </TableRowActionContext.Provider>
  );
}

export default TableRowAction;
