import React from 'react';
import ForgotForm from './components/ForgotForm';

const ForgotPageContent: React.FunctionComponent = () => {
  return (
    <>
      <h1 className="bebas text-custom-black_200 mb-3 text-center text-[24px] font-normal uppercase leading-[28.8px]">
        Forgot Password
      </h1>
      <p className="text-custom-gray_200 text-center text-[14px] font-[500] leading-[17.71px]">
        To reset your login password, please enter your email and continue
      </p>
      <ForgotForm />
    </>
  );
};

export default ForgotPageContent;
