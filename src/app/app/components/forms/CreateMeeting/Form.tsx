import React from 'react';
import { Checkbox, CheckboxProps, Form } from 'antd';
import CustomTimeRangePicker from '@/common/components/CustomTimeRangePicker';
import CustomInput, { CustomTextArea } from '@/common/components/CustomInput';
import CustomButton from '@/common/components/CustomButton';
import { Send } from '@/common/components/icons';
import { createMeetingFormInputs } from './helper';
import { MeetingData } from './types';

type FieldType = MeetingData;

type Props = {
  onFinish: (values: MeetingData) => void; //eslint-disable-line
};

function NewMeetingForm({ onFinish }: Props) {
  const onChange: CheckboxProps['onChange'] = (e) => {
    console.log(`checked = ${e.target.checked}`); //eslint-disable-line
  };
  return (
    <Form layout="vertical" className="!pt-5" onFinish={onFinish}>
      {createMeetingFormInputs.map((item) => {
        if (item.name === 'date_time') {
          return (
            <Form.Item<FieldType>
              key={item.name}
              {...item}
              className="flex flex-col"
            >
              <CustomTimeRangePicker />
            </Form.Item>
          );
        }
        if (item.name === 'note') {
          return (
            <Form.Item<FieldType>
              key={item.name}
              {...item}
              className="flex flex-col"
            >
              <CustomTextArea name={item.name} placeholder={item.placeholder} />
            </Form.Item>
          );
        }
        return (
          <Form.Item<FieldType>
            key={item.name}
            {...item}
            className="flex flex-col"
          >
            <CustomInput name={item.name} placeholder={item.placeholder} />
          </Form.Item>
        );
      })}
      <div className="flex items-center justify-between border-t border-custom-gray_400 pl-2 pt-4">
        <Form.Item<FieldType>>
          <Checkbox name="is_tentative" onChange={onChange}>
            Mark as tentative
          </Checkbox>
        </Form.Item>
        <CustomButton htmlType="submit" icon={<Send />} size="small">
          Push
        </CustomButton>
      </div>
    </Form>
  );
}

export default NewMeetingForm;
