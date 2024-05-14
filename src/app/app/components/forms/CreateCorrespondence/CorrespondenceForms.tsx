'use client';
import React, { useState } from 'react';
// import { Form, useForm } from 'antd'
import CustomButton from '@/common/components/CustomButton';
import Add from '@/common/components/icons/Add';
import Form, { useForm } from 'antd/es/form/Form';
import List from 'antd/es/form/FormList';
import Delete from '@/common/components/icons/Delete';
import Title from '@/common/components/Title';
import Copy from '@/common/components/icons/Copy';
import NewCorrespondenceForm from './Form';
import { CorrespondenceData } from '@/types';

interface CorrespondenceFormsProps {
  handleSubmit: (data: CorrespondenceData) => void;
}

const CorrespondenceForms = ({ handleSubmit }: CorrespondenceFormsProps) => {
  const [form] = useForm();
  const [isFormValid, setIsFormValid] = useState(false);

  const hasData = (corrData: any) => {
    // Check for the existence of the fields you consider essential
    return (
      corrData.sender ||
      corrData.subject ||
      corrData.minute ||
      corrData.file ||
      corrData.date_of_correspondence ||
      corrData.recipient
    );
  };

  const checkFormValidity = () => {
    const values = form.getFieldsValue();
    const allCorrespondences = values.correspondences;

    // Ensure at least one correspondence has data
    const hasValidData = allCorrespondences.some((corr: any) => hasData(corr));

    setIsFormValid(hasValidData);
  };

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit}
      className=""
      form={form}
      initialValues={{
        correspondences: [
          {
            files: [],
            sender: '',
            recipient: '',
            subject: '',
            minute: '',
            date_of_correspondence: '',
            reference_number: '',
          },
        ],
      }}
      onValuesChange={() => checkFormValidity()}
      scrollToFirstError
    >
      <div className="">
        <List name="correspondences">
          {(fields, { add, remove }) => (
            <div
              style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}
            >
              <div className="flex h-[70vh] flex-col gap-4 overflow-y-auto">
                {fields.map((field) => (
                  <div
                    // size="small"
                    className="!bg-custom-white_100"
                    // title={

                    // }
                    key={field.key}
                  >
                    <div className="flex flex-row justify-between pb-2">
                      <Title tag="h4" className="text-custom-gray_300">
                        {field.name + 1}
                      </Title>
                      <div className="flex flex-row">
                        <CustomButton
                          type="text"
                          size="small"
                          icon={<Copy />}
                        />
                        <CustomButton
                          type="text"
                          size="small"
                          disabled={fields.length < 2}
                          icon={<Delete />}
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      </div>
                    </div>
                    <NewCorrespondenceForm field={field} />
                  </div>
                ))}
              </div>

              <CustomButton
                size="middle"
                className="!w-full"
                type="default"
                icon={<Add />}
                htmlType="button"
                onClick={() => add()}
              >
                Add Correspondence
              </CustomButton>
            </div>
          )}
        </List>
      </div>

      <div className="flex flex-row justify-end gap-2 border-t pt-4">
        {/* <Form.Item noStyle shouldUpdate>
          {() => (
            <Title>
              <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
            </Title>
          )}
        </Form.Item> */}
        <CustomButton
          size="small"
          // htmlType="submit"
          type="text"
          className="!rounded-10 !border !border-custom-main !text-custom-main"
        >
          Archive
        </CustomButton>
        <CustomButton size="small" htmlType="submit" disabled={!isFormValid}>
          Send
        </CustomButton>
      </div>
    </Form>
  );
};

export default CorrespondenceForms;
