'use client';

import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/zh-cn';
import dayLocaleData from 'dayjs/plugin/localeData';
import { Calendar, CalendarProps, Col, Row, Select } from 'antd';
import CustomButton from '@/common/components/CustomButton';
import { Plus } from '@/common/components/icons';
import Title from '@/common/components/Title';

dayjs.extend(dayLocaleData);

const getDataCount = (value: Dayjs) => {
  let dataCount;
  switch (value.date()) {
    case 2:
    case 5:
    case 14:
    case 19:
      dataCount = 3;
      break;
    case 7:
      dataCount = 2;
      break;
    case 12:
      dataCount = 5;
      break;
    case 15:
      dataCount = 1;
      break;
    case 16:
      dataCount = 7;
      break;
    case 21:
      dataCount = 4;
      break;
    case 22:
      dataCount = 6;
      break;
    default:
  }
  return dataCount || '';
};

const CustomCalendar: React.FC = () => {
  const dateCellRender = (value: Dayjs) => {
    const dataCount = getDataCount(value);
    const dayOfWeek = dayjs(value).day();

    return (
      <div className="flex size-[42px] flex-col items-center justify-start gap-y-px">
        <Title>{value.date()}</Title>
        {!dataCount || dayOfWeek === 0 || dayOfWeek === 6 ? null : (
          <Title
            small
            className="size-4 rounded-full bg-custom-main px-1 py-[0.5px] text-center text-custom-white_100"
          >
            {dataCount}
          </Title>
        )}
      </div>
    );
  };

  const fullCellRender: CalendarProps<Dayjs>['fullCellRender'] = (
    current,
    info
  ) => {
    if (info.type === 'date') return dateCellRender(current);
    return info.originNode;
  };
  const disabledDate: CalendarProps<Dayjs>['disabledDate'] = (date) => {
    const dayOfWeek = dayjs(date).day();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return true;
    }

    return false;
  };

  return (
    <div className="rounded shadow-wordBox">
      <Calendar
        fullscreen={false}
        fullCellRender={fullCellRender}
        headerRender={({ value, onChange }) => {
          const start = 0;
          const end = 12;
          const monthOptions = [];

          let current = value.clone();
          const localeData = value.localeData();
          const months = [];
          for (let i = 0; i < 12; i++) {
            current = current.month(i);
            months.push(localeData.months(current));
          }

          for (let i = start; i < end; i++) {
            monthOptions.push(
              <Select.Option key={i} value={i} className="month-item">
                {months[i]}
              </Select.Option>
            );
          }

          const year = value.year();
          const month = value.month();
          const options = [];
          for (let i = year - 10; i < year + 10; i += 1) {
            options.push(
              <Select.Option key={i} value={i} className="year-item">
                {i}
              </Select.Option>
            );
          }
          return (
            <div className="flex items-center justify-between border-b border-custom-gray_500 p-2">
              <Row gutter={8} align="middle">
                <Col>
                  <Select
                    size="small"
                    popupMatchSelectWidth={false}
                    variant="borderless"
                    value={month}
                    onChange={(newMonth) => {
                      const now = value.clone().month(newMonth);
                      onChange(now);
                    }}
                    rootClassName="!text-red-500"
                    className="!text-red-500"
                  >
                    {monthOptions}
                  </Select>
                </Col>
                <Col className="">
                  <Select
                    size="small"
                    variant="borderless"
                    popupMatchSelectWidth={false}
                    className="my-year-select !border-none"
                    value={year}
                    onChange={(newYear) => {
                      const now = value.clone().year(newYear);
                      onChange(now);
                    }}
                  >
                    {options}
                  </Select>
                </Col>
              </Row>
              <CustomButton
                size="small"
                type="text"
                icon={<Plus />}
                borderLeft
              />
            </div>
          );
        }}
        disabledDate={disabledDate}
      />
    </div>
  );
};

export default CustomCalendar;
