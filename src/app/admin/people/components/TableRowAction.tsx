import dynamic from 'next/dynamic';
import React, { useContext, useState } from 'react';
import { MenuProps } from 'antd/es/menu';
import usePeople from '../../hooks/usePeople';
import { useSession } from '@/common/hooks';
import { PeopleDataContext } from '../service-context/PeopleListContextWrapper';
import CustomButton from '@/common/components/CustomButton';
import CloseCircled from '@/common/components/icons/CloseCircled';
import MoreFile from '@/common/components/icons/MoreFile';
import TickCircle from '@/common/components/icons/TickCircle';
import { User, iHandleClick } from '../types';

const Dropdown = dynamic(() => import('antd/es/dropdown/dropdown'));

const DeclineRequestModalContent = dynamic(
  () => import('./DeclineRequestModalContent')
);
const SubmittedResponseModal = dynamic(
  () => import('./SubmittedResponseModal')
);
const ApproveModalContent = dynamic(
  () => import('../../../../common/components/ApproveModalContent')
);

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
  const [isModalOpen, setIsModalOpen] = useState(initialModalState);
  const { isBasicUser } = useSession();
  const contextInfo = useContext(PeopleDataContext);

  const showModal = (val: keyof typeof initialModalState) => {
    setIsModalOpen({ ...initialModalState, [val]: true });
  };

  const handleCancel = () => {
    setIsModalOpen({ ...initialModalState });
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

  const { approveRequestSwr } = usePeople({
    can_approve: !isBasicUser,
    status: contextInfo?.currentTab,
  });

  const handleApproveRequest = () => {
    approveRequestSwr
      .trigger({
        data: { user_id: data._id, email: data.email },
        type: 'post',
      })
      .finally(handleCancel);
  };

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
          <DeclineRequestModalContent
            handleCancel={handleCancel}
            isModalOpen={isModalOpen.decline}
            setIsSuccessModalOpen={showModal}
          />
          <SubmittedResponseModal
            handleCancel={handleCancel}
            isModalOpen={isModalOpen.success}
          />
          <ApproveModalContent
            handleCancel={handleCancel}
            isModalOpen={isModalOpen.approve}
            handleSubmit={handleApproveRequest}
            isLoading={approveRequestSwr.isMutating}
          />
        </div>
      </div>
    </TableRowActionContext.Provider>
  );
}

export default TableRowAction;
