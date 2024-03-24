import React, { useState } from 'react';

interface TimeRange {
  from: string;
  to: string;
}

interface ScheduleItem {
  date: string;
  timeRanges: TimeRange[];
}

const DatePickerAndTimeRange: React.FC = () => {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);

  const handleAddDate = () => {
    setSchedule([
      ...schedule,
      { date: '', timeRanges: [{ from: '', to: '' }] },
    ]);
  };

  const handleAddTimeRange = (dateIndex: number) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[dateIndex].timeRanges.push({ from: '', to: '' });
    setSchedule(updatedSchedule);
  };

  const handleDeleteDate = (dateIndex: number) => {
    const updatedSchedule = [...schedule];
    updatedSchedule.splice(dateIndex, 1);
    setSchedule(updatedSchedule);
  };

  const handleDeleteTimeRange = (dateIndex: number, timeRangeIndex: number) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[dateIndex].timeRanges.splice(timeRangeIndex, 1);
    setSchedule(updatedSchedule);
  };

  const handleDateChange = (dateIndex: number, date: string) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[dateIndex].date = date;
    setSchedule(updatedSchedule);
  };

  const handleTimeRangeChange = (
    dateIndex: number,
    timeRangeIndex: number,
    fieldName: keyof TimeRange,
    value: string
  ) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[dateIndex].timeRanges[timeRangeIndex][fieldName] = value;
    setSchedule(updatedSchedule);
  };

  return (
    <div>
      <button onClick={handleAddDate}>Add Date</button>
      {schedule.map((item, dateIndex) => (
        <div key={dateIndex}>
          <input
            type="date"
            value={item.date}
            onChange={(e) => handleDateChange(dateIndex, e.target.value)}
          />
          <button onClick={() => handleDeleteDate(dateIndex)}>
            Delete Date
          </button>
          {item.timeRanges.map((timeRange, timeRangeIndex) => (
            <div key={timeRangeIndex}>
              <input
                type="time"
                value={timeRange.from}
                onChange={(e) =>
                  handleTimeRangeChange(
                    dateIndex,
                    timeRangeIndex,
                    'from',
                    e.target.value
                  )
                }
              />
              <input
                type="time"
                value={timeRange.to}
                onChange={(e) =>
                  handleTimeRangeChange(
                    dateIndex,
                    timeRangeIndex,
                    'to',
                    e.target.value
                  )
                }
              />
              <button
                onClick={() => handleDeleteTimeRange(dateIndex, timeRangeIndex)}
              >
                Delete Time Range
              </button>
            </div>
          ))}
          <button
            className="block"
            onClick={() => handleAddTimeRange(dateIndex)}
          >
            Add Time Range
          </button>
        </div>
      ))}
    </div>
  );
};

export default DatePickerAndTimeRange;
