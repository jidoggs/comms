'use client';
import React, { useState } from 'react';
import Form from 'antd/es/form';
import useMessage from 'antd/es/message/useMessage';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks';
import CustomInput from '@/common/components/CustomInput';
import CustomButton from '@/common/components/CustomButton';
import { emailValidator } from '@/common/utils';

type FieldType = {
  email: string;
};

const ForgotForm = () => {
  const { forgotPasswordSwr } = useAuth({
    forgot_password: true,
  });
  const { trigger, isMutating } = forgotPasswordSwr;
  const [messageApi, messageContext] = useMessage();
  const router = useRouter();
  const [messageLoading, setMessageLoading] = useState(false);
  const onFinish = (data: FieldType) => {
    if (messageLoading) return;
    trigger({ data, type: 'post' }).then((res) => {
      messageApi.success(res.data.message).then(() => {
        setMessageLoading(true);
        router.push(`/auth/verify?email=${data.email}`);
      });
    });
  };

  return (
    <>
      {messageContext}
      <Form<FieldType> onFinish={onFinish} layout="vertical">
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, validator: emailValidator }]}
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
    </>
  );
};

export default ForgotForm;
