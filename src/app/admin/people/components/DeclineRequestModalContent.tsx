import Form from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import CustomButton from '@/common/components/CustomButton';
import { CustomTextArea } from '@/common/components/CustomInput';
import CustomModal from '@/common/components/CustomModal';
import Title from '@/common/components/Title';
import { iHandleClick } from '@/types';

type DeclineRequestModalContentProps = {
  isModalOpen: boolean;
  handleCancel: iHandleClick;
  submitHandler: () => void;
  loading: boolean;
};

const DeclineRequestModalContent = ({
  isModalOpen,
  handleCancel,
  submitHandler,
  loading,
}: DeclineRequestModalContentProps) => {
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
        <Form onFinish={submitHandler} requiredMark="optional">
          <FormItem name="reason" rules={[{ required: true }]}>
            <CustomTextArea name="reason" placeholder="Aa" />
          </FormItem>
          <CustomButton
            loading={loading}
            htmlType="submit"
            className="mt-6 w-full bg-custom-main text-custom-gray_100"
          >
            Submit
          </CustomButton>
        </Form>
      </div>
    </CustomModal>
  );
};

export default DeclineRequestModalContent;
