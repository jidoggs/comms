import React, { useContext } from 'react';
import DeclineRequestModalContent from '../DeclineRequestModalContent';
import usePeople from '@/app/admin/hooks/usePeople';
import { TableRowActionContext } from '../TableRowAction';
import { PeopleDataContext } from '../../service-context/PeopleListContextWrapper';

type Props = {
  handleCancel: () => void;
  isModalOpen: boolean;
  showModal: (arg: 'approve' | 'decline' | 'success') => void;
  type: 'row' | 'detail';
};

function DeclinePerson({ handleCancel, isModalOpen, showModal, type }: Props) {
  const rowDetail = useContext(TableRowActionContext)?.data;
  const userDetail = useContext(PeopleDataContext)?.userDetail;
  const { declineRequestSwr } = usePeople({ can_decline: true });

  const userInfo = type === 'row' ? rowDetail : userDetail;

  const onFinishHandler = () => {
    const data = {
      user_id: userInfo?._id,
      email: userInfo?.email,
    };
    declineRequestSwr
      .trigger({ data })
      .then(() => showModal('success'))
      .catch(handleCancel);
  };
  return (
    <DeclineRequestModalContent
      handleCancel={handleCancel}
      isModalOpen={isModalOpen}
      submitHandler={onFinishHandler}
      loading={declineRequestSwr.isMutating}
    />
  );
}

export default DeclinePerson;
