import dynamic from 'next/dynamic';
import { CSSProperties } from 'react';
import SpinLoader from './icons/SpinLoader';

const Spin = dynamic(() => import('antd/es/spin'), {
  loading: () => <Loader />,
});

type FullPageLoaderProps = {
  background?: CSSProperties['background'];
  height?: CSSProperties['height'];
  fullscreen?: boolean;
};

export const Loader = ({ size }: { size?: number }) => {
  return (
    <div className="flex size-full items-center justify-center">
      <span className="animate-spin">
        <SpinLoader size={size} />
      </span>
    </div>
  );
};

export default function FullPageLoader({
  background,
  height,
  fullscreen,
}: FullPageLoaderProps) {
  return (
    <div
      style={{
        background: background || '#f6f4f9',
        height: height,
      }}
      className="flex h-screen w-full items-center justify-center"
    >
      <Spin fullscreen={fullscreen} size="large">
        <div className="content" />
      </Spin>
    </div>
  );
}
