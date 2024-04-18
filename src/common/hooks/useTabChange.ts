import { useRouter, useSearchParams } from 'next/navigation';
import { useLayoutEffect } from 'react';

type Props = {
  defaultKey: string;
};
function useTabChange({ defaultKey }: Props) {
  const router = useRouter();
  const tabItem = useSearchParams().get('tab') as string;

  const base = defaultKey.split('=')?.[0].split('/');
  const query = base[base.length - 1];

  useLayoutEffect(() => {
    if (!tabItem) {
      router.replace(defaultKey);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabItem]);

  const handleTabChange = (state: string) => {
    router.push(`${query}=${state}`);
  };
  return {
    handleTabChange,
    tabItem,
  };
}

export default useTabChange;
