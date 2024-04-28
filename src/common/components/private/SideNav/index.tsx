'use client';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Layout, Menu, Grid } from 'antd';
import { generateDefaultKey, menuItemRenderer } from './helper';
import { useAuth } from '@/app/auth/hooks';
import { Collapse, Logout } from '@/common/components/icons';
import { mergeClassName } from '@/common/utils';
import { UserPreDefinedRole } from '@/types';

const { Sider } = Layout;
const { useBreakpoint } = Grid;

function SideNav({ role }: { role: UserPreDefinedRole }) {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { lg } = useBreakpoint();

  const { handleLogout, messageContext } = useAuth();

  useEffect(() => {
    if (lg) {
      setCollapsed(false);
    }
  }, [lg]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider collapsed={collapsed} width={200} collapsedWidth={118}>
      {messageContext}
      <div
        className="flex items-end justify-between"
        style={{ paddingRight: 16 }}
      >
        <div />
        <button
          onClick={toggleCollapsed}
          className="my-5 px-1 py-5 text-custom-white_100"
        >
          <Collapse
            className={mergeClassName(
              'ease-in hover:scale-110',
              !collapsed && 'rotate-180'
            )}
            size="18"
          />
        </button>
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={[generateDefaultKey(pathname)]}
        selectedKeys={[generateDefaultKey(pathname)]}
        onClick={({ key }) => router.push(key)}
        className="flex flex-col !items-start gap-y-1 !px-1.5"
        items={menuItemRenderer(role)}
      />
      <button
        className={mergeClassName(
          'group absolute bottom-5 left-1 right-1 flex cursor-pointer items-center px-4 py-5 text-xs text-custom-white_100 ease-linear hover:text-custom-red_100',
          collapsed ? 'flex-col gap-y-0.5 pb-0.5 pt-2.5' : 'gap-x-2.5'
        )}
        onClick={handleLogout}
      >
        <Logout className="group-hover:scale-105" size="22" />
        <span>Logout</span>
      </button>
    </Sider>
  );
}

export default SideNav;
