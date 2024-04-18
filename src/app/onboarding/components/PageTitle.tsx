import Title from '@/common/components/Title';
import React from 'react';

type Props = {
  children: React.ReactNode;
  title: string;
  description: string;
};

function PageTitle({ children, title, description }: Props) {
  return (
    <>
      <header className="flex flex-col gap-y-4">
        <Title
          tag="h1"
          className="bebas text-center text-2xl uppercase leading-[29px]"
        >
          {title}
        </Title>
        <Title semibold className="text-center text-custom-gray_200">
          {description}
        </Title>
      </header>
      {children}
    </>
  );
}

export default PageTitle;
