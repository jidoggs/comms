'use client';
import React, { useContext } from 'react';
import { Form, Select, Spin } from 'antd';
import CustomButton from '@/common/components/CustomButton';
// import CustomInput, { CustomTextArea } from '@/common/components/CustomInput';
import Send from '@/common/components/icons/Send';
import Title from '@/common/components/Title';
// import TextArea from 'antd/es/input/TextArea';
import dynamic from 'next/dynamic';
// import { MinuteContext } from '../../service-context/MinuteContextWrapper';
import { CorrAppContext } from '@/app/app/service-context/AppContextWrapper';
import CustomMinute from '@/common/components/CustomMinute';
import { Upload } from 'antd';

const FormItem = dynamic(() => import('antd/es/form/FormItem'), { ssr: true });

const MinuteForm = () => {
  const appContextData = useContext(CorrAppContext);

  return (
    <Form
      className="flex flex-col gap-2"
      form={appContextData?.form}
      initialValues={appContextData?.initialValues}
      onFinish={appContextData?.minuteFormSubmitHandler}
      // onFinish={handleTempFinish}
    >
      {appContextData?.uploadSelected ? (
        <div className="flex flex-row items-center justify-start gap-2 rounded-md border border-custom-gray_400 p-2 ">
          <Title className="pr-2">Upload:</Title>
          <FormItem name="upload" className="!m-0 flex flex-row">
            <Upload.Dragger
              beforeUpload={(_) => false} //eslint-disable-line
              accept={
                'image/png, image/jpeg, image/jpg, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document'
              }
              maxCount={2}
              multiple={true}
              className="flex flex-row items-center"
            >
              <button
                type="button"
                className=" flex-1 rounded border-2 border-custom-gray_400 p-1 uppercase text-custom-main sm:rounded-lg sm:px-2.5 sm:py-2 "
              >
                Upload Document (Max: 2)
              </button>
              {/* </div> */}
            </Upload.Dragger>
          </FormItem>
        </div>
      ) : null}
      <div className="rounded-md border border-custom-gray_400 ">
        <div className="flex flex-row items-center justify-center gap-2 p-2">
          <Title className="pr-2">Primary:</Title>
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
                appContextData?.recipientIsLoading ? (
                  <Spin size="small" />
                ) : null
              }
              allowClear
              className="!border-none !bg-custom-white_100"
              rootClassName="!border-none !bg-custom-white_100"
            />
          </FormItem>
          {appContextData?.attachSelected ? null : (
            <CustomButton
              title="Attach"
              type="text"
              className="hover:!bg-none"
              onClick={appContextData?.setAttached}
            >
              Attach
            </CustomButton>
          )}
        </div>
        {appContextData?.attachSelected ? (
          <div className="flex flex-row items-center justify-center gap-2 p-2">
            <Title className="pr-2">Attach:</Title>
            <FormItem
              //   label="Recipient (Primary)"
              name="attach"
              className="!m-0 flex w-full flex-col"
            >
              <Select
                showSearch
                // placeholder="Select a person"
                optionFilterProp="children"
                onChange={appContextData?.onAttachedRecipientsChange}
                onSearch={appContextData?.onSearch}
                filterOption={appContextData?.filterOption}
                options={appContextData?.options}
                notFoundContent={
                  appContextData?.recipientIsLoading ? (
                    <Spin size="small" />
                  ) : null
                }
                mode="multiple"
                allowClear
                className="!border-none !bg-custom-white_100"
                rootClassName="!border-none !bg-custom-white_100"
              />
            </FormItem>
          </div>
        ) : null}
      </div>
      <FormItem
        name="minute"
        rules={[{ required: true, message: 'Minute is required' }]}
      >
        <CustomMinute />
      </FormItem>

      <div className="flex w-full justify-end">
        <CustomButton
          htmlType="submit"
          icon={<Send />}
          size="small"
          loading={appContextData?.createMinuteLoading}
        >
          Push
        </CustomButton>
      </div>
    </Form>
  );
};

export default MinuteForm;
