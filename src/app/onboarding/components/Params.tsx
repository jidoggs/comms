'use client';
import Title from '@/common/components/Title';
import { mergeClassName } from '@/common/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Params = () => {
  const pathname = usePathname();
  const currentRoute = pathname?.split('/').pop(); // Extract the last segment

  const routes = [
    {
      id: 1,
      link: '/onboarding/personal-info',
      param: 'personal-info',
      title: 'Personal info.',
    },
    {
      id: 2,
      link: '/onboarding/office-info',
      param: 'office-info',
      title: 'Office info.',
    },
    {
      id: 3,
      link: '/onboarding/set-password',
      param: 'set-password',
      title: 'Set Password.',
    },
  ];

  return (
    <div className="flex w-full flex-row gap-3">
      {routes.map((route) => (
        <Link href={route.link} key={route.id}>
          <Title
            className={mergeClassName(
              'text-custom-gray_600',
              currentRoute === route.param && 'text-custom-main'
            )}
          >
            {route.id}. {route.title}
          </Title>
        </Link>
      ))}
    </div>
  );
};

export default Params;
