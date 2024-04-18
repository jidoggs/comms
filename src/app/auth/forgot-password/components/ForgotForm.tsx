'use client';
import React from 'react';
import { Form } from 'antd';
import { useRouter } from 'next/navigation';
import CustomInput from '@/common/CustomInput';
import CustomButton from '@/common/components/CustomButton';
import useAuth from '../../hooks/useAuth';

type FieldType = {
  email: string;
};

const ForgotForm = () => {
  const { forgortPasswordTrigger, forgortPasswordIsMutating } = useAuth({
    forgot_password: true,
  });
  const router = useRouter();

  const onFinish = (data: FieldType) => {
    forgortPasswordTrigger({ data, type: 'post' }).then(() => {
      router.push(`/auth/verify?email=${data.email}`);
    });
  };

  return (
    <Form<FieldType> onFinish={onFinish} layout="vertical">
      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Email is required' }]}
      >
        <CustomInput
          type="email"
          placeholder="user@email.com"
          disabled={forgortPasswordIsMutating}
        />
      </Form.Item>
      <div className="flex flex-col gap-y-5">
        <CustomButton
          htmlType="submit"
          loading={forgortPasswordIsMutating}
          disabled={forgortPasswordIsMutating}
          block
        >
          Continue
        </CustomButton>
        <CustomButton
          href="/auth/login"
          disabled={forgortPasswordIsMutating}
          type="text"
          block
        >
          Login
        </CustomButton>
      </div>
    </Form>
  );
};

export default ForgotForm;
