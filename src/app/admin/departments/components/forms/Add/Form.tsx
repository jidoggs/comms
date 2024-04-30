import { Form, FormProps } from 'antd';
import CustomInput from '@/common/components/CustomInput';
import CustomButton from '@/common/components/CustomButton';
import CustomSelect from '@/common/components/CustomSelect';
import { CloseCircled } from '@/common/components/icons';

type Props = {
  onFinish: FormProps['onFinish'];
  isLoading?: boolean;
  isParastatal: boolean;
};

function AddForm({ onFinish, isLoading, isParastatal }: Props) {
  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item
        label={<span className="font-bold">Name</span>}
        name="name"
        rules={[{ required: true, message: 'Please input the name!' }]}
      >
        <CustomInput placeholder="Aa" disabled={isLoading} />
      </Form.Item>
      {isParastatal ? (
        <Form.Item
          label={<span className="font-bold">Domain(s)</span>}
          name="domains"
          rules={[{ required: true, message: 'Please input the title!' }]}
        >
          <CustomSelect
            disabled={isLoading}
            mode="tags"
            placeholder="|Add @domain.ng. Type ',' to add, ‘⌫’ to remove"
            tokenSeparators={[',']}
            removeIcon={<CloseCircled className="text-white" />}
          />
        </Form.Item>
      ) : null}
      <div className="flex items-center justify-end  border-t border-custom-gray_500 py-2">
        <CustomButton loading={isLoading} size="small" htmlType="submit">
          Create
        </CustomButton>
      </div>
    </Form>
  );
}

export default AddForm;
