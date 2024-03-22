'use client';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import {
  generateDefaultKey,
  menuItemRenderer,
  rootSubmenuKeys,
} from '@/common/components/private/SideNav/helper';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { UserPreDefinedRole } from '@/app/auth/types/auth';
import { Collapse, Logout } from '@/common/components/icons';

const { Sider } = Layout;

function SideNav({ role }: { role: UserPreDefinedRole }) {
  const router = useRouter();
  const pathname = usePathname();
  const [openKeys, setOpenKeys] = useState(['sub1']);
  const [collapsed, setCollapsed] = useState(false);
  const { lg } = useBreakpoint();

  useEffect(() => {
    if (lg) {
      setCollapsed(false);
    }
  }, [lg]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Sider
      // collapsible
      collapsed={collapsed}
      // onCollapse={(value) => setCollapsed(value)}
      width={118}
      // className="h-screen"
      style={{ paddingTop: 32 }}
    >
      <div
        className="flex items-end justify-between"
        style={{ paddingRight: 16 }}
      >
        <div />
        <button onClick={toggleCollapsed}>
          {collapsed ? <Collapse size="18" /> : <Collapse size="18" />}
        </button>
      </div>

      <div className="flex w-full flex-col gap-y-12 py-6">
        {/* <Image
          src="/images/logoministry.png"
          alt="ministry"
          width={100}
          height={48}
          className="mx-auto w-auto"
          priority
        /> */}
        <Menu
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          defaultSelectedKeys={[generateDefaultKey(pathname)]}
          inlineCollapsed={collapsed}
          onClick={({ key }) => router.push(key)}
          className="flex flex-col gap-y-1 px-1.5"
          items={menuItemRenderer(role)}
        />
      </div>
      <div className="absolute bottom-10 right-1/2 cursor-pointer">
        <Logout size="26" />
      </div>
    </Sider>
  );
}

export default SideNav;
