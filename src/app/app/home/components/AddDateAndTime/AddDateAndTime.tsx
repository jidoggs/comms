// useDateTimePicker.tsx
import React, { useState } from 'react';
import { Checkbox } from 'antd';
import CustomButton from '@/common/components/CustomButton';
import CustomDatePicker from '@/common/components/CustomDatePicker';
import CustomTimeRangePicker from '@/common/components/CustomTimeRangePicker';
import { Add } from '@/common/components/icons';
import {  generateNewDateTimeEntry, INITIAL_DATE_TIME } from "./helper";
import {DateTimeEntry,} from "./types"

const useDateTimePicker = () => {
  const [dateTimes, setDateTimes] = useState<DateTimeEntry[]>([INITIAL_DATE_TIME]);
  const [nextId, setNextId] = useState<number>(1);

  const handleAddDateTime = () => {
    const newDateTime: DateTimeEntry = generateNewDateTimeEntry(nextId);
    setNextId(nextId + 1);
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
  };

  const renderDateAndTimePickers = () => {
    return dateTimes.map((dateTime) => (
      <div key={dateTime.id} className="mb-2 flex gap-2">
        <CustomDatePicker
          value={dateTime.date}
          onChange={(value: any) =>
            handleDateTimeChange(dateTime.id, 'date', value)
          }
         
        />
        <CustomTimeRangePicker
          value={dateTime.time}
          onChange={(value: any) =>
            handleDateTimeChange(dateTime.id, 'time', value)
          }
         
        />
        <div className="flex justify-center items-center">
          <Checkbox>All day</Checkbox>
        </div>
      </div>
    ));
  };

  const AddDateTimeButton = () => (
    <CustomButton className={{container:"justify-start mx-5"}} icon={<Add />} onClick={handleAddDateTime}>
      Add Date and Time
    </CustomButton>
  );

  return { renderDateAndTimePickers, AddDateTimeButton };
};

export default useDateTimePicker;
