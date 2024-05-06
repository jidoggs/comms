import React, { useState } from 'react';
import { Dropdown, MenuProps } from 'antd';
import CustomButton from '@/common/components/CustomButton';
import { CloseCircled, MoreFile, TickCircle } from '@/common/components/icons';
import { iHandleClick } from '../types';
import DeclineRequestModalContent from './DeclineRequestModalContent';
import SubmittedResponseModal from './SubmittedResponseModal';
import ApproveModalContent from '../../../../common/components/ApproveModalContent';
import usePeople from '../../hooks/usePeople';
import { useSession } from '@/common/hooks';

type Props = {
  data: any;
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
  });

  const { trigger: approveRequestSWRTrigger } = approveRequestSwr;

  const handleApproveRequest = () => {
    approveRequestSWRTrigger({
      data: { user_id: data?._id, email: data?.email },
      type: 'post',
    }).finally(handleCancel);
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
