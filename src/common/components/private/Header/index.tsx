'use client';
import React, { lazy, Suspense } from 'react';
import Layout from 'antd/es/layout';
import Dropdown from 'antd/es/dropdown/dropdown';
import { MenuProps } from 'antd/es/menu';
import { useAuth } from '@/app/auth/hooks';
import { useSession } from '@/common/hooks';
import Title from '@/common/components/Title';
import CustomAvatar from '../../Avatar/CustomAvatar';
import Profile from '../../icons/Profile';
import Logout from '../../icons/Logout';
import SpinLoader from '../../icons/SpinLoader';
import Notification from '../notification';

const { Header } = Layout;

const BreadCrumb = lazy(() => import('./BreadCrumb'));

const AppHeader: React.FunctionComponent = () => {
  const { handleLogout } = useAuth();
  const { data } = useSession();

  const isMutating = false;

  const items: MenuProps['items'] = [
    {
      key: '1',
      icon: (
        <span className="">
          <Profile size="18" />
        </span>
      ),
      label: 'View Profile',
    },
    {
      key: '2',
      icon: (
        <span className="">
          <Logout size="18" />
        </span>
      ),
      label: 'Logout',
      onClick: () => {
        handleLogout();
      },
    },
  ];
  return (
    <Header className="flex w-full items-center justify-between !px-5 !py-0.5">
      <Suspense fallback={<div />}>
        <BreadCrumb />
      </Suspense>
      <div className="flex items-center gap-x-2.5">
        <Notification />
        <Dropdown menu={{ items }} placement="bottom" className="flex h-auto">
          {isMutating ? (
            <SpinLoader size="24" />
          ) : (
            <div className="flex cursor-pointer items-center gap-x-2.5 px-1.5 py-0.5 hover:bg-custom-gray_500">
              <CustomAvatar
                size={30}
                src={data?.img}
                icon={
                  <span className="flex h-full flex-1 items-center justify-center">
                    <Profile size="22" className="stroke-white" />
                  </span>
                }
              />
              <div className="flex flex-col">
                <Title semibold>
                  {data?.firstname} {data?.surname || ''}
                </Title>
                <Title small className="text-custom-gray_600">
                  {data?.title}
                </Title>
              </div>
            </div>
          )}
        </Dropdown>
      </div>
    </Header>
  );
};

export default AppHeader;
