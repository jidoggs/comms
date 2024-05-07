'use client';

import dynamic from 'next/dynamic';

const Progress = dynamic(() => import('antd/es/progress/progress'));

type CustomProgressProps = {
  percent: number;
};

const CustomProgress = ({ percent }: CustomProgressProps) => {
  return <Progress percent={percent} />;
};

export default CustomProgress;
