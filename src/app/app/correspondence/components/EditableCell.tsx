import React, { forwardRef } from 'react';
import { Item } from './EditableTable';
import CustomInput from '@/common/CustomInput';
import UploadDocs from './UploadDocs';

export type Props = {
  name: keyof Item;
  defaultValue: any;
  save: () => Promise<void>;
};

const EditableCellData = forwardRef<any, Props>(
  ({ name, save, defaultValue }, ref) => {
    let template: any = null;
    switch (name) {
      case 'document':
        template = (
          <UploadDocs
            defaultValue={defaultValue}
            name={name}
            save={save}
            ref={ref}
          />
        );
        break;

      default:
        template = (
          <CustomInput
            ref={ref}
            defaultValue={defaultValue}
            onPressEnter={save}
            onBlur={save}
          />
        );
        break;
    }
    return <>{template}</>;
  }
);

EditableCellData.displayName = "EditableCellData"

export default EditableCellData;
