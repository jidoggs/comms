import React, { forwardRef } from 'react';
import CustomInput from '@/common/components/CustomInput';
import UploadDocs from './UploadDocs';
import { EditCellProps } from './type';
import { InputRef } from '@/common/components/CustomInput/types';

const EditableCellData = forwardRef<InputRef, EditCellProps>(
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

EditableCellData.displayName = 'EditableCellData';

export default EditableCellData;
