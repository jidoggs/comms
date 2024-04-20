'use client';
import React from 'react';
import { Form } from 'antd';
import Link from 'next/link';
import CustomInput from '@/common/CustomInput';
import CustomButton from '@/common/components/CustomButton';
import useAuth from '../../hooks/useAuth';

type FieldType = {
  email?: string;
  password?: string;
};

const LoginForm = () => {
  const { trigger, isMutating } = useAuth({ login: true }).loginSwr;

  const onFinish = (data: FieldType) => {
    trigger({ data, type: 'post' });
  };

  return (
    <Form<FieldType>
      onFinish={onFinish}
      autoComplete="off"
      requiredMark={false}
      layout="vertical"
    >
      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Email is required' }]}
      >
        <CustomInput
          type="email"
          name="email"
          placeholder="user@email.com"
          disabled={isMutating}
        />
      </Form.Item>
      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Password is required' }]}
      >
        <CustomInput
          placeholder="Enter Password"
          type="password"
          name="password"
          disabled={isMutating}
        />
      </Form.Item>
      <div className="flex flex-col gap-y-5">
        <Link
          href="/auth/forgot-password"
          className="px-2.5 py-1 !text-center !text-[14px] !font-bold !leading-[17.71px] !text-custom-black_200"
        >
          Forgot Password?
        </Link>

        <CustomButton loading={isMutating} htmlType="submit" block>
          Login
        </CustomButton>
      </div>
    </Form>
  );
};

export default LoginForm;
