import React, { useState } from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';
import CustomButton from '@/common/components/CustomButton';
import Title from '@/common/components/Title';
import FieldRow from '../../../components/FieldRow';
import DeleteModal from '../modals/DeleteModal';
import { Close, Delete, Edit2, Tick } from '@/common/components/icons';
import { User } from '../../types';

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
    <div className="flex h-[calc(100vh-40px)] w-full justify-center pb-8">
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
              <div
                className={`size-2 rounded ${userData?.active ? 'bg-custom-green_100' : 'bg-custom-red_100'}`}
              />
              <p>{userData?.active ? 'Active' : 'In-Active'}</p>
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
          value={`${userData?.firstname || ''} ${userData?.surname || ''}`}
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
          value={(userData?.phone as string) || 'N/A'}
          isEdit={isEdit}
        />
        <FieldRow
          title="Date Added"
          value={dayjs(userData?.created_at).format('DD-MMM-YYYY')}
        />
        <hr />
        <FieldRow
          title="Last Active"
          value={dayjs(userData?.last_seen).format('DD-MMM-YYYY')}
        />
        <div>
          <Title className="my-2 font-semibold text-custom-gray_600">
            Office
          </Title>
          <FieldRow title="Title" value={userData?.title} isEdit={isEdit} />
          <FieldRow
            title="Department"
            value={userData?.department?.[0]?.name || 'N/A'}
          />
          <hr />
          <FieldRow
            title="Parastatal"
            value={(userData?.parastatal?.name as string) || 'N/A'}
          />
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
