import React from "react";
import type { MenuProps } from "antd";
import { UserPreDefinedRole, UserRoles } from "@/app/auth/types/auth";
import { Home, More, Archive, Schedule } from "@/common/components/icons";

type MenuItem = Required<MenuProps>["items"][number];

export function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const navItems = {
  HOME: getItem(
    <span>Home</span>,
    "/app/home",
    <span className="mr-2">
      <Home size="22" />
    </span>
  ),
  SCHEDULES: getItem(
    <span>Schedules</span>,
    "/app/schedule",
    <span className="mr-2">
      <Schedule size="22" />
    </span>
  ),
  ARCHIVES: getItem(
    <span>Archives</span>,
    "/app/archives",
    <span className="mr-2">
      <Archive size="22" />
    </span>
  ),
  MORE: getItem(
    <span>More</span>,
    "/app/more",
    <span className="mr-2">
      <More size="22" />
    </span>
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
  navItems.SCHEDULES,
  navItems.ARCHIVES,
  navItems.MORE,
];

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
  return path.split("/").splice(0, 3).join("/").split("?")?.[0];
};

export const rootSubmenuKeys = ["sub1", "sub2", "sub3"];
