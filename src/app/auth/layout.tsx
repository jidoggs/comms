// import { MainLayout } from "@/components/layout";
import { Content } from "antd/lib/layout/layout";
import Image from "next/image";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Content className="bg-white min-h-screen">
        <div className="w-[100vw] h-[100vh] flex flex-row items-center justify-center bg-[#FAFAFA]">
          <Image
            src={"/images/authImg.png"}
            alt="login image"
            width={726}
            height={982}
            className="w-[50%] h-full hidden sm:flex"
          />
          <div className="w-[90%] sm:w-[50%] flex justify-center items-center">
            <div className="border border-[#3E3E3E] flex justify-center items-center rounded-2xl w-[375px]">
              <div className="p-5 flex flex-col justify-center items-center w-full">
                {/* <Image
                  src={"/images/nigeria_saudi_arabia_logo.png"}
                  alt=""
                  width={123}
                  height={50}
                  className="h-[50px] my-5"
                /> */}
                <h1 className="circular font-bold leading-[30.36px] text-[24px] text-center my-5">
                  Correspondence
                </h1>
                {children}
              </div>
            </div>
          </div>
        </div>
      </Content>
    </div>
  );
};

export default layout;
