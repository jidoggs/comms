import React, { useState } from 'react';
import Form from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import Space from 'antd/es/space';
import Radio from 'antd/es/radio/radio';
import RadioGroup from 'antd/es/radio/group';
import CustomButton from '@/common/components/CustomButton';
import { projectStatus } from './helper';
import { ProjectData } from './types';
import Plus from '@/common/components/icons/Plus';

type FieldType = ProjectData;

type Props = {
  onFinish: (values: ProjectData) => void; //eslint-disable-line
};
const intialList = ['Backlog', 'In progress', 'In review', 'Done'];

function NewProjectStatusForm({ onFinish }: Props) {
  const [radioItems, setRadioItems] = useState(intialList); //eslint-disable-line
  return (
    <Form layout="vertical" className="" onFinish={onFinish}>
      {projectStatus.map((item) => {
        return (
          <FormItem<FieldType>
            key={item.name}
            {...item}
            className="flex flex-col"
          >
            <RadioGroup className="">
              <Space direction="vertical" className="pt-2.5">
                {radioItems.map((itm) => (
                  <Radio key={itm} value={itm}>
                    {itm}
                  </Radio>
                ))}
              </Space>
            </RadioGroup>
          </FormItem>
        );
      })}
      <CustomButton
        type="text"
        htmlType="button"
        size="small"
        className={{
          container: 'justify-start pb-4',
        }}
        icon={<Plus />}
      >
        Add status
      </CustomButton>
      <div className="flex items-center justify-end border-t border-custom-gray_400 pl-2 pt-4">
        <CustomButton htmlType="submit" size="small">
          Create project
        </CustomButton>
      </div>
    </Form>
  );
}

export default NewProjectStatusForm;
