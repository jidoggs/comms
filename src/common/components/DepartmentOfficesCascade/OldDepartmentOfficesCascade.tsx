import { Cascader } from 'antd';
// import React, { useState } from 'react';
// import type {
//   // MultipleCascaderProps,
//   SingleCascaderProps,
// } from 'antd/es/cascader';

interface Option {
  value: string | number;
  label: string;
  children?: Option[];
}

const options: Option[] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
            children: [
              {
                value: 'zhonghuamen',
                label: 'Zhong Hua Men',
                children: [
                  {
                    value: 'zhonghuamen',
                    label: 'Zhong Hua Men',
                    children: [
                      {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

const DepartmentOfficesCascade = () => {
  // const [selectedValue, setSelectedValue] = useState<string[]>([]); // Array for selected values

  // const onChange = (value: string[]) => {
  //   setSelectedValue(value);
  // };

  // const onChange: SingleCascaderProps<Option>['onChange'] = (
  //   value: string[]
  // ) => {
  //   // console.log(value);
  //   setSelectedValue(value);
  // };

  // const getTitle = () => {
  //   // Extract selected labels based on selectedValue
  //   const selectedLabels = selectedValue.map((value) => {
  //     const option = options.find((opt) => opt.value === value);
  //     return option?.label || ''; // Handle cases where option might not be found
  //   });

  //   // Join labels with separator (optional)
  //   return selectedLabels.join(' > ');
  // };

  return (
    <div className="w-full py-2">
      <div className="w-full overflow-scroll rounded-lg border border-custom-gray_500">
        {/* Display title bar */}
        {/* <div className="text-gray-70 px-3 py-1 font-bold">{getTitle()}</div> */}

        <Cascader.Panel
          options={options}
          // onChange={onChange}
          // value={selectedValue} // Set selected value for initial display
          className="!gap-2 !rounded-none !border-none"
        />
      </div>
    </div>
  );
};

export default DepartmentOfficesCascade;
