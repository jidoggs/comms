// import { MainLayout } from "@/components/layout";
import { Content } from 'antd/lib/layout/layout';
import Image from 'next/image';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Content className="min-h-screen bg-white">
        <div className="bg-custom-gray_100 flex h-screen w-screen flex-row items-center justify-center">
          <Image
            src={'/images/authImg.png'}
            alt="login image"
            width={726}
            height={982}
            className="hidden h-full w-1/2 sm:flex"
          />
          <div className="flex w-[90%] items-center justify-center sm:w-1/2">
            <div className="border-custom-gray_950 flex w-[375px] items-center justify-center rounded-2xl border">
              <div className="flex w-full flex-col items-center justify-center p-5">
                {/* <Image
                  src={"/images/nigeria_saudi_arabia_logo.png"}
                  alt=""
                  width={123}
                  height={50}
                  className="h-[50px] my-5"
                /> */}
                <h1 className="circular my-5 text-center text-[24px] font-bold leading-[30.36px]">
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
