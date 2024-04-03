import React, { useState } from 'react';
import { Form, Radio, Space } from 'antd';
import CustomButton from '@/common/components/CustomButton';
import { projectStatus } from './helper';
import { ProjectData } from './types';
import { Plus } from '@/common/components/icons';

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
          <Form.Item<FieldType>
            key={item.name}
            {...item}
            className="flex flex-col"
          >
            <Radio.Group className="">
              <Space direction="vertical" className="pt-2.5">
                {radioItems.map((itm) => (
                  <Radio key={itm} value={itm}>
                    {itm}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </Form.Item>
        );
      })}
      <CustomButton
        type="text"
        htmlType="button"
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
