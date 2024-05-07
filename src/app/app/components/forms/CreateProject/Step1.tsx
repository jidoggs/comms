import React, { useRef, useState } from 'react';
import Form from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import CustomInput, { CustomTextArea } from '@/common/components/CustomInput';
import CustomButton from '@/common/components/CustomButton';
import { createProjectFormInputs } from './helper';
import { ProjectData } from './types';
import UploadCard from '../../../home/components/UploadCard';
import Link from '@/common/components/icons/Link';
import PaperClip from '@/common/components/icons/PaperClip';
import ArrowRight from '@/common/components/icons/ArrowRight';

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
            <FormItem<FieldType>
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
            </FormItem>
          );
        }
        if (item.name === 'details') {
          return (
            <FormItem<FieldType>
              key={item.name}
              {...item}
              className="flex flex-col"
            >
              <CustomTextArea name={item.name} placeholder={item.placeholder} />
            </FormItem>
          );
        }
        return (
          <FormItem<FieldType>
            key={item.name}
            {...item}
            className="flex flex-col"
          >
            <CustomInput name={item.name} placeholder={item.placeholder} />
          </FormItem>
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
