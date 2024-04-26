import CustomInput from '@/common/components/CustomInput';
import CustomButton from '@/common/components/CustomButton';
import CustomSelect from '@/common/components/CustomSelect';
import { CloseCircled } from '@/common/components/icons';
import { Form, FormProps } from 'antd';
import React, { useState } from 'react';

type Props = {
  onFinish: FormProps['onFinish'];
  isLoading: boolean;
};

const OPTION = [
  { value: '@humanresources.fmiti.ng', label: '@humanresources.fmiti.ng' },
  { value: '@hr.fmiti.ng', label: '@hr.fmiti.ng' },
  { value: '@operations.fmiti.ng', label: '@operations.fmiti.ng' },
];

function AddForm({ onFinish, isLoading }: Props) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item
        label={<span className="font-bold">Name</span>}
        name="name"
        rules={[{ required: true, message: 'Please input the name!' }]}
      >
        <CustomInput placeholder="Aa" disabled={isLoading} />
      </Form.Item>

      <Form.Item
        label={<span className="font-bold">Domain(s)</span>}
        name="domains"
        rules={[{ required: true, message: 'Please input the title!' }]}
      >
        <CustomSelect
          value={selectedItems}
          options={OPTION}
          onChange={setSelectedItems}
          disabled={isLoading}
          mode="multiple"
          placeholder="Add domains here "
          removeIcon={<CloseCircled className="text-white" />}
        />
      </Form.Item>

      <div className="flex items-center justify-end  border-t border-custom-gray_500 py-2">
        <CustomButton loading={isLoading} size="small" htmlType="submit">
          Create
        </CustomButton>
      </div>
    </Form>
  );
}

export default AddForm;
