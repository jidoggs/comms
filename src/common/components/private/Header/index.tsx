import React, { lazy, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Dropdown, MenuProps, Avatar, Layout, message } from 'antd';
import { useSWRConfig } from 'swr';
import useAuth from '@/app/auth/hooks/useAuth';
import Title from '@/common/components/Title';
import {
  Logout,
  NotificationBell,
  Profile,
  SpinLoader,
} from '@/common/components/icons';
import { clearUserDetails } from '@/service/storage';

const { Header } = Layout;

const BreadCrumb = lazy(() => import('./BreadCrumb'));

const AppHeader: React.FunctionComponent = () => {
  const router = useRouter();
  const { data } = useAuth({ user: true }).userSwr;
  const [messageApi, contextHolder] = message.useMessage();
  const { mutate } = useSWRConfig();
  const isMutating = false;
  const handleLogout = async () => {
    clearUserDetails();
    //eslint-disable-next-line
    mutate((_) => true, undefined, { revalidate: false }).then(() => {
      messageApi.success('Logging User out...').then(() => {
        router.replace('/auth/login');
      });
    });
  };

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
      {contextHolder}
      <Suspense fallback={<div />}>
        <BreadCrumb />
      </Suspense>
      <div className="flex items-center gap-x-2.5">
        <button className="p-2">
          <span className="">
            <NotificationBell />
          </span>
        </button>
        <Dropdown menu={{ items }} placement="bottom" className="flex h-auto">
          {isMutating ? (
            <SpinLoader size="24" />
          ) : (
            <div className="flex cursor-pointer items-center gap-x-2.5 px-1.5 py-0.5">
              <Avatar
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
                  {data?.firstname} {data?.lastname}
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
