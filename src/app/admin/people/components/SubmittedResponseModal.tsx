import CustomButton from '@/common/components/CustomButton';
import CustomModal from '@/common/components/CustomModal';
import Title from '@/common/components/Title';
import { Send } from '@/common/components/icons';
import { iHandleClick } from '../types';

type SubmittedResponseModalProps = {
  isModalOpen: boolean;
  handleCancel: iHandleClick;
};

const SubmittedResponseModal = ({
  isModalOpen,
  handleCancel,
}: SubmittedResponseModalProps) => {
  return (
    <CustomModal width={320} open={isModalOpen} onCancel={handleCancel}>
      <div className="flex flex-col items-center gap-2 text-base text-custom-main">
        <Send size={90} />
        <Title semibold className="text-lg text-custom-main">
          Submitted
        </Title>
        <p className="">Message is on it’s way</p>
        <p>The user will receive your message</p>
        <hr className="border-custom-gray_100" />
        <CustomButton size="small" onClick={handleCancel}>
          Done
        </CustomButton>
        <small>Recall message</small>
      </div>
    </CustomModal>
  );
};

export default SubmittedResponseModal;
