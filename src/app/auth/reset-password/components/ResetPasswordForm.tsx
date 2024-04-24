'use client';
import React from 'react';
import { Form } from 'antd';
import { useSearchParams } from 'next/navigation';
import CustomButton from '@/common/components/CustomButton';
import CustomInput from '@/common/components/CustomInput';
import useAuth from '../../hooks/useAuth';

type FieldType = {
  new_password: string;
  confirm_password: string;
};

const passwordReqexPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_])[A-Za-z\d!@#$%^&*_]{8,}$/;

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
          rules={[
            { required: true, message: 'Please input your Password!' },
            {
              pattern: passwordReqexPattern,
              message:
                'password must contain lower case, uppper case, number, symbols and a min. of 8 characters',
            },
          ]}
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
          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('new_password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The new password that you entered do not match!')
                );
              },
            }),
          ]}
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
