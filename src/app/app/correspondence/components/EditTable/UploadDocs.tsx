/* eslint-disable no-unused-vars */
import CustomInput from '@/common/CustomInput';
import CustomButton from '@/common/components/CustomButton';
import { Link, PaperClip } from '@/common/components/icons';
import { GetProp, GetRef, Input, Upload, UploadFile, UploadProps } from 'antd';
import React, { forwardRef, useState } from 'react';
import { EditCellProps } from './type';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
type inputRef = GetRef<typeof Input> | any;
type UploadRef = GetRef<typeof Upload> | any;

type Ref = inputRef | UploadRef;

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const UploadDocs = forwardRef<Ref, EditCellProps>(
  ({ defaultValue, name, save }, ref) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    // console.log(ref);

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj as FileType);
      }

      setPreviewOpen(true);
      setPreviewTitle(
        file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1)
      );
    };

    const handleChange: UploadProps['onChange'] = ({
      fileList: newFileList,
    }) => {
      const item = newFileList[0];
      save();
      setFileList(newFileList);
    };

    const uploadButton = (
      <CustomButton
        size="small"
        type="primary"
        htmlType="button"
        icon={<PaperClip size={18} />}
      >
        <span>Attach file</span>
      </CustomButton>
    );
    return (
      <div className="flex items-center gap-x-1 rounded border px-2.5 py-1 text-sm leading-4">
        {fileList.length >= 1 ? null : (
          <>
            <CustomInput
              ref={ref}
              defaultValue={defaultValue}
              onPressEnter={save}
              onBlur={save}
              prefix={<Link size={22} className="text-custom-black_200" />}
              size="small"
              className="!bg-transparent !text-sm text-custom-black_100 placeholder:!text-sm placeholder:text-custom-gray_400"
              placeholder="Paste link"
              onChange={(e) => setPreviewTitle(e.target.value)}
            />
            <span>or</span>
          </>
        )}

        <Upload
          beforeUpload={() => false}
          listType="text"
          ref={ref}
          fileList={fileList}
          name={name}
          multiple={false}
          //   onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
      </div>
    );
  }
);

UploadDocs.displayName = 'UploadDocs';

export default UploadDocs;
