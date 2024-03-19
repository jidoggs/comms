import React from "react";
import ResetPasswordForm from "./components/ResetPasswordForm";

const PageContent = () => {
  return (
    <>
      <h1 className="uppercase bebas text-[#121212] text-[24px] leading-[28.8px] text-center font-normal mb-3">
        Reset Password
      </h1>
      <p className="text-[#585A69] font-[500] text-[14px] text-center leading-[17.71px]">
        Enter a new password
      </p>
      <ResetPasswordForm />
    </>
  );
};

export default PageContent;
