/* eslint-disable no-unused-vars */

'use client';
import Title from '@/common/components/Title';
import { mergeClassName } from '@/common/utils';
// import { useParams, usePathname, useSearchParams } from 'next/navigation';
import React from 'react';

type Props = {};

const Params = (props: Props) => {
  //   const pathname = usePathname();
  //   const searchParams = useSearchParams();
  //   const params = useParams<{ tag: string; item: string }>();
  //   const [activeKey, setActiveKey] = useState('');

  //   console.log('usePathname', pathname);
  //   console.log('searchParams', searchParams);
  //   console.log('params', params);

  return (
    <div className="flex w-full flex-row gap-3">
      <Title className={mergeClassName('p')}>1. Personal info.</Title>
      <Title>2. Office info.</Title>
      <Title>3. Set password.</Title>
    </div>
  );
};

export default Params;
