import React from 'react';
import DatePicker from 'antd/es/date-picker';
import { TimeRangePickerProps } from 'antd/es/time-picker';

const { RangePicker } = DatePicker;

interface CustomDatePickerProps extends TimeRangePickerProps {
  showTime?: boolean;
}

function CustomDatePicker(props: CustomDatePickerProps) {
  return <RangePicker {...props} />;
}

export default CustomDatePicker;
