"use client";
import { SWRConfig } from "swr";
import React, { useEffect, lazy, Suspense } from "react";
import { dummyUser } from "@/mockData/user";
import useIsMounted from "@/hooks/useIsMounted";
import FullPageLoader from "@/components/common/FullPageLoader";
// import { useRefreshToken, useSession } from "../auth/hooks";
// import StoreProvider from "@/store";
// import { SpinLoader } from "@/components/icons";

const AppLayout = lazy(() => import("../../components/private/Layout"));

export default function Layout({ children }: { children: React.ReactNode }) {
  const isMounted = useIsMounted();
  // const { checkForAuthenticatedUser, user } = useSession();
  // useRefreshToken();
  // useEffect(() => {
  //   checkForAuthenticatedUser();
  // }, [checkForAuthenticatedUser]);

  return !isMounted ? (
    <FullPageLoader fullscreen />
  ) : (
    <SWRConfig value={{ provider: () => new Map() }}>
      {/* <StoreProvider>
        <Suspense
          fallback={
            <div className="bg-white flex items-center justify-center h-screen text-green-minst">
              <SpinLoader size="56" />
            </div>
          }
        > */}
      <AppLayout user={dummyUser}>{children}</AppLayout>
      {/* </Suspense>
      </StoreProvider> */}
    </SWRConfig>
  );
}
