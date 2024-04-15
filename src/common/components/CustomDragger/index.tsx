import Dragger, { DraggerProps } from 'antd/lib/upload/Dragger';
import React from 'react';
import { Document } from '../icons';

interface CustomDraggerProps extends DraggerProps {}

const contentType = 'application/pdf';

const CustomDragger: React.FunctionComponent<CustomDraggerProps> = ({
  accept,
  ...otherDraggerProps
}) => {
  return (
    <Dragger
      beforeUpload={(_) => false} //eslint-disable-line
      accept={accept || contentType}
      {...otherDraggerProps}
    >
      <div className="flex flex-col items-center justify-center px-20 py-44">
        <p className="ant-upload-drag-icon text-custom-gray_200">
          <Document size={'70'} />
        </p>

        <button
          type="button"
          className=" flex-1 rounded border-2 border-custom-gray_400 p-1 uppercase text-custom-main sm:rounded-lg sm:px-2.5 sm:py-2 "
        >
          Upload the letter
        </button>
      </div>
    </Dragger>
  );
};

export default CustomDragger;
