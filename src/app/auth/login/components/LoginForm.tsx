'use client';
import React from 'react';
import Form from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import Link from 'next/link';
import { useAuth } from '../../hooks';
import CustomInput from '@/common/components/CustomInput';
import CustomButton from '@/common/components/CustomButton';
import { emailValidator } from '@/common/utils';

type FieldType = {
  email?: string;
  password?: string;
};

const LoginForm = () => {
  const { loginSwr, messageLoading } = useAuth({ login: true });
  const { trigger, isMutating } = loginSwr;

  const onFinish = (data: FieldType) => {
    if (messageLoading) return;
    trigger({ data, type: 'post' });
  };

  return (
    <Form<FieldType>
      onFinish={onFinish}
      autoComplete="off"
      requiredMark={false}
      layout="vertical"
    >
      <FormItem<FieldType>
        label="Email"
        name="email"
        rules={[{ required: true, validator: emailValidator }]}
      >
        <CustomInput
          type="email"
          name="email"
          placeholder="user@email.com"
          disabled={isMutating || messageLoading}
        />
      </FormItem>
      <FormItem<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Password is required' }]}
      >
        <CustomInput
          placeholder="Enter Password"
          type="password"
          name="password"
          disabled={isMutating || messageLoading}
        />
      </FormItem>
      <div className="flex flex-col gap-y-5">
        <Link
          href="/auth/forgot-password"
          className="px-2.5 py-1 !text-center !text-[14px] !font-bold !leading-[17.71px] !text-custom-black_200"
        >
          Forgot Password?
        </Link>

        <CustomButton
          loading={isMutating || messageLoading}
          disabled={isMutating || messageLoading}
          htmlType="submit"
          block
        >
          Login
        </CustomButton>
      </div>
    </Form>
  );
};

export default LoginForm;
