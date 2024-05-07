import React from 'react';
import Form from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import CustomInput from '@/common/components/CustomInput';
import DatePickerAndTimeRange from '@/app/app/home/components/DateAndTimePicker';
import CustomButton from '@/common/components/CustomButton';
import { correspondenceCreateMeeting } from './helper';
import { createAppointment } from './type';
import Send from '@/common/components/icons/Send';

type FieldType = createAppointment;

type Props = {
  handleSubmit: () => void;
};

const CreateAppointmentForm = ({ handleSubmit }: Props) => {
  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <FormItem<FieldType> label="Name of Appointment">
        <CustomInput name="Name of appointment" placeholder="Aa" />
      </FormItem>
      <div className="my-6">
        <DatePickerAndTimeRange />
      </div>

      {correspondenceCreateMeeting.map((item) => (
        <FormItem<FieldType>
          key={item.name}
          label={item.label}
          name={item.name}
        >
          <div className="flex flex-col gap-1">
            <CustomInput name={item.name} placeholder={item.placeholder} />
          </div>
        </FormItem>
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
