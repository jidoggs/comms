import { useRouter, useSearchParams } from 'next/navigation';
import { useLayoutEffect, useRef } from 'react';
import { CustomTableProps } from '../components/CustomTable';

type Props = {
  defaultKey: string;
  resetFields?: () => void;
};

function useTabChange<T = string>({ defaultKey, resetFields }: Props) {
  const router = useRouter();
  const currentTab = useSearchParams().get('tab') as T;
  const pageRef = useRef<HTMLElement | null>(null);

  const components: CustomTableProps<any>['components'] = {
    body: {
      wrapper: (props: any) => <tbody {...props} ref={pageRef} />,
    },
  };

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
    pageRef.current?.firstElementChild?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };
  return {
    handleTabChange,
    currentTab,
    components,
  };
}

export default useTabChange;
