import { DatePicker, TimeRangePickerProps } from 'antd';
import React from 'react';

const { RangePicker } = DatePicker;

interface CustomDatePickerProps extends TimeRangePickerProps {
  showTime?: boolean;
}

function CustomDatePicker(props: CustomDatePickerProps) {
  return <RangePicker {...props} />;
}

export default CustomDatePicker;
