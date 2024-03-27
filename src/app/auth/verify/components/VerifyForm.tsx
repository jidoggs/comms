'use client';
// import { useAuth } from "@/components/hooks";
// import { apiErrorHandler } from "@/services";
import { Form } from 'antd';
// import {  useSearchParams } from "next/navigation";
// import { CustomButton } from '@/common/components';
import React, { useLayoutEffect, useState } from 'react';
// import OTPInput from 'react-otp-input';
import CustomButton from '@/common/components/CustomButton';

// const DEFAULT_TIMER = 0;

const VerifyForm = () => {
  const [otp] = useState('');
  const [timer, setTimer] = useState(600); // 10 minutes in seconds
  // const [isResendDisabled, setIsResendDisabled] = useState(false);
  // const router = useRouter();

  useLayoutEffect(() => {
    const storedTimer = localStorage.getItem('timer');
    if (storedTimer) {
      const parsedTimer = parseInt(storedTimer, 10);
      setTimer(parsedTimer);
    }
  }, []);
  //

  useLayoutEffect(() => {
    const countdown = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
        localStorage.setItem('timer', timer.toString());
        // setIsResendDisabled(false);
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

  // const { user } = USER_SESSION();
  // const email = user?.email;

  // const searchParams = useSearchParams();
  //   const unVerifiedLoginAttempt = searchParams.get("login");
  // const emailParams = searchParams.get("email");
  //   const initiateOtp = useRef(false);

  // const {
  //   verifyTokenSWR: {
  //     isMutating: verifyMutating,
  //     trigger: verifyTrigger,
  //     error: verifyError,
  //   },
  //   resendTokenSWR: { isMutating: resendLoading, trigger: resendTrigger },
  // } = useAuth();

  // const handleOtpChange = (newOtp: string) => {
  //   setOtp(newOtp);
  // };

  // const inputStyle: React.CSSProperties = {
  //   height: 40,
  //   width: "100%",
  //   margin: 4,
  //   borderRadius: 10,
  //   border: "1px solid #d9d9d9",
  //   color: "black",
  //   background: "#FAFAFA",
  // };

  // const handleResendOTP = () => {
  //   // const formatPhoneNumber = (phoneNumber: string) => {
  //   //   return phoneNumber.length === 10
  //   //     ? `+234${phoneNumber}`
  //   //     : phoneNumber.length === 11 && phoneNumber.startsWith("0")
  //   //     ? `+234${phoneNumber?.slice(1)}`
  //   //     : phoneNumber.length === 11
  //   //     ? `+234${phoneNumber?.slice(0, 10)}`
  //   //     : phoneNumber.length === 13 && phoneNumber.startsWith("+234")
  //   //     ? phoneNumber
  //   //     : phoneNumber.length === 14 && phoneNumber.startsWith("+234")
  //   //     ? phoneNumber
  //   //     : "";
  //   // };
  //   // const phoneNumber = formatPhoneNumber(phone as string);

  //   setTimer(600); // Reset timer to 10 minutes
  //   // setIsResendDisabled(true); // Disable resend button

  //   // resendTrigger({
  //   //   data: { phone_number: phoneNumber },
  //   // });
  // };

  const handleSubmit = () => {
    // router.push(`/auth/reset-password?email=${emailParams}&token=${otp}`);
    // verifyTrigger({
    //   data: { code: otp, email: emailParams },
    //   type: "post",
    // })
    //   .then(() => {
    //     message.open({
    //       type: "success",
    //       content: "Email successfully verified",
    //     });
    //     router.push(`/auth/reset-password?email=${emailParams}&token=${otp}`);
    //   })
    //   .catch(() => {
    //     message.open({
    //       type: "error",
    //       content: apiErrorHandler(verifyError),
    //     });
    //   });
  };

  // router.push(`/auth/verify?email=${values.email}`);

  return (
    <div>
      <div className="flex w-full flex-col items-center gap-5 pt-5">
        <span className="text-[16px] font-semibold leading-[21.86px] text-custom-gray_200">
          {/* {Math.floor(countdown / 60)
            .toString()
            .padStart(2, "0")}
          :{(countdown % 60).toString().padStart(2, "0")} mins */}
          {Math.floor(timer / 60)}:{timer % 60 < 10 ? '0' : ''}
          {timer % 60}
        </span>
        {/* {error && (
          <Alert
            className="mb-2"
            message={apiErrorHandler(error)}
            type="error"
            showIcon
            closable
          />
        )} */}
        <Form
          // disabled={isMutating}
          layout="vertical"
          // onFinish={handleDataSend}
          requiredMark={false}
        >
          <Form.Item
            name="verification_code"
            className="!mb-0 !pt-3"
            // style={formItemStyle}
            rules={[
              {
                required: true,
                message: 'Please input your verification code',
              },
            ]}
          >
            {/* <OTPInput
              renderInput={(props) => <input {...props} />}
              value={otp}
              onChange={handleOtpChange}
              numInputs={6}
              inputStyle="md:h-11 md:!w-12 !w-10 h-8  md:px-4 md:py-3 px-2 py-1 border border-custom-gray_300 rounded-md text-custom-gray_300 focus:border-green-minst focus-visible:outline-green-minst"
              containerStyle="justify-center md:gap-x-2.5 gap-x-1"
              inputType="number"
              //   isDisabled={verifyMutating}
            /> */}
          </Form.Item>
        </Form>
        <CustomButton onClick={handleSubmit} disabled={otp.length !== 6} block>
          Verify
        </CustomButton>

        <CustomButton type="text" block>
          Resend OTP
        </CustomButton>
      </div>
    </div>
  );
};

export default VerifyForm;
