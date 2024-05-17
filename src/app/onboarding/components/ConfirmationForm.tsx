import CustomButton from '@/common/components/CustomButton';
import Title from '@/common/components/Title';
import ArrowRight from '@/common/components/icons/ArrowRight';
import Refresh2 from '@/common/components/icons/Refresh2';
import React from 'react';

type Props = {
  loading: boolean;
  timer: number;
  cancelHandler: () => void;
};

function ConfirmationForm({ cancelHandler, loading, timer }: Props) {
  return (
    <div className="flex w-[450px] flex-col items-center gap-y-4 rounded-[20px] bg-custom-white_100 p-5">
      <div className="flex flex-col items-center gap-y-4 p-2">
        <Refresh2 size={100} className="animate-spin" />
        <Title tag="h4" className="py-1">
          {timer ? `Submitting details in ${timer} secs` : 'Submitting...'}
        </Title>
      </div>

      <Title>This form is being collated and will submit soon</Title>
      <CustomButton
        onClick={cancelHandler}
        icon={<ArrowRight className="rotate-180" />}
        loading={loading}
        disabled={loading}
        size="small"
      >
        Continue editing
      </CustomButton>
    </div>
  );
}

export default ConfirmationForm;
