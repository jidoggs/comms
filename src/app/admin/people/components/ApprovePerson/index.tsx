import usePeople from '@/app/admin/hooks/usePeople';
import React, { useContext } from 'react';
import { PeopleDataContext } from '../../service-context/PeopleListContextWrapper';
import { TableRowActionContext } from '../TableRowAction';
import ApproveModalContent from '@/common/components/ApproveModalContent';
type Props = {
  handleCancel: () => void;
  isModalOpen: boolean;
  type: 'row' | 'detail';
};

function ApprovePerson({ handleCancel, isModalOpen, type }: Props) {
  const contextInfo = useContext(PeopleDataContext);
  const userDetail = contextInfo?.userDetail;
  const rowDetail = useContext(TableRowActionContext)?.data;

  const { approveRequestSwr } = usePeople({
    can_approve: true,
    // status: contextInfo?.currentTab,
  });

  const userInfo = type === 'row' ? rowDetail : userDetail;

  const handleApproveRequest = () => {
    const data = {
      user_id: userInfo?._id,
      email: userInfo?.email,
    };
    approveRequestSwr
      .trigger({
        data,
        type: 'post',
      })
      .finally(handleCancel);
  };
  return (
    <ApproveModalContent
      handleCancel={handleCancel}
      isModalOpen={isModalOpen}
      handleSubmit={handleApproveRequest}
      isLoading={approveRequestSwr.isMutating}
    />
  );
}

export default ApprovePerson;
