import React, { useCallback, useEffect, useState } from 'react';
import Form, { FormInstance } from 'antd/es/form/Form';
import CustomDragger from '@/common/components/CustomDragger';
import CustomInput from '@/common/components/CustomInput';
import CustomButton from '@/common/components/CustomButton';
// import { TableRowActionContext } from '../TableRowAction';
import { CorrespondenceData } from '@/types';
import dynamic from 'next/dynamic';
import { Select, Spin } from 'antd';
import { useDebounce } from '@/common/hooks';
import useCorrespondence from '@/app/app/hooks/useCorrespondence';
import dayjs from 'dayjs';
import { normFile } from '@/common/utils';

// Filter `option.label` match the user type `input`
const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

type Props = {
  handleSubmit: (data: CorrespondenceData) => void; //eslint-disable-line
  form: FormInstance<any>;
  currentCorr: any;
};

const Input = dynamic(() => import('antd/es/input/Input'), { ssr: true });
const FormItem = dynamic(() => import('antd/es/form/FormItem'), { ssr: true });
const TextArea = dynamic(() => import('antd/es/input/TextArea'), { ssr: true });
const DatePicker = dynamic(() => import('antd/es/date-picker'), {
  ssr: true,
});

function NewCorrespondenceForm({ handleSubmit, form, currentCorr }: Props) {
  // const context = useContext(TableRowActionContext);
  const [search, setSearch] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState<{
    value: string;
    type: string;
  } | null>(null);

  const searchDebounce = useDebounce(search);

  const { getRecipientsSwr } = useCorrespondence({
    can_get_all_recipients: true,
    recipient: searchDebounce,
  });

  const onSearch = (value: string) => {
    setSearch(value);
  };

  const modifiedHandleSubmit = (values: any) => {
    const modifiedValues = {
      ...values,
      recipient_type: selectedRecipient?.type,
      recipient: selectedRecipient?.value,
    };

    handleSubmit(modifiedValues);
  };

  const recipientsData = getRecipientsSwr?.data?.data;

  const options = React.useMemo(() => {
    if (!recipientsData) return []; // Handle null or undefined data

    const recipientsDataKeys = Object.keys(recipientsData) as Array<
      keyof typeof recipientsData
    >;

    return recipientsDataKeys.flatMap((key) =>
      recipientsData[key].map((item: any) => ({
        value: item._id,
        type: key,
        label: item.name ? item.name : `${item.firstname} ${item.surname}`,
      }))
    );
  }, [recipientsData]);

  const onRecipientChange = useCallback((value: string, type: string) => {
    setSelectedRecipient({ value, type });
  }, []);

  const onChange = useCallback(
    (value: string) => {
      const option = options.find((opt) => opt.value === value); // Find the selected option
      const selectedType = option?.type; // Get the type from the found option
      if (selectedType) {
        onRecipientChange(value, selectedType);
      } else {
        return;
      }
    },
    [onRecipientChange, options]
  );

  // Update the form values when currentCorr changes.
  useEffect(() => {
    form.setFieldsValue({
      sender: currentCorr?.sender,
      subject: currentCorr?.subject,
      minute: currentCorr?.minute,
      reference_number: currentCorr?.reference_number,
      date_of_correspondence: currentCorr?.created_at
        ? dayjs(currentCorr?.created_at)
        : null,
    });
  }, [currentCorr]); //eslint-disable-line

  return (
    <Form layout="vertical" form={form} onFinish={modifiedHandleSubmit}>
      <div className="flex items-start gap-x-5">
        <FormItem
          // name={[field.name, 'files']}
          valuePropName="fileList"
          // getValueFromEvent={normFile}
          noStyle
          name="files"
          getValueFromEvent={normFile}
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
            className="flex flex-col"
            name="sender"
            rules={[{ required: true, message: 'Sender is required' }]}
          >
            <CustomInput name="sent_by" />
          </FormItem>
          <FormItem
            label="Recipient (Primary)"
            name="recipient"
            // name={[field.name, 'recipient']}
            className="flex flex-col"
            rules={[{ required: true, message: 'Recipient is required' }]}
          >
            <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={filterOption}
              options={options}
              notFoundContent={
                getRecipientsSwr.isLoading ? <Spin size="small" /> : null
              }
              allowClear
            />
          </FormItem>
          <FormItem
            label="Subject"
            name="subject"
            className="flex flex-col"
            rules={[{ required: true, message: 'Subject is required' }]}
          >
            <CustomInput name="subject" />
          </FormItem>
          <FormItem
            label="Minute"
            name="minute"
            className="flex flex-col"
            // rules={[{ required: true, message: 'Minute is required' }]}
          >
            <TextArea name="minute" />
          </FormItem>
          <FormItem
            label="Date of correspondence"
            name="date_of_correspondence"
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
            name="reference_number"
            className="flex flex-col"
            rules={[{ required: true, message: 'Ref. No is required' }]}
          >
            <Input name="ref_no" />
          </FormItem>
        </div>
      </div>
      <div className="border-t pt-4">
        <CustomButton
          size="small"
          className={{
            container: 'justify-end',
          }}
          htmlType="submit"
        >
          Send
        </CustomButton>
      </div>
    </Form>
  );
}

export default NewCorrespondenceForm;
