import React, { useContext } from 'react';
import Form from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import CustomDragger from '@/common/components/CustomDragger';
import CustomInput from '@/common/components/CustomInput';
import CustomButton from '@/common/components/CustomButton';
import { correspondenceFormInputs } from './helper';
import { TableRowActionContext } from '../TableRowAction';
import { CorrespondenceData } from '@/types';

type FieldType = CorrespondenceData;

type Props = {
  handleSubmit: (data: CorrespondenceData) => void; //eslint-disable-line
};

function NewCorrespondenceForm({ handleSubmit }: Props) {
  const context = useContext(TableRowActionContext);
  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <div className="flex items-start gap-x-5">
        <CustomDragger />
        <div className="flex-1 ">
          {correspondenceFormInputs.map((item) => (
            <FormItem<FieldType>
              key={item.name}
              {...item}
              initialValue={context?.data?.[item.name]}
              className="flex flex-col"
            >
              <CustomInput name={item.name} />
            </FormItem>
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
