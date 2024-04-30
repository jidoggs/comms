import React, { useState } from 'react';
import { Dropdown, MenuProps } from 'antd';
import AddModal from '../../../../app/admin/departments/components/modals/AddModal';
import InvitePersonModal from '@/app/admin/people/components/InvitePerson/Modal';
import CustomButton from '@/common/components/CustomButton';
import {
  Building,
  InfoCircle,
  MoreFile,
  UserAdd,
} from '@/common/components/icons';
import { Mutate } from '@/types';
import MoreInformationModal from '@/app/admin/departments/components/modals/MoreInformationModal';

const initialModalState = {
  add: false,
  invite: false,
  details: false,
};

type Props = {
  addTrigger?: Mutate;
  otherAddData?: Record<string, any>;
  otherInviteData?: Record<string, any>;
  addIsLoading?: boolean;
  inviteTrigger?: Mutate;
  inviteIsLoading?: boolean;
  acceptedFeature: ('add' | 'invite' | 'details')[];
  title?: {
    parent?: 'parastatal' | 'office' | 'department';
    current?: 'parastatal' | 'office' | 'department' | 'member';
  };
  moreData?: any;
  updateTrigger?: Mutate;
  updateIsLoading?: boolean;
  deleteTrigger?: Mutate;
  deleteIsLoading?: boolean;
};

function SectionMoreOptions({
  addIsLoading,
  addTrigger,
  otherAddData,
  otherInviteData,
  inviteTrigger,
  inviteIsLoading,
  acceptedFeature,
  title,
  moreData,
  deleteIsLoading,
  deleteTrigger,
  updateIsLoading,
  updateTrigger,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(initialModalState);

  const showModal = (val: keyof typeof initialModalState) => {
    setIsModalOpen({ ...initialModalState, [val]: true });
  };

  const handleClose = () => {
    setIsModalOpen({ ...initialModalState });
  };

  const addSubmitHandler = (values: any) => {
    const data = { ...otherAddData, ...values };
    if (!addTrigger) return;
    addTrigger({ data, type: 'post' }).finally(handleClose);
  };

  const inviteSubmitHandler = (values: any) => {
    const data = { ...otherInviteData, ...values };
    if (!inviteTrigger) return;
    inviteTrigger({ data, type: 'post' }).finally(handleClose);
  };

  const labelHandler = (task: string, current?: string, parent?: string) => {
    return (
      task +
      `${current && parent ? ` a new ${current} to ${parent}` : ` ${current}`}`
    );
  };

  const items: MenuProps['items'] = [
    {
      key: 'add',
      icon: (
        <span className="">
          <Building size="18" />
        </span>
      ),
      label: labelHandler('Add', title?.current, title?.parent),
      onClick: () => showModal('add'),
    },
    {
      key: 'invite',
      icon: (
        <span className="">
          <UserAdd size="18" />
        </span>
      ),
      label: labelHandler('Add person(s) to', title?.parent),
      onClick: () => showModal('invite'),
    },
    {
      key: 'details',
      icon: (
        <span className="">
          <InfoCircle size="18" />
        </span>
      ),
      label: labelHandler('View details of', title?.parent),
      className: 'border-t !rounded-t-none',
      onClick: () => showModal('details'),
    },
  ].filter((itm: any) => acceptedFeature.includes(itm.key));

  return (
    <>
      <Dropdown menu={{ items }} placement="bottom" className="flex h-auto">
        <CustomButton
          className="invisible group-hover/title:visible"
          size="small"
          type="text"
          icon={<MoreFile />}
        />
      </Dropdown>
      {acceptedFeature.includes('add') ? (
        <AddModal
          handleCancel={handleClose}
          handleSubmit={addSubmitHandler}
          isModalOpen={isModalOpen.add}
          isLoading={addIsLoading}
          isParastatal={title?.current === 'parastatal'}
        />
      ) : null}
      {acceptedFeature.includes('invite') ? (
        <InvitePersonModal
          handleCancel={handleClose}
          handleSubmit={inviteSubmitHandler}
          isModalOpen={isModalOpen.invite}
          isLoading={inviteIsLoading}
        />
      ) : null}
      {acceptedFeature.includes('details') ? (
        <MoreInformationModal
          handleCancel={handleClose}
          isModalOpen={isModalOpen.details}
          data={moreData}
          type={title?.parent || 'parastatal'}
          handleDelete={deleteTrigger}
          isDeleting={deleteIsLoading}
          handleUpdate={updateTrigger}
          isUpdating={updateIsLoading}
        />
      ) : null}
    </>
  );
}

export default SectionMoreOptions;
