'use client';
// import useAuth from "@/components/hooks/useAuth";
// import { apiErrorHandler } from "@/services";
import { Form, Input } from 'antd';
// import { useSearchParams } from 'next/navigation';
// import Input from "rc-input";
import React, { useState } from 'react';
import { EyeInvisibleOutlined } from '@ant-design/icons';
import { CustomButton } from '@/common/components';

// type FormValues = {
//   code: string;
//   newPassword: string;
//   confirmPassword: boolean;
// };

const passwordReqexPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_])[A-Za-z\d!@#$%^&*_]{8,}$/;

const ResetPasswordForm = () => {
  // const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  // const [correctPassword, setCorrectPassword] = useState(false);
  // const {
  //   resetTokenSWR: { error, isMutating, trigger },
  // } = useAuth();
  // const searchParams = useSearchParams();
  // const email = searchParams.get('email');
  // const token = searchParams.get('token');

  const handleResetCode = () =>
    // values: FormValues
    {
      // const data = {
      //   email,
      //   code: token,
      //   new_password: values.newPassword,
      //   confirm_password: values?.confirmPassword,
      // };
      // trigger({ data })
      //   .then(() => {
      //     message.open({
      //       type: "success",
      //       content: "Email successfully verified",
      //     });
      //     router.push(`/auth/success`);
      //   })
      //   .catch(() => {
      //     message.open({
      //       type: "error",
      //       content: apiErrorHandler(error),
      //     });
      //   });
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
      <Form layout="vertical" onFinish={handleResetCode} requiredMark={false}>
        {/* <Form.Item
          name="code"
          label="OTP Code"
          rules={[{ required: true, message: "Please input your code" }]}
        >
          <Input
            // type="text"
            disabled={isMutating}
            placeholder="Enter OTP Code"
          />
        </Form.Item> */}
        <Form.Item
          name="newPassword"
          label="New Password"
          rules={[
            { required: true, message: 'Please input your Password!' },
            {
              pattern: passwordReqexPattern,
              message:
                'password must contain lower case, uppper case, number, symbols and a min. of 8 characters',
            },
          ]}
        >
          <Input
            suffix={
              <EyeInvisibleOutlined
                onClick={() => setShowPassword(!showPassword)}
              />
            }
            type={showPassword ? 'text' : 'password'}
            // disabled={isMutating}
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={['newPassword']}
          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The new password that you entered do not match!')
                );
              },
            }),
          ]}
        >
          <Input
            suffix={
              <EyeInvisibleOutlined
                onClick={() => setShowPassword(!showPassword)}
              />
            }
            // disabled={isMutating}
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
          />
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }} className="mt-10">
          <CustomButton
            // disabled={isMutating}
            // isLoading={isMutating}
            // className={
            //   correctPassword
            //     ? "w-full bg-[#11142D] rounded-lg"
            //     : "w-full bg-[#BDBDBD] rounded-lg"
            // }
            className="w-full rounded-lg bg-[#11142D]"
          >
            Reset Password
          </CustomButton>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
