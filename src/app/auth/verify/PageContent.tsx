import React from 'react';
import VerifyForm from './components/VerifyForm';

const VerifyPageContent: React.FunctionComponent = () => {
  return (
    <>
      <h1 className="bebas text-custom-black_200 mb-3 text-center text-[24px] font-normal uppercase leading-[28.8px]">
        Verification
      </h1>
      <p className="text-custom-gray_200 text-center text-[14px] font-[500] leading-[17.71px]">
        Please enter to code sent to your email
      </p>
      <VerifyForm />
    </>
  );
};

export default VerifyPageContent;
