import CustomButton from '@/common/components/CustomButton';
import { CustomTextArea } from '@/common/components/CustomInput';
import CustomModal from '@/common/components/CustomModal';
import Title from '@/common/components/Title';
import { iHandleClick } from '../types';
import useHandleChange from '@/common/hooks/useHandleChange';
import { useState } from 'react';

type DeclineRequestModalContentProps = {
  isModalOpen: boolean;
  handleCancel: iHandleClick;
  setIsSuccessModalOpen: (arg: 'approve' | 'decline' | 'success') => void;
};

const DeclineRequestModalContent = ({
  isModalOpen,
  handleCancel,
  setIsSuccessModalOpen,
}: DeclineRequestModalContentProps) => {
  const [formValues, setFormValues] = useState({
    reason: '',
  });
  const { handleChange } = useHandleChange(setFormValues);
  const handleSubmit: iHandleClick = (e) => {
    handleCancel(e);
    setIsSuccessModalOpen('success');
  };
  return (
    <CustomModal width={360} open={isModalOpen} onCancel={handleCancel}>
      <div className="text-base">
        <Title tag="h2" className="text-base font-semibold">
          Decline Request
        </Title>
        <p className="mt-1 text-sm text-custom-gray_200">
          What’s the reason for declining this registration?
        </p>
        <p className="mt-4">Reason for Declination</p>
        <CustomTextArea
          name="reason"
          placeholder="Aa"
          value={formValues.reason}
          onChange={handleChange}
        />
        <CustomButton
          className="mt-6 w-full bg-custom-main text-custom-gray_100"
          disabled={!formValues.reason}
          onClick={handleSubmit}
        >
          Submit
        </CustomButton>
      </div>
    </CustomModal>
  );
};

export default DeclineRequestModalContent;
