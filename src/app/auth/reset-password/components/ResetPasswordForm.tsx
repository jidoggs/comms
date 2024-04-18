'use client';
import React from 'react';
import { Form } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import CustomButton from '@/common/components/CustomButton';
import CustomInput from '@/common/CustomInput';
import useAuth from '../../hooks/useAuth';

type FieldType = {
  new_password: string;
  confirm_password: string;
};

const passwordReqexPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_])[A-Za-z\d!@#$%^&*_]{8,}$/;

const ResetPasswordForm = () => {
  const router = useRouter();
  const { resetPasswordTrigger, resetPasswordIsMutating } = useAuth({
    reset_password: true,
  });
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const code = searchParams.get('token');

  const onFinish = (data: FieldType) => {
    resetPasswordTrigger({
      data: {
        email,
        code,
        password: data.new_password,
      },
    }).then(() => {
      router.push(`/auth/success`);
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
            disabled={resetPasswordIsMutating}
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
            disabled={resetPasswordIsMutating}
          />
        </Form.Item>

        <CustomButton
          htmlType="submit"
          disabled={resetPasswordIsMutating}
          loading={resetPasswordIsMutating}
          block
        >
          Reset Password
        </CustomButton>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
