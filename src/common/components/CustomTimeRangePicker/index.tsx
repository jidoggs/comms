import { DatePicker, TimeRangePickerProps } from 'antd';
import dayjs from 'dayjs';
import React from 'react';

interface CustomDatePickerProps extends TimeRangePickerProps {
  showTime?: boolean;
}

function CustomTimeRangePicker(props: CustomDatePickerProps) {
  return (
    <DatePicker.RangePicker
      {...props}
      format="HH:mm"
      showTime={{
        defaultValue: [dayjs('00:00:00', 'HH:mm'), dayjs('23:59:59', 'HH:mm')],
        format: 'HH:mm',
      }}
    />
  );
}

export default CustomTimeRangePicker;
