import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { useLayoutEffect } from 'react';
import {
  fetchOptions,
  useNonAuthRequest,
  useAuthRequest,
  useNonAuthGetRequest,
} from '@/service/swrHooks';
import { ENDPOINTS } from '@/service/config/endpoint';
import { queryHandler } from '@/service/request';
import * as store from '@/service/storage';
import { UserSession } from '@/app/auth/types/auth';
import { isServer } from '@/common/utils';
import { initialDataList } from '@/common/hooks/useSectionCascade';
import { InviteQuery } from '../types';

type RequestType = 1 | 2 | 3;

type Props = Partial<{ step: RequestType; email?: string }>;

const { ONBOARD, ONBOARD_STATUS } = ENDPOINTS.AUTH;
const { UPDATE } = ENDPOINTS.USER;

function useOnboarding(props?: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const parastatal = searchParams.get('parastatal') || '';
  const office = searchParams.get('office') || '';
  const department = searchParams.get('department') || '';
  const email = searchParams.get('email') || '';

  const query = queryHandler({ parastatal, office, department });

  const token = store.fetchUserToken();

  const getFinalOfficeStep = (): keyof typeof initialDataList => {
    if (department) {
      return 'department';
    }
    if (office) {
      return 'office';
    }
    return 'parastatal';
  };

  const finalOfficeStep = getFinalOfficeStep();

  useLayoutEffect(() => {
    // if onboarding user is not in step one and there is no token kick the user to login
    if (props?.step === 1 || isServer) return;
    if (!token) {
      redirect('/auth/login');
    }
  }, [token]); //eslint-disable-line

  useNonAuthGetRequest<InviteQuery>(
    props?.step === 1 && email ? ONBOARD_STATUS(email) : '',
    {
      ...fetchOptions,
      onSuccess(res) {
        if (res.data.step !== 'personal') {
          store.storeUserToken(res.data.access_token);
        }
        if (res.data.step === 'office') {
          router.replace(`/onboarding/office-info${query}`);
        }
        if (res.data.step === 'password') {
          router.replace(`/onboarding/set-password`);
        }
      },
    }
  );

  const nonAuthSwr = useNonAuthRequest<UserSession>(
    props?.step === 1 ? ONBOARD : '',
    {
      onSuccess(res) {
        store.storeUserToken(res.data.access_token);
        store.storeRefreshToken(res.data.refresh_token);
        store.setItem('uid', res.data._id);
        router.replace(`/onboarding/office-info${query}`);
      },
    }
  );

  const authSwr = useAuthRequest(
    props?.step && props.step !== 1 ? UPDATE : '',
    {
      onSuccess: () => {
        if (!props?.step) return;
        if (props.step === 2) {
          router.replace(`/onboarding/set-password`);
        }
        if (props.step === 3) {
          store.clearData();
          router.replace(`/onboarding/success`);
        }
      },
    }
  );

  return {
    authSwr,
    nonAuthSwr,
    onBoardingParastatal: parastatal,
    onBoardingOffice: office,
    onBoardingDepartment: department,
    finalOfficeStep,
  };
}

export default useOnboarding;
