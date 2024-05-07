/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
'use client';
import React, { useState } from 'react';
import CustomButton from '@/common/components/CustomButton';
import Title from '@/common/components/Title';
import CustomModal from '@/common/components/CustomModal';
import Link from '@/common/components/icons/Link';

const Delete = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const submitHandler = (value: any) => {
    console.log(value); //eslint-disable-line
  };

  return (
    <>
      <CustomButton
        size="small"
        type="text"
        // icon={
        //   <Building
        //     size={18}
        //     className={typeof className === 'string' ? '' : className?.icon}
        //   />
        // }
        onClick={showModal}
      >
        Delete
      </CustomButton>
      <CustomModal
        width={500}
        title={
          <div className="flex items-center justify-between">
            <Title tag="h2">Add</Title>
            <div className="flex items-center gap-x-2">
              <span className="text-custom-purple_100">
                <Link size={20} />
              </span>
              <Title tag="span" className="text-custom-purple_100">
                copy link
              </Title>
            </div>
          </div>
        }
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <Title>Delete Handler</Title>
        {/* <AddForm onFinish={submitHandler} /> */}
      </CustomModal>
    </>
  );
};

export default Delete;
