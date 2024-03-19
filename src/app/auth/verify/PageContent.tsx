import React from "react";
import VerifyForm from "./components/VerifyForm";

const VerifyPageContent: React.FunctionComponent = () => {
  return (
    <>
      <h1 className="uppercase bebas text-[#121212] text-[24px] leading-[28.8px] text-center font-normal mb-3">
        Verification
      </h1>
      <p className="text-[#585A69] font-[500] text-[14px] text-center leading-[17.71px]">
        Please enter to code sent to your email
      </p>
      <VerifyForm />
    </>
  );
};

export default VerifyPageContent;
