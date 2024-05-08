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
  email: string;
};

const ForgotForm = () => {
  const { forgotPasswordSwr, messageLoading } = useAuth({
    forgot_password: true,
  });
  const { trigger, isMutating } = forgotPasswordSwr;

  const onFinish = (data: FieldType) => trigger({ data, type: 'post' });

  return (
    <>
      <Form onFinish={onFinish} layout="vertical">
        <FormItem
          label="Email"
          name="email"
          rules={[{ required: true, validator: emailValidator }]}
        >
          <CustomInput
            type="email"
            placeholder="user@email.com"
            disabled={isMutating || messageLoading}
          />
        </FormItem>
        <div className="flex flex-col gap-y-5">
          <CustomButton
            htmlType="submit"
            loading={isMutating || messageLoading}
            disabled={isMutating || messageLoading}
            block
          >
            Continue
          </CustomButton>
          <Link
            className="rounded-10 bg-transparent py-4 text-center text-sm font-bold leading-none !text-custom-main transition-colors hover:bg-custom-gray_500"
            href="/auth/login"
          >
            Login
          </Link>
        </div>
      </Form>
    </>
  );
};

export default ForgotForm;
