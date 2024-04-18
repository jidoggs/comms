'use client';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Layout, Menu, MenuProps, Grid } from 'antd';
import {
  generateDefaultKey,
  menuItemRenderer,
  rootSubmenuKeys,
} from './helper';
import { Collapse, Logout } from '@/common/components/icons';
import { mergeClassName } from '@/common/utils';
import { UserPreDefinedRole } from '@/types';

const { Sider } = Layout;
const { useBreakpoint } = Grid;

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
    <Sider collapsed={collapsed} width={200} collapsedWidth={118}>
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
        openKeys={openKeys}
        onOpenChange={onOpenChange}
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
      >
        <Logout className="group-hover:scale-105" size="22" />
        <span>Logout</span>
      </button>
    </Sider>
  );
}

export default SideNav;
