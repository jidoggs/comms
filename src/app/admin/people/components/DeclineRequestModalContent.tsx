import { useContext } from 'react';
import Form from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import CustomButton from '@/common/components/CustomButton';
import { CustomTextArea } from '@/common/components/CustomInput';
import CustomModal from '@/common/components/CustomModal';
import Title from '@/common/components/Title';
import { iHandleClick } from '@/types';
import usePeople from '../../hooks/usePeople';
import { TableRowActionContext } from './TableRowAction';

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
  const userInfo = useContext(TableRowActionContext);
  const { declineRequestSwr } = usePeople({ can_decline: true });
  const onFinishHandler = () => {
    const data = {
      user_id: userInfo?.data?._id,
      email: userInfo?.data?.email,
    };
    declineRequestSwr
      .trigger({ data })
      .then(() => setIsSuccessModalOpen('success'))
      .catch(handleCancel);
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
        <Form onFinish={onFinishHandler} requiredMark="optional">
          <FormItem name="reason" rules={[{ required: true }]}>
            <CustomTextArea name="reason" placeholder="Aa" />
          </FormItem>
          <CustomButton
            loading={declineRequestSwr.isMutating}
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
