"use client";
import { CustomButton } from "@/components/common";
import { useRouter } from "next/navigation";
import React from "react";

const PageContent = () => {
  const router = useRouter();
  return (
    <>
      <h1 className="uppercase bebas text-[#121212] text-[24px] leading-[28.8px] text-center font-normal mb-3">
        Password Reset
      </h1>
      <p className="text-[#585A69] font-[500] text-[14px] text-center leading-[17.71px]">
        Your password has been updated successfully
      </p>
      <div className="my-5 flex flex-col gap-3">
        <CustomButton
          variant="contained"
          onClick={() => router.push("/app/dashboard")}
          className="w-full bg-[#11142D] rounded-lg"
        >
          Go to Dashboard
        </CustomButton>

        <CustomButton
          variant="noStyleButton"
          onClick={() => router.push("/auth/login")}
          className="w-full rounded-lg"
        >
          Back to Login
        </CustomButton>
      </div>
    </>
  );
};

export default PageContent;
