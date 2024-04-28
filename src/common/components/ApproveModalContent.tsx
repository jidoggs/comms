import CustomButton from '@/common/components/CustomButton';
import CustomModal from '@/common/components/CustomModal';
import { InfoCircle } from '@/common/components/icons';
import { Divider } from 'antd';

type ApproveModalContentProps = {
  isModalOpen: boolean;
  handleCancel: () => void;
};

const ApproveModalContent = ({
  isModalOpen,
  handleCancel,
}: ApproveModalContentProps) => {
  return (
    <CustomModal width={320} open={isModalOpen} onCancel={handleCancel}>
      <div className="flex flex-col items-center gap-2 text-base text-custom-gray_200">
        <InfoCircle size={90} />

        <p className="text-center">
          Are you sure you want to approve this registration?
        </p>
        <Divider className="!border-custom-gray_500" />
        <div className="-mt-3 flex w-full justify-between">
          <div className="!w-1/2">
            <CustomButton type="text" className="w-full">
              Cancel
            </CustomButton>
          </div>
          <div className="!w-1/2">
            <CustomButton type="text" className="w-full">
              Yes, Approve
            </CustomButton>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default ApproveModalContent;