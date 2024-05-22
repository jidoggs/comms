import React from 'react';
import dynamic from 'next/dynamic';
import SpinLoader from './icons/SpinLoader';

const Spin = dynamic(() => import('antd/es/spin'), {
  loading: () => <Loader />,
});

interface FullPageLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  fullscreen?: boolean;
}

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
  style,
  fullscreen,
  ...props
}: FullPageLoaderProps) {
  return (
    <div
      {...props}
      style={{
        ...style,
        background: style?.background || '#f6f4f9',
        height: style?.height,
      }}
      className="flex h-screen w-full items-center justify-center"
    >
      <Spin fullscreen={fullscreen} size="large">
        <div className="content" />
      </Spin>
    </div>
  );
}
