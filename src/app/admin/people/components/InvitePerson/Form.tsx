import CustomInput from '@/common/CustomInput';
import CustomButton from '@/common/components/CustomButton';
import { Form, FormProps } from 'antd';
import React from 'react';

type Props = {
  onFinish: FormProps['onFinish'];
};

function InviteForm({ onFinish }: Props) {
  return (
    <Form onFinish={onFinish} className="flex items-center gap-x-2.5 !pb-44">
      <Form.Item className="!m-0 flex-1">
        <CustomInput placeholder="Add by name or email. Type ',' to add, ‘⌫’ to remove" />
      </Form.Item>
      <CustomButton htmlType="submit">Invite</CustomButton>
    </Form>
  );
}

export default InviteForm;
