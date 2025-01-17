import React from 'react';
import { MenuProps } from 'antd/es/menu';
import { UserPreDefinedRole, UserRoles } from '@/types';
import Message from '../../icons/Message';
import Users from '../../icons/Users';
import Building from '../../icons/Building';
import Settings from '../../icons/Settings';
import Schedule from '../../icons/Schedule';
import FolderOpen from '../../icons/FolderOpen';
import More from '../../icons/More';
import Home from '../../icons/Home';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
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

const generateRoutes = (items: Record<string, MenuItem>) => {
  const values = Object.values(items);
  return values;
};

const navClassName = '!flex items-center gap-x-2.5 !p-4 !h-auto gap-y-0.5';

const navItems = {
  user: {
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
  },
  admin: {
    PEOPLE: getItem(
      <span>People</span>,
      '/admin/people',
      <span className="">
        <Users size={22} />
      </span>,
      navClassName
    ),
    DEPARTMENTS: getItem(
      <span>
        Departments <br className="" />& Offices
      </span>,
      '/admin/departments',
      <span className="">
        <Building size={22} />
      </span>,
      navClassName
    ),
    ADMIN_USER_MANAGEMENT: getItem(
      <span>
        User <br className="" />
        Management
      </span>,
      '/admin/user-management',
      <span className="">
        <Settings size={22} />
      </span>,
      navClassName
    ),
    ADMIN_ARCHIVES: getItem(
      <span>Archive</span>,
      '/admin/archive',
      <span className="">
        <FolderOpen size={22} />
      </span>,
      navClassName
    ),
    ADMIN_MORE: getItem(
      <span>More</span>,
      '/admin/more',
      <span className="">
        <More size={22} />
      </span>,
      navClassName
    ),
  },
};

const getUserNavItemsByRole = (role: UserRoles) => {
  let routes = null;
  switch (role) {
    case UserPreDefinedRole.PRIMARYADMIN:
      routes = generateRoutes({ ...navItems.user, ...navItems.admin }); // this user should be able to see both the pages
      break;
    // case UserPreDefinedRole.PRIMARYADMIN:
    case UserPreDefinedRole.SECONDARYADMIN:
      routes = generateRoutes(navItems.admin);
      break;
    case UserPreDefinedRole.BASICUSER:
      routes = generateRoutes(navItems.user);
      break;
    default:
      routes = generateRoutes(navItems.user);
      break;
  }
  return routes;
};

export const menuItemRenderer = (role: UserRoles) => {
  const items = getUserNavItemsByRole(role);
  return items;
};

export const generateDefaultKey = (path: string) => {
  return path.split('/').splice(0, 3).join('/').split('?')?.[0];
};
