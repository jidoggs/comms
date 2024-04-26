import { useRouter, useSearchParams } from 'next/navigation';
import { useLayoutEffect, useRef } from 'react';

type Props = {
  defaultKey: string;
};
function useTabChange({ defaultKey }: Props) {
  const router = useRouter();
  const tabItem = useSearchParams().get('tab') as string;
  const pageRef = useRef<HTMLElement | null>(null);

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
    pageRef.current?.scrollTo({ top: 0 });
  };
  return {
    handleTabChange,
    tabItem,
    pageRef,
  };
}

export default useTabChange;
