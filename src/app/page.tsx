'use client';

import WelcomeScreen from '@/common/components/WelcomeScreen';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const PublicHome = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/app/home');
  }, [router]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-custom-main text-xl font-medium text-custom-white_100">
      <p className="mb-10">Welcome...</p>
      <WelcomeScreen />
      <p className="italic text-orange-600">Redirecting... Wait a second</p>
    </div>
  );
};

export default PublicHome;
