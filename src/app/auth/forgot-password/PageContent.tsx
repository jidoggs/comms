import React from 'react';
import ForgotForm from './components/ForgotForm';
import Title from '@/common/components/Title';

const ForgotPageContent: React.FunctionComponent = () => {
  return (
    <>
      <Title
        type="h2"
        className="bebas mb-3 text-center font-normal uppercase leading-[28.8px] text-custom-black_200"
      >
        Forgot Password
      </Title>
      <p className="text-center text-[14px] font-[500] leading-[17.71px] text-custom-gray_200">
        To reset your login password, please enter your email and continue
      </p>
      <ForgotForm />
    </>
  );
};

export default ForgotPageContent;
