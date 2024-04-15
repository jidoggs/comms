import React, { useState } from 'react';
import { Checkbox, DatePicker, TimePicker } from 'antd';
import CustomButton from '@/common/components/CustomButton';

import { Add } from '@/common/components/icons';
import { DateTimeEntry } from './types';
import { generateNewDateTimeEntry } from './helper';

const DateTimePicker: React.FC = () => {
  const [dateTimes, setDateTimes] = useState<DateTimeEntry[]>([]);
  const [selectedDateId, setSelectedDateId] = useState<number | null>(null);

  const handleAddDateTime = () => {
    const newDateTime: DateTimeEntry = generateNewDateTimeEntry(dateTimes.length + 1);
    setDateTimes([...dateTimes, newDateTime]);
  };

  const handleDateTimeChange = (
    id: number,
    field: keyof DateTimeEntry,
    value: any
  ) => {
    const updatedDateTimes = dateTimes.map((dateTime) =>
      dateTime.id === id ? { ...dateTime, [field]: value } : dateTime
    );
    setDateTimes(updatedDateTimes);

    if (field === 'date') {
      setSelectedDateId(value ? id : null);
    }
  };

  const renderDateAndTimePickers = () => {
    return dateTimes.map((dateTime) => (
      <div key={dateTime.id} className="mb-2 flex gap-2">
        <DatePicker
          value={dateTime.date}
          onChange={(value: any) =>
            handleDateTimeChange(dateTime.id, 'date', value)
          }
        />

        <TimePicker.RangePicker
          value={dateTime.time}
          onChange={(value: any) =>
            handleDateTimeChange(dateTime.id, 'time', value)
          }
          disabled={!dateTime.date || dateTime.id !== selectedDateId}
        />

        <div className="flex items-center justify-center">
          <Checkbox>All day</Checkbox>
        </div>
      </div>
    ));
  };

  return (
    <div>
      {renderDateAndTimePickers()}
      <CustomButton
        className={{ container: 'mx-4 justify-start' }}
        icon={<Add />}
        onClick={handleAddDateTime}
      >
        Add Date & Time
      </CustomButton>
    </div>
  );
};

export default DateTimePicker;
