import React from 'react';
import Checkbox, { CheckboxProps } from 'antd/es/checkbox';
import Form from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import CustomTimeRangePicker from '@/common/components/CustomTimeRangePicker';
import CustomInput, { CustomTextArea } from '@/common/components/CustomInput';
import CustomButton from '@/common/components/CustomButton';

import { createMeetingFormInputs } from './helper';
import { MeetingData } from './types';
import Send from '@/common/components/icons/Send';

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
            <FormItem<FieldType>
              key={item.name}
              {...item}
              className="flex flex-col"
            >
              <CustomTimeRangePicker />
            </FormItem>
          );
        }
        if (item.name === 'note') {
          return (
            <FormItem<FieldType>
              key={item.name}
              {...item}
              className="flex flex-col"
            >
              <CustomTextArea name={item.name} placeholder={item.placeholder} />
            </FormItem>
          );
        }
        return (
          <FormItem<FieldType>
            key={item.name}
            {...item}
            className="flex flex-col"
          >
            <CustomInput name={item.name} placeholder={item.placeholder} />
          </FormItem>
        );
      })}
      <div className="flex items-center justify-between border-t border-custom-gray_400 pl-2 pt-4">
        <FormItem<FieldType>>
          <Checkbox name="is_tentative" onChange={onChange}>
            Mark as tentative
          </Checkbox>
        </FormItem>
        <CustomButton htmlType="submit" icon={<Send />} size="small">
          Push
        </CustomButton>
      </div>
    </Form>
  );
}

export default NewMeetingForm;
