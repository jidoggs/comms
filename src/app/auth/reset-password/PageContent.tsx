import React from 'react';
import ResetPasswordForm from './components/ResetPasswordForm';

const PageContent = () => {
  return (
    <>
      <h1 className="bebas text-custom-black_200 mb-3 text-center text-[24px] font-normal uppercase leading-[28.8px]">
        Reset Password
      </h1>
      <p className="text-custom-gray_200 text-center text-[14px] font-[500] leading-[17.71px]">
        Enter a new password
      </p>
      <ResetPasswordForm />
    </>
  );
};

export default PageContent;
