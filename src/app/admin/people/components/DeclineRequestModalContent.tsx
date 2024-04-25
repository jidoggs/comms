import CustomButton from '@/common/components/CustomButton';
import CustomInput from '@/common/components/CustomInput';
import CustomModal from '@/common/components/CustomModal';
import Title from '@/common/components/Title';
import { iHandleClick } from '../types';

type DeclineRequestModalContentProps = {
  isModalOpen: boolean;
  handleCancel: iHandleClick;
  setIsSuccessModalOpen: () => void;
};

const DeclineRequestModalContent = ({
  isModalOpen,
  handleCancel,
  setIsSuccessModalOpen,
}: DeclineRequestModalContentProps) => {
  const handleSubmit: iHandleClick = (e) => {
    handleCancel(e);
    setIsSuccessModalOpen();
  };
  return (
    <CustomModal width={360} open={isModalOpen} onCancel={handleCancel}>
      <div className="text-base">
        <Title tag="h2" className="text-base font-semibold">
          Decline Request
        </Title>
        <p className="mt-1 text-custom-gray_200 text-sm">
          What’s the reason for declining this registration?
        </p>
        <p className="mt-4">Reason for Declination</p>
        <CustomInput type="textarea" placeholder="Aa" />
        <CustomButton
          className="mt-6 w-full bg-custom-main text-custom-gray_100"
          onClick={handleSubmit}
        >
          Submit
        </CustomButton>
      </div>
    </CustomModal>
  );
};

export default DeclineRequestModalContent;
