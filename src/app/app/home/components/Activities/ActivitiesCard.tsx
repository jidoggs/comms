'use client';
import CustomModal from '@/common/components/CustomModal';
import Title from '@/common/components/Title';
import { Copy, Edit2, Folder, Thrash, Users } from '@/common/components/icons';
import React, { useState } from 'react';
import ActivityInformation from './ActivityInformation';
import CustomButton from '@/common/components/CustomButton';

type ActivitiesCardProps = {
  title: string;
};

const ActivitiesCard = ({ title }: ActivitiesCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const Actions = () => {
    return (
      <div className="mr-6 flex flex-1 self-start">
        <CustomButton
          icon={<Edit2 />}
          description="Edit"
          type="text"
          size="small"
        />
        <CustomButton
          icon={<Thrash />}
          description="Delete"
          type="text"
          size="small"
        />
        <CustomButton
          icon={<Copy />}
          description="Copy"
          type="text"
          size="small"
        />
      </div>
    );
  };

  return (
    <>
      <button
        // role="button"
        // tabIndex={0}
        onClick={showModal}
        // onKeyDown={showModal}
        className="group flex w-full cursor-pointer items-center gap-1 border-b border-custom-gray_500 p-2.5 hover:bg-custom-gray_100"
      >
        <Title className="rounded bg-custom-gray_900 p-0.5 leading-normal text-custom-gray_200">
          12:30pm
        </Title>
        <div className="flex items-center gap-x-2.5">
          <Folder size={22} className="text-custom-main" />
          <Title className="text-custom-gray_200">{title}</Title>
        </div>
      </button>
      <CustomModal
        title={
          <div className="flex items-center gap-x-2.5">
            <Users size={32} />{' '}
            <span className="text-wrap leading-5 ">{title}</span>
            <Actions />
          </div>
        }
        width={396}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <ActivityInformation />
      </CustomModal>
    </>
  );
};

export default ActivitiesCard;
