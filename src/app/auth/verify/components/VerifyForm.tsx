'use client';
import dynamic from 'next/dynamic';
import React, { Suspense, useEffect, useState, lazy } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CustomButton from '@/common/components/CustomButton';
import useAuth from '../../hooks/useAuth';
import { useCounter } from '@/common/hooks';
const Form = lazy(
  () => import(/* webpackChunkName: "sula-antd" */ 'antd/lib/form/Form')
);
const Item = lazy(
  () => import(/* webpackChunkName: "sula-antd" */ 'antd/lib/form/FormItem')
);

// type FieldType = {
//   verification_code: string;
// };

const OTPInput = dynamic(() => import('react-otp-input'));

const VerifyForm = () => {
  const [otp, setOtp] = useState('');
  const { count, counter, start, reset } = useCounter(600);
  const router = useRouter();
  const { trigger, isMutating } = useAuth({
    forgot_password: true,
  }).forgotPasswordSwr;
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const requestOtpHandler = () => {
    trigger({ data: { email }, type: 'post' });
  };

  useEffect(() => {
    if (counter === 600) {
      start();
    }
    if (counter === 0) {
      reset();
    }
  }, [counter]); //eslint-disable-line

  const handleOtpChange = (newOtp: string) => {
    setOtp(newOtp);
  };

  const onFinish = (data: any) => {
    router.push(
      `/auth/reset-password?email=${email}&token=${data?.verification_code}`
    );
  };

  return (
    <div>
      <div className="flex w-full flex-col items-center gap-5 pt-5">
        <span className="text-base font-semibold leading-[21.86px] text-custom-gray_200">
          {count.minutes}:{count.seconds} mins
        </span>
        <Suspense>
          <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
            <Item
              name="verification_code"
              rules={[
                {
                  required: true,
                  message: 'Please input your verification code',
                },
              ]}
            >
              <OTPInput
                renderInput={(props) => (
                  <input {...props} disabled={isMutating} />
                )}
                onChange={handleOtpChange}
                numInputs={6}
                inputStyle="!size-10 rounded border md:!size-12 text-center py-1 px-2 focus:border-customThemeColor-gray_300 focus-within:border-customThemeColor-gray_300 border-customThemeColor-gray_400 text-main"
                containerStyle="justify-between w-full flex"
                inputType="number"
              />
            </Item>
            <div className="flex flex-col gap-y-5">
              <CustomButton
                htmlType="submit"
                disabled={otp.length !== 6 || isMutating}
                block
              >
                Verify
              </CustomButton>
              <CustomButton
                disabled={counter > 0 || isMutating}
                loading={isMutating}
                onClick={requestOtpHandler}
                type="text"
                block
              >
                Resend OTP
              </CustomButton>
            </div>
          </Form>
        </Suspense>
      </div>
    </div>
  );
};

export default VerifyForm;
