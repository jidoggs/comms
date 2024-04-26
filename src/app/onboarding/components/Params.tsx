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
      link: '/onboarding/personal-info',
      param: 'personal-info',
      title: 'Personal info.',
    },
    {
      link: '/onboarding/office-info',
      param: 'office-info',
      title: 'Office info.',
    },
    {
      link: '/onboarding/set-password',
      param: 'set-password',
      title: 'Set Password.',
    },
  ];

  return (
    <ul className="flex list-inside list-decimal gap-x-3 self-stretch">
      {routes.map((route, id) => (
        <li
          key={id}
          className={mergeClassName(
            currentRoute === route.param
              ? 'text-custom-main '
              : 'text-custom-gray_600 hover:text-custom-main'
          )}
        >
          <Link
            href={route.link}
            className="-ml-2 text-inherit hover:text-inherit"
          >
            <Title tag="span" className="text-inherit">
              {route.title}
            </Title>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Params;
