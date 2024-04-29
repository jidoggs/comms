import { Form, FormProps } from 'antd';
import React from 'react';
import CustomSelect from '@/common/components/CustomSelect';
import CustomButton from '@/common/components/CustomButton';
import { CloseCircled } from '@/common/components/icons';

type Props = {
  onFinish: FormProps['onFinish'];
  isLoading: boolean;
};

function InviteForm({ onFinish, isLoading }: Props) {
  return (
    <Form
      onFinish={onFinish}
      layout="vertical"
      className="flex items-start gap-x-2.5 !pb-44"
    >
      <Form.Item
        name="emails"
        rules={[{ required: true, message: 'Please input the emails!' }]}
        className="flex-1"
      >
        <CustomSelect
          disabled={isLoading}
          mode="tags"
          placeholder="|Add by name or email. Type ',' to add, ‘⌫’ to remove"
          tokenSeparators={[',']}
          removeIcon={<CloseCircled className="text-white" />}
        />
      </Form.Item>
      <CustomButton
        className={{
          button: '!m-0 !py-4 px-2',
          container: 'items-start',
        }}
        htmlType="submit"
        size="middle"
        loading={isLoading}
      >
        Invite
      </CustomButton>
    </Form>
  );
}

export default InviteForm;
