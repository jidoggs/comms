import React, { useState } from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';

import CustomButton from '@/common/components/CustomButton';
import Title from '@/common/components/Title';
import { Close, Delete, Edit2 } from '@/common/components/icons';
import Tick from '@/common/components/icons/Tick';
import FieldRow from '../../../components/FieldRow';
import { User } from '../../types';
import DeleteModal from '../modals/DeleteModal';

type UserDetailsContentProps = {
  userData: User | null;
};

const UserDetailsContent = ({ userData }: UserDetailsContentProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    if (!isEdit) {
      setIsModalOpen(true);
    }
    if (isEdit) {
      setIsEdit(!isEdit);
    }
  };

  const handleSubmit = () => null;

  return (
    <div className="flex w-full justify-center pb-8">
      <div className="w-2/4">
        <Title className="font-semibold text-custom-gray_600">Personal</Title>
        <div className="flex gap-2 py-2">
          <Image
            width={200}
            height={100}
            style={{ objectFit: 'contain' }}
            src="/images/dummyUserImg.png"
            alt=""
          />
          <div className="flex flex-col justify-end">
            <div className="flex items-center gap-1">
              <div className="size-2 rounded bg-custom-green_100" />
              <p>Active</p>
            </div>
            <div className="flex gap-2">
              <CustomButton
                type="default"
                className="!border-custom-green_100 !bg-custom-gray_100 !px-6"
                icon={
                  isEdit ? (
                    <Tick size={18} color="green" />
                  ) : (
                    <Edit2 size={18} color="green" />
                  )
                }
                size="small"
                title="Save"
                onClick={() => setIsEdit(!isEdit)}
              />
              <CustomButton
                type="default"
                className="!border-custom-red_200 !bg-custom-gray_100 !px-6"
                icon={
                  isEdit ? (
                    <Close size={32} color="red" />
                  ) : (
                    <Delete color="red" />
                  )
                }
                size="small"
                title="Delete Profile"
                onClick={handleOpenModal}
              />
            </div>
          </div>
        </div>
        <hr />
        <FieldRow
          title="Name"
          value={userData?.firstname as string}
          isEdit={isEdit}
        />
        <FieldRow
          title="Email"
          value={userData?.email as string}
          isEdit={isEdit}
        />
        <hr />
        <FieldRow
          title="Phone Number"
          value={userData?.phone as string}
          isEdit={isEdit}
        />
        <FieldRow
          title="Date Added"
          value={dayjs(userData?.date_created).format('DD-MMM-YYYY')}
        />
        <hr />
        <FieldRow
          title="Last Active"
          value={dayjs(userData?.date_created).format('DD-MMM-YYYY')}
        />
        <div>
          <Title className="my-2 font-semibold text-custom-gray_600">
            Office
          </Title>
          <FieldRow title="Title" value={userData?.title} isEdit={isEdit} />
          <FieldRow title="Department" value={userData?.department} />
          <hr />
          <FieldRow title="Parastatal" value={userData?.parastatal as string} />
        </div>
      </div>
      <DeleteModal
        warningText="Are you sure you want to delete this account?"
        isModalOpen={isModalOpen}
        handleSubmit={handleSubmit}
        deleteRoleIsMutating={false}
        handleCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default UserDetailsContent;
