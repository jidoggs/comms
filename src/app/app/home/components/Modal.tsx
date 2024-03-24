import React, { useState } from 'react';
import { Modal } from 'antd';

type CreateCorrespondenceModalProps = {
  title: string;
  Icon: React.ReactElement;
  children?: React.ReactNode;
};

const CreateCorrespondenceModal: React.FC<CreateCorrespondenceModalProps> = ({
  Icon,
  title,
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div role="button" tabIndex={0} onKeyDown={showModal} onClick={showModal}>
        {Icon}
      </div>
      <Modal
        title={title}
        width={400}
        footer={null}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {children}
      </Modal>
    </>
  );
};

export default CreateCorrespondenceModal;
