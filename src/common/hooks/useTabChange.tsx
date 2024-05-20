import { useRouter, useSearchParams } from 'next/navigation';
import { useLayoutEffect } from 'react';

type Props = {
  defaultKey?: string;
  resetFields?: () => void;
};

function useTabChange<T = string>(args?: Props) {
  const router = useRouter();
  const currentTab = useSearchParams().get('tab') as T;

  useLayoutEffect(() => {
    if (!args?.defaultKey) return;
    if (!currentTab) {
      router.replace(args.defaultKey);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTab]);

  const handleTabChange = (state: string) => {
    if (!args?.defaultKey) return;
    const base = args.defaultKey.split('=')?.[0].split('/');
    const query = base[base.length - 1];
    router.push(`${query}=${state}`);
    if (args?.resetFields) {
      args.resetFields();
    }
  };
  return {
    handleTabChange,
    currentTab,
  };
}

export default useTabChange;
