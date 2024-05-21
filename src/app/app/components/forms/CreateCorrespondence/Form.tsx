import React from 'react';
import { FormListFieldData } from 'antd/es/form';
// import CustomDragger from '@/common/components/CustomDragger';
import CustomInput from '@/common/components/CustomInput';
import dynamic from 'next/dynamic';
import Recipient from './Recipient';
import { normFile } from '@/common/utils';

interface CorrespondenceFormProps {
  field: FormListFieldData;
  handleRecipientChange: (value: string, type: string) => void;
}
const Input = dynamic(() => import('antd/es/input/Input'), { ssr: true });
const FormItem = dynamic(() => import('antd/es/form/FormItem'), { ssr: true });
const TextArea = dynamic(() => import('antd/es/input/TextArea'), { ssr: true });
const DatePicker = dynamic(() => import('antd/es/date-picker'), {
  ssr: true,
});
const CustomDragger = dynamic(
  () => import('@/common/components/CustomDragger'),
  {
    ssr: true,
  }
);

function NewCorrespondenceForm({
  field,
  handleRecipientChange,
}: CorrespondenceFormProps) {
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
          <Recipient field={field} onRecipientChange={handleRecipientChange} />
          <FormItem
            label="Subject"
            name={[field.name, 'subject']}
            className="flex flex-col"
            rules={[{ required: true, message: 'Subject is required' }]}
          >
            <CustomInput name="subject" />
            {/* <Recipient /> */}
          </FormItem>
          <FormItem
            label="Minute"
            name={[field.name, 'minute']}
            className="flex flex-col"
            // rules={[{ required: true, message: 'Minute is required' }]}
          >
            <TextArea name="minute" />
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
            <Input name="ref_no" />
          </FormItem>
        </div>
      </div>
    </div>
  );
}

export default NewCorrespondenceForm;
