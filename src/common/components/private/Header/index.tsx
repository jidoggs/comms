import React, { lazy, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Dropdown, MenuProps, Avatar, Layout, message } from 'antd';
import { clearUserDetails } from '@/service/storage';
import Title from '@/common/components/Title';
import {
  Logout,
  NotificationBell,
  Profile,
  SpinLoader,
} from '@/common/components/icons';
import { dummyUser } from '@/common/mockData/user';

const { Header } = Layout;

const BreadCrumb = lazy(() => import('./BreadCrumb'));

const AppHeader: React.FunctionComponent = () => {
  const router = useRouter();
  const [messageApi] = message.useMessage();

  const isMutating = false;
  const handleLogout = async () => {
    clearUserDetails();
    router.replace('/auth/login');
    messageApi.success('Logout Successful');
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
      {/* {contextHolder} */}
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
                src={(dummyUser as any).img}
                icon={
                  <span className="flex h-full flex-1 items-center justify-center">
                    <Profile size="22" className="stroke-white" />
                  </span>
                }
              />
              <div className="flex flex-col">
                <Title className="text-sm font-semibold">
                  {dummyUser?.firstname} {dummyUser?.lastname}
                </Title>
                <Title small className="text-custom-gray_600">
                  {/* {dummyUser?.['role.name']} */}
                  HM Trade & Inv...
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
