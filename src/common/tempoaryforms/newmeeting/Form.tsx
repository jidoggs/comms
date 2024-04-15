import React from 'react';
import { Form } from 'antd';
import CustomDragger from '@/common/components/CustomDragger';
import CustomInput from '@/common/CustomInput';
import CustomButton from '@/common/components/CustomButton';
import { correspondenceFormInputs } from './helper';
import { CorrespondenceData } from './type';

type FieldType = CorrespondenceData;

type Props = {
  handleSubmit: (data: CorrespondenceData) => void; //eslint-disable-line
};

function NewCorrespondenceForm({ handleSubmit }: Props) {
  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <div className="flex items-start gap-x-5">
        <CustomDragger />
        <div className="flex-1 ">
          {correspondenceFormInputs.map((item) => (
            <Form.Item<FieldType>
              key={item.name}
              {...item}
              className="flex flex-col"
            >
              <CustomInput name={item.name} />
            </Form.Item>
          ))}
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
