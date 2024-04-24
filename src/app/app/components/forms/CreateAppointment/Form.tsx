import React from 'react';
import { Form } from 'antd';
import CustomInput from '@/common/CustomInput';
import DatePickerAndTimeRange from '@/app/app/home/components/DateAndTimePicker';
import CustomButton from '@/common/components/CustomButton';
import { Send } from '@/common/components/icons';
import { correspondenceCreateMeeting } from './helper';
import { createAppointment } from './type';

type FieldType = createAppointment;

type Props = {
  handleSubmit: () => void;
};

const CreateAppointmentForm = ({ handleSubmit }: Props) => {
  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <CustomInput
        name="Name of appointment"
        label="Name of Appointment"
        placeholder="Aa"
      />
      <div className="my-6">
        <DatePickerAndTimeRange />
      </div>

      {correspondenceCreateMeeting.map((item) => (
        <Form.Item<FieldType> key={item.name}>
          <div className="flex flex-col gap-1">
            <CustomInput
              name={item.name}
              label={item.label}
              placeholder={item.placeholder}
            />
          </div>
        </Form.Item>
      ))}
      <hr />
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start  gap-1">
          <input type="checkbox" />
          <label htmlFor="id">mark as tentative</label>
        </div>
        <div>
          <CustomButton icon={<Send />} size="small">
            Push
          </CustomButton>
        </div>
      </div>
    </Form>
  );
};

export default CreateAppointmentForm;
