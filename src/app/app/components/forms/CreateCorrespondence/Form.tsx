import React from 'react';
import { FormListFieldData } from 'antd/es/form';
import CustomInput, { CustomTextArea } from '@/common/components/CustomInput';
import dynamic from 'next/dynamic';
import Recipient from '../../Recipient';
import { normFile } from '@/common/utils';

interface CorrespondenceFormProps {
  field: FormListFieldData;
}

const FormItem = dynamic(() => import('antd/es/form/FormItem'), { ssr: true });
const DatePicker = dynamic(() => import('antd/es/date-picker'), {
  ssr: true,
});
const CustomDragger = dynamic(
  () => import('@/common/components/CustomDragger'),
  {
    ssr: true,
  }
);

function NewCorrespondenceForm({ field }: CorrespondenceFormProps) {
  return (
    <div className="mb-5 border-b border-custom-gray_400">
      <div className="flex items-start gap-x-5">
        <FormItem
          name={[field.name, 'files']}
          valuePropName="fileList"
          getValueFromEvent={normFile}
          noStyle
        >
          <CustomDragger
            maxCount={5}
            multiple={true}
            accept="image/png, image/jpeg, image/jpg, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          />
        </FormItem>
        <div className="flex-1">
          <FormItem
            label="Sender - Who sent it"
            name={[field.name, 'sender']}
            className="flex flex-col"
            rules={[{ required: true, message: 'Sender is required' }]}
          >
            <CustomInput name="sent_by" />
          </FormItem>
          <FormItem
            label="Recipient (Primary)"
            name={[field.name, 'recipient']}
            className="flex flex-col"
            rules={[{ required: true, message: 'Recipient is required' }]}
          >
            <Recipient placeholder="Select a person" />
          </FormItem>
          <FormItem
            label="Subject"
            name={[field.name, 'subject']}
            className="flex flex-col"
            rules={[{ required: true, message: 'Subject is required' }]}
          >
            <CustomInput name="subject" />
          </FormItem>
          <FormItem
            label="Minute"
            name={[field.name, 'minute']}
            className="flex flex-col"
          >
            <CustomTextArea name="minute" />
          </FormItem>
          <FormItem
            label="Date of correspondence"
            name={[field.name, 'date_of_correspondence']}
            className="flex flex-col"
            // rules={[
            //   { required: true, message: 'Date of correspondence is required' },
            // ]}
          >
            <DatePicker
              name="created_at"
              className="w-full !bg-custom-white_100"
            />
          </FormItem>
          <FormItem
            label="Ref. No"
            name={[field.name, 'reference_number']}
            className="flex flex-col"
            rules={[{ required: true, message: 'Ref. No is required' }]}
          >
            <CustomInput name="ref_no" />
          </FormItem>
        </div>
      </div>
    </div>
  );
}

export default NewCorrespondenceForm;
