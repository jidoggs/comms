'use client';

import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
// import type { Dayjs } from 'dayjs';
import dayLocaleData from 'dayjs/plugin/localeData';
import { Calendar, Col, Row, Select } from 'antd';
import CustomButton from '@/common/components/CustomButton';
import { Plus } from '@/common/components/icons';
// import { customThemeColor } from '@/common/utils';
// import type { CalendarProps } from 'antd';

dayjs.extend(dayLocaleData);

const CustomCalendar: React.FC = () => {
  const onPanelChange = () =>
    // value: Dayjs, mode: CalendarProps<Dayjs>['mode']
    {
      // console.log(value.format('YYYY-MM-DD'), mode);
    };

  return (
    <div className="shadow-wordBox h-[317px] overflow-hidden rounded bg-custom-white_100">
      <Calendar
        // style={{ background: "white" }}
        rootClassName="!bg-custom-white_100"
        fullscreen={false}
        // disabledDate={dayjs()}
        headerRender={({
          value,
          // type,
          onChange,
          // onTypeChange
        }) => {
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
            <div className="flex items-center justify-between p-2">
              <Row gutter={8} align="middle">
                <Col>
                  {/* <Typography.Title level={4}>
                    {new Date(year, month).toLocaleString('en', {
                      month: 'long',
                    })}
                  </Typography.Title> */}

                  <Select
                    size="small"
                    popupMatchSelectWidth={false}
                    variant="borderless"
                    value={month}
                    // onChange={(newYear) => {
                    //   const now = value.clone().year(newYear);
                    //   onChange(now);
                    // }}
                  >
                    {monthOptions}
                  </Select>

                  {/* <Radio.Group
                    size="small"
                    onChange={(e) => onTypeChange(e.target.value)}
                    value={type}
                  >
                    <Radio.Button value="month">Month</Radio.Button>
                    <Radio.Button value="year">Year</Radio.Button>
                  </Radio.Group> */}
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
                {/* <Col>
                  <Select
                    size="small"
                    popupMatchSelectWidth={false}
                    value={month}
                    onChange={(newMonth) => {
                      const now = value.clone().month(newMonth);
                      onChange(now);
                    }}
                  >
                    {monthOptions}
                  </Select>
                </Col> */}
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
        onPanelChange={onPanelChange}
      />
    </div>
  );
};

export default CustomCalendar;
