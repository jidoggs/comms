'use client';
import React, { useState } from 'react';
import CustomButton from '@/common/components/CustomButton';
import Add from '@/common/components/icons/Add';
import Form, { FormInstance } from 'antd/es/form/Form';
import List from 'antd/es/form/FormList';
import Delete from '@/common/components/icons/Delete';
import Title from '@/common/components/Title';
import Copy from '@/common/components/icons/Copy';
import NewCorrespondenceForm from './Form';
import { CorrespondenceData } from '@/types';
import { hasData } from '../../actions/CreateCorrespondence';

interface CorrespondenceFormsProps {
  handleSubmit: (data: CorrespondenceData) => void;
  form: FormInstance<any>;
  handleArchive: () => Promise<void>;
}

const CorrespondenceForms = ({
  handleSubmit,
  form,
  handleArchive,
}: CorrespondenceFormsProps) => {
  const [isFormValid, setIsFormValid] = useState(false);

  const checkFormValidity = () => {
    const values = form.getFieldsValue();
    const allCorrespondences = values?.correspondences;
    // Ensure at least one correspondence has data
    const hasValidData = allCorrespondences?.some((corr: any) => hasData(corr));

    setIsFormValid(hasValidData);
  };

  const handleCopy = (index: number) => {
    const values = form.getFieldsValue();
    const copiedCorrespondence = values.correspondences[index];

    // Create a new empty correspondence to reset all fields and get a new index
    const newCorrespondence = {
      files: [],
      sender: '',
      recipient: '',
      subject: '',
      minute: '',
      date_of_correspondence: '',
      reference_number: '',
      recipient_type: '', // Reset recipient_type for new index
    };

    // Merge the copied values with the new empty correspondence
    const finalCopiedCorrespondence = {
      ...newCorrespondence,
      ...copiedCorrespondence,
    };

    form.setFieldsValue({
      correspondences: [...values.correspondences, finalCopiedCorrespondence], // Append the copied correspondence at the end
    });
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
                {fields.map((field, index) => (
                  <div className="!bg-custom-white_100" key={field.key}>
                    <div className="flex flex-row justify-between pb-2">
                      <Title tag="h4" className="text-custom-gray_300">
                        {/* {field.name + 1} */}
                        {form.getFieldValue([
                          'correspondences',
                          index,
                          'subject',
                        ]) || `Correspondence ${index + 1}`}
                      </Title>
                      <div className="flex flex-row">
                        <CustomButton
                          type="text"
                          size="small"
                          icon={<Copy />}
                          onClick={() => handleCopy(index)} // Call handleCopy with index
                          disabled={!isFormValid}
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
        <CustomButton
          size="small"
          onClick={handleArchive}
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
