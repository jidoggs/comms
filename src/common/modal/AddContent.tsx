import React, { Dispatch, SetStateAction, useState } from 'react';
import { Input, Form, Space } from 'antd';
import { CloseCircled, Link } from '../components/icons';
import CustomButton from '../components/CustomButton';
import CustomModal from '../components/CustomModal';
import CustomSelect from '../components/CustomSelect';

interface AddContentProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const OPTION = [
  { value: '@humanresources.fmiti.ng', label: '@humanresources.fmiti.ng' },
  { value: '@hr.fmiti.ng', label: '@hr.fmiti.ng'}, 
  { value: '@operations.fmiti.ng',  label: '@operations.fmiti.ng' },
];

const AddContent: React.FC<AddContentProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCloseIcon = <CloseCircled className="text-white" />;

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  return (
    <CustomModal
      width={500}
      title={
        <Space>
          <div className="flex items-center justify-between gap-72">
            <h2>Add</h2>
            <div className="flex items-center gap-2">
              <span className="text-custom-purple_100">
                <Link size={20} />
              </span>
              <span className="text-sm text-custom-purple_100">copy link</span>
            </div>
          </div>
        </Space>
      }
      open={isModalOpen}
      onCancel={handleCancel}
    >
      <Form layout="vertical" onFinish={handleCancel}>
        <Form.Item
          label={<span className="font-bold">Name</span>}
          name="name"
          rules={[{ required: true, message: 'Please input the name!' }]}
        >
          <Input type="text" placeholder="Aa" />
        </Form.Item>

        <Form.Item
          label={<span className="font-bold">Domain(s)</span>}
          name="title"
          rules={[{ required: true, message: 'Please input the title!' }]}
        >
          <CustomSelect
            value={selectedItems}
            options={OPTION}
            onChange={setSelectedItems}
            mode="multiple"
            placeholder="Add domains here "
            removeIcon={handleCloseIcon}
          />
        </Form.Item>

        <div className="flex items-center justify-end  border-t border-custom-gray_500 py-2">
          <CustomButton size="small" htmlType="submit">
            Create
          </CustomButton>
        </div>
      </Form>
    </CustomModal>
  );
};

export default AddContent;
