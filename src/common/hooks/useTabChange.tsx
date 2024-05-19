import { useRouter, useSearchParams } from 'next/navigation';
import { useLayoutEffect } from 'react';

type Props = {
  defaultKey: string;
  resetFields?: () => void;
};

function useTabChange<T = string>({ defaultKey, resetFields }: Props) {
  const router = useRouter();
  const currentTab = useSearchParams().get('tab') as T;

  const base = defaultKey.split('=')?.[0].split('/');
  const query = base[base.length - 1];

  useLayoutEffect(() => {
    if (!currentTab) {
      router.replace(defaultKey);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTab]);

  const handleTabChange = (state: string) => {
    router.push(`${query}=${state}`);
    if (resetFields) {
      resetFields();
    }
  };
  return {
    handleTabChange,
    currentTab,
  };
}

export default useTabChange;
