import Divider from 'antd/es/divider';
import CustomButton from '@/common/components/CustomButton';
import CustomModal from '@/common/components/CustomModal';
import InfoCircle from './icons/InfoCircle';

type ApproveModalContentProps = {
  text?: string;
  isLoading?: boolean;
  isModalOpen: boolean;
  handleCancel: () => void;
  handleSubmit: () => void;
  actionText?: string;
};

const ApproveModalContent = ({
  text,
  isLoading,
  isModalOpen,
  handleCancel,
  actionText,
  handleSubmit,
}: ApproveModalContentProps) => {
  const cancelHandler = () => {
    if (isLoading) return;
    handleCancel();
  };
  return (
    <CustomModal width={320} open={isModalOpen} onCancel={cancelHandler}>
      <div className="flex flex-col items-center gap-2 text-base text-custom-gray_200">
        <InfoCircle size={90} />

        <p className="text-center">
          {text || 'Are you sure you want to approve this registration?'}
        </p>
        <Divider className="!border-custom-gray_500" />
        <div className="-mt-3 flex w-full justify-between">
          <div className="!w-1/2">
            <CustomButton
              onClick={cancelHandler}
              type="text"
              className="w-full"
            >
              Cancel
            </CustomButton>
          </div>
          <div className="!w-1/2">
            <CustomButton
              onClick={handleSubmit}
              type="text"
              className="w-full capitalize"
              disabled={isLoading}
              loading={isLoading}
            >
              {`Yes, ${actionText || 'Approve'}`}
            </CustomButton>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default ApproveModalContent;
