'use client';
import React from 'react';
import { Form } from 'antd';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '../../hooks';
import CustomButton from '@/common/components/CustomButton';
import CustomInput from '@/common/components/CustomInput';
import {
  confirmPasswordValidator,
  passwordStrengthValidator,
} from '@/common/utils';

type FieldType = {
  new_password: string;
  confirm_password: string;
};

const ResetPasswordForm = () => {
  const { trigger, isMutating } = useAuth({
    reset_password: true,
  }).resetPasswordSwr;
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const code = searchParams.get('token');

  const onFinish = (data: FieldType) => {
    trigger({
      data: {
        email,
        code,
        password: data.new_password,
      },
    });
  };

  return (
    <div className="my-5">
      {/* {error && (
        <Alert
          className="mb-2"
          message={apiErrorHandler(error)}
          type="error"
          showIcon
          closable
        />
      )} */}
      <Form<FieldType>
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
      >
        <Form.Item<FieldType>
          label="New Password"
          name="new_password"
          rules={[{ required: true, validator: passwordStrengthValidator }]}
        >
          <CustomInput
            placeholder="Enter Password"
            type="password"
            name="new_password"
            disabled={isMutating}
          />
        </Form.Item>

        <Form.Item
          name="confirm_password"
          label="Confirm Password"
          dependencies={['new_password']}
          rules={[confirmPasswordValidator]}
        >
          <CustomInput
            placeholder="Password"
            type="password"
            name="confirm_password"
            disabled={isMutating}
          />
        </Form.Item>

        <CustomButton
          htmlType="submit"
          disabled={isMutating}
          loading={isMutating}
          block
        >
          Reset Password
        </CustomButton>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
