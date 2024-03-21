import React, { lazy, Suspense } from 'react';
import { Dropdown, MenuProps, Avatar, Layout /* message */ } from 'antd';
// import { useAuth, useSession } from "@/app/auth/hooks";
import { Logout, Profile, SpinLoader } from '@/common/components/icons';
// import { apiErrorHandler } from "@/services";
import Title from '@/common/components/Title';
import { dummyUser } from '@/common/mockData/user';

const { Header } = Layout;

const BreadCrumb = lazy(() => import('./BreadCrumb'));

const AppHeader: React.FunctionComponent = () => {
  // const { user, logoutUser } = useSession();
  // const [messageApi, contextHolder] = message.useMessage();
  // const {
  //   logoutMutationSWR: { trigger: triggerLogout, isMutating },
  // } = useAuth();
  const isMutating = false;
  const handleLogout = async () => {
    // try {
    //   await triggerLogout();
    //   logoutUser();
    // } catch (error) {
    //   messageApi.open({
    //     type: "error",
    //     content: apiErrorHandler(error),
    //   });
    //   logoutUser();
    // }
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
    <Header className="flex w-full items-center justify-between px-5 py-4">
      {/* {contextHolder} */}
      <Suspense fallback={<div />}>
        <BreadCrumb />
      </Suspense>
      <div className="flex items-center gap-x-2.5">
        {/* <Flex className="">
          <span className="text-2xl leading-6 relative before:absolute before:bg-red-500 before:w-2 before:h-2 before:rounded-full before:right-0 before:top-0">
            <BellOutlined />
          </span>
        </Flex> */}
        <Dropdown menu={{ items }} placement="bottom" className="flex h-auto">
          {isMutating ? (
            <SpinLoader size="24" />
          ) : (
            <div className="flex cursor-pointer items-center">
              <Avatar
                size={40}
                icon={
                  <span className="flex h-full flex-1 items-center justify-center">
                    <Profile size="22" className="stroke-white" />
                  </span>
                }
              />
              <div className="ml-2.5 flex flex-row">
                <Title className="mb-0.5 text-sm font-semibold">
                  {dummyUser?.first_name} {dummyUser?.last_name}
                </Title>
                <Title className="!text-gray-mist-body !text-xs font-normal">
                  {dummyUser?.['role.name']}
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
