'use client';
import React, { useContext } from 'react';
import { Form, Select, Spin } from 'antd';
import CustomButton from '@/common/components/CustomButton';
// import CustomInput, { CustomTextArea } from '@/common/components/CustomInput';
import Send from '@/common/components/icons/Send';
import Title from '@/common/components/Title';
import TextArea from 'antd/es/input/TextArea';
import dynamic from 'next/dynamic';
import { MinuteContext } from '../../service-context/MinuteContextWrapper';
import { CorrAppContext } from '@/app/app/service-context/AppContextWrapper';

const FormItem = dynamic(() => import('antd/es/form/FormItem'), { ssr: true });

const MinuteForm = () => {
  const minuteContextData = useContext(MinuteContext);
  const appContextData = useContext(CorrAppContext);

  return (
    <Form
      className="flex flex-col gap-2"
      form={minuteContextData?.form || appContextData?.form}
      initialValues={
        minuteContextData?.initialValues || appContextData?.initialValues
      }
      onFinish={
        minuteContextData?.minuteFormSubmitHandler ||
        appContextData?.minuteFormSubmitHandler
      }
    >
      <div className="flex flex-row items-center justify-center gap-2 rounded-md border border-custom-gray_400 p-2">
        <Title className="pr-2">Primary:</Title>
        {/* <Input className="!rounded-none !border-none !bg-custom-white_100 !px-2 focus-within:!border-none focus:!border-none focus-visible:!border-none active:!border-none" /> */}
        <FormItem
          //   label="Recipient (Primary)"
          name="recipient"
          className="!m-0 flex w-full flex-col"
          rules={[{ required: true, message: 'Recipient is required' }]}
        >
          <Select
            showSearch
            // placeholder="Select a person"
            optionFilterProp="children"
            onChange={appContextData?.onChange}
            onSearch={appContextData?.onSearch}
            filterOption={appContextData?.filterOption}
            options={appContextData?.options}
            notFoundContent={
              appContextData?.recipientIsLoading ? <Spin size="small" /> : null
            }
            allowClear
            className="!border-none !bg-custom-white_100"
            rootClassName="!border-none !bg-custom-white_100"
          />
        </FormItem>
        <CustomButton title="Attach" type="text" className="hover:!bg-none">
          Attach
        </CustomButton>
      </div>
      <FormItem
        name="minute"
        rules={[{ required: true, message: 'Minute is required' }]}
      >
        <TextArea
          className="!bg-custom-white_100 !px-2"
          placeholder="Type minute"
        />
      </FormItem>

      <div className="flex w-full justify-end">
        <CustomButton
          htmlType="submit"
          icon={<Send />}
          size="small"
          loading={
            minuteContextData?.createMinuteLoading ||
            appContextData?.createMinuteLoading
          }
        >
          Push
        </CustomButton>
      </div>
    </Form>
  );
};

export default MinuteForm;
