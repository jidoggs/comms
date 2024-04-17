// import { MainLayout } from "@/components/layout";
import Title from '@/common/components/Title';
import { Content } from 'antd/lib/layout/layout';
import Image from 'next/image';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Content className="min-h-screen bg-custom-white_100">
        <div className="flex h-screen w-screen flex-row items-center justify-center bg-custom-gray_100">
          <Image
            src={'/images/authImg.png'}
            alt="login image"
            width={726}
            height={982}
            className="hidden sm:flex sm:h-full sm:w-1/2"
          />
          <div className="flex w-[90%] items-center justify-center sm:w-1/2">
            <div className="flex w-[375px] items-center justify-center rounded-2xl border border-custom-gray_850 bg-custom-white_100">
              <div className="flex w-full flex-col items-center justify-center gap-y-5 p-5">
                <Title bold className="mt-5 text-center text-custom-gray_600">
                  Correspondence
                </Title>
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
