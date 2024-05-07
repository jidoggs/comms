'use client';
import React, { useState } from 'react';
import Form from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks';
import CustomInput from '@/common/components/CustomInput';
import CustomButton from '@/common/components/CustomButton';
import { emailValidator } from '@/common/utils';
import { messageHandler } from '@/common/utils/notification';

type FieldType = {
  email: string;
};

const ForgotForm = () => {
  const { forgotPasswordSwr } = useAuth({
    forgot_password: true,
  });
  const { trigger, isMutating } = forgotPasswordSwr;

  const router = useRouter();
  const [messageLoading, setMessageLoading] = useState(false);
  const onFinish = async (data: FieldType) => {
    if (messageLoading) return;
    trigger({ data, type: 'post' }).then((res) => {
      messageHandler('success', res.data.message).then(() => {
        setMessageLoading(true);
        router.push(`/auth/verify?email=${data.email}`);
      });
    });
  };

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
            disabled={isMutating}
          />
        </FormItem>
        <div className="flex flex-col gap-y-5">
          <CustomButton
            htmlType="submit"
            loading={isMutating}
            disabled={isMutating}
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
