'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Title from '@/common/components/Title';
import { mergeClassName } from '@/common/utils';

const Params = () => {
  const pathname = usePathname();

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
            pathname.includes(route.param)
              ? 'text-custom-main '
              : 'text-custom-gray_600 hover:text-custom-main'
          )}
        >
          <button className="-ml-2 text-inherit hover:text-inherit">
            <Title tag="span" className="text-inherit">
              {route.title}
            </Title>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Params;
