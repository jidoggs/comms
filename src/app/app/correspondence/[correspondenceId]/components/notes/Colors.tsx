import React from 'react';
import { Radio, RadioGroupProps } from 'antd';
import { customThemeColor } from '@/common/utils';

function Colors(props: RadioGroupProps) {
  const options = [
    { label: '', value: customThemeColor.pink_100 },
    { label: '', value: customThemeColor.purple_400 },
    { label: '', value: customThemeColor.purple_300 },
    { label: '', value: customThemeColor.cream_100 },
    { label: '', value: customThemeColor.white_100 },
  ];
  return (
    <Radio.Group
      {...props}
      buttonStyle="outline"
      className="[&>label:nth-child(1)_.ant-radio-inner]:!bg-custom-pink_100 [&>label:nth-child(2)_.ant-radio-inner]:!bg-custom-purple_400 [&>label:nth-child(3)_.ant-radio-inner]:!bg-custom-purple_300 [&>label:nth-child(4)_.ant-radio-inner]:!bg-custom-cream_100 [&>label:nth-child(5)_.ant-radio-inner]:!bg-custom-white_100  [&_.ant-radio-wrapper_.ant-radio-checked::after]:!border-custom-yellow_100 [&_.ant-radio-wrapper_.ant-radio-checked_.ant-radio-inner]:!border-custom-yellow_100 [&_.ant-radio-wrapper_.ant-radio-inner::after]:!bg-transparent [&_label>span:last-child]:!hidden"
      options={options}
    />
  );
}

export default Colors;
