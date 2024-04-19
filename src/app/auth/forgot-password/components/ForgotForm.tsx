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
  const { trigger, isMutating } = useAuth({
    forgot_password: true,
  }).forgotPasswordSwr;
  const router = useRouter();

  const onFinish = (data: FieldType) => {
    trigger({ data, type: 'post' }).then(() => {
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
          disabled={isMutating}
        />
      </Form.Item>
      <div className="flex flex-col gap-y-5">
        <CustomButton
          htmlType="submit"
          loading={isMutating}
          disabled={isMutating}
          block
        >
          Continue
        </CustomButton>
        <CustomButton
          href="/auth/login"
          disabled={isMutating}
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
