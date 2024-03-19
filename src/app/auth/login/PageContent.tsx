import React from "react";
import LoginForm from "./components/LoginForm";

const LoginPageContent: React.FunctionComponent = () => {
  return (
    <>
      <h1 className="uppercase bebas text-[#121212] text-[24px] leading-[28.8px] text-center font-normal mb-3">
        Welcome Back!
      </h1>
      <p className="text-[#585A69] font-[500] text-[14px] text-center leading-[17.71px]">
        Please enter your details.
      </p>
      <LoginForm />
    </>
  );
};

export default LoginPageContent;
