'use client';

import { Progress } from 'antd';

type CustomProgressProps = {
  percent: number;
};

const CustomProgress = ({ percent }: CustomProgressProps) => {
  return <Progress percent={percent} />;
};

export default CustomProgress;
