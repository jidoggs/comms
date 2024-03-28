'use client';

import React from 'react';
// import { Content } from 'antd/lib/layout/layout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    // <Content className="">
    <>{children}</>
    // </Content>
  );
}
