import { helveticaNeue } from '@/common/font';
import Title from '@/common/components/Title';
import React from 'react';

type Props = {
  children: React.ReactNode;
  title: string;
  description: string;
};

function PageTitle({ children, title, description }: Props) {
  return (
    <div className='self-stretch' >
      <header className="mb-5 flex flex-col gap-y-4">
        <Title
          tag="h1"
          className={`text-center text-2xl uppercase leading-[29px] ${helveticaNeue.className}`}
        >
          {title}
        </Title>
        <Title className="text-center text-custom-gray_200">
          {description}
        </Title>
      </header>
      {children}
    </div>
  );
}

export default PageTitle;
