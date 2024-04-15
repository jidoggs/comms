import React, { useRef, useState } from 'react';
import { Form } from 'antd';
import CustomInput from '@/common/CustomInput';
import CustomButton from '@/common/components/CustomButton';
import { ArrowRight, Link, PaperClip } from '@/common/components/icons';
import { createProjectFormInputs } from './helper';
import { ProjectData } from './types';
import UploadCard from '../../../home/components/UploadCard';

type FieldType = ProjectData;

type Props = {
  onFinish: (values: ProjectData) => void; //eslint-disable-line
};

function NewProjectForm({ onFinish }: Props) {
  const [file, setFile] = useState<File | null>();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const clickHandler = () => {
    inputRef.current?.click();
  };
  return (
    <Form layout="vertical" className="" onFinish={onFinish}>
      {createProjectFormInputs.map((item) => {
        if (item.name === 'file') {
          return (
            <Form.Item<FieldType>
              key={item.name}
              {...item}
              className="flex flex-col"
            >
              {file && <UploadCard fileName={file?.name} />}
              <div className="gap-x-1x relative flex w-full items-center">
                <CustomButton
                  icon={<Link size={18} />}
                  type="text"
                  size="small"
                  onClick={clickHandler}
                >
                  Insert Link
                </CustomButton>
                <CustomButton
                  icon={<PaperClip size={18} />}
                  type="text"
                  size="small"
                  onClick={clickHandler}
                >
                  Attach File
                </CustomButton>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="sr-only"
                  onChange={(e) => setFile(e.target.files?.[0])}
                  ref={inputRef}
                />
              </div>
            </Form.Item>
          );
        }
        if (item.name === 'details') {
          return (
            <Form.Item<FieldType>
              key={item.name}
              {...item}
              className="flex flex-col"
            >
              <CustomInput
                name={item.name}
                placeholder={item.placeholder}
                type="textarea"
              />
            </Form.Item>
          );
        }
        return (
          <Form.Item<FieldType>
            key={item.name}
            {...item}
            className="flex flex-col"
          >
            <CustomInput name={item.name} placeholder={item.placeholder} />
          </Form.Item>
        );
      })}
      <div className="flex items-center justify-end border-t border-custom-gray_400 pl-2 pt-4">
        <CustomButton htmlType="submit" size="small">
          Continue
          <ArrowRight />
        </CustomButton>
      </div>
    </Form>
  );
}

export default NewProjectForm;
