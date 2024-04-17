'use client';
import React from 'react';
import { Form } from 'antd';
import Link from 'next/link';
import CustomInput from '@/common/CustomInput';
import CustomButton from '@/common/components/CustomButton';
import useAuth from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { storeRefreshToken, storeUserToken } from '@/service/storage';

type FieldType = {
  email?: string;
  password?: string;
};

const LoginForm = () => {
  const { loginTrigger, loginIsMutating } = useAuth({ login: true });
  const router = useRouter();

  const onFinish = (data: FieldType) => {
    loginTrigger({ data, type: 'post' }).then((res) => {
      router.push('/app/home');
      storeUserToken(res.data.access_token);
      storeRefreshToken(res.data.refresh_token);
    });
  };

  return (
    <Form<FieldType> onFinish={onFinish} autoComplete="off" layout="vertical" >
      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Email is required' }]}
      >
        <CustomInput
          type="email"
          name="email"
          placeholder="user@email.com"
          disabled={loginIsMutating}
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
          disabled={loginIsMutating}
        />
      </Form.Item>
      <div className="flex flex-col gap-y-5">
        <Link
          href="/auth/forgot-password"
          className="px-2.5 py-1 !text-center !text-[14px] !font-bold !leading-[17.71px] !text-custom-black_200"
        >
          Forgot Password?
        </Link>

        <CustomButton loading={loginIsMutating} htmlType="submit" block>
          Login
        </CustomButton>
      </div>
    </Form>
  );
};

export default LoginForm;
