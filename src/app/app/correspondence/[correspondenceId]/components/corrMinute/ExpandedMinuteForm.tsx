'use client';

import React, { SetStateAction, useState } from 'react';
import RichTextEditor, { EditorValue } from 'react-rte';
import { Send } from '@/common/components/icons';
import CustomButton from '@/common/components/CustomButton';
import Title from '@/common/components/Title';

const ExpandedMinuteForm = () => {
  const [value, setValue] = useState('');

  const [editorValue, setEditorValue] = React.useState(
    RichTextEditor.createValueFromString(value, 'markdown')
  );

  const handleTextChange = (value: SetStateAction<EditorValue>) => {
    setEditorValue(value);
    setValue(value?.toString('markdown'));
  };
  return (
    <>
      <>
        <Title className='mb-6'>New Minute</Title>
        <RichTextEditor value={editorValue} onChange={handleTextChange} />
      </>

      <div className="mt-8 flex h-8 w-full justify-end">
        <CustomButton htmlType="submit" icon={<Send />} size="small">
          Push
        </CustomButton>
      </div>
    </>
  );
};

export default ExpandedMinuteForm;
