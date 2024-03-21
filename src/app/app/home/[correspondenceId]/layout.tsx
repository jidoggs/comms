'use client';

import React from 'react';
import { Content } from 'antd/lib/layout/layout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Content className="bg-[#F2F2F2]">
        <div className="max-w-screen flex">{children}</div>
      </Content>
    </div>
  );
}
