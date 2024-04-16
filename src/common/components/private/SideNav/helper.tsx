import React from 'react';
import type { MenuProps } from 'antd';
import {
  Home,
  More,
  Schedule,
  Message,
  FolderOpen,
} from '@/common/components/icons';
import { UserPreDefinedRole, UserRoles } from '@/types';

type MenuItem = Required<MenuProps>['items'][number];

export function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  className?: string,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
    className,
  } as MenuItem;
}

const navClassName = '!flex items-center gap-x-2.5 !p-4 !h-auto gap-y-0.5';

const navItems = {
  HOME: getItem(
    <span>Home</span>,
    '/app/home',
    <span className="">
      <Home size={22} />
    </span>,
    navClassName
  ),
  CORRESPONDENCE: getItem(
    <span className="w-[104px] text-wrap text-start leading-4">
      Correspondence management
    </span>,
    '/app/correspondence',
    <span className="">
      <Message size={22} />
    </span>,
    navClassName
  ),
  SCHEDULES: getItem(
    <span>Schedules</span>,
    '/app/schedule',
    <span className="">
      <Schedule size={22} />
    </span>,
    navClassName
  ),
  ARCHIVES: getItem(
    <span>Archives</span>,
    '/app/archives',
    <span className="">
      <FolderOpen size={22} />
    </span>,
    navClassName
  ),
  MORE: getItem(
    <span>More</span>,
    '/app/more',
    <span className="">
      <More size={22} />
    </span>,
    navClassName
  ),
};

// const accountManagerNav = [
//   navItems.SOURCES,
//   navItems.DISBURSEMENT,
//   navItems.PAYMENT,
// ];

// const stakeHolderNav = [
//   navItems.SOURCES,
//   navItems.DISBURSEMENT,
//   navItems.PAYMENT,
// ];

// const uploaderNav = [navItems.SOURCES];

// const verifierNav = [navItems.SOURCES];

const publicUser: never[] = [];

const superAdminNav = [
  navItems.HOME,
  navItems.CORRESPONDENCE,
  navItems.SCHEDULES,
  navItems.ARCHIVES,
  navItems.MORE,
];

// const adjust = (second) => { third }

const getUserNavItemsByRole = (role: UserRoles) => {
  switch (role) {
    // case UserPreDefinedRole.ACCOUNT_MANAGERS:
    //   return accountManagerNav;
    case UserPreDefinedRole.PUBLIC_USER:
      return publicUser;
    // case UserPreDefinedRole.SENATORS:
    //   return stakeHolderNav;
    case UserPreDefinedRole.SUPER_AMIN:
      return superAdminNav;
    // case UserPreDefinedRole.UPLOADER:
    //   return uploaderNav;
    // case UserPreDefinedRole.USER_MANAGER:
    //   return uploaderNav;
    // case UserPreDefinedRole.VERIFIER:
    //   return verifierNav;
    default:
      return publicUser;
  }
};

export const menuItemRenderer = (role: UserRoles) => {
  const items: MenuItem[] = [...superAdminNav, ...getUserNavItemsByRole(role)];
  return items;
};

export const generateDefaultKey = (path: string) => {
  return path.split('/').splice(0, 3).join('/').split('?')?.[0];
};

export const rootSubmenuKeys = ['sub1', 'sub2', 'sub3'];
