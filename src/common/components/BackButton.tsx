'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { CustomButton } from '.';
import { BackwardArrow } from './icons';

type BackButtonProps = {
  text?: string;
};

const BackButton = ({ text }: BackButtonProps) => {
  const router = useRouter();
  return (
    <div className="flex items-center gap-0">
      <CustomButton onClick={() => router.back()}>
        <BackwardArrow size={22} />
      </CustomButton>
      <p className="font-semibold text-base">{text}</p>
    </div>
  );
};

export default BackButton;
