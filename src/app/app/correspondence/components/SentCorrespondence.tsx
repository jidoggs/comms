import React from 'react';
import CustomModal from '@/common/components/CustomModal';
import CustomButton from '@/common/components/CustomButton';
import Title from '@/common/components/Title';
import Send from '@/common/components/icons/Send';

type Props = {
  viewCorrespondence: () => void;
  newCorrespondence: () => void;
  open: boolean;
  onCancel: () => void;
};

function SentCorrespondence({
  newCorrespondence,
  viewCorrespondence,
  open,
  onCancel,
}: Props) {
  return (
    <CustomModal
      open={open}
      onCancel={onCancel}
      width={428}
      hideCloseIcon
      classNames={{
        content: '!rounded-none',
      }}
    >
      <div className="flex flex-col items-center gap-y-5 pb-5 text-custom-black_100">
        <Send size={170} />
        <Title
          tag="h2"
          className="text-[30px] font-bold leading-10 text-custom-black_100"
        >
          Sent
        </Title>
        <Title className="leading-5 text-custom-black_100">
          Correspondence has been created and pushed
        </Title>
      </div>
      <div className="flex items-center justify-between border-t border-custom-gray_400 px-2 pt-5">
        <CustomButton
          size="small"
          className="!rounded-10"
          onClick={newCorrespondence}
          type="text"
        >
          New Correspondence
        </CustomButton>
        <CustomButton
          size="small"
          className="!rounded-10"
          onClick={viewCorrespondence}
        >
          View Correspondence
        </CustomButton>
      </div>
    </CustomModal>
  );
}

export default SentCorrespondence;
