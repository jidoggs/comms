import React from 'react';
import { motion } from 'framer-motion';
import { Cascader } from 'antd';

interface Option {
  value: string | number;
  label: string;
  children?: Option[];
}

const options: Option[] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'westLake',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jim',
    label: 'Jiim',
    children: [
      {
        value: 'nanjingg',
        label: 'Nanjingg',
        children: [
          {
            value: 'zhonghuamena',
            label: 'Zhong Hua Mena',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsus',
    label: 'Jiangsus',
    children: [
      {
        value: 'nanjings',
        label: 'Nanjings',
        children: [
          {
            value: 'zhonghuamend',
            label: 'Zhong Hua Mend',
          },
          {
            value: 'zhonghuamend',
            label: 'Zhong Hua Mend',
          },
          {
            value: 'zhonghuamendk',
            label: 'Zhong Hua Mend',
          },
          {
            value: 'zhonghuamendl',
            label: 'Zhong Hua Mend',
          },
          {
            value: 'zhonghuamendh',
            label: 'Zhong Hua Mend',
          },
          {
            value: 'zhonghuamendh',
            label: 'Zhong Hua Mend',
          },
        ],
      },
      {
        value: 'nanjingj',
        label: 'Nanjingj',
        children: [
          {
            value: 'zhonghuamenj',
            label: 'Zhong Hua Menj',
          },
          {
            value: 'zhonghuamenj',
            label: 'Zhong Hua Menj',
          },
          {
            value: 'zhonghuameng',
            label: 'Zhong Hua Men',
          },
          {
            value: 'zhonghuamenge',
            label: 'Zhong Hua Men',
          },
        ],
      },
      {
        value: 'nanjingq',
        label: 'Nanjingq',
        children: [
          {
            value: 'zhonghuameny',
            label: 'Zhong Hua Men',
          },
          {
            value: 'zhonghuamenu',
            label: 'Zhong Hua Men',
          },
          {
            value: 'zhonghuament',
            label: 'Zhong Hua Men',
          },
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
          {
            value: 'zhonghuamenq',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

// const onChange = (value: string[]) => {
//   console.log(value);
// };

const Documents = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
      }}
      className="relative flex size-full flex-col"
    >
      <div className="mt-5">
        <Cascader.Panel
          options={options}
          // onChange={onChange}
          rootClassName="!border-custom-gray_500 !border-none"
        />
      </div>
    </motion.div>
  );
};

export default Documents;
