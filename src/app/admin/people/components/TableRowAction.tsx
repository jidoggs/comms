import dynamic from 'next/dynamic';
import React, { useContext } from 'react';
import { MenuProps } from 'antd/es/menu';
import CustomButton from '@/common/components/CustomButton';
import CloseCircled from '@/common/components/icons/CloseCircled';
import MoreFile from '@/common/components/icons/MoreFile';
import TickCircle from '@/common/components/icons/TickCircle';
import { User, iHandleClick } from '@/types';
import useModalState from '@/common/hooks/useModalState';
import { PeopleDataContext } from '../service-context/PeopleListContextWrapper';

const Dropdown = dynamic(() => import('antd/es/dropdown/dropdown'));

const DeclinePerson = dynamic(() => import('./DeclinePerson'));
const SubmittedResponseModal = dynamic(
  () => import('./SubmittedResponseModal')
);
const ApprovePerson = dynamic(() => import('./ApprovePerson'));

type Props = {
  data: User;
};

export const TableRowActionContext = React.createContext<Props | null>(null);

const initialModalState = {
  approve: false,
  decline: false,
  success: false,
};

function TableRowAction({ data }: Props) {
  const contextInfo = useContext(PeopleDataContext);
  const { handleCancel, isModalOpen, showModal } =
    useModalState(initialModalState);

  const clickHandler: iHandleClick = (e) => {
    e.stopPropagation();
  };

  const items: MenuProps['items'] = [
    {
      key: 'approve',
      icon: (
        <span className="text-custom-green_100">
          <TickCircle size="18" fill="transparent" />
        </span>
      ),
      label: 'Approve',
      onClick: () => showModal('approve'),
    },
    {
      key: 'decline',
      icon: (
        <span className="text-custom-red_100">
          <CloseCircled size="18" />
        </span>
      ),
      label: 'Decline',
      onClick: () => showModal('decline'),
    },
  ].filter((itm) =>
    contextInfo?.currentTab === 'pending'
      ? false
      : (itm.key !== 'approve' && contextInfo?.currentTab === 'approved') ||
        (itm.key !== 'decline' && contextInfo?.currentTab === 'declined')
  );

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
        <div>
          <DeclinePerson
            handleCancel={handleCancel}
            isModalOpen={isModalOpen.decline}
            showModal={showModal}
            type="row"
          />
          <SubmittedResponseModal
            handleCancel={handleCancel}
            isModalOpen={isModalOpen.success}
          />
          <ApprovePerson
            handleCancel={handleCancel}
            isModalOpen={isModalOpen.approve}
            type="row"
          />
        </div>
      </div>
    </TableRowActionContext.Provider>
  );
}

export default TableRowAction;
